/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { FormEvent, ReactElement, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { InsertBoardResponse, useInsertBoard } from '@app/api';

const BoardCreator = (): ReactElement => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<InsertBoardResponse | null>(null);
  const insertBoard = useInsertBoard();

  const nameFormatted = name.trim();
  const nameIsValid = nameFormatted !== '' &&
    nameFormatted.length >= 2 &&
    nameFormatted.length <= 64;

  const onCreate = (event?: FormEvent): void => {
    event?.preventDefault();

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
    <Box sx={{ mb: 4 }}>
      <form css={{ display: 'block' }} onSubmit={onCreate}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            sx={{ flex: 1 }}
            color={response?.error ? 'error' : 'primary'}
            type='text'
            size='small'
            autoComplete='off'
            placeholder='Type new board name...'
            disabled={isLoading}
            value={name}
            onChange={event => {
              setName(event.currentTarget.value);
              setResponse(null);
            }}
          />
          <Button
            sx={{ ml: 2 }}
            variant='contained'
            disabled={!nameIsValid || isLoading}
            onClick={() => onCreate()}
          >
            Create
          </Button>
        </Box>
      </form>

      {!!response?.error && (
        <Typography
          component='p'
          sx={{ mt: 2, color: 'error.main' }}
        >
          There was an error creating the board. Please try again.
        </Typography>
      )}
    </Box>
  );
};

export { BoardCreator };
