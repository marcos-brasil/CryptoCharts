import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import fetch from 'node-fetch';

import { CoinMetadata } from '../types';

import { delay, keepTrying } from '../utils';
import { COINGECKO_URL, DB_PRICES_FILE_PATH } from '../constants';

// import { getCoinIdsStmt } from './create/coins-data';

// import './update-sparkline-prices';
// import '../utils/kill-process';
import type { Database, ISqlite } from 'sqlite';

import { prepareGetCoinsIds } from './metadata';

export type CoinEntry = {
  id: number;
  price: number;
  time: number;
};

type CoinCurrentPrice = {
  coinId?: string;
  usd: number;
  last_updated_at: number;
};

type CoinCurrentBatchPrice = Record<string, CoinCurrentPrice>;

let FETCH_DELAY = 2000; // 2 seg

export let CONFIG_DISK = {
  filename: DB_PRICES_FILE_PATH,
  driver: sqlite3.cached.Database,
};

export let CONFIG_MEMORY = {
  filename: ':memory:',
  driver: sqlite3.Database,
};

export async function openDB(
  priceConfigDB: ISqlite.Config,
  metadataConfigDB: ISqlite.Config
): Promise<Database> {
  let [db, metadataDB] = await Promise.all([
    open(priceConfigDB),
    open(metadataConfigDB),
  ]);

  await createCoinsPricesTable(db, metadataDB);
  return db;
}

export async function createGetCoinsPricesTablesNameStmt(db: Database) {
  return db.prepare(`
    SELECT name FROM sqlite_schema WHERE type='table'
    AND name NOT LIKE 'sqlite%'
  `);
}

export async function prepareGetCoinPriceStmt(tableName: string, db: Database) {
  return db.prepare(`
    SELECT * FROM "${tableName}"
    WHERE  time >= ?
      AND time <= ?
    ORDER BY id ASC
  `);
}

//
async function createCoinsPricesTable(db: Database, metdaDB: Database) {
  let tableNames = await getCoinIds(metdaDB);

  console.log('creating price tables');
  let counter = 0;
  for (let tableName of tableNames) {
    if (counter % 500 === 0) {
      process.stdout.write('.');
    }

    counter++;
    // console.log(tableName);
    await db.run(`
      CREATE TABLE IF NOT EXISTS "${tableName}" (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        price NUMBER,
        time NUMBER UNIQUE
      );
    `);
  }
  process.stdout.write('\n');
}

async function getCoinIds(db: Database): Promise<string[]> {
  let stmt = await prepareGetCoinsIds(db);
  let coinList: Array<{ coinId: string }> = await stmt.all();

  return coinList.map(c => c.coinId);
  // return Object.values(coinList);
}

let timeCache: Record<string, number> = {};

async function prepareInsertCoinPriceStmt(tableName: string, db: Database) {
  return db.prepare(`
    INSERT INTO "${tableName}" 
      (price, time) 
    VALUES 
      ($price, $time)
  `);
}

export async function addCoinsPrice(db: Database) {
  let cache: string[] = [];

  let batchSize = 500;

  let stmt = await createGetCoinsPricesTablesNameStmt(db);

  let coinIds = (await stmt.all()).map(v => v.name) as string[];
  // console.log(coinIds);

  for (let idx = 0; idx < coinIds.length; idx++) {
    let id = coinIds[idx];

    if (idx % batchSize !== 0 || idx === 0) {
      cache.push(id);
      continue;
    }

    let t0 = Date.now();

    // now there are 500 ids in the cache

    let ids = cache.join(',');
    let prices = await fetchCoinsPrices(ids);

    if (prices == null) {
      cache = [];
      continue;
    }

    // console.log(prices);
    // process.stdout.write('.');
    let keys = Object.keys(prices) as (keyof CoinCurrentBatchPrice)[];

    for (let tableName of keys) {
      if (timeCache[tableName] === prices[tableName].last_updated_at) {
        continue;
      }

      timeCache[tableName] = prices[tableName].last_updated_at;

      let stmt = await prepareInsertCoinPriceStmt(tableName, db);

      try {
        await stmt.all({
          $price: prices[tableName].usd,
          $time: prices[tableName].last_updated_at,
        });
      } catch (e) {
        if ((e as { code: string }).code !== 'SQLITE_CONSTRAINT') {
          console.error('adding price', e);
        }
      }
    }

    cache = [];

    let delta = Date.now() - t0;
    let timeout = FETCH_DELAY - delta;

    console.log('add price sleeping:', timeout);

    if (timeout < 0) {
      continue;
    }

    await delay(timeout);
    // console.log(idx, cache.length);
    // cache = [];
    // let ids =
  }
}

async function fetchCoinsPrices(ids: string) {
  let priceUrl = `${COINGECKO_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_last_updated_at=true`;

  return keepTrying(
    100,
    'Error fetching prices. trying in 100ms',
    false,
    async () => {
      let response = await fetch(priceUrl);
      let json = await response.json();

      return json as CoinCurrentBatchPrice;
    }
  );
}

/*
export async function insertCoinPrice(
  hasToCreateDB: boolean,
  coinIds: string[]
): Promise<void> {
  let cache: string[] = [];

  let batchSize = 500;

  // console.log(coinIds);

  for (let idx = 1; idx < coinIds.length; idx++) {
    let id = coinIds[idx - 1];

    if (idx !== coinIds.length - 1) {
      if (idx === 0 || idx % batchSize !== 0) {
        cache.push(id);
        continue;
      }
    }

    let ids = cache.join(',');

    let priceUrl = `${COINGECKO_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_last_updated_at=true`;

    // console.log('begin fetching:\n', cache, '\n', idx);

    process.stdout.write('+');
    cache = [];

    let t1 = Date.now();
    await keepTrying(
      100,
      'Error fetching prices. trying in 100ms',
      false,
      async () => {
        let res = await fetch(priceUrl);

        let res1 = (await res.json()) as CoinCurrentBatchPrice;

        let keys = Object.keys(res1) as (keyof CoinCurrentBatchPrice)[];
        for (let tableName of keys) {
          if (timeCache[tableName] === res1[tableName].last_updated_at) {
            // process.stdout.write('.');
            continue;
          }

          timeCache[tableName] = res1[tableName].last_updated_at;

          if (hasToCreateDB) {
            try {
              await createCoinPriceTable(tableName);
            } catch (e) {
              console.error('creating prices db ERR:', e);
              process.exit(1);
            }
          }

          try {
            let stmt = await prepareInsertCoinPriceStmt(tableName);

            let unixTime = res1[tableName].last_updated_at;
            let price = res1[tableName].usd;
            let date = new Date(unixTime * 1000);

            let year = date.getUTCFullYear();
            let month = date.getUTCMonth();
            let day = date.getUTCDay();
            let hour = date.getUTCHours();
            let min = date.getUTCMinutes();
            let sec = date.getUTCSeconds();
            let milli = date.getUTCMilliseconds();

            await stmt.all(
              price,
              unixTime,
              year,
              month,
              day,
              hour,
              min,
              sec,
              milli
            );
          } catch (e) {
            // console.error('in:w:wsert price ERR:', e);
            // let unixTime = res1[k].last_updated_at;
            // let price = res1[k].usd;
            // let date = new Date(unixTime * 1000);
            // let year = date.getUTCFullYear();
            // let month = date.getUTCMonth();
            // let day = date.getUTCDay();
            // let hour = date.getUTCHours();
            // let min = date.getUTCMinutes();
            // let sec = date.getUTCSeconds();
            // let milli = date.getUTCMilliseconds();
            // console.log(
            //   res1,
            //   price,
            //   unixTime,
            //   date,
            //   year,
            //   month,
            //   day,
            //   hour,
            //   min,
            //   sec,
            //   milli
            // );
            // process.exit(1);:w
          }
        }

        let t2 = Date.now();

        let delayTime = 1000 * 2 - (t2 - t1);

        if (delayTime <= 0) {
          return;
        }

        await delay(delayTime);

        // console.log(res);
      }
    );
  }
}

// try {
//   await createCoinData();
// } catch (e) {
//   console.log('coin data already created');
// }

*/

/*

// createCoinPrices();
export async function createCoinPrices(): Promise<void> {
  let t1 = new Date();
  let t1Utc = Date.now();

  let hasToCreateDB = true;

  try {
    let coinsIds = await getCoinIds();

    let counter = 1;
    while (true) {
      console.log(counter++);
      await insertCoinPrice(hasToCreateDB, coinsIds);
      hasToCreateDB = false;
      process.stdout.write('\n');

      let t2 = new Date();
      let t2Utc = Date.now();

      console.log(t1, t2, (t2Utc - t1Utc) / 1000);

      console.log('waiting 20sec');
      await delay(1000 * 20);

      t1Utc = Date.now();
      t1 = new Date();
    }
  } catch (e) {
    console.error(e);
  }
}
*/
