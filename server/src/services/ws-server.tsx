// import sqlite3 from 'sqlite3';

import { readFileSync } from 'fs';

import { WebSocketServer } from '../utils/ws-type-fix';

import fetch from 'node-fetch';

import { createServer as createHttpsServer } from 'https';
import { createServer as createHttpServer } from 'http';

import { delay } from '../utils';

import { CoinMetadata } from '../types';

import '../utils/kill-process';

import {
  openDb as openMetadataDB,
  createGetAllStmt as createGetAllMetadataStmt,
  CONFIG_DISK as CONFIG_DISK_METADATA,
} from '../db/metadata';
import { IS_PROD, COINGECKO_URL, CERT_PATH, IS_DARWIN } from '../constants';

// import {
//   getSparklinesStmt,
//   getCoinSparklineStmt,
// } from '../db/create/sparkline-prices';

import {
  outboundWssMsg as ClientOutboundWssMsg,
  InboundWssMsg as ClientInboundWssMsg,
  OutboundEvt as ClientOutboundEvt,
} from '../../../client/src/events';

// import bodyParser from 'body-parser';
// import csurf from 'csurf';

declare module 'express-session' {
  interface SessionData {
    user: Record<string, string> | void;
  }
}

// @ts-ignore: there is an error at @types/connect-sqlite3

// console.log(connectSqlite3.toString());
// process.on('uncaughtException', err => {
//   console.log(err);
//   process.exit(1);
// });

const wsServer =
  IS_PROD && IS_DARWIN
    ? createHttpsServer({
        cert: readFileSync(`${CERT_PATH}/localhost.pem`),
        key: readFileSync(`${CERT_PATH}/localhost-key.pem`),
      })
    : createHttpServer();

let websocketSecure = new WebSocketServer({ server: wsServer });

let websocketInsecure = new WebSocketServer({ port: 3081 });

wsServer.listen(3082);

let wsConnections = IS_PROD
  ? [websocketInsecure]
  : [websocketSecure, websocketInsecure];

// let createUrl = (url: string) => {
//   return `${COINGECKO_URL}/${url}`;
// };

//

// let markets =
//   'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=true&price_change_percentage=1h,24h,7d,30d';

// const mktResponse = await fetch(
//   'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin'
// );

// async function fetchMarketData(): Promise<CoinMetadata[]> {
//   let keepTrying = true;

//   while (keepTrying) {
//     try {
//       const coins = await fetch(createUrl(markets));
//       const mkt = (await coins.json()) as CoinMetadata[];
//       return mkt;
//     } catch (err) {
//       console.error('cant fetch data. trying again in 100ms');
//       await delay(100);
//     }
//   }

//   // impossible to reach, but keep typescript happy
//   return [];
// }
import {
  getSparkline,
  openDB as openSparklineDB,
  CONFIG_DISK as CONFIG_DISK_SPARKLINES,
  createCoinSparklineStmt,
} from '../db/sparklines';

let metadataDB = await openMetadataDB(CONFIG_DISK_METADATA);
let sparklineDB = await openSparklineDB(CONFIG_DISK_SPARKLINES);

let getallMetadataStmt = await createGetAllMetadataStmt(metadataDB);

let mkt = (await getallMetadataStmt.all()).map(c => {
  let data = JSON.parse(c.data);
  data.price_change_percentage_1h_in_currency = null;
  data.price_change_percentage_24h_in_currency = null;
  data.price_change_percentage_7d_in_currency = null;
  return data;
});

//
//

// async function getSparkline(): Promise<
//   [Record<string, number[]>, Record<string, number>]
// > {
//   let newCurrentPrices = {} as Record<string, number>;

//   let newSparklines: Record<string, number[]> = (await getSparklinesStmt.all())
//     // .map(s => JSON.parse(s))
//     .reduce((acc, v) => {
//       acc[v.coinId] = Object.keys(v)
//         .filter(k => k.match('col') && v[k] != null)
//         .sort((a, b) => {
//           let kA = Number(a.replace('col', ''));
//           let kB = Number(b.replace('col', ''));
//           return kA - kB;
//         })
//         .map(k => v[k]);

//       newCurrentPrices[v.coinId] = acc[v.coinId][acc[v.coinId].length - 1];
//       // acc[]
//       // if (counter === 0) {
//       //   counter++;
//       //   console.log(acc[v.coinId]);
//       // }

//       return acc;
//     }, {} as Record<string, number[]>);

//   return [newSparklines, newCurrentPrices];
// }

let [sparklines, currentPrices]: [
  Record<string, number[]>,
  Record<string, number>
] = await getSparkline(sparklineDB);

let getCoinSparklineStmt = await createCoinSparklineStmt(sparklineDB);

// lame way to keep updating sparklines
// setInterval(async () => {
//   let data = await getSparkline();
//   sparklines = data[0];
//   currentPrices = data[1];
//   // console.log('++++++++');
// }, 1000);

//

mkt = mkt.sort((a, b) => a.market_cap_rank - b.market_cap_rank);

wsConnections.forEach(con => {
  con.on('connection', ws => {
    ws.on('message', async msgBuffer => {
      let msg = msgBuffer.toString();

      let payload = {} as ClientOutboundWssMsg;

      try {
        payload = JSON.parse(msg);
      } catch (e) {
        console.log('cant parse wss msg', e);
      }

      switch (payload.action) {
        case 'metadata': {
          if (payload.data[0] >= mkt.length) {
            let outboundPayload: ClientInboundWssMsg = {
              action: 'metadataEnd',
              data: true,
            };

            ws.send(JSON.stringify(outboundPayload));
            return;
          }

          let outboundPayload: ClientInboundWssMsg = {
            action: payload.action,
            data: mkt.slice(...payload.data),
          };

          ws.send(JSON.stringify(outboundPayload));
          break;
        }

        case 'sparkline': {
          let outboundPayload: ClientInboundWssMsg = {
            action: payload.action,
            data: [payload.data, sparklines[payload.data]],
          };

          ws.send(JSON.stringify(outboundPayload));
          break;
        }

        case 'currentPrice': {
          let id: ReturnType<typeof setInterval>;

          let coinId = payload.data;
          let action = payload.action;
          // let currentPrice = currentPrices[payload.data];
          // id = setInterval(async () => {
          try {
            console.log('trying get current Price', coinId);
            let coinSparklineObj: Record<string, number> = (
              await getCoinSparklineStmt.all(coinId)
            )[0];

            let coinSparkline = Object.keys(coinSparklineObj)
              .filter(k => k.match('col') && coinSparklineObj[k] != null)
              .sort((a, b) => {
                let kA = Number(a.replace('col', ''));
                let kB = Number(b.replace('col', ''));
                return kB - kA;
              })
              .map(k => {
                return coinSparklineObj[k];
              });

            // let currentPrice = coinSparkline[0];

            // if (currentPrice === currentPrices[coinId]) {
            //   return;
            // }

            // currentPrices[coinId] = currentPrice;

            let outboundPayload: ClientInboundWssMsg = {
              action: action,
              data: [coinId, coinSparkline[0]],
            };
            ws.send(JSON.stringify(outboundPayload));
            // clearInterval(id);
          } catch (e) {
            // clearInterval(id)
          }
          // }, 1000 * 60);

          break;
        }
      }

      // console.log('receved msg:', msg);
    });

    // let [a, b, c, d, e, ...rest] = mkt;

    // ws.send(JSON.stringify([a, b, c, d, e]));
    // ws.send(JSON.stringify(rest));
  });
});
