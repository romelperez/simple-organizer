import React, { ReactElement } from 'react';
import { format } from 'date-fns';

import { DataBoard_WithDetails } from '@app/types';
import { parseServerDate } from '@app/tools/date';

interface BoardWithDetailsItemProps {
  boardWithDetails: DataBoard_WithDetails
}

const BoardWithDetailsItem = (props: BoardWithDetailsItemProps): ReactElement => {
  const { boardWithDetails } = props;
  const { name, createdAt, tasks_aggregate: tasksAggregate } = boardWithDetails;
  const tasksCount = tasksAggregate.aggregate.count;
  const taskDate = format(parseServerDate(createdAt), 'PPpp');

  return (
    <article>
      <h2>{name}</h2>
      <p>
        {tasksCount} task{tasksCount === 1 ? '' : 's'}
        {' - '}
        {taskDate}
      </p>
    </article>
  );
};

export { BoardWithDetailsItem };
