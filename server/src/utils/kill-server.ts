import child_process from 'child_process';
import { promisify } from 'util';

import { delay } from './index';

let exec = promisify(child_process.exec);

try {
  let pid = await exec('lsof -i:8000 -t');

  console.log('kill SIGINT', pid.stdout);
  await exec(`kill -9 ${pid.stdout}`);
} catch (e) {}

try {
  // empty loop to keep checking if process has
  // been killed before continuing
  while (await exec('lsof -i:8000 -t')) {
    await delay(10);
  }
} catch (e) {}

await delay(100);
