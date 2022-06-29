import { atomWithStorage } from 'jotai/utils';

import { ThemeColorScheme } from '@app/types';

const colorSchemeAtom = atomWithStorage<ThemeColorScheme | null>('theme-color-scheme', null);

export { colorSchemeAtom };
