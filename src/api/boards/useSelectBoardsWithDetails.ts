import { DataBoard_WithDetails } from '@app/types';
import { useQuery, QueryKey, QueryResponse } from '@app/tools/useQuery';

interface SelectBoardsWithDetailsData {
  boards: DataBoard_WithDetails[]
}

const getSelectBoardsWithDetailsKey = (): QueryKey => ['boards-with-details'];

const useSelectBoardsWithDetails = (): QueryResponse<SelectBoardsWithDetailsData> => {
  return useQuery<SelectBoardsWithDetailsData>(getSelectBoardsWithDetailsKey(), `
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

export type { SelectBoardsWithDetailsData };
export { getSelectBoardsWithDetailsKey, useSelectBoardsWithDetails };
