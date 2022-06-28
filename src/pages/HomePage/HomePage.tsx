import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { parseServerDate } from '@app/tools';
import { useSelectBoardsWithDetails } from '@app/api';
import { BoardWithDetailsLayout } from '@app/ui';
import { BoardCreator } from '@app/containers/BoardCreator';

const HomePageList = (): ReactElement => {
  const { data, error } = useSelectBoardsWithDetails();
  const boards = sortBy(
    data?.boards ?? [],
    board => parseServerDate(board.createdAt)
  ).reverse();

  if (error) {
    return <Typography>Error fetching boards.</Typography>;
  }

  if (!data) {
    return <Typography>Loading boards...</Typography>;
  }

  if (!boards.length) {
    return <Typography>No boards to show.</Typography>;
  }

  return (
    <Stack
      direction='column'
      spacing={2}
      sx={{ mb: 4 }}
    >
      {boards.map(board =>
        <Link
          key={board.id}
          to={`/boards/${board.id}`}
        >
          <BoardWithDetailsLayout
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
