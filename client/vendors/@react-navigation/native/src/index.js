// vendors/tmp/@react-navigation/native/src/Link.tsx
import {
  createElement
} from "react";
import { Platform as Platform2, Text } from "react-native";

// vendors/tmp/@react-navigation/native/src/useLinkProps.tsx
import { getPathFromState, NavigationContainerRefContext as NavigationContainerRefContext2, NavigationHelpersContext } from "@react-navigation/core";
import {
  useContext as useContext2
} from "react";
import { Platform } from "react-native";

// vendors/tmp/@react-navigation/native/src/LinkingContext.tsx
import {
  createContext
} from "react";
var LinkingContext = createContext({ options: void 0 });
LinkingContext.displayName = "LinkingContext";
var LinkingContext_default = LinkingContext;

// vendors/tmp/@react-navigation/native/src/useLinkTo.tsx
import { getActionFromState, getStateFromPath, NavigationContainerRefContext } from "@react-navigation/core";
import {
  useCallback,
  useContext
} from "react";
function useLinkTo() {
  const navigation = useContext(NavigationContainerRefContext);
  const linking = useContext(LinkingContext_default);
  const linkTo = useCallback((to) => {
    if (navigation === void 0) {
      throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
    }
    if (typeof to !== "string") {
      navigation.navigate(to.screen, to.params);
      return;
    }
    if (!to.startsWith("/")) {
      throw new Error(`The path must start with '/' (${to}).`);
    }
    const { options } = linking;
    const state = options?.getStateFromPath ? options.getStateFromPath(to, options.config) : getStateFromPath(to, options?.config);
    if (state) {
      const action = getActionFromState(state, options?.config);
      if (action !== void 0) {
        navigation.dispatch(action);
      } else {
        navigation.reset(state);
      }
    } else {
      throw new Error("Failed to parse the path to a navigation state.");
    }
  }, [linking, navigation]);
  return linkTo;
}

// vendors/tmp/@react-navigation/native/src/useLinkProps.tsx
var getStateFromParams = (params) => {
  if (params?.state) {
    return params.state;
  }
  if (params?.screen) {
    return {
      routes: [
        {
          name: params.screen,
          params: params.params,
          state: params.screen ? getStateFromParams(params.params) : void 0
        }
      ]
    };
  }
  return void 0;
};
function useLinkProps({ to, action }) {
  const root = useContext2(NavigationContainerRefContext2);
  const navigation = useContext2(NavigationHelpersContext);
  const { options } = useContext2(LinkingContext_default);
  const linkTo = useLinkTo();
  const onPress = (e) => {
    let shouldHandle = false;
    if (Platform.OS !== "web" || !e) {
      shouldHandle = e ? !e.defaultPrevented : true;
    } else if (!e.defaultPrevented && !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && (e.button == null || e.button === 0) && [void 0, null, "", "self"].includes(e.currentTarget?.target)) {
      e.preventDefault();
      shouldHandle = true;
    }
    if (shouldHandle) {
      if (action) {
        if (navigation) {
          navigation.dispatch(action);
        } else if (root) {
          root.dispatch(action);
        } else {
          throw new Error("Couldn't find a navigation object. Is your component inside NavigationContainer?");
        }
      } else {
        linkTo(to);
      }
    }
  };
  const getPathFromStateHelper = options?.getPathFromState ?? getPathFromState;
  const href = typeof to === "string" ? to : getPathFromStateHelper({
    routes: [
      {
        name: to.screen,
        params: to.params,
        state: getStateFromParams(to.params)
      }
    ]
  }, options?.config);
  return {
    href,
    accessibilityRole: "link",
    onPress
  };
}

// vendors/tmp/@react-navigation/native/src/Link.tsx
function Link({ to, action, ...rest }) {
  const props = useLinkProps({ to, action });
  const onPress = (e) => {
    if ("onPress" in rest) {
      rest.onPress?.(e);
    }
    props.onPress(e);
  };
  return createElement(Text, {
    ...props,
    ...rest,
    ...Platform2.select({
      web: { onClick: onPress },
      default: { onPress }
    })
  });
}

// vendors/tmp/@react-navigation/native/src/NavigationContainer.tsx
import { BaseNavigationContainer, getActionFromState as getActionFromState2, getPathFromState as getPathFromState2, getStateFromPath as getStateFromPath2, validatePathConfig } from "@react-navigation/core";
import {
  createElement as createElement3,
  forwardRef,
  useEffect as useEffect5,
  useImperativeHandle,
  useMemo,
  useRef as useRef2
} from "react";

// vendors/tmp/@react-navigation/native/src/theming/DefaultTheme.tsx
var DefaultTheme = {
  dark: false,
  colors: {
    primary: "rgb(0, 122, 255)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)"
  }
};
var DefaultTheme_default = DefaultTheme;

// vendors/tmp/@react-navigation/native/src/theming/ThemeProvider.tsx
import {
  createElement as createElement2
} from "react";

// vendors/tmp/@react-navigation/native/src/theming/ThemeContext.tsx
import {
  createContext as createContext2
} from "react";
var ThemeContext = createContext2(DefaultTheme_default);
ThemeContext.displayName = "ThemeContext";
var ThemeContext_default = ThemeContext;

// vendors/tmp/@react-navigation/native/src/theming/ThemeProvider.tsx
function ThemeProvider({ value, children }) {
  return /* @__PURE__ */ createElement2(ThemeContext_default.Provider, {
    value
  }, children);
}

// vendors/tmp/@react-navigation/native/src/useBackButton.tsx
import {
  useEffect
} from "react";
import { BackHandler } from "react-native";
function useBackButton(ref) {
  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      const navigation = ref.current;
      if (navigation == null) {
        return false;
      }
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [ref]);
}

// vendors/tmp/@react-navigation/native/src/useDocumentTitle.tsx
import {
  useEffect as useEffect2
} from "react";
function useDocumentTitle(ref, { enabled = true, formatter = (options, route) => options?.title ?? route?.name } = {}) {
  useEffect2(() => {
    if (!enabled) {
      return;
    }
    const navigation = ref.current;
    if (navigation) {
      const title = formatter(navigation.getCurrentOptions(), navigation.getCurrentRoute());
      document.title = title;
    }
    return navigation?.addListener("options", (e) => {
      const title = formatter(e.data.options, navigation?.getCurrentRoute());
      document.title = title;
    });
  });
}

// vendors/tmp/@react-navigation/native/src/useLinking.tsx
import { findFocusedRoute, getActionFromState as getActionFromStateDefault, getPathFromState as getPathFromStateDefault, getStateFromPath as getStateFromPathDefault } from "@react-navigation/core";
import { nanoid } from "nanoid/non-secure";
import {
  useCallback as useCallback2,
  useContext as useContext3,
  useEffect as useEffect3,
  useRef,
  useState
} from "react";

// vendors/tmp/@react-navigation/native/src/ServerContext.tsx
import {
  createContext as createContext3
} from "react";
var ServerContext = createContext3(void 0);
var ServerContext_default = ServerContext;

// vendors/tmp/@react-navigation/native/src/useLinking.tsx
var createMemoryHistory = () => {
  let index = 0;
  let items = [];
  const pending = [];
  const interrupt = () => {
    pending.forEach((it) => {
      const cb = it.cb;
      it.cb = () => cb(true);
    });
  };
  const history = {
    get index() {
      const id = window.history.state?.id;
      if (id) {
        const index2 = items.findIndex((item) => item.id === id);
        return index2 > -1 ? index2 : 0;
      }
      return 0;
    },
    get(index2) {
      return items[index2];
    },
    backIndex({ path }) {
      for (let i = index - 1; i >= 0; i--) {
        const item = items[i];
        if (item.path === path) {
          return i;
        }
      }
      return -1;
    },
    push({ path, state }) {
      interrupt();
      const id = nanoid();
      items = items.slice(0, index + 1);
      items.push({ path, state, id });
      index = items.length - 1;
      window.history.pushState({ id }, "", path);
    },
    replace({ path, state }) {
      interrupt();
      const id = window.history.state?.id ?? nanoid();
      if (!items.length || items.findIndex((item) => item.id === id) < 0) {
        items = [{ path, state, id }];
      } else {
        items[index] = { path, state, id };
      }
      window.history.replaceState({ id }, "", path);
    },
    go(n) {
      interrupt();
      if (n > 0) {
        n = Math.min(n, items.length - 1);
      } else if (n < 0) {
        n = index + n < 0 ? -index : n;
      }
      if (n === 0) {
        return;
      }
      index += n;
      return new Promise((resolve, reject) => {
        const done = (interrupted) => {
          clearTimeout(timer);
          if (interrupted) {
            reject(new Error("History was changed during navigation."));
            return;
          }
          const { title } = window.document;
          window.document.title = "";
          window.document.title = title;
          resolve();
        };
        pending.push({ ref: done, cb: done });
        const timer = setTimeout(() => {
          const index2 = pending.findIndex((it) => it.ref === done);
          if (index2 > -1) {
            pending[index2].cb();
            pending.splice(index2, 1);
          }
        }, 100);
        const onPopState = () => {
          const id = window.history.state?.id;
          const currentIndex = items.findIndex((item) => item.id === id);
          index = Math.max(currentIndex, 0);
          const last = pending.pop();
          window.removeEventListener("popstate", onPopState);
          last?.cb();
        };
        window.addEventListener("popstate", onPopState);
        window.history.go(n);
      });
    },
    listen(listener) {
      const onPopState = () => {
        if (pending.length) {
          return;
        }
        listener();
      };
      window.addEventListener("popstate", onPopState);
      return () => window.removeEventListener("popstate", onPopState);
    }
  };
  return history;
};
var findMatchingState = (a, b) => {
  if (a === void 0 || b === void 0 || a.key !== b.key) {
    return [void 0, void 0];
  }
  const aHistoryLength = a.history ? a.history.length : a.routes.length;
  const bHistoryLength = b.history ? b.history.length : b.routes.length;
  const aRoute = a.routes[a.index];
  const bRoute = b.routes[b.index];
  const aChildState = aRoute.state;
  const bChildState = bRoute.state;
  if (aHistoryLength !== bHistoryLength || aRoute.key !== bRoute.key || aChildState === void 0 || bChildState === void 0 || aChildState.key !== bChildState.key) {
    return [a, b];
  }
  return findMatchingState(aChildState, bChildState);
};
var series = (cb) => {
  let handling = false;
  let queue = [];
  const callback = async () => {
    try {
      if (handling) {
        queue.unshift(callback);
        return;
      }
      handling = true;
      await cb();
    } finally {
      handling = false;
      if (queue.length) {
        const last = queue.pop();
        last?.();
      }
    }
  };
  return callback;
};
var linkingHandlers = [];
function useLinking(ref, { independent, enabled = true, config, getStateFromPath: getStateFromPath3 = getStateFromPathDefault, getPathFromState: getPathFromState4 = getPathFromStateDefault, getActionFromState: getActionFromState3 = getActionFromStateDefault }) {
  useEffect3(() => {
    if (process.env.NODE_ENV === "production") {
      return void 0;
    }
    if (independent) {
      return void 0;
    }
    if (enabled !== false && linkingHandlers.length) {
      console.error([
        "Looks like you have configured linking in multiple places. This is likely an error since deep links should only be handled in one place to avoid conflicts. Make sure that:",
        "- You don't have multiple NavigationContainers in the app each with 'linking' enabled",
        "- Only a single instance of the root component is rendered"
      ].join("\n").trim());
    }
    const handler = Symbol();
    if (enabled !== false) {
      linkingHandlers.push(handler);
    }
    return () => {
      const index = linkingHandlers.indexOf(handler);
      if (index > -1) {
        linkingHandlers.splice(index, 1);
      }
    };
  }, [enabled, independent]);
  const [history] = useState(createMemoryHistory);
  const enabledRef = useRef(enabled);
  const configRef = useRef(config);
  const getStateFromPathRef = useRef(getStateFromPath3);
  const getPathFromStateRef = useRef(getPathFromState4);
  const getActionFromStateRef = useRef(getActionFromState3);
  useEffect3(() => {
    enabledRef.current = enabled;
    configRef.current = config;
    getStateFromPathRef.current = getStateFromPath3;
    getPathFromStateRef.current = getPathFromState4;
    getActionFromStateRef.current = getActionFromState3;
  });
  const server = useContext3(ServerContext_default);
  const getInitialState = useCallback2(() => {
    let value;
    if (enabledRef.current) {
      const location2 = server?.location ?? (typeof window !== "undefined" ? window.location : void 0);
      const path = location2 ? location2.pathname + location2.search : void 0;
      if (path) {
        value = getStateFromPathRef.current(path, configRef.current);
      }
    }
    const thenable = {
      then(onfulfilled) {
        return Promise.resolve(onfulfilled ? onfulfilled(value) : value);
      },
      catch() {
        return thenable;
      }
    };
    return thenable;
  }, []);
  const previousIndexRef = useRef(void 0);
  const previousStateRef = useRef(void 0);
  const pendingPopStatePathRef = useRef(void 0);
  useEffect3(() => {
    previousIndexRef.current = history.index;
    return history.listen(() => {
      const navigation = ref.current;
      if (!navigation || !enabled) {
        return;
      }
      const path = location.pathname + location.search;
      const index = history.index;
      const previousIndex = previousIndexRef.current ?? 0;
      previousIndexRef.current = index;
      pendingPopStatePathRef.current = path;
      const record = history.get(index);
      if (record?.path === path && record?.state) {
        navigation.resetRoot(record.state);
        return;
      }
      const state = getStateFromPathRef.current(path, configRef.current);
      if (state) {
        const rootState = navigation.getRootState();
        if (state.routes.some((r) => !rootState?.routeNames.includes(r.name))) {
          console.warn("The navigation state parsed from the URL contains routes not present in the root navigator. This usually means that the linking configuration doesn't match the navigation structure. See https://reactnavigation.org/docs/configuring-links for more details on how to specify a linking configuration.");
          return;
        }
        if (index > previousIndex) {
          const action = getActionFromStateRef.current(state, configRef.current);
          if (action !== void 0) {
            try {
              navigation.dispatch(action);
            } catch (e) {
              console.warn(`An error occurred when trying to handle the link '${path}': ${e.message}`);
            }
          } else {
            navigation.resetRoot(state);
          }
        } else {
          navigation.resetRoot(state);
        }
      } else {
        navigation.resetRoot(state);
      }
    });
  }, [enabled, history, ref]);
  useEffect3(() => {
    if (!enabled) {
      return;
    }
    if (ref.current) {
      const state = ref.current.getRootState();
      if (state) {
        const route = findFocusedRoute(state);
        const path = route?.path ?? getPathFromStateRef.current(state, configRef.current);
        if (previousStateRef.current === void 0) {
          previousStateRef.current = state;
        }
        history.replace({ path, state });
      }
    }
    const onStateChange = async () => {
      const navigation = ref.current;
      if (!navigation || !enabled) {
        return;
      }
      const previousState = previousStateRef.current;
      const state = navigation.getRootState();
      const pendingPath = pendingPopStatePathRef.current;
      const route = findFocusedRoute(state);
      const path = route?.path ?? getPathFromStateRef.current(state, configRef.current);
      previousStateRef.current = state;
      pendingPopStatePathRef.current = void 0;
      const [previousFocusedState, focusedState] = findMatchingState(previousState, state);
      if (previousFocusedState && focusedState && path !== pendingPath) {
        const historyDelta = (focusedState.history ? focusedState.history.length : focusedState.routes.length) - (previousFocusedState.history ? previousFocusedState.history.length : previousFocusedState.routes.length);
        if (historyDelta > 0) {
          history.push({ path, state });
        } else if (historyDelta < 0) {
          const nextIndex = history.backIndex({ path });
          const currentIndex = history.index;
          try {
            if (nextIndex !== -1 && nextIndex < currentIndex) {
              await history.go(nextIndex - currentIndex);
            } else {
              await history.go(historyDelta);
            }
            history.replace({ path, state });
          } catch (e) {
          }
        } else {
          history.replace({ path, state });
        }
      } else {
        history.replace({ path, state });
      }
    };
    return ref.current?.addListener("state", series(onStateChange));
  });
  return {
    getInitialState
  };
}

// vendors/tmp/@react-navigation/native/src/useThenable.tsx
import {
  useEffect as useEffect4,
  useState as useState2
} from "react";
function useThenable(create) {
  const [promise] = useState2(create);
  let initialState = [false, void 0];
  promise.then((result) => {
    initialState = [true, result];
  });
  const [state, setState] = useState2(initialState);
  const [resolved] = state;
  useEffect4(() => {
    let cancelled = false;
    const resolve = async () => {
      let result;
      try {
        result = await promise;
      } finally {
        if (!cancelled) {
          setState([true, result]);
        }
      }
    };
    if (!resolved) {
      resolve();
    }
    return () => {
      cancelled = true;
    };
  }, [promise, resolved]);
  return state;
}

// vendors/tmp/@react-navigation/native/src/NavigationContainer.tsx
global.REACT_NAVIGATION_DEVTOOLS = new WeakMap();
function NavigationContainerInner({ theme = DefaultTheme_default, linking, fallback = null, documentTitle, onReady, ...rest }, ref) {
  const isLinkingEnabled = linking ? linking.enabled !== false : false;
  if (linking?.config) {
    validatePathConfig(linking.config);
  }
  const refContainer = useRef2(null);
  useBackButton(refContainer);
  useDocumentTitle(refContainer, documentTitle);
  const { getInitialState } = useLinking(refContainer, {
    independent: rest.independent,
    enabled: isLinkingEnabled,
    prefixes: [],
    ...linking
  });
  useEffect5(() => {
    if (refContainer.current) {
      REACT_NAVIGATION_DEVTOOLS.set(refContainer.current, {
        get linking() {
          return {
            ...linking,
            enabled: isLinkingEnabled,
            prefixes: linking?.prefixes ?? [],
            getStateFromPath: linking?.getStateFromPath ?? getStateFromPath2,
            getPathFromState: linking?.getPathFromState ?? getPathFromState2,
            getActionFromState: linking?.getActionFromState ?? getActionFromState2
          };
        }
      });
    }
  });
  const [isResolved, initialState] = useThenable(getInitialState);
  useImperativeHandle(ref, () => refContainer.current);
  const linkingContext = useMemo(() => ({ options: linking }), [linking]);
  const isReady = rest.initialState != null || !isLinkingEnabled || isResolved;
  const onReadyRef = useRef2(onReady);
  useEffect5(() => {
    onReadyRef.current = onReady;
  });
  useEffect5(() => {
    if (isReady) {
      onReadyRef.current?.();
    }
  }, [isReady]);
  if (!isReady) {
    return fallback;
  }
  return /* @__PURE__ */ createElement3(LinkingContext_default.Provider, {
    value: linkingContext
  }, /* @__PURE__ */ createElement3(ThemeProvider, {
    value: theme
  }, /* @__PURE__ */ createElement3(BaseNavigationContainer, {
    ...rest,
    initialState: rest.initialState == null ? initialState : rest.initialState,
    ref: refContainer
  })));
}
var NavigationContainer = forwardRef(NavigationContainerInner);
var NavigationContainer_default = NavigationContainer;

// vendors/tmp/@react-navigation/native/src/ServerContainer.tsx
import { CurrentRenderContext } from "@react-navigation/core";
import {
  createElement as createElement4,
  forwardRef as forwardRef2,
  useEffect as useEffect6
} from "react";
var ServerContainer_default = forwardRef2(function ServerContainer({ children, location: location2 }, ref) {
  useEffect6(() => {
    console.error("'ServerContainer' should only be used on the server with 'react-dom/server' for SSR.");
  }, []);
  const current = {};
  if (ref) {
    const value = {
      getCurrentOptions() {
        return current.options;
      }
    };
    if (typeof ref === "function") {
      ref(value);
    } else {
      ref.current = value;
    }
  }
  return /* @__PURE__ */ createElement4(ServerContext_default.Provider, {
    value: { location: location2 }
  }, /* @__PURE__ */ createElement4(CurrentRenderContext.Provider, {
    value: current
  }, children));
});

// vendors/tmp/@react-navigation/native/src/theming/DarkTheme.tsx
var DarkTheme = {
  dark: true,
  colors: {
    primary: "rgb(10, 132, 255)",
    background: "rgb(1, 1, 1)",
    card: "rgb(18, 18, 18)",
    text: "rgb(229, 229, 231)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)"
  }
};
var DarkTheme_default = DarkTheme;

// vendors/tmp/@react-navigation/native/src/theming/useTheme.tsx
import {
  useContext as useContext4
} from "react";
function useTheme() {
  const theme = useContext4(ThemeContext_default);
  return theme;
}

// vendors/tmp/@react-navigation/native/src/useLinkBuilder.tsx
import { getPathFromState as getPathFromState3, NavigationHelpersContext as NavigationHelpersContext2 } from "@react-navigation/core";
import {
  useCallback as useCallback3,
  useContext as useContext5
} from "react";
var getRootStateForNavigate = (navigation, state) => {
  const parent = navigation.getParent();
  if (parent) {
    const parentState = parent.getState();
    return getRootStateForNavigate(parent, {
      index: 0,
      routes: [
        {
          ...parentState.routes[parentState.index],
          state
        }
      ]
    });
  }
  return state;
};
function useLinkBuilder() {
  const navigation = useContext5(NavigationHelpersContext2);
  const linking = useContext5(LinkingContext_default);
  const buildLink = useCallback3((name, params) => {
    const { options } = linking;
    if (options?.enabled === false) {
      return void 0;
    }
    const state = navigation ? getRootStateForNavigate(navigation, {
      index: 0,
      routes: [{ name, params }]
    }) : {
      index: 0,
      routes: [{ name, params }]
    };
    const path = options?.getPathFromState ? options.getPathFromState(state, options?.config) : getPathFromState3(state, options?.config);
    return path;
  }, [linking, navigation]);
  return buildLink;
}

// vendors/tmp/@react-navigation/native/src/useScrollToTop.tsx
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  useEffect as useEffect7
} from "react";
function getScrollableNode(ref) {
  if (ref.current == null) {
    return null;
  }
  if ("scrollToTop" in ref.current || "scrollTo" in ref.current || "scrollToOffset" in ref.current || "scrollResponderScrollTo" in ref.current) {
    return ref.current;
  } else if ("getScrollResponder" in ref.current) {
    return ref.current.getScrollResponder();
  } else if ("getNode" in ref.current) {
    return ref.current.getNode();
  } else {
    return ref.current;
  }
}
function useScrollToTop(ref) {
  const navigation = useNavigation();
  const route = useRoute();
  useEffect7(() => {
    let current = navigation;
    while (current && current.getState().type !== "tab") {
      current = current.getParent();
    }
    if (!current) {
      return;
    }
    const unsubscribe = current.addListener("tabPress", (e) => {
      const isFocused = navigation.isFocused();
      const isFirst = navigation === current || navigation.getState().routes[0].key === route.key;
      requestAnimationFrame(() => {
        const scrollable = getScrollableNode(ref);
        if (isFocused && isFirst && scrollable && !e.defaultPrevented) {
          if ("scrollToTop" in scrollable) {
            scrollable.scrollToTop();
          } else if ("scrollTo" in scrollable) {
            scrollable.scrollTo({ x: 0, y: 0, animated: true });
          } else if ("scrollToOffset" in scrollable) {
            scrollable.scrollToOffset({ offset: 0, animated: true });
          } else if ("scrollResponderScrollTo" in scrollable) {
            scrollable.scrollResponderScrollTo({ y: 0, animated: true });
          }
        }
      });
    });
    return unsubscribe;
  }, [navigation, ref, route.key]);
}

// vendors/tmp/@react-navigation/native/src/index.tsx
export * from "@react-navigation/core";
export {
  DarkTheme_default as DarkTheme,
  DefaultTheme_default as DefaultTheme,
  Link,
  NavigationContainer_default as NavigationContainer,
  ServerContainer_default as ServerContainer,
  ThemeProvider,
  useLinkBuilder,
  useLinkProps,
  useLinkTo,
  useScrollToTop,
  useTheme
};
//# sourceMappingURL=index.js.map
