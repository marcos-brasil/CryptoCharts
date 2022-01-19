import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Platform,
  Pressable,
  Text,
  View,
  ViewStyle,
  useColorScheme,
  GestureResponderEvent,
  useWindowDimensions,
} from 'react-native';

import {
  Center,
  DividerVerticle,
  HStack,
  StyleSheet,
  VStack,
  mergeStyleSheetMany,
} from '../../primitives';

import type { Style } from '../../primitives';

import BaseCard from '../Card';

import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ChevronBack,
  Exit,
  HeartOutline,
  PersonOutline,
  Person,
  SearchOutline,
} from '../../primitives/Icons';

import { routeStateAtom } from './atoms';
import { useReactNavigation } from '../../utils';
import { Routes } from '../../routes';
import { getLast } from '../../utils';

let hasAddedListener = false;

import AppBar from './Bar';

export { darkTheme, lightTheme } from './theme';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import { signIn as signInAtom, session as sessionAtom } from './atoms';
import { singOut } from '../../api';

export * from './etc';

function LeftSideDashboard() {
  let nav = useReactNavigation<Routes>();
  return (
    <LeftSide
      firstIcon={HeartOutline}
      firstText="Favorites"
      firstIconOnPress={() => {
        console.log('Favorites');
        nav.navigate('Favorites');
      }}
      secondIcon={SearchOutline}
      secondText="Search"
      secondIconOnPress={() => {
        console.log('Search');
        nav.navigate('Search');
      }}
    />
  );
}

function LeftBackDashboard() {
  let nav = useReactNavigation<Routes>();

  return (
    <LeftSide
      firstIcon={ChevronBack}
      firstText="Dashboard"
      firstIconOnPress={() => {
        console.log('Dashboard');
        nav.navigate('Dashboard');
      }}
      // secondIcon={SearchOutline}
      // secondText="Search"
      // secondIconOnPress={() => {
      //   console.log('Search');
      // }}
    />
  );
}

function RightSideSignIn() {
  return <RightSide shouldDisplayAccount={false} />;
}

export default function AppBarRouter() {
  let nav = useReactNavigation<Routes>();
  let [routeName, setRouteName] = useRecoilState(routeStateAtom);

  // let [signInMsg, setSignInMsg] = useRecoilState(signInAtom);
  // // let setToastAttom = useSetRecoilState(toastAtom);
  // let [sessionData, setSessionData] = useRecoilState(sessionAtom);

  // let isSignOut = useRef(false);

  let rm = () => {
    // null;
  };

  if (hasAddedListener === false) {
    rm = nav.addListener('state', s => {
      // console.log('sssss', s.data.state.routes);
      // setCurrentRoute(getLast(nav.getState().routes).name);
      setRouteName(getLast(s.data.state.routes).name);
    });
  }

  useLayoutEffect(() => {
    // let rmHideAppBarListener = evt.emitter.on(evt.HIDE_APPBAR, _n => {
    //   // console.log(n);
    //   setShowAppBar(false);
    // });

    // let rmShowAppBarListener = evt.emitter.on(evt.SHOW_APPBAR, _s => {
    //   // console.log(s);
    //   setShowAppBar(true);
    // });

    return () => {
      rm();
      // rmHideAppBarListener();
      // rmShowAppBarListener();
    };
  }, []);

  hasAddedListener = true;

  console.log('route:', routeName);

  if (routeName !== 'Dashboard') {
    return <AppBar leftSide={LeftBackDashboard} rightSide={RightSideSignIn} />;
  }

  return <AppBar leftSide={LeftSideDashboard} rightSide={RightSideSignIn} />;
}
