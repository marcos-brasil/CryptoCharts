export const IS_PROD = process.env.NODE_ENV === 'production';
export const IP_ADDRESS = IS_PROD ? '159.65.252.95' : '192.168.15.3';
export const VITE_URL = `${IP_ADDRESS}:3000`;

export const COINGECKO_URL = 'https://api.coingecko.com/api/v3';
