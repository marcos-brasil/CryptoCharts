var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// vendors/tmp/@react-navigation/routers/src/CommonActions.tsx
var CommonActions_exports = {};
__export(CommonActions_exports, {
  goBack: () => goBack,
  navigate: () => navigate,
  reset: () => reset,
  setParams: () => setParams
});
function goBack() {
  return { type: "GO_BACK" };
}
function navigate(...args) {
  if (typeof args[0] === "string") {
    return { type: "NAVIGATE", payload: { name: args[0], params: args[1] } };
  } else {
    const payload = args[0] || {};
    if (!payload.hasOwnProperty("key") && !payload.hasOwnProperty("name")) {
      throw new Error("You need to specify name or key when calling navigate with an object as the argument. See https://reactnavigation.org/docs/navigation-actions#navigate for usage.");
    }
    return { type: "NAVIGATE", payload };
  }
}
function reset(state) {
  return { type: "RESET", payload: state };
}
function setParams(params) {
  return { type: "SET_PARAMS", payload: { params } };
}

// vendors/tmp/@react-navigation/routers/src/BaseRouter.tsx
import { nanoid } from "nanoid/non-secure";
var BaseRouter = {
  getStateForAction(state, action) {
    switch (action.type) {
      case "SET_PARAMS": {
        const index = action.source ? state.routes.findIndex((r) => r.key === action.source) : state.index;
        if (index === -1) {
          return null;
        }
        return {
          ...state,
          routes: state.routes.map((r, i) => i === index ? { ...r, params: { ...r.params, ...action.payload.params } } : r)
        };
      }
      case "RESET": {
        const nextState = action.payload;
        if (nextState.routes.length === 0 || nextState.routes.some((route) => !state.routeNames.includes(route.name))) {
          return null;
        }
        if (nextState.stale === false) {
          if (state.routeNames.length !== nextState.routeNames.length || nextState.routeNames.some((name) => !state.routeNames.includes(name))) {
            return null;
          }
          return {
            ...nextState,
            routes: nextState.routes.map((route) => route.key ? route : { ...route, key: `${route.name}-${nanoid()}` })
          };
        }
        return nextState;
      }
      default:
        return null;
    }
  },
  shouldActionChangeFocus(action) {
    return action.type === "NAVIGATE";
  }
};
var BaseRouter_default = BaseRouter;

// vendors/tmp/@react-navigation/routers/src/DrawerRouter.tsx
import { nanoid as nanoid3 } from "nanoid/non-secure";

// vendors/tmp/@react-navigation/routers/src/TabRouter.tsx
import { nanoid as nanoid2 } from "nanoid/non-secure";
var TYPE_ROUTE = "route";
var TabActions = {
  jumpTo(name, params) {
    return { type: "JUMP_TO", payload: { name, params } };
  }
};
var getRouteHistory = (routes, index, backBehavior, initialRouteName) => {
  const history = [{ type: TYPE_ROUTE, key: routes[index].key }];
  let initialRouteIndex;
  switch (backBehavior) {
    case "order":
      for (let i = index; i > 0; i--) {
        history.unshift({ type: TYPE_ROUTE, key: routes[i - 1].key });
      }
      break;
    case "firstRoute":
      if (index !== 0) {
        history.unshift({
          type: TYPE_ROUTE,
          key: routes[0].key
        });
      }
      break;
    case "initialRoute":
      initialRouteIndex = routes.findIndex((route) => route.name === initialRouteName);
      initialRouteIndex = initialRouteIndex === -1 ? 0 : initialRouteIndex;
      if (index !== initialRouteIndex) {
        history.unshift({
          type: TYPE_ROUTE,
          key: routes[initialRouteIndex].key
        });
      }
      break;
    case "history":
      break;
  }
  return history;
};
var changeIndex = (state, index, backBehavior, initialRouteName) => {
  let history;
  if (backBehavior === "history") {
    const currentKey = state.routes[index].key;
    history = state.history.filter((it) => it.type === "route" ? it.key !== currentKey : false).concat({ type: TYPE_ROUTE, key: currentKey });
  } else {
    history = getRouteHistory(state.routes, index, backBehavior, initialRouteName);
  }
  return {
    ...state,
    index,
    history
  };
};
function TabRouter({ initialRouteName, backBehavior = "firstRoute" }) {
  const router = {
    ...BaseRouter_default,
    type: "tab",
    getInitialState({ routeNames, routeParamList }) {
      const index = initialRouteName !== void 0 && routeNames.includes(initialRouteName) ? routeNames.indexOf(initialRouteName) : 0;
      const routes = routeNames.map((name) => ({
        name,
        key: `${name}-${nanoid2()}`,
        params: routeParamList[name]
      }));
      const history = getRouteHistory(routes, index, backBehavior, initialRouteName);
      return {
        stale: false,
        type: "tab",
        key: `tab-${nanoid2()}`,
        index,
        routeNames,
        history,
        routes
      };
    },
    getRehydratedState(partialState, { routeNames, routeParamList }) {
      let state = partialState;
      if (state.stale === false) {
        return state;
      }
      const routes = routeNames.map((name) => {
        const route = state.routes.find((r) => r.name === name);
        return {
          ...route,
          name,
          key: route && route.name === name && route.key ? route.key : `${name}-${nanoid2()}`,
          params: routeParamList[name] !== void 0 ? {
            ...routeParamList[name],
            ...route ? route.params : void 0
          } : route ? route.params : void 0
        };
      });
      const index = Math.min(Math.max(routeNames.indexOf(state.routes[state?.index ?? 0]?.name), 0), routes.length - 1);
      const history = state.history?.filter((it) => routes.find((r) => r.key === it.key)) ?? [];
      return changeIndex({
        stale: false,
        type: "tab",
        key: `tab-${nanoid2()}`,
        index,
        routeNames,
        history,
        routes
      }, index, backBehavior, initialRouteName);
    },
    getStateForRouteNamesChange(state, { routeNames, routeParamList, routeKeyChanges }) {
      const routes = routeNames.map((name) => state.routes.find((r) => r.name === name && !routeKeyChanges.includes(r.name)) || {
        name,
        key: `${name}-${nanoid2()}`,
        params: routeParamList[name]
      });
      const index = Math.max(0, routeNames.indexOf(state.routes[state.index].name));
      let history = state.history.filter((it) => it.type !== "route" || routes.find((r) => r.key === it.key));
      if (!history.length) {
        history = getRouteHistory(routes, index, backBehavior, initialRouteName);
      }
      return {
        ...state,
        history,
        routeNames,
        routes,
        index
      };
    },
    getStateForRouteFocus(state, key) {
      const index = state.routes.findIndex((r) => r.key === key);
      if (index === -1 || index === state.index) {
        return state;
      }
      return changeIndex(state, index, backBehavior, initialRouteName);
    },
    getStateForAction(state, action, { routeParamList }) {
      switch (action.type) {
        case "JUMP_TO":
        case "NAVIGATE": {
          let index = -1;
          if (action.type === "NAVIGATE" && action.payload.key) {
            index = state.routes.findIndex((route) => route.key === action.payload.key);
          } else {
            index = state.routes.findIndex((route) => route.name === action.payload.name);
          }
          if (index === -1) {
            return null;
          }
          return changeIndex({
            ...state,
            routes: state.routes.map((route, i) => {
              if (i !== index) {
                return route;
              }
              let params;
              if (action.type === "NAVIGATE" && action.payload.merge) {
                params = action.payload.params !== void 0 || routeParamList[route.name] !== void 0 ? {
                  ...routeParamList[route.name],
                  ...route.params,
                  ...action.payload.params
                } : route.params;
              } else {
                params = routeParamList[route.name] !== void 0 ? {
                  ...routeParamList[route.name],
                  ...action.payload.params
                } : action.payload.params;
              }
              const path = action.type === "NAVIGATE" && action.payload.path != null ? action.payload.path : route.path;
              return params !== route.params || path !== route.path ? { ...route, path, params } : route;
            })
          }, index, backBehavior, initialRouteName);
        }
        case "GO_BACK": {
          if (state.history.length === 1) {
            return null;
          }
          const previousKey = state.history[state.history.length - 2].key;
          const index = state.routes.findIndex((route) => route.key === previousKey);
          if (index === -1) {
            return null;
          }
          return {
            ...state,
            history: state.history.slice(0, -1),
            index
          };
        }
        default:
          return BaseRouter_default.getStateForAction(state, action);
      }
    },
    shouldActionChangeFocus(action) {
      return action.type === "NAVIGATE";
    },
    actionCreators: TabActions
  };
  return router;
}

// vendors/tmp/@react-navigation/routers/src/DrawerRouter.tsx
var DrawerActions = {
  ...TabActions,
  openDrawer() {
    return { type: "OPEN_DRAWER" };
  },
  closeDrawer() {
    return { type: "CLOSE_DRAWER" };
  },
  toggleDrawer() {
    return { type: "TOGGLE_DRAWER" };
  }
};
function DrawerRouter({ defaultStatus = "closed", ...rest }) {
  const router = TabRouter(rest);
  const isDrawerInHistory = (state) => Boolean(state.history?.some((it) => it.type === "drawer"));
  const addDrawerToHistory = (state) => {
    if (isDrawerInHistory(state)) {
      return state;
    }
    return {
      ...state,
      history: [
        ...state.history,
        {
          type: "drawer",
          status: defaultStatus === "open" ? "closed" : "open"
        }
      ]
    };
  };
  const removeDrawerFromHistory = (state) => {
    if (!isDrawerInHistory(state)) {
      return state;
    }
    return {
      ...state,
      history: state.history.filter((it) => it.type !== "drawer")
    };
  };
  const openDrawer = (state) => {
    if (defaultStatus === "open") {
      return removeDrawerFromHistory(state);
    }
    return addDrawerToHistory(state);
  };
  const closeDrawer = (state) => {
    if (defaultStatus === "open") {
      return addDrawerToHistory(state);
    }
    return removeDrawerFromHistory(state);
  };
  return {
    ...router,
    type: "drawer",
    getInitialState({ routeNames, routeParamList, routeGetIdList }) {
      const state = router.getInitialState({
        routeNames,
        routeParamList,
        routeGetIdList
      });
      return {
        ...state,
        default: defaultStatus,
        stale: false,
        type: "drawer",
        key: `drawer-${nanoid3()}`
      };
    },
    getRehydratedState(partialState, { routeNames, routeParamList, routeGetIdList }) {
      if (partialState.stale === false) {
        return partialState;
      }
      let state = router.getRehydratedState(partialState, {
        routeNames,
        routeParamList,
        routeGetIdList
      });
      if (isDrawerInHistory(partialState)) {
        state = removeDrawerFromHistory(state);
        state = addDrawerToHistory(state);
      }
      return {
        ...state,
        default: defaultStatus,
        type: "drawer",
        key: `drawer-${nanoid3()}`
      };
    },
    getStateForRouteFocus(state, key) {
      const result = router.getStateForRouteFocus(state, key);
      return closeDrawer(result);
    },
    getStateForAction(state, action, options) {
      switch (action.type) {
        case "OPEN_DRAWER":
          return openDrawer(state);
        case "CLOSE_DRAWER":
          return closeDrawer(state);
        case "TOGGLE_DRAWER":
          if (isDrawerInHistory(state)) {
            return removeDrawerFromHistory(state);
          }
          return addDrawerToHistory(state);
        case "JUMP_TO":
        case "NAVIGATE": {
          const result = router.getStateForAction(state, action, options);
          if (result != null && result.index !== state.index) {
            return closeDrawer(result);
          }
          return result;
        }
        case "GO_BACK":
          if (isDrawerInHistory(state)) {
            return removeDrawerFromHistory(state);
          }
          return router.getStateForAction(state, action, options);
        default:
          return router.getStateForAction(state, action, options);
      }
    },
    actionCreators: DrawerActions
  };
}

// vendors/tmp/@react-navigation/routers/src/StackRouter.tsx
import { nanoid as nanoid4 } from "nanoid/non-secure";
var StackActions = {
  replace(name, params) {
    return { type: "REPLACE", payload: { name, params } };
  },
  push(name, params) {
    return { type: "PUSH", payload: { name, params } };
  },
  pop(count = 1) {
    return { type: "POP", payload: { count } };
  },
  popToTop() {
    return { type: "POP_TO_TOP" };
  }
};
function StackRouter(options) {
  const router = {
    ...BaseRouter_default,
    type: "stack",
    getInitialState({ routeNames, routeParamList }) {
      const initialRouteName = options.initialRouteName !== void 0 && routeNames.includes(options.initialRouteName) ? options.initialRouteName : routeNames[0];
      return {
        stale: false,
        type: "stack",
        key: `stack-${nanoid4()}`,
        index: 0,
        routeNames,
        routes: [
          {
            key: `${initialRouteName}-${nanoid4()}`,
            name: initialRouteName,
            params: routeParamList[initialRouteName]
          }
        ]
      };
    },
    getRehydratedState(partialState, { routeNames, routeParamList }) {
      let state = partialState;
      if (state.stale === false) {
        return state;
      }
      const routes = state.routes.filter((route) => routeNames.includes(route.name)).map((route) => ({
        ...route,
        key: route.key || `${route.name}-${nanoid4()}`,
        params: routeParamList[route.name] !== void 0 ? {
          ...routeParamList[route.name],
          ...route.params
        } : route.params
      }));
      if (routes.length === 0) {
        const initialRouteName = options.initialRouteName !== void 0 ? options.initialRouteName : routeNames[0];
        routes.push({
          key: `${initialRouteName}-${nanoid4()}`,
          name: initialRouteName,
          params: routeParamList[initialRouteName]
        });
      }
      return {
        stale: false,
        type: "stack",
        key: `stack-${nanoid4()}`,
        index: routes.length - 1,
        routeNames,
        routes
      };
    },
    getStateForRouteNamesChange(state, { routeNames, routeParamList, routeKeyChanges }) {
      const routes = state.routes.filter((route) => routeNames.includes(route.name) && !routeKeyChanges.includes(route.name));
      if (routes.length === 0) {
        const initialRouteName = options.initialRouteName !== void 0 && routeNames.includes(options.initialRouteName) ? options.initialRouteName : routeNames[0];
        routes.push({
          key: `${initialRouteName}-${nanoid4()}`,
          name: initialRouteName,
          params: routeParamList[initialRouteName]
        });
      }
      return {
        ...state,
        routeNames,
        routes,
        index: Math.min(state.index, routes.length - 1)
      };
    },
    getStateForRouteFocus(state, key) {
      const index = state.routes.findIndex((r) => r.key === key);
      if (index === -1 || index === state.index) {
        return state;
      }
      return {
        ...state,
        index,
        routes: state.routes.slice(0, index + 1)
      };
    },
    getStateForAction(state, action, options2) {
      const { routeParamList } = options2;
      switch (action.type) {
        case "REPLACE": {
          const index = action.target === state.key && action.source ? state.routes.findIndex((r) => r.key === action.source) : state.index;
          if (index === -1) {
            return null;
          }
          const { name, key, params } = action.payload;
          if (!state.routeNames.includes(name)) {
            return null;
          }
          return {
            ...state,
            routes: state.routes.map((route, i) => i === index ? {
              key: key !== void 0 ? key : `${name}-${nanoid4()}`,
              name,
              params: routeParamList[name] !== void 0 ? {
                ...routeParamList[name],
                ...params
              } : params
            } : route)
          };
        }
        case "PUSH":
          if (state.routeNames.includes(action.payload.name)) {
            const getId = options2.routeGetIdList[action.payload.name];
            const id = getId?.({ params: action.payload.params });
            const route = id ? state.routes.find((route2) => route2.name === action.payload.name && id === getId?.({ params: route2.params })) : void 0;
            let routes;
            if (route) {
              routes = state.routes.filter((r) => r.key !== route.key);
              routes.push({
                ...route,
                params: routeParamList[action.payload.name] !== void 0 ? {
                  ...routeParamList[action.payload.name],
                  ...action.payload.params
                } : action.payload.params
              });
            } else {
              routes = [
                ...state.routes,
                {
                  key: `${action.payload.name}-${nanoid4()}`,
                  name: action.payload.name,
                  params: routeParamList[action.payload.name] !== void 0 ? {
                    ...routeParamList[action.payload.name],
                    ...action.payload.params
                  } : action.payload.params
                }
              ];
            }
            return {
              ...state,
              index: routes.length - 1,
              routes
            };
          }
          return null;
        case "POP": {
          const index = action.target === state.key && action.source ? state.routes.findIndex((r) => r.key === action.source) : state.index;
          if (index > 0) {
            const count = Math.max(index - action.payload.count + 1, 1);
            const routes = state.routes.slice(0, count).concat(state.routes.slice(index + 1));
            return {
              ...state,
              index: routes.length - 1,
              routes
            };
          }
          return null;
        }
        case "POP_TO_TOP":
          return router.getStateForAction(state, {
            type: "POP",
            payload: { count: state.routes.length - 1 }
          }, options2);
        case "NAVIGATE":
          if (action.payload.name !== void 0 && !state.routeNames.includes(action.payload.name)) {
            return null;
          }
          if (action.payload.key || action.payload.name) {
            let index = -1;
            const getId = action.payload.key === void 0 && action.payload.name !== void 0 ? options2.routeGetIdList[action.payload.name] : void 0;
            const id = getId?.({ params: action.payload.params });
            if (id) {
              index = state.routes.findIndex((route2) => route2.name === action.payload.name && id === getId?.({ params: route2.params }));
            } else if (state.routes[state.index].name === action.payload.name && action.payload.key === void 0 || state.routes[state.index].key === action.payload.key) {
              index = state.index;
            } else {
              for (let i = state.routes.length - 1; i >= 0; i--) {
                if (state.routes[i].name === action.payload.name && action.payload.key === void 0 || state.routes[i].key === action.payload.key) {
                  index = i;
                  break;
                }
              }
            }
            if (index === -1 && action.payload.key && action.payload.name === void 0) {
              return null;
            }
            if (index === -1 && action.payload.name !== void 0) {
              const routes = [
                ...state.routes,
                {
                  key: action.payload.key ?? `${action.payload.name}-${nanoid4()}`,
                  name: action.payload.name,
                  path: action.payload.path,
                  params: routeParamList[action.payload.name] !== void 0 ? {
                    ...routeParamList[action.payload.name],
                    ...action.payload.params
                  } : action.payload.params
                }
              ];
              return {
                ...state,
                routes,
                index: routes.length - 1
              };
            }
            const route = state.routes[index];
            let params;
            if (action.payload.merge) {
              params = action.payload.params !== void 0 || routeParamList[route.name] !== void 0 ? {
                ...routeParamList[route.name],
                ...route.params,
                ...action.payload.params
              } : route.params;
            } else {
              params = routeParamList[route.name] !== void 0 ? {
                ...routeParamList[route.name],
                ...action.payload.params
              } : action.payload.params;
            }
            return {
              ...state,
              index,
              routes: [
                ...state.routes.slice(0, index),
                params !== route.params || action.payload.path && action.payload.path !== route.path ? {
                  ...route,
                  path: action.payload.path ?? route.path,
                  params
                } : state.routes[index]
              ]
            };
          }
          return null;
        case "GO_BACK":
          if (state.index > 0) {
            return router.getStateForAction(state, {
              type: "POP",
              payload: { count: 1 },
              target: action.target,
              source: action.source
            }, options2);
          }
          return null;
        default:
          return BaseRouter_default.getStateForAction(state, action);
      }
    },
    actionCreators: StackActions
  };
  return router;
}
export {
  BaseRouter_default as BaseRouter,
  CommonActions_exports as CommonActions,
  DrawerActions,
  DrawerRouter,
  StackActions,
  StackRouter,
  TabActions,
  TabRouter
};
//# sourceMappingURL=index.js.map
