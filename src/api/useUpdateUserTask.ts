import { DataBoard } from '@app/types';
import { MutationResponse, MutationAction, useMutation } from '@app/tools/useMutation';

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
  update_boards_by_pk: DataBoard
}

type UpdateUserTaskResponse = MutationResponse<ResponseData>;

const useUpdateUserTask = (): MutationAction<RequestData, ResponseData> => {
  return useMutation<RequestData, ResponseData>(variables => ({
    keys: [
      ['boards', variables.values.boardId]
    ],
    mutation: `
      mutation updateTask ($filter: tasks_pk_columns_input!, $values: tasks_set_input!) {
        update_tasks_by_pk(pk_columns: $filter, _set: $values) {
          id,
          name,
          isCompleted,
          createdAt,
          updatedAt,
          boardId
        }
      }
    `
  }));
};

export type { UpdateUserTaskResponse };
export { useUpdateUserTask };
