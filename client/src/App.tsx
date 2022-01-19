import React from 'react'; // useEffect

import { RecoilRoot } from 'recoil';
// import { StatusBar } from 'react-native';

import Bg from './components/Background';
// import {SafeAreaView, Appearance, Text, View, Platform} from 'react-native';
// @ts-ignore
// import font from './font.css';

// let colorScheme = Appearance.getColorScheme();
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
// import { RectButton, BorderlessButton } from 'react-native-gesture-handler';

// import SearchLayout from './vendors/react-navigation-addon-search-layout';
// import {Ionicons} from '@expo/vector-icons';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import DashboardScreen from './screens/Dashboard';
// import AccountScreen from './screens/Account';
// import MenuScreen from './Menu';
// import SearchScreen from './Search';
// import Form from './Form';

// import AppBar from './components/AppBar';

import { LazySignUp, LazySignIn, LazyAccount } from './Lazy';

// import { apiURL } from './constants';

// import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Platform,
  StatusBar,
  // View, useColorScheme
} from 'react-native';

const Stack = createNativeStackNavigator();

let AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background:
      Platform.OS === 'web'
        ? 'rgba(0, 0, 0, 0)'
        : DefaultTheme.colors.background,
    primary: 'rgb(0, 45, 85)',
  },
  dark: true,
};
// console.log(Stack);

// const config = {
//   dependencies: {
//     'linear-gradient': LinearGradient,
//   },
// };

import UnderConstruction from './screens/UnderConstruction';
import NoMatch from './screens/NoMatch';
// fetch(apiURL)
//   .then(async r => {
//     try {
//       console.log(Platform.OS, Date(), await r.json());
//     } catch (e) {
//       console.log(Platform.OS, Date(), 'API response not json', e);
//     }
//   })
//   .catch(e => {
//     console.log(Platform.OS, Date(), 'ERR: no API::', e);
//   });

export default function App(): JSX.Element {
  // let scheme = useColorScheme();

  // let AppTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  // let nativeBaseTheme = extendTheme({
  //   config: 'dark',
  // });

  // let headerRight = useMemo(HeaderRight, []);
  // StatusBar.setBarStyle('light-content');
  return (
    <RecoilRoot>
      <NavigationContainer
        theme={AppTheme}
        documentTitle={{ enabled: false }}
        // ref={navigationRef}
        linking={{
          prefixes: ['http:localhost:3000'],
          enabled: true,
          config: {
            screens: {
              Account: '/account',
              Dashboard: '/dashboard',
              SignIn: '/sign-in',
              SignUp: '/sign-up',
              Favorites: '/favorities',
              Search: '/search',
              Chart: {
                path: '/chart/:coinId',
              },
              NoMatch: '*',
            },
          },
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Bg />
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Group>
            <Stack.Screen name="Account" component={LazyAccount} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="SignIn" component={LazySignIn} />
            <Stack.Screen name="SignUp" component={LazySignUp} />
            <Stack.Screen name="Favorites" component={UnderConstruction} />
            <Stack.Screen name="Search" component={UnderConstruction} />
            <Stack.Screen name="Chart" component={UnderConstruction} />
            <Stack.Screen name="NoMatch" component={NoMatch} />
          </Stack.Group>

          {/* <Stack.Group screenOptions={{ presentation: 'modal' }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      {/* </NativeBaseProvider> */}
    </RecoilRoot>
  );
}

// import // StyleSheet,
// SafeAreaView,
// // ScrollView,
// // StatusBar,
// // StyleSheet,
// // Text,
// // useColorScheme,
// // View,
// from 'react-native';

// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // const App = () => {
// //   return (
// //     <SafeAreaView>
// //       <View>
// //         <Text>Hello World !!!!</Text>
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// export default App;

// import {
//   Immutable,
//   // Update,
//   isProd,
//   lens,
//   // stateMachine,
//   // useStateMachine,
//   // StateRef,
// } from '../utils';
// // const sine = (n: number): number[] => {
// //   const ret: number[] = []
// //   for (let idx = 0; idx <= n; idx++) {
// //     ret.push(Math.sin((idx / n) * 2 * Math.PI))
// //   }

// //   return ret
// // }

// // const chartPoints = sine(2e3)

// type Price = {
//   date: string;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
//   volume: number;
// };

// type PriceSeries = Price[];

// const Log = 0;
// const FirstRender = 1;
// const ScrollPosition = 2;
// const WindowResize = 3;
// const ScrollArea = 4;
// const MouseOut = 5;
// const FetchData = 6;

// type Log = [typeof Log, string];
// type FirstRender = [typeof FirstRender, boolean];
// type ScrollPosition = [typeof ScrollPosition, [number, number]];
// type WindowResize = [typeof WindowResize, [number, number]];
// type ScrollArea = [typeof ScrollArea, [number, number]];
// type MouseOut = [typeof MouseOut, boolean];
// type FetchData = [typeof FetchData, string];

// type Msg =
//   | Log
//   | FirstRender
//   | ScrollPosition
//   | WindowResize
//   | ScrollArea
//   | MouseOut
//   | FetchData;

// type Transition<S> = {
//   [Log]: (s: S, p: string) => [S, null];
//   [FirstRender]: (s: S, p: boolean) => [S, null];
//   [ScrollPosition]: (s: S, p: [number, number]) => [S, null];
//   [WindowResize]: (s: S, p: [number, number]) => [S, null];
//   [ScrollArea]: (s: S, p: [number, number]) => [S, null];
//   [MouseOut]: (s: S, p: boolean) => [S, null];
//   [FetchData]: (s: S, p: string) => [S, Promise<Log>];
// };

// type State = Immutable<{
//   [FirstRender]: boolean;
//   [ScrollPosition]: [number, number];
//   [WindowResize]: [number, number];
//   [ScrollArea]: [number, number];
//   [MouseOut]: boolean;
//   [FetchData]: PriceSeries | null;
// }>;

// const lenses = lens<State>();

// const stateLens = {
//   [FirstRender]: lenses(FirstRender),
//   [ScrollPosition]: lenses(ScrollPosition),
//   [WindowResize]: lenses(WindowResize),
//   [ScrollArea]: lenses(ScrollArea),
//   [MouseOut]: lenses(MouseOut),
// };

// const transition: Transition<State> = {
//   [Log]: (s, p) => {
//     if (!isProd()) {
//       console.log(p, s);
//     }

//     return [s, null];
//   },

//   [FirstRender]: (s, p) => {
//     const s1 = stateLens[FirstRender].set(p)(s);
//     return [s1, null];
//   },

//   [ScrollPosition]: (s, p) => {
//     const s1 = stateLens[ScrollPosition].set(p)(s);
//     return [s1, null];
//   },

//   [WindowResize]: (s, p) => {
//     const s1 = stateLens[WindowResize].set(p)(s);

//     return [s1, null];
//   },

//   [ScrollArea]: (s, p) => {
//     const s1 = stateLens[ScrollArea].set(p)(s);
//     return [s1, null];
//   },

//   [MouseOut]: (s, p) => {
//     const s1 = stateLens[MouseOut].set(p)(s);
//     return [s1, null];
//   },

//   [FetchData]: (s, _p) => {
//     return [
//       s,
//       new Promise(resolve => {
//         fetch('http://localhost:3000/api', {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })
//           .then(data => data.json() as unknown as { prices: PriceSeries })
//           .then(data => {
//             console.log('AAAA', data);
//             resolve([Log, JSON.stringify([data.prices[0]])]);
//           });
//       }),
//     ];
//   },
// };

// // const init = (): State => {
// //   return {
// //     [FirstRender]: true,
// //     [ScrollPosition]: [0, 0],
// //     [WindowResize]: [window.innerWidth, window.innerHeight],
// //     [ScrollArea]: [0, 0],
// //     [MouseOut]: true,
// //     [FetchData]: null,
// //   };
// // };

// // const update: Update<State, Msg> = (s, m) => {
// //   switch (m[0]) {
// //     case Log:
// //       return transition[m[0]](s, m[1]);

// //     case FirstRender:
// //       return transition[m[0]](s, m[1]);

// //     case ScrollPosition:
// //       return transition[m[0]](s, m[1]);

// //     case WindowResize:
// //       return transition[m[0]](s, m[1]);

// //     case ScrollArea:
// //       return transition[m[0]](s, m[1]);

// //     case MouseOut:
// //       return transition[m[0]](s, m[1]);

// //     case FetchData:
// //       return transition[m[0]](s, m[1]);
// //   }
// // };

// // let initState = init();
// // let cached = () => initState;
// // DispatcherTest();
// // function DispatcherTest() {
// //   // delay(2000);
// //   // let initCB = useCallback(init, [init]);
// //   // console.log('utils files', stateMachine);
// //   // let [state, setState] = useState(-1);
// //   let [state, dispatch] = useStateMachine(update, cached);

// //   //
// //   useEffect(() => {
// //     // dispatch([FirstRender, false]);
// //     dispatch([Log, 'log dipatcher']);
// //     dispatch([FirstRender, false]);
// //     dispatch([Log, 'log dipatcher 2']);
// //   }, [dispatch]);

// //   // console.log(state);

// //   return <div> AAA </div>;
// // }
