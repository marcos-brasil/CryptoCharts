import React from 'react';
import {
  // FlatList,
  ImageBackground,
  useColorScheme,
  // Platform,
  // StatusBar,
  // useWindowDimensions,
} from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// let darkImg = require('../../assets/background-dark-img.jpg');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// let lightImg = require('../../assets/background-light-img.jpg');

let style = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  // backgroundColor: 'red',
};

import { yellow95, black07 } from './theme';

export default function (): JSX.Element {
  let theme = useColorScheme();

  let color = theme === 'dark' ? black07 : yellow95;
  return (
    <ImageBackground
      sresizeMode="cover"
      // @ts-ignore
      style={{ ...style, backgroundColor: color }}
    />
  );
}
