export class Emitter<T> {
  emitters = {} as Record<keyof T, Array<(e: T[keyof T]) => void>>;

  on<K extends keyof T>(key: K, listener: (val: T[K]) => void): () => void {
    this.emitters[key] = this.emitters[key] || [];

    let removeListener = () => this.off(key, listener);

    this.emitters[key].push(listener as (e: T[keyof T]) => void);

    return removeListener;
  }

  off<K extends keyof T>(key: K, listener?: (val: T[K]) => void): void {
    if (listener != null) {
      this.emitters[key] = this.emitters[key].filter(l => l !== listener);
      return;
    }

    let emitters = {} as typeof this.emitters;

    let keys = Object.keys(this.emitters) as K[];

    // Recreating `this.emitters` and skiping the key to be removed
    //    the goal is to not leak memory by leaving a event which
    //    has been fully removed.
    //
    // Also avoid using the workd delete for perf purpose.
    //    Since this can be a hot path

    for (let k of keys) {
      if (k === key) {
        continue;
      }

      emitters[k] = this.emitters[k];
    }

    this.emitters = emitters;
  }

  once<K extends keyof T>(key: K, cb: (val: T[K]) => void): void {
    let listener = (v: T[K]) => {
      this.off(key, listener);
      cb(v);
    };

    this.on(key, listener);
  }

  emit<K extends keyof T>(key: K, val: T[K]): void {
    let emitters = this.emitters[key];

    // no listener defined
    if (emitters == null || emitters.length === 0) {
      return;
    }

    for (let idx = 0; idx < emitters.length; idx++) {
      emitters[idx](val);
    }
  }

  clean() {
    this.emitters = {} as Record<keyof T, Array<(e: T[keyof T]) => void>>;
  }
}
