export interface DataBoard {
  id: string
  name: string
}

export interface DataBoardWithDetails extends DataBoard {
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
  boardsWithDetails: DataBoardWithDetails[]
  fetchBoardsWithDetails: (boardId?: DataBoardWithDetails['id']) => Promise<void>
}
