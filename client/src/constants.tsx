import { Platform } from 'react-native';

// let hostUrl = Platform.OS === 'web' ? '' : 'http://localhost:8000';

// // TODO: replace with proper domain on prod
// if (process.env.NODE_ENV === 'production') {
//   hostUrl = Platform.OS === 'web' ? '' : 'http://localhost:8000';
// }

// export let apiURL = `${hostUrl}/api`;

export * from '../../shared/constants';

import { IP_ADDRESS } from '../../shared/constants';

export let protocol =
  Platform.OS === 'web'
    ? process.env.NODE_ENV === 'production'
    // ? 'wss'
    ? 'ws'
    : 'ws'
    : 'ws';

// protocol = process.env.NODE_ENV === 'production' ? 'wss' : protocol;

export const WS_PORT = protocol === 'ws' ? 3081 : 3082;
export const WS_HOST = `${IP_ADDRESS}:${WS_PORT}`;
export const WSS_URL = `${protocol}://${WS_HOST}/api/v1/market`;
