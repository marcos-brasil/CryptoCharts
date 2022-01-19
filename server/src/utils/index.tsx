export * from '../../../shared/utils';

import { delay } from '../../../shared/utils';
import { IS_PROD } from '../constants';

export async function keepTrying<T>(
  timeout: number,
  errMsg: string,
  shouldLogError: boolean,
  cb: () => Promise<T | void>
): Promise<void | T> {
  let isDone = false;

  while (!isDone) {
    try {
      return await cb();
    } catch (err) {
      if (shouldLogError) {
        console.error(errMsg, err);
      }
      await delay(timeout);
    }
  }
}

export function range(start = 0, end = Infinity, step = 1): Iterable<number> {
  return {
    [Symbol.iterator]() {
      let nextIndex = start;
      let iterationCount = 0;

      return {
        next: function () {
          if (step === 0) {
            return { value: iterationCount, done: true };
          }

          if (nextIndex < end) {
            let result = { value: nextIndex, done: false };
            nextIndex += step;
            iterationCount++;
            return result;
          }
          return { value: iterationCount, done: true };
        },
      };
    },
  };
}

export let jsExtentionRegEx = /\.tsx|\.cts|\.cjs|\.jsx|\.js|\.ts/;

export function isRunningAsScript(filename: string): boolean {
  let scriptFilename = process.argv[1].replace(jsExtentionRegEx, '');

  if (!IS_PROD) {
    scriptFilename = scriptFilename.replace(
      process.cwd() + '/dist/',
      process.cwd() + '/src/'
    );
  } else {
    scriptFilename = scriptFilename.replace(
      process.cwd() + '/release/db/',
      process.cwd() + '/server/src/db/'
    );
  }

  console.log(filename.replace(jsExtentionRegEx, ''), scriptFilename);
  //

  // console.log(filename, process.argv[1].replace(jsExtentionRegEx, ''));

  return filename.replace(jsExtentionRegEx, '') === scriptFilename;
}
