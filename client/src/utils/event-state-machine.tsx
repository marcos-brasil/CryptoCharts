export type AsyncMsg<M> = Promise<undefined | null | M | M[]>;

export type Cmd<M> = null | M | Array<Cmd<M>> | AsyncMsg<M>;

export type Act = string | number;
export type Dispatcher<M> = (msg: M) => void;
export type Update<S, M> = (s: S, m: M) => [S, Cmd<M>];

export type StateRef<R> = { ref: R };

function ref<R>(r: R): StateRef<R> {
  return { ref: r };
}

function getRef<R>(r: StateRef<R>): R {
  return r.ref;
}

function setRef<R>(r: StateRef<R>, newRef: R): StateRef<R> {
  r.ref = newRef;
  return r;
}

const runAsyncCmd = <M extends [Act, unknown]>(
  dispatch: Dispatcher<M>,
  cmd: AsyncMsg<M>
) => {
  cmd.then(msg => {
    if (msg == null) {
      return;
    }

    if (Array.isArray(msg[0])) {
      for (let idx = 0; idx < msg.length; idx++) {
        dispatch(msg[idx] as M);
      }
    } else {
      dispatch(msg as M);
    }
  });
};

export function createStateMachine<S, M extends [Act, unknown]>(
  update: Update<S, M>,
  init: () => S
): [StateRef<S>, Dispatcher<M>] {
  let machineState = ref(init());

  let reducer = (state: S, msg: M): S => {
    let [s1, cmd] = update(state, msg);

    if (cmd == null) {
      setRef(machineState, s1);
      return s1;
    }

    if (cmd instanceof Promise) {
      runAsyncCmd(dispatch, cmd);
      setRef(machineState, s1);
      return s1;
    }

    if (Array.isArray(cmd[0])) {
      for (let idx = 0; idx < cmd.length; idx++) {
        const cmd2 = cmd[idx];

        if (cmd2 instanceof Promise) {
          runAsyncCmd(dispatch, cmd2);
        } else {
          s1 = reducer(s1, cmd[idx] as M);
        }
      }

      setRef(machineState, s1);
      return s1;
    }

    s1 = reducer(s1, cmd as M);
    setRef(machineState, s1);

    return s1;
  };

  let dispatch: Dispatcher<M> = msg => {
    reducer(getRef(machineState), msg);
  };

  return [machineState, dispatch];
  //
}

import { Immutable } from '../../../shared/utils';
{
  // tests

  const Log = 0;
  const Inc = 1;
  const IncNested = 2;
  const Dec = 3;
  const DecNested = 4;

  type Log = [typeof Log, string];
  type Inc = [typeof Inc, number];
  type Dec = [typeof Dec, number];
  type IncNested = [typeof IncNested, number];
  type DecNested = [typeof DecNested, number];

  type Msg = Log | Inc | Dec | IncNested | DecNested;

  type State = Immutable<{ counter: number }>;

  type Transition<S> = {
    [Log]: (s: S, p: string) => [S, null];
    [Inc]: (s: S, n: number) => [S, null];
    [Dec]: (s: S, n: number) => [S, null];
    [IncNested]: (s: S, n: number) => [S, Inc];
    [DecNested]: (s: S, n: number) => [S, Dec];
  };

  let transitions: Transition<State> = {
    [Log]: (s, p) => {
      console.log(p, s);
      return [s, null];
    },
    [Inc]: (s, n) => {
      return [{ ...s, count: s.counter + n }, null];
    },
    [Dec]: (s, n) => {
      return [{ ...s, counter: s.counter - n }, null];
    },
    [IncNested]: (s, n) => {
      return [{ ...s, counter: s.counter + n }, [Inc, n]];
    },
    [DecNested]: (s, n) => {
      return [{ ...s, counter: s.counter - n }, [Dec, n]];
    },
  };

  let update: Update<State, Msg> = (s, m) => {
    switch (m[0]) {
      case Log:
        return transitions[m[0]](s, m[1]);
      case Inc:
        return transitions[m[0]](s, m[1]);
      case Dec:
        return transitions[m[0]](s, m[1]);
      case IncNested:
        return transitions[m[0]](s, m[1]);
      case DecNested:
        return transitions[m[0]](s, m[1]);
    }
  };

  let init = (): State => ({ counter: 0 });

  let [stateRef, dispatcher] = createStateMachine(update, init);

  // setTimeout(() => {
  //   console.log('machine test:');

  //   dispatcher([Inc, 1]);
  //   dispatcher([Log, 'test']);
  // }, 1000);
}
