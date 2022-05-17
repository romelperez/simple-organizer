import React, { ReactElement } from 'react';

import { DataBoard_WithDetails } from '@app/types';

interface BoardWithDetailsItemProps {
  boardWithDetails: DataBoard_WithDetails
}

const BoardWithDetailsItem = (props: BoardWithDetailsItemProps): ReactElement => {
  const { boardWithDetails } = props;
  const { name, tasks_aggregate: tasksAggregate } = boardWithDetails;
  const tasksCount = tasksAggregate.aggregate.count;

  return (
    <article>
      <h2>{name}</h2>
      <p>{tasksCount} task{tasksCount === 1 ? '' : 's'}</p>
    </article>
  );
};

export { BoardWithDetailsItem };
