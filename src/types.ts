export interface DataBoard {
  id: string
  name: string
}

export interface DataBoard_Initial {
  name: string
}

export interface DataBoard_WithDetails extends DataBoard {
  tasksLength: number
  tasksCompleted: number
}

export interface DataTask {
  id: string
  boardId: DataBoard['id']
  name: string
  isCompleted: boolean
}

export interface Store {
  boardsWithDetails: DataBoard_WithDetails[]
  fetchBoardsWithDetails: (boardId?: DataBoard_WithDetails['id']) => Promise<void>
  createBoard: (initialData: DataBoard_Initial) => Promise<void>
}
