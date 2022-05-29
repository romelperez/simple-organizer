import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import Stack from '@mui/material/Stack';

import { BoardWithDetailsItem } from '@app/ui/BoardWithDetailsItem';
import { BoardCreator } from '@app/containers/BoardCreator';
import { useSelectBoardsWithDetails } from '@app/api/boards/useSelectBoardsWithDetails';
import { parseServerDate } from '@app/tools/date';

const HomePageList = (): ReactElement => {
  const { data, error } = useSelectBoardsWithDetails();
  const boards = sortBy(
    data?.boards ?? [],
    board => parseServerDate(board.createdAt)
  ).reverse();

  if (error) {
    return <p>Error fetching boards.</p>;
  }

  if (!data) {
    return <p>Loading boards...</p>;
  }

  if (!boards.length) {
    return <p>No boards to show.</p>;
  }

  return (
    <Stack
      direction='column'
      spacing={2}
    >
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
    </Stack>
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
