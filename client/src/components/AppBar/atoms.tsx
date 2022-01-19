import { atom } from 'recoil';

import { Routes } from '../../routes';

export const routeStateAtom = atom<Routes | null>({
  key: 'routeState',
  default: null,
});

export * from '../../atoms';
