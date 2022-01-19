import { Platform } from 'react-native';
import { StyleSheet } from '../primitives';

export let midGray = '#737373';
// export let gray = gray45;
// gray;
export let red = '#991b1b';
// (theme.colors.error as Record<number, string>)[800];
export let green = '#15803d';

import {
  yellow100,
  gray10,
  gray15,
  gray45,
  yellow65,
  white95,
} from '../components/theme';

export default StyleSheet.create({
  cardContent: {
    // backgroundColor: yellow100,
    // borderColor: yellow65,
  },
  buttonsContent: {
    borderColor: yellow65,
    // backgroundColor: 'rgba(242, 234, 217, 1)',
    backgroundColor: white95,
    // Platform.OS === 'web' ? 'rgba(242, 247, 234, 1)' : '#f2f0e6',
  },
  button: {
    color: gray10,
  },
  headingLarge: {
    color: gray15,
  },
  // inputFocus: {
  //   borderColor: gray45,
  //   color: gray10,
  // },
  // inputFocusError: {
  //   borderColor: red,
  // },
  errorToastContainer: {
    backgroundColor: 'rgb(249, 167, 149)',
  },
  errorToastContent: {
    fontSize: 14,
    color: gray15,
  },
});

// concurrently --kill-others
