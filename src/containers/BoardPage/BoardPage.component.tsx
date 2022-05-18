import React, { FormEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { parseServerDate } from '@app/tools/date';
import { useUserBoardTasks } from '@app/api/useUserBoardTasks';
import { useDeleteUserBoard } from '@app/api/useDeleteUserBoard';
import { useUpdateUserBoard } from '@app/api/useUpdateUserBoard';
import { TaskCreator } from '@app/containers/TaskCreator';

const BoardPage = (): ReactElement => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const boardNameElementRef = useRef<HTMLInputElement | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [boardName, setBoardName] = useState('');

  const { data, error } = useUserBoardTasks(boardId as string);
  const deleteUserBoard = useDeleteUserBoard();
  const updateUserBoard = useUpdateUserBoard();

  const board = data?.boards_by_pk;
  const tasks = board?.tasks ?? [];
  const tasksCompleted = tasks.filter(task => task.isCompleted);

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

    void deleteUserBoard({ boardId: boardId as string }).then(({ error }) => {
      setIsDeleting(false);

      if (error) {
        setErrorMsg('Error deleting board. Please try again.');
      } else {
        navigate('/');
      }
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
        {tasks.length > 0 && (
          <span>
            {tasksCompleted.length}/{tasks.length} tasks completed
            {' '}
            ({Math.floor((tasksCompleted.length / tasks.length) * 100)}%)
            {' - '}
          </span>
        )}
        {/* TODO: Show the last update either in board or task. */}
        <span>Updated at: {format(parseServerDate(board.updatedAt), 'PPpp')}</span>
      </div>

      <TaskCreator
        boardId={boardId as string}
      />

      {!tasks.length && (
        <p>No tasks created.</p>
      )}

      <div
        style={{
          margin: '0 0 20px'
        }}
      >
        {tasks.map(task => (
          <div key={task.id}>
            <form>
              <input
                type='checkbox'
                defaultChecked={task.isCompleted}
              />
              {' '}
              <input
                style={{
                  width: 200
                }}
                type='text'
                defaultValue={task.name}
              />
              <button>
                Save
              </button>
              <button>
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>

      <div>
        <button>
          Mark All Tasks
        </button>
        <button>
          Delete Completed Tasks
        </button>
        <button
          onClick={onDelete}
        >
          Delete Board
        </button>
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
