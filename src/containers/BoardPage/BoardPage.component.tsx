import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { useUserBoard } from '@app/api/useUserBoard';

const BoardPage = (): ReactElement => {
  const { boardId } = useParams();
  const { data, error } = useUserBoard(boardId as string);
  const board = data?.boards_by_pk;

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
    </main>
  );
};

export { BoardPage };
