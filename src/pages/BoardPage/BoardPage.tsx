/** @jsxImportSource @emotion/react */
import { FormEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { jsx, useTheme } from '@emotion/react';
import sortBy from 'lodash/sortBy';
import formatDate from 'date-fns/format';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Skeleton from '@mui/material/Skeleton';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import IconDone from '@mui/icons-material/Done';
import IconMoreVert from '@mui/icons-material/MoreVert';

import { parseServerDate } from '@app/tools';
import {
  useSelectBoardWithTasks,
  useDeleteBoard,
  useUpdateBoard,
  useUpdateTasks,
  useDeleteTasks
} from '@app/api';
import { LoadingContainer } from '@app/ui';
import { TaskCreator } from '@app/containers/TaskCreator';
import { Task } from '@app/containers/Task';

const BoardPage = (): ReactElement => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const boardNameElementRef = useRef<HTMLInputElement | null>(null);
  const [boardNameMenuElement, setBoardNameMenuElement] = useState<HTMLElement | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [hideCompletedTasks, setHideCompletedTasks] = useState(false);

  const { data, error } = useSelectBoardWithTasks(boardId as string);
  const updateBoard = useUpdateBoard();
  const deleteBoard = useDeleteBoard();
  const updateTasks = useUpdateTasks();
  const deleteTasks = useDeleteTasks();

  const board = data?.boards_by_pk;
  const tasks = board?.tasks ?? [];
  const visibleTasks = sortBy(
    tasks.filter(task => hideCompletedTasks ? !task.isCompleted : true),
    task => parseServerDate(task.createdAt).getTime()
  );
  const tasksCompleted = tasks.filter(task => task.isCompleted);
  const tasksUncompleted = tasks.filter(task => !task.isCompleted);

  const boardNameFormatted = boardName.trim();
  const isBoardNameValid = boardNameFormatted.length > 2 &&
    boardNameFormatted.length < 64 &&
    boardName !== board?.name;

  useEffect(() => {
    if (!board) {
      return;
    }
    setBoardName(board.name);
  }, [board]);

  const onUpdateBoardName = (event: FormEvent): void => {
    event.preventDefault();

    if (!isBoardNameValid || isUpdating) {
      return;
    }

    setIsUpdating(true);
    setErrorMsg('');

    updateBoard({
      filter: { id: boardId as string },
      values: { name: boardName }
    })
      .then(({ error }) => {
        setIsUpdating(false);
        boardNameElementRef.current?.focus();

        if (error) {
          setErrorMsg('Error updating board name.');
        }
      })
      .finally(null);
  };

  const onDelete = (): void => {
    setIsDeleting(true);
    setErrorMsg('');

    deleteTasks({
      boardId: boardId as string,
      tasksIds: tasks.map(task => task.id)
    })
      .then(async ({ error }) => {
        if (error) {
          throw new Error();
        }
        return await deleteBoard({ boardId: boardId as string });
      })
      .then(({ error }) => {
        if (error) {
          throw new Error();
        } else {
          navigate('/');
        }
      })
      .catch(() => {
        setErrorMsg('Error deleting board. Please try again.');
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const onMarkAllTasks = (): void => {
    const tasksIds = tasksUncompleted.map(task => task.id);

    if (!tasksIds.length) {
      return;
    }

    // TODO: Handle errors.
    updateTasks({
      boardId: boardId as string,
      tasksIds,
      values: {
        isCompleted: true,
        updatedAt: new Date().toISOString()
      }
    })
      .finally(null);
  };

  const onDeleteCompletedTasks = (): void => {
    // TODO: Handle errors.
    deleteTasks({
      boardId: boardId as string,
      tasksIds: tasksCompleted.map(task => task.id)
    })
      .finally(null);
  };

  if (error) {
    return (
      <Alert severity='error'>
        <AlertTitle>Board not found</AlertTitle>
        <Typography gutterBottom>
          The board you are looking for may have been deleted.
        </Typography>
        <Link to='/'>
          <Button variant='outlined' size='small'>Go to Boards</Button>
        </Link>
      </Alert>
    );
  }

  if (!board) {
    return (
      <LoadingContainer>
        <Stack spacing={2}>
          <Skeleton variant='rectangular' height='3rem' animation='wave' />
          <Skeleton variant='text' animation='wave' />
          <Skeleton variant='text' animation='wave' />
          <Skeleton variant='rectangular' height='2rem' animation='wave' />
          <Skeleton variant='rectangular' height='2rem' animation='wave' />
          <Skeleton variant='rectangular' height='2rem' animation='wave' />
        </Stack>
      </LoadingContainer>
    );
  }

  if (isDeleting) {
    return <LinearProgress />;
  }

  return (
    <main>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Box
          component='form'
          sx={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            mr: 1
          }}
          onSubmit={onUpdateBoardName}
        >
          <TextField
            ref={boardNameElementRef}
            sx={{
              flex: 1,
              ...theme.typography.h2
            }}
            size='small'
            autoComplete='off'
            disabled={isUpdating}
            value={boardName}
            onChange={event => setBoardName(event.currentTarget.value)}
            onBlur={onUpdateBoardName}
            inputProps={{
              style: {
                paddingRight: isUpdating || !isBoardNameValid ? undefined : theme.spacing(5),
                ...theme.typography.h2
              }
            }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              visibility: isUpdating || !isBoardNameValid ? 'hidden' : 'visible'
            }}
            title='Update board name'
            disabled={isUpdating || !isBoardNameValid}
            onClick={onUpdateBoardName}
          >
            <IconDone />
          </IconButton>
        </Box>
        <IconButton
          onClick={event => setBoardNameMenuElement(event.currentTarget)}
        >
          <IconMoreVert />
        </IconButton>
        <Menu
          open={Boolean(boardNameMenuElement)}
          anchorEl={boardNameMenuElement}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom'
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top'
          }}
          onClose={() => setBoardNameMenuElement(null)}
        >
          <MenuItem
            title={hideCompletedTasks ? 'Show all tasks' : 'Hide completed tasks'}
            disabled={!tasksUncompleted.length}
            onClick={() => {
              setBoardNameMenuElement(null);
              setHideCompletedTasks(v => !v);
            }}
          >
            {hideCompletedTasks ? 'Show All' : 'Hide Completed'}
          </MenuItem>
          <MenuItem
            title='Mark all uncompleted tasks as completed'
            disabled={!tasksUncompleted.length}
            onClick={() => {
              setBoardNameMenuElement(null);
              onMarkAllTasks();
            }}
          >
            Complete All
          </MenuItem>
          <MenuItem
            title='Delete all completed tasks'
            disabled={!tasksCompleted.length}
            onClick={() => {
              setBoardNameMenuElement(null);
              onDeleteCompletedTasks();
            }}
          >
            Delete Completed
          </MenuItem>
          <MenuItem
            title='Delete board and all its corresponding tasks'
            onClick={() => {
              setBoardNameMenuElement(null);
              onDelete();
            }}
          >
            Delete Board
          </MenuItem>
        </Menu>
      </Box>

      {/* TODO: Show the last update either in board or task. */}
      <Typography sx={{ mb: 2 }}>
        Last updated at: {formatDate(parseServerDate(board.updatedAt), 'PPpp')}
      </Typography>

      <Typography sx={{ mb: 2 }}>
        {tasksCompleted.length}/{tasks.length} task{tasksCompleted.length === 1 ? '' : 's'} completed
        {' '}
        ({tasks.length === 0 ? 0 : Math.floor((tasksCompleted.length / tasks.length) * 100)}%)
      </Typography>

      <Box sx={{ mb: 2 }}>
        {visibleTasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </Box>

      <TaskCreator
        boardId={boardId as string}
      />

      <Box sx={{ mb: 2 }}>
        {!!errorMsg && (
          <Typography>{errorMsg}</Typography>
        )}
      </Box>
    </main>
  );
};

export { BoardPage };
