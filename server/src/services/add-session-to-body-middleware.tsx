import httpProxy from 'express-http-proxy';
import { IS_PROD } from '../constants';
// declare global {

// }
// @ts-ignore
import interceptor from 'express-interceptor';
// import { URL } from '../../client/screens/Home';

// @ts-ignore
export let prod = interceptor(function (req, res) {
  return {
    // Only HTML responses will be intercepted
    isInterceptable: function () {
      return /text\/html/.test(res.get('Content-Type'));
    },
    //
    // @ts-ignore
    intercept: function (body, send) {
      let email = req.session?.user?.email;

      let sessionPayload = email
        ? JSON.stringify({ email })
        : JSON.stringify({});

      body = body.replace(
        'data-session="{}"',
        `data-session=${Buffer.from(sessionPayload, 'utf-8').toString(
          'base64'
        )}`
      );

      send(body);
    },
  };
});

export let dev = httpProxy('localhost:3000/', {
  // https: true,
  preserveHostHdr: true,
  proxyReqOptDecorator: function (proxyReqOpts) {
    // @ts-ignore
    proxyReqOpts.rejectUnauthorized = false;
    return proxyReqOpts;
    //
  },

  // proxyReqPathResolver: () => '',

  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    let email = userReq.session?.user?.email;

    let sessionPayload = email ? JSON.stringify({ email }) : JSON.stringify({});

    console.log('proxy insert session', sessionPayload);
    let html = proxyResData
      .toString('utf8')
      .replace(
        'data-session="{}"',
        `data-session=${Buffer.from(sessionPayload, 'utf-8').toString(
          'base64'
        )}`
      );

    // console.log(html);

    return Buffer.from(html, 'utf-8');
  },
});

// let jsonParser = bodyParser.json();

// app.post('/dashboard', (req, res, next) => {
//   console.log('ssss', req.session);
//   // res.send({ email: req.session.user?.email || '' });
//   next();
// });

// app.use((req, res, next) => {
//   console.log('---res', res.body);
//   next();
// });
