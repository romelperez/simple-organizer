import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';

import { BoardWithDetailsItem } from '@app/views/BoardWithDetailsItem';
import { BoardCreator } from '@app/containers/BoardCreator';
import { useUserBoards } from '@app/api/useUserBoards';
import { parseServerDate } from '@app/tools/date';

const HomePageList = (): ReactElement => {
  const { data, error } = useUserBoards();
  const boards = sortBy(data?.boards ?? [], board => parseServerDate(board.createdAt)).reverse();

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
            boardWithDetails={board}
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
