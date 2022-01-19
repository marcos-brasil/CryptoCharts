import { Platform } from 'react-native';

import { StyleSheet, mergeStyleSheetMany } from '../../primitives';

import { black07, gray45, yellow95 } from '../theme';

export let baseTheme = StyleSheet.create({
  container: {
    // zIndex: 200,
    // marginTop: Platform.OS === 'web' ? 13 : 6,
    // little TS hack.
    // react-native style doesnt accept fixed position.
    //  but it is need on web
    position: Platform.OS === 'web' ? ('fixed' as 'absolute') : 'absolute',
    height: 10,
    width: '100%',
    minWidth: Platform.OS === 'web' ? '380px' : '100%',
  },
  content: {
    zIndex: 100,
    width: '100%',
    borderRadius: 0,
    borderWidth: 0,
    // borderBottomWidth: Platform.OS === 'web' ? 0 : 0,
    height: Platform.OS === 'web' ? 66 : 50,
    paddingRight: 4,
    paddingLeft: 4,
    paddingTop: 24,
    marginTop: Platform.OS === 'android' ? 6 : -1,
  },
  dividerVertical: {
    height: '70%',
  },
  buttonsContent: {
    marginTop: Platform.OS === 'web' ? -10 : 0,
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    // paddingTop: -4,
    position: 'absolute',
  },
});

export let darkTheme = mergeStyleSheetMany(
  baseTheme,
  StyleSheet.create({
    content: {
      // borderColor: 'rgba(255, 255, 255, 0.2)',
      backgroundColor: black07,
      // Platform.OS === 'web' ? 'rgb(14, 15, 28)' : 'rgb(14, 15, 28)',
    },
    dividerVertical: {
      borderColor: gray45,
    },
  })
);

export let lightTheme = mergeStyleSheetMany(
  baseTheme,
  StyleSheet.create({
    content: {
      // borderColor: 'rgba(0, 0, 0, 0.1)',
      // backgroundColor: 'rgba(242, 234, 217, 1)',
      backgroundColor: yellow95,
      // Platform.OS === 'web' ? 'rgb(233, 237, 217)' : 'rgba(229, 225, 206, 1)',
      // Platform.OS === 'web' ? 'hsl(72, 95.7%, 95%)' : 'hsl(72, 95.7%, 95%)',
    },
    dividerVertical: {
      borderColor: gray45,
    },
  })
);
