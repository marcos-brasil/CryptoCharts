import sqlite3 from 'sqlite3';
import type { ISqlite } from 'sqlite';
import { DB_COINS_METADATA_FILE_PATH, DB_PRICES_FILE_PATH } from '../constants';
import {
  insertCoinMetadata,
  openDb as openCoinMetadaDB,
  CONFIG_DISK as CONFIG_DISK_METADATA,
} from './metadata';
import { isRunningAsScript } from '../utils';

console.log('ppp', CONFIG_DISK_PRICES);

import {
  openDB as openPricesDB,
  CONFIG_DISK as CONFIG_DISK_PRICES,
  addCoinsPrice,
} from './prices';

import {
  insertSparklinePrices,
  openDB as openSparklineDB,
  CONFIG_DISK as CONFIG_DISK_SPARKLINE,
} from './sparklines';

insert();
export default async function insert() {
  // console.log('AAAA')
  let metadataDB = await openCoinMetadaDB(CONFIG_DISK_METADATA);

  try {
    await insertCoinMetadata(metadataDB);
  } catch (e) {
    console.error('inserting data failed', e);
  }

  let pricesDB = await openPricesDB(CONFIG_DISK_PRICES, CONFIG_DISK_METADATA);

  await addCoinsPrice(pricesDB);

  let sparklinesDB = await openSparklineDB(CONFIG_DISK_SPARKLINE);

  await insertSparklinePrices(sparklinesDB, pricesDB);

  //
  // console.log('******');
}
