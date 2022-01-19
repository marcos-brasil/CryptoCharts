import React, { useLayoutEffect, useState, useRef } from 'react';

import { useForm } from 'react-hook-form';

import { Link } from '@react-navigation/native';

import { StyleSheet, mergeStyleSheetMany } from '../primitives';

import Input from '../components/Input';

import {
  Platform,
  Text,
  View,
  useColorScheme,
  Pressable,
  TextInput,
  Keyboard,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import Bg from '../components/Background';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { addHomeRouteIfNeeded } from '../components/AppBar';

import Toast from '../components/Toast';
import Screen from '../components/Screen';

import { Center, VStack, HStack } from '../primitives';

import { useReactNavigation } from '../utils';

import { Routes } from '../Routes';

import { dark as formDarkTheme } from './forms-theme';
import { light as formLightTheme } from './forms-theme';

import { yupResolver } from '@hookform/resolvers/yup';
import { signInFormSchema } from '../yup-schemas';

import { toastAtom } from '../components/Toast';

import { useSetRecoilState } from 'recoil';

import { signIn as signInAtom, session as sessionAtom } from './atoms';

import { singInApi } from '../api';

import Card from '../components/Card';

import { SignUp } from '../components/AppBar/RightSide';
import { IP_ADDRESS } from '../constants';

let signInBaseTheme = StyleSheet.create({
  paddingElement: {
    height: Platform.OS === 'android' ? 50 : 36,
    width: 1,
  },
  submitButtonContainer: {
    // marginTop: 36,
  },
});

let signInDarkTheme = mergeStyleSheetMany(formDarkTheme, signInBaseTheme);

let signInLightTheme = mergeStyleSheetMany(formLightTheme, signInBaseTheme);

export type UserSignIn = {
  email: string;
  password: string;
};

import { computeFormHeight } from './forms-theme';

// import Toast from '../components/Toast';

export default React.memo(function Form(): JSX.Element {
  let inserts = useSafeAreaInsets();

  let OSTheme = useColorScheme();

  let setSignInAtom = useSetRecoilState(signInAtom);
  let setSessionAtom = useSetRecoilState(sessionAtom);
  let setToastAttom = useSetRecoilState(toastAtom);

  let formTheme = OSTheme === 'dark' ? signInDarkTheme : signInLightTheme;

  // let [isSignIn, setIsSignIn] = useRecoilState(signInEmail);
  // let [userSingUpError, setUserSignUpError] = useState<string | null>(null);

  let { height } = useWindowDimensions();

  let formHeight = computeFormHeight(formDarkTheme.raw.formContent);
  let bottomHeight = (height - formHeight) / 2;

  let nav = useReactNavigation<Routes>();

  // let toatsTop = [
  //   formTheme.errorToastContainer,
  //   {
  //     top: height - bottomHeight,
  //     width: formDarkTheme.raw.formContent.width * 0.9,
  //     borderWidth: 0,
  //   },
  // ] as ViewStyle;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(signInFormSchema),
  });

  let onSubmit = async (data: UserSignIn) => {
    Keyboard.dismiss();

    let url = Platform.OS === 'web' ? '' : `http://${IP_ADDRESS}:8000`;

    try {
      let serverMsg = await singInApi(`${url}/sign-in`, {
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
      let toatsTop = {
        top: height - bottomHeight,
        width: formDarkTheme.raw.formContent.width * 0.9,
        borderWidth: 0,
      } as ViewStyle;

      if (serverMsg.errors) {
        console.log(serverMsg);

        setToastAttom({
          display: true,
          type: 'error',
          message: serverMsg.errors,
          // timer: 1000 * 5, // 5 sec
          containerStyle: toatsTop,
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
        // if (serverMsg.errors.email) {
        //   setUserSignUpError(serverMsg.errors.email);
        // }
      } else {
        if (serverMsg.success) {
          setSignInAtom(serverMsg);
          setSessionAtom(serverMsg?.data || null);
          nav.navigate('Dashboard');

          console.log('toast green');
          setToastAttom({
            display: true,
            type: 'success',
            message: serverMsg.success || '',
            timer: 1000 * 5, // 5 sec
            containerStyle: toatsTop,
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
        }
      }

      // console.clear();

      // console.log('WWWWW', ;
    } catch (e) {
      // console.log('EEE', e);
    }
  };

  useLayoutEffect(() => {
    addHomeRouteIfNeeded(nav);
  }, [nav]);

  if (Platform.OS === 'web') {
    window.scrollTo({ top: -1, left: -1, behavior: 'smooth' });
  }

  let emailInput = useRef<TextInput>(null);
  let passwordInput = useRef<TextInput>(null);

  let buttonHandler = handleSubmit(onSubmit);

  // console.log(formTheme.raw.formContent);
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
                // console.log('*');
                e.persist();

                // this timeout is to give time to react-hook-form to detect the error
                setTimeout(() => {
                  if (Object.keys(errors).length > 0) {
                    if (Platform.OS === 'web') {
                      buttonHandler(e);
                      // Keyboard.dismiss();

                      passwordInput.current?.focus();
                    }
                    // setFocus('confirmPassword');
                    return;
                  } else {
                    buttonHandler(e);
                  }
                }, 100);
              }}
            />
            <Text style={formTheme.forgotPassword}>Forgot Password?</Text>
            <View style={formTheme.paddingElement} />
            <Pressable onPress={buttonHandler}>
              <View style={formTheme.submitButtonContainer}>
                <Center>
                  <Text style={formTheme.submitButtonContent}>Sign in</Text>
                </Center>
              </View>
            </Pressable>

            <HStack style={formTheme.signUpContainer}>
              <Text style={formTheme.signUpSubText}>{"I'm a new user. "}</Text>
              <View style={formTheme.signUpMainText}>
                <SignUp />
              </View>
            </HStack>
          </VStack>
        </Card>
      </Center>
    </Screen>
  );
});

// <Center
// style={[
//   viewWrapStyle,
//   {
//     position:
//       Platform.OS === 'web' ? ('fixed' as 'absolute') : 'absolute',
//   },
// ]}>
// <VStack>
//   <Center>
//     <FormControl isRequired isInvalid>
//       <View
//         style={[
//           {
//             margin: 10,
//             padding: 30,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             borderRadius: 10,
//           },
//           cardTheme.cardContent,
//         ]}>
//         <FormControl.Label
//           _text={{
//             color: 'gray.500',
//             bold: true,
//           }}>
//           At vero eos et accusamus
//         </FormControl.Label>
//         <Input p={2} placeholder="et iusto odio dignissimos" />
//         <FormControl.HelperText>
//           ducimus qui blanditiis praesentium voluptatum
//         </FormControl.HelperText>
//         <FormControl.ErrorMessage>
//           deleniti atque corrupti quos dolores
//         </FormControl.ErrorMessage>
//       </View>
//     </FormControl>
//   </Center>

//   <Center>
//     <FormControl>
//       <View
//         style={[
//           {
//             margin: 10,
//             padding: 30,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             borderRadius: 10,
//           },
//           cardTheme.cardContent,
//         ]}>
//         <FormControl.Label
//           _text={{
//             color: 'gray.500',
//           }}>
//           At vero eos et accusamus
//         </FormControl.Label>
//         <Input p={2} placeholder="et iusto odio dignissimos" />
//         <FormControl.HelperText>
//           ducimus qui blanditiis praesentium voluptatum
//         </FormControl.HelperText>
//         <FormControl.ErrorMessage>
//           deleniti atque corrupti quos dolores
//         </FormControl.ErrorMessage>
//       </View>
//     </FormControl>
//   </Center>
// </VStack>
// </Center>
