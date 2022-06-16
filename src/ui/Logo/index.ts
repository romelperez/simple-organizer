import { memo } from '@app/tools';
import { Logo as Component } from './Logo';

const Logo = memo(Component);

export * from './Logo.types';
export { Logo };
