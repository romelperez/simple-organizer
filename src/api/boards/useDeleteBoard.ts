import { MutationAction, useMutation } from '@app/tools/useMutation';
import { getSelectBoardsWithDetailsKey } from '@app/api/boards/useSelectBoardsWithDetails';

interface DeleteBoardRequest {
  boardId: string
}

const useDeleteBoard = (): MutationAction<DeleteBoardRequest> => {
  return useMutation<DeleteBoardRequest>(() => ({
    keys: [
      getSelectBoardsWithDetailsKey()
    ],
    mutation: `
      mutation deleteBoard ($boardId: uuid!) {
        delete_boards_by_pk(id: $boardId) {
          id,
          name
        }
      }
    `
  }));
};

export { useDeleteBoard };
