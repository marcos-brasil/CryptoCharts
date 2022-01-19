import React, { useState } from 'react';

import {
  Text,
  useColorScheme,
  useWindowDimensions,
  Pressable,
  View,
} from 'react-native';

import { Radio, NativeBaseProvider } from 'native-base';

import Screen from '../components/Screen';
import Card from '../components/Card';

import { Center, StyleSheet } from '../primitives';

import { singOut } from '../api';

import { dark, light } from './forms-theme';
import { computeFormHeight } from './forms-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { session as sessionAtom } from './atoms';
import { useReactNavigation } from '../utils';
import { Routes } from '../routes';

let accountBaseTheme = StyleSheet.create({
  paddingElementSignout: {
    height: 90,
    width: 1,
  },
  paddingElementRadio: {
    height: 50,
    width: 1,
  },
  container: {
    height: '100%',
    // width: '100px',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
  },
  radioTex: {
    paddingLeft: 10,
  },
});

export default function Account(): JSX.Element {
  let inserts = useSafeAreaInsets();
  let OSTheme = useColorScheme();
  let formTheme = OSTheme === 'dark' ? dark : light;

  let session = useRecoilValue(sessionAtom);
  let setSession = useSetRecoilState(sessionAtom);

  let nav = useReactNavigation<Routes>();

  let [userTheme, setUserTheme] = useState('OS');

  return (
    <Screen>
      <NativeBaseProvider>
        <Center style={[inserts, formTheme.formContainer]}>
          <Card containerStyle={{}} contentStyle={formTheme.formContent}>
            <View style={accountBaseTheme.container}>
              <View style={accountBaseTheme.content}>
                <Text style={formTheme.formTitle}>Account</Text>
                <Text style={formTheme.formSubTitle}>
                  Email: {session?.email}
                </Text>
                <View style={accountBaseTheme.paddingElementRadio} />

                <Radio.Group
                  name="userTheme"
                  value={userTheme}
                  onChange={nextTheme => {
                    console.log('ssss', nextTheme);
                    setUserTheme(nextTheme);
                  }}>
                  <Radio value="OS" my={1}>
                    <Text
                      style={[
                        formTheme.formSubTitle,
                        accountBaseTheme.radioTex,
                      ]}>
                      OS Theme
                    </Text>
                  </Radio>
                  <Radio value="dark" my={1}>
                    <Text
                      style={[
                        formTheme.formSubTitle,
                        accountBaseTheme.radioTex,
                      ]}>
                      Dark
                    </Text>
                  </Radio>
                  <Radio value="light" my={1}>
                    <Text
                      style={[
                        formTheme.formSubTitle,
                        accountBaseTheme.radioTex,
                      ]}>
                      Light
                    </Text>
                  </Radio>
                </Radio.Group>
                <View style={accountBaseTheme.paddingElementSignout} />
                <Pressable
                  onPress={async () => {
                    console.log('signout');
                    nav.navigate('Dashboard');
                    try {
                      let res = await singOut();
                      console.log('signout', res);
                      setSession(null);
                    } catch (e) {
                      console.log('err logout', e);
                    }
                  }}>
                  <View style={formTheme.submitButtonContainer}>
                    <Center>
                      <Text style={formTheme.submitButtonContent}>
                        Sign out
                      </Text>
                    </Center>
                  </View>
                </Pressable>
              </View>
            </View>
          </Card>
        </Center>
      </NativeBaseProvider>
    </Screen>
  );
}
