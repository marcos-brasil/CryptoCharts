// TS definitions for react-navigate is not realy good.
// Here the `navigator.navigate` expect a route name as string
// but it request a object `{key: typeof Routes}`

// this file fix the type issue

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CreateTracingOptions } from 'trace_events';
import { Routes } from '../routes';
// import type { NavigationRoute } from '@react-navigation/routers';

type NavigationParams<R> = Record<keyof R, R[keyof R]>;

type NavigatorHook<R extends NavigationParams<R>> =
  NavigationProp<ReactNavigation.RootParamList>;

export type RoutesOpts = {
  key: string;
  name: CreateTracingOptions;
  params: Record<string, string>;
  path: string | undefined;
};

export type RouteState = Readonly<{
  key: string;
  index: number;
  routeNames: Routes[];
  history?: unknown[] | undefined;
  routes: RoutesOpts[];
  type: string;
  stale: false;
}>;

type FixedNavigate<R> = {
  navigate: (routeName: R, opt?: Record<string, string>) => void;
  getState: () => RouteState;
};

export type ReactNavigatorHook<R> = Omit<
  Omit<NavigatorHook<R>, 'navigate'>,
  'getState'
> &
  // Omit<NavigatorHook<R>, 'getState'> &
  FixedNavigate<R>;

export function useReactNavigation<R>(): ReactNavigatorHook<R> {
  let nav = useNavigation();

  return {
    ...nav,
    getState: (): RouteState => {
      return nav.getState() as unknown as RouteState;
    },
    navigate: (routeName: R, opts?: Record<string, string>): void => {
      // @ts-ignore
      nav.navigate(routeName, opts);
    },
  };
}

// type Routes = {
//   Home: undefined;
//   Form: undefined;
// };

// // eslint-disable-next-line react-hooks/rules-of-hooks
// let nac = useReactNavigation<Routes>();
// nac.navigate('Home');
