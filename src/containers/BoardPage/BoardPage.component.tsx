import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { useUserBoardTasks } from '@app/api/useUserBoardTasks';

const BoardPage = (): ReactElement => {
  const { boardId } = useParams();
  const { data, error } = useUserBoardTasks(boardId as string);
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
    </main>
  );
};

export { BoardPage };
