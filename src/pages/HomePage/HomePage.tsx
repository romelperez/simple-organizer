import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';

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
    return (
      <Alert severity='error'>
        <Typography>Error fetching boards. Please try again.</Typography>
      </Alert>
    );
  }

  if (!data) {
    return (
      <Stack direction='column' spacing={2}>
        <Skeleton variant='rectangular' height='5rem' animation='wave' />
        <Skeleton variant='rectangular' height='5rem' animation='wave' />
        <Skeleton variant='rectangular' height='5rem' animation='wave' />
      </Stack>
    );
  }

  if (!boards.length) {
    return <Alert severity='info'>Boards will appear here. Create a new one.</Alert>;
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
