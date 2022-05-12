import type { NhostClient } from '@nhost/nhost-js';

export interface DataUser {
  id: string
  email: string
  displayName: string
  avatarUrl: string
  createdAt: string
}

export interface DataBoard {
  id: string
  name: string
  createdAt: string
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
  boardId: string
  userId: string
  name: string
  isCompleted: boolean
  createdAt: string
}

export interface DataTask_Initial {
  boardId: string
  name: string
  isCompleted: boolean
}

export interface Store {
  nhost: NhostClient | null
  user: DataUser | null
  setup: () => void
  isAuthenticated: () => boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}
