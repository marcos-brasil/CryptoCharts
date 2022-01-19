import fetch from 'node-fetch';

// import { inserNewCoinStmt } from './create/coins-data';

import { CoinMetadata } from '../types';

import { delay, keepTrying } from '../utils';
import { COINGECKO_URL, DB_COINS_METADATA_FILE_PATH } from '../constants';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import type { ISqlite, Database, Statement } from 'sqlite';

import { IS_PROD } from '../constants';

let TOTAL_PAGES = 20;
let FETCH_DELAY = 2000; // 2 seg

export let CONFIG_DISK = {
  filename: DB_COINS_METADATA_FILE_PATH,
  driver: sqlite3.cached.Database,
};

export let CONFIG_MEMORY = {
  filename: ':memory:',
  driver: sqlite3.Database,
};
// createCoinData();

// async function updateLoop () {

// }
if (!IS_PROD) {
  sqlite3.verbose();
}

export async function openDb(config: ISqlite.Config): Promise<Database> {
  let db = await open(config);

  await createCoinsMetadataTable(db);

  return db;
}

export async function createGetAllStmt(db: Database) {
  return db.prepare(`
    SELECT  data FROM metadata WHERE marketCapRank > 0 ORDER BY marketCapRank ASC;
  `);
}

async function createCoinsMetadataTable(db: Database) {
  // try {
  await db.run(`
    CREATE TABLE IF NOT EXISTS metadata (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      coinId TEXT UNIQUE,
      name TEXT,
      symbol TEXT,
      currentPrice NUMBER,
      marketCap number,
      marketCapRank number,
      volume number,
      data TEXT
    );
  `);
  //
  // } catch (e) {
  //   console.error('\n\nCannot create coins table\n', e);
  //   process.exit(1);
  //   //
  // }
}

export function prepareGetCoinsIds(db: Database) {
  return db.prepare(`
    SELECT coinId FROM metadata ORDER BY id ASC;
  `);
}

async function prepareInsertCoinMetadata(
  db: Database
): Promise<Statement<sqlite3.Statement>> {
  return db.prepare(`
  INSERT INTO metadata
    (
      coinId, 
      name, 
      symbol, 
      currentPrice, 
      marketCap, 
      marketCapRank, 
      volume, 
      data
    )
  VALUES
    (
      $coinId,
      $name,
      $symbol,
      $currentPrice,
      $marketCap,
      $marketCapRank,
      $volume,
      $data)
`);
}

async function prepareUpdateCoinMetadata(
  db: Database
): Promise<Statement<sqlite3.Statement>> {
  return db.prepare(`
  UPDATE metadata SET
      name = $name,
      symbol = $symbol,
      currentPrice = $currentPrice,
      marketCap = $marketCap, 
      marketCapRank = $marketCapRank, 
      volume = $volume, 
      data = $data
  WHERE
    coinId = $coinId
`);
}

async function addMetadata(logMsg: string, stmt: Statement<sqlite3.Statement>) {
  let page = 0;
  let idsCache: string[] = [];

  while (page < TOTAL_PAGES) {
    page++;

    let t0 = Date.now();

    let data = await fetchCoinsMetadata(page);

    if (data == null) {
      continue;
    }

    for (let coin of data) {
      if (idsCache.includes(coin.id)) {
        continue;
      }

      idsCache.push(coin.id);

      try {
        console.log(logMsg, page, page * 250 + data.indexOf(coin), coin.id);

        await stmt.all({
          $coinId: coin.id,
          $name: coin.name,
          $symbol: coin.symbol,
          $currentPrice: coin.current_price,
          $marketCap: coin.market_cap,
          $marketCapRank: coin.market_cap_rank,
          $volume: coin.total_volume,
          $data: JSON.stringify(coin),
        });
      } catch (e) {
        console.error('updating coin metadata ERR:', e);
        console.log(page, page * 250 + data.indexOf(coin), coin.id);
        // process.exit(1);
        throw e;
      }
    }

    let delta = Date.now() - t0;
    let timeout = FETCH_DELAY - delta;
    console.log('metadata sleeping:', timeout);
    await delay(timeout);
  }
}

export async function insertCoinMetadata(db: Database) {
  let insertStmt = await prepareInsertCoinMetadata(db);

  await addMetadata('inserting metadata', insertStmt);
}

export async function updateCoinMetadata(db: Database) {
  let updateStmt = await prepareUpdateCoinMetadata(db);

  await addMetadata('updating metadata', updateStmt);
}

async function fetchCoinsMetadata(page: number) {
  let coinDataURL = (p: number) =>
    `${COINGECKO_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${p}&sparkline=false&price_change_percentage=1h,24h,7d,30d`;

  return keepTrying(
    100,
    'Error fetching markets data from coingecko',
    false,
    async () => {
      let response = await fetch(coinDataURL(page));
      let data = await response.json();
      return data as CoinMetadata[];
    }
  );
}

// export async function createCoinData(): Promise<void> {
//   let page = 0;

//   let coinIds: string[] = [];

//   // Tue Nov 30 2021 16:10:28 GMT+0000

//   //Tue Nov 30 2021 16:15:07 GMT+0000

//   while (page < 20) {
//     page++;
//     let coinDataURL = (p: number) =>
//       `${COINGECKO_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${p}&sparkline=false&price_change_percentage=1h,24h,7d,30d`;

//     await keepTrying(
//       100,
//       'Error fetching markets data from coingecko',
//       false,
//       async () => {
//         let data = (await (
//           await fetch(coinDataURL(page))
//         ).json()) as CoinMetadata[];

//         for (let coin of data) {
//           if (coinIds.includes(coin.id)) {
//             // console.log('id', coin.id);

//             continue;
//           }

//           coinIds.push(coin.id);

//           try {
//             console.log('try insert', coin.id);

//             await inserNewCoinStmt.all(
//               coin.id,
//               coin.name,
//               coin.symbol,
//               coin.current_price,
//               coin.market_cap,
//               coin.market_cap_rank,
//               coin.total_volume,
//               JSON.stringify(coin)
//             );
//           } catch (e) {
//             console.error('inserting coin ERR:', e);
//             console.log(page, page * 250 + data.indexOf(coin), coin.id);
//             // process.exit(1);
//             throw e;
//           }
//         }
//       }
//     );
//   }
// }
