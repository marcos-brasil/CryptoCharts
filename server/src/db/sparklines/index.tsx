import sqlite3 from 'sqlite3';
import { Database, ISqlite, open } from 'sqlite';

import { createGetSparklinesStmt } from './update';

import { getLast, range } from '../../utils';

import {
  SPARKLINE_NUM_ITEMS,
  SEVEN_DAYS,
  DB_SPARKLINE_FILE_PATH,
} from '../../constants';

export * from './insert';
export * from './update';

export let CONFIG_DISK = {
  filename: DB_SPARKLINE_FILE_PATH,
  driver: sqlite3.cached.Database,
};

export let CONFIG_MEMORY = {
  filename: ':memory:',
  driver: sqlite3.Database,
};

export async function openDB(config: ISqlite.Config) {
  let db = await open(config);

  await createSparklineTable(db);

  return db;
}

export async function createCoinSparklineStmt(db: Database) {
  return db.prepare('SELECT * from sparklines WHERE coinId = ?;');
}

async function createSparklineTable(db: Database) {
  let colStmt = '(\nid INTEGER PRIMARY KEY AUTOINCREMENT,\n';

  colStmt += 'coinId TEXT UNIQUE,\n';
  colStmt += 'time NUMBER,\n';

  for (let idx of range(0, SPARKLINE_NUM_ITEMS, 1)) {
    let comma = idx === SPARKLINE_NUM_ITEMS - 1 ? '' : ',';

    colStmt += `col${idx} number${comma} \n`;
    //
  }

  colStmt += ');';

  try {
    await db.run(`CREATE TABLE IF NOT EXISTS sparklines ${colStmt}`);
  } catch (e) {
    console.error('coundt create sparkline DB', e);
  }
}

export async function getSparkline(
  db: Database
): Promise<[Record<string, number[]>, Record<string, number>]> {
  let newCurrentPrices = {} as Record<string, number>;

  let getSparklinesStmt = await createGetSparklinesStmt(db);
  let newSparklines: Record<string, number[]> = (await getSparklinesStmt.all())
    // .map(s => JSON.parse(s))
    .reduce((acc, v) => {
      acc[v.coinId] = Object.keys(v)
        .filter(k => k.match('col') && v[k] != null)
        .sort((a, b) => {
          let kA = Number(a.replace('col', ''));
          let kB = Number(b.replace('col', ''));
          return kA - kB;
        })
        .map(k => v[k]);

      newCurrentPrices[v.coinId] = acc[v.coinId][acc[v.coinId].length - 1];
      // acc[]
      // if (counter === 0) {
      //   counter++;
      //   console.log(acc[v.coinId]);
      // }

      return acc;
    }, {} as Record<string, number[]>);

  return [newSparklines, newCurrentPrices];
}

// import sqlite3 from 'sqlite3';
// import { Database, ISqlite, open } from 'sqlite';

// import { getLast, range } from '../../utils';

// import {
//   createGetCoinsPricesTablesNameStmt,
//   CONFIG_DISK as CONFIG_DISK_PRICES,
//   prepareGetCoinPriceStmt,
// } from '../prices';
// import type { CoinEntry } from '../prices';
// // getSparklinePrices();

// // using iterator is faster then generators

// import {
//   SPARKLINE_NUM_ITEMS,
//   SEVEN_DAYS,
//   DB_SPARKLINE_FILE_PATH,
// } from '../../constants';

// export type Sparklines = Record<
//   string,
//   { time: number; values: (number | null)[] }
// >;

// export let CONFIG_DISK = {
//   filename: DB_SPARKLINE_FILE_PATH,
//   driver: sqlite3.cached.Database,
// };

// export let CONFIG_MEMORY = {
//   filename: ':memory:',
//   driver: sqlite3.Database,
// };

// export async function openDB(config: ISqlite.Config) {
//   let db = await open(config);

//   await createSparklineTable(db);

//   return db;
// }

// async function createSparklineTable(db: Database) {
//   let colStmt = '(\nid INTEGER PRIMARY KEY AUTOINCREMENT,\n';

//   colStmt += 'coinId TEXT UNIQUE,\n';
//   colStmt += 'time NUMBER,\n';

//   for (let idx of range(0, SPARKLINE_NUM_ITEMS, 1)) {
//     let comma = idx === SPARKLINE_NUM_ITEMS - 1 ? '' : ',';

//     colStmt += `col${idx} number${comma} \n`;
//     //
//   }

//   colStmt += ');';

//   try {
//     await db.run(`CREATE TABLE IF NOT EXISTS sparklines ${colStmt}`);
//   } catch (e) {
//     console.error('coundt create sparkline DB', e);
//   }
// }

// // export async function createGetSparklinesStmt(db: Database) {
// //   return db.prepare('SELECT * from sparklines;');
// // }

// export async function createCoinSparklineStmt(db: Database) {
//   return db.prepare('SELECT * from sparklines;');
// }

// async function createInsertSparklineStmt(db: Database) {
//   let colStmt = '(\ncoinId, time,\n';
//   let valueStmt = '(?, ?,\n';

//   for (let idx of range(0, SPARKLINE_NUM_ITEMS, 1)) {
//     let comma = idx === SPARKLINE_NUM_ITEMS - 1 ? '' : ',';

//     colStmt += `col${idx}${comma}\n`;
//     valueStmt += `?${comma} \n`;
//     //
//   }

//   colStmt += ')';
//   valueStmt += ')';

//   let stmt = `INSERT INTO sparklines ${colStmt} VALUES ${valueStmt}`;

//   return db.prepare(stmt);
// }

// export async function updateCoinSparkline(
//   coindId: string,
//   time: number,
//   values: (number | null)[],
//   db: Database
// ) {
//   let assingStmt = `time = ${time},`;

//   for (let idx = 0; idx < values.length; idx++) {
//     let comma = idx === values.length - 1 ? '' : ',';

//     if (values[idx] == null) {
//       continue;
//     }

//     assingStmt += `col${idx} = ${values[idx]}${comma} \n`;
//     //
//   }

//   let stmt = `
//     UPDATE sparklines SET
//       ${assingStmt}
//     WHERE coinId = "${coindId}"
//     ;`;

//   db.run(stmt);
// }

// export async function insertSparklinePrices(db: Database, pricesDB: Database) {
//   let getCoinTablesNameStmt = await createGetCoinsPricesTablesNameStmt(
//     pricesDB
//   );

//   let insertSparklineStmt = await createInsertSparklineStmt(db);

//   let coins = await getCoinTablesNameStmt.all();

//   let currentDate = Date.now();
//   let sparklines = {} as Record<string, number[]>;

//   let counter = 0;

//   for (let coin of coins) {
//     counter++;

//     try {
//       let stmt = await prepareGetCoinPriceStmt(coin.name, pricesDB);
//       let prices = (await stmt.all(
//         (currentDate - SEVEN_DAYS) / 1000,
//         currentDate / 1000
//       )) as CoinEntry[];

//       // console.log(prices);

//       if (counter % 100 === 0) {
//         process.stdout.write('\n');
//       }

//       if (prices.length === 0) {
//         process.stdout.write('.');
//         continue;
//       }

//       let step = Math.ceil(prices.length / SPARKLINE_NUM_ITEMS);
//       sparklines[coin.name] = sparklines[coin.name] || [];

//       for (let idx of range(0, prices.length - 1, step)) {
//         // console.log(counter++, idx);
//         sparklines[coin.name].push(prices[idx].price);
//       }
//       //

//       // console.log(coin.name, sparklines[coin.name]);

//       let lastItem = getLast(prices);
//       if (sparklines[coin.name].length >= SPARKLINE_NUM_ITEMS) {
//         sparklines[coin.name].splice(
//           SPARKLINE_NUM_ITEMS - 1,
//           sparklines[coin.name].length
//         );
//       }

//       sparklines[coin.name].push(lastItem.price);

//       let item = '+';

//       let row = [...[coin.name, lastItem.time, ...sparklines[coin.name]]];

//       // console.log(coin.name, sparklines[coin.name].length);
//       try {
//         await insertSparklineStmt.all(...row);
//       } catch (e) {
//         if ((e as { code: string }).code !== 'SQLITE_CONSTRAINT') {
//           process.exit(1);
//         }
//         item = '-';
//       }

//       process.stdout.write(item);
//     } catch (e) {
//       console.error('coin ERROR:', coin, e);
//     }
//   }

//   console.log('\nDone creating sparkline db');
// }
