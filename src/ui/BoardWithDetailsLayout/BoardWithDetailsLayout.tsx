import React, { ReactElement } from 'react';
import formatDate from 'date-fns/format';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

import { parseServerDate } from '@app/tools/date';
import { BoardWithDetailsLayoutProps } from './BoardWithDetailsLayout.types';

const BoardWithDetailsLayout = (props: BoardWithDetailsLayoutProps): ReactElement => {
  const { boardWithDetails } = props;
  const { name, createdAt, tasks_aggregate: tasksAggregate } = boardWithDetails;
  const tasksCount = tasksAggregate.aggregate.count;
  const taskDate = formatDate(parseServerDate(createdAt), 'PPpp');

  return (
    <Card
      component='article'
      variant='outlined'
    >
      <CardActionArea>
        <CardContent sx={{ p: 2, '&:last-child': { p: 2 } }}>
          <Typography component='h1' variant='h3' sx={{ mb: 1 }}>
            {name}
          </Typography>
          <Typography component='p' variant='body1'>
            {tasksCount} task{tasksCount === 1 ? '' : 's'}
            {' - '}
            {taskDate}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export { BoardWithDetailsLayout };
