export let delay = (ms: number): Promise<null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
};

export { lens } from './lens';
export type { Immutable, Mutable } from './immutable';

export { Emitter } from './emitter';

export { default as lazyList } from './lazy-list';

export function getLast<T>(a: T[]): T {
  return a[a.length - 1];
}

// https://decipher.dev/30-seconds-of-typescript/docs/debounce/
export const debounce = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  FuncOrClass: Function,
  ms: number
): ((...args: unknown[]) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  // detect is is class or function.
  // based on solution from Nate :)
  // https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript
  const propertyNames = Object.getOwnPropertyNames(FuncOrClass);
  const isFunc =
    !propertyNames.includes('prototype') || propertyNames.includes('arguments');

  return (...args: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (isFunc) {
        FuncOrClass(...args);
      } else {
        // @ts-ignore
        // eslint-disable-next-line no-new
        new FuncOrClass(...args);
      }
    }, ms);
  };
};

export function debounce1<S>(fn: (s: S) => void, ms: number): (s: S) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (s: S) => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(s);
    }, ms);
  };
}

export function debounce2<R, S>(
  fn: (r: R, s: S) => void,
  ms: number
): (r: R, s: S) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (r: R, s: S) => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(r, s);
    }, ms);
  };
}

// based on debounce
export const throttle = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  FuncOrClass: Function,
  ms: number
): ((...args: unknown[]) => void) => {
  // let timeoutId: ReturnType<typeof setTimeout>;

  // detect is is class or function.
  // based on solution from Nate :)
  // https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript
  const propertyNames = Object.getOwnPropertyNames(FuncOrClass);
  const isFunc =
    !propertyNames.includes('prototype') || propertyNames.includes('arguments');

  let hasBeingCalled = false;
  return (...args: unknown[]) => {
    if (hasBeingCalled) {
      return;
    }

    hasBeingCalled = true;

    setTimeout(() => {
      if (isFunc) {
        FuncOrClass(...args);
        hasBeingCalled = false;
      } else {
        // @ts-ignore
        // eslint-disable-next-line no-new
        new FuncOrClass(...args);
        hasBeingCalled = false;
      }
    }, ms);
  };
};

export function throttle1<S>(fn: (s: S) => void, ms: number): (s: S) => void {
  let hasBeenCalled = false;
  return (s: S) => {
    if (hasBeenCalled) {
      return;
    }

    hasBeenCalled = true;

    setTimeout(() => {
      fn(s);
      hasBeenCalled = false;
    }, ms);
  };
}

export function throttle2<R, S>(
  fn: (r: R, s: S) => void,
  ms: number
): (r: R, s: S) => void {
  let hasBeenCalled = false;

  return (r: R, s: S) => {
    if (hasBeenCalled) {
      return;
    }
    hasBeenCalled = true;

    setTimeout(() => {
      fn(r, s);
      hasBeenCalled = false;
    }, ms);
  };
}

export const isProd = (): boolean => process.env.NODE_ENV === 'production';
export const isDev = (): boolean => process.env.NODE_ENV === 'development';
export const isTest = (): boolean => process.env.NODE_ENV === 'test';

// https://en.wikipedia.org/wiki/Normalization_(statistics)
export const rescale =
  (boundaryUp: number, boundaryLower: number) =>
  (min: number, max: number) =>
  (valueToRescale: number): number =>
    boundaryUp +
    ((valueToRescale - min) * (boundaryLower - boundaryUp)) / (max - min);
