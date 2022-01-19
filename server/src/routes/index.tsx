import express from 'express';

// declare global {

// }

import dashboard from './dashboard';
import signIn from './sign-in';
import signUp from './sign-up';
import signOut from './sign-out';
import account from './account';

export default function routes(app: express.Express): void {
  account(app);
  dashboard(app);
  signIn(app);
  signUp(app);
  signOut(app);
}

//
