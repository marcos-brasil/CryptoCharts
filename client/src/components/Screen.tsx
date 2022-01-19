// type Props: {
//   children: React.Func
// }

import React from 'react';

import { StatusBar, useColorScheme, SafeAreaView } from 'react-native';

import Bg from './Background';
// import AppBar from './AppBar-old';
import Toast from './Toast';

import AppBar, { darkTheme, lightTheme } from './AppBar';

export default function Screen({
  children,
}: React.HTMLAttributes<unknown>): JSX.Element {
  let OSTheme = useColorScheme();

  let theme = OSTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <>
      <Bg />
      <SafeAreaView style={theme.content}>
        <StatusBar
          barStyle={OSTheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <AppBar />
        <Toast />
      </SafeAreaView>

      {children}
    </>
  );
}
