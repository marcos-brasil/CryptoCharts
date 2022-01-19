export default class Lifo {
  queue: (null | (() => void))[] = [];

  private timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => null);

  add(task: () => void): () => void {
    let idx = this.queue.length;
    this.queue.push(task);

    return () => {
      this.queue[idx] = null;
    };
  }

  isDone(): boolean {
    return this.queue.length === 0;
  }

  run(times: number): void {
    if (this.queue.length === 0) {
      return;
    }

    // running the queue backward
    for (let idx = this.queue.length + 1; idx >= 0; idx--) {
      if (times < 0) {
        break;
      }

      let task = this.queue.pop();
      if (task == null) {
        continue;
      }
      times--;

      task();
    }

    clearTimeout(this.timeoutId);

    // try to reset queue when idle
    // safari doesnt support requestIdleCallback
    // implementing it using setTimeout

    this.timeoutId = setTimeout(() => {
      if (this.queue.length === 0) {
        return;
      }

      for (let idx = 0; idx < this.queue.length; idx++) {
        if (this.queue[idx] != null) {
          return;
        }
      }

      this.queue = [];
    }, 100);
  }
}

// let fifo = new Fifo();

// let rm1 = fifo.add(() => {
//   console.log('lifo', 1);
// });
// let rm2 = fifo.add(() => {
//   console.log('lifo', 2);
// });
// let rm3 = fifo.add(() => {
//   console.log('lifo', 3);
// });
// let rm4 = fifo.add(() => {
//   console.log('lifo', 4);
// });
// let rm5 = fifo.add(() => {
//   console.log('lifo', 5);
// });
// let rm6 = fifo.add(() => {
//   console.log('lifo', 6);
// });
// let rm7 = fifo.add(() => {
//   console.log('lifo', 7);
// });
// let rm8 = fifo.add(() => {
//   console.log('lifo', 8);
// });
// let rm9 = fifo.add(() => {
//   console.log('lifo', 9);
// });
// let rm10 = fifo.add(() => {
//   console.log('lifo', 10);
// });
// let rm11 = fifo.add(() => {
//   console.log('lifo', 11);
// });

// setTimeout(() => {
//   fifo.run(3);
//   console.log('----');
//   fifo.run(2);
//   rm5();
//   rm6();
//   rm7();
//   console.log('----');
//   fifo.run(4);
// }, 2000);

// export class Lifo<T> {
//   emitters = {} as Record<keyof T, Array<null | ((e: T[keyof T]) => void)>>;

//   on<K extends keyof T>(key: K, listener: (val: T[K]) => void): () => void {
//     this.emitters[key] = this.emitters[key] || [];

//     let idx = this.emitters[key].length;
//     let removeListener = () => {
//       this.emitters[key][idx] = null;
//     };

//     this.emitters[key].push(listener as (e: T[keyof T]) => void);

//     return removeListener;
//   }

//   off<K extends keyof T>(key: K, listener?: (val: T[K]) => void): void {
//     if (listener != null) {
//       this.emitters[key] = this.emitters[key].filter(l => l !== listener);
//       return;
//     }

//     let emitters = {} as typeof this.emitters;

//     let keys = Object.keys(this.emitters) as K[];

//     // Recreating `this.emitters` and skiping the key to be removed
//     //    the goal is to not leak memory by leaving a event which
//     //    has been fully removed.
//     //
//     // Also avoid using the workd delete for perf purpose.
//     //    Since this can be a hot path

//     for (let k of keys) {
//       if (k === key) {
//         continue;
//       }

//       emitters[k] = this.emitters[k];
//     }

//     this.emitters = emitters;
//   }

//   once<K extends keyof T>(key: K, cb: (val: T[K]) => void): void {
//     let listener = (v: T[K]) => {
//       this.off(key, listener);
//       cb(v);
//     };

//     this.on(key, listener);
//   }

//   emit<K extends keyof T>(key: K, val: T[K]): void {
//     let emitters = this.emitters[key];

//     // no listener defined
//     if (emitters == null || emitters.length === 0) {
//       return;
//     }

//     for (let idx = 0; idx < emitters.length; idx++) {

//       emitters[idx](val);
//     }
//   }
// }
