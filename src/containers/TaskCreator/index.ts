import { memo } from '@app/tools';
import { TaskCreator as Component } from './TaskCreator';

const TaskCreator = memo(Component);

export * from './TaskCreator.types';
export { TaskCreator };
