import React, { FormEvent, ReactElement, useState } from 'react';

import { useStore } from '@app/services/store';

const BoardCreator = (): ReactElement => {
  const [name, setName] = useState('');
  const createBoard = useStore(state => state.createBoard);

  const nameFormatted = name.trim();
  const nameIsValid = nameFormatted !== '' &&
    nameFormatted.length >= 2 &&
    nameFormatted.length <= 64;

  const onCreate = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!nameIsValid) {
      return;
    }

    createBoard({ name }).finally(null);
    setName('');
  };

  return (
    <form onSubmit={onCreate}>
      <input
        type='text'
        placeholder='Type new board name..'
        value={name}
        onChange={event => setName(event.currentTarget.value)}
      />
      <button
        disabled={!nameIsValid}
      >
        Create
      </button>
    </form>
  );
};

export { BoardCreator };
