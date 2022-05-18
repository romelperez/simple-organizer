import { DataBoard_WithTasks } from '@app/types';
import { useQuery, QueryResponse } from '@app/tools/useQuery';

interface UserBoardTasks {
  boards_by_pk: DataBoard_WithTasks
}

const useUserBoardTasks = (boardId: string): QueryResponse<UserBoardTasks> => {
  return useQuery<UserBoardTasks>(['boards', boardId], `
    query getBoardById($boardId: uuid!) {
      boards_by_pk(id: $boardId) {
        id,
        name,
        createdAt,
        updatedAt,
        tasks {
          id,
          name,
          isCompleted,
          boardId
        }
      }
    }
  `, {
    boardId
  });
};

export type { UserBoardTasks };
export { useUserBoardTasks };
