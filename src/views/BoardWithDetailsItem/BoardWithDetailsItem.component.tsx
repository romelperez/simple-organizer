import React, { ReactElement } from 'react';

import { DataBoard_WithDetails } from '@app/types';

interface BoardWithDetailsItemProps {
  boardWithDetails: DataBoard_WithDetails
}

const BoardWithDetailsItem = (props: BoardWithDetailsItemProps): ReactElement => {
  const { boardWithDetails } = props;
  const { name, tasksLength = 0, tasksCompleted = 0 } = boardWithDetails;

  const tasksCompletationPercentage = Math.round((tasksCompleted / tasksLength || 0) * 100);

  return (
    <article>
      <h2>{name}</h2>
      <p>{tasksCompleted} / {tasksLength} ({tasksCompletationPercentage}%)</p>
    </article>
  );
};

export { BoardWithDetailsItem };
