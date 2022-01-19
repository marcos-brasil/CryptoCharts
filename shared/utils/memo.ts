// import { ref, unwrap } from './ref';

// export const shouldMemoize = ref(true);

type Fn0<S> = () => S;

export const createMemo0 =
  () =>
  <S>(xform: Fn0<S>): Fn0<S> => {
    let prevResult: S;

    let fistRun = false;

    return () => {
      if (!fistRun) {
        prevResult = xform();
        fistRun = true;
      }

      return prevResult;
    };
  };

export const memo0 = createMemo0();

export type Checker1<R> = (a: R, b: R) => boolean;
type Fn1<T, S> = (a: T) => S;

export const createMemo1 =
  <R>(check: Checker1<R>) =>
  <T extends R, S>(xform: Fn1<T, S>): Fn1<T, S> => {
    let prevArg: T;
    let prevResult: S;

    return arg => {
      if (!check(prevArg, arg)) {
        prevResult = xform(arg);
        prevArg = arg;
      }

      return prevResult;
    };
  };

export const memo1 = createMemo1((a, b) => a === b);

export type Checker2<R1, R2> = (a1: R1, a2: R2, b1: R1, b2: R2) => boolean;
type Fn2<T1, T2, S> = (a1: T1, a2: T2) => S;

export const createMemo2 =
  <R1, R2>(check: Checker2<R1, R2>) =>
  <T1 extends R1, T2 extends R2, S>(xform: Fn2<T1, T2, S>): Fn2<T1, T2, S> => {
    let prevArg1: T1;
    let prevArg2: T2;
    let prevResult: S;

    return (arg1, arg2) => {
      if (!check(prevArg1, prevArg2, arg1, arg2)) {
        prevResult = xform(arg1, arg2);
        prevArg1 = arg1;
        prevArg2 = arg2;
      }

      return prevResult;
    };
  };

export const memo2 = createMemo2((a1, a2, b1, b2) => a1 === b1 && a2 === b2);

export type Checker3<R1, R2, R3> = (
  a1: R1,
  a2: R2,
  a3: R3,
  b1: R1,
  b2: R2,
  b3: R3
) => boolean;
type Fn3<T1, T2, T3, S> = (a1: T1, a2: T2, a3: T3) => S;

export const createMemo3 =
  <R1, R2, R3>(check: Checker3<R1, R2, R3>) =>
  <T1 extends R1, T2 extends R2, T3 extends R3, S>(
    xform: Fn3<T1, T2, T3, S>
  ): Fn3<T1, T2, T3, S> => {
    let prevArg1: T1;
    let prevArg2: T2;
    let prevArg3: T3;
    let prevResult: S;

    return (arg1, arg2, arg3) => {
      if (!check(prevArg1, prevArg2, prevArg3, arg1, arg2, arg3)) {
        prevResult = xform(arg1, arg2, arg3);
        prevArg1 = arg1;
        prevArg2 = arg2;
        prevArg3 = arg3;
      }

      return prevResult;
    };
  };

export const memo3 = createMemo3(
  (a1, a2, a3, b1, b2, b3) => a1 === b1 && a2 === b2 && a3 === b3
);

export type Checker4<R1, R2, R3, R4> = (
  a1: R1,
  a2: R2,
  a3: R3,
  a4: R4,
  b1: R1,
  b2: R2,
  b3: R3,
  b4: R4
) => boolean;
type Fn4<T1, T2, T3, T4, S> = (a1: T1, a2: T2, a3: T3, a4: T4) => S;

export const createMemo4 =
  <R1, R2, R3, R4>(check: Checker4<R1, R2, R3, R4>) =>
  <T1 extends R1, T2 extends R2, T3 extends R3, T4 extends R4, S>(
    xform: Fn4<T1, T2, T3, T4, S>
  ): Fn4<T1, T2, T3, T4, S> => {
    let prevArg1: T1;
    let prevArg2: T2;
    let prevArg3: T3;
    let prevArg4: T4;
    let prevResult: S;

    return (arg1, arg2, arg3, arg4) => {
      if (
        !check(prevArg1, prevArg2, prevArg3, prevArg4, arg1, arg2, arg3, arg4)
      ) {
        prevResult = xform(arg1, arg2, arg3, arg4);
        prevArg1 = arg1;
        prevArg2 = arg2;
        prevArg3 = arg3;
        prevArg4 = arg4;
      }

      return prevResult;
    };
  };

export const memo4 = createMemo4(
  (a1, a2, a3, a4, b1, b2, b3, b4) =>
    a1 === b1 && a2 === b2 && a3 === b3 && a4 === b4
);

export type Checker5<R1, R2, R3, R4, R5> = (
  a1: R1,
  a2: R2,
  a3: R3,
  a4: R4,
  a5: R5,
  b1: R1,
  b2: R2,
  b3: R3,
  b4: R4,
  b5: R5
) => boolean;
type Fn5<T1, T2, T3, T4, T5, S> = (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => S;

export const createMemo5 =
  <R1, R2, R3, R4, R5>(check: Checker5<R1, R2, R3, R4, R5>) =>
  <
    T1 extends R1,
    T2 extends R2,
    T3 extends R3,
    T4 extends R4,
    T5 extends R5,
    S
  >(
    xform: Fn5<T1, T2, T3, T4, T5, S>
  ): Fn5<T1, T2, T3, T4, T5, S> => {
    let prevArg1: T1;
    let prevArg2: T2;
    let prevArg3: T3;
    let prevArg4: T4;
    let prevArg5: T5;
    let prevResult: S;

    return (arg1, arg2, arg3, arg4, arg5) => {
      if (
        !check(
          prevArg1,
          prevArg2,
          prevArg3,
          prevArg4,
          prevArg5,
          arg1,
          arg2,
          arg3,
          arg4,
          arg5
        )
      ) {
        prevResult = xform(arg1, arg2, arg3, arg4, arg5);
        prevArg1 = arg1;
        prevArg2 = arg2;
        prevArg3 = arg3;
        prevArg4 = arg4;
        prevArg5 = arg5;
      }

      return prevResult;
    };
  };

export const memo5 = createMemo5(
  (a1, a2, a3, a4, a5, b1, b2, b3, b4, b5) =>
    a1 === b1 && a2 === b2 && a3 === b3 && a4 === b4 && a5 === b5
);
