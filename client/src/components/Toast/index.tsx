import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Pressable,
  Platform,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';

import type { ViewStyle, GestureResponderEvent } from 'react-native';

import { CloseCircle } from '../../primitives/Icons';

import { Center, mergeStyleSheetMany, StyleSheet } from '../../primitives';
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';

import { CARD_WIDTH } from '../SparklineCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ToastAtom = {
  display: boolean;
  message: string;
  type: 'error' | 'success' | 'warning' | 'notification';
  timer?: number;
  containerStyle?: ViewStyle | ViewStyle[];
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  onClose?: ((event: GestureResponderEvent) => void) | null | undefined;
};

export const toastAtom = atom<ToastAtom>({
  key: 'toast',
  default: {
    display: false,
    message: '',
    type: 'success',
  },
});

import {
  errorTheme as errorDarkTheme,
  successTheme as successDarkTheme,
  warningTheme as warningDarkTheme,
  notificationTheme as notificationDarkTheme,
} from './dark-theme';

import {
  errorTheme as errorLightTheme,
  successTheme as successLightTheme,
  warningTheme as warningLightTheme,
  notificationTheme as notificationLightTheme,
} from './light-theme';

// type ToastProps = {
//   message: string;
//   type: 'error' | 'success' | 'warning' | 'notification';
//   containerStyle?: ViewStyle | ViewStyle[];
//   onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
//   onClose?: ((event: GestureResponderEvent) => void) | null | undefined;
// };

import { baseTheme as appBarBaseTheme } from '../AppBar/theme';

export default function Toast(): JSX.Element {
  // let { containerStyle, message, onPress, onClose, type } = props;
  let OSTheme = useColorScheme();
  let inserts = useSafeAreaInsets();
  let { height, width } = useWindowDimensions();

  let errorTheme = OSTheme === 'dark' ? errorDarkTheme : errorLightTheme;
  let successTheme = OSTheme === 'dark' ? successDarkTheme : successLightTheme;
  let warningTheme = OSTheme === 'dark' ? warningDarkTheme : warningLightTheme;
  let notificationTheme =
    OSTheme === 'dark' ? notificationDarkTheme : notificationLightTheme;

  let toastState = useRecoilValue(toastAtom);
  let setToaststate = useSetRecoilState(toastAtom);

  let toastWidth = CARD_WIDTH * 0.9;

  // toastWidth =
  //   toastWidth < CARD_WIDTH * 2 * 0.9 ? toastWidth : CARD_WIDTH * 2 * 0.9;

  let topPosition =
    Platform.OS === 'web'
      ? appBarBaseTheme.raw.content.height + 12
      : Platform.OS === 'ios'
      ? inserts.top + 17
      : inserts.top + 46;

  let [toastPositionFix, setToastPositionFix] = useState<ViewStyle>({
    // display: 'flex',
    // position: 'static',
    // position: 'absolute',
    top: topPosition,
    position: Platform.OS === 'web' ? ('fixed' as 'absolute') : 'absolute',
    // top: height - 200,
    left: (width - toastWidth) / 2,
    // top: 50,
    width: toastWidth,
    // zIndex: 100,
    // borderWidth: 0,
  });

  let timeoutId = useRef<null | ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (toastState.timer) {
      clearTimeout(timeoutId.current as unknown as number);
      timeoutId.current = setTimeout(() => {
        // if (toastState.onClose)

        timeoutId.current = null;
        setToaststate({
          display: false,
          type: 'success',
          message: '',
        });
      }, toastState.timer);
    }
    return () => {
      clearTimeout(timeoutId.current as unknown as number);
    };
  }, [setToaststate, toastState.timer]);

  useEffect(() => {
    let toastWidth2 = CARD_WIDTH * 0.9;
    // toastWidth2 =
    //   toastWidth2 < CARD_WIDTH * 2 * 0.9 ? toastWidth2 : CARD_WIDTH * 2 * 0.9;

    setToastPositionFix({
      // display: 'flex',
      // position: 'relative',
      position: Platform.OS === 'web' ? ('fixed' as 'absolute') : 'absolute',
      // position: Platform.OS === 'web' ? 'absolute' : 'absolute',
      // top: height * 0.9,
      // top: 10,
      // marginTop: 20,
      top: topPosition,
      left: (width - toastWidth2) / 2,
      // position: 'static',
      width: toastWidth2,
      // zIndex: 100,

      // borderWidth: 0,
    });
  }, [height, topPosition, width]);

  // console.log(toastState);

  if (toastState.display === false) {
    return <></>;
  }

  // if (timeoutId.current) {
  //   clearTimeout(timeoutId.current as unknown as number);
  // }

  let theme =
    toastState.type === 'error'
      ? errorTheme
      : toastState.type === 'success'
      ? successTheme
      : toastState.type === 'warning'
      ? warningTheme
      : notificationTheme;

  // console.log(theme.raw);
  return (
    <Center>
      <Pressable onPress={toastState.onPress}>
        <View style={[theme.toastContainer, toastPositionFix]}>
          <Text style={theme.toastContent}>{toastState.message}</Text>
          <View style={theme.closeButtonBackground}>
            <Pressable onPress={toastState.onClose}>
              <View style={theme.closeButtonMargin}>
                <CloseCircle
                  height="25px"
                  width="25px"
                  color={theme.raw.closeButtonBackground.color}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Center>
  );
}
