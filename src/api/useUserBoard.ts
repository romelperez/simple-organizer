import { DataBoard } from '@app/types';
import { useQuery, QueryResponse } from '@app/api/useQuery';

interface UserBoard {
  boards_by_pk: DataBoard
}

const useUserBoard = (boardId: string): QueryResponse<UserBoard> => {
  return useQuery<UserBoard>(`boards/${boardId}`, `
    query ($boardId: uuid!) {
      boards_by_pk(id: $boardId) {
        id,
        name,
        createdAt,
        updatedAt
      }
    }
  `, {
    boardId
  });
};

export type { UserBoard };
export { useUserBoard };
