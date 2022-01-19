import { ReactNavigatorHook } from '../../utils';
import { CommonActions } from '@react-navigation/native';

export const HIDE_APPBAR = 0;
export const SHOW_APPBAR = 1;

import { Emitter } from '../../utils';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Routes } from '../../routes';

type Events = {
  [HIDE_APPBAR]: number;
  [SHOW_APPBAR]: string;
};

export const emitter = new Emitter<Events>();

export function addHomeRouteIfNeeded(nav: ReactNavigatorHook<Routes>): void {
  const state = nav.getState();
  if (state && state.routes && state.routes.length === 1) {
    nav.dispatch(_state => {
      if (_state.routes.length === 1) {
        return CommonActions.reset({
          ..._state,
          index: 1,
          routes: [
            {
              name: 'Dashboard',
            },
            ..._state.routes,
          ],
        });
      }

      return _state;
    });
  }
}

let prevY = 0;
export function handleAppBarDisplay(
  a: NativeSyntheticEvent<NativeScrollEvent>
): void {
  let { y } = a.nativeEvent.contentOffset;

  let diff = y - prevY;

  // console.log(y);
  prevY = y;
  if (Math.abs(diff) < 10) {
    return;
  }

  // scroll is bouncing. ios
  if (y < 0 || y === 0) {
    emitter.emit(SHOW_APPBAR, String(y));
    return;
  }

  if (diff > 0) {
    emitter.emit(HIDE_APPBAR, y);
  } else {
    emitter.emit(SHOW_APPBAR, String(y));
  }

  // console.log('scroll', x, y);
}
