import React from 'react';

import { StyleSheet as StyleSheetRN, View } from 'react-native';
import type { ViewProps, ViewStyle } from 'react-native';

export { default as Canvas } from './Canvas';

export * from './StyleSheet';

export let primitiveStyles = StyleSheetRN.create({
  box: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // overflow: 'hidden',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // overflow: 'hidden',
  },
  hstack: {
    display: 'flex',
    flexDirection: 'row',
    // height: '100%',
    // width: '100%',
  },
  vstack: {
    display: 'flex',
    flexDirection: 'column',
    // height: '100%',
    // width: '100%',
  },

  dividerHorizontal: {
    borderBottomWidth: 1,
  },
  dividerVerticle: {
    borderRightWidth: 1,
  },
});

export type PrimitiveProps = ViewProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: JSX.Element | JSX.Element[] | string | any;
};

export function DividerHorizontal(props: PrimitiveProps): JSX.Element {
  return (
    <View style={[primitiveStyles.dividerHorizontal, props.style as ViewStyle]}>
      {props.children}
    </View>
  );
}

export function DividerVerticle(props: PrimitiveProps): JSX.Element {
  return (
    <View style={[primitiveStyles.dividerVerticle, props.style as ViewStyle]}>
      {props.children}
    </View>
  );
}

export function Box(props: PrimitiveProps): JSX.Element {
  return (
    <View style={[primitiveStyles.box, props.style as ViewStyle]}>
      {props.children}
    </View>
  );
}

export function Center(props: PrimitiveProps): JSX.Element {
  return (
    <View style={[primitiveStyles.center, props.style as ViewStyle]}>
      {props.children}
    </View>
  );
}

export function HStack(props: PrimitiveProps): JSX.Element {
  return (
    <View style={[primitiveStyles.hstack, props.style as ViewStyle]}>
      {props.children}
    </View>
  );
}

export function VStack(props: PrimitiveProps): JSX.Element {
  return (
    <View style={[primitiveStyles.vstack, props.style as ViewStyle]}>
      {props.children}
    </View>
  );
}
