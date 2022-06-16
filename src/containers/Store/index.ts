import { memo } from '@app/tools';
import { Store as Component } from './Store';

const Store = memo(Component);

export * from './Store.types';
export { Store };
