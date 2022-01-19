import { Platform } from 'react-native';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from '../primitives';
import { fixWebSvg } from '../components/fix-web-svg';

export let webIconSize =
  Platform.OS === 'web'
    ? {
        height: '1.5em',
        width: '1.5em',
        // paddingTop: 2,
      }
    : {
        paddingTop: 5,
      };

export default StyleSheet.create({
  // cardContent: {
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   overflow: 'hidden',
  // },
  buttonsContainer: {},

  buttonsContent: {
    borderRadius: 20,
    borderWidth: 1,
  },
  button: {
    ...(fixWebSvg as ViewStyle),
    ...(webIconSize as ViewStyle),
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  errorToastContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // top: height - bottomHeight,
    position: Platform.OS === 'web' ? ('fixed' as 'absolute') : 'absolute',
    // borderWidth: 1,
    height: 50,
    borderRadius: 5,
    // width: formDarkTheme.raw.formContent.width,
  },
  errorToastContent: {
    fontSize: 14,
    fontWeight: '500',
  },
  // inputFocus: {
  //   borderWidth: 1,
  // },
});
