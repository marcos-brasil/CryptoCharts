import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Pressable,
  Platform,
  useWindowDimensions,
} from 'react-native';

import type { ViewStyle, GestureResponderEvent } from 'react-native';

import { CloseCircle } from '../../primitives/Icons';

import { Center, mergeStyleSheetMany, StyleSheet } from '../../primitives';
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';

import { CARD_WIDTH } from '../SparklineCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import baseTheme from './base-theme';
// let baseTheme = StyleSheet.create({
//   toastContainer: {
//     // display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     // top: height - bottomHeight,
//     // position: Platform.OS === 'web' ? ('fixed' as 'absolute') : 'absolute',
//     // borderWidth: 1,
//     height: 50,
//     borderRadius: 5,
//     // width: formDarkTheme.raw.formContent.width,
//   },

//   toastContent: {
//     fontSize: 14,
//     fontWeight: '500',
//   },

//   closeButtonBackground: {
//     position: 'absolute',
//     right: -5,
//     top: Platform.OS === 'web' ? -8 : -5,

//     zIndex: 100,
//     borderRadius: 30,

//     // borderWidth: 1,
//     // borderColor: 'red',
//     // borderRadius: 20,

//     height: Platform.OS === 'web' ? 15 : 18,
//     width: Platform.OS === 'web' ? 15 : 18,
//     backgroundColor: 'black',
//   },
//   closeButtonMargin: {
//     marginLeft: Platform.OS === 'web' ? -5 : -3,
//     marginTop: Platform.OS === 'web' ? -5 : -5,
//   },
// });

import {
  black20,
  black05,
  gray45,
  gray90,
  white30,
  red65,
  red35,
  yellow100,
  red50,
  red20,
  yellow25,
  green45,
  black12,
  yellow95,
  yellow65,
} from '../theme';

export let errorTheme = mergeStyleSheetMany(
  baseTheme,
  StyleSheet.create({
    closeButtonBackground: { backgroundColor: black12, color: red65 },
    toastContainer: {
      backgroundColor: red20,
      borderColor: red65,
      borderWidth: 1,

      // width: formDarkTheme.raw.formContent.width,
    },

    toastContent: {
      color: gray90,
    },
  })
);

export let successTheme = mergeStyleSheetMany(
  baseTheme,
  StyleSheet.create({
    closeButtonBackground: {
      backgroundColor: yellow100,
      color: yellow25,
    },
    toastContainer: {
      backgroundColor: black12,
      // backgroundColor: red20,
      borderColor: yellow25,
      borderWidth: 1,
      // width: formDarkTheme.raw.formContent.width,
    },

    toastContent: {
      color: gray90,
    },
  })
);

export let warningTheme = mergeStyleSheetMany(
  baseTheme,
  StyleSheet.create({
    closeButtonBackground: { backgroundColor: 'black', color: black20 },
    toastContainer: {
      backgroundColor: 'rgba(139, 57, 66, 1)',
      // width: formDarkTheme.raw.formContent.width,
    },

    toastContent: {
      color: '#d4d4d4',
    },
  })
);

export let notificationTheme = mergeStyleSheetMany(
  baseTheme,
  StyleSheet.create({
    closeButtonBackground: { backgroundColor: 'black', color: black20 },
    toastContainer: {
      backgroundColor: 'rgba(139, 57, 66, 1)',

      // width: formDarkTheme.raw.formContent.width,
    },

    toastContent: {
      color: '#d4d4d4',
    },
  })
);
