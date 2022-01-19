import { StyleSheet } from '../primitives';
import { Platform } from 'react-native';

import {
  red65,
  gray90,
  gray45,
  green70,
  black05,
  black20,
  blue30,
  blue15,
} from '../components/theme';
// export let gray45 = '#737373';
// export let gray90 = gray90;

// theme.colors.trueGray[300];

// export let red65 = '#f87171';

//  (theme.colors.error as Record<number, string>)[400];
// export let green25 = '#4ade80';

export default StyleSheet.create({
  cardContent: {
    // backgroundColor: black05,
    // borderColor: black20,
    // 'rgba(100, 100, 100, 0.3)',
  },
  buttonsContent: {
    borderColor: blue30,
    backgroundColor: blue15,
  },
  button: {
    color: gray90,
  },
  headingLarge: {
    color: gray90,
  },
  // inputFocus: {
  //   borderColor: gray45,
  //   color: gray90,
  // },
  // inputFocusError: {
  //   borderColor: red65,
  //   color: gray90,
  // },
  errorToastContainer: {
    backgroundColor: 'rgba(139, 57, 66, 1)',
  },
  errorToastContent: {
    fontSize: 14,
    color: gray90,
  },
});
