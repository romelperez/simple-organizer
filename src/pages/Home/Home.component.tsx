import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { DataBoard_WithDetails } from '@app/types';
import { BoardCreator } from '@app/containers/BoardCreator';
import { BoardWithDetailsItem } from '@app/views/BoardWithDetailsItem';

const Home = (): ReactElement => {
  const [isLoading] = useState(false);

  const boardsWithDetails: DataBoard_WithDetails[] = [];

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
