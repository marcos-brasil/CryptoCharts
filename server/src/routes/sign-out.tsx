import express from 'express';

export default function signOut(app: express.Express): void {
  app.delete('/sign-out', (req, res) => {
    console.log('request to delete session', req.session?.user?.email);
    req.session.destroy(e => {
      if (e) {
        console.error('/sign-out', e);
        return;
      }

      res.json({ success: 'User has signed out' });
    });
  });
}
