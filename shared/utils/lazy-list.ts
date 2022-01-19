type Next<V> = (v: V) => void;
type Fn<A, B> = (input: A, next: Next<B>) => void;

function pipeline<A, B, C>(fn1: Fn<A, B>, fn2: Fn<B, C>): Fn<A, C> {
  return (a: A, next: Next<C>) => {
    let fn1Next = (b: B) => fn2(b, next);
    fn1(a, fn1Next);
  };
}

type XFormMap<I, O> = (input: I, index: number) => O;
type XFormReduce<A, I> = (acc: A, input: I, index: number) => A;
type XFormScan<A, I, O> = (acc: A, input: I, n: (v: O) => void) => A;

class LazyList<I, O> {
  private callbacks: ((input: O) => void)[] = [];

  private pipeline: Fn<I, O> = (x, n) => n(x as unknown as O);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private add<V>(xf: Fn<any, V>): LazyList<I, V> {
    let st = new LazyList<I, V>();

    st.pipeline = pipeline(this.pipeline, xf);
    return st;
  }

  read(cb: (input: O) => void): () => void {
    this.callbacks.push(cb);

    return () => {
      this.callbacks = this.callbacks.filter(c => c !== cb);
    };
  }

  write(input: I) {
    this.pipeline(input, x => {
      for (let cb of this.callbacks) {
        cb(x);
      }
    });
  }

  from(iter: Iterable<I>): void {
    for (let v of iter) {
      this.write(v);
    }
  }

  scan<A, V>(acc: A, xf: XFormScan<A, O, V>): LazyList<I, V> {
    return this.add((v: O, next) => {
      acc = xf(acc, v, next);
    });
  }

  pipe<V>(xf: (input: O, n: (v: V) => void) => void): LazyList<I, V> {
    return this.add((v: O, next) => {
      xf(v, next);
    });
  }

  map<V>(xf: XFormMap<O, V>): LazyList<I, V> {
    let index = 0;

    return this.pipe<V>((input, next) => {
      next(xf(input, index));
      index++;
    });
  }

  flatMap<V>(xf: XFormMap<O, V[]>): LazyList<I, V> {
    let index = 0;
    return this.pipe<V>((input, next) => {
      let list = xf(input, index);

      for (let item of list) {
        next(item);
      }

      index++;
    });
  }

  every(xf: XFormMap<O, void>): LazyList<I, void> {
    let index = 0;

    return this.pipe<void>((input, _next) => {
      xf(input, index);
      index++;
    });
  }

  reduce<A>(acc: A, xf: XFormReduce<A, O>): LazyList<I, A> {
    let index = 0;

    return this.scan<A, A>(acc, (_acc, input, next) => {
      next(xf(_acc, input, index));
      index++;
      return _acc;
    });
  }

  filter(xf: XFormMap<I, boolean>): LazyList<I, I> {
    let index = 0;

    return this.pipe<I>((input, next) => {
      let b = xf(input as unknown as I, index);
      index++;

      if (b) {
        next(input as unknown as I);
      }
    });
  }

  log(msg: string) {
    return this.map((v, i) => {
      console.log(msg, i, v);
      return v;
    });
  }

  collect(num: number): LazyList<I, O[]> {
    let acc: O[] = [];

    return this.pipe((input, next) => {
      if (acc.length === num) {
        next(acc);
        acc = [];
      }

      acc.push(input);
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function lazyList<I>(): LazyList<I, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let st = new LazyList<I, any>();
  return st;
}
