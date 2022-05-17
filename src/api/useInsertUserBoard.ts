import { DataBoard_WithTasks } from '@app/types';
import { MutationAction, useMutation } from './useMutation';

interface InsertUserBoardRequest {
  input: {
    name: string
  }
}

interface InsertUserBoardResponse {
  insert_boards_one: DataBoard_WithTasks
}

const useInsertUserBoard = (): MutationAction<InsertUserBoardRequest, InsertUserBoardResponse> => {
  return useMutation<InsertUserBoardRequest, InsertUserBoardResponse>(
    'boards',
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

export { useInsertUserBoard };
