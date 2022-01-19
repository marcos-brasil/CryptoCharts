import React from 'react';

import { View, useColorScheme, Platform } from 'react-native';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from '../primitives';

import { black05, black20, yellow100, yellow65, white95 } from './theme';

type Props = {
  containerStyle: ViewStyle;
  contentStyle: ViewStyle;
  children?: JSX.Element | JSX.Element[];
};

export let baseTheme = StyleSheet.create({
  content: {
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export let darkTheme = StyleSheet.create({
  content: {
    backgroundColor: black05,
    borderColor: black20,
  },
});

export let lightTheme = StyleSheet.create({
  content: {
    backgroundColor: white95,
    borderColor: yellow65,
  },
});

export default function Card(props: Props): JSX.Element {
  let OSTheme = useColorScheme();

  let theme = OSTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={props.containerStyle}>
      <View style={[baseTheme.content, theme.content, props.contentStyle]}>
        {props.children ? props.children : <></>}
      </View>
    </View>
  );
}
