import createStore from 'zustand';

import { DataBoard_WithDetails, Store } from '@app/types';

let boardsIdCount = 0;

const useStore = createStore<Store>(set => ({
  boardsWithDetails: [],

  fetchBoardsWithDetails: async (boardId?: DataBoard_WithDetails['id']) => {
    return await new Promise(resolve => {
      setTimeout(() => {
        if (boardId !== undefined) {
          if (boardId !== 'not-found') {
            set(state => ({
              boardsWithDetails: [
                ...state.boardsWithDetails,
                { id: boardId, name: 'Board Awesome', tasksLength: 5, tasksCompleted: 20 }
              ]
            }));
          }
        } else {
          const boardsWithDetails: DataBoard_WithDetails[] = [
            { id: '1', name: 'Board 1', tasksLength: 8, tasksCompleted: 0 },
            { id: '2', name: 'Board 2', tasksLength: 12, tasksCompleted: 5 },
            { id: '3', name: 'Board 3', tasksLength: 4, tasksCompleted: 4 },
            { id: '4', name: 'Board 4', tasksLength: 0, tasksCompleted: 0 }
          ].slice(0, 1 + Math.round(Math.random() * 3));
          set({ boardsWithDetails });
        }

        resolve();
      }, 1000);
    });
  },

  createBoard: async initialData => {
    return await new Promise(resolve => {
      setTimeout(() => {
        set(state => ({
          boardsWithDetails: [
            ...state.boardsWithDetails,
            {
              ...initialData,
              id: 'board-' + String(boardsIdCount++),
              tasksCompleted: 0,
              tasksLength: 0
            }
          ]
        }));

        resolve();
      }, 1000);
    });
  }
}));

export { useStore };
