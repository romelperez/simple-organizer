import { DataBoard } from '@app/types';
import { useQuery, QueryResponse } from '@app/api/useQuery';

interface UserBoards {
  boards: DataBoard[]
}

const useUserBoards = (): QueryResponse<UserBoards> => {
  return useQuery<UserBoards>('boards', `
    query getBoards {
      boards {
        id,
        name,
        createdAt,
        updatedAt
      }
    }
  `);
};

export type { UserBoards };
export { useUserBoards };
