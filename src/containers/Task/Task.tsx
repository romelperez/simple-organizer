import React, { FormEvent, ReactElement, useState } from 'react';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import IconDone from '@mui/icons-material/Done';
import IconDelete from '@mui/icons-material/Delete';

import { useOnUpdate } from '@app/tools/useOnUpdate';
import { useUpdateTask } from '@app/api/tasks/useUpdateTask';
import { useDeleteTask } from '@app/api/tasks/useDeleteTask';
import { TaskProps } from './Task.types';

const Task = (props: TaskProps): ReactElement => {
  const { task } = props;

  const theme = useTheme();

  const [name, setName] = useState(task.name);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const nameFormatted = name.trim();
  const areChangesValid = nameFormatted !== '' &&
    nameFormatted.length > 2 &&
    nameFormatted.length < 100;
  const hasUserChanges = task.name !== name || task.isCompleted !== isCompleted;

  const update = (): void => {
    if (!areChangesValid || !hasUserChanges) {
      return;
    }

    const { boardId } = task;
    const updatedAt = new Date().toUTCString();

    setIsLoading(true);
    setError('');

    updateTask({
      filter: { id: task.id },
      values: { name: nameFormatted, isCompleted, boardId, updatedAt }
    })
      .then(({ error }) => {
        if (error) {
          setError('Error updating task.');
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onUpdate = (event: FormEvent): void => {
    event.preventDefault();
    update();
  };

  const onNameBlur = (): void => {
    if (task.name !== name) {
      update();
    }
  };

  const onDelete = (): void => {
    setIsLoading(true);

    deleteTask({ boardId: task.boardId, taskId: task.id })
      .then(({ error }) => {
        if (error) {
          setError('Error deleting task. Please try again.');
        }
      })
      .finally(() => setIsLoading(false));
  };

  useOnUpdate(() => {
    update();
  }, [isCompleted]);

  useOnUpdate(() => {
    setName(task.name);
    setIsCompleted(task.isCompleted);
  }, [task.updatedAt]);

  return (
    <Box sx={{ mb: 1 }}>
      <Box
        component='form'
        sx={{ display: 'flex' }}
        onSubmit={onUpdate}
      >
        <Checkbox
          title={isCompleted ? 'Mark task as uncompleted' : 'Mark task as completed'}
          disabled={isLoading}
          checked={isCompleted}
          onChange={event => setIsCompleted(event.currentTarget.checked)}
        />
        <Box sx={{ position: 'relative', flex: 1, display: 'flex', ml: 1, mr: 1 }}>
          <TextField
            type='text'
            size='small'
            sx={{ flex: 1 }}
            autoComplete='off'
            placeholder='Task name'
            disabled={isLoading}
            value={name}
            onChange={event => setName(event.currentTarget.value)}
            onBlur={onNameBlur}
            inputProps={{
              style: { paddingRight: theme.spacing(5) }
            }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0
            }}
            title='Update task name'
            disabled={!areChangesValid || !hasUserChanges || isLoading}
          >
            <IconDone />
          </IconButton>
        </Box>
        <IconButton
          title='Delete task'
          disabled={isLoading}
          onClick={onDelete}
        >
          <IconDelete />
        </IconButton>
      </Box>

      {!!error && (
        <Typography>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export { Task };
