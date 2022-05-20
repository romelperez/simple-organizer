import React, { FormEvent, ReactElement, useState } from 'react';

import { InsertBoardResponse, useInsertBoard } from '@app/api/boards/useInsertBoard';

const BoardCreator = (): ReactElement => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<InsertBoardResponse | null>(null);
  const insertBoard = useInsertBoard();

  const nameFormatted = name.trim();
  const nameIsValid = nameFormatted !== '' &&
    nameFormatted.length >= 2 &&
    nameFormatted.length <= 64;

  const onCreate = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!nameIsValid) {
      return;
    }

    setResponse(null);
    setIsLoading(true);

    // TODO: Handle error.
    insertBoard({ input: { name } })
      .then(newReponse => {
        setResponse(newReponse);
        setIsLoading(false);
        setName('');
      })
      .finally(null);
  };

  return (
    <div>
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

      {!!response?.error && (
        <div>There was an error creating the board. Please try again.</div>
      )}
    </div>
  );
};

export { BoardCreator };
