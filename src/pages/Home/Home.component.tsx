import React, { ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useStore } from '@app/services/store';
import { BoardWithDetailsItem } from '@app/views/BoardWithDetailsItem';

const Home = (): ReactElement => {
  const boardsWithDetails = useStore(state => state.boardsWithDetails);
  const fetchBoardsWithDetails = useStore(state => state.fetchBoardsWithDetails);

  useEffect(() => {
    fetchBoardsWithDetails().finally(null);
  }, []);

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Type new board name..'
        />
        <button>Create</button>
      </div>
      <main>
        {boardsWithDetails.map(boardWithDetails =>
          <Link
            key={boardWithDetails.id}
            to={`/boards/${boardWithDetails.id}`}
          >
            <BoardWithDetailsItem
              boardWithDetails={boardWithDetails}
            />
          </Link>
        )}
      </main>
    </div>
  );
};

export { Home };
