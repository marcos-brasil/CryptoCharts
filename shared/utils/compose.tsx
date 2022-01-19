type Fn<A, B> = (a: A) => B;
type Composed<A, B> = (a: A) => B;

export function compose<A, B, C>(fn1: Fn<A, B>, fn2: Fn<B, C>): Composed<A, C>;

export function compose<A, B, C, D>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D> | void
): Composed<A, D>;

export function compose<A, B, C, D, E>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D> | void,
  fn4: Fn<D, E> | void
): Composed<A, E>;

export function compose<A, B, C, D, E, F>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D> | void,
  fn4: Fn<D, E> | void,
  fn5: Fn<E, F> | void
): Composed<A, F>;

export function compose<A, B, C, D, E, F, G>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D> | void,
  fn4: Fn<D, E> | void,
  fn5: Fn<E, F> | void,
  fn6: Fn<F, G> | void
): Composed<A, G>;

export function compose<A, B, C, D, E, F, G, H>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D> | void,
  fn4: Fn<D, E> | void,
  fn5: Fn<E, F> | void,
  fn6: Fn<F, G> | void,
  fn7: Fn<G, H> | void
): Composed<A, H>;

export function compose<A, B, C, D, E, F, G, H, I>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D> | void,
  fn4: Fn<D, E> | void,
  fn5: Fn<E, F> | void,
  fn6: Fn<F, G> | void,
  fn7: Fn<G, H> | void,
  fn8: Fn<H, I> | void
): Composed<A, I>;

export function compose<A, B, C, D, E, F, G, H, I, J>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D> | void,
  fn4: Fn<D, E> | void,
  fn5: Fn<E, F> | void,
  fn6: Fn<F, G> | void,
  fn7: Fn<G, H> | void,
  fn8: Fn<H, I> | void,
  fn9: Fn<I, J> | void
): Composed<A, J>;

export function compose<A, B, C, D, E, F, G, H, I, J, K>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D> | void,
  fn4: Fn<D, E> | void,
  fn5: Fn<E, F> | void,
  fn6: Fn<F, G> | void,
  fn7: Fn<G, H> | void,
  fn8: Fn<H, I> | void,
  fn9: Fn<I, J> | void,
  fn10: Fn<J, K> | void
): Composed<A, K> {
  return (val: A): K => {
    if (fn3 == null) {
      return fn2(fn1(val)) as unknown as K;
    }

    if (fn4 == null) {
      return fn3(fn2(fn1(val))) as unknown as K;
    }

    if (fn5 == null) {
      return fn4(fn3(fn2(fn1(val)))) as unknown as K;
    }

    if (fn6 == null) {
      return fn5(fn4(fn3(fn2(fn1(val))))) as unknown as K;
    }

    if (fn7 == null) {
      return fn6(fn5(fn4(fn3(fn2(fn1(val)))))) as unknown as K;
    }

    if (fn8 == null) {
      return fn7(fn6(fn5(fn4(fn3(fn2(fn1(val))))))) as unknown as K;
    }

    if (fn9 == null) {
      return fn8(fn7(fn6(fn5(fn4(fn3(fn2(fn1(val)))))))) as unknown as K;
    }

    if (fn10 == null) {
      return fn9(fn8(fn7(fn6(fn5(fn4(fn3(fn2(fn1(val))))))))) as unknown as K;
    }

    return fn10(fn9(fn8(fn7(fn6(fn5(fn4(fn3(fn2(fn1(val))))))))));
  };
}

type AsyncFn<A, B> = (a: A) => Promise<B>;
type AsyncComposed<A, B> = (a: A) => Promise<B>;

export function asyncCompose<A, B, C>(
  fn1: AsyncFn<A, B>,
  fn2: AsyncFn<B, C>
): AsyncComposed<A, C>;

export function asyncCompose<A, B, C, D>(
  fn1: AsyncFn<A, B>,
  fn2: AsyncFn<B, C>,
  fn3: AsyncFn<C, D> | void
): AsyncComposed<A, D>;

export function asyncCompose<A, B, C, D, E>(
  fn1: AsyncFn<A, B>,
  fn2: AsyncFn<B, C>,
  fn3: AsyncFn<C, D> | void,
  fn4: AsyncFn<D, E> | void
): AsyncComposed<A, E>;

export function asyncCompose<A, B, C, D, E, F>(
  fn1: AsyncFn<A, B>,
  fn2: AsyncFn<B, C>,
  fn3: AsyncFn<C, D> | void,
  fn4: AsyncFn<D, E> | void,
  fn5: AsyncFn<E, F> | void
): AsyncComposed<A, F>;

export function asyncCompose<A, B, C, D, E, F, G>(
  fn1: AsyncFn<A, B>,
  fn2: AsyncFn<B, C>,
  fn3: AsyncFn<C, D> | void,
  fn4: AsyncFn<D, E> | void,
  fn5: AsyncFn<E, F> | void,
  fn6: AsyncFn<F, G> | void
): AsyncComposed<A, G>;

export function asyncCompose<A, B, C, D, E, F, G, H>(
  fn1: AsyncFn<A, B>,
  fn2: AsyncFn<B, C>,
  fn3: AsyncFn<C, D> | void,
  fn4: AsyncFn<D, E> | void,
  fn5: AsyncFn<E, F> | void,
  fn6: AsyncFn<F, G> | void,
  fn7: AsyncFn<G, H> | void
): AsyncComposed<A, H>;

export function asyncCompose<A, B, C, D, E, F, G, H, I>(
  fn1: AsyncFn<A, B>,
  fn2: AsyncFn<B, C>,
  fn3: AsyncFn<C, D> | void,
  fn4: AsyncFn<D, E> | void,
  fn5: AsyncFn<E, F> | void,
  fn6: AsyncFn<F, G> | void,
  fn7: AsyncFn<G, H> | void,
  fn8: AsyncFn<H, I> | void
): AsyncComposed<A, I>;

export function asyncCompose<A, B, C, D, E, F, G, H, I, J>(
  fn1: AsyncFn<A, B>,
  fn2: AsyncFn<B, C>,
  fn3: AsyncFn<C, D> | void,
  fn4: AsyncFn<D, E> | void,
  fn5: AsyncFn<E, F> | void,
  fn6: AsyncFn<F, G> | void,
  fn7: AsyncFn<G, H> | void,
  fn8: AsyncFn<H, I> | void,
  fn9: AsyncFn<I, J> | void
): AsyncComposed<A, J>;

export function asyncCompose<A, B, C, D, E, F, G, H, I, J, K>(
  fn1: AsyncFn<A, B>,
  fn2: AsyncFn<B, C>,
  fn3: AsyncFn<C, D> | void,
  fn4: AsyncFn<D, E> | void,
  fn5: AsyncFn<E, F> | void,
  fn6: AsyncFn<F, G> | void,
  fn7: AsyncFn<G, H> | void,
  fn8: AsyncFn<H, I> | void,
  fn9: AsyncFn<I, J> | void,
  fn10: AsyncFn<J, K> | void
): AsyncComposed<A, K> {
  return async (val: A): Promise<K> => {
    if (fn3 == null) {
      return (await fn2(await fn1(val))) as unknown as K;
    }

    if (fn4 == null) {
      return (await fn3(await fn2(await fn1(val)))) as unknown as K;
    }

    if (fn5 == null) {
      return (await fn4(await fn3(await fn2(await fn1(val))))) as unknown as K;
    }

    if (fn6 == null) {
      return (await fn5(
        await fn4(await fn3(await fn2(await fn1(val))))
      )) as unknown as K;
    }

    if (fn7 == null) {
      return (await fn6(
        await fn5(await fn4(await fn3(await fn2(await fn1(val)))))
      )) as unknown as K;
    }

    if (fn8 == null) {
      return (await fn7(
        await fn6(await fn5(await fn4(await fn3(await fn2(await fn1(val))))))
      )) as unknown as K;
    }

    if (fn9 == null) {
      return (await fn8(
        await fn7(
          await fn6(await fn5(await fn4(await fn3(await fn2(await fn1(val))))))
        )
      )) as unknown as K;
    }

    if (fn10 == null) {
      return (await fn9(
        await fn8(
          await fn7(
            await fn6(
              await fn5(await fn4(await fn3(await fn2(await fn1(val)))))
            )
          )
        )
      )) as unknown as K;
    }

    return await fn10(
      await fn9(
        await fn8(
          await fn7(
            await fn6(
              await fn5(await fn4(await fn3(await fn2(await fn1(val)))))
            )
          )
        )
      )
    );
  };
}
