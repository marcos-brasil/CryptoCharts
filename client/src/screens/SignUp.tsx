import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { Keyboard, useWindowDimensions, ViewStyle } from 'react-native';
import { useForm } from 'react-hook-form';

import { CloseCircle } from '../primitives/Icons';

import { CommonActions } from '@react-navigation/native';

import { StyleSheet, mergeStyleSheetMany } from '../primitives';

import Input from '../components/Input';

import {
  Platform,
  Text,
  View,
  useColorScheme,
  Pressable,
  TextInput,
  // useWindowDimensions
} from 'react-native';
import Bg from '../components/Background';

import Screen from '../components/Screen';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppBar, { addHomeRouteIfNeeded } from '../components/AppBar';

import { Center, VStack, HStack } from '../primitives';

import { dark as formDarkTheme } from './forms-theme';
import { light as formLightTheme } from './forms-theme';

// import { signInDarkTheme, signInLightTheme } from './SignIn';

// import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useReactNavigation } from '../utils';

import { Routes } from '../Routes';
import { singUpFormSchema } from '../yup-schemas';

import { toastAtom } from '../components/Toast';

import { useSetRecoilState } from 'recoil';

import { signIn as signInAtom, session as sessionAtom } from './atoms';
import { singInApi } from '../api';

export type UserSignUp = {
  email: string;
  password: string;
  confirmPassword: string;
};

import { IP_ADDRESS } from '../constants';
import Card from '../components/Card';

let signUpBaseTheme = StyleSheet.create({
  submitButtonContainer: {
    marginTop: 18,
  },
});

let signUpDarkTheme = mergeStyleSheetMany(formDarkTheme, signUpBaseTheme);

let signUpLightTheme = mergeStyleSheetMany(formLightTheme, signUpBaseTheme);

// let computeFormHeight = ({
//   height,
//   padding,
// }: {
//   height: number;
//   padding: number;
// }): number => {
//   return height + 2 * padding;
// };

import { computeFormHeight } from './forms-theme';

export default React.memo(function Form(): JSX.Element {
  let inserts = useSafeAreaInsets();

  let { height } = useWindowDimensions();

  let setSignInAtom = useSetRecoilState(signInAtom);
  let setSessionAtom = useSetRecoilState(sessionAtom);
  let setToastAttom = useSetRecoilState(toastAtom);

  let formHeight = computeFormHeight(formDarkTheme.raw.formContent);

  let OSTheme = useColorScheme();
  let formTheme = OSTheme === 'dark' ? signUpDarkTheme : signUpLightTheme;

  let [userSingUpError, setUserSignUpError] = useState<string | null>(null);

  let bottomHeight = (height - formHeight) / 2;

  let nav = useReactNavigation<Routes>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(singUpFormSchema),
  });

  // type ServerRes = {
  //   success?: string;
  //   errors?: Record<string, string>;
  // };
  //   | Record<'success', string>
  //   | Record<'errors', Record<string, string>>;

  const onSubmit = async (data: UserSignUp) => {
    Keyboard.dismiss();

    let url = Platform.OS === 'web' ? '' : `http://${IP_ADDRESS}:8000`;

    try {
      let serverMsg = await singInApi(`${url}/sign-up`, {
        method: 'POST',
        // important because is creating a new user on the same browser
        // should have 2 diferent cookies.
        // credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // let serverMsg: SignInServerResponse = await res.json();

      // console.log(serverMsg);

      // let toatsTop = {
      //   top: height - bottomHeight,
      //   width: formDarkTheme.raw.formContent.width * 0.9,
      //   borderWidth: 0,
      // } as ViewStyle;

      if (serverMsg.errors) {
        // setUserSignUpError(serverMsg.errors);

        setToastAttom({
          display: true,
          type: 'error',
          message: serverMsg.errors,
          onPress: () => {
            // setUserSignUpError(null);
            console.log('pressed toast');
          },
          onClose: () => {
            setToastAttom({
              display: false,
              type: 'success',
              message: '',
            });
          },
        });
      } else {
        if (serverMsg.success) {
          setSignInAtom(serverMsg);
          setSessionAtom(serverMsg?.data || null);
          setToastAttom({
            display: true,
            type: 'success',
            message: serverMsg.success,
            timer: 1000 * 5, // 5 sec
            // containerStyle: toatsTop,
            onPress: () => {
              // setUserSignUpError(null);
              console.log('pressed toast');
            },
            onClose: () => {
              setToastAttom({
                display: false,
                type: 'success',
                message: '',
              });
            },
          });
          nav.navigate('Dashboard');
        }
      }

      // console.clear();

      // console.log('WWWWW', ;
    } catch (e) {
      // console.log('EEE', e);
    }
  };
  // useEffect(() => {
  //   let keyboardWillShow = Keyboard.addListener('keyboardWillShow', e => {
  //     console.log(e);
  //   });

  //   return () => {
  //     // rm()
  //     Keyboard?.removeSubscription &&
  //       Keyboard?.removeSubscription(keyboardWillShow);
  //   };
  // }, []);

  useLayoutEffect(() => {
    addHomeRouteIfNeeded(nav);
  }, [nav]);

  if (Platform.OS === 'web') {
    window.scrollTo({ top: -1, left: -1, behavior: 'smooth' });
  }

  let emailInput = useRef<TextInput>(null);
  let passwordInput = useRef<TextInput>(null);
  let confirmPasswordInput = useRef<TextInput>(null);

  let buttonHandler = handleSubmit(onSubmit);

  useEffect(() => {
    if (userSingUpError) {
      let toatsTop = {
        top: height - bottomHeight,
        width: formDarkTheme.raw.formContent.width * 0.9,
        borderWidth: 0,
      } as ViewStyle;

      setToastAttom({
        display: true,
        type: 'error',
        message: userSingUpError,
        containerStyle: toatsTop,
        onPress: () => {
          // setUserSignUpError(null);
          console.log('pressed toast');
        },
        onClose: () => {
          setUserSignUpError(null);
        },
      });
    } else {
      setToastAttom({
        display: false,
        type: 'success',
        message: '',
      });
    }
  }, [bottomHeight, height, setToastAttom, userSingUpError]);

  return (
    <Screen>
      <Center style={[inserts, formTheme.formContainer]}>
        <Card containerStyle={{}} contentStyle={formTheme.formContent}>
          <Text style={formTheme.formTitle}>Welcome</Text>
          <Text style={formTheme.formSubTitle}>Sign in to continue!</Text>

          <VStack style={formTheme.inputsContainer}>
            <Input
              ref={emailInput}
              name="email"
              rules={{ required: true }}
              errors={errors}
              control={control}
              titleText="Email"
              titleStyle={formTheme.inputTitle}
              inputStyle={formTheme.inputContent}
              inputErrorMsg={formTheme.inputErrorMsg}
              inputFocusError={formTheme.inputFocusError}
              onSubmitEditing={e => {
                passwordInput.current?.focus();
              }}
            />

            <Input
              ref={passwordInput}
              name="password"
              rules={{ required: true }}
              errors={errors}
              control={control}
              titleText="Password"
              textContentType="oneTimeCode"
              titleStyle={formTheme.passwordInput}
              inputStyle={formTheme.inputContent}
              inputErrorMsg={formTheme.inputErrorMsg}
              inputFocusError={formTheme.inputFocusError}
              secureTextEntry={true}
              onSubmitEditing={e => {
                passwordInput.current?.blur();
                confirmPasswordInput.current?.focus();
              }}
            />

            <Input
              ref={confirmPasswordInput}
              name="confirmPassword"
              rules={{ required: true }}
              errors={errors}
              control={control}
              titleText="Confirm Password"
              titleStyle={formTheme.passwordInput}
              inputStyle={formTheme.inputContent}
              inputErrorMsg={formTheme.inputErrorMsg}
              inputFocusError={formTheme.inputFocusError}
              secureTextEntry={true}
              blurOnInvalid={false}
              textContentType="oneTimeCode"
              blurOnSubmit={false}
              onSubmitEditing={e => {
                e.persist();

                // this timeout is to give time to react-hook-form to detect the error
                setTimeout(() => {
                  if (Object.keys(errors).length > 0) {
                    if (Platform.OS === 'web') {
                      buttonHandler(e);
                      // Keyboard.dismiss();

                      confirmPasswordInput.current?.focus();
                    }
                    // setFocus('confirmPassword');
                    return;
                  } else {
                    buttonHandler(e);
                  }
                }, 100);
              }}
            />

            <Pressable onPress={buttonHandler}>
              <View style={formTheme.submitButtonContainer}>
                <Center>
                  <Text style={formTheme.submitButtonContent}>Sign up</Text>
                </Center>
              </View>
            </Pressable>
          </VStack>
        </Card>
      </Center>
    </Screen>
  );
});
