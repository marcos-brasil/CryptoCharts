import React from 'react';

import { StyleSheet as StyleSheetRN, View } from 'react-native';
import type { ViewProps, ViewStyle } from 'react-native';

export { default as Canvas } from './Canvas';

export type Style = Record<string, Record<string, unknown>> & {
  raw: Record<string, Record<string, unknown>>;
};

export let StyleSheet = {
  ...StyleSheetRN,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create<T extends StyleSheetRN.NamedStyles<T> | StyleSheetRN.NamedStyles<any>>(
    style: T
  ): T & { raw: T } {
    let obj = StyleSheetRN.create(style);

    Object.defineProperty(obj, 'raw', {
      value: style,
      enumerable: false,
    });

    return obj;
  },
};

export function mergeStyleSheetMany<A, B>(
  ...list: [A & { raw: A }, B & { raw: B }]
): A & B & { raw: A & B };

export function mergeStyleSheetMany<A, B, C>(
  ...list: [A & { raw: A }, B & { raw: B }, C & { raw: C }]
): A & B & C & { raw: A & B & C };

export function mergeStyleSheetMany<A, B, C, D>(
  ...list: [A & { raw: A }, B & { raw: B }, C & { raw: C }, D & { raw: D }]
): A & B & C & D & { raw: A & B & C & D };

export function mergeStyleSheetMany<A, B, C, D, E>(
  ...list: [
    A & { raw: A },
    B & { raw: B },
    C & { raw: C },
    D & { raw: D },
    E & { raw: E }
  ]
): A & B & C & D & E & { raw: A & B & C & D & E };

export function mergeStyleSheetMany<A, B, C, D, E>(
  ...list:
    | [A & { raw: A }, B & { raw: B }]
    | [A & { raw: A }, B & { raw: B }, C & { raw: C }]
    | [A & { raw: A }, B & { raw: B }, C & { raw: C }, D & { raw: D }]
    | [
        A & { raw: A },
        B & { raw: B },
        C & { raw: C },
        D & { raw: D },
        E & { raw: E }
      ]
):
  | (A & B & { raw: A & B })
  | (A & B & C & { raw: A & B & C })
  | (A & B & C & D & { raw: A & B & C & D })
  | (A & B & C & D & E & { raw: A & B & C & D & E }) {
  let [a, b, c, d, e] = list;

  if (list.length === 4 && c != null && d != null && e != null) {
    return mergeStyleSheet(
      mergeStyleSheet(mergeStyleSheet(mergeStyleSheet(a, b), c), d),
      e
    );
  }

  if (list.length === 4 && c != null && d != null) {
    return mergeStyleSheet(mergeStyleSheet(mergeStyleSheet(a, b), c), d);
  }

  if (list.length === 3 && c != null) {
    return mergeStyleSheet(mergeStyleSheet(a, b), c);
  }

  return mergeStyleSheet(a, b);
}

type MergedStyles<A, B> = A & B & { raw: A & B };

export function mergeStyleSheet<A, B>(
  a: A & { raw: A },
  b: B & { raw: B }
): MergedStyles<A, B> {
  let keys = [...Object.keys(a), ...Object.keys(b)] as (keyof A & keyof B)[];

  let style = {} as MergedStyles<A, B>;

  for (let key of keys) {
    if (a.raw[key] == null) {
      // @ts-ignore
      style[key] = b.raw[key];
      continue;
    }

    if (b.raw[key] == null) {
      // @ts-ignore
      style[key] = a.raw[key];
      continue;
    }

    // @ts-ignore
    style[key] = { ...a.raw[key], ...b.raw[key] };
  }

  // Object.defineProperty(style, 'raw', {
  //   value: style,
  //   enumerable: false,
  // });

  return StyleSheet.create(style);
}
