import React, { FormEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import formatDate from 'date-fns/format';

import { parseServerDate } from '@app/tools/date';
import { useSelectBoardWithTasks } from '@app/api/boards/useSelectBoardWithTasks';
import { useDeleteBoard } from '@app/api/boards/useDeleteBoard';
import { useUpdateBoard } from '@app/api/boards/useUpdateBoard';
import { useUpdateTasks } from '@app/api/tasks/useUpdateTasks';
import { useDeleteTasks } from '@app/api/tasks/useDeleteTasks';
import { TaskCreator } from '@app/containers/TaskCreator';
import { Task } from '@app/containers/Task';

const BoardPage = (): ReactElement => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const boardNameElementRef = useRef<HTMLInputElement | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [hideCompletedTasks, setHideCompletedTasks] = useState(false);

  const { data, error } = useSelectBoardWithTasks(boardId as string);
  const updateBoard = useUpdateBoard();
  const deleteBoard = useDeleteBoard();
  const updateTasks = useUpdateTasks();
  const deleteTasks = useDeleteTasks();

  const board = data?.boards_by_pk;
  const tasks = board?.tasks ?? [];
  const visibleTasks = sortBy(
    tasks.filter(task => hideCompletedTasks ? !task.isCompleted : true),
    task => parseServerDate(task.createdAt).getTime()
  );
  const tasksCompleted = tasks.filter(task => task.isCompleted);
  const tasksUncompleted = tasks.filter(task => !task.isCompleted);

  useEffect(() => {
    if (!board) {
      return;
    }
    setBoardName(board.name);
  }, [board]);

  const onUpdateBoardName = (event: FormEvent): void => {
    event.preventDefault();

    setIsUpdating(true);
    setErrorMsg('');

    updateBoard({
      filter: { id: boardId as string },
      values: { name: boardName }
    })
      .then(({ error }) => {
        setIsUpdating(false);
        boardNameElementRef.current?.focus();

        if (error) {
          setErrorMsg('Error updating board name.');
        }
      })
      .finally(null);
  };

  const onDelete = (): void => {
    setIsDeleting(true);
    setErrorMsg('');

    deleteTasks({
      boardId: boardId as string,
      tasksIds: tasks.map(task => task.id)
    })
      .then(async ({ error }) => {
        if (error) {
          throw new Error();
        }
        return await deleteBoard({ boardId: boardId as string });
      })
      .then(({ error }) => {
        if (error) {
          throw new Error();
        } else {
          navigate('/');
        }
      })
      .catch(() => {
        setErrorMsg('Error deleting board. Please try again.');
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const onMarkAllTasks = (): void => {
    const tasksIds = tasksUncompleted.map(task => task.id);

    if (!tasksIds.length) {
      return;
    }

    // TODO: Handle errors.
    updateTasks({
      boardId: boardId as string,
      tasksIds,
      values: {
        isCompleted: true,
        updatedAt: new Date().toISOString()
      }
    })
      .finally(null);
  };

  const onDeleteCompletedTasks = (): void => {
    // TODO: Handle errors.
    deleteTasks({
      boardId: boardId as string,
      tasksIds: tasksCompleted.map(task => task.id)
    })
      .finally(null);
  };

  if (error) {
    return <p>Error fetching board data.</p>;
  }

  if (!data) {
    return <p>Loading board data...</p>;
  }

  if (!board) {
    return <p>Board not found.</p>;
  }

  if (isDeleting) {
    return <p>Deleting board...</p>;
  }

  return (
    <main>
      <form
        style={{
          margin: '0 0 20px'
        }}
        onSubmit={onUpdateBoardName}
      >
        <input
          ref={boardNameElementRef}
          style={{
            width: 300
          }}
          disabled={isUpdating}
          value={boardName}
          onChange={event => setBoardName(event.currentTarget.value)}
          // TODO: Handle unBlur event change.
        />
        {' '}
        <button
          disabled={isUpdating}
        >
          Save
        </button>
      </form>

      <div
        style={{
          margin: '0 0 20px'
        }}
      >
        <span>
          {tasksCompleted.length}/{tasks.length} tasks completed
          {' '}
          ({tasks.length === 0 ? 0 : Math.floor((tasksCompleted.length / tasks.length) * 100)}%)
          {' - '}
        </span>
        {/* TODO: Show the last update either in board or task. */}
        <span>Updated at: {formatDate(parseServerDate(board.updatedAt), 'PPpp')}</span>
      </div>

      <TaskCreator
        boardId={boardId as string}
      />

      <div
        style={{
          margin: '0 0 20px'
        }}
      >
        <button
          disabled={!tasksUncompleted.length}
          onClick={() => setHideCompletedTasks(v => !v)}
        >
          {hideCompletedTasks ? 'Show All' : 'Hide Completed'}
        </button>
        {' '}
        <button
          disabled={!tasksUncompleted.length}
          onClick={onMarkAllTasks}
        >
          Mark All Tasks
        </button>
        {' '}
        <button
          disabled={!tasksCompleted.length}
          onClick={onDeleteCompletedTasks}
        >
          Delete Completed Tasks
        </button>
        {' '}
        <button
          onClick={onDelete}
        >
          Delete Board
        </button>
      </div>

      {!visibleTasks.length && (
        <p>No tasks created.</p>
      )}

      <div
        style={{
          margin: '0 0 20px'
        }}
      >
        {visibleTasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      <div
        style={{
          margin: '0 0 20px'
        }}
      >
        {errorMsg !== '' && (
          <p>{errorMsg}</p>
        )}
      </div>
    </main>
  );
};

export { BoardPage };
