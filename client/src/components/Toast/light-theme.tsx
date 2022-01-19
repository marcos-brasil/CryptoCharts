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
  red65,
  red20,
  red50,
  red35,
  yellow100,
  red75,
  gray10,
  yellow65,
  orange95,
  black12,
} from '../theme';

export let errorTheme = mergeStyleSheetMany(
  baseTheme,
  StyleSheet.create({
    closeButtonBackground: { backgroundColor: yellow100, color: red35 },

    toastContainer: {
      backgroundColor: red75,
      borderColor: red20,
      borderWidth: 1,

      // width: formDarkTheme.raw.formContent.width,
    },

    toastContent: {
      color: gray10,
    },
  })
);

export let successTheme = mergeStyleSheetMany(
  baseTheme,
  StyleSheet.create({
    closeButtonBackground: { backgroundColor: black12, color: yellow65 },
    toastContainer: {
      backgroundColor: orange95,
      borderColor: yellow65,
      borderWidth: 1,
      // width: formDarkTheme.raw.formContent.width,
    },

    toastContent: {
      color: gray10,
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
