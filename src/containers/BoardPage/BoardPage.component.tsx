import React, { ReactElement, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useUserBoardTasks } from '@app/api/useUserBoardTasks';
import { useDeleteUserBoard } from '@app/api/useDeleteUserBoard';

const BoardPage = (): ReactElement => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const { data, error } = useUserBoardTasks(boardId as string);

  const [hasDeletionError, setHasDeletionError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteUserBoard = useDeleteUserBoard();

  const board = data?.boards_by_pk;
  const tasks = board?.tasks ?? [];

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

  const onDelete = (): void => {
    setIsDeleting(true);
    setHasDeletionError(false);
    deleteUserBoard({ boardId: boardId as string })
      .then(({ error }) => {
        if (error) {
          setHasDeletionError(true);
        } else {
          navigate('/');
        }
      })
      .finally(() => setIsDeleting(false));
  };

  return (
    <main>
      <h1>{board.name}</h1>
      <p>Last updated at: {board.updatedAt}</p>

      {!tasks.length && (
        <p>No tasks created.</p>
      )}

      {tasks.map(task => (
        <div key={task.id}>
          <form>
            <input
              type='checkbox'
              defaultChecked={task.isCompleted}
            />
            {' '}
            <input
              type='text'
              defaultValue={task.name}
            />
            {' '}
            <button>
              Delete
            </button>
          </form>
        </div>
      ))}

      <div>
        <button
          onClick={onDelete}
        >
          Delete Board
        </button>
      </div>

      <div>
        {hasDeletionError && (
          <p>Error deleting board. Please try again.</p>
        )}
      </div>
    </main>
  );
};

export { BoardPage };
