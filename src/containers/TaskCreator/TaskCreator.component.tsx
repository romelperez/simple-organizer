import React, { FormEvent, ReactElement, useState } from 'react';

import { useInsertUserTask } from '@app/api/useInsertUserTask';

interface TaskCreatorProps {
  boardId: string
}

const TaskCreator = (props: TaskCreatorProps): ReactElement => {
  const { boardId } = props;

  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const insertUserTask = useInsertUserTask();

  const nameFormatted = name.trim();
  const isNameValid = nameFormatted !== '' && nameFormatted.length > 2 && nameFormatted.length < 100;

  const onCreate = (event: FormEvent): void => {
    event.preventDefault();

    if (!isNameValid) {
      return;
    }

    setIsLoading(true);
    setError('');

    insertUserTask({ input: { name, boardId } })
      .then(({ error }) => {
        if (error) {
          setError('Error creating task. Please try again.');
        } else {
          setName('');
          // TODO: Focus input on success.
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      style={{
        margin: '0 0 20px'
      }}
    >
      <form onSubmit={onCreate}>
        <input
          style={{
            width: 250
          }}
          type='text'
          placeholder='Type new task name...'
          disabled={isLoading}
          value={name}
          onChange={event => setName(event.currentTarget.value)}
        />
        {' '}
        <button
          disabled={!isNameValid || isLoading}
        >
          Add
        </button>
      </form>
      {!!error && (
        <div>{error}</div>
      )}
    </div>
  );
};

export { TaskCreator };
