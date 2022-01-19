// import { Platform } from 'react-native';
// import { atom } from 'recoil';

export * from './screens/atoms';

// import { Routes } from '../../routes';

// let email: null | string = null;
// if (Platform.OS === 'web') {
//   try {
//     let sessionStr = window.atob(
//       document.body.getAttribute('data-session') || ''
//     );

//     let session = JSON.parse(sessionStr || '');

//     email = typeof session.email === 'string' ? session.email : null;
//   } catch (e) {}
//   // console.log(session);
// }

// export const signIn = atom<null | string>({
//   key: 'signIn',
//   default: email,
// });
