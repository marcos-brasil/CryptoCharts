import express from 'express';

import bcrypt from 'bcrypt';

import { signInFormSchema } from '../yup-schemas';

import { SignInServerResponse } from '../types';
import { PUBLIC_FILES, IS_PROD } from '../constants';

import { dev as addSessionToBodyDevelopement } from '../services/add-session-to-body-middleware';

import { selectUserAccountStmt } from '../db/accounts';

type UserSession = {
  email: string;
  password: string;
  theme: string;
  favorities: string;
};

export default function (app: express.Express): void {
  app.post('/sign-in', async (req, res) => {
    let errMsg = 'Email and/or password is wrong.';

    try {
      let email = req.body.email;

      console.log('/sign-in', email);

      try {
        await signInFormSchema.validate(req.body);
      } catch (e) {
        console.error('/sign-in', (e as NodeJS.ErrnoException)?.message);
        res.json({
          errors: errMsg,
        });
        console.error('/sign-in', errMsg);
        return;
      }

      let users: UserSession[] = await selectUserAccountStmt.all(email);

      // console.log(user);
      // console.error('couldnt sign-in user', e);

      if (users.length === 0) {
        res.json({
          errors: errMsg,
        });

        console.error('/sign-in', errMsg);
        return;
      }

      let user = users[0];

      let hashPassword = user.password;

      let passwordIsCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (passwordIsCorrect === false) {
        let obj: SignInServerResponse = {
          errors: errMsg,
        };

        res.json(obj);
        console.error('/sign-in', errMsg);

        return;
      }

      // req.session.destroy(() => {
      req.session.user = { email, password: hashPassword };

      // });

      req.session.save(() => {
        return { user: { email, password: hashPassword } };
      });
      // console.log('AAA###', req.sessionID, req.session.user);

      let obj: SignInServerResponse = {
        data: {
          email: user.email,
          theme: user.theme,
          favorities: user.favorities,
        },

        success: 'User has signed in',
      };

      console.log('/sign-in', 'sucess', email);

      res.json(obj);
      res.status(201).end();
    } catch (e) {
      res.json({
        errors: { email: 'Email and/or password is wrong.' },
      });

      console.error('/sign-in', e);
    }
  });

  if (IS_PROD) {
    app.use('/sign-in', express.static(PUBLIC_FILES));
  } else {
    app.use('/sign-in', addSessionToBodyDevelopement);
  }
}
