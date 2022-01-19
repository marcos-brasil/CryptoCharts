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
  HStack,
  StyleSheet,
  VStack,
  mergeStyleSheetMany,
} from '../../primitives';

import { Person } from '../../primitives/Icons';
import { Routes } from '../../routes';

import darkAppTheme from '../../themes/dark';
import lightAppTheme from '../../themes/light';
import { useReactNavigation } from '../../utils';
import { usePadding } from './hooks';

import { blue85, green45 } from '../theme';

export function Account({
  position,
  fontSize,
}: {
  position: number;
  fontSize: number;
}): JSX.Element {
  let nav = useReactNavigation<Routes>();

  let OSTheme = useColorScheme();
  let appTheme = OSTheme === 'dark' ? darkAppTheme : lightAppTheme;

  let styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        zIndex: 100,
        position: 'absolute',
        right: position,
        top: Platform.OS === 'web' ? 0 : -24,
      },
      text: {
        fontSize,
        paddingTop: Platform.OS === 'web' ? 2 : 10,
        paddingLeft: 4,
        color: appTheme.raw.button.color,
      },
      icon: {
        ...appTheme.raw.button,
        paddingTop: Platform.OS === 'web' ? 0 : 6,
      },
    });
  }, [appTheme.raw.button, fontSize, position]);

  return (
    <Pressable
      onPress={() => {
        console.log('account');
        nav.navigate('Account');
      }}>
      <View style={styles.container}>
        <HStack>
          <Person style={styles.raw.icon} color={styles.raw.icon.color} />
          <Text style={styles.text}>Account</Text>
        </HStack>
      </View>
    </Pressable>
  );
}

export type Props = {
  shouldDisplayAccount: boolean;
};

export function SignIn() {
  // console.log(inserts);
  let nav = useReactNavigation<Routes>();
  let OSTheme = useColorScheme();

  // This is the Call to Action Color
  let signInColor = OSTheme === 'dark' ? blue85 : green45;

  let fontSize = Platform.OS === 'web' ? 14 : 14;

  let rightActions = useMemo(() => {
    return StyleSheet.create({
      logInText: {
        fontSize,
        paddingTop: 2,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 1,
        marginRight: 10,
        fontWeight: '800',
        color: signInColor,
      },
    });
  }, [fontSize, signInColor]);

  return (
    <Pressable
      onPress={() => {
        console.log('log in');
        nav.navigate('SignIn');
      }}>
      <Text style={rightActions.logInText}>Log In</Text>
    </Pressable>
  );
}

export function SignUp() {
  // console.log(inserts);
  let nav = useReactNavigation<Routes>();
  let OSTheme = useColorScheme();

  let appTheme = OSTheme === 'dark' ? darkAppTheme : lightAppTheme;

  // This is the Call to Action Color

  let rightActions = useMemo(() => {
    return StyleSheet.create({
      signUpContainer: {
        borderBottomColor: appTheme.raw.button.color,
        borderBottomWidth: 1,
        marginRight: 10,
      },
      signUpText: {
        paddingTop: 2,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 0,
        fontWeight: '600',
        color: appTheme.raw.button.color,
      },
    });
  }, [appTheme.raw.button.color]);

  return (
    <Pressable
      onPress={() => {
        console.log('sign up');
        nav.navigate('SignUp');
      }}>
      <Center style={rightActions.signUpContainer}>
        <Text style={rightActions.signUpText}>Sign Up</Text>
      </Center>
    </Pressable>
  );
  // </View>
}

import { session as sessionAtom } from './atoms';
import { useRecoilValue } from 'recoil';

export default function RightSide(props: Props) {
  // console.log(inserts);
  let position = usePadding();

  let session = useRecoilValue(sessionAtom);

  console.log('111 session', session);

  let shouldDisplayAccount = session?.email ? true : false;

  let fontSize = Platform.OS === 'web' ? 14 : 14;

  let rightActions = useMemo(() => {
    return StyleSheet.create({
      container: {
        paddingTop: Platform.OS === 'web' ? 0 : 9,
        marginTop: Platform.OS === 'web' ? -2 : 0,
        position: 'absolute',
        right: position,
      },
    });
  }, [position]);

  return shouldDisplayAccount ? (
    <Account position={position} fontSize={fontSize} />
  ) : (
    <HStack style={rightActions.container}>
      <SignIn />
      <SignUp />
    </HStack>
  );
}
