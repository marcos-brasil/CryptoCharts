// Your bundler file
import esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

import pkg from 'esbuild-plugin-fileloc';
import { IS_PROD } from '../../shared/constants';

let cwd = process.cwd();

import del from 'del';

export let DIST = `${cwd}/dist`;
export let PROD = `${cwd}/dist-prod`;

// the ideia is to not use node-ts but simple nodejs
// the app wont run with node-ts if a TS error is present
// esbuild remove all type annotations only
// and is mutch faster too

export let bundleConfig = {
  entryPoints: [
    `${cwd}/src/index.ts`,
    // `${cwd}/src/db/insert-coins-data.tsx`,
    // `${cwd}/src/db/insert-coins-price.tsx`,
    // `${cwd}/src/db/insert-sparkline-prices.tsx`,
    // `${cwd}/src/db/update-sparkline-prices.tsx`,
    `${cwd}/src/db/insert.tsx`,
    `${cwd}/src/db/update.tsx`,
  ],
  bundle: true,
  platform: 'node',
  target: 'node17',
  // outfile: `${cwd}/server/dist/index.js`,
  outdir: IS_PROD ? PROD : DIST,
  format: 'esm',
  watch: false,
  minify: false,
  logLevel: 'info',
  treeShaking: true,
  // packages which doest work well with esbuild.
  // so exclude it
  external: ['hpp', 'connect-sqlite3', 'react'],
  plugins: [
    pkg.filelocPlugin(),
    nodeExternalsPlugin({
      packagePath: [process.cwd() + '/package.json'],
    }),
  ],
  define: {
    'process.env.NODE_ENV': IS_PROD ? '"production"': '"developement"'
  }
};

del(DIST);

await esbuild.build(bundleConfig);
