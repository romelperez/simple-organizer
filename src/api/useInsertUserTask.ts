import { DataTask } from '@app/types';
import { MutationResponse, MutationAction, useMutation } from '@app/tools/useMutation';

interface RequestData {
  input: {
    name: string
    boardId: string
  }
}

interface ResponseData {
  insert_tasks_one: DataTask
}

type InsertUserTaskResponse = MutationResponse<ResponseData>;

const useInsertUserTask = (): MutationAction<RequestData, ResponseData> => {
  return useMutation<RequestData, ResponseData>(variables => ({
    keys: [
      ['boards', variables.input.boardId]
    ],
    mutation: `
      mutation insertTask($input: tasks_insert_input!) {
        insert_tasks_one(object: $input) {
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

export type { InsertUserTaskResponse };
export { useInsertUserTask };
