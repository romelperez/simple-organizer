import React, { FormEvent, ReactElement, useState } from 'react';

import { useInsertUserBoard } from '@app/api/useInsertUserBoard';

const BoardCreator = (): ReactElement => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const insertUserBoard = useInsertUserBoard();

  const nameFormatted = name.trim();
  const nameIsValid = nameFormatted !== '' &&
    nameFormatted.length >= 2 &&
    nameFormatted.length <= 64;

  const onCreate = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!nameIsValid) {
      return;
    }

    setIsLoading(true);

    await insertUserBoard({ input: { name } });

    setIsLoading(false);

    setName('');
  };

  return (
    <form onSubmit={onCreate}>
      <input
        type='text'
        placeholder='Type new board name...'
        disabled={isLoading}
        value={name}
        onChange={event => setName(event.currentTarget.value)}
      />
      <button
        disabled={!nameIsValid || isLoading}
      >
        Create
      </button>
    </form>
  );
};

export { BoardCreator };
