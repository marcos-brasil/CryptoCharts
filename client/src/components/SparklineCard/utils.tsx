import { useColorScheme } from 'react-native';

import { red35, gray10, green25, red65, gray90, green70 } from '../theme';

import type { CardProps, CoinMetadata } from './types';

export function getNumberColor(
  n: number,
  osTheme: ReturnType<typeof useColorScheme>
): string {
  let gray = osTheme === 'dark' ? gray90 : gray10;
  let red = osTheme === 'dark' ? red65 : red35;
  let green = osTheme === 'dark' ? green70 : green25;

  let color =
    (n > 0 && n < 0.1) || (n < 0 && n > -0.1) ? gray : n < 0 ? red : green;

  return color;
}

export function fixNumber(n: number): string {
  n = parseFloat(n as unknown as string);
  if (Number.isNaN(n) || n == null) {
    return '-';
  }

  let numExp = n
    .toExponential()
    .split('e')
    .map(s => parseFloat(s));

  let [base, exp] = numExp;
  let baseStr = base.toFixed(3);

  if (exp >= 15) {
    let num = ((base * Math.pow(10, exp)) / Math.pow(10, 15)).toFixed(2);
    baseStr = `${num} Q`;
  } else if (exp >= 12) {
    let num = ((base * Math.pow(10, exp)) / Math.pow(10, 12)).toFixed(2);
    baseStr = `${num} T`;
  } else if (exp >= 9) {
    let num = ((base * Math.pow(10, exp)) / Math.pow(10, 9)).toFixed(2);
    baseStr = `${num} B`;
  } else if (exp >= 6) {
    let num = ((base * Math.pow(10, exp)) / Math.pow(10, 6)).toFixed(2);
    baseStr = `${num} M`;
  } else if (exp >= 3) {
    let num = ((base * Math.pow(10, exp)) / Math.pow(10, 3)).toFixed(3);
    baseStr = `${num} K`;
  } else if (exp === 2) {
    let num = parseFloat(baseStr);
    baseStr = Number.isNaN(num) ? '-' : `${(num * 100).toFixed(2)}`;
  } else if (exp === 1) {
    let num = parseFloat(baseStr);
    baseStr = Number.isNaN(num) ? '-' : `${(num * 10).toFixed(3)}`;
  } else if (exp <= -3) {
    baseStr = `${baseStr} E${exp}`;
  }

  return baseStr.replace('.00 ', ' ');
}

export function computeAvailableSupply(props: CardProps): string {
  let { circulating_supply, max_supply } = props.item;

  let avlSupplay = 100 * (1 - circulating_supply / max_supply);

  let avlSupplayStr =
    avlSupplay === -Infinity ? '-' : avlSupplay.toFixed(2) + '%';
  // console.log('AAA', market_cap.toLocaleString());

  avlSupplayStr = avlSupplayStr === '0.000%' ? '0%' : avlSupplayStr;
  avlSupplayStr = avlSupplayStr === '0.00%' ? '0%' : avlSupplayStr;
  avlSupplayStr = avlSupplayStr === '0.0%' ? '0%' : avlSupplayStr;
  avlSupplayStr = avlSupplayStr === '100.00%' ? '100%' : avlSupplayStr;

  return avlSupplayStr;
}

export function sanatizeProps(props: CardProps): CoinMetadata {
  let {
    symbol,
    name,
    market_cap,
    market_cap_rank,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    circulating_supply,
    max_supply,
    sparkline_in_7d,
    // height,
  } = props.item;

  symbol = symbol == null ? '-' : symbol;

  market_cap = market_cap == null ? 0 : market_cap;

  market_cap_rank = market_cap_rank == null ? 0 : market_cap_rank;

  price_change_percentage_1h_in_currency =
    price_change_percentage_1h_in_currency == null
      ? 0
      : price_change_percentage_1h_in_currency;

  price_change_percentage_24h_in_currency =
    price_change_percentage_24h_in_currency == null
      ? 0
      : price_change_percentage_24h_in_currency;

  price_change_percentage_7d_in_currency =
    price_change_percentage_7d_in_currency == null
      ? 0
      : price_change_percentage_7d_in_currency;

  circulating_supply = circulating_supply == null ? 0 : circulating_supply;
  // max_supply = max_supply == null ? null : max_supply;

  return {
    ...props.item,
    symbol,
    name,
    market_cap,
    market_cap_rank,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    circulating_supply,
    max_supply,
    sparkline_in_7d,
  };
}
