import React from 'react';
import {
  // FlatList,
  // ImageBackground,
  // Platform,
  // StatusBar,
  View,
  // useWindowDimensions,
} from 'react-native';

// @ts-ignore
// import img from './assets/background-img.jpg';

// console.log('sSSSs', img);
// import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
// document.body.style.backgroundImage = `url(${img})`;
// document.body.style.backgroundRepeat = 'no-repeat';
// document.body.style.backgroundAttachment = 'fixed';
// document.body.style.backgroundSize = 'cover';

let isDark = window?.matchMedia('(prefers-color-scheme: dark)')?.matches;

// let darkBackgroundcolor = 'rgb(14, 15, 28)';
import { black07, yellow95 } from './theme';

// let darkBackgroundcolor = 'rgb(14, 15, 28)';
let darkBackgroundcolor = black07;
// let lightBackgroundcolor = 'rgb(233, 237, 217)';
let lightBackgroundcolor = yellow95;

document.body.style.backgroundColor = isDark
  ? darkBackgroundcolor
  : lightBackgroundcolor;

// TODO: create a detection of theme changed
// darkreader doenst extention respect sites theme
// should display a toaster every page load to deactivate
// darkreader or other equivalent extentions

// this algo workins with noir and darkreader

// setTimeout(() => {
//   Object.entries(document.body.style).map(([key, value]) => {
//     if (value.match(/^--/)) {
//       console.log(value.replace('--', '').split('-')[0]);
//     }
//   });
// }, 100);

window
  ?.matchMedia('(prefers-color-scheme: dark)')
  ?.addEventListener('change', event => {
    if (event.matches) {
      document.body.style.backgroundColor = darkBackgroundcolor;
    } else {
      document.body.style.backgroundColor = lightBackgroundcolor;
    }
  });

export default function (): JSX.Element {
  // console.log(DefaultTheme);
  return (
    <View />
    // <ImageBackground
    //   source={{ uri: img }}
    //   resizeMode="cover"
    //   style={{ position: 'absolute', width: '100%', height: '100%' }}
    // />
  );
}
