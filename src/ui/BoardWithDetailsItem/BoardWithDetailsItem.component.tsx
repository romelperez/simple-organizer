import React, { ReactElement } from 'react';
import formatDate from 'date-fns/format';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { DataBoard_WithDetails } from '@app/types';
import { parseServerDate } from '@app/tools/date';

interface BoardWithDetailsItemProps {
  boardWithDetails: DataBoard_WithDetails
}

const BoardWithDetailsItem = (props: BoardWithDetailsItemProps): ReactElement => {
  const { boardWithDetails } = props;
  const { name, createdAt, tasks_aggregate: tasksAggregate } = boardWithDetails;
  const tasksCount = tasksAggregate.aggregate.count;
  const taskDate = formatDate(parseServerDate(createdAt), 'PPpp');

  return (
    <Card
      component='article'
      variant='outlined'
    >
      <CardContent>
        <Typography component='h1' variant='h3' gutterBottom>
          {name}
        </Typography>
        <Typography component='p' variant='body1'>
          {tasksCount} task{tasksCount === 1 ? '' : 's'}
          {' - '}
          {taskDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { BoardWithDetailsItem };
