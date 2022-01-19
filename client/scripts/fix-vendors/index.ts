// import fs from 'fs';
// import path from 'path';
// import cjstoesm from 'cjstoesm';

// import glob from 'glob';
// import del from 'del';

// import { promisify } from 'util';

// import esbuild from 'esbuild';
// import { nodeExternalsPlugin } from 'esbuild-node-externals';
// const esbuild = require('esbuild');

// console.log(pkgs);
// process.exit(0);
import patchReactNavigation from './@react-navigation';
import patchNativeBase from './native-base';

createAlias().catch(e => {
  console.error(e);
});

async function createAlias() {
  await Promise.all([patchReactNavigation(), patchNativeBase()]);
}
