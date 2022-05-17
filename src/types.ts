export interface DataUser {
  id: string
  email: string
  displayName: string
  avatarUrl: string
  createdAt: string
  updatedAt: string
}

export interface DataBoard {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface DataBoard_WithTasks extends DataBoard {
  tasks: DataTask[]
}

export interface DataBoard_Initial {
  name: string
}

export interface DataBoard_WithDetails extends DataBoard {
  tasks_aggregate: {
    aggregate: {
      count: number
    }
  }
}

export interface DataTask {
  id: string
  boardId: string
  name: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export interface DataTask_Initial {
  boardId: string
  name: string
  isCompleted: boolean
}
