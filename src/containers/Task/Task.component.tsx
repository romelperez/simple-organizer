import React, { FormEvent, ReactElement, useState } from 'react';

import { DataTask } from '@app/types';
import { useOnUpdate } from '@app/tools/useOnUpdate';
import { useUpdateUserTask } from '@app/api/useUpdateUserTask';
import { useDeleteUserTask } from '@app/api/useDeleteUserTask';

interface TaskProps {
  task: DataTask
}

const Task = (props: TaskProps): ReactElement => {
  const { task } = props;

  const [name, setName] = useState(task.name);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const updateUserTask = useUpdateUserTask();
  const deleteUserTask = useDeleteUserTask();

  const nameFormatted = name.trim();
  const areChangesValid = nameFormatted !== '' && nameFormatted.length > 2 && nameFormatted.length < 100;
  const hasUserChanges = task.name !== name || task.isCompleted !== isCompleted;

  const update = (): void => {
    if (!areChangesValid || !hasUserChanges) {
      return;
    }

    const { boardId } = task;
    const updatedAt = new Date().toUTCString();

    setIsLoading(true);
    setError('');

    updateUserTask({
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
    deleteUserTask({ boardId: task.boardId, taskId: task.id })
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
    <div
      style={{
        margin: '0 0 10px'
      }}
    >
      <form onSubmit={onUpdate}>
        <input
          type='checkbox'
          disabled={isLoading}
          checked={isCompleted}
          onChange={event => setIsCompleted(event.currentTarget.checked)}
        />
        {' '}
        <input
          style={{
            width: 200
          }}
          type='text'
          placeholder='Task name'
          disabled={isLoading}
          value={name}
          onChange={event => setName(event.currentTarget.value)}
          onBlur={onNameBlur}
        />
        {' '}
        <button
          disabled={!areChangesValid || isLoading}
        >
          Save
        </button>
        {' '}
        <button
          disabled={isLoading}
          onClick={onDelete}
        >
          Delete
        </button>
      </form>
      {!!error && (
        <div>{error}</div>
      )}
    </div>
  );
};

export type { TaskProps };
export { Task };
