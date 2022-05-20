import { DataBoard_WithTasks } from '@app/types';
import { useQuery, QueryKey, QueryResponse } from '@app/tools/useQuery';

interface SelectBoardWithTasksData {
  boards_by_pk: DataBoard_WithTasks
}

const getSelectBoardWithTasksKey = (boardId: string): QueryKey => ['boards', boardId, 'with-tasks'];

const useSelectBoardWithTasks = (boardId: string): QueryResponse<SelectBoardWithTasksData> => {
  return useQuery<SelectBoardWithTasksData>(getSelectBoardWithTasksKey(boardId), `
    query getBoardById($boardId: uuid!) {
      boards_by_pk(id: $boardId) {
        id,
        name,
        createdAt,
        updatedAt,
        tasks {
          id,
          boardId,
          name,
          isCompleted,
          createdAt,
          updatedAt
        }
      }
    }
  `, {
    boardId
  });
};

export type { SelectBoardWithTasksData };
export { getSelectBoardWithTasksKey, useSelectBoardWithTasks };
