import { DataTask } from '@app/types';
import { MutationResponse, MutationAction, useMutation } from '@app/tools/useMutation';
import { SelectBoardWithTasksData, getSelectBoardWithTasksKey } from '@app/api/boards/useSelectBoardWithTasks';

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

type UpdateTaskResponse = MutationResponse<ResponseData>;

const useUpdateTask = (): MutationAction<RequestData, ResponseData> => {
  return useMutation<RequestData, undefined, ResponseData>(data => ({
    keys: [
      {
        key: getSelectBoardWithTasksKey(data.values.boardId),
        optimisticData: (boardWithTasksData?: SelectBoardWithTasksData): SelectBoardWithTasksData | undefined => {
          if (boardWithTasksData) {
            const newTasks = boardWithTasksData.boards_by_pk.tasks.map(task => {
              if (task.id === data.filter.id) {
                return { ...task, ...data.values };
              }
              return task;
            });
            const newBoard = { ...boardWithTasksData.boards_by_pk, tasks: newTasks };
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

export type { UpdateTaskResponse };
export { useUpdateTask };
