import fs from 'fs';
// import path from 'path';
// import cjstoesm from 'cjstoesm';

// import glob from 'glob';
// import del from 'del';

import { promisify } from 'util';

import esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
// const esbuild = require('esbuild');

import child_process from 'child_process';

let writeFile = promisify(fs.writeFile);
let exec = promisify(child_process.exec);
// console.log(pkgs);
// process.exit(0);

export default async function (): Promise<void> {
  // fixing native-base

  // console.log('1. fixing native-base package.json');

  // let pkgJsonPath = 'node_modules/native-base/package.json';
  // let json = JSON.parse(fs.readFileSync(pkgJsonPath) as unknown as string);

  // json.module = 'src/index.js';

  // await writeFile(pkgJsonPath, JSON.stringify(json, null, 2));

  console.log('1. bundling native-base into a single file');

  await esbuild.build({
    entryPoints: ['node_modules/native-base/src/index.tsx'],
    bundle: true,
    platform: 'neutral',
    outdir: 'vendors/native-base/src',
    loader: {
      '.png': 'dataurl',
    },
    format: 'esm',
    target: 'esnext',
    sourcemap: true,
    external: ['@react-stately'],
    // outfile: 'dist/index.js',
    plugins: [
      nodeExternalsPlugin({
        packagePath: [
          'node_modules/native-base/package.json',
          process.cwd() + '/package.json',
        ],
      }),
    ],
  });

  // console.log('3. creating native-base patch');
  // await exec('npx patch-package native-base');
}
