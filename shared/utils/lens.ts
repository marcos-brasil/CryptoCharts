// inspired by
// https://github.com/utatti/lens.ts/blob/636971aab4c87edce511359353ce841c63cebefb/src/index.ts

export type Getter<T, V> = (target: T) => V;
export type Setter<T> = (target: T) => T;
export type SetterCtor<T, V> = (value: V) => Setter<T>;

export type Lens<T, U> = {
  <K extends keyof U>(key: K): Lens<T, U[K]>;
  _get: Getter<T, U>;
  _set: SetterCtor<T, U>;
  get<V>(fn?: Getter<U, V> | undefined): Getter<T, V>;
  set(modifier: U | Setter<U>): Setter<T>;
};

export function lensTransform<T, U>(
  get: Getter<T, U>,
  set: SetterCtor<T, U>
): Lens<T, U> {
  return lensCtor<T, U>(get, set);
}

export function lens<T>(): Lens<T, T> {
  return lensCtor<T, T>(
    t => t,
    v => _ => v
  );
}

function lensCtor<T, U>(get: Getter<T, U>, set: SetterCtor<T, U>) {
  //
  const ctx = <K extends keyof U>(key: K): Lens<T, U[K]> => {
    const other = lensCtor<U, U[K]>(
      t => t[key],
      v => t => {
        const copied = shallowCopy(t);
        copied[key] = v;
        return copied;
      }
    );

    return join<T, U, U[K]>(ctx, other);
  };

  ctx._get = get;
  ctx._set = set;

  ctx.get = <V>(fn?: Getter<U, V>): Getter<T, V> => {
    if (fn != null) {
      return (t: T) => fn(get(t));
    }
    return get as unknown as Getter<T, V>;
  };

  ctx.set = (modifier: U | Setter<U>): Setter<T> => {
    if (typeof modifier === 'function') {
      return (t: T) => set((modifier as Setter<U>)(get(t)))(t);
    }
    return set(modifier);
  };

  return ctx;
}

function join<T, U, V>(ctx: Lens<T, U>, other: Lens<U, V>): Lens<T, V> {
  return lensCtor(
    t => other._get(ctx._get(t)),
    v => t => ctx._set(other._set(v)(ctx._get(t)))(t)
  );
}

function shallowCopy<T>(x: T) {
  if (Array.isArray(x)) {
    return x.slice() as unknown as T;
  }

  if (x && typeof x === 'object') {
    return Object.assign({}, x);
  }

  return x;
}
