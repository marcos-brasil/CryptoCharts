import { Platform } from 'react-native';
import { atom, selector } from 'recoil';

import { SignInServerResponse } from '../types';

// import { Routes } from '../../routes';

let sessionObj: SessionAtom = null;
if (Platform.OS === 'web') {
  try {
    let sessionStr = window.atob(
      document.body.getAttribute('data-session') || ''
    );

    let session = JSON.parse(sessionStr || '');

    setTimeout(() => {
      console.log('session', session);
    }, 1000);

    sessionObj = typeof session.email === 'string' ? session : null;
  } catch (e) {}
  // console.log(session);
}

type SessionAtom = null | {
  email: string;
  theme: string;
  favorities: string;
};

export const session = atom<SessionAtom>({
  key: 'session',
  default: sessionObj,
});

type SignInAtom = null | SignInServerResponse;

export const signIn = atom<SignInAtom>({
  key: 'signIn',
  default: null,
});

export const signUp = atom<SignInAtom>({
  key: 'signUp',
  default: null,
});

// type SignUpAtom = null | {
//   success?: string;
//   errors?: Record<string, string>;
// };

// export const signUp = atom<SignUpAtom>({
//   key: 'signUp',
//   default: null,
// });
