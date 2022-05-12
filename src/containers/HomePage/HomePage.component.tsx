import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { BoardWithDetailsItem } from '@app/views/BoardWithDetailsItem';
import { BoardCreator } from '@app/containers/BoardCreator';
import { useUserBoards } from '@app/api/useUserBoards';

const HomePageList = (): ReactElement => {
  const { data, error } = useUserBoards();
  const boards = data?.boards ?? [];

  if (error) {
    return <p>Error fetching the boards.</p>;
  }

  if (!data) {
    return <p>Loading boards...</p>;
  }

  if (!boards.length) {
    return <p>No boards to show.</p>;
  }

  return (
    <>
      {boards.map(board =>
        <Link
          key={board.id}
          to={`/boards/${board.id}`}
        >
          <BoardWithDetailsItem
            boardWithDetails={board as any}
          />
        </Link>
      )}
    </>
  );
};

const HomePage = (): ReactElement => {
  return (
    <>
      <BoardCreator />
      <main>
        <HomePageList />
      </main>
    </>
  );
};

export { HomePage };
