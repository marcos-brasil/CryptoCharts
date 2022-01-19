//

import { IS_PROD } from '../../shared/constants';

export * from '../../shared/constants';

export let IS_DARWIN = process.platform === 'darwin';

export const PORT = IS_PROD ? 8888 : 8000;
export const PUBLIC_FILES = `${process.cwd()}/public`;

let DB_SUFIX = IS_PROD ? 'prod' : 'dev';

export const DBS_PATH = 'dbs';

export const DB_ACCOUNTS_FILE_PATH = `${process.cwd()}/${DBS_PATH}/accounts-${DB_SUFIX}.sqlite`;
export const DB_COINS_METADATA_FILE_PATH = `${process.cwd()}/${DBS_PATH}/metadata-${DB_SUFIX}.sqlite`;
export const DB_PRICES_FILE_PATH = `${process.cwd()}/${DBS_PATH}/prices-${DB_SUFIX}.sqlite`;

export const DB_SPARKLINE_FILE_PATH = `${process.cwd()}/${DBS_PATH}/sparlines-${DB_SUFIX}.sqlite`;

export const SPARKLINE_NUM_ITEMS = 160;
export let SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

export let CERT_PATH = `${process.cwd()}/secrets/certs/`;
