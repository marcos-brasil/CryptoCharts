// @ts-ignore
import { WebSocketServer as WSS } from 'ws';

import type { Server } from 'ws';

export let WebSocketServer: typeof Server = WSS;
