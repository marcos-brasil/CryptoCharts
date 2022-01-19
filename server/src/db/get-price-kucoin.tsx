import fetch from 'node-fetch';

// import { inserNewCoinStmt } from './create-old/coins-data';

import { CoinMetadata } from '../types';

import { keepTrying } from '../utils';
import { COINGECKO_URL } from '../constants';

import {
  secret as kucoinApiSecret,
  api as kucoinAPI,
} from '../../secrets/kucoin-dev-secrets';

import qs from 'querystring';
import crypto from 'crypto';

type RestVerbs = 'GET' | 'POST' | 'DELETE' | 'UPDADE';

function createKucoinHeader(
  method: RestVerbs,
  params: Record<string, string>
): Record<string, string> {
  let paramsJson = JSON.stringify(params);

  let paramsStr =
    method === 'GET' || method === 'DELETE'
      ? // the payload may be empty
        new URLSearchParams(paramsJson === '{}' ? '' : params)
      : JSON.stringify(paramsJson);

  let timestamp = String(Date.now());

  let signature = crypto
    .createHmac('sha256', kucoinApiSecret.key)
    .update(`${timestamp}${method}${paramsStr}`)
    .digest('base64');

  let passphrase = crypto
    .createHmac('sha256', kucoinApiSecret.key)
    .update(kucoinApiSecret.passphrase)
    .digest('base64');

  return {
    'Content-Type': 'application/json',
    'KC-API-TIMESTAMP': timestamp,
    'KC-API-KEY': kucoinApiSecret.key,
    'KC-API-PASSPHRASE': passphrase,
    'KC-API-SIGN': signature,
    'KC-API-KEY-VERSION': '2',
  };
}

// let getCurentPrice = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd'

// historical with 5 min resolution is only for a day
// doesnt give ohlcv data
// 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1'

type KucoinResponse = {
  code: number;
  data: Array<{
    symbol: string;
    name: string;
    baseCurrency: string;
    quoteCurrency: string;
    feeCurrency: string;
    market: string;
    baseMinSize: string;
    quoteMinSize: string;
    baseMaxSize: string;
    quoteMaxSize: string;
    baseIncrement: string;
    quoteIncrement: string;
    priceIncrement: string;
    priceLimitRate: string;
    isMarginEnabled: boolean;
    enableTrading: boolean;
  }>;
};

createcoinPrices();

export async function createcoinPrices(): Promise<void> {
  let method: RestVerbs = 'GET';
  let headers = createKucoinHeader(method, {});

  let res = (await (
    await fetch(kucoinAPI.symbols, { method, headers })
  ).json()) as KucoinResponse;

  // console.log(Object.keys(res));
  // console.log(res.code);

  let baseList: string[] = [];
  let quoteList: string[] = [];
  let quotePairs: [string, string][] = [];

  for (let coin of res.data) {
    let base = coin.baseCurrency;
    let quote = coin.quoteCurrency;

    baseList.includes(base) || baseList.push(base);
    quoteList.includes(quote) || quotePairs.push([base, quote]);
    quoteList.includes(quote) || quoteList.push(quote);
  }

  // baseList.forEach(r => console.log(r));
  quotePairs.forEach(r => console.log(r));

  console.log(baseList.length);
  console.log(quoteList.length);

  // fetch('', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'KC-API-TIMESTAMP': String(Date.now()),
  //     'KC-API-KEY': kucoinApiSecret.key,
  //     'KC-API-PASSPHRASE': kucoinApiSecret.passphrase,
  //     'KC-API-SIGN': '',
  //     'KC-API-KEY-VERSION': '2',
  //   },
  // });

  // curl -H "Content-Type:application/json" -H "KC-API-KEY:5c2db93503aa674c74a31734" -H "KC-API-TIMESTAMP:1547015186532" -H "KC-API-PASSPHRASE:QWIxMjM0NTY3OCkoKiZeJSQjQA==" -H "KC-API-SIGN:7QP/oM0ykidMdrfNEUmng8eZjg/ZvPafjIqmxiVfYu4=" -H "KC-API-KEY-VERSION:2"

  // Mon Nov 01 2021 16:08:58 GMT+0000
  // Mon Nov 01 2021 17:02:24 GMT+0000
  // Mon Nov 01 2021 17:02:24 GMT+0000

  // Wed Dec 02 2020 00:00:00 GMT+0000
  // Thu Dec 03 2020 00:00:00 GMT+0000
}
