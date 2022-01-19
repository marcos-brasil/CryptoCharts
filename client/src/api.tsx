import { Platform } from 'react-native';
import { SignInServerResponse } from './types';

import { IP_ADDRESS } from './constants';

export function singInApi(
  url: string,
  opt: RequestInit
): Promise<SignInServerResponse> {
  return fetch(url, opt).then(
    res => res.json() as Promise<SignInServerResponse>
  );
}

export function singOut(): Promise<SignInServerResponse> {
  let url = Platform.OS === 'web' ? '' : `http://${IP_ADDRESS}:8000`;

  return fetch(`${url}/sign-out`, { method: 'DELETE' }).then(
    res => res.json() as Promise<SignInServerResponse>
  );
}
