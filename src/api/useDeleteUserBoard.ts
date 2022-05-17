import { MutationAction, useMutation } from './useMutation';

interface RequestData {
  boardId: string
}

const useDeleteUserBoard = (): MutationAction<RequestData, undefined> => {
  return useMutation<RequestData, undefined>(
    ['boards'],
    `mutation deleteBoard ($boardId: uuid!) {
      delete_boards_by_pk(id: $boardId) {
        id,
        name
      }
    }`
  );
};

export { useDeleteUserBoard };
