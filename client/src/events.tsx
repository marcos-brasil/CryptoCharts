import { delay, Emitter } from './utils';

import { WSS_URL } from './constants';
import { CoinMetadata } from './types';

export type InboundWssMsg =
  | { action: 'metadataEnd'; data: boolean }
  | { action: 'metadata'; data: CoinMetadata[] }
  | { action: 'sparkline'; data: [string, number[]] }
  | { action: 'currentPrice'; data: [string, number] };

// {
//   action: 'metadata' | 'sparkline' | 'currentPrice';
//   data: {
//     metadata: string;
//     sparkline: string;
//     currentPrice: string;
//   };
// };

export type outboundWssMsg =
  | { action: 'metadata'; data: [number, number] }
  | { action: 'sparkline'; data: string }
  | { action: 'currentPrice'; data: string };

export type OutboundEvt = {
  metadata: [number, number];
  sparkline: string;
  currentPrice: string;
};
// {
//   // mounted: boolean;
//   metadata: [number, number];
//   sparkline: string;
//   currentPrice: string;
// };

export type InboundEvt = {
  // mounted: boolean;
  metadataEnd: boolean;
  metadata: CoinMetadata[];
  sparkline: [string, number[]];
  currentPrice: [string, number];
};

export let inboundEvt = new Emitter<InboundEvt>();
// export let outboundEvt = new Emitter<
//   Record<OutboundEvt['action'], OutboundEvt['data']>
// >();

export let outboundEvt = new Emitter<OutboundEvt>();

export let wss = new WebSocket(WSS_URL);

outboundEvt.on('metadata', async data => {
  await wssIsOpen();
  wss.send(
    JSON.stringify({
      action: 'metadata',
      data,
    })
  );
});

outboundEvt.on('sparkline', async data => {
  await wssIsOpen();
  wss.send(
    JSON.stringify({
      action: 'sparkline',
      data,
    })
  );
});

outboundEvt.on('currentPrice', async data => {
  await wssIsOpen();
  wss.send(
    JSON.stringify({
      action: 'currentPrice',
      data,
    })
  );
});

wss.addEventListener('message', (msg: MessageEvent<string>) => {
  let payload = {} as InboundWssMsg;

  try {
    payload = JSON.parse(msg.data);
    // console.log('___', payload);
  } catch (e) {}

  switch (payload.action) {
    case 'metadataEnd': {
      inboundEvt.emit(payload.action, payload.data);
      break;
    }
    case 'metadata': {
      inboundEvt.emit(payload.action, payload.data);
      break;
    }
    case 'sparkline': {
      inboundEvt.emit(payload.action, payload.data);
      // console.log(payload);
      break;
    }

    case 'currentPrice': {
      inboundEvt.emit(payload.action, payload.data);
      break;
    }
  }
});

// export

export async function wssIsOpen(): Promise<boolean> {
  while (true) {
    if (wss.readyState !== wss.OPEN) {
      await delay(20);
      continue;
    }

    return true;
  }
}
