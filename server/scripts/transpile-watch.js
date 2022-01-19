// Your bundler file
import esbuild from 'esbuild';
import del from 'del';

import { bundleConfig, DIST } from './transpile';

// the ideia is to not use node-ts but simple nodejs
// the app wont run with node-ts if a TS error is present
// esbuild remove all type annotations only
// and is mutch faster too

let bundleWatchConfig = {
  ...bundleConfig,
  watch: true,
};

del(DIST);

await esbuild.build(bundleWatchConfig);
