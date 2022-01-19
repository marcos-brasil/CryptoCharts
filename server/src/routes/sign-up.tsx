import express from 'express';

import bcrypt from 'bcrypt';

import { singUpFormSchema } from '../yup-schemas';

import { SignInServerResponse } from '../types';
// declare global {

// }
import { dev as addSessionToBodyDevelopement } from '../services/add-session-to-body-middleware';

// import { URL } from '../../client/screens/Home';
import { PUBLIC_FILES, IS_PROD } from '../constants';

import { insertNewUserAccountStmt } from '../db/accounts';

export default function (app: express.Express): void {
  app.post('/sign-up', async (req, res) => {
    let emailFailed = '';
    try {
      let email = req.body.email;

      try {
        await singUpFormSchema.validate(req.body);
      } catch (e) {
        console.error('/sign-up', (e as NodeJS.ErrnoException)?.message);
        res.json({
          errors: "Sign up shouldn't fail. Are you using Postman?",
        });
        return;
      }

      emailFailed = email;
      console.log('try to sign up user:', email);

      let hashPassword = bcrypt.hashSync(req.body.password, 10);

      let user = {
        email: email,
        theme: req.body.theme || 'os-theme',
        favorities: req.body.favorities || '',
      };

      await insertNewUserAccountStmt.all(
        email,
        hashPassword,
        req.body.theme || 'os-theme',
        req.body.favorities || ''
      );

      console.log('sign up success:', email);

      req.session.user = { email, password: hashPassword };

      req.session.save(e => {
        if (e) {
          console.error('/sign-up', '\n\n', e);
          return {};
        }
        //

        console.log('session set for:', email);

        return { user: { email, password: hashPassword } };
      });
      // since user creation succeded. added to the session

      let obj: SignInServerResponse = {
        data: {
          email: user.email,
          theme: user.theme,
          favorities: user.favorities,
        },

        success: 'User has signed in',
      };

      res.json(obj);
      res.status(201).end();
    } catch (e) {
      res.json({
        errors: `Email ${req.body.email} already registered.`,
      });

      console.error('couldnt sign-up user:', emailFailed);
    }
    //
  });

  if (IS_PROD) {
    app.use('/sign-up', express.static(PUBLIC_FILES));
  } else {
    app.use('/sign-up', addSessionToBodyDevelopement);
  }
}
