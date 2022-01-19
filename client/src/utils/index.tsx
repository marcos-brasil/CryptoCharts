import type { Ref } from 'react';
export * from './use-react-navigation';
export * from '../../../shared/utils';

import './event-state-machine';

export { default as Lifo } from './lifo';
import './stop-warn';

export const raf = (fn: (n: number) => void): void => {
  window.requestAnimationFrame(fn);
};

export function readRefFunc<S>(
  r: Ref<null | S>,
  handler: (s: (ss: S | null) => void) => unknown
): void {
  if (r instanceof Function) {
    handler(r);
    return;
  }
}

export function readRefObj<S>(
  r: Ref<null | S>,
  handler: (s: S) => unknown
): void {
  if (r instanceof Function) {
    return;
  }

  if (r && r?.current) {
    handler(r.current);
  }
}
