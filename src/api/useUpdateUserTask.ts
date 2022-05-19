import { DataTask } from '@app/types';
import { MutationResponse, MutationAction, useMutation } from '@app/tools/useMutation';
import { UserBoardTasks } from './useUserBoardTasks';

interface RequestData {
  filter: {
    id: string
  }
  values: {
    name?: string
    isCompleted?: boolean
    updatedAt: string
    boardId: string
  }
}

interface ResponseData {
  update_boards_by_pk: DataTask
}

type UpdateUserTaskResponse = MutationResponse<ResponseData>;

const useUpdateUserTask = (): MutationAction<RequestData, ResponseData> => {
  return useMutation<RequestData, ResponseData>(variables => ({
    keys: [
      {
        key: ['boards', variables.values.boardId, 'with-tasks'],
        optimisticData: (data?: UserBoardTasks): UserBoardTasks | undefined => {
          if (data) {
            const newTasks = data.boards_by_pk.tasks.map(task => {
              if (task.id === variables.filter.id) {
                return { ...task, ...variables.values };
              }
              return task;
            });
            const newBoard = { ...data.boards_by_pk, tasks: newTasks };
            return { boards_by_pk: newBoard };
          }
        }
      }
    ],
    mutation: `
      mutation updateTask ($filter: tasks_pk_columns_input!, $values: tasks_set_input!) {
        update_tasks_by_pk(pk_columns: $filter, _set: $values) {
          id,
          boardId,
          name,
          isCompleted,
          createdAt,
          updatedAt
        }
      }
    `
  }));
};

export type { UpdateUserTaskResponse };
export { useUpdateUserTask };
