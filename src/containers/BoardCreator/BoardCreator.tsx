/** @jsxImportSource @emotion/react */
import { jsx, useTheme } from '@emotion/react';
import { FormEvent, ReactElement, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import IconAdd from '@mui/icons-material/Add';

import { InsertBoardResponse, useInsertBoard } from '@app/api';

const BoardCreator = (): ReactElement => {
  const theme = useTheme();

  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<InsertBoardResponse | null>(null);

  const insertBoard = useInsertBoard();

  const nameFormatted = name.trim();
  const nameIsValid = nameFormatted !== '' &&
    nameFormatted.length >= 2 &&
    nameFormatted.length <= 64;
  const isSaveDisabled = !nameIsValid || isLoading;

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
      <Box
        component='form'
        sx={{
          position: 'relative',
          display: 'flex'
        }}
        onSubmit={onCreate}
      >
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
          inputProps={{
            style: {
              paddingRight: isSaveDisabled ? undefined : theme.spacing(5)
            }
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0
          }}
          title='Create new board'
          disabled={isSaveDisabled}
          onClick={() => onCreate()}
        >
          <IconAdd />
        </IconButton>
      </Box>

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
