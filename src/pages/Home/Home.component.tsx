import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { useStore } from '@app/services/store';
import { BoardCreator } from '@app/containers/BoardCreator';
import { BoardWithDetailsItem } from '@app/views/BoardWithDetailsItem';

const Home = (): ReactElement => {
  const [isLoading] = useState(false);

  const boardsWithDetails = useStore(state => state.boardsWithDetails);

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
