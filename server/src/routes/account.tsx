import express from 'express';

import { dev as addSessionToBodyDevelopement } from '../services/add-session-to-body-middleware';

import { PUBLIC_FILES, IS_PROD } from '../constants';

export default function account(app: express.Express): void {
  if (IS_PROD) {
    app.use('/account', express.static(PUBLIC_FILES));
  } else {
    app.use('/account', addSessionToBodyDevelopement);
  }
}
//
