import { DataBoard_WithDetails } from '@app/types';
import React, { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';

const Board = (): ReactElement => {
  const { boardId } = useParams();
  const [isLoading] = useState(false);
  const boardsWithDetails: DataBoard_WithDetails[] = [];

  const board = boardsWithDetails
    .find(boardWithDetails => boardWithDetails.id === boardId);

  if (isLoading) {
    return <p>Loading board...</p>;
  }

  if (!board) {
    return <p>Board not found.</p>;
  }

  return (
    <main>
      <h1>{board.name}</h1>
      <p>Board details.</p>
    </main>
  );
};

export { Board };
