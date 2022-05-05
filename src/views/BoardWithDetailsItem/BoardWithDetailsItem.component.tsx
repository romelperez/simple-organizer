import React, { ReactElement } from 'react';

import { DataBoardWithDetails } from '@app/types';

interface BoardWithDetailsItemProps {
  boardWithDetails: DataBoardWithDetails
}

const BoardWithDetailsItem = (props: BoardWithDetailsItemProps): ReactElement => {
  const { boardWithDetails } = props;
  const { name, tasksLength, tasksCompleted } = boardWithDetails;

  const tasksCompletationPercentage = Math.round((tasksCompleted / tasksLength) * 100);

  return (
    <article>
      <h2>{name}</h2>
      <p>{tasksCompleted} / {tasksLength} ({tasksCompletationPercentage}%)</p>
    </article>
  );
};

export { BoardWithDetailsItem };
