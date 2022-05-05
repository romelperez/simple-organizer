import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useStore } from '@app/services/store';

const Board = (): ReactElement => {
  const { boardId } = useParams();
  const boardsWithDetails = useStore(state => state.boardsWithDetails);
  const fetchBoardsWithDetails = useStore(state => state.fetchBoardsWithDetails);

  const board = boardsWithDetails
    .find(boardWithDetails => boardWithDetails.id === boardId);

  useEffect(() => {
    if (!board) {
      fetchBoardsWithDetails(boardId).finally(null);
    }
  }, [board]);

  if (!board) {
    return (
      <main>
        Loading...
      </main>
    );
  }

  return (
    <main>
      <h1>{board.name}</h1>
      <p>Board details.</p>
    </main>
  );
};

export { Board };
