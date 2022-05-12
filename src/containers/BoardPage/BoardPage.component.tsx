import React, { ReactElement, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuthenticated } from '@nhost/react';

import { DataBoard_WithDetails } from '@app/types';

const BoardPage = (): ReactElement => {
  const isAuthenticated = useAuthenticated();
  const { boardId } = useParams();
  const [isLoading] = useState(false);
  const boardsWithDetails: DataBoard_WithDetails[] = [];

  const board = boardsWithDetails
    .find(boardWithDetails => boardWithDetails.id === boardId);

  if (!isAuthenticated) {
    return <Navigate to='/signin' />;
  }

  if (isLoading) {
    return <p>Loading board...</p>;
  }

  if (!board) {
    return <p>Board not found.</p>;
  }

  return (
    <main>
      <h1>{board.name}</h1>
      <p>BoardPage details.</p>
    </main>
  );
};

export { BoardPage };
