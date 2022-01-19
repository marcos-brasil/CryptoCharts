import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  Text,
  View,
  ViewStyle,
  useColorScheme,
  GestureResponderEvent,
  useWindowDimensions,
} from 'react-native';

import {
  Center,
  DividerVerticle,
  HStack,
  StyleSheet,
  VStack,
  mergeStyleSheetMany,
} from '../../primitives';

import type { Style } from '../../primitives';
import { darkTheme, lightTheme } from './theme';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { CARD_PADDING, CARD_WIDTH } from '../SparklineCard/constants';

let CARD_TOTAL_WIDTH = CARD_WIDTH + 2 * CARD_PADDING;

export function useAppBarStyle(): Style {
  let inserts = useSafeAreaInsets();
  // console.log(inserts);
  const { width } = useWindowDimensions();

  let OSTheme = useColorScheme();

  let theme = OSTheme === 'dark' ? darkTheme : lightTheme;

  let [appBarPositionStyle, setAppBarPositionStyle] = useState(
    mergeStyleSheetMany(
      theme,
      StyleSheet.create({
        container: {
          ...(inserts as ViewStyle),
          top: inserts.top,
          width: width,
        },
        content: theme.content,
      })
    )
  );

  useEffect(() => {
    setAppBarPositionStyle(
      mergeStyleSheetMany(
        theme,
        StyleSheet.create({
          container: {
            ...(inserts as ViewStyle),
            top: inserts.top,
            width: width,
          },
          content: theme.content,
        })
      )
    );
  }, [theme, inserts, width]);

  return appBarPositionStyle;
}

export function usePadding(): number {
  // console.log(inserts);
  const { width } = useWindowDimensions();

  let paddingPageLarge = (width - 3 * CARD_TOTAL_WIDTH) / 2;
  let paddingPageMedium = (width - 2 * CARD_TOTAL_WIDTH) / 2;
  let paddingPageShort = (width - 1 * CARD_TOTAL_WIDTH) / 2;

  let basePosition = 10;

  let position = paddingPageShort < 0 ? basePosition : paddingPageShort;
  position = paddingPageMedium < 0 ? position : paddingPageMedium;
  position = paddingPageLarge < 0 ? position : paddingPageLarge;

  position = position < basePosition ? basePosition : position;

  return position;
}
