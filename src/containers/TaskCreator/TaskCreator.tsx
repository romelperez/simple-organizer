import React, { FormEvent, ReactElement, useState } from 'react';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import IconAdd from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { useInsertTask } from '@app/api/tasks/useInsertTask';
import { TaskCreatorProps } from './TaskCreator.types';

const TaskCreator = (props: TaskCreatorProps): ReactElement => {
  const { className, boardId } = props;

  const theme = useTheme();

  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const insertTask = useInsertTask();

  const nameFormatted = name.trim();
  const isNameValid = nameFormatted !== '' && nameFormatted.length > 2 && nameFormatted.length < 100;

  const onCreate = (event: FormEvent): void => {
    event.preventDefault();

    if (!isNameValid) {
      return;
    }

    setIsLoading(true);
    setError('');

    insertTask({ input: { name, boardId } })
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
    <Box className={className} sx={{ mb: 2 }}>
      <Box
        component='form'
        sx={{
          position: 'relative',
          display: 'flex'
        }}
        onSubmit={onCreate}
      >
        <TextField
          type='text'
          size='small'
          sx={{ flex: 1 }}
          title='New task name'
          placeholder='Type new task name...'
          autoComplete='off'
          disabled={isLoading}
          value={name}
          onChange={event => setName(event.currentTarget.value)}
          inputProps={{
            style: { paddingRight: theme.spacing(6) }
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0
          }}
          title='Create new task'
          disabled={!isNameValid || isLoading}
          onClick={onCreate}
        >
          <IconAdd />
        </IconButton>
      </Box>

      {!!error && (
        <Typography sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export { TaskCreator };
