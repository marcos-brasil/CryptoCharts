// import { server } from './server';
import { CERT_PATH, PORT } from './constants';
import child_process from 'child_process';
import { promisify } from 'util';

import express from 'express';

import { createServer } from 'https';
import { readFileSync } from 'fs';

import { IS_PROD, IS_DARWIN } from './constants';

import './utils/kill-server';

import createRestServer from './server';

import './services/ws-server';
// import './db/insert-sparkline-prices';

process.on('uncaughtException', e => {
  //
  console.error(e);
});

let app = express();

const server = IS_PROD && IS_DARWIN
  ? createServer(
      {
        cert: readFileSync(`${CERT_PATH}/localhost.pem`),
        key: readFileSync(`${CERT_PATH}/localhost-key.pem`),
      },
      app
    )
  : app;

createRestServer(app);

let exec = promisify(child_process.exec);
server.listen(PORT, () => {
  console.log(`express server listening: ${PORT}`);

  if (!IS_PROD) {
    // forcing vitejs to fast-reload page on dev
    exec(`touch ${process.cwd()}/../client/src/App.tsx`);
  }
});

process.on('SIGINT', function () {
  console.log('exit');
  process.exit(0);
});

// import sqlite3 from 'sqlite3';

// import request from 'request';

// import child_process from 'child_process';
// import { promisify } from 'util';

// import express from 'express';
// import { createServer } from 'https';
// import { readFileSync } from 'fs';
// // declare class WebSocketServer = WebSocket.Server;

// import { WebSocketServer } from './ws-type-fix';
// // import { WebSocketServer } from 'ws';

// // import { fakeData } from './fake-fin-data';
// import { PORT } from './constants';

// import fetch from 'node-fetch';

// import './kill-server';

// // console.log('AAAA11', process.cwd());
// // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// const server = createServer({
//   cert: readFileSync(process.cwd() + '/certs/localhost.pem'),
//   key: readFileSync(process.cwd() + '/certs/localhost-key.pem'),
// });
// let exec = promisify(child_process.exec);

// let websocketSecure = new WebSocketServer({ server });

// let websocketInsecure = new WebSocketServer({ port: 3081 });

// server.listen(3082);

// let wsConnections =
//   process.env.NODE_ENV === 'production'
//     ? [websocketSecure]
//     : [websocketSecure, websocketInsecure];

// const app = express();

// // console.log(process.env.NODE_ENV);

// let createUrl = (url: string) => {
//   return `https://api.coingecko.com/api/v3/${url}`;
// };

// // let supportedCurrencies = '​simple​/supported_vs_currencies';
// // let coinList = 'coins/list';
// let markets =
//   'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=true&price_change_percentage=1h,24h,7d,30d';
// // const mktResponse = await fetch(
// //   'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin'
// // );

// const coins = await fetch(createUrl(markets));
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const mkt = (await coins.json()) as any[];

// // console.log(mkt[0]);
// console.log(mkt.length);

// let sampleMarketData = mkt
//   .sort((a, b) => a.market_cap_rank - b.market_cap_rank)
//   .filter((_, i) => i < 350);

// wsConnections.forEach(con => {
//   con.on('connection', ws => {
//     ws.on('message', msgBuffer => {
//       let msg = msgBuffer.toString();
//       if (msg === 'market') {
//         // let [a, b, c, d, e, ...rest] = mkt;

//         if (sampleMarketData.length === 0) {
//         }

//         ws.send(JSON.stringify(sampleMarketData));
//       }

//       console.log('receved msg:', msg);
//     });

//     // let [a, b, c, d, e, ...rest] = mkt;

//     // ws.send(JSON.stringify([a, b, c, d, e]));
//     // ws.send(JSON.stringify(rest));
//   });
// });

// app.get('/api/v1', function (_req, _res) {
//   console.log('responding api request !!!!');
//   // request('http://localhost:3000/').pipe(res);
//   // res.send(fakeData[0]);
//   // res.send(fakeData[0]);
// });

// app.listen(PORT, () => {
//   console.log(`express server listening: ${PORT}`);

//   if (process.env.NODE_ENV !== 'production') {
//     // forcing vitejs to fast-reload page
//     exec(`touch ${process.cwd()}/client/App.tsx`);
//   }
// });

// // app.get('/api/v1/market', async res => {});

// //
// //
// //
// //
// //
// //
// //
// //
// //

// // let sql = sqlite3.verbose();

// // let db = new sql.Database(':memory:');

// // db.serialize(function () {
// //   db.run('CREATE TABLE lorem (info TEXT)');

// //   var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
// //   for (var i = 0; i < 10; i++) {
// //     stmt.run('Ipsum : ' + i);
// //   }

// //   stmt.finalize();

// //   db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
// //     if (err) {
// //       console.error(err);
// //     }
// //     console.log(row.id + ': ' + row.info);
// //   });
// // });

// // db.close();
