import fs from 'fs';
import path from 'path';
import cjstoesm from 'cjstoesm';

import glob from 'glob';
import del from 'del';

import { promisify } from 'util';

import esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
// const esbuild = require('esbuild');

import child_process from 'child_process';

let mkdir = promisify(fs.mkdir);
let writeFile = promisify(fs.writeFile);
let copyFile = promisify(fs.copyFile);
let exec = promisify(child_process.exec);

let targetDir = './vendors';
let tmpDir = './vendors/tmp';
let dirToDelete = [targetDir, tmpDir];
let CJS_TO_ESM_GLOB = ['node_modules/@react-navigation/*/src/**/*.*'];

export default async function (): Promise<void> {
  del.sync(dirToDelete);

  console.log('1. fix @native-navigation from mixed esm and cjs into pure esm');
  await fixCjsToEsm();

  console.log('2. copying @react-navigation vendors files');
  await copyVendorsFiles();

  console.log('3. bundling @react-navigation');

  let entries = glob.sync(`${tmpDir}/@react-navigation/*/src/index.*`);
  let pkgs = glob.sync(`${tmpDir}/@react-navigation/*/package.json`);

  pkgs.push(process.cwd() + '/package.json');

  await esbuild.build({
    entryPoints: entries,
    bundle: true,
    platform: 'neutral',
    outdir: `${targetDir}/@react-navigation`,
    loader: {
      '.png': 'dataurl',
    },
    format: 'esm',
    target: 'esnext',
    sourcemap: true,
    plugins: [
      nodeExternalsPlugin({
        packagePath: pkgs,
      }),
    ],
  });

  del(tmpDir);
}

async function fixCjsToEsm() {
  let { files } = await cjstoesm.transform({
    input: CJS_TO_ESM_GLOB,
    outDir: tmpDir,
    write: false,
  });

  for (let { fileName, text } of files) {
    let filename = fileName
      .replace('/vendors/tmp/node_modules/', '/vendors/tmp/')
      .replace(/\.ts$|\.jsx?$/, '.tsx');

    let dir = path.dirname(filename);

    await mkdir(dir, { recursive: true });
    await writeFile(filename, text);
  }
}

async function copyVendorsFiles() {
  let files = glob.sync('node_modules/@react-navigation/**/*.*');

  for (let file of files) {
    let newFilename = file.replace(/^node_modules/, tmpDir);

    if (fs.existsSync(newFilename.replace(/\.jsx?$|\.tsx?$/, '.tsx'))) {
      continue;
    }

    if (newFilename.match('/node_modules/')) {
      continue;
    }

    let dir = path.dirname(newFilename);

    await mkdir(dir, { recursive: true });
    await copyFile(file, newFilename);
  }
}

// export async function fixPackageJson(): Promise<void> {
//   let pkgs = glob.sync('./node_modules/@react-navigation/*/package.json');

//   // the kernel may not have written all files to disk yet
//   while (pkgs.length === 0) {
//     pkgs = glob.sync('./node_modules/@react-navigation/*/package.json');

//     // sleep for 100ms and try again
//     await new Promise(resolve => {
//       setTimeout(() => {
//         resolve(null);
//       }, 100);
//     });
//   }

//   for (let pkg of pkgs) {
//     let json = JSON.parse(fs.readFileSync(pkg) as unknown as string);

//     json.module = 'src/index.js';

//     await writeFile(pkg, JSON.stringify(json, null, 2));
//   }
// }
