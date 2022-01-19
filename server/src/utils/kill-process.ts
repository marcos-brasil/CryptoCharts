import child_process from 'child_process';
import { promisify } from 'util';
import path from 'path';

import { delay, jsExtentionRegEx } from './index';

let exec = promisify(child_process.exec);

let processName = path.basename(process.argv[1].replace(jsExtentionRegEx, ''));

try {
  let pids = (
    await exec(
      `ps -e | grep ${processName}| grep -vE "npm|chokidar|grep" | cut -d' ' -f1`
    )
  ).stdout.split('\n');

  let pidsToKill = pids.filter(p => p !== String(process.pid));
  // console.log(process.pid, a.split('\n'));
  await Promise.all(
    pidsToKill.map(async pid => {
      if (pid === '') {
        return;
      }
      try {
        console.log('kill -9', pid);
        await exec(`kill -9 ${pid}`);
      } catch (e) {}
    })
  );
  // await exec(`kill -9 ${pid.stdout}`);
} catch (e) {
  // console.log('EEE', e);
}
//
try {
  // empty loop to keep checking if process has
  // been killed before continuing
  while (await exec('lsof -i:8000 -t')) {
    await delay(10);
  }
} catch (e) {}

await delay(100);
