import lazyList from './lazy-list';

let lazyListA = lazyList<number>()
  .filter((x, idx) => {
    console.log('filter idx', idx);

    return x % 2 === 0;
  })
  .map(x => x * 10)
  .map(x => {
    console.log('value passing', x);
    return x;
  })

  .map((x, idx) => `tttt-${x}-${idx}`)
  .map((s, idx) => {
    console.log(idx, s);

    return s;
  })
  .scan<number, string>(0, (acc, input, next) => {
    setTimeout(() => {
      next(input);
    }, 5000 - acc * 10);

    return acc + 1;
  })
  .log('async')
  // .every((v, i) => {
  //   console.log('every', v, i);
  //   return v;
  // });
  .map<[number, string]>((input, index) => {
    console.log('last-map', input);
    return [index, input];
  })
  // keep state is bad but sometime needed
  // .reduce<[number, string][]>([], (acc, input, index) => {
  //   acc.push([index, input] as [number, string]);
  //   return acc;
  // })
  .collect(10)
  .log('nested array')
  .flatMap(x => x)
  .log('flatMap')
  .collect(5)
  .log('debounced');

let rm1 = lazyListA.read(v => {
  console.log('read 1', v);
});

lazyListA.read(v => {
  console.log('read 2', v.length, JSON.stringify(v));
});

setTimeout(async () => {
  console.log('*******');
  lazyListA.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

  console.log('---------------------------');

  // await new Promise(resolve => {
  //   setTimeout(resolve, 10000);
  // });
  // console.log(stA.callbacks, rm1);
  rm1();

  console.log('---------------------------');

  lazyListA.from([
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000,
    13000, 14000, 15000, 16000,
  ]);

  // stA.write2(1000);
}, 2000);
