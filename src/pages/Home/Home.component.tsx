import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useStore } from '@app/services/store';
import { BoardCreator } from '@app/containers/BoardCreator';
import { BoardWithDetailsItem } from '@app/views/BoardWithDetailsItem';

const Home = (): ReactElement => {
  const boardsWithDetails = useStore(state => state.boardsWithDetails);
  const fetchBoardsWithDetails = useStore(state => state.fetchBoardsWithDetails);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchBoardsWithDetails()
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <BoardCreator />
      <main>
        {!isLoading && !boardsWithDetails.length && <p>No boards to show.</p>}

        {isLoading && !boardsWithDetails.length && <p>Loading boards...</p>}

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
