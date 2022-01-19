// import {
//   prepareGetCoinPriceStmt,
//   getCoinTablesNameStmt,
// } from './create/coins-price';

// import {
//   updateSparklineStmt,
//   insertSparkline,
//   Sparklines,
// } from './create/sparkline-prices';

import { getLast, range, isRunningAsScript, delay } from '../../utils';

import type { CoinEntry } from '../prices';
import { prepareGetCoinPriceStmt } from '../prices';

import { SPARKLINE_NUM_ITEMS, SEVEN_DAYS } from '../../constants';

import url from 'url';

import path from 'path';
import type { Database } from 'sqlite';

// import '../utils/kill-process';

// import { getSparklinePrices } from './create/sparkline-prices';

import type { Sparklines } from './insert';
// import {} from './insert';

export async function createGetSparklinesStmt(db: Database) {
  return db.prepare('SELECT * from sparklines;');
}

async function getSparklinePrices(db: Database): Promise<Sparklines> {
  // console.log(arg1);
  let getSparklinesStmt = await createGetSparklinesStmt(db);
  let sparklinesDB = await getSparklinesStmt.all<Record<string, number>[]>();

  let sparklinesPrices: Sparklines = {};

  for (let row of sparklinesDB) {
    let time = row.time;
    let coinId = row.coinId;

    let values = Object.entries(row)
      .filter(([key]) => key !== 'id' && key !== 'coinId' && key !== 'time')
      //  making sure col are in order. since Object.entries doesnt garantee order of [key, value] pairs
      .sort(
        ([keyA], [keyB]) =>
          Number(keyA.replace('col', '')) - Number(keyB.replace('col', ''))
      )
      .map(([_, v]) => v);

    sparklinesPrices[coinId] = { time, values };
  }

  return sparklinesPrices;
}

function selectPrices<T>(num: number, values: T[]): T[] {
  let selectedItems: T[] = [];

  if (values.length === 0) {
    return selectedItems;
  }

  if (values.length === 1) {
    return [values[0]];
  }

  if (num === 0) {
    return selectedItems;
  }

  if (num === 1) {
    return [getLast(values)];
  }

  let div = values.length / (num - 1);
  let step = Math.floor(div);

  let lastAddedIdx = 0;
  for (let idx of range(0, values.length, step)) {
    if (idx > values.length - step) {
      break;
    }

    lastAddedIdx = idx;
    selectedItems.push(values[idx]);
  }

  if (lastAddedIdx < values.length - 1) {
    selectedItems.push(getLast(values));
  }

  return selectedItems;
}

// export async function updateSparkle(
//   db: Database,
//   priceDB: Database
// ): Promise<void> {
//   let round = 0;
//   try {
//     while (true) {
//       process.stdout.write('.');
//       console.log(new Date(), 'updating sparkline, round:', round++);
//       await updateSparklineTable(db, priceDB);

//       console.log('sleep 30 sec');
//       await delay(1000 * 30);
//     }
//   } catch (e) {
//     console.log('EEE', e);
//   }

//   // console.log('done');
// }

async function selectNewEntries(
  coinId: string,
  time: number,
  currentEpoch: number,
  pricesDB: Database
) {
  let stmt = await prepareGetCoinPriceStmt(coinId, pricesDB);

  let newEntries = (await stmt.all(time, currentEpoch / 1000)) as CoinEntry[];

  return newEntries;
}

let minDeltaTime = SEVEN_DAYS / SPARKLINE_NUM_ITEMS;

function replaceAndAddPrices(
  coinId: string,
  time: number,
  currentEpoch: number,
  values: (number | null)[],
  newEntries: CoinEntry[]
): (number | null)[] {
  let nextValues = [...values];
  let currentEntry = getLast(newEntries);
  let deltaTime = currentEpoch - time * 1000;

  // just update the last price
  if (deltaTime >= minDeltaTime) {
    // console.log(coinId);

    let numOfPricesToAdd = Math.floor(deltaTime / minDeltaTime);

    let valuesToAdd = selectPrices(numOfPricesToAdd, newEntries).map(
      v => v.price
    );

    let start = values.length - numOfPricesToAdd;
    let end = SPARKLINE_NUM_ITEMS;

    let extraItems = values.length + valuesToAdd.length - SPARKLINE_NUM_ITEMS;

    if (extraItems > 0) {
      //  fix to avoid removing too many prices
      let fix = extraItems > end - start ? end - start : extraItems;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (let _ of range(0, fix)) {
        nextValues.shift();
      }
    }

    for (let idx1 of range(start, end)) {
      if (valuesToAdd[idx1 - start] == null) {
        break;
      }
      nextValues.push(valuesToAdd[idx1 - start]);
    }
  }

  // garantee the last price is the current one
  // and in case deltaTime >= minDeltaTime === false
  nextValues[nextValues.length - 1] = currentEntry.price;

  return nextValues;
}

async function updateSparklineRow(
  coindId: string,
  time: number,
  values: (number | null)[],
  db: Database
) {
  let assingStmt = `time = ${time},`;

  for (let idx = 0; idx < values.length; idx++) {
    let comma = idx === values.length - 1 ? '' : ',';

    if (values[idx] == null) {
      continue;
    }

    assingStmt += `col${idx} = ${values[idx]}${comma} \n`;
    //
  }

  let stmt = `
    UPDATE sparklines SET 
      ${assingStmt} 
    WHERE coinId = "${coindId}"
    ;`;

  // console.log(stmt);

  db.run(stmt);
  // let stmt = `UPDATE sparklines ${colStmt} VALUES ${valueStmt}`;

  // return sparklines.prepare(stmt);
}

export async function updateSparkle(db: Database, priceDB: Database) {
  let sparklines = await getSparklinePrices(db);
  // let sparklines2 = Object.entries(await getSparklinePrices());

  let currentEpoch = Date.now();

  // let newSparkline: Sparklines = {};

  //
  console.log('');
  let count = 0;
  for (let [coinId, entry] of Object.entries(sparklines)) {
    // clean null values
    if (count % 500 === 0) {
      process.stdout.write('.');
    }

    count++;

    let { time, values } = entry;

    values = values.filter(v => v != null);

    let newEntries = await selectNewEntries(
      coinId,
      time,
      currentEpoch,
      priceDB
    );

    let currentEntry = getLast(newEntries);
    // counter++;

    // if (coinId === 'bitcoin') {
    //   console.log(coinId, time, currentEntry.time);
    // }

    if (time === currentEntry.time) {
      // console.log('skiping', counter, coinId, time);
      continue;
    }

    let nextValues = replaceAndAddPrices(
      coinId,
      time,
      currentEpoch,
      values,
      newEntries
    );
    try {
      await updateSparklineRow(coinId, currentEntry.time, nextValues, db);
    } catch (e) {
      console.error('updating sparkline', e);
    }

    continue;
  }

  console.log('');
}
