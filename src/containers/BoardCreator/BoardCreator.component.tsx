import React, { FormEvent, ReactElement, useState } from 'react';

const BoardCreator = (): ReactElement => {
  const [name, setName] = useState('');

  const nameFormatted = name.trim();
  const nameIsValid = nameFormatted !== '' &&
    nameFormatted.length >= 2 &&
    nameFormatted.length <= 64;

  const onCreate = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!nameIsValid) {
      return;
    }

    // TODO: Create board.

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
