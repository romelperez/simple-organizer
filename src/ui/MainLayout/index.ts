import { memo } from '@app/tools';
import { MainLayout as Component } from './MainLayout';

const MainLayout = memo(Component);

export * from './MainLayout.types';
export { MainLayout };
