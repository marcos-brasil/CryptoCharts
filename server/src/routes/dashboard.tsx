import express from 'express';

import { dev as addSessionToBodyDevelopement } from '../services/add-session-to-body-middleware';

import { PUBLIC_FILES, IS_PROD } from '../constants';

export default function dashboard(app: express.Express): void {
  if (IS_PROD) {
    app.use('/dashboard', express.static(PUBLIC_FILES));
  } else {
    app.use('/dashboard', addSessionToBodyDevelopement);
  }
}
