import { DataBoard_WithDetails } from '@app/types';
import { useQuery, QueryResponse } from '@app/api/useQuery';

interface UserBoards {
  boards: DataBoard_WithDetails[]
}

const useUserBoards = (): QueryResponse<UserBoards> => {
  return useQuery<UserBoards>('boards', `
    query getBoards {
      boards {
        id,
        name,
        createdAt,
        updatedAt,
        tasks_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  `);
};

export type { UserBoards };
export { useUserBoards };
