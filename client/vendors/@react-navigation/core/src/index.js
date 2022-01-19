// vendors/tmp/@react-navigation/core/src/BaseNavigationContainer.tsx
import { CommonActions as CommonActions2 } from "@react-navigation/routers";
import {
  createElement as createElement2,
  forwardRef,
  useCallback as useCallback6,
  useContext as useContext3,
  useEffect as useEffect5,
  useImperativeHandle,
  useMemo as useMemo3,
  useRef as useRef7
} from "react";

// vendors/tmp/@react-navigation/core/src/checkDuplicateRouteNames.tsx
function checkDuplicateRouteNames(state) {
  const duplicates = [];
  const getRouteNames = (location, state2) => {
    state2.routes.forEach((route) => {
      const currentLocation = location ? `${location} > ${route.name}` : route.name;
      route.state?.routeNames?.forEach((routeName) => {
        if (routeName === route.name) {
          duplicates.push([
            currentLocation,
            `${currentLocation} > ${route.name}`
          ]);
        }
      });
      if (route.state) {
        getRouteNames(currentLocation, route.state);
      }
    });
  };
  getRouteNames("", state);
  return duplicates;
}

// vendors/tmp/@react-navigation/core/src/checkSerializable.tsx
var checkSerializableWithoutCircularReference = (o, seen, location) => {
  if (o === void 0 || o === null || typeof o === "boolean" || typeof o === "number" || typeof o === "string") {
    return { serializable: true };
  }
  if (Object.prototype.toString.call(o) !== "[object Object]" && !Array.isArray(o)) {
    return {
      serializable: false,
      location,
      reason: typeof o === "function" ? "Function" : String(o)
    };
  }
  if (seen.has(o)) {
    return {
      serializable: false,
      reason: "Circular reference",
      location
    };
  }
  seen.add(o);
  if (Array.isArray(o)) {
    for (let i = 0; i < o.length; i++) {
      const childResult = checkSerializableWithoutCircularReference(o[i], new Set(seen), [...location, i]);
      if (!childResult.serializable) {
        return childResult;
      }
    }
  } else {
    for (const key in o) {
      const childResult = checkSerializableWithoutCircularReference(o[key], new Set(seen), [...location, key]);
      if (!childResult.serializable) {
        return childResult;
      }
    }
  }
  return { serializable: true };
};
function checkSerializable(o) {
  return checkSerializableWithoutCircularReference(o, new Set(), []);
}

// vendors/tmp/@react-navigation/core/src/createNavigationContainerRef.tsx
import { CommonActions } from "@react-navigation/routers";
var NOT_INITIALIZED_ERROR = "The 'navigation' object hasn't been initialized yet. This might happen if you don't have a navigator mounted, or if the navigator hasn't finished mounting. See https://reactnavigation.org/docs/navigating-without-navigation-prop#handling-initialization for more details.";
function createNavigationContainerRef() {
  const methods = [
    ...Object.keys(CommonActions),
    "addListener",
    "removeListener",
    "resetRoot",
    "dispatch",
    "isFocused",
    "canGoBack",
    "getRootState",
    "getState",
    "getParent",
    "getCurrentRoute",
    "getCurrentOptions"
  ];
  const listeners = {};
  const removeListener = (event, callback) => {
    listeners[event] = listeners[event]?.filter((cb) => cb !== callback);
  };
  let current = null;
  const ref = {
    get current() {
      return current;
    },
    set current(value) {
      current = value;
      if (value != null) {
        Object.entries(listeners).forEach(([event, callbacks]) => {
          callbacks.forEach((callback) => {
            value.addListener(event, callback);
          });
        });
      }
    },
    isReady: () => {
      if (current == null) {
        return false;
      }
      return current.isReady();
    },
    ...methods.reduce((acc, name) => {
      acc[name] = (...args) => {
        if (current == null) {
          switch (name) {
            case "addListener": {
              const [event, callback] = args;
              listeners[event] = listeners[event] || [];
              listeners[event].push(callback);
              return () => removeListener(event, callback);
            }
            case "removeListener": {
              const [event, callback] = args;
              removeListener(event, callback);
              break;
            }
            default:
              console.error(NOT_INITIALIZED_ERROR);
          }
        } else {
          return current[name](...args);
        }
      };
      return acc;
    }, {})
  };
  return ref;
}

// vendors/tmp/@react-navigation/core/src/EnsureSingleNavigator.tsx
import {
  createContext,
  createElement,
  useMemo,
  useRef
} from "react";
var MULTIPLE_NAVIGATOR_ERROR = `Another navigator is already registered for this container. You likely have multiple navigators under a single "NavigationContainer" or "Screen". Make sure each navigator is under a separate "Screen" container. See https://reactnavigation.org/docs/nesting-navigators for a guide on nesting.`;
var SingleNavigatorContext = createContext(void 0);
function EnsureSingleNavigator({ children }) {
  const navigatorKeyRef = useRef();
  const value = useMemo(() => ({
    register(key) {
      const currentKey = navigatorKeyRef.current;
      if (currentKey !== void 0 && key !== currentKey) {
        throw new Error(MULTIPLE_NAVIGATOR_ERROR);
      }
      navigatorKeyRef.current = key;
    },
    unregister(key) {
      const currentKey = navigatorKeyRef.current;
      if (key !== currentKey) {
        return;
      }
      navigatorKeyRef.current = void 0;
    }
  }), []);
  return /* @__PURE__ */ createElement(SingleNavigatorContext.Provider, {
    value
  }, children);
}

// vendors/tmp/@react-navigation/core/src/findFocusedRoute.tsx
function findFocusedRoute(state) {
  let current = state;
  while (current?.routes[current.index ?? 0].state != null) {
    current = current.routes[current.index ?? 0].state;
  }
  const route = current?.routes[current?.index ?? 0];
  return route;
}

// vendors/tmp/@react-navigation/core/src/NavigationBuilderContext.tsx
import {
  createContext as createContext2
} from "react";
var NavigationBuilderContext = createContext2({
  onDispatchAction: () => void 0,
  onOptionsChange: () => void 0
});
var NavigationBuilderContext_default = NavigationBuilderContext;

// vendors/tmp/@react-navigation/core/src/NavigationContainerRefContext.tsx
import {
  createContext as createContext3
} from "react";
var NavigationContainerRefContext = createContext3(void 0);
var NavigationContainerRefContext_default = NavigationContainerRefContext;

// vendors/tmp/@react-navigation/core/src/NavigationContext.tsx
import {
  createContext as createContext4
} from "react";
var NavigationContext = createContext4(void 0);
var NavigationContext_default = NavigationContext;

// vendors/tmp/@react-navigation/core/src/NavigationRouteContext.tsx
import {
  createContext as createContext5
} from "react";
var NavigationRouteContext = createContext5(void 0);
var NavigationRouteContext_default = NavigationRouteContext;

// vendors/tmp/@react-navigation/core/src/NavigationStateContext.tsx
import {
  createContext as createContext6
} from "react";
var MISSING_CONTEXT_ERROR = "Couldn't find a navigation context. Have you wrapped your app with 'NavigationContainer'? See https://reactnavigation.org/docs/getting-started for setup instructions.";
var NavigationStateContext_default = createContext6({
  isDefault: true,
  get getKey() {
    throw new Error(MISSING_CONTEXT_ERROR);
  },
  get setKey() {
    throw new Error(MISSING_CONTEXT_ERROR);
  },
  get getState() {
    throw new Error(MISSING_CONTEXT_ERROR);
  },
  get setState() {
    throw new Error(MISSING_CONTEXT_ERROR);
  },
  get getIsInitial() {
    throw new Error(MISSING_CONTEXT_ERROR);
  }
});

// vendors/tmp/@react-navigation/core/src/UnhandledActionContext.tsx
import {
  createContext as createContext7
} from "react";
var UnhandledActionContext = createContext7(void 0);
var UnhandledActionContext_default = UnhandledActionContext;

// vendors/tmp/@react-navigation/core/src/useChildListeners.tsx
import {
  useCallback,
  useRef as useRef2
} from "react";
function useChildListeners() {
  const { current: listeners } = useRef2({
    action: [],
    focus: []
  });
  const addListener = useCallback((type, listener) => {
    listeners[type].push(listener);
    return () => {
      const index = listeners[type].indexOf(listener);
      listeners[type].splice(index, 1);
    };
  }, [listeners]);
  return {
    listeners,
    addListener
  };
}

// vendors/tmp/@react-navigation/core/src/useEventEmitter.tsx
import {
  useCallback as useCallback2,
  useEffect,
  useMemo as useMemo2,
  useRef as useRef3
} from "react";
function useEventEmitter(listen) {
  const listenRef = useRef3(listen);
  useEffect(() => {
    listenRef.current = listen;
  });
  const listeners = useRef3({});
  const create = useCallback2((target) => {
    const removeListener = (type, callback) => {
      const callbacks = listeners.current[type] ? listeners.current[type][target] : void 0;
      if (!callbacks) {
        return;
      }
      const index = callbacks.indexOf(callback);
      callbacks.splice(index, 1);
    };
    const addListener = (type, callback) => {
      listeners.current[type] = listeners.current[type] || {};
      listeners.current[type][target] = listeners.current[type][target] || [];
      listeners.current[type][target].push(callback);
      return () => removeListener(type, callback);
    };
    return {
      addListener,
      removeListener
    };
  }, []);
  const emit = useCallback2(({ type, data, target, canPreventDefault }) => {
    const items = listeners.current[type] || {};
    const callbacks = target !== void 0 ? items[target]?.slice() : [].concat(...Object.keys(items).map((t) => items[t])).filter((cb, i, self) => self.lastIndexOf(cb) === i);
    const event = {
      get type() {
        return type;
      }
    };
    if (target !== void 0) {
      Object.defineProperty(event, "target", {
        enumerable: true,
        get() {
          return target;
        }
      });
    }
    if (data !== void 0) {
      Object.defineProperty(event, "data", {
        enumerable: true,
        get() {
          return data;
        }
      });
    }
    if (canPreventDefault) {
      let defaultPrevented = false;
      Object.defineProperties(event, {
        defaultPrevented: {
          enumerable: true,
          get() {
            return defaultPrevented;
          }
        },
        preventDefault: {
          enumerable: true,
          value() {
            defaultPrevented = true;
          }
        }
      });
    }
    listenRef.current?.(event);
    callbacks?.forEach((cb) => cb(event));
    return event;
  }, []);
  return useMemo2(() => ({ create, emit }), [create, emit]);
}

// vendors/tmp/@react-navigation/core/src/useKeyedChildListeners.tsx
import {
  useCallback as useCallback3,
  useRef as useRef4
} from "react";
function useKeyedChildListeners() {
  const { current: keyedListeners } = useRef4({
    getState: {},
    beforeRemove: {}
  });
  const addKeyedListener = useCallback3((type, key, listener) => {
    keyedListeners[type][key] = listener;
    return () => {
      keyedListeners[type][key] = void 0;
    };
  }, [keyedListeners]);
  return {
    keyedListeners,
    addKeyedListener
  };
}

// vendors/tmp/@react-navigation/core/src/useOptionsGetters.tsx
import {
  useCallback as useCallback4,
  useContext,
  useEffect as useEffect2,
  useRef as useRef5
} from "react";
function useOptionsGetters({ key, options, navigation }) {
  const optionsRef = useRef5(options);
  const optionsGettersFromChildRef = useRef5({});
  const { onOptionsChange } = useContext(NavigationBuilderContext_default);
  const { addOptionsGetter: parentAddOptionsGetter } = useContext(NavigationStateContext_default);
  const optionsChangeListener = useCallback4(() => {
    const isFocused = navigation?.isFocused() ?? true;
    const hasChildren = Object.keys(optionsGettersFromChildRef.current).length;
    if (isFocused && !hasChildren) {
      onOptionsChange(optionsRef.current ?? {});
    }
  }, [navigation, onOptionsChange]);
  useEffect2(() => {
    optionsRef.current = options;
    optionsChangeListener();
    return navigation?.addListener("focus", optionsChangeListener);
  }, [navigation, options, optionsChangeListener]);
  const getOptionsFromListener = useCallback4(() => {
    for (let key2 in optionsGettersFromChildRef.current) {
      if (optionsGettersFromChildRef.current.hasOwnProperty(key2)) {
        const result = optionsGettersFromChildRef.current[key2]?.();
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }, []);
  const getCurrentOptions = useCallback4(() => {
    const isFocused = navigation?.isFocused() ?? true;
    if (!isFocused) {
      return null;
    }
    const optionsFromListener = getOptionsFromListener();
    if (optionsFromListener !== null) {
      return optionsFromListener;
    }
    return optionsRef.current;
  }, [navigation, getOptionsFromListener]);
  useEffect2(() => {
    return parentAddOptionsGetter?.(key, getCurrentOptions);
  }, [getCurrentOptions, parentAddOptionsGetter, key]);
  const addOptionsGetter = useCallback4((key2, getter) => {
    optionsGettersFromChildRef.current[key2] = getter;
    optionsChangeListener();
    return () => {
      delete optionsGettersFromChildRef.current[key2];
      optionsChangeListener();
    };
  }, [optionsChangeListener]);
  return {
    addOptionsGetter,
    getCurrentOptions
  };
}

// vendors/tmp/@react-navigation/core/src/useScheduleUpdate.tsx
import {
  createContext as createContext8,
  useContext as useContext2,
  useEffect as useEffect3
} from "react";
var MISSING_CONTEXT_ERROR2 = "Couldn't find a schedule context.";
var ScheduleUpdateContext = createContext8({
  scheduleUpdate() {
    throw new Error(MISSING_CONTEXT_ERROR2);
  },
  flushUpdates() {
    throw new Error(MISSING_CONTEXT_ERROR2);
  }
});
function useScheduleUpdate(callback) {
  const { scheduleUpdate, flushUpdates } = useContext2(ScheduleUpdateContext);
  scheduleUpdate(callback);
  useEffect3(flushUpdates);
}

// vendors/tmp/@react-navigation/core/src/useSyncState.tsx
import {
  useCallback as useCallback5,
  useDebugValue,
  useEffect as useEffect4,
  useRef as useRef6,
  useState
} from "react";
var UNINTIALIZED_STATE = {};
function useSyncState(initialState) {
  const stateRef = useRef6(UNINTIALIZED_STATE);
  const isSchedulingRef = useRef6(false);
  const isMountedRef = useRef6(true);
  useEffect4(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  if (stateRef.current === UNINTIALIZED_STATE) {
    stateRef.current = typeof initialState === "function" ? initialState() : initialState;
  }
  const [trackingState, setTrackingState] = useState(stateRef.current);
  const getState = useCallback5(() => stateRef.current, []);
  const setState = useCallback5((state2) => {
    if (state2 === stateRef.current || !isMountedRef.current) {
      return;
    }
    stateRef.current = state2;
    if (!isSchedulingRef.current) {
      setTrackingState(state2);
    }
  }, []);
  const scheduleUpdate = useCallback5((callback) => {
    isSchedulingRef.current = true;
    try {
      callback();
    } finally {
      isSchedulingRef.current = false;
    }
  }, []);
  const flushUpdates = useCallback5(() => {
    if (!isMountedRef.current) {
      return;
    }
    setTrackingState(stateRef.current);
  }, []);
  if (trackingState !== stateRef.current) {
    setTrackingState(stateRef.current);
  }
  const state = stateRef.current;
  useDebugValue(state);
  return [state, getState, setState, scheduleUpdate, flushUpdates];
}

// vendors/tmp/@react-navigation/core/src/BaseNavigationContainer.tsx
var serializableWarnings = [];
var duplicateNameWarnings = [];
var getPartialState = (state) => {
  if (state === void 0) {
    return;
  }
  const { key, routeNames, ...partialState } = state;
  return {
    ...partialState,
    stale: true,
    routes: state.routes.map((route) => {
      if (route.state === void 0) {
        return route;
      }
      return { ...route, state: getPartialState(route.state) };
    })
  };
};
var BaseNavigationContainer = forwardRef(function BaseNavigationContainer2({ initialState, onStateChange, onUnhandledAction, independent, children }, ref) {
  const parent = useContext3(NavigationStateContext_default);
  if (!parent.isDefault && !independent) {
    throw new Error("Looks like you have nested a 'NavigationContainer' inside another. Normally you need only one container at the root of the app, so this was probably an error. If this was intentional, pass 'independent={true}' explicitly. Note that this will make the child navigators disconnected from the parent and you won't be able to navigate between them.");
  }
  const [state, getState, setState, scheduleUpdate, flushUpdates] = useSyncState(() => getPartialState(initialState == null ? void 0 : initialState));
  const isFirstMountRef = useRef7(true);
  const navigatorKeyRef = useRef7();
  const getKey = useCallback6(() => navigatorKeyRef.current, []);
  const setKey = useCallback6((key) => {
    navigatorKeyRef.current = key;
  }, []);
  const { listeners, addListener } = useChildListeners();
  const { keyedListeners, addKeyedListener } = useKeyedChildListeners();
  const dispatch = useCallback6((action) => {
    if (listeners.focus[0] == null) {
      console.error(NOT_INITIALIZED_ERROR);
    } else {
      listeners.focus[0]((navigation2) => navigation2.dispatch(action));
    }
  }, [listeners.focus]);
  const canGoBack = useCallback6(() => {
    if (listeners.focus[0] == null) {
      return false;
    }
    const { result, handled } = listeners.focus[0]((navigation2) => navigation2.canGoBack());
    if (handled) {
      return result;
    } else {
      return false;
    }
  }, [listeners.focus]);
  const resetRoot = useCallback6((state2) => {
    const target = state2?.key ?? keyedListeners.getState.root?.().key;
    if (target == null) {
      console.error(NOT_INITIALIZED_ERROR);
    } else {
      listeners.focus[0]((navigation2) => navigation2.dispatch({
        ...CommonActions2.reset(state2),
        target
      }));
    }
  }, [keyedListeners.getState, listeners.focus]);
  const getRootState = useCallback6(() => {
    return keyedListeners.getState.root?.();
  }, [keyedListeners.getState]);
  const getCurrentRoute = useCallback6(() => {
    const state2 = getRootState();
    if (state2 == null) {
      return void 0;
    }
    const route = findFocusedRoute(state2);
    return route;
  }, [getRootState]);
  const emitter = useEventEmitter();
  const { addOptionsGetter, getCurrentOptions } = useOptionsGetters({});
  const navigation = useMemo3(() => ({
    ...Object.keys(CommonActions2).reduce((acc, name) => {
      acc[name] = (...args) => dispatch(CommonActions2[name](...args));
      return acc;
    }, {}),
    ...emitter.create("root"),
    dispatch,
    resetRoot,
    isFocused: () => true,
    canGoBack,
    getParent: () => void 0,
    getState: () => stateRef.current,
    getRootState,
    getCurrentRoute,
    getCurrentOptions,
    isReady: () => listeners.focus[0] != null
  }), [
    canGoBack,
    dispatch,
    emitter,
    getCurrentOptions,
    getCurrentRoute,
    getRootState,
    listeners.focus,
    resetRoot
  ]);
  useImperativeHandle(ref, () => navigation, [navigation]);
  const onDispatchAction = useCallback6((action, noop) => {
    emitter.emit({
      type: "__unsafe_action__",
      data: { action, noop, stack: stackRef.current }
    });
  }, [emitter]);
  const lastEmittedOptionsRef = useRef7();
  const onOptionsChange = useCallback6((options) => {
    if (lastEmittedOptionsRef.current === options) {
      return;
    }
    lastEmittedOptionsRef.current = options;
    emitter.emit({
      type: "options",
      data: { options }
    });
  }, [emitter]);
  const stackRef = useRef7();
  const builderContext = useMemo3(() => ({
    addListener,
    addKeyedListener,
    onDispatchAction,
    onOptionsChange,
    stackRef
  }), [addListener, addKeyedListener, onDispatchAction, onOptionsChange]);
  const scheduleContext = useMemo3(() => ({ scheduleUpdate, flushUpdates }), [scheduleUpdate, flushUpdates]);
  const isInitialRef = useRef7(true);
  const getIsInitial = useCallback6(() => isInitialRef.current, []);
  const context = useMemo3(() => ({
    state,
    getState,
    setState,
    getKey,
    setKey,
    getIsInitial,
    addOptionsGetter
  }), [
    state,
    getState,
    setState,
    getKey,
    setKey,
    getIsInitial,
    addOptionsGetter
  ]);
  const onStateChangeRef = useRef7(onStateChange);
  const stateRef = useRef7(state);
  useEffect5(() => {
    isInitialRef.current = false;
    onStateChangeRef.current = onStateChange;
    stateRef.current = state;
  });
  useEffect5(() => {
    const hydratedState = getRootState();
    if (process.env.NODE_ENV !== "production") {
      if (hydratedState !== void 0) {
        const serializableResult = checkSerializable(hydratedState);
        if (!serializableResult.serializable) {
          const { location, reason } = serializableResult;
          let path = "";
          let pointer = hydratedState;
          let params = false;
          for (let i = 0; i < location.length; i++) {
            const curr = location[i];
            const prev = location[i - 1];
            pointer = pointer[curr];
            if (!params && curr === "state") {
              continue;
            } else if (!params && curr === "routes") {
              if (path) {
                path += " > ";
              }
            } else if (!params && typeof curr === "number" && prev === "routes") {
              path += pointer?.name;
            } else if (!params) {
              path += ` > ${curr}`;
              params = true;
            } else {
              if (typeof curr === "number" || /^[0-9]+$/.test(curr)) {
                path += `[${curr}]`;
              } else if (/^[a-z$_]+$/i.test(curr)) {
                path += `.${curr}`;
              } else {
                path += `[${JSON.stringify(curr)}]`;
              }
            }
          }
          const message = `Non-serializable values were found in the navigation state. Check:

${path} (${reason})

This can break usage such as persisting and restoring state. This might happen if you passed non-serializable values such as function, class instances etc. in params. If you need to use components with callbacks in your options, you can use 'navigation.setOptions' instead. See https://reactnavigation.org/docs/troubleshooting#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state for more details.`;
          if (!serializableWarnings.includes(message)) {
            serializableWarnings.push(message);
            console.warn(message);
          }
        }
        const duplicateRouteNamesResult = checkDuplicateRouteNames(hydratedState);
        if (duplicateRouteNamesResult.length) {
          const message = `Found screens with the same name nested inside one another. Check:
${duplicateRouteNamesResult.map((locations) => `
${locations.join(", ")}`)}

This can cause confusing behavior during navigation. Consider using unique names for each screen instead.`;
          if (!duplicateNameWarnings.includes(message)) {
            duplicateNameWarnings.push(message);
            console.warn(message);
          }
        }
      }
    }
    emitter.emit({ type: "state", data: { state } });
    if (!isFirstMountRef.current && onStateChangeRef.current) {
      onStateChangeRef.current(hydratedState);
    }
    isFirstMountRef.current = false;
  }, [getRootState, emitter, state]);
  const defaultOnUnhandledAction = useCallback6((action) => {
    if (process.env.NODE_ENV === "production") {
      return;
    }
    const payload = action.payload;
    let message = `The action '${action.type}'${payload ? ` with payload ${JSON.stringify(action.payload)}` : ""} was not handled by any navigator.`;
    switch (action.type) {
      case "NAVIGATE":
      case "PUSH":
      case "REPLACE":
      case "JUMP_TO":
        if (payload?.name) {
          message += `

Do you have a screen named '${payload.name}'?

If you're trying to navigate to a screen in a nested navigator, see https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator.`;
        } else {
          message += `

You need to pass the name of the screen to navigate to.

See https://reactnavigation.org/docs/navigation-actions for usage.`;
        }
        break;
      case "GO_BACK":
      case "POP":
      case "POP_TO_TOP":
        message += `

Is there any screen to go back to?`;
        break;
      case "OPEN_DRAWER":
      case "CLOSE_DRAWER":
      case "TOGGLE_DRAWER":
        message += `

Is your screen inside a Drawer navigator?`;
        break;
    }
    message += `

This is a development-only warning and won't be shown in production.`;
    console.error(message);
  }, []);
  let element = /* @__PURE__ */ createElement2(NavigationContainerRefContext_default.Provider, {
    value: navigation
  }, /* @__PURE__ */ createElement2(ScheduleUpdateContext.Provider, {
    value: scheduleContext
  }, /* @__PURE__ */ createElement2(NavigationBuilderContext_default.Provider, {
    value: builderContext
  }, /* @__PURE__ */ createElement2(NavigationStateContext_default.Provider, {
    value: context
  }, /* @__PURE__ */ createElement2(UnhandledActionContext_default.Provider, {
    value: onUnhandledAction ?? defaultOnUnhandledAction
  }, /* @__PURE__ */ createElement2(EnsureSingleNavigator, null, children))))));
  if (independent) {
    element = /* @__PURE__ */ createElement2(NavigationRouteContext_default.Provider, {
      value: void 0
    }, /* @__PURE__ */ createElement2(NavigationContext_default.Provider, {
      value: void 0
    }, element));
  }
  return element;
});
var BaseNavigationContainer_default = BaseNavigationContainer;

// vendors/tmp/@react-navigation/core/src/Group.tsx
function Group(_) {
  return null;
}

// vendors/tmp/@react-navigation/core/src/Screen.tsx
function Screen(_) {
  return null;
}

// vendors/tmp/@react-navigation/core/src/createNavigatorFactory.tsx
function createNavigatorFactory(Navigator) {
  return function() {
    if (arguments[0] !== void 0) {
      throw new Error("Creating a navigator doesn't take an argument. Maybe you are trying to use React Navigation 4 API? See https://reactnavigation.org/docs/hello-react-navigation for the latest API and guides.");
    }
    return {
      Navigator,
      Group,
      Screen
    };
  };
}

// vendors/tmp/@react-navigation/core/src/CurrentRenderContext.tsx
import {
  createContext as createContext9
} from "react";
var CurrentRenderContext = createContext9(void 0);
var CurrentRenderContext_default = CurrentRenderContext;

// vendors/tmp/@react-navigation/core/src/getActionFromState.tsx
function getActionFromState(state, options) {
  const normalizedConfig = options ? createNormalizedConfigItem(options) : {};
  const routes = state.index != null ? state.routes.slice(0, state.index + 1) : state.routes;
  if (routes.length === 0) {
    return void 0;
  }
  if (!(routes.length === 1 && routes[0].key === void 0 || routes.length === 2 && routes[0].key === void 0 && routes[0].name === normalizedConfig?.initialRouteName && routes[1].key === void 0)) {
    return {
      type: "RESET",
      payload: state
    };
  }
  const route = state.routes[state.index ?? state.routes.length - 1];
  let current = route?.state;
  let config = normalizedConfig?.screens?.[route?.name];
  let params = { ...route.params };
  let payload = route ? { name: route.name, path: route.path, params } : void 0;
  while (current) {
    if (current.routes.length === 0) {
      return void 0;
    }
    const routes2 = current.index != null ? current.routes.slice(0, current.index + 1) : current.routes;
    const route2 = routes2[routes2.length - 1];
    Object.assign(params, {
      initial: void 0,
      screen: void 0,
      params: void 0,
      state: void 0
    });
    if (routes2.length === 1 && routes2[0].key === void 0) {
      params.initial = true;
      params.screen = route2.name;
    } else if (routes2.length === 2 && routes2[0].key === void 0 && routes2[0].name === config?.initialRouteName && routes2[1].key === void 0) {
      params.initial = false;
      params.screen = route2.name;
    } else {
      params.state = current;
      break;
    }
    if (route2.state) {
      params.params = { ...route2.params };
      params = params.params;
    } else {
      params.path = route2.path;
      params.params = route2.params;
    }
    current = route2.state;
    config = config?.screens?.[route2.name];
  }
  if (!payload) {
    return;
  }
  return {
    type: "NAVIGATE",
    payload
  };
}
var createNormalizedConfigItem = (config) => typeof config === "object" && config != null ? {
  initialRouteName: config.initialRouteName,
  screens: config.screens != null ? createNormalizedConfigs(config.screens) : void 0
} : {};
var createNormalizedConfigs = (options) => Object.entries(options).reduce((acc, [k, v]) => {
  acc[k] = createNormalizedConfigItem(v);
  return acc;
}, {});

// vendors/tmp/@react-navigation/core/src/useRouteCache.tsx
import {
  useMemo as useMemo4
} from "react";
var CHILD_STATE = Symbol("CHILD_STATE");
function useRouteCache(routes) {
  const cache = useMemo4(() => ({ current: new Map() }), []);
  if (process.env.NODE_ENV === "production") {
    return routes;
  }
  cache.current = routes.reduce((acc, route) => {
    const previous = cache.current.get(route);
    if (previous) {
      acc.set(route, previous);
    } else {
      const { state, ...proxy } = route;
      Object.defineProperty(proxy, CHILD_STATE, {
        enumerable: false,
        value: state
      });
      acc.set(route, proxy);
    }
    return acc;
  }, new Map());
  return Array.from(cache.current.values());
}

// vendors/tmp/@react-navigation/core/src/getFocusedRouteNameFromRoute.tsx
function getFocusedRouteNameFromRoute(route) {
  const state = route[CHILD_STATE] ?? route.state;
  const params = route.params;
  const routeName = state ? state.routes[state.index ?? (typeof state.type === "string" && state.type !== "stack" ? 0 : state.routes.length - 1)].name : typeof params?.screen === "string" ? params.screen : void 0;
  return routeName;
}

// vendors/tmp/@react-navigation/core/src/getPathFromState.tsx
import {
  stringify
} from "query-string";

// vendors/tmp/@react-navigation/core/src/fromEntries.tsx
function fromEntries(entries) {
  return entries.reduce((acc, [k, v]) => {
    if (acc.hasOwnProperty(k)) {
      throw new Error(`A value for key '${k}' already exists in the object.`);
    }
    acc[k] = v;
    return acc;
  }, {});
}

// vendors/tmp/@react-navigation/core/src/validatePathConfig.tsx
var formatToList = (items) => items.map((key) => `- ${key}`).join("\n");
function validatePathConfig(config, root = true) {
  const validKeys = ["initialRouteName", "screens"];
  if (!root) {
    validKeys.push("path", "exact", "stringify", "parse");
  }
  const invalidKeys = Object.keys(config).filter((key) => !validKeys.includes(key));
  if (invalidKeys.length) {
    throw new Error(`Found invalid properties in the configuration:
${formatToList(invalidKeys)}

Did you forget to specify them under a 'screens' property?

You can only specify the following properties:
${formatToList(validKeys)}

See https://reactnavigation.org/docs/configuring-links for more details on how to specify a linking configuration.`);
  }
  if (config.screens) {
    Object.entries(config.screens).forEach(([_, value]) => {
      if (typeof value !== "string") {
        validatePathConfig(value, false);
      }
    });
  }
}

// vendors/tmp/@react-navigation/core/src/getPathFromState.tsx
var getActiveRoute = (state) => {
  const route = typeof state.index === "number" ? state.routes[state.index] : state.routes[state.routes.length - 1];
  if (route.state) {
    return getActiveRoute(route.state);
  }
  return route;
};
function getPathFromState(state, options) {
  if (state == null) {
    throw Error("Got 'undefined' for the navigation state. You must pass a valid state object.");
  }
  if (options) {
    validatePathConfig(options);
  }
  const configs = options?.screens ? createNormalizedConfigs2(options?.screens) : {};
  let path = "/";
  let current = state;
  const allParams = {};
  while (current) {
    let index = typeof current.index === "number" ? current.index : 0;
    let route = current.routes[index];
    let pattern;
    let focusedParams;
    let focusedRoute = getActiveRoute(state);
    let currentOptions = configs;
    let nestedRouteNames = [];
    let hasNext = true;
    while (route.name in currentOptions && hasNext) {
      pattern = currentOptions[route.name].pattern;
      nestedRouteNames.push(route.name);
      if (route.params) {
        const stringify2 = currentOptions[route.name]?.stringify;
        const currentParams = fromEntries(Object.entries(route.params).map(([key, value]) => [
          key,
          stringify2?.[key] ? stringify2[key](value) : String(value)
        ]));
        if (pattern) {
          Object.assign(allParams, currentParams);
        }
        if (focusedRoute === route) {
          focusedParams = { ...currentParams };
          pattern?.split("/").filter((p) => p.startsWith(":")).forEach((p) => {
            const name = getParamName(p);
            if (focusedParams) {
              delete focusedParams[name];
            }
          });
        }
      }
      if (!currentOptions[route.name].screens || route.state === void 0) {
        hasNext = false;
      } else {
        index = typeof route.state.index === "number" ? route.state.index : route.state.routes.length - 1;
        const nextRoute = route.state.routes[index];
        const nestedConfig = currentOptions[route.name].screens;
        if (nestedConfig && nextRoute.name in nestedConfig) {
          route = nextRoute;
          currentOptions = nestedConfig;
        } else {
          hasNext = false;
        }
      }
    }
    if (pattern === void 0) {
      pattern = nestedRouteNames.join("/");
    }
    if (currentOptions[route.name] !== void 0) {
      path += pattern.split("/").map((p) => {
        const name = getParamName(p);
        if (p === "*") {
          return route.name;
        }
        if (p.startsWith(":")) {
          const value = allParams[name];
          if (value === void 0 && p.endsWith("?")) {
            return "";
          }
          return encodeURIComponent(value);
        }
        return encodeURIComponent(p);
      }).join("/");
    } else {
      path += encodeURIComponent(route.name);
    }
    if (!focusedParams) {
      focusedParams = focusedRoute.params;
    }
    if (route.state) {
      path += "/";
    } else if (focusedParams) {
      for (let param in focusedParams) {
        if (focusedParams[param] === "undefined") {
          delete focusedParams[param];
        }
      }
      const query = stringify(focusedParams, { sort: false });
      if (query) {
        path += `?${query}`;
      }
    }
    current = route.state;
  }
  path = path.replace(/\/+/g, "/");
  path = path.length > 1 ? path.replace(/\/$/, "") : path;
  return path;
}
var getParamName = (pattern) => pattern.replace(/^:/, "").replace(/\?$/, "");
var joinPaths = (...paths) => [].concat(...paths.map((p) => p.split("/"))).filter(Boolean).join("/");
var createConfigItem = (config, parentPattern) => {
  if (typeof config === "string") {
    const pattern2 = parentPattern ? joinPaths(parentPattern, config) : config;
    return { pattern: pattern2 };
  }
  let pattern;
  if (config.exact && config.path === void 0) {
    throw new Error("A 'path' needs to be specified when specifying 'exact: true'. If you don't want this screen in the URL, specify it as empty string, e.g. `path: ''`.");
  }
  pattern = config.exact !== true ? joinPaths(parentPattern || "", config.path || "") : config.path || "";
  const screens = config.screens ? createNormalizedConfigs2(config.screens, pattern) : void 0;
  return {
    pattern: pattern?.split("/").filter(Boolean).join("/"),
    stringify: config.stringify,
    screens
  };
};
var createNormalizedConfigs2 = (options, pattern) => fromEntries(Object.entries(options).map(([name, c]) => {
  const result = createConfigItem(c, pattern);
  return [name, result];
}));

// vendors/tmp/@react-navigation/core/src/getStateFromPath.tsx
import escape from "escape-string-regexp";
import {
  parse
} from "query-string";
function getStateFromPath(path, options) {
  if (options) {
    validatePathConfig(options);
  }
  let initialRoutes = [];
  if (options?.initialRouteName) {
    initialRoutes.push({
      initialRouteName: options.initialRouteName,
      parentScreens: []
    });
  }
  const screens = options?.screens;
  let remaining = path.replace(/\/+/g, "/").replace(/^\//, "").replace(/\?.*$/, "");
  remaining = remaining.endsWith("/") ? remaining : `${remaining}/`;
  if (screens === void 0) {
    const routes2 = remaining.split("/").filter(Boolean).map((segment) => {
      const name = decodeURIComponent(segment);
      return { name };
    });
    if (routes2.length) {
      return createNestedStateObject(path, routes2, initialRoutes);
    }
    return void 0;
  }
  const configs = [].concat(...Object.keys(screens).map((key) => createNormalizedConfigs3(key, screens, [], initialRoutes, []))).sort((a, b) => {
    if (a.pattern === b.pattern) {
      return b.routeNames.join(">").localeCompare(a.routeNames.join(">"));
    }
    if (a.pattern.startsWith(b.pattern)) {
      return -1;
    }
    if (b.pattern.startsWith(a.pattern)) {
      return 1;
    }
    const aParts = a.pattern.split("/");
    const bParts = b.pattern.split("/");
    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      if (aParts[i] == null) {
        return 1;
      }
      if (bParts[i] == null) {
        return -1;
      }
      const aWildCard = aParts[i] === "*" || aParts[i].startsWith(":");
      const bWildCard = bParts[i] === "*" || bParts[i].startsWith(":");
      if (aWildCard && bWildCard) {
        continue;
      }
      if (aWildCard) {
        return 1;
      }
      if (bWildCard) {
        return -1;
      }
    }
    return bParts.length - aParts.length;
  });
  configs.reduce((acc, config) => {
    if (acc[config.pattern]) {
      const a = acc[config.pattern].routeNames;
      const b = config.routeNames;
      const intersects = a.length > b.length ? b.every((it, i) => a[i] === it) : a.every((it, i) => b[i] === it);
      if (!intersects) {
        throw new Error(`Found conflicting screens with the same pattern. The pattern '${config.pattern}' resolves to both '${a.join(" > ")}' and '${b.join(" > ")}'. Patterns must be unique and cannot resolve to more than one screen.`);
      }
    }
    return Object.assign(acc, {
      [config.pattern]: config
    });
  }, {});
  if (remaining === "/") {
    const match = configs.find((config) => config.path === "" && config.routeNames.every((name) => !configs.find((c) => c.screen === name)?.path));
    if (match) {
      return createNestedStateObject(path, match.routeNames.map((name) => ({ name })), initialRoutes, configs);
    }
    return void 0;
  }
  let result;
  let current;
  const { routes, remainingPath } = matchAgainstConfigs(remaining, configs.map((c) => ({
    ...c,
    regex: c.regex ? new RegExp(c.regex.source + "$") : void 0
  })));
  if (routes !== void 0) {
    current = createNestedStateObject(path, routes, initialRoutes, configs);
    remaining = remainingPath;
    result = current;
  }
  if (current == null || result == null) {
    return void 0;
  }
  return result;
}
var joinPaths2 = (...paths) => [].concat(...paths.map((p) => p.split("/"))).filter(Boolean).join("/");
var matchAgainstConfigs = (remaining, configs) => {
  let routes;
  let remainingPath = remaining;
  for (const config of configs) {
    if (!config.regex) {
      continue;
    }
    const match = remainingPath.match(config.regex);
    if (match) {
      const matchedParams = config.pattern?.split("/").filter((p) => p.startsWith(":")).reduce((acc, p, i) => Object.assign(acc, {
        [p]: match[(i + 1) * 2].replace(/\//, "")
      }), {});
      routes = config.routeNames.map((name) => {
        const config2 = configs.find((c) => c.screen === name);
        const params = config2?.path?.split("/").filter((p) => p.startsWith(":")).reduce((acc, p) => {
          const value = matchedParams[p];
          if (value) {
            const key = p.replace(/^:/, "").replace(/\?$/, "");
            acc[key] = config2.parse?.[key] ? config2.parse[key](value) : value;
          }
          return acc;
        }, {});
        if (params && Object.keys(params).length) {
          return { name, params };
        }
        return { name };
      });
      remainingPath = remainingPath.replace(match[1], "");
      break;
    }
  }
  return { routes, remainingPath };
};
var createNormalizedConfigs3 = (screen, routeConfig, routeNames = [], initials, parentScreens, parentPattern) => {
  const configs = [];
  routeNames.push(screen);
  parentScreens.push(screen);
  const config = routeConfig[screen];
  if (typeof config === "string") {
    const pattern = parentPattern ? joinPaths2(parentPattern, config) : config;
    configs.push(createConfigItem2(screen, routeNames, pattern, config));
  } else if (typeof config === "object") {
    let pattern;
    if (typeof config.path === "string") {
      if (config.exact && config.path === void 0) {
        throw new Error("A 'path' needs to be specified when specifying 'exact: true'. If you don't want this screen in the URL, specify it as empty string, e.g. `path: ''`.");
      }
      pattern = config.exact !== true ? joinPaths2(parentPattern || "", config.path || "") : config.path || "";
      configs.push(createConfigItem2(screen, routeNames, pattern, config.path, config.parse));
    }
    if (config.screens) {
      if (config.initialRouteName) {
        initials.push({
          initialRouteName: config.initialRouteName,
          parentScreens
        });
      }
      Object.keys(config.screens).forEach((nestedConfig) => {
        const result = createNormalizedConfigs3(nestedConfig, config.screens, routeNames, initials, [...parentScreens], pattern ?? parentPattern);
        configs.push(...result);
      });
    }
  }
  routeNames.pop();
  return configs;
};
var createConfigItem2 = (screen, routeNames, pattern, path, parse2) => {
  pattern = pattern.split("/").filter(Boolean).join("/");
  const regex = pattern ? new RegExp(`^(${pattern.split("/").map((it) => {
    if (it.startsWith(":")) {
      return `(([^/]+\\/)${it.endsWith("?") ? "?" : ""})`;
    }
    return `${it === "*" ? ".*" : escape(it)}\\/`;
  }).join("")})`) : void 0;
  return {
    screen,
    regex,
    pattern,
    path,
    routeNames: [...routeNames],
    parse: parse2
  };
};
var findParseConfigForRoute = (routeName, flatConfig) => {
  for (const config of flatConfig) {
    if (routeName === config.routeNames[config.routeNames.length - 1]) {
      return config.parse;
    }
  }
  return void 0;
};
var findInitialRoute = (routeName, parentScreens, initialRoutes) => {
  for (const config of initialRoutes) {
    if (parentScreens.length === config.parentScreens.length) {
      let sameParents = true;
      for (let i = 0; i < parentScreens.length; i++) {
        if (parentScreens[i].localeCompare(config.parentScreens[i]) !== 0) {
          sameParents = false;
          break;
        }
      }
      if (sameParents) {
        return routeName !== config.initialRouteName ? config.initialRouteName : void 0;
      }
    }
  }
  return void 0;
};
var createStateObject = (initialRoute, route, isEmpty) => {
  if (isEmpty) {
    if (initialRoute) {
      return {
        index: 1,
        routes: [{ name: initialRoute }, route]
      };
    } else {
      return {
        routes: [route]
      };
    }
  } else {
    if (initialRoute) {
      return {
        index: 1,
        routes: [{ name: initialRoute }, { ...route, state: { routes: [] } }]
      };
    } else {
      return {
        routes: [{ ...route, state: { routes: [] } }]
      };
    }
  }
};
var createNestedStateObject = (path, routes, initialRoutes, flatConfig) => {
  let state;
  let route = routes.shift();
  const parentScreens = [];
  let initialRoute = findInitialRoute(route.name, parentScreens, initialRoutes);
  parentScreens.push(route.name);
  state = createStateObject(initialRoute, route, routes.length === 0);
  if (routes.length > 0) {
    let nestedState = state;
    while (route = routes.shift()) {
      initialRoute = findInitialRoute(route.name, parentScreens, initialRoutes);
      const nestedStateIndex = nestedState.index || nestedState.routes.length - 1;
      nestedState.routes[nestedStateIndex].state = createStateObject(initialRoute, route, routes.length === 0);
      if (routes.length > 0) {
        nestedState = nestedState.routes[nestedStateIndex].state;
      }
      parentScreens.push(route.name);
    }
  }
  route = findFocusedRoute(state);
  route.path = path;
  const params = parseQueryParams(path, flatConfig ? findParseConfigForRoute(route.name, flatConfig) : void 0);
  if (params) {
    route.params = { ...route.params, ...params };
  }
  return state;
};
var parseQueryParams = (path, parseConfig) => {
  const query = path.split("?")[1];
  const params = parse(query);
  if (parseConfig) {
    Object.keys(params).forEach((name) => {
      if (parseConfig[name] && typeof params[name] === "string") {
        params[name] = parseConfig[name](params[name]);
      }
    });
  }
  return Object.keys(params).length ? params : void 0;
};

// vendors/tmp/@react-navigation/core/src/NavigationHelpersContext.tsx
import {
  createContext as createContext10
} from "react";
var NavigationHelpersContext = createContext10(void 0);
var NavigationHelpersContext_default = NavigationHelpersContext;

// vendors/tmp/@react-navigation/core/src/types.tsx
var PrivateValueStore = class {
};

// vendors/tmp/@react-navigation/core/src/useFocusEffect.tsx
import {
  useEffect as useEffect6
} from "react";

// vendors/tmp/@react-navigation/core/src/useNavigation.tsx
import {
  useContext as useContext4
} from "react";
function useNavigation() {
  const root = useContext4(NavigationContainerRefContext_default);
  const navigation = useContext4(NavigationContext_default);
  if (navigation === void 0 && root === void 0) {
    throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
  }
  return navigation ?? root;
}

// vendors/tmp/@react-navigation/core/src/useFocusEffect.tsx
function useFocusEffect(effect) {
  const navigation = useNavigation();
  if (arguments[1] !== void 0) {
    const message = "You passed a second argument to 'useFocusEffect', but it only accepts one argument. If you want to pass a dependency array, you can use 'React.useCallback':\n\nuseFocusEffect(\n  React.useCallback(() => {\n    // Your code here\n  }, [depA, depB])\n);\n\nSee usage guide: https://reactnavigation.org/docs/use-focus-effect";
    console.error(message);
  }
  useEffect6(() => {
    let isFocused = false;
    let cleanup;
    const callback = () => {
      const destroy = effect();
      if (destroy === void 0 || typeof destroy === "function") {
        return destroy;
      }
      if (process.env.NODE_ENV !== "production") {
        let message = "An effect function must not return anything besides a function, which is used for clean-up.";
        if (destroy === null) {
          message += " You returned 'null'. If your effect does not require clean-up, return 'undefined' (or nothing).";
        } else if (typeof destroy.then === "function") {
          message += "\n\nIt looks like you wrote 'useFocusEffect(async () => ...)' or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\nuseFocusEffect(\n  React.useCallback() => {\n    async function fetchData() {\n      // You can await here\n      const response = await MyAPI.getData(someId);\n      // ...\n    }\n\n    fetchData();\n  }, [someId])\n);\n\nSee usage guide: https://reactnavigation.org/docs/use-focus-effect";
        } else {
          message += ` You returned '${JSON.stringify(destroy)}'.`;
        }
        console.error(message);
      }
    };
    if (navigation.isFocused()) {
      cleanup = callback();
      isFocused = true;
    }
    const unsubscribeFocus = navigation.addListener("focus", () => {
      if (isFocused) {
        return;
      }
      if (cleanup !== void 0) {
        cleanup();
      }
      cleanup = callback();
      isFocused = true;
    });
    const unsubscribeBlur = navigation.addListener("blur", () => {
      if (cleanup !== void 0) {
        cleanup();
      }
      cleanup = void 0;
      isFocused = false;
    });
    return () => {
      if (cleanup !== void 0) {
        cleanup();
      }
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [effect, navigation]);
}

// vendors/tmp/@react-navigation/core/src/useIsFocused.tsx
import {
  useDebugValue as useDebugValue2,
  useEffect as useEffect7
} from "react";
import { useState as useState2 } from "react";
function useIsFocused() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState2(navigation.isFocused);
  const valueToReturn = navigation.isFocused();
  if (isFocused !== valueToReturn) {
    setIsFocused(valueToReturn);
  }
  useEffect7(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => setIsFocused(true));
    const unsubscribeBlur = navigation.addListener("blur", () => setIsFocused(false));
    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);
  useDebugValue2(valueToReturn);
  return valueToReturn;
}

// vendors/tmp/@react-navigation/core/src/useNavigationBuilder.tsx
import { CommonActions as CommonActions5 } from "@react-navigation/routers";
import {
  Children,
  Fragment,
  isValidElement,
  useCallback as useCallback12,
  useContext as useContext16,
  useEffect as useEffect16,
  useMemo as useMemo9,
  useRef as useRef12
} from "react";
import { isValidElementType } from "react-is";

// vendors/tmp/@react-navigation/core/src/isArrayEqual.tsx
function isArrayEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  return a.every((it, index) => it === b[index]);
}

// vendors/tmp/@react-navigation/core/src/isRecordEqual.tsx
function isRecordEqual(a, b) {
  if (a === b) {
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every((key) => a[key] === b[key]);
}

// vendors/tmp/@react-navigation/core/src/useComponent.tsx
import {
  createElement as createElement3,
  useEffect as useEffect8,
  useRef as useRef8
} from "react";
function useComponent(Component, props) {
  const propsRef = useRef8(props);
  propsRef.current = props;
  useEffect8(() => {
    propsRef.current = null;
  });
  return useRef8((rest) => {
    const props2 = propsRef.current;
    if (props2 === null) {
      throw new Error("The returned component must be rendered in the same render phase as the hook.");
    }
    return /* @__PURE__ */ createElement3(Component, {
      ...props2,
      ...rest
    });
  }).current;
}

// vendors/tmp/@react-navigation/core/src/useCurrentRender.tsx
import {
  useContext as useContext5
} from "react";
function useCurrentRender({ state, navigation, descriptors }) {
  const current = useContext5(CurrentRenderContext_default);
  if (current && navigation.isFocused()) {
    current.options = descriptors[state.routes[state.index].key].options;
  }
}

// vendors/tmp/@react-navigation/core/src/useDescriptors.tsx
import {
  createElement as createElement5,
  useContext as useContext7,
  useMemo as useMemo7,
  useState as useState3
} from "react";

// vendors/tmp/@react-navigation/core/src/SceneView.tsx
import {
  createElement as createElement4,
  useCallback as useCallback7,
  useEffect as useEffect9,
  useMemo as useMemo5,
  useRef as useRef9
} from "react";

// vendors/tmp/@react-navigation/core/src/StaticContainer.tsx
import {
  memo
} from "react";
function StaticContainer(props) {
  return props.children;
}
var StaticContainer_default = memo(StaticContainer, (prevProps, nextProps) => {
  const prevPropKeys = Object.keys(prevProps);
  const nextPropKeys = Object.keys(nextProps);
  if (prevPropKeys.length !== nextPropKeys.length) {
    return false;
  }
  for (const key of prevPropKeys) {
    if (key === "children") {
      continue;
    }
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }
  return true;
});

// vendors/tmp/@react-navigation/core/src/SceneView.tsx
function SceneView({ screen, route, navigation, routeState, getState, setState, options, clearOptions }) {
  const navigatorKeyRef = useRef9();
  const getKey = useCallback7(() => navigatorKeyRef.current, []);
  const { addOptionsGetter } = useOptionsGetters({
    key: route.key,
    options,
    navigation
  });
  const setKey = useCallback7((key) => {
    navigatorKeyRef.current = key;
  }, []);
  const getCurrentState = useCallback7(() => {
    const state = getState();
    const currentRoute = state.routes.find((r) => r.key === route.key);
    return currentRoute ? currentRoute.state : void 0;
  }, [getState, route.key]);
  const setCurrentState = useCallback7((child) => {
    const state = getState();
    setState({
      ...state,
      routes: state.routes.map((r) => r.key === route.key ? { ...r, state: child } : r)
    });
  }, [getState, route.key, setState]);
  const isInitialRef = useRef9(true);
  useEffect9(() => {
    isInitialRef.current = false;
  });
  useEffect9(() => {
    return clearOptions;
  }, []);
  const getIsInitial = useCallback7(() => isInitialRef.current, []);
  const context = useMemo5(() => ({
    state: routeState,
    getState: getCurrentState,
    setState: setCurrentState,
    getKey,
    setKey,
    getIsInitial,
    addOptionsGetter
  }), [
    routeState,
    getCurrentState,
    setCurrentState,
    getKey,
    setKey,
    getIsInitial,
    addOptionsGetter
  ]);
  const ScreenComponent = screen.getComponent ? screen.getComponent() : screen.component;
  return /* @__PURE__ */ createElement4(NavigationStateContext_default.Provider, {
    value: context
  }, /* @__PURE__ */ createElement4(EnsureSingleNavigator, null, /* @__PURE__ */ createElement4(StaticContainer_default, {
    name: screen.name,
    render: ScreenComponent || screen.children,
    navigation,
    route
  }, ScreenComponent !== void 0 ? /* @__PURE__ */ createElement4(ScreenComponent, {
    navigation,
    route
  }) : screen.children !== void 0 ? screen.children({ navigation, route }) : null)));
}

// vendors/tmp/@react-navigation/core/src/useNavigationCache.tsx
import { CommonActions as CommonActions3 } from "@react-navigation/routers";
import {
  useContext as useContext6,
  useMemo as useMemo6
} from "react";
function useNavigationCache({ state, getState, navigation, setOptions, router, emitter }) {
  const { stackRef } = useContext6(NavigationBuilderContext_default);
  const cache = useMemo6(() => ({ current: {} }), [getState, navigation, setOptions, router, emitter]);
  const actions = {
    ...router.actionCreators,
    ...CommonActions3
  };
  cache.current = state.routes.reduce((acc, route) => {
    const previous = cache.current[route.key];
    if (previous) {
      acc[route.key] = previous;
    } else {
      const { emit, ...rest } = navigation;
      const dispatch = (thunk) => {
        const action = typeof thunk === "function" ? thunk(getState()) : thunk;
        if (action != null) {
          navigation.dispatch({ source: route.key, ...action });
        }
      };
      const withStack = (callback) => {
        let isStackSet = false;
        try {
          if (process.env.NODE_ENV !== "production" && stackRef && !stackRef.current) {
            stackRef.current = new Error().stack;
            isStackSet = true;
          }
          callback();
        } finally {
          if (isStackSet && stackRef) {
            stackRef.current = void 0;
          }
        }
      };
      const helpers = Object.keys(actions).reduce((acc2, name) => {
        acc2[name] = (...args) => withStack(() => dispatch(actions[name](...args)));
        return acc2;
      }, {});
      acc[route.key] = {
        ...rest,
        ...helpers,
        ...emitter.create(route.key),
        dispatch: (thunk) => withStack(() => dispatch(thunk)),
        setOptions: (options) => setOptions((o) => ({
          ...o,
          [route.key]: { ...o[route.key], ...options }
        })),
        isFocused: () => {
          const state2 = getState();
          if (state2.routes[state2.index].key !== route.key) {
            return false;
          }
          return navigation ? navigation.isFocused() : true;
        }
      };
    }
    return acc;
  }, {});
  return cache.current;
}

// vendors/tmp/@react-navigation/core/src/useDescriptors.tsx
function useDescriptors({ state, screens, navigation, screenOptions, defaultScreenOptions, onAction, getState, setState, addListener, addKeyedListener, onRouteFocus, router, emitter }) {
  const [options, setOptions] = useState3({});
  const { onDispatchAction, onOptionsChange, stackRef } = useContext7(NavigationBuilderContext_default);
  const context = useMemo7(() => ({
    navigation,
    onAction,
    addListener,
    addKeyedListener,
    onRouteFocus,
    onDispatchAction,
    onOptionsChange,
    stackRef
  }), [
    navigation,
    onAction,
    addListener,
    addKeyedListener,
    onRouteFocus,
    onDispatchAction,
    onOptionsChange,
    stackRef
  ]);
  const navigations = useNavigationCache({
    state,
    getState,
    navigation,
    setOptions,
    router,
    emitter
  });
  const routes = useRouteCache(state.routes);
  return routes.reduce((acc, route, i) => {
    const config = screens[route.name];
    const screen = config.props;
    const navigation2 = navigations[route.key];
    const optionsList = [
      screenOptions,
      ...config.options ? config.options.filter(Boolean) : [],
      screen.options,
      options[route.key]
    ];
    const customOptions = optionsList.reduce((acc2, curr) => Object.assign(acc2, typeof curr !== "function" ? curr : curr({ route, navigation: navigation2 })), {});
    const mergedOptions = {
      ...typeof defaultScreenOptions === "function" ? defaultScreenOptions({
        route,
        navigation: navigation2,
        options: customOptions
      }) : defaultScreenOptions,
      ...customOptions
    };
    const clearOptions = () => setOptions((o) => {
      if (route.key in o) {
        const { [route.key]: _, ...rest } = o;
        return rest;
      }
      return o;
    });
    acc[route.key] = {
      route,
      navigation: navigation2,
      render() {
        return /* @__PURE__ */ createElement5(NavigationBuilderContext_default.Provider, {
          key: route.key,
          value: context
        }, /* @__PURE__ */ createElement5(NavigationContext_default.Provider, {
          value: navigation2
        }, /* @__PURE__ */ createElement5(NavigationRouteContext_default.Provider, {
          value: route
        }, /* @__PURE__ */ createElement5(SceneView, {
          navigation: navigation2,
          route,
          screen,
          routeState: state.routes[i].state,
          getState,
          setState,
          options: mergedOptions,
          clearOptions
        }))));
      },
      options: mergedOptions
    };
    return acc;
  }, {});
}

// vendors/tmp/@react-navigation/core/src/useFocusedListenersChildrenAdapter.tsx
import {
  useCallback as useCallback8,
  useContext as useContext8,
  useEffect as useEffect10
} from "react";
function useFocusedListenersChildrenAdapter({ navigation, focusedListeners }) {
  const { addListener } = useContext8(NavigationBuilderContext_default);
  const listener = useCallback8((callback) => {
    if (navigation.isFocused()) {
      for (const listener2 of focusedListeners) {
        const { handled, result } = listener2(callback);
        if (handled) {
          return { handled, result };
        }
      }
      return { handled: true, result: callback(navigation) };
    } else {
      return { handled: false, result: null };
    }
  }, [focusedListeners, navigation]);
  useEffect10(() => addListener?.("focus", listener), [addListener, listener]);
}

// vendors/tmp/@react-navigation/core/src/useFocusEvents.tsx
import {
  useContext as useContext9,
  useEffect as useEffect11,
  useRef as useRef10
} from "react";
function useFocusEvents({ state, emitter }) {
  const navigation = useContext9(NavigationContext_default);
  const lastFocusedKeyRef = useRef10();
  const currentFocusedKey = state.routes[state.index].key;
  useEffect11(() => navigation?.addListener("focus", () => {
    lastFocusedKeyRef.current = currentFocusedKey;
    emitter.emit({ type: "focus", target: currentFocusedKey });
  }), [currentFocusedKey, emitter, navigation]);
  useEffect11(() => navigation?.addListener("blur", () => {
    lastFocusedKeyRef.current = void 0;
    emitter.emit({ type: "blur", target: currentFocusedKey });
  }), [currentFocusedKey, emitter, navigation]);
  useEffect11(() => {
    const lastFocusedKey = lastFocusedKeyRef.current;
    lastFocusedKeyRef.current = currentFocusedKey;
    if (lastFocusedKey === void 0 && !navigation) {
      emitter.emit({ type: "focus", target: currentFocusedKey });
    }
    if (lastFocusedKey === currentFocusedKey || !(navigation ? navigation.isFocused() : true)) {
      return;
    }
    if (lastFocusedKey === void 0) {
      return;
    }
    emitter.emit({ type: "blur", target: lastFocusedKey });
    emitter.emit({ type: "focus", target: currentFocusedKey });
  }, [currentFocusedKey, emitter, navigation]);
}

// vendors/tmp/@react-navigation/core/src/useNavigationHelpers.tsx
import { CommonActions as CommonActions4 } from "@react-navigation/routers";
import {
  useContext as useContext10,
  useMemo as useMemo8
} from "react";
function useNavigationHelpers({ onAction, getState, emitter, router }) {
  const onUnhandledAction = useContext10(UnhandledActionContext_default);
  const parentNavigationHelpers = useContext10(NavigationContext_default);
  return useMemo8(() => {
    const dispatch = (op) => {
      const action = typeof op === "function" ? op(getState()) : op;
      const handled = onAction(action);
      if (!handled) {
        onUnhandledAction?.(action);
      }
    };
    const actions = {
      ...router.actionCreators,
      ...CommonActions4
    };
    const helpers = Object.keys(actions).reduce((acc, name) => {
      acc[name] = (...args) => dispatch(actions[name](...args));
      return acc;
    }, {});
    return {
      ...parentNavigationHelpers,
      ...helpers,
      dispatch,
      emit: emitter.emit,
      isFocused: parentNavigationHelpers ? parentNavigationHelpers.isFocused : () => true,
      canGoBack: () => {
        const state = getState();
        return router.getStateForAction(state, CommonActions4.goBack(), {
          routeNames: state.routeNames,
          routeParamList: {},
          routeGetIdList: {}
        }) !== null || parentNavigationHelpers?.canGoBack() || false;
      },
      getParent: () => parentNavigationHelpers,
      getState
    };
  }, [
    emitter.emit,
    getState,
    onAction,
    onUnhandledAction,
    parentNavigationHelpers,
    router
  ]);
}

// vendors/tmp/@react-navigation/core/src/useOnAction.tsx
import {
  useCallback as useCallback9,
  useContext as useContext12,
  useEffect as useEffect13,
  useRef as useRef11
} from "react";

// vendors/tmp/@react-navigation/core/src/useOnPreventRemove.tsx
import {
  useContext as useContext11,
  useEffect as useEffect12
} from "react";
var VISITED_ROUTE_KEYS = Symbol("VISITED_ROUTE_KEYS");
var shouldPreventRemove = (emitter, beforeRemoveListeners, currentRoutes, nextRoutes, action) => {
  const nextRouteKeys = nextRoutes.map((route) => route.key);
  const removedRoutes = currentRoutes.filter((route) => !nextRouteKeys.includes(route.key)).reverse();
  const visitedRouteKeys = action[VISITED_ROUTE_KEYS] ?? new Set();
  const beforeRemoveAction = {
    ...action,
    [VISITED_ROUTE_KEYS]: visitedRouteKeys
  };
  for (const route of removedRoutes) {
    if (visitedRouteKeys.has(route.key)) {
      continue;
    }
    const isPrevented = beforeRemoveListeners[route.key]?.(beforeRemoveAction);
    if (isPrevented) {
      return true;
    }
    visitedRouteKeys.add(route.key);
    const event = emitter.emit({
      type: "beforeRemove",
      target: route.key,
      data: { action: beforeRemoveAction },
      canPreventDefault: true
    });
    if (event.defaultPrevented) {
      return true;
    }
  }
  return false;
};
function useOnPreventRemove({ getState, emitter, beforeRemoveListeners }) {
  const { addKeyedListener } = useContext11(NavigationBuilderContext_default);
  const route = useContext11(NavigationRouteContext_default);
  const routeKey = route?.key;
  useEffect12(() => {
    if (routeKey) {
      return addKeyedListener?.("beforeRemove", routeKey, (action) => {
        const state = getState();
        return shouldPreventRemove(emitter, beforeRemoveListeners, state.routes, [], action);
      });
    }
  }, [addKeyedListener, beforeRemoveListeners, emitter, getState, routeKey]);
}

// vendors/tmp/@react-navigation/core/src/useOnAction.tsx
function useOnAction({ router, getState, setState, key, actionListeners, beforeRemoveListeners, routerConfigOptions, emitter }) {
  const { onAction: onActionParent, onRouteFocus: onRouteFocusParent, addListener: addListenerParent, onDispatchAction } = useContext12(NavigationBuilderContext_default);
  const routerConfigOptionsRef = useRef11(routerConfigOptions);
  useEffect13(() => {
    routerConfigOptionsRef.current = routerConfigOptions;
  });
  const onAction = useCallback9((action, visitedNavigators = new Set()) => {
    const state = getState();
    if (visitedNavigators.has(state.key)) {
      return false;
    }
    visitedNavigators.add(state.key);
    if (typeof action.target !== "string" || action.target === state.key) {
      let result = router.getStateForAction(state, action, routerConfigOptionsRef.current);
      result = result === null && action.target === state.key ? state : result;
      if (result !== null) {
        onDispatchAction(action, state === result);
        if (state !== result) {
          const isPrevented = shouldPreventRemove(emitter, beforeRemoveListeners, state.routes, result.routes, action);
          if (isPrevented) {
            return true;
          }
          setState(result);
        }
        if (onRouteFocusParent !== void 0) {
          const shouldFocus = router.shouldActionChangeFocus(action);
          if (shouldFocus && key !== void 0) {
            onRouteFocusParent(key);
          }
        }
        return true;
      }
    }
    if (onActionParent !== void 0) {
      if (onActionParent(action, visitedNavigators)) {
        return true;
      }
    }
    for (let i = actionListeners.length - 1; i >= 0; i--) {
      const listener = actionListeners[i];
      if (listener(action, visitedNavigators)) {
        return true;
      }
    }
    return false;
  }, [
    actionListeners,
    beforeRemoveListeners,
    emitter,
    getState,
    key,
    onActionParent,
    onDispatchAction,
    onRouteFocusParent,
    router,
    setState
  ]);
  useOnPreventRemove({
    getState,
    emitter,
    beforeRemoveListeners
  });
  useEffect13(() => addListenerParent?.("action", onAction), [addListenerParent, onAction]);
  return onAction;
}

// vendors/tmp/@react-navigation/core/src/useOnGetState.tsx
import {
  useCallback as useCallback10,
  useContext as useContext13,
  useEffect as useEffect14
} from "react";
function useOnGetState({ getState, getStateListeners }) {
  const { addKeyedListener } = useContext13(NavigationBuilderContext_default);
  const route = useContext13(NavigationRouteContext_default);
  const key = route ? route.key : "root";
  const getRehydratedState = useCallback10(() => {
    const state = getState();
    const routes = state.routes.map((route2) => {
      const childState = getStateListeners[route2.key]?.();
      if (route2.state === childState) {
        return route2;
      }
      return { ...route2, state: childState };
    });
    if (isArrayEqual(state.routes, routes)) {
      return state;
    }
    return { ...state, routes };
  }, [getState, getStateListeners]);
  useEffect14(() => {
    return addKeyedListener?.("getState", key, getRehydratedState);
  }, [addKeyedListener, getRehydratedState, key]);
}

// vendors/tmp/@react-navigation/core/src/useOnRouteFocus.tsx
import {
  useCallback as useCallback11,
  useContext as useContext14
} from "react";
function useOnRouteFocus({ router, getState, key: sourceRouteKey, setState }) {
  const { onRouteFocus: onRouteFocusParent } = useContext14(NavigationBuilderContext_default);
  return useCallback11((key) => {
    const state = getState();
    const result = router.getStateForRouteFocus(state, key);
    if (result !== state) {
      setState(result);
    }
    if (onRouteFocusParent !== void 0 && sourceRouteKey !== void 0) {
      onRouteFocusParent(sourceRouteKey);
    }
  }, [getState, onRouteFocusParent, router, setState, sourceRouteKey]);
}

// vendors/tmp/@react-navigation/core/src/useRegisterNavigator.tsx
import { nanoid } from "nanoid/non-secure";
import {
  useContext as useContext15,
  useEffect as useEffect15,
  useState as useState4
} from "react";
function useRegisterNavigator() {
  const [key] = useState4(() => nanoid());
  const container = useContext15(SingleNavigatorContext);
  if (container === void 0) {
    throw new Error("Couldn't register the navigator. Have you wrapped your app with 'NavigationContainer'?\n\nThis can also happen if there are multiple copies of '@react-navigation' packages installed.");
  }
  useEffect15(() => {
    const { register, unregister } = container;
    register(key);
    return () => unregister(key);
  }, [container, key]);
  return key;
}

// vendors/tmp/@react-navigation/core/src/useNavigationBuilder.tsx
var isValidKey = (key) => key === void 0 || typeof key === "string" && key !== "";
var getRouteConfigsFromChildren = (children, groupKey, groupOptions) => {
  const configs = Children.toArray(children).reduce((acc, child) => {
    if (isValidElement(child)) {
      if (child.type === Screen) {
        if (!isValidKey(child.props.navigationKey)) {
          throw new Error(`Got an invalid 'navigationKey' prop (${JSON.stringify(child.props.navigationKey)}) for the screen '${child.props.name}'. It must be a non-empty string or 'undefined'.`);
        }
        acc.push({
          keys: [groupKey, child.props.navigationKey],
          options: groupOptions,
          props: child.props
        });
        return acc;
      }
      if (child.type === Fragment || child.type === Group) {
        if (!isValidKey(child.props.navigationKey)) {
          throw new Error(`Got an invalid 'navigationKey' prop (${JSON.stringify(child.props.navigationKey)}) for the group. It must be a non-empty string or 'undefined'.`);
        }
        acc.push(...getRouteConfigsFromChildren(child.props.children, child.props.navigationKey, child.type !== Group ? groupOptions : groupOptions != null ? [...groupOptions, child.props.screenOptions] : [child.props.screenOptions]));
        return acc;
      }
    }
    throw new Error(`A navigator can only contain 'Screen', 'Group' or 'React.Fragment' as its direct children (found ${isValidElement(child) ? `'${typeof child.type === "string" ? child.type : child.type?.name}'${child.props?.name ? ` for the screen '${child.props.name}'` : ""}` : typeof child === "object" ? JSON.stringify(child) : `'${String(child)}'`}). To render this component in the navigator, pass it in the 'component' prop to 'Screen'.`);
  }, []);
  if (process.env.NODE_ENV !== "production") {
    configs.forEach((config) => {
      const { name, children: children2, component, getComponent } = config.props;
      if (typeof name !== "string" || !name) {
        throw new Error(`Got an invalid name (${JSON.stringify(name)}) for the screen. It must be a non-empty string.`);
      }
      if (children2 != null || component !== void 0 || getComponent !== void 0) {
        if (children2 != null && component !== void 0) {
          throw new Error(`Got both 'component' and 'children' props for the screen '${name}'. You must pass only one of them.`);
        }
        if (children2 != null && getComponent !== void 0) {
          throw new Error(`Got both 'getComponent' and 'children' props for the screen '${name}'. You must pass only one of them.`);
        }
        if (component !== void 0 && getComponent !== void 0) {
          throw new Error(`Got both 'component' and 'getComponent' props for the screen '${name}'. You must pass only one of them.`);
        }
        if (children2 != null && typeof children2 !== "function") {
          throw new Error(`Got an invalid value for 'children' prop for the screen '${name}'. It must be a function returning a React Element.`);
        }
        if (component !== void 0 && !isValidElementType(component)) {
          throw new Error(`Got an invalid value for 'component' prop for the screen '${name}'. It must be a valid React Component.`);
        }
        if (getComponent !== void 0 && typeof getComponent !== "function") {
          throw new Error(`Got an invalid value for 'getComponent' prop for the screen '${name}'. It must be a function returning a React Component.`);
        }
        if (typeof component === "function" && component.name === "component") {
          console.warn(`Looks like you're passing an inline function for 'component' prop for the screen '${name}' (e.g. component={() => <SomeComponent />}). Passing an inline function will cause the component state to be lost on re-render and cause perf issues since it's re-created every render. You can pass the function as children to 'Screen' instead to achieve the desired behaviour.`);
        }
      } else {
        throw new Error(`Couldn't find a 'component', 'getComponent' or 'children' prop for the screen '${name}'. This can happen if you passed 'undefined'. You likely forgot to export your component from the file it's defined in, or mixed up default import and named import when importing.`);
      }
    });
  }
  return configs;
};
function useNavigationBuilder(createRouter, options) {
  const navigatorKey = useRegisterNavigator();
  const route = useContext16(NavigationRouteContext_default);
  const { children, screenListeners, ...rest } = options;
  const { current: router } = useRef12(createRouter({
    ...rest,
    ...route?.params && route.params.state == null && route.params.initial !== false && typeof route.params.screen === "string" ? { initialRouteName: route.params.screen } : null
  }));
  const routeConfigs = getRouteConfigsFromChildren(children);
  const screens = routeConfigs.reduce((acc, config) => {
    if (config.props.name in acc) {
      throw new Error(`A navigator cannot contain multiple 'Screen' components with the same name (found duplicate screen named '${config.props.name}')`);
    }
    acc[config.props.name] = config;
    return acc;
  }, {});
  const routeNames = routeConfigs.map((config) => config.props.name);
  const routeKeyList = routeNames.reduce((acc, curr) => {
    acc[curr] = screens[curr].keys.map((key) => key ?? "").join(":");
    return acc;
  }, {});
  const routeParamList = routeNames.reduce((acc, curr) => {
    const { initialParams } = screens[curr].props;
    acc[curr] = initialParams;
    return acc;
  }, {});
  const routeGetIdList = routeNames.reduce((acc, curr) => Object.assign(acc, {
    [curr]: screens[curr].props.getId
  }), {});
  if (!routeNames.length) {
    throw new Error("Couldn't find any screens for the navigator. Have you defined any screens as its children?");
  }
  const isStateValid = useCallback12((state2) => state2.type === void 0 || state2.type === router.type, [router.type]);
  const isStateInitialized = useCallback12((state2) => state2 !== void 0 && state2.stale === false && isStateValid(state2), [isStateValid]);
  const { state: currentState, getState: getCurrentState, setState: setCurrentState, setKey, getKey, getIsInitial } = useContext16(NavigationStateContext_default);
  const stateCleanedUp = useRef12(false);
  const cleanUpState = useCallback12(() => {
    setCurrentState(void 0);
    stateCleanedUp.current = true;
  }, [setCurrentState]);
  const setState = useCallback12((state2) => {
    if (stateCleanedUp.current) {
      return;
    }
    setCurrentState(state2);
  }, [setCurrentState]);
  const [initializedState, isFirstStateInitialization] = useMemo9(() => {
    const initialRouteParamList = routeNames.reduce((acc, curr) => {
      const { initialParams } = screens[curr].props;
      const initialParamsFromParams = route?.params?.state == null && route?.params?.initial !== false && route?.params?.screen === curr ? route.params.params : void 0;
      acc[curr] = initialParams !== void 0 || initialParamsFromParams !== void 0 ? {
        ...initialParams,
        ...initialParamsFromParams
      } : void 0;
      return acc;
    }, {});
    if ((currentState === void 0 || !isStateValid(currentState)) && route?.params?.state == null) {
      return [
        router.getInitialState({
          routeNames,
          routeParamList: initialRouteParamList,
          routeGetIdList
        }),
        true
      ];
    } else {
      return [
        router.getRehydratedState(route?.params?.state ?? currentState, {
          routeNames,
          routeParamList: initialRouteParamList,
          routeGetIdList
        }),
        false
      ];
    }
  }, [currentState, router, isStateValid]);
  const previousRouteKeyListRef = useRef12(routeKeyList);
  useEffect16(() => {
    previousRouteKeyListRef.current = routeKeyList;
  });
  const previousRouteKeyList = previousRouteKeyListRef.current;
  let state = isStateInitialized(currentState) ? currentState : initializedState;
  let nextState = state;
  if (!isArrayEqual(state.routeNames, routeNames) || !isRecordEqual(routeKeyList, previousRouteKeyList)) {
    nextState = router.getStateForRouteNamesChange(state, {
      routeNames,
      routeParamList,
      routeGetIdList,
      routeKeyChanges: Object.keys(routeKeyList).filter((name) => previousRouteKeyList.hasOwnProperty(name) && routeKeyList[name] !== previousRouteKeyList[name])
    });
  }
  const previousNestedParamsRef = useRef12(route?.params);
  useEffect16(() => {
    previousNestedParamsRef.current = route?.params;
  }, [route?.params]);
  if (route?.params) {
    const previousParams = previousNestedParamsRef.current;
    let action;
    if (typeof route.params.state === "object" && route.params.state != null && route.params !== previousParams) {
      action = CommonActions5.reset(route.params.state);
    } else if (typeof route.params.screen === "string" && (route.params.initial === false && isFirstStateInitialization || route.params !== previousParams)) {
      action = CommonActions5.navigate({
        name: route.params.screen,
        params: route.params.params,
        path: route.params.path
      });
    }
    const updatedState = action ? router.getStateForAction(nextState, action, {
      routeNames,
      routeParamList,
      routeGetIdList
    }) : null;
    nextState = updatedState !== null ? router.getRehydratedState(updatedState, {
      routeNames,
      routeParamList,
      routeGetIdList
    }) : nextState;
  }
  const shouldUpdate = state !== nextState;
  useScheduleUpdate(() => {
    if (shouldUpdate) {
      setState(nextState);
    }
  });
  state = nextState;
  useEffect16(() => {
    setKey(navigatorKey);
    if (!getIsInitial()) {
      setState(nextState);
    }
    return () => {
      setTimeout(() => {
        if (getCurrentState() !== void 0 && getKey() === navigatorKey) {
          cleanUpState();
        }
      }, 0);
    };
  }, []);
  const initializedStateRef = useRef12();
  initializedStateRef.current = initializedState;
  const getState = useCallback12(() => {
    const currentState2 = getCurrentState();
    return isStateInitialized(currentState2) ? currentState2 : initializedStateRef.current;
  }, [getCurrentState, isStateInitialized]);
  const emitter = useEventEmitter((e) => {
    let routeNames2 = [];
    let route2;
    if (e.target) {
      route2 = state.routes.find((route3) => route3.key === e.target);
      if (route2?.name) {
        routeNames2.push(route2.name);
      }
    } else {
      route2 = state.routes[state.index];
      routeNames2.push(...Object.keys(screens).filter((name) => route2?.name === name));
    }
    if (route2 == null) {
      return;
    }
    const navigation2 = descriptors[route2.key].navigation;
    const listeners = [].concat(...[
      screenListeners,
      ...routeNames2.map((name) => {
        const { listeners: listeners2 } = screens[name].props;
        return listeners2;
      })
    ].map((listeners2) => {
      const map = typeof listeners2 === "function" ? listeners2({ route: route2, navigation: navigation2 }) : listeners2;
      return map ? Object.keys(map).filter((type) => type === e.type).map((type) => map?.[type]) : void 0;
    })).filter((cb, i, self) => cb && self.lastIndexOf(cb) === i);
    listeners.forEach((listener) => listener?.(e));
  });
  useFocusEvents({ state, emitter });
  useEffect16(() => {
    emitter.emit({ type: "state", data: { state } });
  }, [emitter, state]);
  const { listeners: childListeners, addListener } = useChildListeners();
  const { keyedListeners, addKeyedListener } = useKeyedChildListeners();
  const onAction = useOnAction({
    router,
    getState,
    setState,
    key: route?.key,
    actionListeners: childListeners.action,
    beforeRemoveListeners: keyedListeners.beforeRemove,
    routerConfigOptions: {
      routeNames,
      routeParamList,
      routeGetIdList
    },
    emitter
  });
  const onRouteFocus = useOnRouteFocus({
    router,
    key: route?.key,
    getState,
    setState
  });
  const navigation = useNavigationHelpers({
    onAction,
    getState,
    emitter,
    router
  });
  useFocusedListenersChildrenAdapter({
    navigation,
    focusedListeners: childListeners.focus
  });
  useOnGetState({
    getState,
    getStateListeners: keyedListeners.getState
  });
  const descriptors = useDescriptors({
    state,
    screens,
    navigation,
    screenOptions: options.screenOptions,
    defaultScreenOptions: options.defaultScreenOptions,
    onAction,
    getState,
    setState,
    onRouteFocus,
    addListener,
    addKeyedListener,
    router,
    emitter
  });
  useCurrentRender({
    state,
    navigation,
    descriptors
  });
  const NavigationContent = useComponent(NavigationHelpersContext_default.Provider, {
    value: navigation
  });
  return {
    state,
    navigation,
    descriptors,
    NavigationContent
  };
}

// vendors/tmp/@react-navigation/core/src/useNavigationContainerRef.tsx
import {
  useRef as useRef13
} from "react";
function useNavigationContainerRef() {
  const navigation = useRef13(null);
  if (navigation.current == null) {
    navigation.current = createNavigationContainerRef();
  }
  return navigation.current;
}

// vendors/tmp/@react-navigation/core/src/useNavigationState.tsx
import {
  useEffect as useEffect17,
  useRef as useRef14,
  useState as useState5
} from "react";
function useNavigationState(selector) {
  const navigation = useNavigation();
  const [, setResult] = useState5(() => selector(navigation.getState()));
  const selectorRef = useRef14(selector);
  useEffect17(() => {
    selectorRef.current = selector;
  });
  useEffect17(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      setResult(selectorRef.current(e.data.state));
    });
    return unsubscribe;
  }, [navigation]);
  return selector(navigation.getState());
}

// vendors/tmp/@react-navigation/core/src/useRoute.tsx
import {
  useContext as useContext17
} from "react";
function useRoute() {
  const route = useContext17(NavigationRouteContext_default);
  if (route === void 0) {
    throw new Error("Couldn't find a route object. Is your component inside a screen in a navigator?");
  }
  return route;
}

// vendors/tmp/@react-navigation/core/src/index.tsx
export * from "@react-navigation/routers";
export {
  BaseNavigationContainer_default as BaseNavigationContainer,
  CurrentRenderContext_default as CurrentRenderContext,
  NavigationContainerRefContext_default as NavigationContainerRefContext,
  NavigationContext_default as NavigationContext,
  NavigationHelpersContext_default as NavigationHelpersContext,
  NavigationRouteContext_default as NavigationRouteContext,
  PrivateValueStore,
  createNavigationContainerRef,
  createNavigatorFactory,
  findFocusedRoute,
  getActionFromState,
  getFocusedRouteNameFromRoute,
  getPathFromState,
  getStateFromPath,
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useNavigationBuilder,
  useNavigationContainerRef,
  useNavigationState,
  useRoute,
  validatePathConfig
};
//# sourceMappingURL=index.js.map
