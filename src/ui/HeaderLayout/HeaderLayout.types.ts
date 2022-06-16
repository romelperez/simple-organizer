import { DataUser } from '@app/types';

export interface HeaderLayoutProps {
  isLoading?: boolean
  isUserLoggedIn?: boolean
  user?: DataUser | null
}
