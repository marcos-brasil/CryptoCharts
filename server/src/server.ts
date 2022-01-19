// import sqlite3 from 'sqlite3';

import express from 'express';

// import hpp from 'hpp';
import session from 'express-session';

import { IS_PROD, PUBLIC_FILES, DB_ACCOUNTS_FILE_PATH } from './constants';

// import bodyParser from 'body-parser';
// import csurf from 'csurf';
import { dev as addSessionToBodyDevelopement } from './services/add-session-to-body-middleware';

import connectSqlite3 from 'connect-sqlite3';

import routes from './routes';

import path from 'path';

import { prod as addSessionToBodyProduction } from './services/add-session-to-body-middleware';

declare module 'express-session' {
  interface SessionData {
    user: Record<string, string> | void;
  }
}

// @ts-ignore: there is an error at @types/connect-sqlite3
let SQliteSessionStore = connectSqlite3(session);

export default function server(app: express.Express): void {
  if (IS_PROD) {
    app.use(addSessionToBodyProduction);
  } else {
    app.set('trust proxy', 1);
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  if (IS_PROD) {
    app.use('/', express.static(PUBLIC_FILES));
  }

  let sqlStore = new SQliteSessionStore({
    table: 'sessions',
    db: path.basename(DB_ACCOUNTS_FILE_PATH),
    dir: path.dirname(DB_ACCOUNTS_FILE_PATH),
  }) as session.Store;

  // sqlStore.on('connection', (s) => {
  //   console.log(s)
  // })

  app.use(
    session({
      store: sqlStore,
      // TOOD: in prod it should be read from process.env.EXPRESS_SESSION_SECRET
      secret: '0.9192455324557502+0.9364622819165866',
      // needs to be false by law . require user consent to store cookies
      saveUninitialized: false,
      name: 'sid',
      resave: false,
      // proxy: process.env.NODE_ENV === 'production' ? false: true,
      cookie: {
        // sameSite: true,

        secure: IS_PROD,
        // secure: false,
        // maxAge: null,
      },
      // user: '',
    })
  );

  routes(app);

  if (IS_PROD) {
    app.use('*', express.static(PUBLIC_FILES));
  } else {
    app.use('*', addSessionToBodyDevelopement);
  }
}
