// https://stackoverflow.com/questions/41879327/deepreadonly-object-typescript#49670389

export type Builtin = undefined | null | boolean | string | number;

export type Immutable<T> = T extends Builtin
  ? T
  : // NOTE:
  //  let use ImmutableObject for arrays. Because if the array is actually
  //  a tuple, this type information is not lost. Where if ImmutableArray
  //  where used the tuple type would become a readonly array
  // : T extends Array<infer U>
  // ? ImmutableArray<U>
  T extends Map<infer K, infer V>
  ? ImmutableMap<K, V>
  : T extends Set<infer M>
  ? ImmutableSet<M>
  : ImmutableObject<T>;

// export type ImmutableArray<T> = ReadonlyObject<Immutable<T>>
export type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
export type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type ImmutableObject<T> = T extends Function
  ? T
  : { readonly [K in keyof T]: Immutable<T[K]> };

// Inspired by
// https://github.com/krzkaczor/ts-essentials/blob/c4833fb4f9b40bd5752f12e2f382ff1e6a2b21f7/lib/types.ts

export type Mutable<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? Map<Mutable<K>, Mutable<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? Map<Mutable<K>, Mutable<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<Mutable<K>, Mutable<V>>
  : T extends Set<infer U>
  ? Set<Mutable<U>>
  : T extends ReadonlySet<infer U>
  ? Set<Mutable<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<Mutable<U>>
  : T extends Promise<infer U>
  ? Promise<Mutable<U>>
  : T extends { [K in keyof T]: T[K] }
  ? { -readonly [K in keyof T]: Mutable<T[K]> }
  : T;

export type ValidateShape<T, Shape> = T extends Shape
  ? Exclude<keyof T, keyof Shape> extends never
    ? T
    : never
  : never;
