import { DataBoard_WithTasks } from '@app/types';
import { MutationResponse, MutationAction, useMutation } from './useMutation';

interface RequestData {
  input: {
    name: string
  }
}

interface ResponseData {
  insert_boards_one: DataBoard_WithTasks
}

type InsertUserBoardResponse = MutationResponse<ResponseData>;

const useInsertUserBoard = (): MutationAction<RequestData, ResponseData> => {
  return useMutation<RequestData, ResponseData>(
    ['boards'],
    `mutation createBoard($input: boards_insert_input!) {
      insert_boards_one(object: $input) {
        id,
        name,
        createdAt,
        updatedAt,
        tasks {
          id,
          name,
          isCompleted
        }
      }
    }`
  );
};

export type { InsertUserBoardResponse };
export { useInsertUserBoard };
