import React from 'react';

import {
  Text,
  useColorScheme,
  useWindowDimensions,
  Pressable,
  View,
} from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';

import { Center, StyleSheet } from '../primitives';

import { singOut } from '../api';

import { dark, light } from './forms-theme';
import { computeFormHeight } from './forms-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { session as sessionAtom } from './atoms';
import { useReactNavigation, getLast } from '../utils';
import { Routes } from '../routes';
import { routeStateAtom } from '../components/AppBar/atoms';

let signOutBaseTheme = StyleSheet.create({
  paddingElement: {
    height: 200,
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
});

export default function UnderConstruction(): JSX.Element {
  let inserts = useSafeAreaInsets();
  let OSTheme = useColorScheme();
  let formTheme = OSTheme === 'dark' ? dark : light;

  // let session = useRecoilValue(sessionAtom);
  // let setSession = useSetRecoilState(sessionAtom);
  let routeName = useRecoilValue(routeStateAtom);

  let nav = useReactNavigation<Routes>();
  let routeState = nav.getState();
  let coinId = getLast(routeState.routes)?.params?.coinId;
  // dd.routeNames = ['Search']
  console.log('====', coinId);
  return (
    <Screen>
      <Center style={[inserts, formTheme.formContainer]}>
        <Card containerStyle={{}} contentStyle={formTheme.formContent}>
          <View style={signOutBaseTheme.container}>
            <View style={signOutBaseTheme.content}>
              <Text style={formTheme.formTitle}>Under Construction</Text>
              <Text style={formTheme.formSubTitle}>
                {routeName} {coinId}
              </Text>
            </View>
          </View>
        </Card>
      </Center>
    </Screen>
  );
}
