import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

import { parseServerDate } from '@app/tools';
import { useSelectBoardsWithDetails } from '@app/api';
import { BoardWithDetailsLayout, LoadingContainer } from '@app/ui';
import { BoardCreator } from '@app/containers/BoardCreator';

const HomePageList = (): ReactElement => {
  const { data, error } = useSelectBoardsWithDetails();
  const boards = sortBy(
    data?.boards ?? [],
    board => parseServerDate(board.createdAt)
  ).reverse();

  if (error) {
    return (
      <Alert severity='error'>
        <Typography>Error fetching boards. Please try again.</Typography>
      </Alert>
    );
  }

  if (!data) {
    return (
      <LoadingContainer>
        <LinearProgress />
      </LoadingContainer>
    );
  }

  if (!boards.length) {
    return <Alert severity='info'>No boards to show.</Alert>;
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
