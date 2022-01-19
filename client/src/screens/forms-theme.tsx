import appBaseTheme from '../themes/base';
import { mergeStyleSheetMany, StyleSheet } from '../primitives';

import { Platform } from 'react-native';

import { yellow65 } from '../components/theme';

export let computeFormHeight = ({
  height,
  padding,
}: {
  height: number;
  padding: number;
}): number => {
  return height + 2 * padding;
};

export let baseInput = StyleSheet.create({
  title: {
    paddingLeft: 6,
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '400',
  },
  content: {
    fontWeight: '400',
    // lineHeight: 24,
    fontSize: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    ...appBaseTheme.raw.buttonsContent,
    borderRadius: 5,
  },
});

export let base = StyleSheet.create({
  formContainer: {
    position: Platform.OS === 'web' ? ('fixed' as 'absolute') : 'absolute',
  },
  formContent: {
    // ...appBaseTheme.raw.cardContent,
    height: Platform.OS === 'android' ? 520 : 470,
    padding: 30,
    width: 360,
  },
  formTitle: {
    fontWeight: '600',
    fontSize: 24,
  },
  formSubTitle: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  inputsContainer: { marginTop: 20 },
  inputTitle: baseInput.raw.title,
  inputContent: baseInput.raw.content,
  passwordInput: { ...baseInput.raw.title, paddingTop: 12 },
  forgotPassword: {
    fontSize: 12,
    alignSelf: 'flex-end',
    margin: 4,
    fontWeight: '700',
  },
  submitButtonContainer: {
    // marginTop: 48,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 6,
  },
  submitButtonContent: {
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpSubText: {},
  signUpMainText: {
    marginTop: -2,
  },
  inputErrorMsg: {
    height: 20,
    fontSize: 12,
    paddingTop: 4,
    paddingLeft: 10,
  },
});

import {
  gray90,
  yellow100,
  white30,
  blue85,
  gray10,
  green45,
  black12,
  blue45,
  gray45,
  red50,
  red35,
  orange95,
} from '../components/theme';

export let dark = mergeStyleSheetMany(
  // appBaseTheme,
  base,
  // appDarkTheme,
  StyleSheet.create({
    formContainer: {},
    formContent: {
      // ...appDarkTheme.raw.cardContent,
    },
    formTitle: {
      color: gray90,
    },
    formSubTitle: {
      color: gray90,
    },
    inputsContainer: {},
    inputTitle: {
      color: gray90,
    },
    inputContent: {
      // ...appDarkTheme.raw.buttonsContent,
      borderColor: white30,
      // backgroundColor: 'rgba(41, 42, 58, 0.5)',
      backgroundColor: black12,
      color: gray90,
    },
    passwordInput: {
      color: gray90,
    },
    forgotPassword: {
      color: blue85,
    },
    submitButtonContainer: {
      // backgroundColor: '#524495',
      backgroundColor: blue45,
    },
    submitButtonContent: {
      color: gray90,
    },
    signUpSubText: { color: gray90 },
    // inputFocus: {
    //   borderColor: gray45,
    //   color: gray90,
    // },
    inputFocusError: {
      borderColor: red50,
      color: gray90,
    },
    inputErrorMsg: {
      color: red50,
    },
  })
);

// let gray10 = '#262626';

export let light = mergeStyleSheetMany(
  // appBaseTheme,
  // appLightTheme,
  base,
  StyleSheet.create({
    formContainer: {},
    formContent: {},
    formTitle: {
      color: gray10,
    },
    formSubTitle: {
      color: gray10,
    },
    inputsContainer: {},
    inputTitle: {
      color: gray10,
    },
    inputContent: {
      // ...appLightTheme.raw.buttonsContent,
      borderColor: yellow65,

      backgroundColor: orange95,
      color: gray10,
    },
    passwordInput: {
      color: gray10,
    },
    forgotPassword: {
      color: green45,
    },
    submitButtonContainer: {
      backgroundColor: green45,
    },
    submitButtonContent: {
      color: yellow100,
    },
    signUpSubText: { color: gray10 },
    inputFocusError: {
      borderColor: red50,
      color: gray10,
    },
    inputErrorMsg: {
      color: red50,
    },
  })
);
