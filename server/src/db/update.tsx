import sqlite3 from 'sqlite3';
import type { Database, ISqlite } from 'sqlite';
import {
  updateCoinMetadata,
  openDb as openCoinMetadaDB,
  CONFIG_DISK as CONFIG_DISK_METADATA,
} from './metadata';

import {
  addCoinsPrice,
  openDB as openPriceDB,
  CONFIG_DISK as CONFIG_DISK_PRICE,
} from './prices';

import '../utils/kill-process';
import { delay, isRunningAsScript } from '../utils';
import { DB_COINS_METADATA_FILE_PATH } from '../constants';

import {
  openDB as openSparklinesDB,
  updateSparkle,
  CONFIG_DISK as CONFIG_DISK_SPARKLINES,
} from './sparklines';


update(CONFIG_DISK_METADATA, CONFIG_DISK_PRICE);

let UPDATE_TIMEOUT = 1000 * 60; // 1 min

export default async function update(
  metadataConfig: ISqlite.Config,
  priceConfig: ISqlite.Config
) {
  let metdataDB = await openCoinMetadaDB(metadataConfig);

  let priceDB = await openPriceDB(priceConfig, metadataConfig);

  let sparklineDB = await openSparklinesDB(CONFIG_DISK_SPARKLINES);

  let round = 0;

  while (true) {
    let t0 = Date.now();
    // update coin metadata every 10 min
    if (round % 10 === 0) {
      console.log('updating metadata');
      // await updateCoinMetadata(metdataDB);
    }

    console.log('\nadding current prices');
    await addCoinsPrice(priceDB);

    console.log('\nupdating sparklines');
    await updateSparkle(sparklineDB, priceDB);

    round++;

    let t1 = Date.now();
    let delta = t1 - t0;

    let timeout = UPDATE_TIMEOUT - delta;

    console.log('update waiting:', timeout / 1000, 'seg');
    await delay(timeout);
  }
}
