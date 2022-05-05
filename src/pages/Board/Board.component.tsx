import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import shallow from 'zustand/shallow';

import { useStore } from '@app/services/store';

const Board = (): ReactElement => {
  const { boardId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { boardsWithDetails, fetchBoardsWithDetails } = useStore(
    ({ boardsWithDetails, fetchBoardsWithDetails }) => ({ boardsWithDetails, fetchBoardsWithDetails }),
    shallow
  );

  const board = boardsWithDetails
    .find(boardWithDetails => boardWithDetails.id === boardId);

  useEffect(() => {
    if (!board) {
      setIsLoading(true);
      fetchBoardsWithDetails(boardId)
        .finally(() => setIsLoading(false));
    }
  }, [board]);

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
