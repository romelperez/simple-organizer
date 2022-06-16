import { FunctionComponent, memo as reactMemo } from 'react';

const memo = <P extends object>(component: FunctionComponent<P>): FunctionComponent<P> => reactMemo(component) as any;

export { memo };
