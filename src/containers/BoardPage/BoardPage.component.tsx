import React, { FormEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import formatDate from 'date-fns/format';

import { parseServerDate } from '@app/tools/date';
import { useUserBoardTasks } from '@app/api/useUserBoardTasks';
import { useDeleteUserBoard } from '@app/api/useDeleteUserBoard';
import { useUpdateUserBoard } from '@app/api/useUpdateUserBoard';
import { useUpdateUserTasks } from '@app/api/useUpdateUserTasks';
import { useDeleteUserTasks } from '@app/api/useDeleteUserTasks';
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

  const { data, error } = useUserBoardTasks(boardId as string);
  const updateUserBoard = useUpdateUserBoard();
  const deleteUserBoard = useDeleteUserBoard();
  const updateUserTasks = useUpdateUserTasks();
  const deleteUserTasks = useDeleteUserTasks();

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

  // TODO: How to handle optimistic update?
  const onUpdateBoardName = (event: FormEvent): void => {
    event.preventDefault();

    setIsUpdating(true);
    setErrorMsg('');

    void updateUserBoard({
      filter: {
        id: boardId as string
      },
      values: {
        name: boardName,
        updatedAt: new Date().toISOString()
      }
    }).then(({ error }) => {
      setIsUpdating(false);
      boardNameElementRef.current?.focus();

      if (error) {
        setErrorMsg('Error updating board name.');
      }
    });
  };

  const onDelete = (): void => {
    setIsDeleting(true);
    setErrorMsg('');

    deleteUserTasks({
      boardId: boardId as string,
      tasksIds: tasks.map(task => task.id)
    })
      .then(async ({ error }) => {
        if (error) {
          throw new Error();
        }
        return await deleteUserBoard({ boardId: boardId as string });
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
    void updateUserTasks({
      boardId: boardId as string,
      tasksIds,
      values: {
        isCompleted: true,
        updatedAt: new Date().toISOString()
      }
    });
  };

  const onDeleteCompletedTasks = (): void => {
    // TODO: Handle errors.
    void deleteUserTasks({
      boardId: boardId as string,
      tasksIds: tasksCompleted.map(task => task.id)
    });
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

      {!tasks.length && (
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
