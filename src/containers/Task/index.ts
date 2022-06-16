import { memo } from '@app/tools';
import { Task as Component } from './Task';

const Task = memo(Component);

export * from './Task.types';
export { Task };
