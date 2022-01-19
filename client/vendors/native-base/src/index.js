var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/native-base/src/components/composites/AspectRatio/index.tsx
import React14 from "react";
import { StyleSheet as StyleSheet3, Platform as Platform15 } from "react-native";

// node_modules/native-base/src/components/primitives/Box/index.tsx
import React13, { memo as memo2, forwardRef as forwardRef2 } from "react";
import { View } from "react-native";

// node_modules/native-base/src/hooks/useThemeProps/useProps.tsx
import get5 from "lodash.get";
import omit2 from "lodash.omit";
import { useWindowDimensions, Platform as Platform2 } from "react-native";

// node_modules/native-base/src/core/color-mode/hooks.tsx
import React, { useState, useEffect } from "react";

// node_modules/native-base/src/core/hybrid-overlay/Context.ts
import { createContext } from "react";
var HybridContext = createContext({
  colorMode: {
    colorMode: "light",
    toggleColorMode: () => {
    },
    setColorMode: () => {
    },
    accessibleColors: false,
    setAccessibleColors: () => {
    }
  }
});

// node_modules/native-base/src/core/color-mode/hooks.tsx
import { useColorScheme } from "react-native";
var useColorMode = () => {
  const {
    colorMode: colorModeContext
  } = React.useContext(HybridContext);
  if (colorModeContext === void 0) {
    throw new Error("useColorMode must be used within a NativeBaseProvider");
  }
  return colorModeContext;
};
function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}
function useModeManager(initialColorMode, useSystemColorMode, colorModeManager) {
  const systemColorMode = useColorScheme();
  if (useSystemColorMode) {
    initialColorMode = systemColorMode;
  }
  const [colorMode, setRawMode] = useState(initialColorMode);
  async function setColorMode(val) {
    if (colorModeManager) {
      await colorModeManager.set(val);
    }
    setRawMode(val);
  }
  useEffect(() => {
    if (colorModeManager) {
      (async function getMode() {
        let value = await colorModeManager.get(initialColorMode);
        if (value && value !== colorMode) {
          setRawMode(value);
        }
      })();
    }
  }, [colorMode, initialColorMode, colorModeManager]);
  useEffect(() => {
    if (!colorModeManager && useSystemColorMode) {
      setRawMode(systemColorMode);
    }
  }, [systemColorMode, colorModeManager, useSystemColorMode, setRawMode]);
  return { colorMode, setColorMode };
}
function useAccessibleColors() {
  const {
    colorMode: colorModeContext
  } = React.useContext(HybridContext);
  const toggleAccessibleColors = () => colorModeContext.setAccessibleColors(!colorModeContext.accessibleColors);
  return [
    colorModeContext.accessibleColors,
    colorModeContext.setAccessibleColors,
    toggleAccessibleColors
  ];
}

// node_modules/native-base/src/utils/createContext.tsx
import React2 from "react";
function createContext2(rootComponentName) {
  const Context = React2.createContext(null);
  function Provider(props) {
    const { children, ...providerProps } = props;
    const value = React2.useMemo(() => providerProps, Object.values(providerProps));
    return /* @__PURE__ */ React2.createElement(Context.Provider, {
      value
    }, children);
  }
  function useContext2(consumerName) {
    const context = React2.useContext(Context);
    if (context === null) {
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return context;
  }
  Provider.displayName = rootComponentName + "Provider";
  return [Provider, useContext2];
}

// node_modules/native-base/src/core/NativeBaseContext.ts
var defaultConfig = {
  strictMode: "off"
};
var [NativeBaseConfigProvider, useNativeBaseConfig] = createContext2("NativeBaseConfigProvider");

// node_modules/native-base/src/hooks/useTheme.ts
function useTheme() {
  const theme3 = useNativeBaseConfig("useTheme").theme;
  if (!theme3) {
    throw Error("useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<NativeBaseProvider />`");
  }
  return theme3;
}

// node_modules/native-base/src/hooks/useNativeBase.tsx
function useNativeBase() {
  const colorModeResult = useColorMode();
  const theme3 = useTheme();
  return { ...colorModeResult, theme: theme3 };
}

// node_modules/native-base/src/theme/tools/index.ts
var tools_exports = {};
__export(tools_exports, {
  baseFontSize: () => baseFontSize,
  convertAbsoluteToRem: () => convertAbsoluteToRem,
  convertRemToAbsolute: () => convertRemToAbsolute,
  convertToDp: () => convertToDp,
  extractInObject: () => extractInObject,
  findLastValidBreakpoint: () => findLastValidBreakpoint,
  getClosestBreakpoint: () => getClosestBreakpoint,
  getColor: () => getColor,
  getColorFormColorScheme: () => getColorFormColorScheme,
  getColorScheme: () => getColorScheme,
  getRandomString: () => getRandomString,
  hasValidBreakpointFormat: () => hasValidBreakpointFormat,
  inValidBreakpointProps: () => inValidBreakpointProps,
  isDark: () => isDark,
  isLight: () => isLight,
  isResponsiveAnyProp: () => isResponsiveAnyProp,
  mode: () => mode,
  omitUndefined: () => omitUndefined,
  orderedExtractInObject: () => orderedExtractInObject,
  platformSpecificSpaceUnits: () => platformSpecificSpaceUnits,
  randomColor: () => randomColor,
  stylingProps: () => stylingProps,
  tone: () => tone,
  transparentize: () => transparentize
});

// node_modules/native-base/src/theme/tools/colors.ts
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import Color from "tinycolor2";
function mode(light, dark) {
  return (props) => props.colorMode === "dark" ? dark : light;
}
var transparentize = (color2, opacity2) => (theme3) => {
  const raw = getColor(theme3, color2);
  return Color(raw).setAlpha(opacity2).toRgbString();
};
var getColor = (theme3, color2, fallback) => {
  const hex = get(theme3, `colors.${color2}`, color2);
  const isValid = Color(hex).isValid();
  return isValid ? hex : fallback;
};
var tone = (color2) => (theme3) => {
  const hex = getColor(theme3, color2);
  const isDark2 = Color(hex).isDark();
  return isDark2 ? "dark" : "light";
};
var isDark = (color2) => (theme3) => tone(color2)(theme3) === "dark";
var isLight = (color2) => (theme3) => tone(color2)(theme3) === "light";
function randomColor(opts) {
  const fallback = Color.random().toHexString();
  if (!opts || isEmpty(opts)) {
    return fallback;
  }
  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors);
  }
  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string);
  }
  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors);
  }
  return fallback;
}
function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function randomColorFromList(str, list) {
  let index = 0;
  if (str.length === 0)
    return list[0];
  for (let i = 0; i < str.length; i++) {
    index = str.charCodeAt(i) + ((index << 5) - index);
    index = index & index;
  }
  index = (index % list.length + list.length) % list.length;
  return list[index];
}
function randomColorFromString(str) {
  let hash = 0;
  if (str.length === 0)
    return hash.toString();
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let color2 = "#";
  for (let j = 0; j < 3; j++) {
    const value = hash >> j * 8 & 255;
    color2 += ("00" + value.toString(16)).substr(-2);
  }
  return color2;
}

// node_modules/native-base/src/theme/tools/utils.ts
import omitBy from "lodash.omitby";
import isNil from "lodash.isnil";
import pick from "lodash.pick";
import omit from "lodash.omit";
import get2 from "lodash.get";
import { Platform } from "react-native";
var stylingProps = {
  margin: [
    "margin",
    "m",
    "marginTop",
    "mt",
    "marginRight",
    "mr",
    "marginBottom",
    "mb",
    "marginLeft",
    "ml",
    "marginX",
    "mx",
    "marginY",
    "my"
  ],
  padding: [
    "padding",
    "p",
    "paddingTop",
    "pt",
    "paddingRight",
    "pr",
    "paddingBottom",
    "pb",
    "paddingLeft",
    "pl",
    "paddingX",
    "px",
    "paddingY",
    "py"
  ],
  border: [
    "border",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "borderTop",
    "borderTopWidth",
    "borderTopStyle",
    "borderTopColor",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderRight",
    "borderRightWidth",
    "borderRightStyle",
    "borderRightColor",
    "borderBottom",
    "borderBottomWidth",
    "borderBottomStyle",
    "borderBottomColor",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "borderLeft",
    "borderLeftWidth",
    "borderLeftStyle",
    "borderLeftColor",
    "borderX",
    "borderY"
  ],
  layout: [
    "width",
    "w",
    "height",
    "h",
    "display",
    "minWidth",
    "minW",
    "minH",
    "minHeight",
    "maxWidth",
    "maxW",
    "maxHeight",
    "maxH",
    "size",
    "verticalAlign",
    "overflow",
    "overflowX",
    "overflowY"
  ],
  flexbox: [
    "alignItems",
    "alignContent",
    "justifyItems",
    "justifyContent",
    "flexWrap",
    "flexDirection",
    "flex",
    "flexGrow",
    "flexShrink",
    "flexBasis",
    "justifySelf",
    "alignSelf",
    "order"
  ],
  position: ["position", "zIndex", "top", "right", "bottom", "left"],
  background: ["bg", "backgroundColor", "bgColor"]
};
function omitUndefined(obj) {
  return omitBy(obj, isNil);
}
function getRandomString(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function orderedPick(obj, values) {
  const ret = {};
  Object.keys(obj).forEach((key) => {
    if (values.includes(key)) {
      ret[key] = obj[key];
    }
  });
  return ret;
}
function orderedExtractInObject(parent, values) {
  return [
    omitUndefined(orderedPick(parent, values)),
    omitUndefined(omit(parent, values))
  ];
}
function extractInObject(parent, values) {
  return [
    omitUndefined(pick(parent, values)),
    omitUndefined(omit(parent, values))
  ];
}
function getColorFormColorScheme(props) {
  const { theme: theme3, colorScheme, isDisabled } = props;
  const simpleColorScheme = colorScheme.split(".")[0];
  if (isDisabled)
    return "gray.300";
  else if (simpleColorScheme in theme3.colors) {
    return theme3.colors[simpleColorScheme][0] === "#" ? simpleColorScheme : theme3.colors[simpleColorScheme][400] || theme3.colors[simpleColorScheme][200];
  } else
    return "primary.200";
}
function getColorScheme(props, customColorScheme) {
  let { theme: theme3, colorScheme } = props;
  colorScheme = customColorScheme || colorScheme;
  if (!(colorScheme in theme3.colors))
    return "primary";
  else {
    if (typeof theme3.colors[colorScheme] === "object")
      return colorScheme;
  }
}
var inValidBreakpointProps = ["style", "children", "shadowOffset"];
function hasValidBreakpointFormat(breaks, themeBreakpoints, property) {
  if (property && inValidBreakpointProps.indexOf(property) !== -1) {
    return false;
  } else if (Array.isArray(breaks)) {
    return breaks.length ? true : false;
  } else if (typeof breaks === "object" && breaks !== null) {
    const keys = Object.keys(breaks);
    const themeBreakPointKeys = Object.keys(themeBreakpoints);
    for (let i = 0; i < keys.length; i++) {
      if (themeBreakPointKeys.indexOf(keys[i]) === -1) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
function findLastValidBreakpoint(values, themeBreakpoints, currentBreakpoint) {
  const valArray = Array.isArray(values) ? values : Object.keys(themeBreakpoints).map((bPoint) => values[bPoint]);
  return valArray[currentBreakpoint] ?? valArray.slice(0, currentBreakpoint + 1).filter((v) => !isNil(v)).pop();
}
function getClosestBreakpoint(values, point) {
  const dimValues = Object.values(values);
  let index = -1;
  for (let i = 0; i < dimValues.length; i++) {
    if (dimValues[i] === point) {
      index = i;
      break;
    } else if (dimValues[i] > point && i !== 0) {
      index = i - 1;
      break;
    } else if (dimValues[i] < point && i === dimValues.length - 1) {
      index = i;
      break;
    }
  }
  return index;
}
var baseFontSize = 16;
var convertAbsoluteToRem = (px) => {
  return `${px / baseFontSize}rem`;
};
var convertRemToAbsolute = (rem) => {
  return rem * baseFontSize;
};
var convertToDp = (value) => {
  const numberRegex = /^\d+$/;
  if (typeof value === "number") {
    return value;
  } else {
    const isAbsolute = numberRegex.test(value);
    const isPx = !isAbsolute && value.endsWith("px");
    const isRem = !isAbsolute && value.endsWith("rem");
    const isEm = !isAbsolute && value.endsWith("em");
    let finalDpValue = 0;
    if (isAbsolute || isPx) {
      finalDpValue = parseFloat(value);
    } else if (isEm) {
      finalDpValue = convertRemToAbsolute(parseFloat(value));
    } else if (isRem) {
      finalDpValue = convertRemToAbsolute(parseFloat(value));
    }
    return finalDpValue;
  }
};
var platformSpecificSpaceUnits = (theme3) => {
  const scales = ["space", "sizes", "fontSizes"];
  const newTheme = { ...theme3 };
  const isWeb = Platform.OS === "web";
  scales.forEach((key) => {
    const scale = get2(theme3, key, {});
    const newScale = { ...scale };
    for (const scaleKey in scale) {
      const val = scale[scaleKey];
      if (typeof val !== "object") {
        const isAbsolute = typeof val === "number";
        const isPx = !isAbsolute && val.endsWith("px");
        const isRem = !isAbsolute && val.endsWith("rem");
        if (isWeb) {
          if (isAbsolute) {
            newScale[scaleKey] = convertAbsoluteToRem(val);
          }
        } else {
          if (isRem) {
            newScale[scaleKey] = convertRemToAbsolute(parseFloat(val));
          } else if (isPx) {
            newScale[scaleKey] = parseFloat(val);
          }
        }
      }
    }
    newTheme[key] = newScale;
  });
  return newTheme;
};
function isResponsiveAnyProp(props, theme3) {
  if (props) {
    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
      if (hasValidBreakpointFormat(props[keys[i]], theme3.breakpoints, keys[i])) {
        return true;
      }
    }
  }
  return false;
}

// node_modules/native-base/src/utils/filterShadowProps.ts
import isEmpty2 from "lodash.isempty";
var filterShadowProps = (props, ignoredProps, OS) => {
  if (OS !== "web") {
    return { ...ignoredProps, ...props };
  }
  let style = ignoredProps.style ?? {};
  let [shadowProps, remainingProps] = extractInObject(props, [
    "shadowColor",
    "shadowOffset",
    "shadowOpacity",
    "shadowRadius"
  ]);
  if (!isEmpty2(shadowProps)) {
    style = { ...style, ...shadowProps };
  }
  return { ...remainingProps, ...ignoredProps, style };
};

// node_modules/native-base/src/hooks/useThemeProps/utils.ts
import get4 from "lodash.get";
import isNil2 from "lodash.isnil";
import mergeWith from "lodash.mergewith";
import cloneDeep from "lodash.clonedeep";

// node_modules/native-base/src/theme/base/borders.ts
var borderWidths = {
  "0": 0,
  "1": "1px",
  "2": "2px",
  "4": "4px",
  "8": "8px"
};
var borders_default = borderWidths;

// node_modules/native-base/src/theme/base/breakpoints.ts
var breakpoints = {
  "base": 0,
  "sm": 480,
  "md": 768,
  "lg": 992,
  "xl": 1280,
  "2xl": 1536
};
var breakpoints_default = breakpoints;

// node_modules/native-base/src/theme/base/colors.ts
var colors = {
  contrastThreshold: 7,
  white: "#FFFFFF",
  black: "#000000",
  lightText: "#FFFFFF",
  darkText: "#000000",
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337"
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843"
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75"
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87"
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95"
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81"
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a"
  },
  lightBlue: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e"
  },
  darkBlue: {
    50: "#dbf4ff",
    100: "#addbff",
    200: "#7cc2ff",
    300: "#4aa9ff",
    400: "#1a91ff",
    500: "#0077e6",
    600: "#005db4",
    700: "#004282",
    800: "#002851",
    900: "#000e21"
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63"
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a"
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b"
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d"
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314"
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f"
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12"
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d"
  },
  warmGray: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917"
  },
  trueGray: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717"
  },
  gray: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b"
  },
  coolGray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827"
  },
  blueGray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a"
  },
  dark: {
    50: "#18181b",
    100: "#27272a",
    200: "#3f3f46",
    300: "#52525b",
    400: "#71717a",
    500: "#a1a1aa",
    600: "#d4d4d8",
    700: "#e4e4e7",
    800: "#f4f4f5",
    900: "#fafafa"
  },
  danger: {},
  error: {},
  success: {},
  warning: {},
  muted: {},
  primary: {},
  info: {},
  secondary: {},
  light: {},
  tertiary: {}
};
colors.danger = colors.red;
colors.error = colors.rose;
colors.success = colors.emerald;
colors.warning = colors.orange;
colors.muted = colors.trueGray;
colors.primary = colors.cyan;
colors.secondary = colors.pink;
colors.tertiary = colors.green;
colors.info = colors.lightBlue;
colors.light = colors.warmGray;
var colors_default = colors;

// node_modules/native-base/src/theme/base/radius.ts
var radii = {
  "none": 0,
  "xs": 2,
  "sm": 4,
  "md": 6,
  "lg": 8,
  "xl": 12,
  "2xl": 16,
  "3xl": 24,
  "full": 9999
};
var radius_default = radii;

// node_modules/native-base/src/theme/base/shadows.ts
var shadow = {
  "0": {
    shadowColor: colors_default.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1
  },
  "1": {
    shadowColor: colors_default.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  "2": {
    shadowColor: colors_default.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  "3": {
    shadowColor: colors_default.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  "4": {
    shadowColor: colors_default.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  "5": {
    shadowColor: colors_default.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  "6": {
    shadowColor: colors_default.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  },
  "7": {
    shadowColor: colors_default.black,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8
  },
  "8": {
    shadowColor: colors_default.black,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9
  },
  "9": {
    shadowColor: colors_default.black,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10
  }
};
var shadows_default = shadow;

// node_modules/native-base/src/theme/base/space.ts
var spacing = {
  "px": "1px",
  "0": 0,
  "0.5": 2,
  "1": 4,
  "1.5": 6,
  "2": 8,
  "2.5": 10,
  "3": 12,
  "3.5": 14,
  "4": 16,
  "5": 20,
  "6": 24,
  "7": 28,
  "8": 32,
  "9": 36,
  "10": 40,
  "12": 48,
  "16": 64,
  "20": 80,
  "24": 96,
  "32": 128,
  "40": 160,
  "48": 192,
  "56": 224,
  "64": 256,
  "72": 288,
  "80": 320,
  "96": 384,
  "1/2": "50%",
  "1/3": "33.333%",
  "2/3": "66.666%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666%",
  "2/6": "33.333%",
  "3/6": "50%",
  "4/6": "66.666%",
  "5/6": "83.333%",
  "full": "100%"
};

// node_modules/native-base/src/theme/base/sizes.ts
var container = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};
var sizes = {
  ...spacing,
  ...{
    "3xs": 224,
    "2xs": 256,
    "xs": 320,
    "sm": 384,
    "md": 448,
    "lg": 512,
    "xl": 576,
    "2xl": 672
  },
  container
};
var sizes_default = sizes;

// node_modules/native-base/src/theme/base/typography.ts
var typography = {
  letterSpacings: {
    "xs": "-0.05em",
    "sm": "-0.025em",
    "md": 0,
    "lg": "0.025em",
    "xl": "0.05em",
    "2xl": "0.1em"
  },
  lineHeights: {
    "2xs": "1em",
    "xs": "1.125em",
    "sm": "1.25em",
    "md": "1.375em",
    "lg": "1.5em",
    "xl": "1.75em",
    "2xl": "2em",
    "3xl": "2.5em",
    "4xl": "3em",
    "5xl": "4em"
  },
  fontConfig: {},
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
    extraBlack: 950
  },
  fonts: {
    heading: void 0,
    body: void 0,
    mono: void 0
  },
  fontSizes: {
    "2xs": 10,
    "xs": 12,
    "sm": 14,
    "md": 16,
    "lg": 18,
    "xl": 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
    "7xl": 72,
    "8xl": 96,
    "9xl": 128
  }
};
var typography_default = typography;

// node_modules/native-base/src/theme/base/opacity.ts
var opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1
};
var opacity_default = opacity;

// node_modules/native-base/src/theme/base/index.ts
var theme = {
  borderWidths: borders_default,
  breakpoints: breakpoints_default,
  colors: colors_default,
  radii: radius_default,
  ...typography_default,
  sizes: sizes_default,
  space: spacing,
  shadows: shadows_default,
  opacity: opacity_default
};
var themePropertyMap = {
  borderRadius: "radii",
  color: "colors",
  letterSpacing: "letterSpacings",
  lineHeight: "lineHeights",
  fontFamily: "fonts",
  fontSize: "fontSizes",
  fontWeight: "fontWeights",
  size: "sizes",
  space: "space",
  border: "borders",
  shadow: "shadows"
};
var base_default = theme;

// node_modules/native-base/src/hooks/useContrastText.ts
import Color2 from "tinycolor2";

// node_modules/native-base/src/hooks/useToken.ts
import get3 from "lodash.get";
function useToken(property, token, fallback) {
  const theme3 = useTheme();
  if (Array.isArray(token)) {
    let fallbackArr = [];
    if (fallback) {
      fallbackArr = Array.isArray(fallback) ? fallback : [fallback];
    }
    return token.map((innerToken, index) => {
      const path2 = `${property}.${innerToken}`;
      return get3(theme3, path2, fallbackArr[index] ?? innerToken);
    });
  }
  const path = `${property}.${token}`;
  return get3(theme3, path, fallback ?? token);
}

// node_modules/native-base/src/hooks/useContrastText.ts
function useContrastText(bg, color2) {
  const [
    contrastThreshold,
    trueDarkText,
    trueLightText,
    trueBg,
    trueColor
  ] = useToken("colors", [
    "contrastThreshold",
    "darkText",
    "lightText",
    bg,
    color2 ?? ""
  ]);
  const suppressColorAccessibilityWarning = useNativeBaseConfig("NativeBaseConfigProvider").config.suppressColorAccessibilityWarning;
  const [accessibleColors] = useAccessibleColors();
  if (typeof bg !== "string") {
    return;
  }
  const [bgThemeColorVariant, bgShade] = bg.split(".");
  const textColor = !accessibleColors && bgThemeColorVariant && themeColorsThresholdShades[bgThemeColorVariant] ? getContrastThemeColor(bgThemeColorVariant, bgShade) : getAccessibleContrastColor(contrastThreshold, trueDarkText, trueLightText, trueBg, trueColor, bg, color2, suppressColorAccessibilityWarning);
  return textColor;
}
function getContrastThemeColor(bgThemeColorVariant, bgShade) {
  const shadeThreshold = themeColorsThresholdShades[bgThemeColorVariant];
  if (bgShade && shadeThreshold && (bgShade >= shadeThreshold && bgThemeColorVariant !== "dark" || bgThemeColorVariant === "dark" && bgShade < shadeThreshold)) {
    return "lightText";
  }
  return "darkText";
}
function getAccessibleContrastColor(contrastThreshold, trueDarkText, trueLightText, trueBg, trueColor, bg, color2, suppressColorAccessibilityWarning) {
  if (typeof trueBg !== "string") {
    trueBg = bg;
  }
  let trueContrastColor;
  let contrastColorToken;
  let darkTextConstrast = getContrastRatio(trueBg, trueDarkText);
  let lightTextConstrast = getContrastRatio(trueBg, trueLightText);
  if (darkTextConstrast >= contrastThreshold || darkTextConstrast > lightTextConstrast) {
    trueContrastColor = trueDarkText;
    contrastColorToken = "darkText";
  } else {
    trueContrastColor = trueLightText;
    contrastColorToken = "lightText";
  }
  if (process.env.NODE_ENV !== "production") {
    const contrast = getContrastRatio(trueBg, trueColor ? trueColor : trueContrastColor);
    if (contrast < 3 && !suppressColorAccessibilityWarning) {
      console.warn([
        `NativeBase: The contrast ratio of ${contrast}:1 for ${color2 ? color2 : contrastColorToken} on ${bg}`,
        "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.",
        "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"
      ].join("\n"));
    }
  }
  return contrastColorToken;
}
function getContrastRatio(foreground, background2) {
  const lumA = Color2(foreground).getLuminance();
  const lumB = Color2(background2).getLuminance();
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
var themeColorsThresholdShades = {
  rose: 500,
  pink: 500,
  fuchsia: 800,
  purple: 700,
  violet: 600,
  indigo: 500,
  blue: 400,
  lightBlue: 400,
  cyan: 300,
  teal: 300,
  emerald: 300,
  tertiary: 300,
  green: 400,
  lime: 600,
  yellow: 800,
  amber: 500,
  orange: 500,
  red: 500,
  warmGray: 500,
  trueGray: 500,
  gray: 500,
  coolGray: 500,
  blueGray: 500,
  dark: 500,
  danger: 500,
  error: 500,
  success: 400,
  warning: 500,
  muted: 500,
  primary: 500,
  info: 400,
  secondary: 500,
  light: 500
};

// node_modules/native-base/src/hooks/useThemeProps/utils.ts
function extractProps(props, theme3, {}, componentTheme, currentBreakpoint) {
  let newProps = {};
  for (let property in props) {
    if (themePropertyMap[property]) {
      let propValues = extractPropertyFromFunction(property, props, theme3, componentTheme);
      if (typeof propValues === "string" || typeof propValues === "number") {
        newProps[property] = propValues;
      } else if (!isNil2(propValues)) {
        for (let nestedProp in propValues) {
          newProps[nestedProp] = get4(theme3, `${themePropertyMap[nestedProp]}.${propValues[nestedProp]}`, propValues[nestedProp]);
        }
      } else if (property === "shadow") {
        let shadowProps = theme3[themePropertyMap[property]][props[property]];
        if (!isNil2(shadowProps)) {
          newProps = { ...newProps, ...shadowProps };
        }
      } else {
        newProps[property] = resolveValueWithBreakpoint(props[property], theme3.breakpoints, currentBreakpoint, property);
      }
    } else {
      newProps[property] = resolveValueWithBreakpoint(props[property], theme3.breakpoints, currentBreakpoint, property);
    }
  }
  return cloneDeep(newProps);
}
function filterDefaultProps(props, defaultProps40) {
  let [, resultProps] = extractInObject(defaultProps40, Object.keys(props));
  return resultProps;
}
var extractPropertyFromFunction = (property, props, theme3, componentTheme) => {
  let propValues;
  if (componentTheme && typeof componentTheme[themePropertyMap[property]] === "function") {
    let funcProps = componentTheme[themePropertyMap[property]]({
      theme: theme3,
      ...props
    });
    let isNested = Object.keys(funcProps).some(function(key) {
      return funcProps[key] && typeof funcProps[key] === "object";
    });
    propValues = isNested ? { ...get4(funcProps, `${props[property]}`) } : { ...funcProps };
  } else {
    propValues = get4(componentTheme, `${themePropertyMap[property]}.${props[property]}`);
  }
  return propValues;
};
function mergeUnderscoreProps(newProps, props) {
  const _props = Object.keys(newProps).filter((propName) => propName.startsWith("_"));
  _props.forEach((propName) => {
    const bg = newProps.bg ?? newProps.backgroundColor;
    const textColor = bg ? {
      color: useContrastText(bg, newProps[propName]?.color ?? props[propName]?.color)
    } : {};
    newProps[propName] = {
      ...textColor,
      ...newProps[propName],
      ...props[propName]
    };
  });
  return newProps;
}
var resolveValueWithBreakpoint = (values, breakpointTheme, currentBreakpoint, property) => {
  if (hasValidBreakpointFormat(values, breakpointTheme, property)) {
    return findLastValidBreakpoint(values, breakpointTheme, currentBreakpoint);
  } else {
    return values;
  }
};
function calculateProps(theme3, colorModeProps, componentTheme, props, windowWidth) {
  let currentBreakpoint = getClosestBreakpoint(theme3.breakpoints, windowWidth);
  if (!props) {
    props = {};
  }
  let newProps;
  if (componentTheme) {
    newProps = extractProps(filterDefaultProps(props, componentTheme.defaultProps), theme3, colorModeProps, componentTheme, currentBreakpoint);
    let componentBaseStyle = typeof componentTheme.baseStyle !== "function" ? componentTheme.baseStyle : componentTheme.baseStyle({
      theme: theme3,
      ...newProps,
      ...props,
      ...colorModeProps
    });
    newProps = mergeWith(newProps, componentBaseStyle, (objValue, srcValue, key) => {
      if (!isNil2(objValue)) {
        delete newProps[key];
      }
    });
    const variant = props.variant || get4(componentTheme, "defaultProps.variant");
    if (variant && componentTheme.variants && componentTheme.variants[variant]) {
      const colorScheme = props.colorScheme || get4(componentTheme, "defaultProps.colorScheme");
      let variantProps = componentTheme.variants[variant]({
        ...props,
        ...newProps,
        colorScheme,
        theme: theme3,
        ...colorModeProps
      });
      variantProps = extractProps(variantProps, theme3, colorModeProps, componentTheme, currentBreakpoint);
      newProps = mergeWith(newProps, variantProps, (objValue, srcValue, key) => {
        if (!isNil2(objValue)) {
          delete newProps[key];
        }
      });
      delete newProps.variant;
      delete newProps.colorScheme;
    }
  }
  let extractedProps = extractProps(props, theme3, colorModeProps, componentTheme, currentBreakpoint);
  newProps = mergeWith(newProps, extractedProps, (objValue, srcValue, key) => {
    if (!isNil2(objValue)) {
      delete newProps[key];
    }
  });
  newProps = mergeUnderscoreProps(newProps, props);
  return newProps;
}

// node_modules/native-base/src/hooks/useThemeProps/useProps.tsx
var filterAndCalculateProps = (theme3, colorModeProps, componentTheme, propsReceived, windowWidth) => {
  let [ignoredProps, props] = extractInObject(propsReceived, [
    "children",
    "style",
    "onPress",
    "icon",
    "onOpen",
    "onClose"
  ]);
  let newProps = calculateProps(theme3, colorModeProps, componentTheme, props, windowWidth);
  let mergedProps = filterShadowProps(newProps, ignoredProps, Platform2.OS);
  return omitUndefined(mergedProps);
};
function useThemeProps(component, propsReceived) {
  const { theme: theme3, ...colorModeProps } = useNativeBase();
  const componentTheme = get5(theme3, `components.${component}`);
  const windowWidth = useWindowDimensions()?.width;
  return filterAndCalculateProps(omit2(theme3, ["components"]), colorModeProps, componentTheme, propsReceived, windowWidth);
}

// node_modules/native-base/src/hooks/useThemeProps/usePropsResolution.tsx
import get6 from "lodash.get";
import merge2 from "lodash.merge";
import { Platform as Platform3 } from "react-native";

// node_modules/native-base/src/hooks/useBreakpointResolvedProps.ts
import React3 from "react";
var useBreakpointResolvedProps = (props) => {
  const currentBreakpoint = useNativeBaseConfig("useBreakpointResolvedProps").currentBreakpoint;
  const theme3 = useTheme();
  const newProps = React3.useMemo(() => {
    let newProps2 = {};
    for (let key in props) {
      const rawValue = props[key];
      const value = resolveValueWithBreakpoint(rawValue, theme3.breakpoints, currentBreakpoint, key);
      newProps2[key] = value;
    }
    return newProps2;
  }, [props, currentBreakpoint, theme3.breakpoints]);
  return newProps;
};

// node_modules/native-base/src/hooks/useThemeProps/propsFlattener.tsx
import merge from "lodash.merge";
var SPECIFICITY_100 = 100;
var SPECIFICITY_70 = 70;
var SPECIFICITY_60 = 60;
var SPECIFICITY_55 = 55;
var SPECIFICITY_50 = 50;
var SPECIFICITY_40 = 40;
var SPECIFICITY_30 = 30;
var SPECIFICITY_10 = 10;
var SPECIFICITY_1 = 1;
var specificityPrecedence = [
  SPECIFICITY_100,
  SPECIFICITY_70,
  SPECIFICITY_60,
  SPECIFICITY_55,
  SPECIFICITY_50,
  SPECIFICITY_40,
  SPECIFICITY_30,
  SPECIFICITY_10,
  SPECIFICITY_1
];
var INITIAL_PROP_SPECIFICITY = {
  [SPECIFICITY_100]: 0,
  [SPECIFICITY_70]: 0,
  [SPECIFICITY_60]: 0,
  [SPECIFICITY_50]: 0,
  [SPECIFICITY_55]: 0,
  [SPECIFICITY_40]: 0,
  [SPECIFICITY_30]: 0,
  [SPECIFICITY_10]: 0,
  [SPECIFICITY_1]: 0
};
var pseudoPropsMap = {
  _web: { dependentOn: "platform", priority: SPECIFICITY_10 },
  _ios: { dependentOn: "platform", priority: SPECIFICITY_10 },
  _android: { dependentOn: "platform", priority: SPECIFICITY_10 },
  _light: { dependentOn: "colormode", priority: SPECIFICITY_10 },
  _dark: { dependentOn: "colormode", priority: SPECIFICITY_10 },
  _indeterminate: {
    dependentOn: "state",
    respondTo: "isIndeterminate",
    priority: SPECIFICITY_30
  },
  _checked: {
    dependentOn: "state",
    respondTo: "isChecked",
    priority: SPECIFICITY_30
  },
  _loading: {
    dependentOn: "state",
    respondTo: "isLoading",
    priority: SPECIFICITY_30
  },
  _readOnly: {
    dependentOn: "state",
    respondTo: "isReadOnly",
    priority: SPECIFICITY_30
  },
  _invalid: {
    dependentOn: "state",
    respondTo: "isInvalid",
    priority: SPECIFICITY_40
  },
  _focus: {
    dependentOn: "state",
    respondTo: "isFocused",
    priority: SPECIFICITY_50
  },
  _focusVisible: {
    dependentOn: "state",
    respondTo: "isFocusVisible",
    priority: SPECIFICITY_55
  },
  _hover: {
    dependentOn: "state",
    respondTo: "isHovered",
    priority: SPECIFICITY_60
  },
  _pressed: {
    dependentOn: "state",
    respondTo: "isPressed",
    priority: SPECIFICITY_70
  },
  _disabled: {
    dependentOn: "state",
    respondTo: "isDisabled",
    priority: SPECIFICITY_100
  }
};
var compareSpecificity = (exisiting, upcoming, ignorebaseTheme) => {
  if (!exisiting)
    return true;
  if (!upcoming)
    return false;
  const condition = ignorebaseTheme ? specificityPrecedence.length - 1 : specificityPrecedence.length;
  for (let index = 0; index < condition; index++) {
    if (exisiting[specificityPrecedence[index]] > upcoming[specificityPrecedence[index]]) {
      return false;
    } else if (exisiting[specificityPrecedence[index]] < upcoming[specificityPrecedence[index]]) {
      return true;
    }
  }
  return true;
};
var shouldResolvePseudoProp = ({
  property,
  state,
  platform,
  colormode
}) => {
  if (pseudoPropsMap[property].dependentOn === "platform") {
    return property === `_${platform}`;
  } else if (pseudoPropsMap[property].dependentOn === "colormode") {
    return property === `_${colormode}`;
  } else if (pseudoPropsMap[property].dependentOn === "state") {
    return state[pseudoPropsMap[property].respondTo];
  } else {
    return false;
  }
};
var simplifyProps = ({
  props,
  colormode,
  platform,
  state,
  currentSpecificity,
  previouslyFlattenProps
}, flattenProps = {}, specificityMap = {}, priority) => {
  for (const property in props) {
    const propertySpecity = currentSpecificity ? { ...currentSpecificity } : {
      ...INITIAL_PROP_SPECIFICITY,
      [SPECIFICITY_1]: priority
    };
    if (state[pseudoPropsMap[property]?.respondTo] || ["_dark", "_light", "_web", "_ios", "_android"].includes(property)) {
      if (shouldResolvePseudoProp({ property, state, platform, colormode })) {
        propertySpecity[pseudoPropsMap[property].priority]++;
        simplifyProps({
          props: props[property],
          colormode,
          platform,
          state,
          currentSpecificity: propertySpecity,
          previouslyFlattenProps
        }, flattenProps, specificityMap, priority);
      }
    } else if (state[pseudoPropsMap[property]?.respondTo] === void 0) {
      if (property.startsWith("_")) {
        if (compareSpecificity(specificityMap[property], propertySpecity, false)) {
          specificityMap[property] = propertySpecity;
          flattenProps[property] = merge({}, flattenProps[property], props[property]);
        } else {
          flattenProps[property] = merge({}, props[property], flattenProps[property]);
        }
      } else {
        if (compareSpecificity(specificityMap[property], propertySpecity, false)) {
          specificityMap[property] = propertySpecity;
          flattenProps[property] = props[property];
        }
      }
    }
  }
};
var propsFlattener = ({
  props,
  colormode,
  platform,
  state,
  currentSpecificityMap,
  previouslyFlattenProps
}, priority) => {
  const flattenProps = {};
  for (const property in props) {
    if (state[pseudoPropsMap[property]?.respondTo] === void 0 && property.startsWith("_")) {
      flattenProps[property] = previouslyFlattenProps[property];
    }
  }
  const specificityMap = currentSpecificityMap || {};
  simplifyProps({
    props,
    colormode,
    platform,
    state,
    currentSpecificityMap,
    previouslyFlattenProps
  }, flattenProps, specificityMap, priority);
  return [flattenProps, specificityMap];
};

// node_modules/native-base/src/hooks/useResponsiveSSRProps.ts
import { useEffect as useEffect2, useState as useState2 } from "react";
function useResponsiveSSRProps(incomingProps) {
  const [modified, setModified] = useState2(false);
  const theme3 = useTheme();
  const responsivePropsExists = isResponsiveAnyProp(incomingProps, theme3);
  const isSSR = useNativeBaseConfig("useBreakpointResolvedProps").isSSR;
  let modifiedProps = incomingProps;
  if (responsivePropsExists && isSSR && !modified) {
    modifiedProps = { ...modifiedProps, key: Math.random() };
  }
  useEffect2(() => {
    if (responsivePropsExists && isSSR) {
      setModified(true);
    }
  }, [responsivePropsExists, isSSR]);
  return modifiedProps;
}

// node_modules/native-base/src/hooks/useThemeProps/usePropsResolution.tsx
var SPREAD_PROP_SPECIFICITY_ORDER = [
  "p",
  "padding",
  "px",
  "py",
  "pt",
  "pb",
  "pl",
  "pr",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "m",
  "margin",
  "mx",
  "my",
  "mt",
  "mb",
  "ml",
  "mr",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight"
];
var FINAL_SPREAD_PROPS = [
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight"
];
var MARGIN_MAP = {
  mx: ["marginRight", "marginLeft"],
  my: ["marginTop", "marginBottom"],
  mt: ["marginTop"],
  mb: ["marginBottom"],
  mr: ["marginRight"],
  ml: ["marginLeft"]
};
MARGIN_MAP.margin = [...MARGIN_MAP.mx, ...MARGIN_MAP.my];
MARGIN_MAP.m = MARGIN_MAP.margin;
MARGIN_MAP.marginTop = MARGIN_MAP.mt;
MARGIN_MAP.marginBottom = MARGIN_MAP.mb;
MARGIN_MAP.marginLeft = MARGIN_MAP.ml;
MARGIN_MAP.marginRight = MARGIN_MAP.mr;
var PADDING_MAP = {
  px: ["paddingRight", "paddingLeft"],
  py: ["paddingTop", "paddingBottom"],
  pt: ["paddingTop"],
  pb: ["paddingBottom"],
  pr: ["paddingRight"],
  pl: ["paddingLeft"]
};
PADDING_MAP.padding = [...PADDING_MAP.px, ...PADDING_MAP.py];
PADDING_MAP.p = PADDING_MAP.padding;
PADDING_MAP.paddingTop = PADDING_MAP.pt;
PADDING_MAP.paddingBottom = PADDING_MAP.pb;
PADDING_MAP.paddingLeft = PADDING_MAP.pl;
PADDING_MAP.paddingRight = PADDING_MAP.pr;
var SPREAD_PROP_SPECIFICITY_MAP = {
  ...PADDING_MAP,
  ...MARGIN_MAP
};
function propsSpreader(incomingProps, incomingSpecifity) {
  const flattenedDefaultProps = { ...incomingProps };
  const specificity = {};
  SPREAD_PROP_SPECIFICITY_ORDER.forEach((prop) => {
    if (prop in flattenedDefaultProps) {
      const val = incomingProps[prop] || flattenedDefaultProps[prop];
      if (!FINAL_SPREAD_PROPS.includes(prop)) {
        delete flattenedDefaultProps[prop];
        specificity[prop] = incomingSpecifity[prop];
      }
      SPREAD_PROP_SPECIFICITY_MAP[prop].forEach((newProp) => {
        if (compareSpecificity(specificity[newProp], specificity[prop])) {
          specificity[newProp] = incomingSpecifity[prop];
          flattenedDefaultProps[newProp] = val;
        }
      });
    }
  });
  return merge2({}, flattenedDefaultProps);
}
function usePropsResolution(component, incomingProps, state, config2) {
  const { theme: theme3 } = useNativeBase();
  const componentTheme = config2?.componentTheme ?? get6(theme3, `components.${component}`, {});
  return usePropsResolutionWithComponentTheme(componentTheme, incomingProps, state, config2);
}
var usePropsResolutionWithComponentTheme = (componentTheme, incomingProps, state, config2) => {
  const modifiedPropsForSSR = useResponsiveSSRProps(incomingProps);
  const [ignoredProps, cleanIncomingProps] = extractInObject(modifiedPropsForSSR, ["children", "onPress", "icon", "onOpen", "onClose"].concat(config2?.ignoreProps || []));
  const resolveResponsively = [
    "colorScheme",
    "size",
    "variant",
    ...config2?.resolveResponsively || []
  ];
  const { theme: theme3 } = useNativeBase();
  const colorModeProps = useColorMode();
  const incomingWithDefaultProps = merge2({}, componentTheme.defaultProps || {}, cleanIncomingProps);
  let [flattenProps, specificityMap] = propsFlattener({
    props: incomingWithDefaultProps,
    platform: Platform3.OS,
    colormode: colorModeProps.colorMode,
    state: state || {},
    previouslyFlattenProps: {}
  }, 2);
  const responsiveProps = {};
  resolveResponsively.map((propsName) => {
    if (flattenProps[propsName]) {
      responsiveProps[propsName] = flattenProps[propsName];
    }
  });
  const responsivelyResolvedProps = useBreakpointResolvedProps(responsiveProps);
  flattenProps = {
    ...flattenProps,
    ...responsivelyResolvedProps
  };
  let componentBaseStyle = {}, flattenBaseStyle, baseSpecificityMap;
  if (componentTheme.baseStyle) {
    componentBaseStyle = typeof componentTheme.baseStyle !== "function" ? componentTheme.baseStyle : componentTheme.baseStyle({
      theme: theme3,
      ...flattenProps,
      ...colorModeProps
    });
    [flattenBaseStyle, baseSpecificityMap] = propsFlattener({
      props: componentBaseStyle,
      platform: Platform3.OS,
      colormode: colorModeProps.colorMode,
      state: state || {},
      currentSpecificityMap: specificityMap,
      previouslyFlattenProps: flattenProps
    }, 1);
  }
  const variant = flattenProps.variant;
  let componentVariantProps = {}, flattenVariantStyle, variantSpecificityMap;
  if (variant && componentTheme.variants && componentTheme.variants[variant]) {
    componentVariantProps = typeof componentTheme.variants[variant] !== "function" ? componentTheme.variants[variant] : componentTheme.variants[variant]({
      theme: theme3,
      ...flattenProps,
      ...colorModeProps
    });
    [flattenVariantStyle, variantSpecificityMap] = propsFlattener({
      props: componentVariantProps,
      platform: Platform3.OS,
      colormode: colorModeProps.colorMode,
      state: state || {},
      currentSpecificityMap: baseSpecificityMap || specificityMap,
      previouslyFlattenProps: flattenProps
    }, 1);
    flattenProps.variant = void 0;
  }
  const size = flattenProps.size;
  let componentSizeProps = {}, flattenSizeStyle, sizeSpecificityMap;
  if (size && componentTheme.sizes && componentTheme.sizes[size]) {
    if (typeof componentTheme.sizes[size] === "string" || typeof componentTheme.sizes[size] === "number") {
      flattenProps.size = componentTheme.sizes[size];
    } else if (typeof componentTheme.sizes[size] === "function") {
      flattenProps.size = void 0;
      componentSizeProps = componentTheme.sizes[size]({
        theme: theme3,
        ...flattenProps,
        ...colorModeProps
      });
    } else {
      flattenProps.size = void 0;
      componentSizeProps = componentTheme.sizes[size];
    }
    [flattenSizeStyle, sizeSpecificityMap] = propsFlattener({
      props: componentSizeProps,
      platform: Platform3.OS,
      colormode: colorModeProps.colorMode,
      state: state || {},
      currentSpecificityMap: variantSpecificityMap || baseSpecificityMap || specificityMap,
      previouslyFlattenProps: flattenProps
    }, 1);
  }
  const defaultStyles2 = merge2({}, flattenBaseStyle, flattenVariantStyle, flattenSizeStyle);
  for (const prop in defaultStyles2) {
    delete flattenProps[prop];
  }
  const defaultSpecificity = merge2({}, specificityMap, baseSpecificityMap, variantSpecificityMap, sizeSpecificityMap);
  flattenProps = propsSpreader({ ...defaultStyles2, ...flattenProps }, defaultSpecificity);
  let ignore = [];
  if (flattenProps.bg?.linearGradient || flattenProps.background?.linearGradient || flattenProps.bgColor?.linearGradient || flattenProps.backgroundColor?.linearGradient) {
    let bgProp = "bg";
    if (flattenProps.background?.linearGradient) {
      bgProp = "background";
    } else if (flattenProps.bgColor?.linearGradient) {
      bgProp = "bgColor";
    } else if (flattenProps.backgroundColor?.linearGradient) {
      bgProp = "backgroundColor";
    }
    flattenProps[bgProp].linearGradient.colors = flattenProps[bgProp].linearGradient.colors.map((color2) => {
      return get6(theme3.colors, color2, color2);
    });
    ignore = ["bg", "background", "backgroundColor", "bgColor"];
  }
  const [gradientProps] = extractInObject(flattenProps, ignore);
  const bgColor = flattenProps.bg ?? flattenProps.backgroundColor ?? flattenProps.bgColor;
  const contrastTextColor = useContrastText(bgColor, flattenProps?._text?.color);
  flattenProps._text = contrastTextColor && flattenProps?._text?.color === void 0 ? {
    color: contrastTextColor,
    ...flattenProps._text
  } : flattenProps._text;
  const resolvedProps = omitUndefined({
    ...flattenProps,
    ...ignoredProps,
    ...gradientProps
  });
  return resolvedProps;
};

// node_modules/native-base/src/hooks/useThemeProps/usePropsWithComponentTheme.ts
function usePropsWithComponentTheme(localTheme, propsReceived) {
  return usePropsResolutionWithComponentTheme(localTheme, propsReceived);
}

// node_modules/native-base/src/components/primitives/Text/index.tsx
import React12, { memo, forwardRef, useRef } from "react";
import { useHover } from "@react-native-aria/interactions";

// node_modules/native-base/src/utils/mergeRefs.ts
function mergeRefs(refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
function composeEventHandlers(originalEventHandler, ourEventHandler) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    ourEventHandler?.(event);
  };
}

// node_modules/native-base/src/utils/styled.tsx
import React11 from "react";

// node_modules/native-base/src/hooks/useClipboard.ts
import React4 from "react";
import { Clipboard } from "react-native";
function useClipboard() {
  const [hasCopied, setHasCopied] = React4.useState(false);
  const [value, setValue] = React4.useState("");
  const onCopy = async (copiedValue) => {
    if (Clipboard) {
      await Clipboard.setString(copiedValue);
    }
    setValue(copiedValue);
    setHasCopied(true);
  };
  return {
    value,
    onCopy,
    hasCopied
  };
}

// node_modules/native-base/src/hooks/useDisclose.ts
import React5 from "react";
function useDisclose(initState) {
  const [isOpen, setIsOpen] = React5.useState(initState || false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const onToggle = () => {
    setIsOpen(!isOpen);
  };
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle
  };
}

// node_modules/native-base/src/hooks/useMediaQuery.ts
import { useWindowDimensions as useWindowDimensions2 } from "react-native";
import isNil3 from "lodash.isnil";
function useMediaQuery(query) {
  let dims = useWindowDimensions2();
  const height = dims?.height;
  const width = dims?.width;
  return iterateQuery(query, height, width);
}
function iterateQuery(query, height, width) {
  let key;
  let val;
  let queryResults = [];
  if (Array.isArray(query)) {
    query.forEach((subQuery) => {
      key = Object.keys(subQuery)[0];
      val = Object.values(subQuery)[0];
      queryResults.push(calculateQuery(key, val, height, width));
    });
  } else {
    key = Object.keys(query)[0];
    val = Object.values(query)[0];
    queryResults.push(calculateQuery(key, val, height, width));
  }
  return queryResults;
}
function calculateQuery(key, val, height, width) {
  let retval;
  if (isNil3(width) || isNil3(height) || isNil3(val)) {
    return;
  }
  switch (key) {
    case "maxWidth":
      retval = !isNil3(val) ? width <= val : void 0;
      break;
    case "minWidth":
      retval = !isNil3(val) ? width >= val : void 0;
      break;
    case "maxHeight":
      retval = !isNil3(val) ? height <= val : void 0;
      break;
    case "minHeight":
      retval = !isNil3(val) ? height >= val : void 0;
      break;
    case "orientation":
      if (!isNil3(val)) {
        if (width > height) {
          retval = val === "landscape";
        } else {
          retval = val === "portrait";
        }
      }
      break;
    default:
      break;
  }
  return retval;
}

// node_modules/native-base/src/hooks/useBreakpointValue.ts
import { useWindowDimensions as useWindowDimensions3 } from "react-native";
function useBreakpointValue(values) {
  let windowWidth = useWindowDimensions3()?.width;
  const theme3 = useTheme();
  if (hasValidBreakpointFormat(values, theme3.breakpoints)) {
    let currentBreakpoint = getClosestBreakpoint(theme3.breakpoints, windowWidth);
    return findLastValidBreakpoint(values, theme3.breakpoints, currentBreakpoint);
  } else {
    return values;
  }
}

// node_modules/native-base/src/hooks/usePlatformProps.ts
import merge3 from "lodash.merge";
import { Platform as Platform4 } from "react-native";
var usePlatformProps = (props) => {
  const { _web, _ios, _android, ...remainingProps } = props;
  const platformProps = () => {
    switch (Platform4.OS) {
      case "web":
        return _web;
      case "ios":
        return _ios;
      case "android":
        return _android;
      default:
        return {};
    }
  };
  return merge3(remainingProps, platformProps());
};

// node_modules/native-base/src/theme/styled-system.ts
import { Platform as Platform5, StyleSheet } from "react-native";
import get7 from "lodash.get";
import has from "lodash.has";

// node_modules/native-base/src/core/StrictMode.ts
var tokenNotString = "tokenNotString";
var tokenNotFound = "tokenNotFound";
var strictModeLogger = ({
  token,
  scale,
  mode: mode2,
  type
}) => {
  if (!mode2) {
    mode2 = "off";
  }
  if (mode2 === "off")
    return;
  const log = console[mode2];
  switch (type) {
    case tokenNotFound:
      log(`Token ${token} not found in theme scale of ${scale}. Please use extendTheme function to add this token in your theme`);
      return;
    case tokenNotString:
      log(`Token ${token} should be passed as a string.`);
      return;
    default:
      return;
  }
};

// node_modules/native-base/src/theme/styled-system.ts
var isNumber = (n) => typeof n === "number" && !isNaN(n);
var getColor2 = (rawValue, scale, theme3) => {
  const alphaMatched = typeof rawValue === "string" ? rawValue?.match(/:alpha\.\d\d?\d?/) : false;
  if (alphaMatched) {
    const colorMatched = rawValue?.match(/^.*?(?=:alpha)/);
    const color2 = colorMatched ? colorMatched[0] : colorMatched;
    const alphaValue = alphaMatched[0].split(".")[1];
    const alphaFromToken = get7(theme3.opacity, alphaValue, alphaValue);
    const alpha = alphaFromToken ? parseFloat(alphaFromToken) : 1;
    const newColor = transparentize(color2, alpha)(theme3);
    return newColor;
  } else {
    return get7(scale, rawValue, rawValue);
  }
};
var getMargin = (n, scale) => {
  n = convertStringNumberToNumber("margin", n);
  if (!isNumber(n)) {
    return get7(scale, n, n);
  }
  const isNegative = n < 0;
  const absolute = Math.abs(n);
  const value = get7(scale, absolute, absolute);
  if (!isNumber(value)) {
    return isNegative ? "-" + value : value;
  }
  return value * (isNegative ? -1 : 1);
};
var layout = {
  width: {
    property: "width",
    scale: "sizes"
  },
  w: {
    property: "width",
    scale: "sizes"
  },
  height: {
    property: "height",
    scale: "sizes"
  },
  h: {
    property: "height",
    scale: "sizes"
  },
  minWidth: {
    property: "minWidth",
    scale: "sizes"
  },
  minW: {
    property: "minWidth",
    scale: "sizes"
  },
  minHeight: {
    property: "minHeight",
    scale: "sizes"
  },
  minH: {
    property: "minHeight",
    scale: "sizes"
  },
  maxWidth: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes"
  },
  maxHeight: {
    property: "maxHeight",
    scale: "sizes"
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes"
  },
  size: {
    properties: ["width", "height"],
    scale: "sizes"
  },
  boxSize: {
    properties: ["width", "height"],
    scale: "sizes"
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  textAlign: true
};
var flexbox = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flexDir: {
    property: "flexDirection"
  },
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  justifySelf: true,
  alignSelf: true,
  order: true
};
var position = {
  position: true,
  zIndex: {
    property: "zIndex",
    scale: "zIndices"
  },
  top: {
    property: "top",
    scale: "space"
  },
  right: {
    property: "right",
    scale: "space"
  },
  bottom: {
    property: "bottom",
    scale: "space"
  },
  left: {
    property: "left",
    scale: "space"
  }
};
var color = {
  color: {
    property: "color",
    scale: "colors",
    transformer: getColor2
  },
  tintColor: {
    property: "tintColor",
    scale: "colors",
    transformer: getColor2
  },
  backgroundColor: {
    property: "backgroundColor",
    scale: "colors",
    transformer: getColor2
  },
  opacity: {
    property: "opacity",
    scale: "opacity"
  },
  bg: {
    property: "backgroundColor",
    scale: "colors",
    transformer: getColor2
  },
  bgColor: {
    property: "backgroundColor",
    scale: "colors",
    transformer: getColor2
  },
  background: {
    property: "backgroundColor",
    scale: "colors",
    transformer: getColor2
  }
};
var border = {
  borderWidth: {
    property: "borderWidth",
    scale: "borderWidths"
  },
  borderStyle: {
    property: "borderStyle",
    scale: "borderStyles"
  },
  borderColor: {
    property: "borderColor",
    scale: "colors",
    transformer: getColor2
  },
  borderRadius: {
    property: "borderRadius",
    scale: "radii"
  },
  borderTop: {
    property: "borderTop",
    scale: "borders"
  },
  borderTopRadius: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  borderLeftRadius: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  borderRightRadius: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  borderTopLeftRadius: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  borderTopRightRadius: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  borderRight: {
    property: "borderRight",
    scale: "borders"
  },
  borderBottom: {
    property: "borderBottom",
    scale: "borders"
  },
  borderBottomLeftRadius: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  borderBottomRightRadius: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  borderLeft: {
    property: "borderLeft",
    scale: "borders"
  },
  borderX: {
    properties: ["borderLeft", "borderRight"],
    scale: "borders"
  },
  borderY: {
    properties: ["borderTop", "borderBottom"],
    scale: "borders"
  },
  borderTopWidth: {
    property: "borderTopWidth",
    scale: "borderWidths"
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors",
    transformer: getColor2
  },
  borderTopStyle: {
    property: "borderTopStyle",
    scale: "borderStyles"
  },
  borderBottomWidth: {
    property: "borderBottomWidth",
    scale: "borderWidths"
  },
  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors",
    transformer: getColor2
  },
  borderBottomStyle: {
    property: "borderBottomStyle",
    scale: "borderStyles"
  },
  borderLeftWidth: {
    property: "borderLeftWidth",
    scale: "borderWidths"
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors",
    transformer: getColor2
  },
  borderLeftStyle: {
    property: "borderLeftStyle",
    scale: "borderStyles"
  },
  borderRightWidth: {
    property: "borderRightWidth",
    scale: "borderWidths"
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors",
    transformer: getColor2
  },
  borderRightStyle: {
    property: "borderRightStyle",
    scale: "borderStyles"
  },
  rounded: {
    property: "borderRadius",
    scale: "radii"
  },
  roundedTopLeft: {
    property: "borderTopLeftRadius",
    scale: "radii"
  },
  roundedTopRight: {
    property: "borderTopRightRadius",
    scale: "radii"
  },
  roundedBottomLeft: {
    property: "borderBottomLeftRadius",
    scale: "radii"
  },
  roundedBottomRight: {
    property: "borderBottomRightRadius",
    scale: "radii"
  },
  roundedTop: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii"
  },
  borderBottomRadius: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedBottom: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii"
  },
  roundedLeft: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii"
  },
  roundedRight: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii"
  }
};
var background = {
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  bgImage: {
    property: "backgroundImage"
  },
  bgImg: {
    property: "backgroundImage"
  },
  bgBlendMode: {
    property: "backgroundBlendMode"
  },
  bgSize: {
    property: "backgroundSize"
  },
  bgPosition: {
    property: "backgroundPosition"
  },
  bgPos: {
    property: "backgroundPosition"
  },
  bgRepeat: {
    property: "backgroundRepeat"
  },
  bgAttachment: {
    property: "backgroundAttachment"
  }
};
var space = {
  margin: {
    property: "margin",
    scale: "space",
    transformer: getMargin
  },
  m: {
    property: "margin",
    scale: "space",
    transformer: getMargin
  },
  marginTop: {
    property: "marginTop",
    scale: "space",
    transformer: getMargin
  },
  mt: {
    property: "marginTop",
    scale: "space",
    transformer: getMargin
  },
  marginRight: {
    property: "marginRight",
    scale: "space",
    transformer: getMargin
  },
  mr: {
    property: "marginRight",
    scale: "space",
    transformer: getMargin
  },
  marginBottom: {
    property: "marginBottom",
    scale: "space",
    transformer: getMargin
  },
  mb: {
    property: "marginBottom",
    scale: "space",
    transformer: getMargin
  },
  marginLeft: {
    property: "marginLeft",
    scale: "space",
    transformer: getMargin
  },
  ml: {
    property: "marginLeft",
    scale: "space",
    transformer: getMargin
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    scale: "space",
    transformer: getMargin
  },
  mx: {
    properties: ["marginLeft", "marginRight"],
    scale: "space",
    transformer: getMargin
  },
  marginY: {
    properties: ["marginTop", "marginBottom"],
    scale: "space",
    transformer: getMargin
  },
  my: {
    properties: ["marginTop", "marginBottom"],
    scale: "space",
    transformer: getMargin
  },
  padding: {
    property: "padding",
    scale: "space"
  },
  p: {
    property: "padding",
    scale: "space"
  },
  paddingTop: {
    property: "paddingTop",
    scale: "space"
  },
  pt: {
    property: "paddingTop",
    scale: "space"
  },
  paddingRight: {
    property: "paddingRight",
    scale: "space"
  },
  pr: {
    property: "paddingRight",
    scale: "space"
  },
  paddingBottom: {
    property: "paddingBottom",
    scale: "space"
  },
  pb: {
    property: "paddingBottom",
    scale: "space"
  },
  paddingLeft: {
    property: "paddingLeft",
    scale: "space"
  },
  pl: {
    property: "paddingLeft",
    scale: "space"
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  px: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space"
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  },
  py: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space"
  }
};
var typography2 = {
  fontFamily: {
    property: "fontFamily",
    scale: "fonts"
  },
  fontSize: {
    property: "fontSize",
    scale: "fontSizes"
  },
  fontWeight: {
    property: "fontWeight",
    scale: "fontWeights",
    transformer: (val, scale) => {
      return val ? get7(scale, val, val).toString() : val;
    }
  },
  lineHeight: {
    property: "lineHeight",
    scale: "lineHeights"
  },
  letterSpacing: {
    property: "letterSpacing",
    scale: "letterSpacings"
  },
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: { property: "textDecorationLine" },
  txtDecor: { property: "textDecorationLine" },
  textDecorationLine: true
};
var extraProps = {
  outline: true,
  outlineWidth: true,
  shadow: {
    scale: "shadows"
  },
  cursor: true,
  overflow: true
};
var propConfig = {
  ...color,
  ...space,
  ...layout,
  ...flexbox,
  ...border,
  ...position,
  ...typography2,
  ...background,
  ...extraProps
};
var convertStringNumberToNumber = (key, value) => {
  if (typeof value === "string" && key !== "fontWeight" && value && !isNaN(Number(value))) {
    return parseFloat(value);
  }
  return value;
};
var getStyleAndFilteredProps = ({
  style,
  theme: theme3,
  debug,
  currentBreakpoint,
  strictMode,
  ...props
}) => {
  let styleFromProps = {};
  const restProps = {};
  for (const key in props) {
    const rawValue = props[key];
    if (key in propConfig) {
      const value = resolveValueWithBreakpoint(rawValue, theme3.breakpoints, currentBreakpoint, key);
      const config2 = propConfig[key];
      if (config2 === true) {
        styleFromProps = {
          ...styleFromProps,
          [key]: convertStringNumberToNumber(key, value)
        };
      } else if (config2) {
        const { property, scale, properties, transformer } = config2;
        let val = value;
        const strictModeProps = {
          token: value,
          scale,
          mode: strictMode,
          type: "tokenNotFound"
        };
        if (transformer) {
          val = transformer(val, theme3[scale], theme3, props.fontSize, strictModeProps);
        } else {
          if (!has(theme3[scale], value) && typeof value !== "undefined") {
            strictModeLogger(strictModeProps);
          }
          val = get7(theme3[scale], value, value);
        }
        if (typeof val === "string") {
          if (val.endsWith("px")) {
            val = parseFloat(val);
          } else if (val.endsWith("em") && Platform5.OS !== "web") {
            const fontSize = resolveValueWithBreakpoint(props.fontSize, theme3.breakpoints, currentBreakpoint, key);
            val = parseFloat(val) * parseFloat(get7(theme3.fontSizes, fontSize, fontSize));
          }
        }
        if (typeof value !== "string" && typeof value !== "undefined") {
          strictModeLogger({
            ...strictModeProps,
            type: "tokenNotString"
          });
        }
        val = convertStringNumberToNumber(key, val);
        if (properties) {
          properties.forEach((property2) => {
            styleFromProps = {
              ...styleFromProps,
              [property2]: val
            };
          });
        } else if (property) {
          styleFromProps = {
            ...styleFromProps,
            [property]: val
          };
        } else {
          styleFromProps = {
            ...styleFromProps,
            ...val
          };
        }
      }
    } else {
      restProps[key] = rawValue;
    }
  }
  if (debug) {
    console.log("style ", debug + " :: ", styleFromProps, style, props);
  }
  return {
    styleSheet: StyleSheet.create({ box: styleFromProps }),
    restProps
  };
};

// node_modules/native-base/src/hooks/useStyledSystemPropsResolver.ts
import React6 from "react";
var useStyledSystemPropsResolver = ({
  style: propStyle,
  debug,
  ...props
}) => {
  const theme3 = useTheme();
  const { currentBreakpoint, config: config2 } = useNativeBaseConfig("makeStyledComponent");
  const strictMode = config2.strictMode;
  const { style, restProps } = React6.useMemo(() => {
    const { styleSheet, restProps: restProps2 } = getStyleAndFilteredProps({
      ...props,
      theme: theme3,
      debug,
      currentBreakpoint,
      strictMode
    });
    if (propStyle) {
      return { style: [styleSheet.box, propStyle], restProps: restProps2 };
    } else {
      return { style: styleSheet.box, restProps: restProps2 };
    }
  }, [props, theme3, debug, currentBreakpoint, strictMode, propStyle]);
  if (debug) {
    console.log("style,resprops", currentBreakpoint);
  }
  return [style, restProps];
};

// node_modules/native-base/src/hooks/useControllableProp.ts
import React7 from "react";
function useControllableProp(prop, state) {
  const { current: isControlled } = React7.useRef(prop !== void 0);
  const value = isControlled && typeof prop !== "undefined" ? prop : state;
  return [isControlled, value];
}
function useControllableState(props) {
  const { value: valueProp, defaultValue, onChange } = props;
  const [valueState, setValue] = React7.useState(defaultValue);
  const isControlled = valueProp !== void 0;
  const value = isControlled ? valueProp : valueState;
  const updateValue = React7.useCallback((next) => {
    const nextValue = typeof next === "function" ? next(value) : next;
    if (!isControlled) {
      setValue(nextValue);
    }
    onChange && onChange(nextValue);
  }, [isControlled, onChange, value]);
  return [value, updateValue];
}

// node_modules/native-base/src/hooks/useThemeProps/usePropsResolutionTest.tsx
import get8 from "lodash.get";
import merge5 from "lodash.merge";
import { Platform as Platform6 } from "react-native";

// node_modules/native-base/src/hooks/useThemeProps/propsFlattenerTest.tsx
import merge4 from "lodash.merge";
var SPECIFICITY_1002 = 100;
var SPECIFICITY_702 = 70;
var SPECIFICITY_602 = 60;
var SPECIFICITY_552 = 55;
var SPECIFICITY_502 = 50;
var SPECIFICITY_402 = 40;
var SPECIFICITY_302 = 30;
var SPECIFICITY_102 = 10;
var SPECIFICITY_12 = 1;
var specificityPrecedence2 = [
  SPECIFICITY_1002,
  SPECIFICITY_702,
  SPECIFICITY_602,
  SPECIFICITY_552,
  SPECIFICITY_502,
  SPECIFICITY_402,
  SPECIFICITY_302,
  SPECIFICITY_102,
  SPECIFICITY_12
];
var INITIAL_PROP_SPECIFICITY2 = {
  [SPECIFICITY_1002]: 0,
  [SPECIFICITY_702]: 0,
  [SPECIFICITY_602]: 0,
  [SPECIFICITY_502]: 0,
  [SPECIFICITY_552]: 0,
  [SPECIFICITY_402]: 0,
  [SPECIFICITY_302]: 0,
  [SPECIFICITY_102]: 0,
  [SPECIFICITY_12]: 0
};
var pseudoPropsMap2 = {
  _web: { dependentOn: "platform", priority: SPECIFICITY_102 },
  _ios: { dependentOn: "platform", priority: SPECIFICITY_102 },
  _android: { dependentOn: "platform", priority: SPECIFICITY_102 },
  _light: { dependentOn: "colormode", priority: SPECIFICITY_102 },
  _dark: { dependentOn: "colormode", priority: SPECIFICITY_102 },
  _indeterminate: {
    dependentOn: "state",
    respondTo: "isIndeterminate",
    priority: SPECIFICITY_302
  },
  _checked: {
    dependentOn: "state",
    respondTo: "isChecked",
    priority: SPECIFICITY_302
  },
  _readOnly: {
    dependentOn: "state",
    respondTo: "isReadOnly",
    priority: SPECIFICITY_302
  },
  _invalid: {
    dependentOn: "state",
    respondTo: "isInvalid",
    priority: SPECIFICITY_402
  },
  _focus: {
    dependentOn: "state",
    respondTo: "isFocused",
    priority: SPECIFICITY_502
  },
  _focusVisible: {
    dependentOn: "state",
    respondTo: "isFocusVisible",
    priority: SPECIFICITY_552
  },
  _hover: {
    dependentOn: "state",
    respondTo: "isHovered",
    priority: SPECIFICITY_602
  },
  _pressed: {
    dependentOn: "state",
    respondTo: "isPressed",
    priority: SPECIFICITY_702
  },
  _disabled: {
    dependentOn: "state",
    respondTo: "isDisabled",
    priority: SPECIFICITY_1002
  }
};
var compareSpecificity2 = (exisiting, upcoming, ignorebaseTheme) => {
  if (!exisiting)
    return true;
  if (!upcoming)
    return false;
  const condition = ignorebaseTheme ? specificityPrecedence2.length - 1 : specificityPrecedence2.length;
  for (let index = 0; index < condition; index++) {
    if (exisiting[specificityPrecedence2[index]] > upcoming[specificityPrecedence2[index]]) {
      return false;
    } else if (exisiting[specificityPrecedence2[index]] < upcoming[specificityPrecedence2[index]]) {
      return true;
    }
  }
  return true;
};
var shouldResolvePseudoProp2 = ({
  property,
  state,
  platform,
  colormode
}) => {
  if (pseudoPropsMap2[property].dependentOn === "platform") {
    return property === `_${platform}`;
  } else if (pseudoPropsMap2[property].dependentOn === "colormode") {
    return property === `_${colormode}`;
  } else if (pseudoPropsMap2[property].dependentOn === "state") {
    return state[pseudoPropsMap2[property].respondTo];
  } else {
    return false;
  }
};
var simplifyProps2 = ({
  props,
  colormode,
  platform,
  state,
  currentSpecificity,
  previouslyFlattenProps
}, flattenProps = {}, specificityMap = {}, priority) => {
  for (const property in props) {
    const propertySpecity = currentSpecificity ? { ...currentSpecificity } : {
      ...INITIAL_PROP_SPECIFICITY2,
      [SPECIFICITY_12]: priority
    };
    if (state[pseudoPropsMap2[property]?.respondTo] || ["_dark", "_light", "_web", "_ios", "_android"].includes(property)) {
      if (shouldResolvePseudoProp2({ property, state, platform, colormode })) {
        propertySpecity[pseudoPropsMap2[property].priority]++;
        simplifyProps2({
          props: props[property],
          colormode,
          platform,
          state,
          currentSpecificity: propertySpecity,
          previouslyFlattenProps
        }, flattenProps, specificityMap, priority);
      }
    } else if (state[pseudoPropsMap2[property]?.respondTo] === void 0) {
      if (property.startsWith("_")) {
        if (compareSpecificity2(specificityMap[property], propertySpecity, false)) {
          specificityMap[property] = propertySpecity;
          flattenProps[property] = merge4({}, flattenProps[property], props[property]);
        } else {
          flattenProps[property] = merge4({}, props[property], flattenProps[property]);
        }
      } else {
        if (compareSpecificity2(specificityMap[property], propertySpecity, false)) {
          specificityMap[property] = propertySpecity;
          flattenProps[property] = props[property];
        }
      }
    }
  }
};
var propsFlattener2 = ({
  props,
  colormode,
  platform,
  state,
  currentSpecificityMap,
  previouslyFlattenProps
}, priority) => {
  const flattenProps = {};
  for (const property in props) {
    if (state[pseudoPropsMap2[property]?.respondTo] === void 0 && property.startsWith("_")) {
      flattenProps[property] = previouslyFlattenProps[property];
    }
  }
  const specificityMap = currentSpecificityMap || {};
  simplifyProps2({
    props,
    colormode,
    platform,
    state,
    currentSpecificityMap,
    previouslyFlattenProps
  }, flattenProps, specificityMap, priority);
  return [flattenProps, specificityMap];
};

// node_modules/native-base/src/hooks/useThemeProps/usePropsResolutionTest.tsx
var SPREAD_PROP_SPECIFICITY_ORDER2 = [
  "p",
  "padding",
  "px",
  "py",
  "pt",
  "pb",
  "pl",
  "pr",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "m",
  "margin",
  "mx",
  "my",
  "mt",
  "mb",
  "ml",
  "mr",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight"
];
var FINAL_SPREAD_PROPS2 = [
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight"
];
var MARGIN_MAP2 = {
  mx: ["marginRight", "marginLeft"],
  my: ["marginTop", "marginBottom"],
  mt: ["marginTop"],
  mb: ["marginBottom"],
  mr: ["marginRight"],
  ml: ["marginLeft"]
};
MARGIN_MAP2.margin = [...MARGIN_MAP2.mx, ...MARGIN_MAP2.my];
MARGIN_MAP2.m = MARGIN_MAP2.margin;
MARGIN_MAP2.marginTop = MARGIN_MAP2.mt;
MARGIN_MAP2.marginBottom = MARGIN_MAP2.mb;
MARGIN_MAP2.marginLeft = MARGIN_MAP2.ml;
MARGIN_MAP2.marginRight = MARGIN_MAP2.mr;
var PADDING_MAP2 = {
  px: ["paddingRight", "paddingLeft"],
  py: ["paddingTop", "paddingBottom"],
  pt: ["paddingTop"],
  pb: ["paddingBottom"],
  pr: ["paddingRight"],
  pl: ["paddingLeft"]
};
PADDING_MAP2.padding = [...PADDING_MAP2.px, ...PADDING_MAP2.py];
PADDING_MAP2.p = PADDING_MAP2.padding;
PADDING_MAP2.paddingTop = PADDING_MAP2.pt;
PADDING_MAP2.paddingBottom = PADDING_MAP2.pb;
PADDING_MAP2.paddingLeft = PADDING_MAP2.pl;
PADDING_MAP2.paddingRight = PADDING_MAP2.pr;
var SPREAD_PROP_SPECIFICITY_MAP2 = {
  ...PADDING_MAP2,
  ...MARGIN_MAP2
};
function propsSpreader2(incomingProps, incomingSpecifity) {
  const flattenedDefaultProps = { ...incomingProps };
  const specificity = {};
  SPREAD_PROP_SPECIFICITY_ORDER2.forEach((prop) => {
    if (prop in flattenedDefaultProps) {
      const val = incomingProps[prop] || flattenedDefaultProps[prop];
      if (!FINAL_SPREAD_PROPS2.includes(prop)) {
        delete flattenedDefaultProps[prop];
        specificity[prop] = incomingSpecifity[prop];
      }
      SPREAD_PROP_SPECIFICITY_MAP2[prop].forEach((newProp) => {
        if (compareSpecificity2(specificity[newProp], specificity[prop])) {
          specificity[newProp] = incomingSpecifity[prop];
          flattenedDefaultProps[newProp] = val;
        }
      });
    }
  });
  return merge5({}, flattenedDefaultProps);
}
function usePropsResolutionTest(component, incomingProps, state, config2) {
  const [ignoredProps, cleanIncomingProps] = extractInObject(incomingProps, ["children", "onPress", "icon", "onOpen", "onClose"].concat(config2?.ignoreProps || []));
  const resolveResponsively = [
    "colorScheme",
    "size",
    "variant",
    ...config2?.resolveResponsively || []
  ];
  const { theme: theme3 } = useNativeBase();
  const colorModeProps = useColorMode();
  const componentTheme = get8(theme3, `components.${component}`, {});
  const incomingWithDefaultProps = merge5({}, componentTheme.defaultProps || {}, cleanIncomingProps);
  let [flattenProps, specificityMap] = propsFlattener2({
    props: incomingWithDefaultProps,
    platform: Platform6.OS,
    colormode: colorModeProps.colorMode,
    state: state || {},
    previouslyFlattenProps: {}
  }, 2);
  const responsiveProps = {};
  resolveResponsively.map((propsName) => {
    if (flattenProps[propsName]) {
      responsiveProps[propsName] = flattenProps[propsName];
    }
  });
  const responsivelyResolvedProps = useBreakpointResolvedProps(responsiveProps);
  flattenProps = {
    ...flattenProps,
    ...responsivelyResolvedProps
  };
  let componentBaseStyle = {}, flattenBaseStyle, baseSpecificityMap;
  if (componentTheme.baseStyle) {
    componentBaseStyle = typeof componentTheme.baseStyle !== "function" ? componentTheme.baseStyle : componentTheme.baseStyle({
      theme: theme3,
      ...flattenProps,
      ...colorModeProps
    });
    [flattenBaseStyle, baseSpecificityMap] = propsFlattener2({
      props: componentBaseStyle,
      platform: Platform6.OS,
      colormode: colorModeProps.colorMode,
      state: state || {},
      currentSpecificityMap: specificityMap,
      previouslyFlattenProps: flattenProps
    }, 1);
  }
  const variant = flattenProps.variant;
  let componentVariantProps = {}, flattenVariantStyle, variantSpecificityMap;
  if (variant && componentTheme.variants && componentTheme.variants[variant]) {
    componentVariantProps = typeof componentTheme.variants[variant] !== "function" ? componentTheme.variants[variant] : componentTheme.variants[variant]({
      theme: theme3,
      ...flattenProps,
      ...colorModeProps
    });
    [flattenVariantStyle, variantSpecificityMap] = propsFlattener2({
      props: componentVariantProps,
      platform: Platform6.OS,
      colormode: colorModeProps.colorMode,
      state: state || {},
      currentSpecificityMap: baseSpecificityMap || specificityMap,
      previouslyFlattenProps: flattenProps
    }, 1);
    flattenProps.variant = void 0;
  }
  const size = flattenProps.size;
  let componentSizeProps = {}, flattenSizeStyle, sizeSpecificityMap;
  if (size && componentTheme.sizes && componentTheme.sizes[size]) {
    if (typeof componentTheme.sizes[size] === "string" || typeof componentTheme.sizes[size] === "number") {
      flattenProps.size = componentTheme.sizes[size];
    } else if (typeof componentTheme.sizes[size] === "function") {
      flattenProps.size = void 0;
      componentSizeProps = componentTheme.sizes[size]({
        theme: theme3,
        ...flattenProps,
        ...colorModeProps
      });
    } else {
      flattenProps.size = void 0;
      componentSizeProps = componentTheme.sizes[size];
    }
    [flattenSizeStyle, sizeSpecificityMap] = propsFlattener2({
      props: componentSizeProps,
      platform: Platform6.OS,
      colormode: colorModeProps.colorMode,
      state: state || {},
      currentSpecificityMap: variantSpecificityMap || baseSpecificityMap || specificityMap,
      previouslyFlattenProps: flattenProps
    }, 1);
  }
  const defaultStyles2 = merge5({}, flattenBaseStyle, flattenVariantStyle, flattenSizeStyle);
  for (const prop in defaultStyles2) {
    delete flattenProps[prop];
  }
  const defaultSpecificity = merge5({}, specificityMap, baseSpecificityMap, variantSpecificityMap, sizeSpecificityMap);
  flattenProps = propsSpreader2({ ...defaultStyles2, ...flattenProps }, defaultSpecificity);
  let ignore = [];
  if (flattenProps.bg?.linearGradient || flattenProps.background?.linearGradient || flattenProps.bgColor?.linearGradient || flattenProps.backgroundColor?.linearGradient) {
    let bgProp = "bg";
    if (flattenProps.background?.linearGradient) {
      bgProp = "background";
    } else if (flattenProps.bgColor?.linearGradient) {
      bgProp = "bgColor";
    } else if (flattenProps.backgroundColor?.linearGradient) {
      bgProp = "backgroundColor";
    }
    flattenProps[bgProp].linearGradient.colors = flattenProps[bgProp].linearGradient.colors.map((color2) => {
      return get8(theme3.colors, color2, color2);
    });
    ignore = ["bg", "background", "backgroundColor", "bgColor"];
  }
  const [gradientProps] = extractInObject(flattenProps, ignore);
  const bgColor = flattenProps.bg ?? flattenProps.backgroundColor ?? flattenProps.bgColor;
  const contrastTextColor = useContrastText(bgColor, flattenProps?._text?.color);
  flattenProps._text = contrastTextColor && flattenProps?._text?.color === void 0 ? {
    color: contrastTextColor,
    ...flattenProps._text
  } : flattenProps._text;
  const resolvedProps = omitUndefined({
    ...flattenProps,
    ...ignoredProps,
    ...gradientProps
  });
  return resolvedProps;
}

// node_modules/native-base/src/hooks/useSafeArea/index.ts
import { useSafeAreaInsets } from "react-native-safe-area-context";

// node_modules/native-base/src/theme/components/accordion.ts
var accordionBaseStyle = (props) => {
  return {
    borderWidth: 1,
    borderColor: mode("gray.300", "gray.600")(props),
    borderRadius: "lg"
  };
};
var Accordion = {
  baseStyle: accordionBaseStyle
};
var AccordionItem = {};
var AccordionIcon = {};
var accordionSummaryBaseStyle = (props) => {
  return {
    borderTopWidth: 1,
    borderTopColor: mode("gray.300", "gray.600")(props),
    p: 3,
    _hover: {
      bg: mode("primary.200", "primary.300")(props)
    },
    _expanded: {
      bg: "primary.600",
      borderBottomColor: mode("gray.300", "gray.600")(props),
      _text: { color: "white" }
    },
    _disabled: {
      bg: mode("gray.200", "gray.700")(props)
    }
  };
};
var AccordionSummary = {
  baseStyle: accordionSummaryBaseStyle
};
var accordionPanelBaseStyle = {
  p: 3
};
var AccordionDetails = {
  baseStyle: accordionPanelBaseStyle
};

// node_modules/native-base/src/theme/components/actionsheet.ts
var Actionsheet = {
  defaultProps: {
    size: "full"
  }
};
var ActionsheetContent = {
  baseStyle: (props) => ({
    alignItems: "center",
    px: 2,
    py: 2,
    borderRadius: "none",
    roundedTop: 20,
    _dragIndicator: {
      bg: mode("gray.400", "gray.400")(props),
      height: 1,
      width: 10,
      borderRadius: 2
    }
  })
};
var ActionsheetItem = {
  baseStyle: (props) => ({
    width: "100%",
    justifyContent: "flex-start",
    p: 4,
    _text: {
      fontSize: 16,
      fontWeight: "normal",
      color: mode("coolGray.800", "warmGray.50")(props)
    },
    _pressed: {
      bg: mode("coolGray.300", "gray.600")(props)
    },
    _hover: {
      bg: mode("coolGray.200", "gray.500")(props)
    }
  }),
  defaultProps: {
    variant: "unstyled"
  }
};

// node_modules/native-base/src/theme/components/select.ts
var Select = {
  baseStyle: {
    customDropdownIconProps: {
      size: "6",
      p: "1",
      pl: "0",
      color: "trueGray.400"
    },
    _actionSheetContent: {}
  },
  defaultProps: {
    variant: "outline"
  }
};
var SelectItem = {
  baseStyle: {
    p: "1",
    px: "2",
    borderRadius: "0",
    minH: "0"
  }
};

// node_modules/native-base/src/theme/components/alert.ts
function getBg(props) {
  let { theme: theme3, colorScheme, status, variant } = props;
  colorScheme = getColorScheme(props, colorScheme !== "primary" ? colorScheme : status);
  const lightBg = variant === "solid" ? getColor(theme3, `${colorScheme}.600`, colorScheme) : getColor(theme3, `${colorScheme}.100`, colorScheme);
  const darkBg = variant === "solid" ? getColor(theme3, `${colorScheme}.700`, colorScheme) : getColor(theme3, `${colorScheme}.200`, colorScheme);
  return mode(lightBg, darkBg)(props);
}
var variantSubtle = (props) => {
  let { colorScheme, status } = props;
  colorScheme = getColorScheme(props, colorScheme !== "primary" ? colorScheme : status);
  return {
    bg: getBg(props),
    _icon: { color: mode(`${colorScheme}.600`, `${colorScheme}.700`)(props) }
  };
};
var variantOutline = (props) => {
  let { colorScheme, status } = props;
  colorScheme = getColorScheme(props, colorScheme !== "primary" ? colorScheme : status);
  return {
    borderWidth: 1,
    borderColor: mode(`${colorScheme}.600`, `${colorScheme}.700`)(props),
    _icon: { color: mode(`${colorScheme}.600`, `${colorScheme}.700`)(props) }
  };
};
var variantOutlineLight = (props) => {
  let { colorScheme, status, theme: theme3 } = props;
  colorScheme = getColorScheme(props, colorScheme !== "primary" ? colorScheme : status);
  return {
    borderWidth: 1,
    borderColor: transparentize(mode(`${colorScheme}.600`, `${colorScheme}.500`)(props), 0.2)(theme3),
    _icon: { color: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props) }
  };
};
var variantSolid = (props) => {
  return {
    borderWidth: 6,
    borderColor: "transparent",
    bg: getBg(props),
    _icon: { color: mode(`coolGray.50`, `warmGray.50`)(props) }
  };
};
var variantLeftAccent = (props) => {
  let { colorScheme, status } = props;
  colorScheme = getColorScheme(props, colorScheme !== "primary" ? colorScheme : status);
  return {
    borderWidth: 4,
    bg: getBg(props),
    _icon: { color: mode(`${colorScheme}.600`, `${colorScheme}.700`)(props) },
    borderColor: "transparent",
    borderLeftColor: mode(`${colorScheme}.600`, `${colorScheme}.700`)(props)
  };
};
var variantTopAccent = (props) => {
  let { colorScheme, status } = props;
  colorScheme = getColorScheme(props, colorScheme !== "primary" ? colorScheme : status);
  return {
    borderWidth: 4,
    borderColor: "transparent",
    borderTopColor: mode(`${colorScheme}.600`, `${colorScheme}.700`)(props),
    bg: getBg(props),
    _icon: { color: mode(`${colorScheme}.600`, `${colorScheme}.700`)(props) }
  };
};
var variants = {
  "subtle": variantSubtle,
  "solid": variantSolid,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  "outline": variantOutline,
  "outline-light": variantOutlineLight
};
var Alert = {
  baseStyle: {
    alignItems: "center",
    justifyContent: "flex-start",
    p: 3,
    space: 3,
    borderRadius: "sm"
  },
  variants,
  defaultProps: {
    colorScheme: "primary",
    variant: "subtle"
  }
};
var AlertIcon = {
  baseStyle: {
    size: 4
  }
};

// node_modules/native-base/src/theme/components/aspect-ratio.ts
var baseStyle = {};
var defaultProps = {
  ratio: 4 / 3
};
var aspect_ratio_default = {
  baseStyle,
  defaultProps
};

// node_modules/native-base/src/theme/components/avatar.ts
var baseStyle2 = (props) => {
  const { name, ...colorModeProps } = props;
  const bg = name ? randomColor({ string: getRandomString(5) + name }) : "gray.400";
  const borderColor = mode("gray.800", "white")(colorModeProps);
  return {
    bg,
    borderColor,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "full",
    _text: {
      fontWeight: 600
    }
  };
};
function getSize(size, fontSize) {
  return {
    width: size,
    height: size,
    _text: {
      fontSize
    }
  };
}
var sizes2 = {
  "xs": getSize("6", "2xs"),
  "sm": getSize("8", "xs"),
  "md": getSize("12", "md"),
  "lg": getSize("16", "xl"),
  "xl": getSize("24", "3xl"),
  "2xl": getSize("32", "5xl")
};
var defaultProps2 = {
  size: "md"
};
var avatar_default = {
  baseStyle: baseStyle2,
  sizes: sizes2,
  defaultProps: defaultProps2
};

// node_modules/native-base/src/theme/components/avatar-badge.ts
function baseStyle3(props) {
  return {
    borderRadius: "full",
    borderWidth: 2,
    borderColor: mode("light.50", "gray.800")(props),
    bg: mode("gray.600", "light.100")(props)
  };
}
var avatar_badge_default = { baseStyle: baseStyle3 };

// node_modules/native-base/src/theme/components/avatar-group.ts
function baseStyle4(props) {
  return {
    borderWidth: 2,
    borderColor: mode("gray.50", "gray.800")(props),
    bg: mode("gray.600", "gray.100")(props),
    space: -4
  };
}
var avatar_group_default = { baseStyle: baseStyle4 };

// node_modules/native-base/src/theme/components/badge.ts
var baseStyle5 = {
  px: "2",
  py: "0.5",
  alignItems: "center",
  _text: { fontSize: "xs", fontWeight: "medium" }
};
function variantSolid2(props) {
  const colorScheme = getColorScheme(props);
  return {
    bg: mode(`${colorScheme}.600`, `${colorScheme}.300`)(props),
    _text: { color: mode(`coolGray.100`, `coolGray.800`)(props) },
    borderWidth: "1",
    borderColor: "transparent",
    borderRadius: "2"
  };
}
function variantSubtle2(props) {
  const colorScheme = getColorScheme(props);
  return {
    bg: mode(`${colorScheme}.200`, `${colorScheme}.700`)(props),
    _text: { color: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props) },
    borderWidth: "1",
    borderRadius: "2",
    borderColor: "transparent"
  };
}
function variantOutline2(props) {
  const colorScheme = getColorScheme(props);
  return {
    borderColor: mode(`${colorScheme}.500`, `${colorScheme}.400`)(props),
    _text: { color: mode(`${colorScheme}.500`, `${colorScheme}.400`)(props) },
    borderRadius: "2",
    borderWidth: "1"
  };
}
var variants2 = {
  solid: variantSolid2,
  subtle: variantSubtle2,
  outline: variantOutline2
};
var defaultProps3 = {
  variant: "subtle",
  colorScheme: "coolGray"
};
var badge_default = {
  baseStyle: baseStyle5,
  variants: variants2,
  defaultProps: defaultProps3
};

// node_modules/native-base/src/theme/components/breadcrumb.ts
var baseStyle6 = {
  width: "auto",
  height: "auto",
  display: "flex",
  flexDirection: "row",
  spacing: "2"
};
var defaultProps4 = {
  direction: "row",
  wrap: "wrap"
};
var Breadcrumb = {
  baseStyle: baseStyle6,
  defaultProps: defaultProps4
};
var BreadcrumbText = {
  baseStyle: { ...baseStyle6, _current: { fontWeight: "bold" } },
  defaultProps: defaultProps4
};
var BreadcrumbIcon = {
  baseStyle: { ...baseStyle6 },
  defaultProps: defaultProps4
};

// node_modules/native-base/src/theme/components/button.ts
import { Platform as Platform7 } from "react-native";
var disabledTextColor = (props) => mode(`muted.500`, `muted.300`)(props);
var baseStyle7 = (props) => {
  const { primary } = props.theme.colors;
  const focusRing = Platform7.OS === "web" ? mode({ boxShadow: `${primary[400]} 0px 0px 0px 2px`, zIndex: 1 }, { boxShadow: `${primary[500]} 0px 0px 0px 2px`, zIndex: 1 })(props) : {};
  return {
    borderRadius: "sm",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    _web: {
      cursor: props.isDisabled ? "not-allowed" : props.isLoading ? "default" : "pointer"
    },
    _text: {
      fontWeight: "medium"
    },
    _focusVisible: {
      style: props.variant !== "unstyled" ? { ...focusRing } : {}
    },
    _stack: {
      space: 2,
      alignItems: "center"
    },
    _loading: {
      opacity: "80"
    },
    _disabled: {
      opacity: "50"
    },
    _spinner: {
      size: "sm"
    }
  };
};
function variantGhost(props) {
  const { colorScheme: c } = props;
  if (c === "muted") {
    return {
      _text: {
        color: disabledTextColor(props)
      }
    };
  }
  return {
    _text: {
      color: props.isDisabled ? disabledTextColor(props) : mode(`${c}.500`, `${c}.300`)(props)
    },
    bg: "transparent",
    _web: {
      outlineWidth: "0"
    },
    _hover: {
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      bg: transparentize(mode(`${c}.200`, `${c}.400`)(props), 0.5)(props.theme)
    },
    _focusVisible: {
      borderColor: mode(`${c}.700`, `${c}.200`)(props),
      bg: transparentize(mode(`${c}.200`, `${c}.400`)(props), 0.5)(props.theme)
    },
    _pressed: {
      borderColor: mode(`${c}.600`, `${c}.200`)(props),
      bg: transparentize(mode(`${c}.300`, `${c}.500`)(props), 0.5)(props.theme)
    },
    _spinner: {
      size: "sm"
    }
  };
}
function variantOutline3(props) {
  const { colorScheme: c } = props;
  const borderColor = mode(`muted.200`, `muted.500`)(props);
  return {
    borderWidth: "1",
    borderColor: c === "muted" ? borderColor : props.isDisabled ? disabledTextColor(props) : mode(`${c}.300`, `${c}.300`)(props),
    ...variantGhost(props)
  };
}
function variantSolid3(props) {
  const { colorScheme: c } = props;
  let bg = `${c}.500`;
  if (props.isDisabled) {
    bg = mode(`muted.300`, `muted.500`)(props);
  }
  const styleObject = {
    _web: {
      outlineWidth: "0"
    },
    bg,
    _hover: {
      bg: `${c}.600`
    },
    _pressed: {
      bg: `${c}.700`
    },
    _focus: {
      bg: `${c}.600`
    },
    _loading: {
      bg: mode(`warmGray.50`, `${c}.300`)(props),
      opacity: "50"
    },
    _disabled: { bg: mode(`trueGray.300`, `trueGray.600`)(props) }
  };
  return styleObject;
}
function variantSubtle3(props) {
  const { colorScheme: c } = props;
  let bg = `${c}.100`;
  bg = mode(bg, `${c}.200`)(props);
  let color2;
  if (props.isDisabled) {
    bg = mode(`muted.300`, `muted.500`)(props);
  } else {
    color2 = mode(`${c}.500`, `${c}.600`)(props);
  }
  const styleObject = {
    _text: {
      color: color2
    },
    _web: {
      outlineWidth: "0"
    },
    bg,
    _hover: {
      _text: { color: mode(`${c}.600`, `${c}.700`)(props) },
      bg: mode(`${c}.200`, `${c}.300`)(props)
    },
    _pressed: {
      _text: { color: mode(`${c}.700`, `${c}.800`)(props) },
      bg: mode(`${c}.300`, `${c}.400`)(props)
    }
  };
  return styleObject;
}
function variantLink(props) {
  const { colorScheme: c } = props;
  return {
    ...variantGhost(props),
    _text: {
      textDecorationLine: Platform7.select({
        ios: "underline",
        web: "underline"
      }),
      color: c === "muted" ? mode(`muted.800`, `${c}.200`)(props) : props.isDisabled ? disabledTextColor(props) : mode(`${c}.500`, `${c}.300`)(props)
    },
    _hover: {
      _text: {
        color: mode(`${c}.600`, `${c}.400`)(props),
        textDecorationLine: "underline"
      }
    },
    _focusVisible: {
      _text: {
        color: mode(`${c}.600`, `${c}.400`)(props),
        textDecorationLine: "underline"
      }
    },
    _pressed: {
      _text: { color: mode(`${c}.700`, `${c}.500`)(props) }
    }
  };
}
function variantUnstyled() {
  return {};
}
var variants3 = {
  ghost: variantGhost,
  outline: variantOutline3,
  solid: variantSolid3,
  subtle: variantSubtle3,
  link: variantLink,
  unstyled: variantUnstyled
};
var sizes3 = {
  lg: {
    px: "4",
    py: "2",
    _text: {
      fontSize: "md"
    }
  },
  md: {
    px: "3",
    py: "2",
    _text: {
      fontSize: "sm"
    }
  },
  sm: {
    px: "2",
    py: "2",
    _text: {
      fontSize: "xs"
    }
  },
  xs: {
    px: "2",
    py: "2",
    _text: {
      fontSize: "2xs"
    }
  }
};
var defaultProps5 = {
  variant: "solid",
  size: "md",
  colorScheme: "primary"
};
var ButtonGroup = {
  baseStyle: { direction: "row" },
  defaultProps: { space: 2 }
};
var button_default = {
  baseStyle: baseStyle7,
  variants: variants3,
  sizes: sizes3,
  defaultProps: defaultProps5
};

// node_modules/native-base/src/theme/components/card.ts
var baseStyle8 = {
  shadow: 4,
  borderRadius: "md",
  padding: 4,
  overflow: "hidden"
};
var defaultProps6 = {};
var card_default = {
  baseStyle: baseStyle8,
  defaultProps: defaultProps6
};

// node_modules/native-base/src/theme/components/center.ts
var sizes4 = {
  "xs": {
    height: 10,
    width: 10
  },
  "sm": {
    height: 12,
    width: 12
  },
  "md": {
    height: 16,
    width: 16
  },
  "lg": {
    height: 24,
    width: 24
  },
  "xl": {
    height: 32,
    width: 32
  },
  "2xl": {
    height: 40,
    width: 40
  }
};
var center_default = {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  sizes: sizes4
};

// node_modules/native-base/src/theme/components/checkbox.ts
var baseStyle9 = (props) => {
  const { colorScheme, theme: theme3 } = props;
  return {
    justifyContent: "flex-start",
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: "sm",
    borderColor: mode("muted.300", "muted.600")(props),
    bg: mode("muted.50", "muted.700")(props),
    _text: {
      ml: 2,
      color: mode("darkText", "lightText")(props)
    },
    _interactionBox: {
      position: "absolute",
      borderRadius: "full"
    },
    _hover: {
      _interactionBox: {
        bg: transparentize("muted.200", 0.3)(theme3)
      }
    },
    _focus: {
      _interactionBox: {
        bg: transparentize(`${colorScheme}.200`, 0.5)(theme3)
      }
    },
    _focusVisible: {
      _interactionBox: {
        bg: transparentize(`${colorScheme}.200`, 0.5)(theme3)
      }
    },
    _disabled: {
      _interactionBox: {
        bg: "transparent"
      },
      opacity: 0.4
    },
    _pressed: {
      _interactionBox: {
        bg: transparentize(`${colorScheme}.200`, 0.5)(theme3)
      }
    },
    _checked: {
      borderColor: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props),
      bg: mode(`${colorScheme}.600`, `${colorScheme}.300`)(props)
    },
    _invalid: {
      borderColor: mode("error.600", "error.400")(props)
    },
    _icon: {
      color: mode(`muted.50`, `muted.800`)(props)
    }
  };
};
var sizes5 = {
  lg: { _icon: { size: 6 }, _text: { fontSize: "xl" } },
  md: { _icon: { size: 5 }, _text: { fontSize: "lg" } },
  sm: { _icon: { size: 4 }, _text: { fontSize: "md" } }
};
var defaultProps7 = {
  defaultIsChecked: false,
  size: "sm",
  colorScheme: "primary"
};
var checkbox_default = {
  baseStyle: baseStyle9,
  sizes: sizes5,
  defaultProps: defaultProps7
};

// node_modules/native-base/src/theme/components/box.ts
var baseStyle10 = {};
var defaultProps8 = {};
var box_default = {
  baseStyle: baseStyle10,
  defaultProps: defaultProps8
};

// node_modules/native-base/src/theme/components/flatList.ts
var baseStyle11 = {};
var defaultProps9 = {};
var flatList_default = {
  baseStyle: baseStyle11,
  defaultProps: defaultProps9
};

// node_modules/native-base/src/theme/components/keyboardAvoidingView.ts
var baseStyle12 = {};
var defaultProps10 = {};
var keyboardAvoidingView_default = {
  baseStyle: baseStyle12,
  defaultProps: defaultProps10
};

// node_modules/native-base/src/theme/components/scrollView.ts
var baseStyle13 = {};
var defaultProps11 = {};
var scrollView_default = {
  baseStyle: baseStyle13,
  defaultProps: defaultProps11
};

// node_modules/native-base/src/theme/components/sectionList.ts
var baseStyle14 = {};
var defaultProps12 = {};
var sectionList_default = {
  baseStyle: baseStyle14,
  defaultProps: defaultProps12
};

// node_modules/native-base/src/theme/components/statusBar.ts
var baseStyle15 = {};
var defaultProps13 = {};
var statusBar_default = {
  baseStyle: baseStyle15,
  defaultProps: defaultProps13
};

// node_modules/native-base/src/theme/components/circular-progress.ts
var sizes6 = {
  "xs": {
    height: 6,
    width: 6
  },
  "sm": {
    height: 8,
    width: 8
  },
  "md": {
    height: 16,
    width: 16
  },
  "lg": {
    height: 20,
    width: 20
  },
  "xl": {
    height: 24,
    width: 24
  },
  "2xl": {
    height: 32,
    width: 32
  }
};
var defaultProps14 = {
  thickness: 8,
  colorScheme: "primary",
  size: "lg"
};
function baseStyle16(props) {
  const colorScheme = getColorScheme(props);
  return {
    color: mode(`${colorScheme}.600`, `${colorScheme}.500`)(props),
    trackColor: mode(`${colorScheme}.200`, `${colorScheme}.800`)(props)
  };
}
var circular_progress_default = { baseStyle: baseStyle16, sizes: sizes6, defaultProps: defaultProps14 };

// node_modules/native-base/src/theme/components/code.ts
import { Platform as Platform8 } from "react-native";
var { variants: variants4, defaultProps: defaultProps15 } = badge_default;
var baseStyle17 = {
  _text: {
    fontFamily: Platform8.OS === "ios" ? "Courier" : "monospace",
    fontSize: "sm"
  },
  borderRadius: "sm",
  px: 2,
  py: 1
};
var code_default = {
  baseStyle: baseStyle17,
  variants: variants4,
  defaultProps: defaultProps15
};

// node_modules/native-base/src/theme/components/container.ts
var baseStyle18 = {
  maxWidth: "80%"
};
var container_default = {
  baseStyle: baseStyle18
};

// node_modules/native-base/src/theme/components/hstack.ts
var baseStyle19 = {};
var defaultProps16 = {};
var hstack_default = {
  baseStyle: baseStyle19,
  defaultProps: defaultProps16
};

// node_modules/native-base/src/theme/components/vstack.ts
var baseStyle20 = {};
var defaultProps17 = {};
var vstack_default = {
  baseStyle: baseStyle20,
  defaultProps: defaultProps17
};

// node_modules/native-base/src/theme/components/divider.ts
function baseStyle21(props) {
  const { orientation, thickness } = props;
  const orientationProps = orientation === "vertical" ? {
    width: `${thickness}px`,
    height: "100%"
  } : {
    width: "100%",
    height: `${thickness}px`
  };
  return {
    bg: mode("coolGray.200", "gray.600")(props),
    ...orientationProps
  };
}
var divider_default = {
  baseStyle: baseStyle21,
  defaultProps: {
    orientation: "horizontal",
    thickness: "1"
  }
};

// node_modules/native-base/src/theme/components/simple-grid.ts
var baseStyle22 = {};
var defaultProps18 = {};
var simple_grid_default = {
  baseStyle: baseStyle22,
  defaultProps: defaultProps18
};

// node_modules/native-base/src/theme/components/form-control.ts
var FormControl = {};
var FormControlErrorMessage = {
  baseStyle: (props) => {
    return {
      mt: "2",
      _text: {
        fontSize: "xs",
        color: mode("danger.600", "danger.300")(props)
      },
      _stack: { space: 1, alignItems: "center" }
    };
  }
};
var FormControlLabel = {
  baseStyle: (props) => {
    return {
      _text: {
        fontSize: "sm",
        fontWeight: "medium"
      },
      astrickColor: mode("danger.600", "danger.300")(props),
      mb: "2",
      mr: "3"
    };
  }
};
var FormControlHelperText = {
  baseStyle: (props) => {
    return {
      mt: "2",
      _text: {
        fontSize: "xs",
        color: mode("muted.500", "muted.400")(props)
      }
    };
  }
};

// node_modules/native-base/src/theme/components/heading.ts
var baseStyle23 = (props) => {
  return {
    color: mode("muted.700", "white")(props),
    fontWeight: "bold",
    fontFamily: "heading",
    lineHeight: "sm"
  };
};
var sizes7 = {
  "4xl": {
    fontSize: ["6xl", null, "7xl"]
  },
  "3xl": {
    fontSize: ["5xl", null, "6xl"]
  },
  "2xl": {
    fontSize: ["4xl", null, "5xl"]
  },
  "xl": {
    fontSize: ["3xl", null, "4xl"]
  },
  "lg": {
    fontSize: ["2xl", null, "3xl"]
  },
  "md": { fontSize: "xl" },
  "sm": { fontSize: "md" },
  "xs": { fontSize: "sm" }
};
var defaultProps19 = {
  size: "lg"
};
var heading_default = {
  baseStyle: baseStyle23,
  sizes: sizes7,
  defaultProps: defaultProps19
};

// node_modules/native-base/src/theme/components/icon.ts
var baseStyle24 = (props) => {
  return {
    color: mode("muted.800", "muted.100")(props)
  };
};
var sizes8 = {
  "xxs": 2,
  "xs": 4,
  "sm": 6,
  "md": 8,
  "lg": 10,
  "xl": 12,
  "2xl": 16,
  "3xl": 20,
  "4xl": 24,
  "5xl": 32,
  "6xl": 64
};
var defaultProps20 = { size: "md" };
var icon_default = { baseStyle: baseStyle24, sizes: sizes8, defaultProps: defaultProps20 };

// node_modules/native-base/src/theme/components/icon-button.ts
import { Platform as Platform9 } from "react-native";
var baseStyle25 = (props) => {
  const { primary } = props.theme.colors;
  const focusRing = Platform9.OS === "web" ? { boxShadow: `${primary[400]} 0px 0px 0px 3px` } : {};
  return {
    borderRadius: "sm",
    _web: {
      cursor: props.isDisabled ? "not-allowed" : props.isLoading ? "default" : "pointer"
    },
    _focusVisible: {
      style: props.variant !== "unstyled" ? { ...focusRing } : {}
    },
    _disabled: {
      opacity: 0.5
    }
  };
};
function variantGhost2(props) {
  const { colorScheme } = props;
  return {
    bg: "transparent",
    _web: {
      outlineWidth: 0
    },
    _hover: {
      bg: transparentize(mode(`${colorScheme}.200`, `${colorScheme}.400`)(props), 0.5)(props.theme)
    },
    _focusVisible: {
      bg: transparentize(mode(`${colorScheme}.200`, `${colorScheme}.400`)(props), 0.5)(props.theme)
    },
    _pressed: {
      bg: transparentize(mode(`${colorScheme}.200`, `${colorScheme}.500`)(props), 0.6)(props.theme)
    }
  };
}
function variantOutline4(props) {
  const { colorScheme } = props;
  return {
    borderWidth: "1",
    borderColor: `${colorScheme}.300`,
    _icon: {
      color: mode(`${colorScheme}.500`, `${colorScheme}.300`)(props)
    },
    _web: {
      outlineWidth: 0
    },
    _hover: {
      bg: transparentize(mode(`${colorScheme}.200`, `${colorScheme}.400`)(props), 0.5)(props.theme)
    },
    _focusVisible: {
      bg: transparentize(mode(`${colorScheme}.200`, `${colorScheme}.400`)(props), 0.5)(props.theme)
    },
    _pressed: {
      bg: transparentize(mode(`${colorScheme}.300`, `${colorScheme}.500`)(props), 0.6)(props.theme)
    }
  };
}
function variantSolid4(props) {
  const { colorScheme } = props;
  return {
    bg: `${colorScheme}.500`,
    _web: {
      outlineWidth: 0
    },
    _disabled: {
      bg: mode(`trueGray.300`, `trueGray.600`)(props)
    },
    _hover: {
      bg: `${colorScheme}.600`
    },
    _pressed: {
      bg: `${colorScheme}.700`
    },
    _focus: {
      bg: `${colorScheme}.600`
    },
    _icon: {
      color: mode("gray.50", "gray.800")(props)
    }
  };
}
function variantUnstyled2() {
  return {};
}
var variants5 = {
  ghost: variantGhost2,
  outline: variantOutline4,
  solid: variantSolid4,
  unstyled: variantUnstyled2
};
var defaultProps21 = {
  variant: "ghost",
  size: "md",
  colorScheme: "primary"
};
var sizes9 = {
  lg: {
    p: 3
  },
  md: {
    p: 2
  },
  sm: {
    p: 1
  }
};
var icon_button_default = {
  baseStyle: baseStyle25,
  variants: variants5,
  sizes: sizes9,
  defaultProps: defaultProps21
};

// node_modules/native-base/src/theme/components/image.ts
var sizes10 = {
  "2xs": 6,
  "xs": 10,
  "sm": 16,
  "md": 20,
  "lg": 24,
  "xl": 32,
  "2xl": 64,
  "full": "100%"
};
var Image = {
  baseStyle: {
    maxWidth: "100%"
  },
  sizes: sizes10,
  defaultProps: {}
};

// node_modules/native-base/src/theme/components/input.ts
import { Platform as Platform10 } from "react-native";
function getSelectionColor(props) {
  if (Platform10.OS === "ios") {
    return mode("coolGray.800", "warmGray.50")(props);
  } else if (Platform10.OS === "android") {
    return mode("coolGray.800", "warmGray.50")(props);
  }
}
var baseStyle26 = (props) => {
  return {
    selectionColor: getSelectionColor(props),
    fontFamily: "body",
    p: "2",
    borderRadius: "sm",
    color: mode("coolGray.800", "warmGray.50")(props),
    placeholderTextColor: "muted.400",
    background: "transparent",
    borderColor: mode("muted.200", "gray.500")(props),
    _disabled: {
      opacity: "80",
      bg: mode("muted.100", "muted.700")(props)
    },
    _invalid: {
      borderColor: mode("danger.600", "danger.300")(props)
    },
    _focus: {
      borderColor: mode("primary.400", "primary.500")(props)
    },
    _web: {
      outlineWidth: "0",
      lineHeight: "lg"
    }
  };
};
function roundedStyle(props) {
  return {
    borderRadius: "25",
    borderWidth: "1",
    _hover: {
      bg: mode("gray.100", "gray.700")(props)
    }
  };
}
function outlineStyle(props) {
  return {
    borderWidth: "1",
    _hover: {
      bg: mode("gray.100", "gray.700")(props)
    }
  };
}
function filledStyle(props) {
  return {
    bg: props.bg || mode("muted.200", "muted.600")(props),
    borderWidth: "1",
    borderColor: "transparent",
    _hover: {
      bg: mode("muted.300", "muted.700")(props)
    }
  };
}
function unstyledStyle() {
  return {
    borderWidth: "0"
  };
}
function underlinedStyle() {
  return {
    borderRadius: "0",
    borderBottomWidth: "1"
  };
}
var variants6 = {
  outline: outlineStyle,
  underlined: underlinedStyle,
  rounded: roundedStyle,
  filled: filledStyle,
  unstyled: unstyledStyle
};
var sizes11 = {
  "2xl": { fontSize: "xl" },
  "xl": { fontSize: "lg" },
  "lg": { fontSize: "md" },
  "md": { fontSize: "sm" },
  "sm": { fontSize: "xs" },
  "xs": { fontSize: "2xs" }
};
var defaultProps22 = {
  size: "sm",
  variant: "outline"
};
var Input = {
  baseStyle: baseStyle26,
  defaultProps: defaultProps22,
  variants: variants6,
  sizes: sizes11
};

// node_modules/native-base/src/theme/components/tooltip.ts
var baseStyle27 = (props) => {
  return {
    bg: mode(`gray.700`, `gray.300`)(props),
    py: 1,
    px: 2,
    rounded: "sm",
    shadow: 1,
    _text: {
      color: mode(`gray.300`, `gray.700`)(props),
      fontSize: "sm"
    }
  };
};
var Tooltip = {
  baseStyle: baseStyle27
};

// node_modules/native-base/src/theme/components/kbd.ts
import { Platform as Platform11 } from "react-native";
function baseStyle28(props) {
  return {
    bg: mode("muted.200", "muted.700")(props),
    borderColor: mode("muted.300", "muted.600")(props),
    borderWidth: 2,
    borderBottomWidth: 4,
    shadow: 1,
    borderRadius: "md",
    px: 2,
    _text: {
      fontSize: "sm",
      fontWeight: "bold",
      fontFamily: Platform11.OS === "ios" ? "Courier" : "monospace"
    }
  };
}
var defaultProps23 = {};
var kbd_default = {
  baseStyle: baseStyle28,
  defaultProps: defaultProps23
};

// node_modules/native-base/src/theme/components/link.ts
var baseStyle29 = (props) => {
  const { isUnderlined } = props;
  return {
    _text: {
      textDecorationLine: isUnderlined ? "underline" : "none"
    },
    width: "auto",
    height: "auto"
  };
};
var link_default = {
  baseStyle: baseStyle29,
  defaultProps: {
    isUnderlined: true
  }
};

// node_modules/native-base/src/theme/components/menu.ts
import { Platform as Platform12, StyleSheet as StyleSheet2 } from "react-native";
function baseStyle30(props) {
  return {
    bg: mode(`#fff`, `gray.700`)(props),
    py: 2,
    borderWidth: 1,
    borderColor: mode(`coolGray.200`, `gray.600`)(props),
    borderRadius: "sm",
    transition: {
      initial: { opacity: 0, translateY: -10 },
      animate: {
        opacity: 1,
        translateY: 0,
        transition: { duration: 200 }
      },
      exit: { opacity: 0, translateY: -10, transition: { duration: 150 } },
      style: StyleSheet2.absoluteFill
    }
  };
}
var menu_default = {
  baseStyle: baseStyle30
};
var MenuGroup = {
  baseStyle: (props) => ({
    _title: {
      fontSize: "xs",
      fontWeight: 600,
      textTransform: "uppercase",
      color: mode(`gray.500`, `gray.300`)(props)
    },
    p: 3
  })
};
var MenuItem = {
  baseStyle: (props) => ({
    px: 3,
    py: 2,
    outlineWidth: Platform12.OS === "web" ? 0 : void 0,
    _disabled: {
      _text: {
        color: mode("gray.400", "gray.400")(props)
      }
    },
    _focus: {
      bg: mode(`coolGray.200`, `gray.600`)(props)
    },
    _pressed: {
      bg: mode(`coolGray.300`, `gray.500`)(props)
    },
    _icon: {
      size: 4,
      color: mode("gray.500", "gray.100")(props)
    }
  }),
  defaultProps: {}
};

// node_modules/native-base/src/theme/components/modal.ts
import { Dimensions } from "react-native";
var sizes12 = {
  xs: {
    contentSize: {
      width: "60%",
      maxWidth: "280"
    }
  },
  sm: {
    contentSize: {
      width: "65%",
      maxWidth: "320"
    }
  },
  md: {
    contentSize: {
      width: "75%",
      maxWidth: "380"
    }
  },
  lg: {
    contentSize: {
      width: "80%",
      maxWidth: "520"
    }
  },
  xl: {
    contentSize: {
      width: "90%",
      maxWidth: "580"
    }
  },
  full: {
    contentSize: {
      width: "100%"
    }
  }
};
var Modal = {
  baseStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  sizes: sizes12,
  defaultProps: {
    size: "md",
    closeOnOverlayClick: true
  }
};
var ModalContent = {
  baseStyle: (props) => {
    return {
      bg: mode("coolGray.50", "gray.700")(props),
      _text: { color: mode("coolGray.800", "warmGray.50")(props) },
      shadow: 1,
      rounded: "lg",
      maxHeight: `${Dimensions.get("window").height - 150}px`,
      overflow: "hidden"
    };
  }
};
var ModalCloseButton = {
  baseStyle: (props) => {
    return {
      position: "absolute",
      right: "3",
      top: "3",
      zIndex: "1",
      colorScheme: "coolGray",
      p: "2",
      _icon: {
        size: "3",
        color: mode("coolGray.600", "coolGray.100")(props)
      }
    };
  }
};
var ModalHeader = {
  baseStyle: (props) => {
    return {
      py: "4",
      px: "3",
      borderBottomWidth: "1",
      borderColor: mode("coolGray.200", "gray.600")(props),
      _text: {
        fontSize: "md",
        fontWeight: "semibold",
        color: mode("coolGray.800", "warmGray.50")(props),
        lineHeight: "sm"
      }
    };
  }
};
var ModalBody = {
  baseStyle: (props) => {
    return {
      pt: "2",
      p: "3",
      _text: {
        color: mode("coolGray.600", "coolGray.300")(props)
      }
    };
  }
};
var ModalFooter = {
  baseStyle: (props) => {
    return {
      p: "3",
      bg: mode("coolGray.100", "gray.600")(props),
      flexDirection: "row",
      justifyContent: "flex-end",
      flexWrap: "wrap"
    };
  }
};
var ModalOverlay = {
  baseStyle: {
    position: "absolute",
    left: "0",
    top: "0",
    opacity: "50",
    right: "0",
    bottom: "0"
  }
};

// node_modules/native-base/src/theme/components/alert-dialog.ts
import { Dimensions as Dimensions2 } from "react-native";
var sizes13 = {
  xs: {
    contentSize: {
      width: "60%",
      maxWidth: "280"
    }
  },
  sm: {
    contentSize: {
      width: "65%",
      maxWidth: "320"
    }
  },
  md: {
    contentSize: {
      width: "75%",
      maxWidth: "380"
    }
  },
  lg: {
    contentSize: {
      width: "80%",
      maxWidth: "520"
    }
  },
  xl: {
    contentSize: {
      width: "90%",
      maxWidth: "580"
    }
  },
  full: {
    contentSize: {
      width: "100%"
    }
  }
};
var AlertDialog = {
  baseStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  sizes: sizes13,
  defaultProps: {
    size: "md",
    closeOnOverlayClick: true
  }
};
var AlertDialogContent = {
  baseStyle: (props) => {
    return {
      bg: mode("coolGray.50", "gray.700")(props),
      _text: { color: mode("coolGray.800", "warmGray.50")(props) },
      shadow: 1,
      rounded: "lg",
      maxHeight: `${Dimensions2.get("window").height - 150}px`,
      overflow: "hidden"
    };
  }
};
var AlertDialogCloseButton = {
  baseStyle: (props) => {
    return {
      position: "absolute",
      right: "3",
      top: "3",
      zIndex: "1",
      colorScheme: "coolGray",
      p: "2",
      _icon: {
        size: "3",
        color: mode("coolGray.600", "coolGray.100")(props)
      }
    };
  }
};
var AlertDialogHeader = {
  baseStyle: (props) => {
    return {
      py: "4",
      px: "3",
      borderBottomWidth: "1",
      borderColor: mode("coolGray.200", "gray.600")(props),
      _text: {
        fontSize: "md",
        fontWeight: "semibold",
        color: mode("coolGray.800", "warmGray.50")(props),
        lineHeight: "sm"
      }
    };
  }
};
var AlertDialogBody = {
  baseStyle: (props) => {
    return {
      pt: "2",
      p: "3",
      _text: {
        color: mode("coolGray.600", "coolGray.300")(props)
      }
    };
  }
};
var AlertDialogFooter = {
  baseStyle: (props) => {
    return {
      p: "3",
      bg: mode("coolGray.100", "gray.600")(props),
      flexDirection: "row",
      justifyContent: "flex-end",
      flexWrap: "wrap"
    };
  }
};
var AlertDialogOverlay = {
  baseStyle: {
    position: "absolute",
    left: "0",
    top: "0",
    opacity: "50",
    right: "0",
    bottom: "0"
  }
};

// node_modules/native-base/src/theme/components/popover.ts
var popover_exports = {};
__export(popover_exports, {
  PopoverArrow: () => PopoverArrow,
  PopoverBody: () => PopoverBody,
  PopoverCloseButton: () => PopoverCloseButton,
  PopoverContent: () => PopoverContent,
  PopoverFooter: () => PopoverFooter,
  PopoverHeader: () => PopoverHeader
});
var PopoverCloseButton = {
  baseStyle: (props) => ({
    position: "absolute",
    right: 3,
    top: 3,
    zIndex: 1,
    colorScheme: "coolGray",
    p: 2,
    _icon: {
      size: 3,
      color: mode("coolGray.600", "coolGray.100")(props)
    }
  })
};
var PopoverBody = {
  baseStyle: (props) => ({
    pt: "2",
    p: "3",
    _text: {
      color: mode("coolGray.600", "coolGray.300")(props)
    }
  })
};
var PopoverContent = {
  baseStyle: (props) => ({
    backgroundColor: mode("coolGray.50", "gray.700")(props),
    borderColor: mode("coolGray.200", "coolGray.600")(props),
    _text: { color: mode("coolGray.800", "warmGray.50")(props) },
    borderWidth: 1,
    rounded: "md",
    overflow: "hidden"
  })
};
var PopoverHeader = {
  baseStyle: (props) => ({
    py: "4",
    px: "3",
    borderBottomWidth: "1",
    borderColor: mode("coolGray.200", "gray.600")(props),
    _text: {
      fontSize: "md",
      fontWeight: "semibold",
      color: mode("coolGray.800", "warmGray.50")(props),
      lineHeight: "sm"
    }
  })
};
var PopoverArrow = {
  baseStyle: (props) => ({
    borderColor: mode("coolGray.200", "coolGray.600")(props)
  })
};
var PopoverFooter = {
  baseStyle: (props) => {
    return {
      p: "3",
      bg: mode("coolGray.100", "gray.600")(props),
      flexDirection: "row",
      justifyContent: "flex-end",
      flexWrap: "wrap"
    };
  }
};

// node_modules/native-base/src/theme/components/number-input.ts
var defaultProps24 = {
  size: "sm",
  step: 1,
  min: -Infinity,
  max: Infinity,
  defaultValue: "0",
  keepWithinRange: true,
  clampValueOnBlur: true,
  focusInputOnChange: true,
  getAriaValueText: true
};
var number_input_default = {
  defaultProps: defaultProps24
};
var stepperbaseStyle = (props) => {
  return {
    bg: mode("primary.600", "primary.200")(props),
    iconColor: mode("gray.50", "gray.800")(props),
    _active: {},
    _disabled: {
      opacity: 0.5
    }
  };
};
var NumberInputStepper = {
  baseStyle: stepperbaseStyle
};

// node_modules/native-base/src/theme/components/pin-input.ts
var defaultProps25 = {
  placeholder: "\u25CB",
  size: "md",
  manageFocus: true,
  space: 1
};
var sizes14 = {
  "2xl": {
    fontSize: "2xl",
    p: 3,
    width: "56px",
    height: "56px",
    textAlign: "center",
    borderRadius: "lg"
  },
  "xl": {
    fontSize: "xl",
    p: 3,
    width: "52px",
    height: "52px",
    textAlign: "center",
    borderRadius: "lg"
  },
  "lg": {
    fontSize: "lg",
    p: 2,
    width: "48px",
    height: "48px",
    textAlign: "center",
    borderRadius: "md"
  },
  "md": {
    fontSize: "md",
    p: 2,
    width: "40px",
    height: "40px",
    textAlign: "center",
    borderRadius: "md"
  },
  "sm": {
    fontSize: "sm",
    p: 1,
    width: "30px",
    height: "30px",
    textAlign: "center",
    borderRadius: "md"
  },
  "xs": {
    fontSize: "xs",
    p: 1,
    width: "24px",
    height: "24px",
    textAlign: "center",
    borderRadius: "md"
  }
};
var pin_input_default = {
  sizes: sizes14,
  defaultProps: defaultProps25
};

// node_modules/native-base/src/theme/components/pressable.ts
var pressable_default = {
  baseStyle: {},
  defaultProps: {}
};

// node_modules/native-base/src/theme/components/progress.ts
var defaultProps26 = {
  colorScheme: "primary",
  size: "sm",
  rounded: "full",
  min: 0,
  max: 100,
  value: 0,
  isIndeterminate: false
};
function baseStyle31(props) {
  const colorScheme = getColorScheme(props);
  return {
    bg: `${colorScheme}.200`,
    overflow: "hidden",
    _filledTrack: {
      bg: mode(`${colorScheme}.600`, `${colorScheme}.500`)(props),
      shadow: 0,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      _text: {
        color: "white",
        fontWeight: "bold"
      }
    }
  };
}
var sizes15 = {
  "xs": {
    height: 1
  },
  "sm": {
    height: 2
  },
  "md": {
    height: 3
  },
  "lg": {
    height: 4
  },
  "xl": {
    height: 5
  },
  "2xl": {
    height: 6
  }
};
var progress_default = {
  baseStyle: baseStyle31,
  defaultProps: defaultProps26,
  sizes: sizes15
};

// node_modules/native-base/src/theme/components/radio.ts
var baseStyle32 = (props) => {
  const { colorScheme, theme: theme3 } = props;
  return {
    borderWidth: 2,
    borderRadius: "full",
    p: "2px",
    borderColor: mode("muted.300", "muted.600")(props),
    bg: mode("muted.50", "muted.700")(props),
    _text: {
      ml: 2
    },
    _interactionBox: {
      position: "absolute",
      zIndex: -1,
      borderRadius: "full"
    },
    _icon: {
      color: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props)
    },
    _hover: {
      _interactionBox: {
        bg: transparentize("muted.200", 0.3)(theme3)
      }
    },
    _focus: {
      _interactionBox: {
        bg: transparentize(`${colorScheme}.200`, 0.5)(theme3)
      }
    },
    _focusVisible: {
      _interactionBox: {
        bg: transparentize(`${colorScheme}.200`, 0.5)(theme3)
      }
    },
    _checked: {
      _interactionBox: {
        borderColor: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props)
      },
      borderColor: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props)
    },
    _disabled: {
      opacity: 0.4,
      _interactionBox: {
        bg: "transparent"
      },
      _icon: {
        bg: "transparent"
      }
    },
    _invalid: {
      borderColor: mode("error.600", "error.400")(props)
    },
    _pressed: {
      _interactionBox: {
        bg: transparentize(`${colorScheme}.200`, 0.5)(theme3)
      }
    }
  };
};
var sizes16 = {
  lg: { _icon: { size: 4 }, _text: { fontSize: "lg" } },
  md: { _icon: { size: 3 }, _text: { fontSize: "md" } },
  sm: { _icon: { size: 2 }, _text: { fontSize: "sm" } }
};
var defaultProps27 = {
  defaultIsChecked: false,
  size: "md",
  colorScheme: "primary"
};
var radio_default = {
  baseStyle: baseStyle32,
  sizes: sizes16,
  defaultProps: defaultProps27
};

// node_modules/native-base/src/theme/components/skeleton.ts
var baseStyle33 = (props) => {
  return {
    startColor: mode("muted.200", "muted.600")(props),
    endColor: "transparent",
    fadeDuration: 0.1,
    borderRadius: 3,
    speed: 1
  };
};
var baseStyleCircle = (props) => {
  return {
    startColor: mode("muted.200", "muted.600")(props),
    endColor: "transparent",
    fadeDuration: 0.1,
    borderRadius: "full",
    speed: 1
  };
};
var baseStyleText = (props) => {
  return {
    startColor: mode("muted.200", "muted.600")(props),
    endColor: "transparent",
    fadeDuration: 0.1,
    borderRadius: 3,
    speed: 1
  };
};
var defaultProps28 = {
  isLoaded: false
};
var fontSizes = {
  ...typography_default.fontSizes
};
var lineHeights = {
  ...typography_default.lineHeights
};
var defaultPropsText = {
  isLoaded: false,
  noOfLines: 1,
  lineHeight: 3
};
var SkeletonText = {
  baseStyle: baseStyleText,
  fontSizes,
  lineHeights,
  defaultProps: defaultPropsText
};
var Skeleton = {
  baseStyle: baseStyle33,
  defaultProps: defaultProps28
};
var SkeletonCircle = {
  baseStyle: baseStyleCircle,
  defaultProps: defaultProps28
};

// node_modules/native-base/src/theme/components/spinner.ts
var spinner_default = {
  baseStyle: {
    color: "primary.500"
  },
  sizes: {
    sm: "small",
    lg: "large"
  },
  defaultProps: {
    size: "small"
  }
};

// node_modules/native-base/src/theme/components/stat.ts
var defaultProps29 = {
  _statLabel: {
    fontSize: "xl"
  },
  _statNumber: {
    fontSize: "4xl",
    fontWeight: "bold",
    my: 2
  },
  _statHelpText: {
    _text: {
      color: "gray.500",
      fontSize: "xl"
    },
    flexDirection: "row",
    alignItems: "center"
  },
  _statGroup: {
    flexWrap: "wrap",
    space: 4,
    justifyContent: "space-between"
  }
};
var stat_default = {
  defaultProps: defaultProps29
};

// node_modules/native-base/src/theme/components/switch.ts
import { Platform as Platform13 } from "react-native";
var baseStyle34 = (props) => {
  const { onTrackColor, offTrackColor, onThumbColor, offThumbColor } = props;
  const colorScheme = getColorScheme(props);
  return {
    offTrackColor: offTrackColor ?? mode(Platform13.OS !== "ios" ? "gray.400" : "gray.200", Platform13.OS !== "ios" ? "gray.700" : "gray.600")(props),
    onTrackColor: onTrackColor ?? mode(Platform13.OS !== "ios" ? `${colorScheme}.300` : `${colorScheme}.500`, Platform13.OS !== "ios" ? `${colorScheme}.700` : `${colorScheme}.500`)(props),
    onThumbColor: onThumbColor ?? mode(Platform13.OS !== "ios" ? `${colorScheme}.600` : "white", Platform13.OS !== "ios" ? `${colorScheme}.500` : "white")(props),
    offThumbColor: offThumbColor ?? mode(Platform13.OS !== "ios" ? "gray.100" : "white", Platform13.OS !== "ios" ? "gray.200" : "white")(props)
  };
};
var sizes17 = {
  sm: {
    style: {
      transform: [{ scale: 0.75 }]
    }
  },
  md: {},
  lg: {
    style: {
      transform: [{ scale: 1.25 }]
    },
    margin: 1
  }
};
var defaultProps30 = {
  size: "md",
  colorScheme: "primary"
};
var switch_default = {
  baseStyle: baseStyle34,
  sizes: sizes17,
  defaultProps: defaultProps30
};

// node_modules/native-base/src/theme/components/tabs.ts
function baseStyle35(props) {
  const activeColor = getColorFormColorScheme(props);
  return {
    activeTabStyle: {
      justifyContent: "center",
      alignItems: "center",
      mb: "-2px",
      flexDirection: "row",
      _text: { fontSize: "sm", fontWeight: "bold" }
    },
    inactiveTabStyle: {
      justifyContent: "center",
      alignItems: "center",
      mb: "-2px",
      flexDirection: "row",
      _text: {
        color: mode("gray.500", "gray.400")(props),
        fontSize: "sm",
        fontWeight: "bold"
      }
    },
    activeIconProps: {
      color: activeColor,
      name: "home",
      mx: 2
    },
    inactiveIconProps: {
      name: "home",
      mx: 2
    }
  };
}
var sizes18 = {
  sm: {
    activeTabStyle: {
      _text: { fontSize: "sm" },
      py: 2,
      px: 3
    },
    inactiveTabStyle: {
      _text: { fontSize: "sm" },
      py: 2,
      px: 3
    }
  },
  md: {
    activeTabStyle: {
      _text: { fontSize: "md" },
      py: 3,
      px: 4
    },
    inactiveTabStyle: {
      _text: { fontSize: "md" },
      py: 3,
      px: 4
    }
  },
  lg: {
    activeTabStyle: {
      _text: { fontSize: "lg" },
      py: 4,
      px: 5
    },
    inactiveTabStyle: {
      _text: { fontSize: "lg" },
      py: 4,
      px: 5
    }
  }
};
function variantOutline5(props) {
  const activeColor = getColorFormColorScheme(props);
  let { colorScheme, status } = props;
  colorScheme = getColorScheme(props, colorScheme !== "primary" ? colorScheme : status);
  return {
    activeTabStyle: {
      borderColor: activeColor,
      _text: {
        color: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props)
      },
      _hover: {
        bg: mode(`${colorScheme}.50`, `${colorScheme}.800`)(props)
      },
      borderBottomWidth: 2
    },
    inactiveTabStyle: {
      borderColor: "transparent",
      borderBottomWidth: 2,
      _hover: {
        bg: mode(`${colorScheme}.50`, `${colorScheme}.800`)(props)
      }
    },
    tabBarStyle: {
      borderBottomWidth: 2,
      borderColor: mode("muted.200", "muted.500")(props)
    }
  };
}
function variantFilled(props) {
  const activeColor = getColorFormColorScheme(props);
  let { colorScheme, status } = props;
  colorScheme = getColorScheme(props, colorScheme !== "primary" ? colorScheme : status);
  return {
    activeTabStyle: {
      borderColor: activeColor,
      _text: { color: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props) },
      _hover: {
        bg: mode(`${colorScheme}.50`, `${colorScheme}.800`)(props)
      },
      borderBottomWidth: 2,
      bg: mode(`${colorScheme}.100`, `${colorScheme}.700`)(props)
    },
    inactiveTabStyle: {
      borderColor: "transparent",
      borderBottomWidth: 2,
      _hover: {
        bg: mode(`${colorScheme}.50`, `${colorScheme}.800`)(props)
      }
    },
    tabBarStyle: {
      borderBottomWidth: 2,
      borderColor: mode("muted.200", "muted.500")(props)
    }
  };
}
function variantFilledOutline(props) {
  const activeColor = getColorFormColorScheme(props);
  let { colorScheme, status } = props;
  colorScheme = getColorScheme(props, colorScheme !== "primary" ? colorScheme : status);
  return {
    activeTabStyle: {
      borderColor: activeColor,
      _text: { color: mode(`${colorScheme}.600`, `${colorScheme}.200`)(props) },
      _hover: {
        bg: mode(`${colorScheme}.50`, `${colorScheme}.800`)(props)
      },
      borderBottomWidth: 2
    },
    inactiveTabStyle: {
      borderColor: "transparent",
      borderBottomWidth: 2,
      _hover: {
        bg: mode(`${colorScheme}.50`, `${colorScheme}.800`)(props)
      }
    },
    tabBarStyle: {
      borderBottomWidth: 2,
      borderColor: mode("muted.200", "muted.500")(props),
      bg: mode(`${colorScheme}.100`, `${colorScheme}.700`)(props)
    }
  };
}
var variants7 = {
  "outline": variantOutline5,
  "filled": variantFilled,
  "filled-outline": variantFilledOutline
};
var defaultProps31 = {
  size: "md",
  variant: "outline",
  colorScheme: "primary"
};
var tabs_default = {
  baseStyle: baseStyle35,
  variants: variants7,
  sizes: sizes18,
  defaultProps: defaultProps31
};

// node_modules/native-base/src/theme/components/tag.ts
var { variants: variants8 } = badge_default;
var baseStyle36 = {
  _text: {
    fontWeight: "medium"
  },
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  display: "flex"
};
var sizes19 = {
  sm: {
    minH: 5,
    minW: 5,
    _text: {
      fontSize: "xs"
    },
    p: 1,
    borderRadius: "sm"
  },
  md: {
    minH: 6,
    minW: 6,
    _text: {
      fontSize: "sm"
    },
    borderRadius: "md",
    p: 2
  },
  lg: {
    minH: 8,
    minW: 8,
    _text: {
      fontSize: "md"
    },
    borderRadius: "md",
    p: 3
  }
};
var defaultProps32 = {
  size: "md",
  variant: "subtle",
  colorScheme: "primary"
};
var tag_default = {
  variants: variants8,
  baseStyle: baseStyle36,
  sizes: sizes19,
  defaultProps: defaultProps32
};

// node_modules/native-base/src/theme/components/text.ts
var baseStyle37 = (props) => {
  return {
    color: mode("coolGray.800", "warmGray.50")(props),
    fontWeight: "400",
    fontFamily: "body",
    fontStyle: "normal",
    fontSize: "sm",
    letterSpacing: "md",
    lineHeight: "lg"
  };
};
var defaultProps33 = {};
var text_default = { baseStyle: baseStyle37, defaultProps: defaultProps33 };

// node_modules/native-base/src/theme/components/app-bar.ts
var baseStyle38 = (props) => {
  let colorScheme = getColorScheme(props);
  return {
    bg: mode(`${colorScheme}.500`, `${colorScheme}.300`)(props),
    px: 2
  };
};
var defaultProps34 = {
  colorScheme: "primary"
};
var app_bar_default = {
  baseStyle: baseStyle38,
  defaultProps: defaultProps34
};

// node_modules/native-base/src/theme/components/textarea.ts
import { Platform as Platform14 } from "react-native";
var baseStyle39 = {
  multiline: true,
  p: "2",
  totalLines: 4,
  h: Platform14.select({ ios: 20 }),
  textAlignVertical: "top"
};
var textarea_default = { baseStyle: baseStyle39 };

// node_modules/native-base/src/theme/components/textField.ts
var baseStyle40 = (props) => {
  return {
    _errorMessageProps: {
      mt: 1,
      ml: 3,
      fontSize: "xs",
      color: "error.400"
    },
    _helperTextProps: {
      mt: 1,
      ml: 3,
      fontSize: "xs",
      color: mode("muted.400", "muted.500")(props)
    }
  };
};
var TextField = {
  baseStyle: baseStyle40,
  defaultProps: {
    component: "input"
  }
};

// node_modules/native-base/src/theme/components/toast.ts
var baseStyle41 = (props) => {
  return {
    bg: mode(`coolGray.600`, `warmGray.200`)(props),
    p: "2",
    rounded: "sm",
    shadow: 1,
    _title: {
      color: mode(`warmGray.200`, `coolGray.600`)(props),
      fontWeight: 700
    },
    _description: {
      color: mode(`warmGray.200`, `coolGray.600`)(props),
      fontWeight: 400
    },
    _closeIcon: {
      size: 4
    }
  };
};
var Toast = {
  baseStyle: baseStyle41,
  defaultProps: {}
};

// node_modules/native-base/src/theme/components/transitions.ts
var fadeDefaultProps = {
  entryDuration: 500,
  exitDuration: 500
};
var Fade = {
  defaultProps: fadeDefaultProps
};
var scaleFadeDefaultProps = {
  duration: 500,
  initialScale: 0.9
};
var ScaleFade = {
  defaultProps: scaleFadeDefaultProps
};
var slideDefaultProps = {
  duration: 500,
  placement: "bottom"
};
var Slide = {
  defaultProps: slideDefaultProps
};
var slideFadeDefaultProps = {
  duration: 500,
  offsetX: 10,
  offsetY: 10
};
var SlideFade = {
  defaultProps: slideFadeDefaultProps
};

// node_modules/native-base/src/theme/components/list.ts
var List = {
  baseStyle: (props) => {
    return {
      py: 2,
      borderWidth: 1,
      borderColor: "gray.300",
      _hover: { bg: mode("primary.100", "primary.700")(props) }
    };
  }
};
var ListItem = {
  baseStyle: {
    py: 2,
    borderColor: "gray.300"
  },
  defaultProps: {
    start: 1
  }
};
var ListIcon = {
  baseStyle: {
    mr: 8,
    size: "md"
  }
};

// node_modules/native-base/src/theme/components/typeahead.ts
var typeaheadSearchItemBaseStyle = (props) => {
  return {
    backgroundColor: mode("gray.100", "gray.600")(props),
    _focus: {
      backgroundColor: mode("primary.300", "primary.700")(props)
    },
    _disabled: {
      backgroundColor: "gray.200"
    }
  };
};
var TypeAheadSearchItem = {
  baseStyle: typeaheadSearchItemBaseStyle
};

// node_modules/native-base/src/theme/components/wrap.ts
var Wrap = {};

// node_modules/native-base/src/theme/components/flex.ts
var defaultProps35 = { flexDirection: "column" };
var flex_default = {
  defaultProps: defaultProps35
};

// node_modules/native-base/src/theme/components/stack.ts
var baseStyle42 = {};
var defaultProps36 = {};
var sizes20 = {
  "gutter": 0,
  "2xs": 1,
  "xs": 2,
  "sm": 3,
  "md": 4,
  "lg": 6,
  "xl": 7,
  "2xl": 8
};
var stack_default = {
  baseStyle: baseStyle42,
  defaultProps: defaultProps36,
  sizes: sizes20
};

// node_modules/native-base/src/theme/components/view.ts
var baseStyle43 = {};
var defaultProps37 = {};
var view_default = {
  baseStyle: baseStyle43,
  defaultProps: defaultProps37
};

// node_modules/native-base/src/theme/components/zstack.ts
var baseStyle44 = {};
var defaultProps38 = {};
var zstack_default = {
  baseStyle: baseStyle44,
  defaultProps: defaultProps38
};

// node_modules/native-base/src/theme/components/fab.ts
var placementProps = {
  "top-right": { top: 4, right: 4, position: "absolute" },
  "top-left": { top: 4, left: 4, position: "absolute" },
  "bottom-right": { bottom: 4, right: 4, position: "absolute" },
  "bottom-left": { bottom: 4, left: 4, position: "absolute" }
};
var baseStyle45 = {
  shadow: 7,
  rounded: "full",
  zIndex: 20,
  placementProps,
  px: 4,
  py: 4
};
var defaultProps39 = {
  renderInPortal: true,
  variant: "solid",
  colorScheme: "primary",
  placement: "bottom-right"
};
var fab_default = { baseStyle: baseStyle45, defaultProps: defaultProps39 };

// node_modules/native-base/src/theme/components/slider.ts
var SliderTrack = {
  baseStyle: (props) => {
    const simplifiedColorScheme = getColorScheme(props);
    return {
      bg: `${simplifiedColorScheme}.100`,
      borderRadius: "lg",
      overflow: "hidden"
    };
  }
};
var SliderThumb = {
  baseStyle: (props) => {
    const simplifiedColorScheme = getColorScheme(props);
    return {
      borderRadius: 99999,
      zIndex: 999,
      alignItems: "center",
      justifyContent: "center",
      bg: mode(`${simplifiedColorScheme}.600`, `${simplifiedColorScheme}.300`)(props),
      scaleOnPressed: 1.2
    };
  }
};
var SliderFilledTrack = {
  baseStyle: (props) => {
    const simplifiedColorScheme = getColorScheme(props);
    return {
      bg: mode(`${simplifiedColorScheme}.600`, `${simplifiedColorScheme}.300`)(props)
    };
  }
};
var sizes21 = {
  lg: { thumbSize: 6, sliderSize: 6 },
  md: { thumbSize: 5, sliderSize: 5 },
  sm: { thumbSize: 4, sliderSize: 4 }
};
var Slider = {
  defaultProps: {
    size: "sm"
  },
  sizes: sizes21
};

// node_modules/native-base/src/theme/components/inputleftaddon.ts
var baseStyle46 = (props) => {
  return {
    borderRightWidth: "0",
    roundedLeft: "4",
    bg: mode("gray.50", "gray.700")(props),
    p: "2",
    borderColor: mode("gray.300", "gray.600")(props),
    borderWidth: "1",
    _text: {
      color: mode("muted.400", "muted.500")(props)
    }
  };
};
var inputleftaddon_default = { baseStyle: baseStyle46 };

// node_modules/native-base/src/theme/components/inputrightaddon.ts
var baseStyle47 = (props) => {
  return {
    borderLeftWidth: "0",
    roundedRight: "4",
    bg: mode("gray.50", "gray.700")(props),
    p: "2",
    borderColor: mode("gray.300", "gray.600")(props),
    borderWidth: "1",
    _text: {
      color: mode("muted.400", "muted.500")(props)
    }
  };
};
var inputrightaddon_default = { baseStyle: baseStyle47 };

// node_modules/native-base/src/theme/components/index.ts
var components_default = {
  FlatList: flatList_default,
  KeyboardAvoidingView: keyboardAvoidingView_default,
  ScrollView: scrollView_default,
  SectionList: sectionList_default,
  StatusBar: statusBar_default,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionSummary,
  AccordionDetails,
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  Alert,
  AlertIcon,
  AspectRatio: aspect_ratio_default,
  Avatar: avatar_default,
  AvatarBadge: avatar_badge_default,
  AvatarGroup: avatar_group_default,
  Badge: badge_default,
  Box: box_default,
  Breadcrumb,
  BreadcrumbText,
  BreadcrumbIcon,
  Button: button_default,
  ButtonGroup,
  Card: card_default,
  Center: center_default,
  Checkbox: checkbox_default,
  CircularProgress: circular_progress_default,
  Code: code_default,
  Container: container_default,
  Divider: divider_default,
  Fade,
  FAB: fab_default,
  Flex: flex_default,
  FormControl,
  FormControlLabel,
  FormControlHelperText,
  FormControlErrorMessage,
  Heading: heading_default,
  HStack: hstack_default,
  VStack: vstack_default,
  Icon: icon_default,
  IconButton: icon_button_default,
  Image,
  Input,
  InputLeftAddon: inputleftaddon_default,
  InputRightAddon: inputrightaddon_default,
  Kbd: kbd_default,
  Link: link_default,
  List,
  ListItem,
  ListIcon,
  Menu: menu_default,
  MenuGroup,
  MenuItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  NumberInput: number_input_default,
  NumberInputStepper,
  PinInput: pin_input_default,
  Pressable: pressable_default,
  ...popover_exports,
  Progress: progress_default,
  Radio: radio_default,
  ScaleFade,
  Select,
  SelectItem,
  SimpleGrid: simple_grid_default,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Slider,
  Slide,
  SlideFade,
  Spinner: spinner_default,
  Stack: stack_default,
  Stat: stat_default,
  Switch: switch_default,
  Tabs: tabs_default,
  Tag: tag_default,
  Text: text_default,
  AppBar: app_bar_default,
  TextArea: textarea_default,
  TextField,
  Toast,
  TypeAheadSearchItem,
  View: view_default,
  Wrap,
  ZStack: zstack_default,
  Tooltip
};

// node_modules/native-base/src/theme/index.ts
var config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  accessibleColors: false
};
var theme2 = {
  ...base_default,
  components: components_default,
  config
};

// node_modules/native-base/src/hooks/useSafeArea/utils.ts
import isNil4 from "lodash.isnil";
function calculatePaddingProps(safeAreaProps, paddingProps, insets, sizes22) {
  return tools_exports.omitUndefined({
    pt: calculatePaddingTop(safeAreaProps, paddingProps, insets, sizes22),
    pb: calculatePaddingBottom(safeAreaProps, paddingProps, insets, sizes22),
    pl: calculatePaddingLeft(safeAreaProps, paddingProps, insets, sizes22),
    pr: calculatePaddingRight(safeAreaProps, paddingProps, insets, sizes22)
  });
}
function getValueInPixels(paddingProps, paddingKeys, sizes22, inset, manualInset) {
  let appliedInset = 0;
  let originalValue = paddingKeys.length ? sizes22[paddingProps[paddingKeys[paddingKeys.length - 1]]] : 0;
  if (!isNil4(manualInset) && typeof manualInset !== "boolean") {
    appliedInset = typeof manualInset === "string" && manualInset.includes("px") ? parseInt(manualInset, 10) : sizes22[manualInset];
  } else {
    appliedInset = inset;
  }
  if (typeof originalValue === "string") {
    if (originalValue.endsWith("px")) {
      return parseInt(originalValue, 10) + parseInt(appliedInset, 10) + "px";
    } else if (originalValue.endsWith("rem")) {
      return parseFloat(originalValue) * baseFontSize + parseInt(appliedInset, 10) + "px";
    }
  }
  return originalValue ? parseInt(originalValue, 10) + parseInt(appliedInset, 10) + "px" : parseInt(appliedInset, 10) + "px";
}
function calculatePaddingTop(safeAreaProps, paddingProps, insets, sizes22) {
  if (isNil4(safeAreaProps.safeArea) && isNil4(safeAreaProps.safeAreaTop) && isNil4(safeAreaProps.safeAreaY)) {
    return;
  }
  let [topSafeAreaProps] = tools_exports.orderedExtractInObject(safeAreaProps, [
    "safeArea",
    "safeAreaY",
    "safeAreaTop"
  ]);
  let topSafeAreaArray = Object.keys(topSafeAreaProps);
  const manualInset = topSafeAreaArray.length ? topSafeAreaProps[topSafeAreaArray[topSafeAreaArray.length - 1]] : void 0;
  if (!insets.top && (typeof manualInset === "boolean" || !manualInset)) {
    return;
  }
  const propKeys = getRelatedPaddingProps(paddingProps, [
    "p",
    "padding",
    "pt",
    "paddingTop",
    "py",
    "paddingY"
  ]);
  return getValueInPixels(paddingProps, propKeys, sizes22, insets.top, manualInset);
}
function calculatePaddingBottom(safeAreaProps, paddingProps, insets, sizes22) {
  if (isNil4(safeAreaProps.safeArea) && isNil4(safeAreaProps.safeAreaBottom) && isNil4(safeAreaProps.safeAreaY)) {
    return;
  }
  let [bottomSafeAreaProps] = tools_exports.orderedExtractInObject(safeAreaProps, [
    "safeArea",
    "safeAreaY",
    "safeAreaBottom"
  ]);
  let bottomSafeAreaArray = Object.keys(bottomSafeAreaProps);
  const manualInset = bottomSafeAreaArray.length ? bottomSafeAreaProps[bottomSafeAreaArray[bottomSafeAreaArray.length - 1]] : void 0;
  if (!insets.bottom && (!manualInset || typeof manualInset === "boolean")) {
    return;
  }
  const propKeys = getRelatedPaddingProps(paddingProps, [
    "p",
    "padding",
    "pb",
    "paddingBottom",
    "py",
    "paddingY"
  ]);
  return getValueInPixels(paddingProps, propKeys, sizes22, insets.bottom, manualInset);
}
function calculatePaddingLeft(safeAreaProps, paddingProps, insets, sizes22) {
  if (isNil4(safeAreaProps.safeArea) && isNil4(safeAreaProps.safeAreaLeft) && isNil4(safeAreaProps.safeAreaX)) {
    return;
  }
  let [leftSafeAreaProps] = tools_exports.orderedExtractInObject(safeAreaProps, [
    "safeArea",
    "safeAreaLeft",
    "safeAreaX"
  ]);
  let leftSafeAreaArray = Object.keys(leftSafeAreaProps);
  const manualInset = leftSafeAreaArray.length ? leftSafeAreaProps[leftSafeAreaArray[leftSafeAreaArray.length - 1]] : void 0;
  if (!insets.left && (!manualInset || typeof manualInset === "boolean")) {
    return;
  }
  const propKeys = getRelatedPaddingProps(paddingProps, [
    "p",
    "padding",
    "pl",
    "paddingLeft",
    "px",
    "paddingX"
  ]);
  return getValueInPixels(paddingProps, propKeys, sizes22, insets.left, manualInset);
}
function calculatePaddingRight(safeAreaProps, paddingProps, insets, sizes22) {
  if (isNil4(safeAreaProps.safeArea) && isNil4(safeAreaProps.safeAreaRight) && isNil4(safeAreaProps.safeAreaX)) {
    return;
  }
  let [rightSafeAreaProps] = tools_exports.orderedExtractInObject(safeAreaProps, [
    "safeArea",
    "safeAreaX",
    "safeAreaRight"
  ]);
  let rightSafeAreaArray = Object.keys(rightSafeAreaProps);
  const manualInset = rightSafeAreaArray.length ? rightSafeAreaProps[rightSafeAreaArray[rightSafeAreaArray.length - 1]] : void 0;
  if (!insets.right && (!manualInset || typeof manualInset === "boolean")) {
    return;
  }
  const propKeys = getRelatedPaddingProps(paddingProps, [
    "p",
    "padding",
    "pr",
    "paddingRight",
    "px",
    "paddingX"
  ]);
  return getValueInPixels(paddingProps, propKeys, sizes22, insets.right, manualInset);
}
function getRelatedPaddingProps(props, relatedKeys) {
  return Object.keys(props).filter((key) => relatedKeys.includes(key));
}
function getSortedProps(props) {
  let [
    safeAreaProps,
    sansSafeAreaProps
  ] = tools_exports.orderedExtractInObject(props, [
    "safeArea",
    "safeAreaX",
    "safeAreaY",
    "safeAreaTop",
    "safeAreaBottom",
    "safeAreaLeft",
    "safeAreaRight"
  ]);
  let [
    paddingProps,
    sansPaddingProps
  ] = tools_exports.orderedExtractInObject(sansSafeAreaProps, [
    "p",
    "padding",
    "pt",
    "paddingTop",
    "pr",
    "paddingRight",
    "pb",
    "paddingBottom",
    "pl",
    "paddingLeft",
    "px",
    "paddingX",
    "py",
    "paddingY"
  ]);
  return { safeAreaProps, paddingProps, sansPaddingProps };
}

// node_modules/native-base/src/hooks/useSafeArea/index.ts
function useSafeArea(props) {
  const insets = useSafeAreaInsets();
  const sizes22 = useTheme().sizes;
  const { safeAreaProps, paddingProps, sansPaddingProps } = getSortedProps(props);
  if (!Object.keys(safeAreaProps).length) {
    return props;
  }
  let calcualtedPaddingProps = calculatePaddingProps(safeAreaProps, paddingProps, insets, sizes22);
  return { ...sansPaddingProps, ...paddingProps, ...calcualtedPaddingProps };
}

// node_modules/native-base/src/hooks/useScreenReaderEnabled.ts
import React8 from "react";
import { AccessibilityInfo } from "react-native";
function useScreenReaderEnabled() {
  const [enabled, setEnabled] = React8.useState(false);
  const mountedRef = React8.useRef(false);
  const handleSetEnabled = (value) => {
    if (mountedRef.current) {
      setEnabled(value);
    }
  };
  React8.useEffect(() => {
    mountedRef.current = true;
    async function setInitialValue() {
      const res = await AccessibilityInfo.isScreenReaderEnabled();
      handleSetEnabled(res);
    }
    let handler = AccessibilityInfo.addEventListener("screenReaderChanged", (event) => {
      handleSetEnabled(event);
    });
    setInitialValue();
    return () => {
      mountedRef.current = false;
      AccessibilityInfo.removeEventListener("screenReaderChanged", handler);
    };
  });
  return enabled;
}

// node_modules/native-base/src/hooks/useKeyboardDismissable.ts
import React9 from "react";
import { useEffect as useEffect3 } from "react";
import { BackHandler } from "react-native";
var keyboardDismissHandlers = [];
var keyboardDismissHandlerManager = {
  push: (handler) => {
    keyboardDismissHandlers.push(handler);
    return () => {
      keyboardDismissHandlers = keyboardDismissHandlers.filter((h) => h !== handler);
    };
  },
  length: () => keyboardDismissHandlers.length,
  pop: () => {
    return keyboardDismissHandlers.pop();
  }
};
var useKeyboardDismissable = ({ enabled, callback }) => {
  React9.useEffect(() => {
    let cleanupFn = () => {
    };
    if (enabled) {
      cleanupFn = keyboardDismissHandlerManager.push(callback);
    } else {
      cleanupFn();
    }
    return () => {
      cleanupFn();
    };
  }, [enabled, callback]);
  useBackHandler({ enabled, callback });
};
function useBackHandler({ enabled, callback }) {
  useEffect3(() => {
    let backHandler = () => {
      callback();
      return true;
    };
    if (enabled) {
      BackHandler.addEventListener("hardwareBackPress", backHandler);
    } else {
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
    }
    return () => BackHandler.removeEventListener("hardwareBackPress", backHandler);
  }, [enabled, callback]);
}

// node_modules/native-base/src/hooks/useLayout.tsx
import React10 from "react";
var useLayout = () => {
  const [layout2, setLayout] = React10.useState({
    width: 0,
    height: 0
  });
  return {
    onLayout: (e) => {
      setLayout(e.nativeEvent.layout);
    },
    layout: layout2
  };
};

// node_modules/native-base/src/utils/styled.tsx
var makeStyledComponent = (Comp) => {
  return React11.forwardRef(({ debug, ...props }, ref) => {
    const [style, restProps] = useStyledSystemPropsResolver(props);
    if (debug) {
      console.log("style:: => ", style, " restProps:: => ", restProps);
    }
    return /* @__PURE__ */ React11.createElement(Comp, {
      ...restProps,
      style,
      ref
    }, props.children);
  });
};

// node_modules/native-base/src/hooks/useResolvedFontFamily.ts
function useResolvedFontFamily(props) {
  const { fontFamily, fontStyle, fontWeight } = props;
  let newFontFamily = fontFamily;
  let newFontStyle = fontStyle;
  let newFontWeight = fontWeight;
  const { fontConfig, fontWeights, fonts } = useTheme();
  if (fontWeight && fontStyle && fontFamily && fontFamily in fonts) {
    const fontToken = fonts[fontFamily];
    if (fontConfig && fontConfig[fontToken]) {
      newFontWeight = void 0;
      newFontStyle = void 0;
      let fontWeightNumber = fontWeight in fontWeights ? fontWeights[fontWeight] : fontWeight;
      let fontVariant = fontConfig[fontToken][fontWeightNumber];
      if (typeof fontVariant === "object") {
        if (fontVariant[fontStyle])
          newFontFamily = fontVariant[fontStyle];
      } else {
        newFontFamily = fontVariant;
      }
    } else {
      newFontFamily = fonts[fontFamily];
    }
  }
  return {
    fontFamily: newFontFamily,
    fontWeight: newFontWeight,
    fontStyle: newFontStyle
  };
}

// node_modules/native-base/src/components/primitives/Text/index.tsx
import { Text as NativeText } from "react-native";

// node_modules/native-base/src/hooks/useHasResponsiveProps.ts
function useHasResponsiveProps(props) {
  if (props) {
  }
  return false;
}

// node_modules/native-base/src/components/primitives/Text/index.tsx
var StyledText = makeStyledComponent(NativeText);
var TextAncestorContext = React12.createContext(false);
var Text = ({ children, ...props }, ref) => {
  const hasTextAncestor = React12.useContext(TextAncestorContext);
  const {
    isTruncated,
    noOfLines,
    bold,
    italic,
    sub,
    highlight,
    underline,
    strikeThrough,
    fontFamily: propFontFamily,
    fontWeight: propFontWeight,
    fontStyle: propFontStyle,
    _hover,
    fontSize,
    numberOfLines,
    ...reslovedProps
  } = usePropsResolution("Text", props, {}, {
    resolveResponsively: ["noOfLines", "numberOfLines"],
    componentTheme: hasTextAncestor ? {} : void 0
  });
  const _ref = useRef(null);
  const { isHovered } = useHover({}, _hover ? _ref : null);
  let fontFamily = propFontFamily;
  const fontStyle = italic ? "italic" : propFontStyle;
  const fontWeight = bold ? "bold" : propFontWeight;
  const resolvedFontFamily = useResolvedFontFamily({
    fontFamily,
    fontWeight: fontWeight ?? (hasTextAncestor ? void 0 : 400),
    fontStyle: fontStyle ?? (hasTextAncestor ? void 0 : "normal")
  });
  if (resolvedFontFamily) {
    fontFamily = resolvedFontFamily;
  }
  if (useHasResponsiveProps(props)) {
    return null;
  }
  const propsToSpread = {
    ...reslovedProps,
    numberOfLines: numberOfLines || noOfLines ? numberOfLines || noOfLines : isTruncated ? 1 : void 0,
    ...resolvedFontFamily,
    bg: highlight ? "warning.300" : reslovedProps.bg,
    textDecorationLine: underline && strikeThrough ? "underline line-through" : underline ? "underline" : strikeThrough ? "line-through" : reslovedProps.textDecorationLine,
    fontSize: sub ? 10 : fontSize,
    ref: mergeRefs([ref, _ref]),
    ...isHovered && _hover
  };
  return hasTextAncestor ? /* @__PURE__ */ React12.createElement(StyledText, {
    ...propsToSpread
  }, children) : /* @__PURE__ */ React12.createElement(TextAncestorContext.Provider, {
    value: true
  }, /* @__PURE__ */ React12.createElement(StyledText, {
    ...propsToSpread
  }, children));
};
var Text_default = memo(forwardRef(Text));

// node_modules/native-base/src/components/primitives/Box/index.tsx
var StyledBox = makeStyledComponent(View);
var MemoizedGradient;
var Box = ({ children, ...props }, ref) => {
  const { _text, ...resolvedProps } = usePropsResolution("Box", props);
  let Gradient = useNativeBaseConfig("NativeBaseConfigProvider").config.dependencies?.["linear-gradient"];
  const safeAreaProps = useSafeArea(resolvedProps);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  if (resolvedProps.bg?.linearGradient || resolvedProps.background?.linearGradient || resolvedProps.bgColor?.linearGradient || resolvedProps.backgroundColor?.linearGradient) {
    const lgrad = resolvedProps.bg?.linearGradient || resolvedProps.background?.linearGradient || resolvedProps.bgColor?.linearGradient || resolvedProps.backgroundColor?.linearGradient;
    if (Gradient) {
      if (!MemoizedGradient) {
        MemoizedGradient = makeStyledComponent(Gradient);
      }
      Gradient = MemoizedGradient;
      let startObj = { x: 0, y: 0 };
      let endObj = { x: 0, y: 1 };
      if (lgrad.start && lgrad.start.length === 2) {
        startObj = {
          x: lgrad.start[0],
          y: lgrad.start[1]
        };
      }
      if (lgrad.end && lgrad.end.length === 2) {
        endObj = {
          x: lgrad.end[0],
          y: lgrad.end[1]
        };
      }
      const backgroundColorProps = [
        "bg",
        "bgColor",
        "background",
        "backgroundColor"
      ];
      backgroundColorProps.forEach((backgroundColorProp) => {
        if (backgroundColorProp in safeAreaProps)
          delete safeAreaProps[backgroundColorProp];
      });
      return /* @__PURE__ */ React13.createElement(Gradient, {
        ref,
        ...safeAreaProps,
        colors: lgrad.colors,
        start: startObj,
        end: endObj,
        locations: lgrad.locations
      }, React13.Children.map(children, (child) => typeof child === "string" || typeof child === "number" ? /* @__PURE__ */ React13.createElement(Text_default, {
        ..._text
      }, child) : child));
    }
  }
  return /* @__PURE__ */ React13.createElement(StyledBox, {
    ref,
    ...safeAreaProps
  }, React13.Children.map(children, (child) => {
    return typeof child === "string" || typeof child === "number" || child?.type === React13.Fragment && (typeof child.props?.children === "string" || typeof child.props?.children === "number") ? /* @__PURE__ */ React13.createElement(Text_default, {
      ..._text
    }, child) : child;
  }));
};
var Box_default = memo2(forwardRef2(Box));

// node_modules/native-base/src/components/composites/AspectRatio/index.tsx
var AspectView = React14.forwardRef((props, ref) => {
  const [layout2, setLayout] = React14.useState();
  const inputStyle = [StyleSheet3.flatten(props.style) || {}];
  if (layout2) {
    let { width = 0, height = 0 } = layout2;
    if (width === 0) {
      inputStyle.push({ width: height * props.aspectRatio, height });
    } else {
      inputStyle.push({ width, height: width / props.aspectRatio });
    }
  }
  return /* @__PURE__ */ React14.createElement(Box_default, {
    ...props,
    ref,
    style: inputStyle,
    onLayout: ({ nativeEvent: { layout: inLayout } }) => setLayout(inLayout)
  });
});
var AspectRatio = (props, ref) => {
  const { style, ratio, children, ...resolvedProps } = usePropsResolution("AspectRatio", props, {}, { resolveResponsively: ["ratio"] });
  let computedStyle = style;
  let newChildWithProps = React14.cloneElement(children, {
    ...children.props,
    style: StyleSheet3.absoluteFillObject
  }, children.props.children);
  if (useHasResponsiveProps(resolvedProps)) {
    return null;
  }
  if (Platform15.OS === "web") {
    return /* @__PURE__ */ React14.createElement(AspectView, {
      ...resolvedProps,
      aspectRatio: ratio,
      style,
      ref
    }, newChildWithProps);
  } else {
    computedStyle = StyleSheet3.flatten([style, { aspectRatio: ratio }]);
    return /* @__PURE__ */ React14.createElement(Box_default, {
      ...resolvedProps,
      style: computedStyle,
      ref
    }, newChildWithProps);
  }
};
var AspectRatio_default = React14.memo(React14.forwardRef(AspectRatio));

// node_modules/native-base/src/components/composites/Badge/index.tsx
import React15, { memo as memo3, forwardRef as forwardRef3 } from "react";
var Badge = ({ children, ...props }, ref) => {
  let newProps = usePropsResolution("Badge", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React15.createElement(Box_default, {
    ...newProps,
    ref
  }, children);
};
var Badge_default = memo3(forwardRef3(Badge));

// node_modules/native-base/src/components/composites/Card/Card.tsx
import React16, { memo as memo4, forwardRef as forwardRef4 } from "react";
var Card = ({ children, ...props }, ref) => {
  const resolvedProps = usePropsResolution("Card", props);
  return /* @__PURE__ */ React16.createElement(Box_default, {
    ...resolvedProps,
    ref
  }, children);
};
var Card_default = memo4(forwardRef4(Card));

// node_modules/native-base/src/components/composites/Card/index.tsx
var Card_default2 = Card_default;

// node_modules/native-base/src/components/composites/IconButton/index.tsx
import React28, { memo as memo9, forwardRef as forwardRef9 } from "react";

// node_modules/native-base/src/components/primitives/Pressable/Pressable.tsx
import React22, { forwardRef as forwardRef5, memo as memo5 } from "react";
import { Pressable as RNPressable } from "react-native";

// node_modules/native-base/src/utils/getSpacedChildren.tsx
import React17 from "react";
var getSpacedChildren_default = (children, space2, axis, reverse, divider) => {
  let childrenArray = React17.Children.toArray(children);
  childrenArray = reverse === "reverse" ? [...childrenArray].reverse() : childrenArray;
  const orientation = axis === "X" ? "vertical" : "horizontal";
  if (divider) {
    const spacingProp = {
      ...axis === "X" ? { mx: space2 } : { my: space2 }
    };
    divider = React17.cloneElement(divider, {
      orientation,
      ...spacingProp
    });
    childrenArray = childrenArray.map((child, index) => {
      return /* @__PURE__ */ React17.createElement(React17.Fragment, {
        key: child.key ?? `spaced-child-${index}`
      }, child, index < childrenArray.length - 1 && divider);
    });
  } else {
    const spacingProp = {
      ...axis === "X" ? { width: space2 } : { height: space2 }
    };
    childrenArray = childrenArray.map((child, index) => {
      return /* @__PURE__ */ React17.createElement(React17.Fragment, {
        key: child.key ?? `spaced-child-${index}`
      }, child, index < childrenArray.length - 1 && /* @__PURE__ */ React17.createElement(Box_default, {
        ...spacingProp
      }));
    });
  }
  return childrenArray;
};

// node_modules/native-base/src/utils/getAbsoluteChildren.ts
import React18 from "react";
import { Platform as Platform16 } from "react-native";
var getAbsoluteChildren_default = (children, reverse) => {
  let childrenArray = React18.Children.toArray(children);
  if (reverse) {
    childrenArray = childrenArray.reverse();
  }
  const trailingChildrenWithSpacing = childrenArray.map((child) => {
    return React18.cloneElement(child, Platform16.OS === "web" ? { style: { position: "absolute" } } : { position: "absolute" }, child.props.children);
  });
  return [trailingChildrenWithSpacing];
};

// node_modules/native-base/src/utils/getAttachedChildren.ts
import React19 from "react";
var getAttachedChildren_default = (children) => {
  const childrenArray = React19.Children.toArray(children);
  const trailingChildren = childrenArray.slice(1);
  trailingChildren.pop();
  const marginProp = {
    ...{ ml: 0, mr: 0, roundedRight: 0, roundedLeft: 0 }
  };
  const leftElemProp = {
    ...{ mr: 0, roundedRight: 0 }
  };
  const rightElemProp = {
    ...{ ml: 0, roundedLeft: 0 }
  };
  const trailingChildrenWithSpacing = trailingChildren.map((child) => {
    return React19.cloneElement(child, marginProp, child.props.children);
  });
  return [
    React19.cloneElement(childrenArray[0], leftElemProp, childrenArray[0].props.children),
    ...trailingChildrenWithSpacing,
    React19.cloneElement(childrenArray[childrenArray.length - 1], rightElemProp, childrenArray[childrenArray.length - 1].props.children)
  ];
};

// node_modules/native-base/src/utils/addTextAndPropsToStrings.tsx
import React20 from "react";

// node_modules/native-base/src/utils/canUseDom.ts
import { Platform as Platform17 } from "react-native";
function canUseDom() {
  if (typeof window !== "undefined" || Platform17.OS !== "web") {
    return true;
  }
  return false;
}

// node_modules/native-base/src/utils/combineContextAndProps.ts
var combineContextAndProps = (context, props) => {
  return {
    ...context,
    ...props
  };
};

// node_modules/native-base/src/utils/accessibilityUtils.ts
var ariaAttr = (condition) => condition ? true : void 0;

// node_modules/native-base/src/utils/useKeyboardBottomInset.ts
import {
  useEffect as useEffect4,
  useRef as useRef2,
  useState as useState3
} from "react";
import { Keyboard, Platform as Platform18 } from "react-native";
var useKeyboardBottomInset = () => {
  const [bottom, setBottom] = useState3(0);
  const subscriptions = useRef2([]);
  useEffect4(() => {
    function onKeyboardChange(e) {
      if (e.startCoordinates && e.endCoordinates.screenY < e.startCoordinates.screenY)
        setBottom(e.endCoordinates.height / 2);
      else
        setBottom(0);
    }
    if (Platform18.OS === "ios") {
      subscriptions.current = [
        Keyboard.addListener("keyboardWillChangeFrame", onKeyboardChange)
      ];
    } else {
      subscriptions.current = [
        Keyboard.addListener("keyboardDidHide", onKeyboardChange),
        Keyboard.addListener("keyboardDidShow", onKeyboardChange)
      ];
    }
    return () => {
      subscriptions.current.forEach((subscription) => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);
  return bottom;
};

// node_modules/native-base/src/utils/isEmptyObj.ts
function isEmptyObj(obj) {
  for (var _x in obj) {
    return false;
  }
  return true;
}

// node_modules/native-base/src/components/primitives/Pressable/Pressable.tsx
import { useFocusRing } from "@react-native-aria/focus";
var useHover2 = () => {
  const [isHovered, setHovered] = React22.useState(false);
  return {
    hoverProps: {
      onHoverIn: () => setHovered(true),
      onHoverOut: () => setHovered(false)
    },
    isHovered
  };
};
var useFocus = () => {
  const [isFocused, setFocused] = React22.useState(false);
  return {
    focusProps: {
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false)
    },
    isFocused
  };
};
var useIsPressed = () => {
  const [isPressed, setIsPressed] = React22.useState(false);
  return {
    pressableProps: {
      onPressIn: () => setIsPressed(true),
      onPressOut: () => setIsPressed(false)
    },
    isPressed
  };
};
var StyledPressable = makeStyledComponent(RNPressable);
var Pressable = ({ children, ...props }, ref) => {
  const { hoverProps, isHovered } = useHover2();
  const { pressableProps, isPressed } = useIsPressed();
  const { focusProps, isFocused } = useFocus();
  const { isFocusVisible, focusProps: focusRingProps } = useFocusRing();
  const {
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = usePropsResolution("Pressable", props, {
    isPressed,
    isFocused,
    isHovered,
    isFocusVisible
  });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React22.createElement(StyledPressable, {
    ref,
    onPressIn: composeEventHandlers(onPressIn, pressableProps.onPressIn),
    onPressOut: composeEventHandlers(onPressOut, pressableProps.onPressOut),
    onHoverIn: composeEventHandlers(onHoverIn, hoverProps.onHoverIn),
    onHoverOut: composeEventHandlers(onHoverOut, hoverProps.onHoverOut),
    onFocus: composeEventHandlers(composeEventHandlers(onFocus, focusProps.onFocus), focusRingProps.onFocus),
    onBlur: composeEventHandlers(composeEventHandlers(onBlur, focusProps.onBlur), focusRingProps.onBlur),
    ...resolvedProps
  }, typeof children !== "function" ? children : children({
    isPressed,
    isHovered,
    isFocused
  }));
};
var Pressable_default = memo5(forwardRef5(Pressable));

// node_modules/native-base/src/components/primitives/Icon/Icon.tsx
import React26, { memo as memo7, forwardRef as forwardRef7 } from "react";

// node_modules/native-base/src/components/primitives/Icon/SVGIcon.tsx
import React24, { memo as memo6, forwardRef as forwardRef6 } from "react";

// node_modules/native-base/src/components/primitives/Icon/nbSvg.tsx
import { Svg, G, Path, Polygon, Line, Circle, Rect } from "react-native-svg";

// node_modules/native-base/src/components/primitives/Icon/Icons/questionIconPath.tsx
import React23 from "react";
var questionOutlineIconPath = /* @__PURE__ */ React23.createElement(G, {
  stroke: "currentColor",
  strokeWidth: "1.5"
}, /* @__PURE__ */ React23.createElement(Path, {
  strokeLinecap: "round",
  fill: "none",
  d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
}), /* @__PURE__ */ React23.createElement(Path, {
  fill: "none",
  strokeLinecap: "round",
  d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
}), /* @__PURE__ */ React23.createElement(Circle, {
  fill: "none",
  strokeMiterlimit: "10",
  cx: "12",
  cy: "12",
  r: "11.25"
}));

// node_modules/native-base/src/components/primitives/Icon/SVGIcon.tsx
var SVG = makeStyledComponent(Svg);
var SVGIcon = ({ children, ...props }, ref) => {
  const {
    focusable,
    stroke,
    color: color2,
    size,
    ...resolvedProps
  } = usePropsResolution("Icon", props);
  const strokeHex = useToken("colors", stroke || "");
  const colorHex = useToken("colors", color2 || "");
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React24.createElement(SVG, {
    ...resolvedProps,
    size,
    color: colorHex,
    stroke: strokeHex,
    focusable,
    accessibilityRole: "image",
    ref
  }, React24.Children.count(children) > 0 ? /* @__PURE__ */ React24.createElement(G, null, React24.Children.map(children, (child, i) => /* @__PURE__ */ React24.createElement(ChildPath, {
    key: child?.key ?? i,
    element: child,
    ...child?.props
  }))) : questionOutlineIconPath);
};
var ChildPath = ({ element, fill, stroke: pathStroke }) => {
  const pathStrokeColor = useToken("colors", pathStroke || "");
  const fillColor = useToken("colors", fill || "");
  if (!element) {
    return null;
  }
  return React24.cloneElement(element, {
    fill: fillColor ? fillColor : "currentColor",
    stroke: pathStrokeColor
  });
};
var SVGIcon_default = memo6(forwardRef6(SVGIcon));

// node_modules/native-base/src/factory/component.tsx
import React25 from "react";
function Factory(Component, componentTheme) {
  return React25.forwardRef(({ children, ...props }, ref) => {
    const StyledComponent = makeStyledComponent(Component);
    const calculatedProps = usePropsWithComponentTheme(componentTheme ?? {}, props);
    return /* @__PURE__ */ React25.createElement(StyledComponent, {
      ...calculatedProps,
      ref
    }, children);
  });
}

// node_modules/native-base/src/components/primitives/Icon/Icon.tsx
var Icon = ({ as, ...props }, ref) => {
  const { size, ...resolvedProps } = usePropsResolution("Icon", props);
  const tokenizedFontSize = useToken("space", size);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  if (!as) {
    return /* @__PURE__ */ React26.createElement(SVGIcon_default, {
      size,
      ...resolvedProps,
      ref
    });
  }
  const isJSX = React26.isValidElement(as);
  const StyledAs = Factory(isJSX ? (resolvedProps2) => React26.cloneElement(as, {
    ...resolvedProps2,
    ...as.props
  }) : as);
  return /* @__PURE__ */ React26.createElement(StyledAs, {
    ...resolvedProps,
    fontSize: tokenizedFontSize,
    lineHeight: tokenizedFontSize,
    size,
    ref
  });
};
var Icon_default = memo7(forwardRef7(Icon));

// node_modules/native-base/src/components/primitives/Icon/createIcon.tsx
import React27, { memo as memo8, forwardRef as forwardRef8 } from "react";
import isEmpty3 from "lodash.isempty";
var createIcon = ({ path, d, ...initialProps }) => {
  const createdIcon = (props, ref) => {
    let children = path;
    if (d && (!path || isEmpty3(path))) {
      children = /* @__PURE__ */ React27.createElement(Path, {
        fill: "currentColor",
        d
      });
    }
    return /* @__PURE__ */ React27.createElement(SVGIcon_default, {
      children,
      ...initialProps,
      ...props,
      ref
    });
  };
  return memo8(forwardRef8(createdIcon));
};

// node_modules/native-base/src/components/composites/IconButton/index.tsx
var IconButton = ({ icon, children, ...props }, ref) => {
  const { hoverProps, isHovered } = useHover2();
  const { pressableProps, isPressed } = useIsPressed();
  const { focusProps, isFocused } = useFocus();
  const {
    _icon,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = usePropsResolution("IconButton", props, {
    isHovered,
    isPressed,
    isFocused
  });
  let clonedIcon;
  if (icon) {
    clonedIcon = React28.cloneElement(icon, {
      ..._icon
    });
  }
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React28.createElement(Pressable_default, {
    accessibilityRole: "button",
    ref,
    onPressIn: composeEventHandlers(onPressIn, pressableProps.onPressIn),
    onPressOut: composeEventHandlers(onPressOut, pressableProps.onPressOut),
    onHoverIn: composeEventHandlers(onHoverIn, hoverProps.onHoverIn),
    onHoverOut: composeEventHandlers(onHoverOut, hoverProps.onHoverOut),
    onFocus: composeEventHandlers(composeEventHandlers(onFocus, focusProps.onFocus)),
    onBlur: composeEventHandlers(composeEventHandlers(onBlur, focusProps.onBlur)),
    ...resolvedProps
  }, clonedIcon || /* @__PURE__ */ React28.createElement(Icon_default, {
    ..._icon
  }, children));
};
var IconButton_default = memo9(forwardRef9(IconButton));

// node_modules/native-base/src/components/composites/Alert/AlertIcon.tsx
import React101, { memo as memo52, forwardRef as forwardRef55 } from "react";

// node_modules/native-base/src/components/primitives/Input/InputGroup.tsx
import React30, { memo as memo11, forwardRef as forwardRef11 } from "react";

// node_modules/native-base/src/components/primitives/Flex/index.tsx
import React29, { memo as memo10, forwardRef as forwardRef10 } from "react";
var Flex = (props, ref) => {
  const {
    align,
    justify,
    wrap,
    basis,
    grow,
    shrink,
    direction,
    ...resolvedProps
  } = usePropsResolution("Flex", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React29.createElement(Box_default, {
    ...props,
    ...resolvedProps,
    display: "flex",
    flexDirection: direction || resolvedProps.flexDirection,
    alignItems: align || resolvedProps.alignItems,
    justifyContent: justify || resolvedProps.justifyContent,
    flexGrow: grow || resolvedProps.flexGrow,
    flexBasis: basis || resolvedProps.flexBasis,
    flexShrink: shrink || resolvedProps.flexShrink,
    flexWrap: wrap || resolvedProps.flexWrap,
    ref
  });
};
var Spacer = (props) => {
  return /* @__PURE__ */ React29.createElement(Box_default, {
    flexGrow: 1,
    ...props
  });
};
var Flex_default = memo10(forwardRef10(Flex));

// node_modules/native-base/src/components/primitives/Input/InputGroup.tsx
var supplyPropsToChildren = (children, props) => {
  return React30.Children.map(children, (child) => {
    return React30.cloneElement(child, props, child.props.children);
  });
};
var InputGroup = memo11(forwardRef11(({ children, ...props }, ref) => {
  let [layoutProps, remProps] = tools_exports.extractInObject(props, [
    "w",
    "width",
    "m",
    "mr",
    "ml",
    "mt",
    "mb",
    "mx",
    "my"
  ]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React30.createElement(Flex_default, {
    direction: "row",
    ...layoutProps,
    ref
  }, supplyPropsToChildren(getAttachedChildren_default(children), remProps));
}));

// node_modules/native-base/src/components/primitives/Input/InputAddons.tsx
import React31, { memo as memo12, forwardRef as forwardRef12 } from "react";
var InputLeftAddon = memo12(forwardRef12((props, ref) => {
  const resolvedProps = usePropsResolution("InputLeftAddon", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React31.createElement(Box_default, {
    ...resolvedProps,
    ref
  }, /* @__PURE__ */ React31.createElement(Box_default, {
    m: "auto",
    _text: resolvedProps._text || { fontWeight: 600 }
  }, props.children));
}));
var InputRightAddon = memo12(forwardRef12((props, ref) => {
  const resolvedProps = usePropsResolution("InputRightAddon", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React31.createElement(Box_default, {
    ...resolvedProps,
    ref
  }, /* @__PURE__ */ React31.createElement(Box_default, {
    m: "auto",
    _text: resolvedProps._text || { fontWeight: 600 }
  }, props.children));
}));

// node_modules/native-base/src/components/primitives/Input/Input.tsx
import React42, { memo as memo22, forwardRef as forwardRef22 } from "react";

// node_modules/native-base/src/components/primitives/Input/InputBase.tsx
import React32, { memo as memo13, forwardRef as forwardRef13 } from "react";
import { TextInput, Platform as Platform19 } from "react-native";
import { useHover as useHover3 } from "@react-native-aria/interactions";
var StyledInput = makeStyledComponent(TextInput);
var InputBase = ({
  onKeyPress,
  onFocus,
  onBlur,
  disableFocusHandling,
  inputProps,
  wrapperRef,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = React32.useState(false);
  const handleFocus = (focusState, callback) => {
    !disableFocusHandling && setIsFocused(focusState);
    callback();
  };
  const inputThemeProps = {
    isDisabled: inputProps.disabled,
    isInvalid: inputProps.accessibilityInvalid,
    isReadOnly: inputProps.accessibilityReadOnly,
    isRequired: inputProps.required
  };
  const _ref = React32.useRef(null);
  const { isHovered } = useHover3({}, _ref);
  const {
    isFullWidth,
    isDisabled,
    isReadOnly,
    ariaLabel,
    accessibilityLabel,
    placeholderTextColor,
    selectionColor,
    underlineColorAndroid,
    type,
    fontFamily,
    fontWeight,
    fontStyle,
    ...resolvedProps
  } = usePropsResolution("Input", {
    ...inputThemeProps,
    ...props
  }, {
    isDisabled: inputThemeProps.isDisabled,
    isHovered,
    isFocused,
    isInvalid: inputThemeProps.isInvalid,
    isReadOnly: inputThemeProps.isReadOnly
  });
  const resolvedFontFamily = useResolvedFontFamily({
    fontFamily,
    fontWeight: fontWeight ?? 400,
    fontStyle: fontStyle ?? "normal"
  });
  const resolvedPlaceholderTextColor = useToken("colors", placeholderTextColor);
  const resolvedSelectionColor = useToken("colors", selectionColor);
  const resolvedUnderlineColorAndroid = useToken("colors", underlineColorAndroid);
  if (useHasResponsiveProps({
    ...props,
    onKeyPress,
    onFocus,
    onBlur,
    disableFocusHandling,
    inputProps
  })) {
    return null;
  }
  return /* @__PURE__ */ React32.createElement(StyledInput, {
    ...inputProps,
    ...resolvedFontFamily,
    secureTextEntry: type === "password",
    accessible: true,
    accessibilityLabel: ariaLabel || accessibilityLabel,
    editable: isDisabled || isReadOnly ? false : true,
    w: isFullWidth ? "100%" : void 0,
    ...resolvedProps,
    placeholderTextColor: resolvedPlaceholderTextColor,
    selectionColor: resolvedSelectionColor,
    underlineColorAndroid: resolvedUnderlineColorAndroid,
    onKeyPress: (e) => {
      e.persist();
      onKeyPress && onKeyPress(e);
    },
    onFocus: (e) => {
      handleFocus(true, onFocus ? () => onFocus(e) : () => {
      });
    },
    onBlur: (e) => {
      handleFocus(false, onBlur ? () => onBlur(e) : () => {
      });
    },
    ...Platform19.OS === "web" ? {
      disabled: isDisabled,
      cursor: isDisabled ? "not-allowed" : "auto"
    } : {},
    ref: mergeRefs([ref, _ref, wrapperRef])
  });
};
var InputBase_default = memo13(forwardRef13(InputBase));

// node_modules/native-base/src/components/primitives/Input/InputAdvanced.tsx
import React33, { memo as memo14, forwardRef as forwardRef14 } from "react";
import { useHover as useHover4 } from "@react-native-aria/interactions";
var InputAdvance = ({
  InputLeftElement,
  InputRightElement,
  leftElement,
  rightElement,
  onFocus,
  onBlur,
  inputProps,
  wrapperRef,
  ...props
}, ref) => {
  const inputThemeProps = {
    isDisabled: inputProps.disabled,
    isInvalid: inputProps.accessibilityInvalid,
    isReadOnly: inputProps.accessibilityReadOnly,
    isRequired: inputProps.required
  };
  if (InputLeftElement) {
    leftElement = InputLeftElement;
  }
  if (InputRightElement) {
    rightElement = InputRightElement;
  }
  const [isFocused, setIsFocused] = React33.useState(false);
  const handleFocus = (focusState, callback) => {
    setIsFocused(focusState);
    callback();
  };
  const _ref = React33.useRef(null);
  const { isHovered } = useHover4({}, _ref);
  const resolvedProps = usePropsResolution("Input", {
    ...inputThemeProps,
    ...props
  }, {
    isDisabled: inputThemeProps.isDisabled,
    isHovered,
    isFocused,
    isInvalid: inputThemeProps.isInvalid,
    isReadOnly: inputThemeProps.isReadOnly
  });
  const [layoutProps, nonLayoutProps] = extractInObject(resolvedProps, [
    ...stylingProps.margin,
    ...stylingProps.border,
    ...stylingProps.layout,
    ...stylingProps.flexbox,
    ...stylingProps.position,
    ...stylingProps.background,
    "shadow",
    "opacity"
  ]);
  const [, baseInputProps] = extractInObject(nonLayoutProps, ["variant"]);
  if (useHasResponsiveProps({
    ...props,
    InputLeftElement,
    InputRightElement,
    onFocus,
    onBlur,
    inputProps,
    wrapperRef
  })) {
    return null;
  }
  return /* @__PURE__ */ React33.createElement(Box_default, {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    ...layoutProps,
    ref: mergeRefs([_ref, wrapperRef])
  }, InputLeftElement || leftElement ? InputLeftElement || leftElement : null, /* @__PURE__ */ React33.createElement(InputBase_default, {
    inputProps,
    bg: "transparent",
    ...baseInputProps,
    flex: 1,
    disableFocusHandling: true,
    ref,
    variant: "unstyled",
    onFocus: (e) => {
      handleFocus(true, onFocus ? () => onFocus(e) : () => {
      });
    },
    onBlur: (e) => {
      handleFocus(false, onBlur ? () => onBlur(e) : () => {
      });
    }
  }), InputRightElement || rightElement ? InputRightElement || rightElement : null);
};
var InputAdvanced_default = memo14(forwardRef14(InputAdvance));

// node_modules/native-base/src/components/composites/FormControl/FormControl.tsx
import React35, { memo as memo15, forwardRef as forwardRef15 } from "react";

// node_modules/native-base/src/components/composites/FormControl/useFormControl.tsx
import React34 from "react";
import { useId } from "@react-native-aria/utils";
import omit3 from "lodash.omit";
var FormControlContext = React34.createContext({});
function useFormControlProvider(props) {
  const {
    nativeID: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    ...htmlProps
  } = props;
  const id = useId();
  const nativeID = idProp || `field-${id}`;
  const labelId = `${nativeID}-label`;
  const feedbackId = `${nativeID}-feedback`;
  const helpTextId = `${nativeID}-helptext`;
  const [hasFeedbackText, setHasFeedbackText] = React34.useState(false);
  const [hasHelpText, setHasHelpText] = React34.useState(false);
  const context = {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    nativeID,
    labelId,
    feedbackId,
    helpTextId,
    htmlProps
  };
  return context;
}
function useFormControl(props) {
  const field = useFormControlContext();
  const describedBy = [];
  if (field?.hasFeedbackText)
    describedBy.push(field?.feedbackId);
  if (field?.hasHelpText)
    describedBy.push(field?.helpTextId);
  const ariaDescribedBy = describedBy.join(" ");
  const cleanProps = omit3(props, [
    "isInvalid",
    "isDisabled",
    "isReadOnly",
    "isRequired"
  ]);
  return {
    ...cleanProps,
    nativeID: props.nativeID ?? field?.nativeID,
    disabled: props.isDisabled || field?.isDisabled,
    readOnly: props.isReadOnly || field?.isReadOnly,
    required: props.isRequired || field?.isRequired,
    accessibilityInvalid: ariaAttr(props.isInvalid || field?.isInvalid),
    accessibilityRequired: ariaAttr(props.isRequired || field?.isRequired),
    accessibilityReadOnly: ariaAttr(props.isReadOnly || field?.isReadOnly),
    accessibilityDescribedBy: ariaDescribedBy || void 0
  };
}
var useFormControlContext = () => {
  return React34.useContext(FormControlContext);
};

// node_modules/native-base/src/components/composites/FormControl/FormControl.tsx
var FormControl2 = (props, ref) => {
  const { htmlProps, ...context } = useFormControlProvider(props);
  const resolvedProps = usePropsResolution("FormControl", props, {
    isDisabled: context.isDisabled,
    isReadOnly: context.isReadOnly,
    isInvalid: context.isInvalid
  });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React35.createElement(FormControlContext.Provider, {
    value: context
  }, /* @__PURE__ */ React35.createElement(Box_default, {
    width: "100%",
    ...resolvedProps,
    ...htmlProps,
    ref
  }));
};
var FormControl_default = memo15(forwardRef15(FormControl2));

// node_modules/native-base/src/components/composites/FormControl/FormControlLabel.tsx
import React36, { memo as memo16, forwardRef as forwardRef16 } from "react";
var FormControlLabel2 = ({ children, ...props }, ref) => {
  const formControlContext = useFormControlContext();
  const combinedProps = combineContextAndProps(formControlContext, props);
  const _ref = React36.useRef(null);
  const { astrickColor, ...reslovedProps } = usePropsResolution("FormControlLabel", combinedProps, {
    isDisabled: combinedProps.isDisabled,
    isReadOnly: combinedProps.isReadOnly,
    isInvalid: combinedProps.isInvalid
  });
  const requiredAsterisk = () => /* @__PURE__ */ React36.createElement(Text_default, {
    _web: {
      accessibilityHidden: true,
      accessibilityRole: "presentation"
    },
    color: astrickColor
  }, "*");
  const mergedRef = mergeRefs([_ref, ref]);
  React36.useEffect(() => {
    if (_ref.current) {
      if (props.htmlFor) {
        _ref.current.htmlFor = props.htmlFor;
      } else if (reslovedProps?.nativeID) {
        _ref.current.htmlFor = reslovedProps.nativeID;
      }
    }
  }, [reslovedProps?.nativeID, props.htmlFor]);
  return /* @__PURE__ */ React36.createElement(Box_default, {
    flexDirection: "row",
    justifyContent: "flex-start",
    _web: {
      accessibilityRole: "label"
    },
    ...reslovedProps,
    nativeID: reslovedProps?.labelId,
    ref: mergedRef
  }, children, reslovedProps?.isRequired && requiredAsterisk());
};
var FormControlLabel_default = memo16(forwardRef16(FormControlLabel2));

// node_modules/native-base/src/components/composites/FormControl/FormControlErrorMessage.tsx
import React40, { memo as memo20, forwardRef as forwardRef20 } from "react";

// node_modules/native-base/src/components/primitives/Stack/Stack.tsx
import React37, { memo as memo17, forwardRef as forwardRef17 } from "react";
var Stack = ({ space: space2, ...props }, ref) => {
  const {
    children,
    direction,
    reversed,
    divider,
    size,
    ...resolvedProps
  } = usePropsResolution("Stack", { ...props, size: space2 }, {}, { resolveResponsively: ["space", "direction"] });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React37.createElement(Box_default, {
    flexDirection: direction,
    ...resolvedProps,
    ref
  }, getSpacedChildren_default(children, size, direction === "row" ? "X" : "Y", reversed ? "reverse" : "normal", divider));
};
var Stack_default = memo17(forwardRef17(Stack));

// node_modules/native-base/src/components/primitives/Stack/HStack.tsx
import React38, { memo as memo18, forwardRef as forwardRef18 } from "react";
var HStack = (props, ref) => {
  const resolvedProps = usePropsResolution("HStack", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React38.createElement(Stack_default, {
    ref,
    direction: "row",
    ...resolvedProps
  });
};
var HStack_default = memo18(forwardRef18(HStack));

// node_modules/native-base/src/components/primitives/Stack/VStack.tsx
import React39, { memo as memo19, forwardRef as forwardRef19 } from "react";
var VStack = (props, ref) => {
  const resolvedProps = usePropsResolution("VStack", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React39.createElement(Stack_default, {
    ref,
    ...resolvedProps
  });
};
var VStack_default = memo19(forwardRef19(VStack));

// node_modules/native-base/src/components/composites/FormControl/FormControlErrorMessage.tsx
var FormControlErrorMessage2 = (props, ref) => {
  const formControlContext = useFormControlContext();
  const combinedProps = combineContextAndProps(formControlContext, props);
  const {
    leftIcon,
    rightIcon,
    children,
    _text,
    _stack,
    ...resolvedProps
  } = usePropsResolution("FormControlErrorMessage", combinedProps, {
    isDisabled: combinedProps.isDisabled,
    isReadOnly: combinedProps.isReadOnly,
    isInvalid: combinedProps.isInvalid
  });
  let { startIcon, endIcon } = resolvedProps;
  if (rightIcon) {
    endIcon = rightIcon;
  }
  if (leftIcon) {
    startIcon = leftIcon;
  }
  if (endIcon && React40.isValidElement(endIcon)) {
    endIcon = React40.Children.map(endIcon, (child, index) => {
      return React40.cloneElement(child, {
        key: `button-end-icon-${index}`,
        ..._text,
        ...child.props
      });
    });
  }
  if (startIcon && React40.isValidElement(startIcon)) {
    startIcon = React40.Children.map(startIcon, (child, index) => {
      return React40.cloneElement(child, {
        key: `button-start-icon-${index}`,
        ..._text,
        ...child.props
      });
    });
  }
  React40.useEffect(() => {
    resolvedProps?.setHasFeedbackText(true);
    return () => {
      resolvedProps?.setHasFeedbackText(false);
    };
  });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return resolvedProps?.isInvalid && children ? /* @__PURE__ */ React40.createElement(Box_default, {
    nativeID: resolvedProps?.helpTextId,
    ...resolvedProps,
    ref
  }, /* @__PURE__ */ React40.createElement(HStack_default, {
    ..._stack
  }, startIcon, /* @__PURE__ */ React40.createElement(Box_default, {
    _text
  }, children), endIcon)) : null;
};
var FormControlErrorMessage_default = memo20(forwardRef20(FormControlErrorMessage2));

// node_modules/native-base/src/components/composites/FormControl/FormControlHelperText.tsx
import React41, { memo as memo21, forwardRef as forwardRef21 } from "react";
var FormControlHelperText2 = (props, ref) => {
  const formControlContext = useFormControlContext();
  const combinedProps = combineContextAndProps(formControlContext, props);
  const resolvedProps = usePropsResolution("FormControlHelperText", combinedProps, {
    isDisabled: combinedProps.isDisabled,
    isReadOnly: combinedProps.isReadOnly,
    isInvalid: combinedProps.isInvalid
  });
  React41.useEffect(() => {
    resolvedProps?.setHasHelpText(true);
    return () => {
      resolvedProps?.setHasHelpText(false);
    };
  });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React41.createElement(Box_default, {
    ...resolvedProps,
    nativeID: resolvedProps?.feedbackId,
    ref
  });
};
var FormControlHelperText_default = memo21(forwardRef21(FormControlHelperText2));

// node_modules/native-base/src/components/composites/FormControl/index.tsx
var FormControlTemp = FormControl_default;
FormControlTemp.Label = FormControlLabel_default;
FormControlTemp.ErrorMessage = FormControlErrorMessage_default;
FormControlTemp.HelperText = FormControlHelperText_default;
var FormControl3 = FormControlTemp;

// node_modules/native-base/src/components/primitives/Input/Input.tsx
var Input2 = (props, ref) => {
  const inputProps = useFormControl({
    isDisabled: props.isDisabled,
    isInvalid: props.isInvalid,
    isReadOnly: props.isReadOnly,
    isRequired: props.isRequired,
    nativeID: props.nativeID
  });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  if (props.InputLeftElement || props.InputRightElement)
    return /* @__PURE__ */ React42.createElement(InputAdvanced_default, {
      ...props,
      ref,
      inputProps
    });
  else
    return /* @__PURE__ */ React42.createElement(InputBase_default, {
      ...props,
      ref,
      inputProps
    });
};
var Input_default = memo22(forwardRef22(Input2));

// node_modules/native-base/src/components/primitives/Checkbox/Checkbox.tsx
import React55, { useContext, memo as memo25, forwardRef as forwardRef25 } from "react";

// node_modules/native-base/src/components/composites/Center/Center.tsx
import React43, { memo as memo23, forwardRef as forwardRef23 } from "react";
var Center = (props, ref) => {
  const reslovedProps = usePropsResolution("Center", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React43.createElement(Box_default, {
    ref,
    ...reslovedProps
  });
};
var Center_default = memo23(forwardRef23(Center));

// node_modules/native-base/src/components/composites/Center/Circle.tsx
import React44 from "react";
var Circle2 = ({ style, size, ...props }, ref) => {
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React44.createElement(Center_default, {
    rounded: "full",
    size,
    ...props,
    ref,
    height: props.height ? props.height : void 0,
    width: props.width ? props.width : void 0,
    style
  });
};
var Circle_default = React44.memo(React44.forwardRef(Circle2));

// node_modules/native-base/src/components/composites/Center/Square.tsx
import React45 from "react";
var Square = ({ style, size, ...props }) => {
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React45.createElement(Center_default, {
    size,
    ...props,
    height: props.height ? props.height : void 0,
    width: props.width ? props.width : void 0,
    style
  });
};
var Square_default = React45.memo(Square);

// node_modules/native-base/src/components/primitives/Checkbox/Checkbox.tsx
import { useToggleState } from "@react-stately/toggle";

// node_modules/native-base/src/components/primitives/Checkbox/CheckboxGroup.tsx
import React46, { createContext as createContext3, memo as memo24, forwardRef as forwardRef24 } from "react";
import { useCheckboxGroupState } from "@react-stately/checkbox";
import { useCheckboxGroup } from "@react-native-aria/checkbox";
var CheckboxGroupContext = createContext3(null);
function CheckboxGroup({ size, colorScheme, ...props }, ref) {
  const { children } = props;
  const state = useCheckboxGroupState(props);
  const { groupProps } = useCheckboxGroup({ "aria-label": props.accessibilityLabel, ...props }, state);
  const formControlContext = useFormControlContext();
  if (useHasResponsiveProps({ ...props, size, colorScheme })) {
    return null;
  }
  return /* @__PURE__ */ React46.createElement(CheckboxGroupContext.Provider, {
    value: {
      size,
      colorScheme,
      ...formControlContext,
      state
    }
  }, /* @__PURE__ */ React46.createElement(Box_default, {
    alignItems: "flex-start",
    ...groupProps,
    ...props,
    ref
  }, children));
}
var CheckboxGroup_default = memo24(forwardRef24(CheckboxGroup));

// node_modules/native-base/src/components/primitives/Checkbox/Checkbox.tsx
import { useCheckbox, useCheckboxGroupItem } from "@react-native-aria/checkbox";

// node_modules/native-base/src/components/primitives/Icon/Icons/Add.tsx
var AddIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Arrow.tsx
var ArrowBackIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
});
var ArrowForwardIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
});
var ArrowUpIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
});
var ArrowDownIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Check.tsx
import React47 from "react";
var CheckIcon = createIcon({
  viewBox: "0 0 14 14",
  path: /* @__PURE__ */ React47.createElement(G, {
    fill: "currentColor"
  }, /* @__PURE__ */ React47.createElement(Polygon, {
    points: "5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
  }))
});
var CheckCircleIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Chevron.tsx
import React48 from "react";
var ChevronDownIcon = createIcon({
  viewBox: "0 0 24 24",
  path: [
    /* @__PURE__ */ React48.createElement(G, {
      transform: "translate(24) rotate(90)"
    }, /* @__PURE__ */ React48.createElement(Path, {
      d: "M0,0H24V24H0Z",
      fill: "none"
    }), /* @__PURE__ */ React48.createElement(Path, {
      d: "M10,6,8.59,7.41,13.17,12,8.59,16.59,10,18l6-6Z"
    }))
  ]
});
var ChevronLeftIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
});
var ChevronRightIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
});
var ChevronUpIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Circle.tsx
var CircleIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M 12, 12 m -9, 0 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0"
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Close.tsx
import React49 from "react";
var CloseIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
});
var SmallCloseIcon = createIcon({
  viewBox: "0 0 16 16",
  path: /* @__PURE__ */ React49.createElement(Path, {
    d: "M9.41 8l2.29-2.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-2.29-2.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 4.3 10.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l2.29 2.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z",
    fillRule: "evenodd",
    fill: "currentColor"
  })
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Hamburger.tsx
var HamburgerIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Info.tsx
import React50 from "react";
var InfoOutlineIcon = createIcon({
  viewBox: "0 0 24 24",
  path: /* @__PURE__ */ React50.createElement(G, {
    fill: "currentColor",
    stroke: "currentColor",
    strokeLinecap: "square",
    strokeWidth: "2"
  }, /* @__PURE__ */ React50.createElement(Circle, {
    cx: "12",
    cy: "12",
    fill: "none",
    r: "11",
    stroke: "currentColor"
  }), /* @__PURE__ */ React50.createElement(Line, {
    fill: "none",
    x1: "11.959",
    x2: "11.959",
    y1: "11",
    y2: "17"
  }), /* @__PURE__ */ React50.createElement(Circle, {
    cx: "11.959",
    cy: "7",
    r: "1",
    stroke: "none"
  }))
});
var InfoIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Minus.tsx
import React51 from "react";
var MinusIcon = createIcon({
  path: /* @__PURE__ */ React51.createElement(G, {
    fill: "currentColor"
  }, /* @__PURE__ */ React51.createElement(Rect, {
    height: "4",
    width: "20",
    x: "2",
    y: "10"
  }))
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Moon.tsx
var MoonIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z"
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Question.tsx
var QuestionIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z"
});
var QuestionOutlineIcon = createIcon({
  viewBox: "0 0 24 24",
  path: questionOutlineIconPath
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Search.tsx
var SearchIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Sun.tsx
import React52 from "react";
var SunIcon = createIcon({
  viewBox: "0 0 24 24",
  path: /* @__PURE__ */ React52.createElement(G, {
    strokeLinejoin: "round",
    strokeLinecap: "round",
    strokeWidth: "2",
    fill: "none",
    stroke: "currentColor"
  }, /* @__PURE__ */ React52.createElement(Circle, {
    cx: "12",
    cy: "12",
    r: "5"
  }), /* @__PURE__ */ React52.createElement(Path, {
    d: "M12 1v2"
  }), /* @__PURE__ */ React52.createElement(Path, {
    d: "M12 21v2"
  }), /* @__PURE__ */ React52.createElement(Path, {
    d: "M4.22 4.22l1.42 1.42"
  }), /* @__PURE__ */ React52.createElement(Path, {
    d: "M18.36 18.36l1.42 1.42"
  }), /* @__PURE__ */ React52.createElement(Path, {
    d: "M1 12h2"
  }), /* @__PURE__ */ React52.createElement(Path, {
    d: "M21 12h2"
  }), /* @__PURE__ */ React52.createElement(Path, {
    d: "M4.22 19.78l1.42-1.42"
  }), /* @__PURE__ */ React52.createElement(Path, {
    d: "M18.36 5.64l1.42-1.42"
  }))
});

// node_modules/native-base/src/components/primitives/Icon/Icons/Warning.tsx
var WarningIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
});
var WarningTwoIcon = createIcon({
  viewBox: "0 0 24 24",
  d: "M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
});

// node_modules/native-base/src/components/primitives/Icon/Icons/WarningOutline.tsx
var WarningOutlineIcon = createIcon({
  viewBox: "0 0 16 16",
  d: "M8 16C6.41775 16 4.87103 15.5308 3.55544 14.6518C2.23985 13.7727 1.21447 12.5233 0.608967 11.0615C0.00346627 9.59966 -0.15496 7.99113 0.153721 6.43928C0.462403 4.88743 1.22433 3.46197 2.34315 2.34315C3.46197 1.22433 4.88743 0.462403 6.43928 0.153721C7.99113 -0.15496 9.59966 0.00346627 11.0615 0.608967C12.5233 1.21447 13.7727 2.23985 14.6518 3.55544C15.5308 4.87103 16 6.41775 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16ZM8 14.4C9.2658 14.4 10.5032 14.0246 11.5556 13.3214C12.6081 12.6182 13.4284 11.6186 13.9128 10.4492C14.3972 9.27973 14.524 7.9929 14.277 6.75142C14.0301 5.50995 13.4205 4.36958 12.5255 3.47452C11.6304 2.57946 10.4901 1.96992 9.24858 1.72298C8.0071 1.47603 6.72028 1.60277 5.55083 2.08717C4.38138 2.57158 3.38184 3.39188 2.6786 4.44435C1.97536 5.49683 1.6 6.7342 1.6 8C1.6 9.69739 2.27429 11.3253 3.47452 12.5255C4.67475 13.7257 6.30262 14.4 8 14.4ZM7.2 10.4H8.8V12H7.2V10.4ZM7.2 4H8.8V8.8H7.2V4Z"
});

// node_modules/native-base/src/components/primitives/Icon/Icons/ThreeDots.tsx
import React53 from "react";
var ThreeDotsIcon = createIcon({
  viewBox: "0 0 32.055 32.055",
  path: [
    /* @__PURE__ */ React53.createElement(G, null, /* @__PURE__ */ React53.createElement(Path, {
      d: "M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967   C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967   s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967   c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
    }))
  ]
});

// node_modules/native-base/src/components/primitives/Checkbox/SizedIcon.tsx
import React54 from "react";
var SizedIcon = ({
  icon,
  _icon,
  isChecked
}) => {
  return isChecked ? icon ? React54.cloneElement(icon, {
    ..._icon
  }) : /* @__PURE__ */ React54.createElement(CheckIcon, {
    ..._icon
  }) : /* @__PURE__ */ React54.createElement(Box_default, {
    ..._icon
  });
};
var SizedIcon_default = SizedIcon;

// node_modules/native-base/src/components/primitives/Checkbox/Checkbox.tsx
var Checkbox = ({ wrapperRef, ...props }, ref) => {
  const { hoverProps, isHovered } = useHover2();
  const { pressableProps, isPressed } = useIsPressed();
  const { focusProps, isFocused } = useFocus();
  const formControlContext = useFormControlContext();
  const combinedProps = combineContextAndProps(formControlContext, props);
  const _ref = React55.useRef();
  const mergedRef = mergeRefs([ref, _ref]);
  const state = useToggleState({
    ...combinedProps,
    defaultSelected: combinedProps.defaultIsChecked,
    isSelected: combinedProps.isChecked
  });
  const groupState = useContext(CheckboxGroupContext);
  const { inputProps } = groupState ? useCheckboxGroupItem(combinedProps, groupState.state, mergedRef) : useCheckbox(combinedProps, state, mergedRef);
  const {
    checked: isChecked,
    disabled: isDisabled,
    isInvalid,
    isReadOnly,
    isIndeterminate
  } = inputProps;
  const {
    icon,
    _interactionBox,
    _icon,
    onPress,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = usePropsResolution("Checkbox", inputProps, {
    isInvalid,
    isReadOnly,
    isIndeterminate,
    isDisabled,
    isChecked,
    isHovered,
    isPressed,
    isFocused
  });
  const [layoutProps, nonLayoutProps] = extractInObject(resolvedProps, [
    ...stylingProps.margin,
    ...stylingProps.layout,
    ...stylingProps.flexbox,
    ...stylingProps.position,
    "_text"
  ]);
  if (useHasResponsiveProps(resolvedProps)) {
    return null;
  }
  return /* @__PURE__ */ React55.createElement(Pressable_default, {
    ...pressableProps,
    onPress,
    ref: mergeRefs([ref, wrapperRef]),
    accessibilityRole: "checkbox",
    onPressIn: composeEventHandlers(onPressIn, pressableProps.onPressIn),
    onPressOut: composeEventHandlers(onPressOut, pressableProps.onPressOut),
    onHoverIn: composeEventHandlers(onHoverIn, hoverProps.onHoverIn),
    onHoverOut: composeEventHandlers(onHoverOut, hoverProps.onHoverOut),
    onFocus: composeEventHandlers(composeEventHandlers(onFocus, focusProps.onFocus)),
    onBlur: composeEventHandlers(composeEventHandlers(onBlur, focusProps.onBlur))
  }, /* @__PURE__ */ React55.createElement(Box_default, {
    ...layoutProps
  }, /* @__PURE__ */ React55.createElement(Center_default, null, /* @__PURE__ */ React55.createElement(Box_default, {
    ..._interactionBox,
    p: 5,
    w: "100%",
    height: "100%",
    zIndex: -1
  }), /* @__PURE__ */ React55.createElement(Center_default, {
    ...nonLayoutProps
  }, /* @__PURE__ */ React55.createElement(SizedIcon_default, {
    icon,
    _icon,
    isChecked
  }))), combinedProps.children));
};
var Checkbox_default = memo25(forwardRef25(Checkbox));

// node_modules/native-base/src/components/primitives/Checkbox/index.tsx
var CheckTemp = Checkbox_default;
CheckTemp.Group = CheckboxGroup_default;
var Checkbox2 = CheckTemp;

// node_modules/native-base/src/components/primitives/Radio/Radio.tsx
import React57, { memo as memo27, forwardRef as forwardRef27 } from "react";
import { useRadio } from "@react-native-aria/radio";

// node_modules/native-base/src/components/primitives/Radio/RadioGroup.tsx
import React56, { memo as memo26, forwardRef as forwardRef26 } from "react";
import { useRadioGroupState } from "@react-stately/radio";
import { useRadioGroup } from "@react-native-aria/radio";
var RadioContext = React56.createContext({});
var RadioGroup = ({ size, colorScheme, ...props }, ref) => {
  const formControlContext = useFormControlContext();
  const state = useRadioGroupState(props);
  const { radioGroupProps } = useRadioGroup({ ...formControlContext, ...props, "aria-label": props.accessibilityLabel }, state);
  if (useHasResponsiveProps({ ...props, size, colorScheme })) {
    return null;
  }
  return /* @__PURE__ */ React56.createElement(Box_default, {
    ref
  }, /* @__PURE__ */ React56.createElement(RadioContext.Provider, {
    value: {
      ...formControlContext,
      size,
      colorScheme,
      state
    }
  }, /* @__PURE__ */ React56.createElement(Box_default, {
    alignItems: "flex-start",
    ...radioGroupProps,
    ...props
  }, props.children)));
};
var RadioGroup_default = memo26(forwardRef26(RadioGroup));

// node_modules/native-base/src/components/primitives/Radio/Radio.tsx
var Radio = ({ icon, wrapperRef, size, ...props }, ref) => {
  const { hoverProps, isHovered } = useHover2();
  const { pressableProps, isPressed } = useIsPressed();
  const { focusProps, isFocused } = useFocus();
  const contextState = React57.useContext(RadioContext);
  const {
    isInvalid,
    isReadOnly,
    isIndeterminate,
    ...combinedProps
  } = combineContextAndProps(contextState, props);
  const inputRef = React57.useRef(null);
  const { inputProps } = useRadio(props, contextState.state ?? {}, inputRef);
  const { disabled: isDisabled, checked: isChecked } = inputProps;
  const {
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    _interactionBox,
    _icon,
    ...resolvedProps
  } = usePropsResolution("Radio", {
    ...combinedProps,
    size
  }, {
    isInvalid,
    isReadOnly,
    isDisabled,
    isIndeterminate,
    isChecked,
    isHovered,
    isPressed,
    isFocused
  });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  const sizedIcon = () => React57.cloneElement(icon, {
    ..._icon
  });
  const [layoutProps, nonLayoutProps] = extractInObject(resolvedProps, [
    ...stylingProps.margin,
    ...stylingProps.layout,
    ...stylingProps.flexbox,
    ...stylingProps.position,
    "_text"
  ]);
  if (isEmptyObj(contextState)) {
    console.error("Error: Radio must be wrapped inside a Radio.Group");
    return /* @__PURE__ */ React57.createElement(React57.Fragment, null);
  }
  return /* @__PURE__ */ React57.createElement(Pressable_default, {
    ...pressableProps,
    ...inputProps,
    ref: mergeRefs([ref, wrapperRef]),
    accessibilityRole: "radio",
    onPressIn: composeEventHandlers(onPressIn, pressableProps.onPressIn),
    onPressOut: composeEventHandlers(onPressOut, pressableProps.onPressOut),
    onHoverIn: composeEventHandlers(onHoverIn, hoverProps.onHoverIn),
    onHoverOut: composeEventHandlers(onHoverOut, hoverProps.onHoverOut),
    onFocus: composeEventHandlers(composeEventHandlers(onFocus, focusProps.onFocus)),
    onBlur: composeEventHandlers(composeEventHandlers(onBlur, focusProps.onBlur))
  }, /* @__PURE__ */ React57.createElement(Center_default, {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "full",
    ...layoutProps
  }, /* @__PURE__ */ React57.createElement(Center_default, null, /* @__PURE__ */ React57.createElement(Box_default, {
    ..._interactionBox,
    p: 5,
    w: "100%",
    height: "100%"
  }), /* @__PURE__ */ React57.createElement(Center_default, {
    ...nonLayoutProps
  }, icon && sizedIcon && isChecked ? sizedIcon() : /* @__PURE__ */ React57.createElement(CircleIcon, {
    ..._icon,
    opacity: isChecked ? 1 : 0
  }))), props.children));
};
var Radio_default = memo27(forwardRef27(Radio));

// node_modules/native-base/src/components/primitives/Radio/index.tsx
var RadioTemp = Radio_default;
RadioTemp.Group = RadioGroup_default;
var Radio2 = RadioTemp;

// node_modules/native-base/src/components/primitives/Button/Button.tsx
import React59, { memo as memo29, forwardRef as forwardRef29 } from "react";

// node_modules/native-base/src/components/primitives/Spinner/index.tsx
import React58, { memo as memo28, forwardRef as forwardRef28 } from "react";
import { ActivityIndicator } from "react-native";
var Spinner = (props, ref) => {
  const { color: color2, size, ...resolvedProps } = usePropsResolution("Spinner", props);
  const resolvedColor = getColor2(color2, useTheme().colors, useTheme());
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React58.createElement(ActivityIndicator, {
    accessible: true,
    accessibilityLabel: "loading",
    ...resolvedProps,
    color: resolvedColor,
    ref,
    size
  });
};
var Spinner_default = memo28(forwardRef28(Spinner));

// node_modules/native-base/src/components/primitives/Button/Button.tsx
var Button = ({
  children,
  startIcon,
  rightIcon,
  leftIcon,
  endIcon,
  spinner,
  isDisabled,
  isLoading,
  spinnerPlacement = "start",
  ...props
}, ref) => {
  const { hoverProps, isHovered } = useHover2();
  const { pressableProps, isPressed } = useIsPressed();
  const { focusProps, isFocused } = useFocus();
  const {
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    _text,
    _stack,
    _spinner,
    isLoadingText,
    ...resolvedProps
  } = usePropsResolution("Button", props, { isDisabled, isHovered, isFocused, isPressed, isLoading }, { ignoreProps: ["_spinner"] });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  if (leftIcon) {
    startIcon = leftIcon;
  }
  if (rightIcon) {
    endIcon = rightIcon;
  }
  if (endIcon && React59.isValidElement(endIcon)) {
    endIcon = React59.Children.map(endIcon, (child, index) => {
      return React59.cloneElement(child, {
        key: `button-end-icon-${index}`,
        ..._text,
        ...child.props
      });
    });
  }
  if (startIcon && React59.isValidElement(startIcon)) {
    startIcon = React59.Children.map(startIcon, (child, index) => {
      return React59.cloneElement(child, {
        key: `button-start-icon-${index}`,
        ..._text,
        ...child.props
      });
    });
  }
  const boxChildren = isLoading && isLoadingText ? isLoadingText : children;
  const spinnerElement = spinner ? spinner : /* @__PURE__ */ React59.createElement(Spinner_default, {
    color: _text?.color,
    ..._spinner
  });
  return /* @__PURE__ */ React59.createElement(Pressable_default, {
    disabled: isDisabled || isLoading,
    ref,
    onPressIn: composeEventHandlers(onPressIn, pressableProps.onPressIn),
    onPressOut: composeEventHandlers(onPressOut, pressableProps.onPressOut),
    onHoverIn: composeEventHandlers(onHoverIn, hoverProps.onHoverIn),
    onHoverOut: composeEventHandlers(onHoverOut, hoverProps.onHoverOut),
    onFocus: composeEventHandlers(composeEventHandlers(onFocus, focusProps.onFocus)),
    onBlur: composeEventHandlers(composeEventHandlers(onBlur, focusProps.onBlur)),
    ...resolvedProps,
    accessibilityRole: props.accessibilityRole ?? "button"
  }, /* @__PURE__ */ React59.createElement(HStack_default, {
    ..._stack
  }, startIcon && !isLoading ? startIcon : null, isLoading && spinnerPlacement === "start" ? spinnerElement : null, boxChildren ? /* @__PURE__ */ React59.createElement(Box_default, {
    _text: {
      ..._text
    }
  }, isLoading && isLoadingText ? isLoadingText : children) : null, endIcon && !isLoading ? endIcon : null, isLoading && spinnerPlacement === "end" ? spinnerElement : null));
};
var Button_default = memo29(forwardRef29(Button));

// node_modules/native-base/src/components/primitives/Button/ButtonGroup.tsx
import React60, { memo as memo30, forwardRef as forwardRef30 } from "react";
var ButtonGroup_default = memo30(forwardRef30(({ children, divider, ...props }, ref) => {
  const {
    space: space2,
    direction,
    variant,
    size,
    colorScheme,
    isDisabled,
    isAttached,
    ...newProps
  } = usePropsResolution("ButtonGroup", props);
  const { borderRadius } = usePropsResolution("Button", props);
  let computedChildren;
  if (Array.isArray(children)) {
    computedChildren = React60.Children.map(children, (child, index) => {
      return React60.cloneElement(child, {
        key: `button-group-child-${index}`,
        variant,
        size,
        colorScheme,
        isDisabled,
        ...isAttached ? { borderRadius: 0 } : {},
        ...isAttached && index === 0 ? direction === "column" ? { borderTopRadius: borderRadius } : { borderLeftRadius: borderRadius } : {},
        ...isAttached && index === children?.length - 1 ? direction === "column" ? { borderBottomRadius: borderRadius } : { borderRightRadius: borderRadius } : {},
        ...isAttached && index !== 0 ? direction === "column" ? { borderTopWidth: 0 } : { borderLeftWidth: 0 } : {},
        ...child.props
      });
    });
  } else {
    computedChildren = React60.Children.map(children, (child, index) => {
      return React60.cloneElement(child, {
        key: `button-group-child-${index}`,
        variant,
        size,
        colorScheme,
        isDisabled,
        ...child.props
      });
    });
  }
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React60.createElement(Stack_default, {
    divider,
    space: isAttached ? 0 : space2,
    direction,
    ...newProps,
    ref
  }, computedChildren);
}));

// node_modules/native-base/src/components/primitives/Button/index.tsx
var ButtonTemp = Button_default;
ButtonTemp.Group = ButtonGroup_default;
var Button2 = ButtonTemp;

// node_modules/native-base/src/components/primitives/Slider/Slider.tsx
import React62, { forwardRef as forwardRef31 } from "react";
import { useSliderState } from "@react-stately/slider";

// node_modules/native-base/src/components/primitives/Slider/Context.ts
import React61 from "react";
var SliderContext = React61.createContext({});

// node_modules/native-base/src/components/primitives/Slider/Slider.tsx
import { useSlider } from "@react-native-aria/slider";
function Slider2({ isDisabled, isReadOnly, ...props }, ref) {
  const newProps = {
    ...props,
    "aria-label": props.accessibilityLabel ?? "Slider"
  };
  if (typeof props.value === "number") {
    newProps.value = [props.value];
  }
  if (typeof props.defaultValue === "number") {
    newProps.defaultValue = [props.defaultValue];
  }
  props = newProps;
  const { onLayout, layout: trackLayout } = useLayout();
  const updatedProps = Object.assign({}, props);
  if (isReadOnly || isDisabled) {
    updatedProps.isDisabled = true;
  }
  const state = useSliderState({
    ...updatedProps,
    numberFormatter: { format: (e) => e },
    minValue: props.minValue,
    maxValue: props.maxValue,
    onChange: (val) => {
      props.onChange && props.onChange(val[0]);
    },
    onChangeEnd: (val) => {
      props.onChangeEnd && props.onChangeEnd(val[0]);
    }
  });
  const resolvedProps = usePropsResolution("Slider", props, {
    isDisabled,
    isReadOnly
  });
  const { trackProps } = useSlider(props, state, trackLayout);
  const wrapperStyle = {
    height: props.orientation === "vertical" ? "100%" : void 0,
    width: props.orientation !== "vertical" ? "100%" : void 0
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React62.createElement(SliderContext.Provider, {
    value: {
      trackLayout,
      state,
      orientation: props.orientation,
      isDisabled,
      isReversed: props.isReversed,
      colorScheme: props.colorScheme,
      trackProps,
      isReadOnly,
      onTrackLayout: onLayout,
      thumbSize: resolvedProps.thumbSize,
      sliderSize: resolvedProps.sliderSize
    }
  }, /* @__PURE__ */ React62.createElement(Box_default, {
    ...wrapperStyle,
    justifyContent: "center",
    ref,
    alignItems: "center",
    ...resolvedProps
  }, React62.Children.map(props.children, (child, index) => {
    if (child.displayName === "SliderThumb") {
      return React62.cloneElement(child, {
        index
      });
    }
    return child;
  })));
}
var Slider_default = forwardRef31(Slider2);

// node_modules/native-base/src/components/primitives/Slider/SliderThumb.tsx
import React63, { forwardRef as forwardRef32 } from "react";
import { Platform as Platform20 } from "react-native";
import { useSliderThumb } from "@react-native-aria/slider";
import { VisuallyHidden } from "@react-aria/visually-hidden";
function SliderThumb2(props, ref) {
  const {
    state,
    trackLayout,
    orientation,
    colorScheme,
    thumbSize,
    isReadOnly,
    isDisabled
  } = React63.useContext(SliderContext);
  const resolvedProps = usePropsResolution("SliderThumb", {
    size: thumbSize,
    colorScheme,
    ...props
  }, { isDisabled, isReadOnly });
  const inputRef = React63.useRef(null);
  const { thumbProps, inputProps } = useSliderThumb({
    index: 0,
    trackLayout,
    inputRef,
    orientation
  }, state);
  const thumbAbsoluteSize = useToken("sizes", resolvedProps.size);
  const thumbStyles = {
    bottom: orientation === "vertical" ? `${state.getThumbPercent(0) * 100}%` : void 0,
    left: orientation !== "vertical" ? `${state.getThumbPercent(0) * 100}%` : void 0,
    transform: orientation === "vertical" ? [{ translateY: parseInt(thumbAbsoluteSize) / 2 }] : [{ translateX: -parseInt(thumbAbsoluteSize) / 2 }]
  };
  thumbStyles.transform.push({
    scale: state.isThumbDragging(0) ? resolvedProps.scaleOnPressed : 1
  });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React63.createElement(Box_default, {
    position: "absolute",
    ...thumbProps,
    ...resolvedProps,
    ref,
    style: [thumbStyles, props.style]
  }, props.children, Platform20.OS === "web" && /* @__PURE__ */ React63.createElement(VisuallyHidden, null, /* @__PURE__ */ React63.createElement("input", {
    ref: inputRef,
    ...inputProps
  })));
}
SliderThumb2.displayName = "SliderThumb";
var SliderThumb_default = forwardRef32(SliderThumb2);

// node_modules/native-base/src/components/primitives/Slider/SliderTrack.tsx
import React64 from "react";
var SliderTrack2 = ({ children, ...props }, ref) => {
  const {
    orientation,
    trackProps,
    onTrackLayout,
    colorScheme,
    sliderSize,
    isReadOnly,
    isDisabled
  } = React64.useContext(SliderContext);
  const resolvedProps = usePropsResolution("SliderTrack", {
    size: sliderSize,
    colorScheme,
    ...props
  }, { isReadOnly, isDisabled });
  const isVertical = orientation === "vertical";
  const trackStyle = React64.useMemo(() => ({
    height: isVertical ? "100%" : resolvedProps.size,
    width: !isVertical ? "100%" : resolvedProps.size
  }), [isVertical, resolvedProps.size]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React64.createElement(Pressable_default, {
    onLayout: onTrackLayout,
    ref,
    ...trackProps,
    ...trackStyle,
    paddingY: !isVertical ? "12px" : void 0,
    paddingX: isVertical ? "12px" : void 0,
    justifyContent: "center",
    alignItems: "center"
  }, /* @__PURE__ */ React64.createElement(Box_default, {
    ...resolvedProps,
    style: trackStyle
  }, children));
};
var SliderTrack_default = React64.forwardRef(SliderTrack2);

// node_modules/native-base/src/components/primitives/Slider/SliderFilledTrack.tsx
import React65 from "react";
import { StyleSheet as StyleSheet4 } from "react-native";
var SliderFilledTrack2 = ({ style, ...props }, ref) => {
  const {
    isReversed,
    colorScheme,
    state,
    trackLayout,
    orientation,
    isDisabled,
    sliderSize,
    isReadOnly
  } = React65.useContext(SliderContext);
  const sliderTrackPosition = isReversed ? orientation === "vertical" ? trackLayout.height - trackLayout.height * state.getThumbPercent(0) : trackLayout.width - trackLayout.width * state.getThumbPercent(0) : state.getThumbPercent(0) * 100 + "%";
  const resolvedProps = usePropsResolution("SliderFilledTrack", {
    size: sliderSize,
    colorScheme,
    ...props
  }, { isDisabled, isReadOnly });
  const customStyle = StyleSheet4.create({
    verticalStyle: {
      height: sliderTrackPosition,
      width: sliderSize
    },
    horizontalStyle: {
      width: sliderTrackPosition,
      height: sliderSize
    }
  });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React65.createElement(Box_default, {
    position: "absolute",
    ...resolvedProps,
    left: orientation !== "vertical" && !isReversed ? 0 : void 0,
    bottom: orientation === "vertical" && !isReversed ? 0 : void 0,
    right: orientation !== "vertical" && isReversed ? 0 : void 0,
    top: orientation === "vertical" && isReversed ? 0 : void 0,
    style: [
      style,
      orientation === "vertical" ? customStyle.verticalStyle : customStyle.horizontalStyle
    ],
    ref
  });
};
var SliderFilledTrack_default = React65.forwardRef(SliderFilledTrack2);

// node_modules/native-base/src/components/primitives/Slider/index.tsx
var SliderTemp = Slider_default;
SliderTemp.Thumb = SliderThumb_default;
SliderTemp.Track = SliderTrack_default;
SliderTemp.FilledTrack = SliderFilledTrack_default;
var Slider3 = SliderTemp;

// node_modules/native-base/src/components/primitives/Image/index.tsx
import React66, { useState as useState4, memo as memo31, forwardRef as forwardRef33, useCallback, useRef as useRef3 } from "react";
import { Image as RNImage } from "react-native";
var StyledImage = makeStyledComponent(RNImage);
var Image2 = (props, ref) => {
  const {
    source,
    src,
    fallbackElement,
    alt,
    fallbackSource,
    ignoreFallback,
    _alt,
    ...resolvedProps
  } = usePropsResolution("Image", props);
  const finalSource = useRef3(null);
  const getSource = useCallback(() => {
    if (source) {
      finalSource.current = source;
    } else if (src) {
      finalSource.current = { uri: src };
    }
    return finalSource.current;
  }, [source, src]);
  const [renderedSource, setSource] = useState4(getSource());
  const [alternate, setAlternate] = useState4(false);
  const [fallbackSourceFlag, setfallbackSourceFlag] = useState4(true);
  React66.useEffect(() => {
    return () => {
      finalSource.current = null;
    };
  }, [source, src, getSource]);
  const onImageLoadError = useCallback((event) => {
    props.onError && props.onError(event);
    console.warn(event.nativeEvent.error);
    if (!ignoreFallback && fallbackSource && fallbackSource !== renderedSource && fallbackSourceFlag) {
      setfallbackSourceFlag(false);
      setSource(fallbackSource);
    } else {
      setAlternate(true);
    }
  }, [fallbackSource, fallbackSourceFlag, ignoreFallback, props, renderedSource]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  if (!alt) {
    console.warn("Please pass alt prop to Image component");
  }
  if (alternate) {
    if (fallbackElement) {
      if (React66.isValidElement(fallbackElement)) {
        return fallbackElement;
      }
    } else
      return /* @__PURE__ */ React66.createElement(Text_default, {
        ..._alt
      }, alt);
  }
  return /* @__PURE__ */ React66.createElement(StyledImage, {
    source: renderedSource,
    accessibilityLabel: alt,
    alt,
    ...resolvedProps,
    onError: onImageLoadError,
    ref
  });
};
var Image_default = memo31(forwardRef33(Image2));

// node_modules/native-base/src/components/primitives/Select/SelectItem.tsx
import React90, { forwardRef as forwardRef47, memo as memo43 } from "react";
import { Platform as Platform25 } from "react-native";

// node_modules/native-base/src/components/composites/Actionsheet/Actionsheet.tsx
import React86, { memo as memo39, forwardRef as forwardRef43 } from "react";

// node_modules/native-base/src/components/composites/Modal/Modal.tsx
import React78, { forwardRef as forwardRef36, memo as memo33 } from "react";
import { StyleSheet as StyleSheet5 } from "react-native";

// node_modules/native-base/src/components/composites/Backdrop/index.tsx
import React67 from "react";
var Backdrop = (props) => {
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React67.createElement(Pressable_default, {
    _web: {
      cursor: "default"
    },
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    accessible: false,
    importantForAccessibility: "no",
    bg: props.bg || "rgb(0, 0, 0)",
    opacity: 0.3,
    ...props
  });
};
var Backdrop_default = React67.memo(Backdrop);

// node_modules/native-base/src/components/composites/Transitions/Fade.tsx
import React71 from "react";

// node_modules/native-base/src/components/composites/Transitions/PresenceTransition.tsx
import React70, { memo as memo32, forwardRef as forwardRef35 } from "react";

// node_modules/native-base/src/components/primitives/Overlay/ExitAnimationContext.ts
import React68 from "react";
var ExitAnimationContext = React68.createContext({
  exited: true,
  setExited: (_exited) => {
  }
});

// node_modules/native-base/src/components/composites/Transitions/Transition.tsx
import React69, { forwardRef as forwardRef34 } from "react";
import { Animated } from "react-native";
var transformStylesMap = {
  translateY: true,
  translateX: true,
  scale: true,
  scaleX: true,
  scaleY: true,
  rotate: true
};
var defaultStyles = {
  opacity: 1,
  translateY: 0,
  translateX: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  rotate: "0deg"
};
var getAnimatedStyles = (animateValue) => (initial, to) => {
  const styles = {
    transform: []
  };
  for (let key in initial) {
    if (key === "transition") {
      continue;
    }
    if (key in transformStylesMap) {
      styles.transform?.push({
        [key]: animateValue.interpolate({
          inputRange: [0, 1],
          outputRange: [initial[key], to[key]]
        })
      });
    } else {
      styles[key] = animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [initial[key], to[key]]
      });
    }
  }
  return styles;
};
var defaultTransitionConfig = {
  type: "timing",
  useNativeDriver: true,
  duration: 250,
  delay: 0
};
var Transition = forwardRef34(({
  children,
  onTransitionComplete,
  visible = false,
  initial,
  animate,
  exit,
  style,
  as,
  ...rest
}, ref) => {
  const animateValue = React69.useRef(new Animated.Value(0)).current;
  const Component = React69.useMemo(() => {
    if (as) {
      return Animated.createAnimatedComponent(as);
    }
    return Animated.View;
  }, [as]);
  const [animationState, setAnimationState] = React69.useState(visible ? "entering" : "exited");
  const prevVisible = React69.useRef(visible);
  React69.useEffect(function startEntryTransition() {
    const entryTransition = {
      ...defaultTransitionConfig,
      ...animate?.transition
    };
    if (visible) {
      Animated.sequence([
        Animated.delay(entryTransition.delay),
        Animated[entryTransition.type ?? "timing"](animateValue, {
          toValue: 1,
          useNativeDriver: true,
          ...entryTransition
        })
      ]).start(() => {
        setAnimationState("entered");
      });
    }
  }, [visible, onTransitionComplete, animateValue, animate]);
  React69.useEffect(() => {
    if (prevVisible.current !== visible && !visible) {
      setAnimationState("exiting");
    }
    prevVisible.current = visible;
  }, [visible]);
  React69.useEffect(function startExitTransition() {
    const exitTransition = {
      ...defaultTransitionConfig,
      ...exit?.transition
    };
    if (animationState === "exiting") {
      Animated.sequence([
        Animated.delay(exitTransition.delay),
        Animated[exitTransition.type ?? "timing"](animateValue, {
          toValue: 0,
          useNativeDriver: true,
          ...exitTransition
        })
      ]).start(() => {
        setAnimationState("exited");
      });
    }
  }, [
    exit,
    onTransitionComplete,
    setAnimationState,
    animationState,
    animateValue
  ]);
  initial = animationState === "exiting" && exit ? { ...defaultStyles, ...exit } : { ...defaultStyles, ...initial };
  animate = { ...defaultStyles, ...animate };
  const styles = React69.useMemo(() => {
    return [
      getAnimatedStyles(animateValue)(initial, animate),
      style
    ];
  }, [animateValue, initial, animate, style]);
  React69.useEffect(() => {
    if (animationState === "exited") {
      onTransitionComplete && onTransitionComplete("exited");
    } else if (animationState === "entered") {
      onTransitionComplete && onTransitionComplete("entered");
    }
  }, [animationState, onTransitionComplete]);
  if (useHasResponsiveProps(rest)) {
    return null;
  }
  return /* @__PURE__ */ React69.createElement(Component, {
    pointerEvents: "box-none",
    needsOffscreenAlphaCompositing: true,
    style: styles,
    ref,
    ...rest
  }, children);
});

// node_modules/native-base/src/components/composites/Transitions/PresenceTransition.tsx
var PresenceTransition = ({ visible = false, onTransitionComplete, ...rest }, ref) => {
  const [animationExited, setAnimationExited] = React70.useState(!visible);
  const { setExited } = React70.useContext(ExitAnimationContext);
  if (useHasResponsiveProps(rest)) {
    return null;
  }
  if (!visible && animationExited) {
    return null;
  }
  return /* @__PURE__ */ React70.createElement(Transition, {
    visible,
    onTransitionComplete: (state) => {
      if (state === "exited") {
        setAnimationExited(true);
        setExited(true);
      } else {
        setAnimationExited(false);
        setExited(false);
      }
      onTransitionComplete && onTransitionComplete(state);
    },
    ...rest,
    ref
  });
};
var PresenceTransition_default = memo32(forwardRef35(PresenceTransition));

// node_modules/native-base/src/components/composites/Transitions/Fade.tsx
var Fade2 = ({ children, style, ...props }, ref) => {
  const { in: animationState, entryDuration, exitDuration } = useThemeProps("Fade", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React71.createElement(PresenceTransition_default, {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: entryDuration } },
    exit: { opacity: 0, transition: { duration: exitDuration } },
    style,
    visible: animationState,
    ref
  }, children);
};
var Fade_default = React71.memo(React71.forwardRef(Fade2));

// node_modules/native-base/src/components/composites/Transitions/ScaleFade.tsx
import React72 from "react";
var ScaleFade2 = ({ children, style, ...props }, ref) => {
  const { in: animationState, duration, initialScale } = useThemeProps("ScaleFade", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React72.createElement(PresenceTransition_default, {
    initial: { opacity: 0, scale: initialScale },
    animate: { opacity: 1, scale: 1, transition: { duration } },
    exit: { opacity: 0, scale: initialScale, transition: { duration } },
    style,
    visible: animationState,
    ref
  }, children);
};
var ScaleFade_default = React72.memo(React72.forwardRef(ScaleFade2));

// node_modules/native-base/src/components/composites/Transitions/Slide.tsx
import React73 from "react";
var holderStyle = {
  top: {
    top: 0,
    right: 0,
    left: 0
  },
  right: {
    right: 0,
    top: 0,
    bottom: 0
  },
  bottom: {
    bottom: 0,
    right: 0,
    left: 0
  },
  left: {
    left: 0,
    bottom: 0,
    top: 0
  }
};
var Slide2 = ({ children, ...props }, ref) => {
  const { in: visible, placement, duration } = useThemeProps("Slide", props);
  const [containerOpacity, setContainerOpacity] = React73.useState(0);
  const [size, setSize] = React73.useState(0);
  const provideSize = (layoutSize) => {
    if (placement === "right" || placement === "left")
      setSize(layoutSize.width);
    else
      setSize(layoutSize.height);
    setContainerOpacity(1);
  };
  const transition = { duration };
  const animationStyle = {
    top: {
      initial: {
        translateY: -size
      },
      animate: {
        translateY: 0,
        transition
      }
    },
    bottom: {
      initial: {
        translateY: size
      },
      animate: {
        translateY: 0,
        transition
      },
      exit: {
        translateY: size,
        transition
      }
    },
    left: {
      initial: {
        translateX: -size
      },
      animate: {
        translateX: 0,
        transition
      }
    },
    right: {
      initial: {
        translateX: size
      },
      animate: {
        translateX: 0,
        transition
      }
    }
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React73.createElement(PresenceTransition_default, {
    visible,
    ...animationStyle[placement],
    style: [
      { position: "absolute" },
      holderStyle[placement],
      { height: "100%" }
    ]
  }, /* @__PURE__ */ React73.createElement(Box_default, {
    ...props,
    h: "100%",
    opacity: containerOpacity,
    pointerEvents: "box-none",
    ref,
    onLayout: (e) => provideSize(e.nativeEvent.layout)
  }, children));
};
var Slide_default = React73.memo(React73.forwardRef(Slide2));

// node_modules/native-base/src/components/composites/Transitions/SlideFade.tsx
import React74 from "react";
import { Animated as Animated2, Platform as Platform21 } from "react-native";
var SlideFade2 = ({ children, ...props }, ref) => {
  const isDomUsable = canUseDom();
  const { in: animationState, duration, offsetX, offsetY } = useThemeProps("SlideFade", props);
  const fadeAnim = React74.useRef(new Animated2.Value(0)).current;
  const slideAnimX = React74.useRef(new Animated2.Value(0)).current;
  const slideAnimY = React74.useRef(new Animated2.Value(0)).current;
  const animIn = () => {
    if (isDomUsable) {
      Animated2.timing(fadeAnim, {
        toValue: 1,
        duration,
        useNativeDriver: Platform21.OS !== "web"
      }).start();
      Animated2.timing(slideAnimX, {
        toValue: 0,
        duration,
        useNativeDriver: Platform21.OS !== "web"
      }).start();
      Animated2.timing(slideAnimY, {
        toValue: 0,
        duration,
        useNativeDriver: Platform21.OS !== "web"
      }).start();
    }
  };
  const animOut = () => {
    if (isDomUsable) {
      Animated2.timing(fadeAnim, {
        toValue: 0,
        duration,
        useNativeDriver: Platform21.OS !== "web"
      }).start();
      offsetX && Animated2.timing(slideAnimX, {
        toValue: offsetX,
        duration,
        useNativeDriver: Platform21.OS !== "web"
      }).start();
      offsetY && Animated2.timing(slideAnimY, {
        toValue: offsetY,
        duration,
        useNativeDriver: Platform21.OS !== "web"
      }).start();
    }
  };
  animationState ? animIn() : animOut();
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React74.createElement(Animated2.View, {
    style: [
      {
        opacity: fadeAnim,
        transform: [{ translateX: slideAnimX, translateY: slideAnimY }]
      }
    ],
    ref
  }, /* @__PURE__ */ React74.createElement(Box_default, {
    ...props
  }, children));
};
var SlideFade_default = React74.memo(React74.forwardRef(SlideFade2));

// node_modules/native-base/src/components/composites/Transitions/Stagger.tsx
import cloneDeep2 from "lodash.clonedeep";
import React75 from "react";
var defaultStaggerConfig = { offset: 0, reverse: false };
var Stagger = ({ children, ...restProps }) => {
  if (useHasResponsiveProps(restProps)) {
    return null;
  }
  return React75.Children.map(children, (child, index) => {
    const clonedAnimationConfig = cloneDeep2(restProps);
    const { animate, exit } = clonedAnimationConfig;
    if (animate) {
      if (!animate.transition) {
        animate.transition = {};
      }
      animate.transition.delay = animate.transition.delay ?? 0;
      const stagger = animate.transition.stagger ?? defaultStaggerConfig;
      const offset = stagger.reverse ? (React75.Children.count(children) - 1 - index) * stagger.offset : index * stagger.offset;
      animate.transition.delay = animate.transition.delay + offset;
    }
    if (exit) {
      if (!exit.transition) {
        exit.transition = {};
      }
      exit.transition.delay = exit.transition.delay ?? 0;
      const stagger = exit.transition.stagger ?? defaultStaggerConfig;
      const offset = stagger.reverse ? (React75.Children.count(children) - 1 - index) * stagger.offset : index * stagger.offset;
      exit.transition.delay = exit.transition.delay + offset;
    }
    return /* @__PURE__ */ React75.createElement(PresenceTransition_default, {
      key: child.key,
      ...clonedAnimationConfig
    }, child);
  });
};
var Stagger_default = Stagger;

// node_modules/native-base/src/components/composites/Modal/Modal.tsx
import { FocusScope } from "@react-native-aria/focus";

// node_modules/native-base/src/components/composites/Modal/Context.ts
import React76 from "react";
var ModalContext = React76.createContext({
  handleClose: () => {
  },
  contentSize: {},
  initialFocusRef: { current: null },
  finalFocusRef: { current: null }
});

// node_modules/native-base/src/components/primitives/Overlay/Overlay.tsx
import { OverlayContainer } from "@react-native-aria/overlays";
import React77 from "react";
import { Platform as Platform22 } from "react-native";
import { Modal as Modal2 } from "react-native";
function Overlay({
  children,
  isOpen,
  useRNModalOnAndroid = false,
  isKeyboardDismissable = true,
  onRequestClose
}) {
  const [exited, setExited] = React77.useState(!isOpen);
  useKeyboardDismissable({
    enabled: isOpen && isKeyboardDismissable,
    callback: onRequestClose ? onRequestClose : () => {
    }
  });
  if (exited && !isOpen) {
    return null;
  }
  if (Platform22.OS === "android" && useRNModalOnAndroid) {
    return /* @__PURE__ */ React77.createElement(ExitAnimationContext.Provider, {
      value: { exited, setExited }
    }, /* @__PURE__ */ React77.createElement(Modal2, {
      transparent: true,
      visible: true,
      onRequestClose
    }, children));
  }
  return /* @__PURE__ */ React77.createElement(OverlayContainer, null, /* @__PURE__ */ React77.createElement(ExitAnimationContext.Provider, {
    value: { exited, setExited }
  }, children));
}

// node_modules/native-base/src/components/composites/Modal/Modal.tsx
var Modal3 = ({
  children,
  isOpen,
  onClose,
  defaultIsOpen,
  initialFocusRef,
  finalFocusRef,
  avoidKeyboard,
  closeOnOverlayClick = true,
  isKeyboardDismissable = true,
  overlayVisible = true,
  backdropVisible = true,
  animationPreset = "fade",
  ...rest
}, ref) => {
  const bottomInset = useKeyboardBottomInset();
  const { contentSize, _backdrop, ...resolvedProps } = usePropsResolution("Modal", rest);
  const [visible, setVisible] = useControllableState({
    value: isOpen,
    defaultValue: defaultIsOpen,
    onChange: (val) => {
      if (!val)
        onClose && onClose();
    }
  });
  const handleClose = () => setVisible(false);
  const child = /* @__PURE__ */ React78.createElement(Box_default, {
    bottom: avoidKeyboard ? bottomInset + "px" : void 0,
    ...resolvedProps,
    ref,
    pointerEvents: "box-none"
  }, children);
  if (useHasResponsiveProps(rest)) {
    return null;
  }
  return /* @__PURE__ */ React78.createElement(Overlay, {
    isOpen: visible,
    onRequestClose: handleClose,
    isKeyboardDismissable,
    useRNModalOnAndroid: true
  }, /* @__PURE__ */ React78.createElement(ModalContext.Provider, {
    value: {
      handleClose,
      contentSize,
      initialFocusRef,
      finalFocusRef
    }
  }, /* @__PURE__ */ React78.createElement(Fade_default, {
    exitDuration: 150,
    entryDuration: 200,
    in: visible,
    style: StyleSheet5.absoluteFill
  }, overlayVisible && backdropVisible && /* @__PURE__ */ React78.createElement(Backdrop_default, {
    onPress: () => {
      closeOnOverlayClick && handleClose();
    },
    ..._backdrop
  })), animationPreset === "slide" ? /* @__PURE__ */ React78.createElement(Slide_default, {
    in: visible,
    duration: 200
  }, /* @__PURE__ */ React78.createElement(FocusScope, {
    contain: visible,
    autoFocus: visible && !initialFocusRef,
    restoreFocus: visible && !finalFocusRef
  }, child)) : /* @__PURE__ */ React78.createElement(Fade_default, {
    exitDuration: 100,
    entryDuration: 200,
    in: visible,
    style: StyleSheet5.absoluteFill
  }, /* @__PURE__ */ React78.createElement(FocusScope, {
    contain: visible,
    autoFocus: visible && !initialFocusRef,
    restoreFocus: visible && !finalFocusRef
  }, child))));
};
var Modal_default = memo33(forwardRef36(Modal3));

// node_modules/native-base/src/components/composites/Modal/ModalContent.tsx
import React79, { memo as memo34, forwardRef as forwardRef37 } from "react";
import { Platform as Platform23 } from "react-native";
var ModalContent2 = (props, ref) => {
  const resolvedProps = usePropsResolution("ModalContent", props);
  const {
    contentSize,
    initialFocusRef,
    finalFocusRef,
    handleClose
  } = React79.useContext(ModalContext);
  React79.useEffect(() => {
    const finalRefVal = finalFocusRef ? finalFocusRef.current : null;
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
    return () => {
      if (finalRefVal) {
        finalRefVal.focus();
      }
    };
  }, [initialFocusRef, finalFocusRef]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React79.createElement(Box_default, {
    ...contentSize,
    ...resolvedProps,
    ref,
    onAccessibilityEscape: handleClose,
    "aria-modal": "true",
    accessibilityRole: Platform23.OS === "web" ? "dialog" : void 0,
    accessibilityViewIsModal: true
  });
};
var ModalContent_default = memo34(forwardRef37(ModalContent2));

// node_modules/native-base/src/components/composites/Modal/ModalBody.tsx
import React81, { memo as memo35, forwardRef as forwardRef39 } from "react";

// node_modules/native-base/src/components/basic/ScrollView/ScrollView.tsx
import React80, { forwardRef as forwardRef38 } from "react";
import { ScrollView as RNScrollView } from "react-native";
var StyledScrollView = makeStyledComponent(RNScrollView);
var ScrollView = forwardRef38((props, ref) => {
  const {
    _contentContainerStyle,
    contentContainerStyle,
    ...resolvedProps
  } = usePropsResolution("ScrollView", props, {});
  const resolved_ContentContainerStyle = useStyledSystemPropsResolver(_contentContainerStyle || {});
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React80.createElement(StyledScrollView, {
    ...resolvedProps,
    contentContainerStyle: contentContainerStyle || resolved_ContentContainerStyle,
    ref
  });
});

// node_modules/native-base/src/components/composites/Modal/ModalBody.tsx
var ModalBody2 = ({
  children,
  _scrollview,
  ...props
}, ref) => {
  const resolvedProps = usePropsResolution("ModalBody", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React81.createElement(ScrollView, {
    ..._scrollview
  }, /* @__PURE__ */ React81.createElement(Box_default, {
    ...resolvedProps,
    ref
  }, children));
};
var ModalBody_default = memo35(forwardRef39(ModalBody2));

// node_modules/native-base/src/components/composites/Modal/ModalCloseButton.tsx
import React82, { memo as memo36, forwardRef as forwardRef40 } from "react";
var ModalCloseButton2 = (props, ref) => {
  const { _icon, ...resolvedProps } = usePropsResolution("ModalCloseButton", props);
  const { handleClose } = React82.useContext(ModalContext);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React82.createElement(Button_default, {
    variant: "ghost",
    ...resolvedProps,
    onPress: handleClose,
    accessibilityLabel: "Close dialog",
    ref
  }, /* @__PURE__ */ React82.createElement(CloseIcon, {
    ..._icon
  }));
};
var ModalCloseButton_default = memo36(forwardRef40(ModalCloseButton2));

// node_modules/native-base/src/components/composites/Modal/ModalFooter.tsx
import React83, { memo as memo37, forwardRef as forwardRef41 } from "react";
var ModalFooter2 = (props, ref) => {
  const resolvedProps = usePropsResolution("ModalFooter", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React83.createElement(Box_default, {
    ...resolvedProps,
    ref
  });
};
var ModalFooter_default = memo37(forwardRef41(ModalFooter2));

// node_modules/native-base/src/components/composites/Modal/ModalHeader.tsx
import React84, { memo as memo38, forwardRef as forwardRef42 } from "react";
var ModalHeader2 = (props, ref) => {
  const resolvedProps = usePropsResolution("ModalHeader", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React84.createElement(Box_default, {
    ...resolvedProps,
    ref
  });
};
var ModalHeader_default = memo38(forwardRef42(ModalHeader2));

// node_modules/native-base/src/components/composites/Modal/index.tsx
var ModalTemp = Modal_default;
ModalTemp.Content = ModalContent_default;
ModalTemp.CloseButton = ModalCloseButton_default;
ModalTemp.Header = ModalHeader_default;
ModalTemp.Footer = ModalFooter_default;
ModalTemp.Body = ModalBody_default;
var ModalMain = ModalTemp;

// node_modules/native-base/src/components/composites/Actionsheet/ActionSheetContext.ts
import React85 from "react";
var ActionSheetContext = React85.createContext({
  hideDragIndicator: false
});

// node_modules/native-base/src/components/composites/Actionsheet/Actionsheet.tsx
var Actionsheet2 = ({ children, hideDragIndicator = false, ...props }, ref) => {
  const {
    isOpen,
    disableOverlay,
    onClose,
    ...resolvedProps
  } = usePropsResolution("Actionsheet", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React86.createElement(ModalMain, {
    isOpen,
    onClose,
    justifyContent: "flex-end",
    animationPreset: "slide",
    ...resolvedProps,
    overlayVisible: disableOverlay ? false : true,
    closeOnOverlayClick: disableOverlay ? false : true,
    ref
  }, /* @__PURE__ */ React86.createElement(ActionSheetContext.Provider, {
    value: { hideDragIndicator }
  }, children));
};
var Actionsheet_default = memo39(forwardRef43(Actionsheet2));

// node_modules/native-base/src/components/composites/Actionsheet/ActionsheetItem.tsx
import React87, { memo as memo40, forwardRef as forwardRef44 } from "react";
var ActionsheetItem2 = (props, ref) => {
  const resolvedProps = usePropsResolution("ActionsheetItem", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React87.createElement(Button2, {
    ...resolvedProps,
    ref
  });
};
var ActionsheetItem_default = memo40(forwardRef44(ActionsheetItem2));

// node_modules/native-base/src/components/composites/Actionsheet/ActionsheetContent.tsx
import React88, { memo as memo41, forwardRef as forwardRef45 } from "react";
import { Animated as Animated3, PanResponder } from "react-native";
var ActionsheetContent2 = ({ children, ...props }, ref) => {
  const { _dragIndicator, ...resolvedProps } = usePropsResolution("ActionsheetContent", props);
  const { handleClose } = React88.useContext(ModalContext);
  const { hideDragIndicator } = React88.useContext(ActionSheetContext);
  const pan = React88.useRef(new Animated3.ValueXY()).current;
  const sheetHeight = React88.useRef(0);
  const panResponder = React88.useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_evt, gestureState) => {
      return gestureState.dy > 15;
    },
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 0) {
        Animated3.event([null, { dy: pan.y }], {
          useNativeDriver: false
        })(e, gestureState);
      }
    },
    onPanResponderRelease: (_e, gestureState) => {
      if (sheetHeight.current / 4 - gestureState.dy < 0) {
        Animated3.timing(pan, {
          toValue: { x: 0, y: sheetHeight.current },
          duration: 150,
          useNativeDriver: true
        }).start(handleClose);
      } else {
        Animated3.spring(pan, {
          toValue: { x: 0, y: 0 },
          overshootClamping: true,
          useNativeDriver: true
        }).start();
      }
    }
  })).current;
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React88.createElement(Animated3.View, {
    style: {
      transform: [{ translateY: pan.y }],
      width: "100%"
    },
    onLayout: (event) => {
      const { height } = event.nativeEvent.layout;
      sheetHeight.current = height;
    },
    pointerEvents: "box-none"
  }, !hideDragIndicator ? /* @__PURE__ */ React88.createElement(React88.Fragment, null, /* @__PURE__ */ React88.createElement(Box_default, {
    py: 5,
    ...panResponder.panHandlers,
    collapsable: false
  })) : null, /* @__PURE__ */ React88.createElement(ModalMain.Content, {
    ...resolvedProps,
    ref,
    safeAreaBottom: true
  }, !hideDragIndicator ? /* @__PURE__ */ React88.createElement(React88.Fragment, null, /* @__PURE__ */ React88.createElement(Box_default, {
    pt: 3,
    pb: 3,
    mt: -2,
    ...panResponder.panHandlers,
    width: "100%",
    alignItems: "center",
    collapsable: false
  }, /* @__PURE__ */ React88.createElement(Box_default, {
    ..._dragIndicator
  }))) : null, children));
};
var ActionsheetContent_default = memo41(forwardRef45(ActionsheetContent2));

// node_modules/native-base/src/components/composites/Actionsheet/index.tsx
var ActionsheetTemp = Actionsheet_default;
ActionsheetTemp.Content = ActionsheetContent_default;
ActionsheetTemp.Item = ActionsheetItem_default;
var Actionsheet3 = ActionsheetTemp;

// node_modules/native-base/src/components/primitives/Select/Select.tsx
import React89, { forwardRef as forwardRef46, memo as memo42 } from "react";
import { Platform as Platform24, View as View2, Pressable as Pressable2, Keyboard as Keyboard2 } from "react-native";
import { useFocusRing as useFocusRing2 } from "@react-native-aria/focus";
import { useHover as useHover5 } from "@react-native-aria/interactions";
var unstyledSelecWebtStyles = {
  width: "100%",
  height: "100%",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none"
};
var SelectContext = React89.createContext({
  onValueChange: () => {
  },
  selectedValue: null,
  _selectedItem: {},
  _item: {}
});
var Select2 = ({ wrapperRef, ...props }, ref) => {
  const selectProps = useFormControl({
    isDisabled: props.isDisabled,
    nativeID: props.nativeID
  });
  const isDisabled = selectProps.disabled;
  const tempFix = "__NativebasePlaceholder__";
  const _ref = React89.useRef(null);
  const [isOpen, setIsOpen] = React89.useState(false);
  const { focusProps, isFocusVisible } = useFocusRing2();
  const { hoverProps, isHovered } = useHover5({ isDisabled }, _ref);
  const {
    onValueChange,
    selectedValue,
    children,
    dropdownIcon,
    dropdownCloseIcon,
    dropdownOpenIcon,
    placeholder,
    accessibilityLabel,
    defaultValue,
    _item,
    _selectedItem,
    size,
    ...resolvedProps
  } = usePropsResolution("Input", props, {
    isDisabled,
    isHovered,
    isFocusVisible
  });
  const [value, setValue] = useControllableState({
    value: selectedValue,
    defaultValue,
    onChange: (newValue) => {
      onValueChange && onValueChange(newValue);
      setIsOpen(false);
    }
  });
  const itemsList = React89.Children.map(children, (child) => {
    return {
      label: child.props.label,
      value: child.props.value
    };
  });
  const selectedItemArray = itemsList.filter((item) => item.value === value);
  const selectedItem = selectedItemArray && selectedItemArray.length ? selectedItemArray[0] : null;
  const {
    variant,
    customDropdownIconProps,
    _actionSheetContent,
    ...newProps
  } = usePropsResolution("Select", props);
  const [borderProps, remainingProps] = extractInObject(newProps, [
    ...stylingProps.border
  ]);
  const [layoutProps, nonLayoutProps] = extractInObject(remainingProps, [
    ...stylingProps.margin,
    ...stylingProps.layout,
    ...stylingProps.flexbox,
    ...stylingProps.position,
    ...stylingProps.background,
    "children"
  ]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  const rightIcon = isOpen && dropdownOpenIcon ? dropdownOpenIcon : !isOpen && dropdownCloseIcon ? dropdownCloseIcon : dropdownIcon ? dropdownIcon : /* @__PURE__ */ React89.createElement(ChevronDownIcon, {
    ...customDropdownIconProps
  });
  const commonInput = /* @__PURE__ */ React89.createElement(Input_default, {
    "aria-hidden": true,
    importantForAccessibility: "no",
    value: selectedItem?.label,
    placeholder,
    editable: false,
    focusable: false,
    size,
    variant,
    InputRightElement: rightIcon,
    height: layoutProps.height ?? layoutProps.h,
    ...nonLayoutProps,
    ...borderProps,
    isDisabled
  });
  const handleClose = () => setIsOpen(false);
  return /* @__PURE__ */ React89.createElement(Box_default, {
    borderWidth: 1,
    borderColor: "transparent",
    ...layoutProps,
    borderRadius: resolvedProps.borderRadius,
    ref: wrapperRef
  }, Platform24.OS === "web" ? /* @__PURE__ */ React89.createElement(React89.Fragment, null, /* @__PURE__ */ React89.createElement(Box_default, {
    w: "100%",
    h: "100%",
    position: "absolute",
    opacity: "0",
    zIndex: 1
  }, /* @__PURE__ */ React89.createElement("select", {
    "aria-readonly": selectProps.readOnly,
    required: selectProps.required,
    disabled: isDisabled,
    ...focusProps,
    ...hoverProps,
    ref: mergeRefs([ref, _ref]),
    style: unstyledSelecWebtStyles,
    onChange: (e) => {
      setValue(e.target.value);
    },
    value: selectedItem === null ? tempFix : value,
    "aria-label": placeholder
  }, /* @__PURE__ */ React89.createElement("option", {
    disabled: true,
    value: tempFix
  }, placeholder), children)), commonInput) : /* @__PURE__ */ React89.createElement(React89.Fragment, null, /* @__PURE__ */ React89.createElement(Pressable2, {
    onPress: () => {
      Keyboard2.dismiss();
      setIsOpen(true);
    },
    disabled: isDisabled,
    accessibilityLabel,
    accessibilityRole: "button",
    ref: mergeRefs([ref, _ref])
  }, /* @__PURE__ */ React89.createElement(View2, {
    pointerEvents: "none"
  }, commonInput)), /* @__PURE__ */ React89.createElement(Actionsheet3, {
    isOpen,
    onClose: handleClose
  }, /* @__PURE__ */ React89.createElement(Actionsheet3.Content, {
    ..._actionSheetContent
  }, /* @__PURE__ */ React89.createElement(ScrollView, {
    width: "100%"
  }, /* @__PURE__ */ React89.createElement(SelectContext.Provider, {
    value: {
      onValueChange: setValue,
      selectedValue: value,
      _selectedItem: _selectedItem ?? {},
      _item: _item ?? {}
    }
  }, children))))));
};
var Select_default = memo42(forwardRef46(Select2));

// node_modules/native-base/src/components/primitives/Select/SelectItem.tsx
var Item = ({ isDisabled, label, value, ...props }, ref) => {
  const {
    onValueChange,
    selectedValue,
    _selectedItem,
    _item
  } = React90.useContext(SelectContext);
  if (useHasResponsiveProps({ ...props, isDisabled, label, value })) {
    return null;
  }
  if (Platform25.OS !== "web") {
    const isSelected = selectedValue === value;
    return /* @__PURE__ */ React90.createElement(Actionsheet3.Item, {
      ref,
      onPress: () => {
        if (!isDisabled) {
          onValueChange(value);
        }
      },
      accessibilityState: { selected: isSelected },
      ..._item,
      ...isSelected && _selectedItem,
      ...props
    }, label);
  } else {
    return /* @__PURE__ */ React90.createElement("option", {
      ref,
      value,
      disabled: isDisabled
    }, label);
  }
};
var SelectItem_default = memo43(forwardRef47(Item));

// node_modules/native-base/src/components/primitives/Select/index.tsx
var SelectTemp = Select_default;
SelectTemp.Item = SelectItem_default;
var Select3 = SelectTemp;
var Select_default2 = Select3;

// node_modules/native-base/src/components/primitives/Heading/index.tsx
import React91, { memo as memo44, forwardRef as forwardRef48 } from "react";
var Heading = (props, ref) => {
  const resolvedProps = usePropsResolution("Heading", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React91.createElement(Text_default, {
    ...resolvedProps,
    ref
  });
};
var Heading_default = memo44(forwardRef48(Heading));

// node_modules/native-base/src/components/primitives/Switch/index.tsx
import React92, { memo as memo45, forwardRef as forwardRef49 } from "react";
import { useToggleState as useToggleState2 } from "@react-stately/toggle";
import { StyleSheet as StyleSheet6, Switch as RNSwitch } from "react-native";
import isNil5 from "lodash.isnil";
import { useHover as useHover6 } from "@react-native-aria/interactions";
var StyledNBSwitch = makeStyledComponent(RNSwitch);
var Switch = ({
  style,
  onToggle,
  isDisabled,
  isInvalid,
  isChecked,
  defaultIsChecked,
  accessibilityLabel,
  accessibilityHint,
  ...props
}, ref) => {
  const state = useToggleState2({
    defaultSelected: !isNil5(defaultIsChecked) ? defaultIsChecked : false
  });
  const borderColorInvalid = useToken("colors", "danger.600");
  const checked = !isNil5(isChecked) ? isChecked : state.isSelected;
  const inValidPropFactors = {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: borderColorInvalid
  };
  const _ref = React92.useRef(null);
  const { isHovered } = useHover6({}, _ref);
  const {
    onTrackColor: _onTrackColor,
    offTrackColor: _offTrackColor,
    onThumbColor: _onThumbColor,
    offThumbColor: _offThumbColor,
    style: themeStyle,
    ...resolvedProps
  } = usePropsResolution("Switch", props, {
    isHovered,
    isDisabled,
    isInvalid,
    isChecked: checked
  });
  const computedStyle = StyleSheet6.flatten([
    themeStyle,
    style,
    isInvalid ? inValidPropFactors : {}
  ]);
  const onTrackColor = useToken("colors", _onTrackColor);
  const offTrackColor = useToken("colors", _offTrackColor);
  const onThumbColor = useToken("colors", _onThumbColor);
  const offThumbColor = useToken("colors", _offThumbColor);
  if (useHasResponsiveProps({
    ...props,
    isDisabled,
    isInvalid,
    isChecked,
    defaultIsChecked,
    accessibilityLabel,
    accessibilityHint
  })) {
    return null;
  }
  return /* @__PURE__ */ React92.createElement(StyledNBSwitch, {
    accessibilityLabel,
    accessibilityHint,
    trackColor: { false: offTrackColor, true: onTrackColor },
    thumbColor: checked ? onThumbColor : offThumbColor,
    activeThumbColor: onThumbColor,
    ios_backgroundColor: offTrackColor,
    ...resolvedProps,
    disabled: isDisabled,
    onValueChange: onToggle ? onToggle : state.toggle,
    value: checked,
    style: computedStyle,
    ref: mergeRefs([ref, _ref]),
    opacity: isDisabled ? 0.4 : 1
  });
};
var Switch_default = memo45(forwardRef49(Switch));

// node_modules/native-base/src/components/primitives/TextArea/index.tsx
import React93, { memo as memo46, forwardRef as forwardRef50 } from "react";
var TextArea = ({ wrapperRef, ...props }, ref) => {
  const { totalLines, ...newProps } = usePropsResolution("TextArea", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React93.createElement(Input_default, {
    ...newProps,
    numberOfLines: totalLines,
    wrapperRef,
    ref
  });
};
var TextArea_default = memo46(forwardRef50(TextArea));

// node_modules/native-base/src/components/primitives/Link/index.tsx
import React94, { memo as memo47, forwardRef as forwardRef51 } from "react";
import { Platform as Platform27 } from "react-native";

// node_modules/native-base/src/components/primitives/Link/useLink.ts
import { Linking, Platform as Platform26 } from "react-native";
var linkToHREF = (URL) => {
  Linking.openURL(URL).catch((err) => console.error("An error occurred", err));
};
var addOnPressFunctionality = (href, callback) => {
  href ? linkToHREF(href) : "";
  callback ? callback() : () => {
  };
};
function useLink(props) {
  const { href, isExternal, onPress, _ref } = props;
  let platformLinkProps = {};
  if (Platform26.OS === "web") {
    platformLinkProps = {
      href,
      onClick: onPress
    };
    if (isExternal && _ref.current) {
      _ref.current.target = "_blank";
    }
  } else {
    platformLinkProps = {
      onPress: () => {
        addOnPressFunctionality(href, onPress);
      }
    };
  }
  return {
    linkProps: {
      ...platformLinkProps,
      accessibilityRole: "link",
      accessible: true
    }
  };
}

// node_modules/native-base/src/components/primitives/Link/index.tsx
import { useHover as useHover7 } from "@react-native-aria/interactions";
var Link = (props, ref) => {
  const _ref = React94.useRef(null);
  const { isHovered } = useHover7({}, _ref);
  const {
    isUnderlined,
    children,
    _text,
    href,
    onPress,
    isExternal,
    ...resolvedProps
  } = usePropsResolution("Link", props, { isHovered });
  const { linkProps } = useLink({ href, onPress, isExternal, _ref });
  const linkTextProps = {
    textDecorationLine: isUnderlined ? "underline" : "none",
    ..._text
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React94.createElement(React94.Fragment, null, Platform27.OS === "web" ? /* @__PURE__ */ React94.createElement(Box_default, {
    ...linkProps,
    ...resolvedProps,
    _text: linkTextProps,
    ref: mergeRefs([ref, _ref]),
    flexDirection: "row"
  }, children) : /* @__PURE__ */ React94.createElement(Pressable_default, {
    ...linkProps,
    ...resolvedProps,
    ref,
    flexDirection: "row"
  }, React94.Children.map(children, (child) => typeof child === "string" || typeof child === "number" ? /* @__PURE__ */ React94.createElement(Text_default, {
    ...resolvedProps._text,
    ...linkTextProps
  }, child) : child)));
};
var Link_default = memo47(forwardRef51(Link));

// node_modules/native-base/src/components/primitives/List/List.tsx
import React95, { memo as memo48, forwardRef as forwardRef52 } from "react";
var List2 = ({ children, divider, ...props }, ref) => {
  const {
    _text,
    _hover,
    _focus,
    _pressed,
    ...resolvedProps
  } = usePropsResolution("List", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  children = React95.Children.map(children, (child, ind) => {
    return React95.cloneElement(child, {
      index: ind,
      _text: { ..._text, ...child.props?._text },
      _hover: { ..._hover, ...child.props?._hover },
      _focus: { ..._focus, ...child.props?._focus },
      _pressed: { ..._pressed, ...child.props?._pressed }
    });
  });
  return /* @__PURE__ */ React95.createElement(VStack_default, {
    divider,
    ref,
    ...resolvedProps
  }, children);
};
var List_default = memo48(forwardRef52(List2));

// node_modules/native-base/src/components/primitives/List/ListItem.tsx
import React96, { memo as memo49, forwardRef as forwardRef53 } from "react";
var ListItem2 = ({ children, ...props }, ref) => {
  const { hoverProps, isHovered } = useHover2();
  const { pressableProps, isPressed } = useIsPressed();
  const { focusProps, isFocused } = useFocus();
  const {
    index,
    start,
    unordered,
    ul,
    ordered,
    ol,
    _text,
    borderTopWidth,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = usePropsResolution("ListItem", props, {
    isHovered,
    isPressed,
    isFocused
  });
  const _ref = React96.useRef(null);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  const [
    pressableComponentProps,
    nonPressableProps
  ] = extractInObject(resolvedProps, [
    "onPress",
    "unstable_pressDelay",
    "android_ripple",
    "android_disableSound",
    "delayLongPress",
    "hitSlop",
    "disabled",
    "onLongPress",
    "onPressIn",
    "onPressOut",
    "pressRetentionOffset",
    "testOnly_pressed",
    "onHoverIn",
    "onHoverOut",
    "onFocus",
    "onBlur",
    "_pressed",
    "_focus"
  ]);
  return Object.keys(pressableComponentProps).length !== 0 ? /* @__PURE__ */ React96.createElement(Pressable_default, {
    accessibilityRole: "button",
    accessibilityLabel: `List-Item-${index + start}`,
    flexDirection: "row",
    alignItems: "center",
    ...resolvedProps,
    onPressIn: composeEventHandlers(onPressIn, pressableProps.onPressIn),
    onPressOut: composeEventHandlers(onPressOut, pressableProps.onPressOut),
    onHoverIn: composeEventHandlers(onHoverIn, hoverProps.onHoverIn),
    onHoverOut: composeEventHandlers(onHoverOut, hoverProps.onHoverOut),
    onFocus: composeEventHandlers(composeEventHandlers(onFocus, focusProps.onFocus)),
    onBlur: composeEventHandlers(composeEventHandlers(onBlur, focusProps.onBlur)),
    borderTopWidth: index ? borderTopWidth : 0,
    ref
  }, /* @__PURE__ */ React96.createElement(React96.Fragment, null, /* @__PURE__ */ React96.createElement(Box_default, {
    flexDirection: "row",
    alignItems: "center",
    pl: 2
  }, ul || unordered ? /* @__PURE__ */ React96.createElement(Box_default, {
    style: { transform: [{ scale: 1.5 }] },
    mr: 2
  }, "\u2022") : null, ol || ordered ? /* @__PURE__ */ React96.createElement(Box_default, {
    mr: 2
  }, index + start + ".") : null), /* @__PURE__ */ React96.createElement(Box_default, {
    flexDirection: "row",
    alignItems: "center"
  }, children))) : /* @__PURE__ */ React96.createElement(Box_default, {
    accessibilityRole: "text",
    accessibilityLabel: `List-Item-${index + start}`,
    flexDirection: "row",
    alignItems: "center",
    ...nonPressableProps,
    borderTopWidth: index ? borderTopWidth : 0,
    ref: mergeRefs([ref, _ref]),
    ...isHovered && resolvedProps._hover,
    ...isPressed && resolvedProps._pressed,
    ...isFocused && resolvedProps._focus
  }, /* @__PURE__ */ React96.createElement(Box_default, {
    flexDirection: "row",
    alignItems: "center",
    pl: 2
  }, ul || unordered ? /* @__PURE__ */ React96.createElement(Box_default, {
    style: { transform: [{ scale: 1.5 }] },
    mr: 2,
    _text: { fontWeight: "bold", ..._text }
  }, "\u2022") : null, ol || ordered ? /* @__PURE__ */ React96.createElement(Box_default, {
    mr: 2,
    _text: { fontWeight: "bold", ..._text }
  }, index + start + ".") : null), /* @__PURE__ */ React96.createElement(Box_default, {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    _text
  }, children));
};
var ListItem_default = memo49(forwardRef53(ListItem2));

// node_modules/native-base/src/components/primitives/List/ListIcon.tsx
import React97 from "react";
var ListIcon2 = (props, ref) => {
  const resolvedProps = usePropsResolution("ListIcon", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React97.createElement(Icon_default, {
    ...resolvedProps,
    ref
  });
};
var ListIcon_default = React97.memo(React97.forwardRef(ListIcon2));

// node_modules/native-base/src/components/primitives/List/Ordered.tsx
import React98 from "react";
var OrderedList = ({ style, children, ...props }, ref) => {
  const { _text, start, _hover, ...resolvedProps } = usePropsResolution("List", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  children = React98.Children.map(children, (child, ind) => {
    return React98.cloneElement(child, {
      ol: true,
      index: ind,
      _text,
      _hover,
      start,
      ...child.props
    }, child.props.children);
  });
  return /* @__PURE__ */ React98.createElement(VStack_default, {
    style,
    ...resolvedProps,
    ref
  }, children);
};
var Ordered_default = React98.memo(React98.forwardRef(OrderedList));

// node_modules/native-base/src/components/primitives/List/Unordered.tsx
import React99 from "react";
var UnorderedList = ({ children, ...props }, ref) => {
  const { _text, _hover, ...resolvedProps } = usePropsResolution("List", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  children = React99.Children.map(children, (child, ind) => {
    return React99.cloneElement(child, {
      index: ind,
      ul: true,
      _text,
      _hover,
      ...child.props
    }, child.props.children);
  });
  return /* @__PURE__ */ React99.createElement(VStack_default, {
    ...resolvedProps,
    ref
  }, children);
};
var Unordered_default = React99.memo(React99.forwardRef(UnorderedList));

// node_modules/native-base/src/components/primitives/List/index.tsx
var ListTemp = List_default;
ListTemp.Item = ListItem_default;
ListTemp.Icon = ListIcon_default;
ListTemp.Ordered = Ordered_default;
ListTemp.Unordered = Unordered_default;
var List3 = ListTemp;

// node_modules/native-base/src/components/primitives/Hidden/index.tsx
import { memo as memo50 } from "react";
import { Platform as Platform28 } from "react-native";
function Hidden({ children, ...props }) {
  const { from, till, only, platform, colorMode } = usePropsResolution("Hidden", props, {}, {
    ignoreProps: ["only", "platform"]
  });
  const { breakpoints: breakpoints2 } = useTheme();
  const currentColorMode = useColorMode();
  const breakpointValueObject = Object.keys(breakpoints2).reduce((obj, val) => {
    obj[val] = val;
    return obj;
  }, {});
  const breakpointValue = useBreakpointValue(breakpointValueObject);
  const [currentBreakpointValue] = useToken("breakpoints", [breakpointValue]);
  const [fromBreakPointValue] = useToken("breakpoints", [from]);
  const [tillBreakPointValue] = useToken("breakpoints", [till]);
  if (!from && !till && !only && !colorMode && !platform) {
    return null;
  } else if (from && till && currentBreakpointValue >= fromBreakPointValue && currentBreakpointValue < tillBreakPointValue) {
    return null;
  } else if (from && !till && currentBreakpointValue >= fromBreakPointValue) {
    return null;
  } else if (till && !from && currentBreakpointValue < tillBreakPointValue) {
    return null;
  } else if (Array.isArray(only) && only.includes(breakpointValue) || only === breakpointValue) {
    return null;
  } else if (Array.isArray(platform) && platform.includes(Platform28.OS) || platform === Platform28.OS) {
    return null;
  } else if (colorMode === currentColorMode.colorMode) {
    return null;
  }
  return children;
}
var Hidden_default = memo50(Hidden);

// node_modules/native-base/src/components/primitives/ZStack/index.tsx
import React100, { memo as memo51, forwardRef as forwardRef54 } from "react";
var ZStack = ({ children, reversed, ...props }, ref) => {
  const resolvedProps = usePropsResolution("ZStack", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React100.createElement(Box_default, {
    ...resolvedProps,
    ref
  }, getAbsoluteChildren_default(children, reversed));
};
var ZStack_default = memo51(forwardRef54(ZStack));

// node_modules/native-base/src/components/composites/Alert/Context.ts
import { createContext as createContext4 } from "react";
var AlertContext = createContext4({});

// node_modules/native-base/src/components/composites/Alert/AlertIcon.tsx
var AlertIcon2 = ({ children, ...props }, ref) => {
  let newProps = usePropsResolution("AlertIcon", props);
  newProps = omitUndefined(newProps);
  const { status, _icon } = React101.useContext(AlertContext);
  const getIcon = () => {
    switch (status) {
      case "error":
        return /* @__PURE__ */ React101.createElement(WarningTwoIcon, {
          ..._icon,
          ...newProps,
          ref
        });
      case "warning":
        return /* @__PURE__ */ React101.createElement(WarningIcon, {
          ..._icon,
          ...newProps,
          ref
        });
      case "success":
        return /* @__PURE__ */ React101.createElement(CheckCircleIcon, {
          ..._icon,
          ...newProps,
          ref
        });
      default:
        return /* @__PURE__ */ React101.createElement(InfoIcon, {
          ..._icon,
          ...newProps,
          ref
        });
    }
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React101.createElement(Box_default, null, children || getIcon());
};
var AlertIcon_default = memo52(forwardRef55(AlertIcon2));

// node_modules/native-base/src/components/composites/Alert/Alert.tsx
import React102, { memo as memo53, forwardRef as forwardRef56 } from "react";
var Alert2 = ({ children, ...props }, ref) => {
  const {
    status,
    variant,
    _icon,
    colorScheme,
    ...newProps
  } = usePropsResolution("Alert", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React102.createElement(AlertContext.Provider, {
    value: {
      status,
      variant,
      _icon,
      colorScheme
    }
  }, /* @__PURE__ */ React102.createElement(Box_default, {
    ...newProps,
    ref
  }, children));
};
var Alert_default = memo53(forwardRef56(Alert2));

// node_modules/native-base/src/components/composites/Alert/index.tsx
var AlertTemp = Alert_default;
AlertTemp.Icon = AlertIcon_default;
var Alert3 = AlertTemp;

// node_modules/native-base/src/components/composites/Avatar/Avatar.tsx
import React103, { memo as memo54, forwardRef as forwardRef57 } from "react";
var Avatar = ({ children, ...props }, ref) => {
  const [error, setError] = React103.useState(false);
  const { _text, source, style, ...resolvedProps } = usePropsResolution("Avatar", props);
  let Badge2 = /* @__PURE__ */ React103.createElement(React103.Fragment, null);
  const remainingChildren = [];
  React103.Children.map(children, (child, key) => {
    if (typeof child?.type === "object" && child?.type.displayName === "AvatarBadge") {
      Badge2 = child;
    } else {
      remainingChildren.push(typeof child === "string" || typeof child === "number" ? /* @__PURE__ */ React103.createElement(Text_default, {
        key: "avatar-children-" + key,
        ..._text
      }, child) : child);
    }
  });
  const imageFitStyle = { height: "100%", width: "100%" };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React103.createElement(Box_default, {
    ...resolvedProps
  }, source && !error ? /* @__PURE__ */ React103.createElement(Image_default, {
    borderRadius: resolvedProps.borderRadius,
    source,
    alt: "--",
    _alt: _text,
    style: [style, imageFitStyle],
    onError: () => {
      setError(true);
    },
    ref
  }) : remainingChildren.length !== 0 && remainingChildren, Badge2);
};
var Avatar_default = memo54(forwardRef57(Avatar));

// node_modules/native-base/src/components/composites/Avatar/Badge.tsx
import React104, { memo as memo55, forwardRef as forwardRef58 } from "react";
var AvatarBadge = memo55(forwardRef58((props, ref) => {
  const { boxSize, ...newProps } = usePropsResolution("AvatarBadge", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React104.createElement(Box_default, {
    position: "absolute",
    right: 0,
    bottom: 0,
    ...newProps,
    width: boxSize || 3,
    height: boxSize || 3,
    ref
  });
}));
AvatarBadge.displayName = "AvatarBadge";
var Badge_default2 = AvatarBadge;

// node_modules/native-base/src/components/composites/Avatar/Group.tsx
import React105, { memo as memo56, forwardRef as forwardRef59 } from "react";
import isNil6 from "lodash.isnil";
var getAvatarGroupChildren = (children, space2, max, plusAvatarBg, props) => {
  let childrenArray = React105.Children.toArray(children);
  let plusAvatars = 0;
  if (!isNil6(max) && max < childrenArray.length && max > 0) {
    plusAvatars = childrenArray.length - max;
    childrenArray = childrenArray.slice(0, max);
  }
  const trailingChildren = childrenArray.slice(1);
  const defaultProps40 = {
    ml: space2
  };
  return [
    plusAvatars > 0 ? /* @__PURE__ */ React105.createElement(Avatar_default, {
      bg: plusAvatarBg,
      ...defaultProps40,
      ...props
    }, "+ " + plusAvatars) : null,
    React105.Children.map(trailingChildren.reverse(), (child, index) => {
      return React105.cloneElement(child, {
        key: `avatar-group-child-${index}`,
        ...props,
        ...defaultProps40,
        ...child.props
      }, child.props.children);
    }),
    React105.cloneElement(childrenArray[0], {
      ...props,
      ...childrenArray[0].props
    }, childrenArray[0].props.children)
  ];
};
var AvatarGroup = (allProps, ref) => {
  const { children, ...props } = allProps;
  const { borderColor, borderWidth, bg, space: space2, max } = usePropsResolution("AvatarGroup", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React105.createElement(Flex_default, {
    flexDirection: "row-reverse",
    ref
  }, getAvatarGroupChildren(children, space2, max, bg, {
    borderColor,
    borderWidth,
    ...props
  }));
};
var Group_default = memo56(forwardRef59(AvatarGroup));

// node_modules/native-base/src/components/composites/Avatar/index.tsx
var AvatarTemp = Avatar_default;
AvatarTemp.Badge = Badge_default2;
AvatarTemp.Group = Group_default;
var Avatar2 = AvatarTemp;

// node_modules/native-base/src/components/composites/Breadcrumb/Breadcrumb.tsx
import React106, { memo as memo57, forwardRef as forwardRef60 } from "react";
import { Platform as Platform29 } from "react-native";
import { Pressable as Pressable3 } from "native-base";
var Breadcrumb2 = ({
  style,
  children,
  separator,
  _text,
  maxItems,
  _button,
  isCollapsed,
  onCollapseChange,
  ...props
}, ref) => {
  const textProps = { ..._text };
  const [collapsed, setCollapsed] = useControllableState({
    value: isCollapsed,
    defaultValue: false,
    onChange: (value) => {
      onCollapseChange && onCollapseChange(value);
    }
  });
  const { spacing: spacing2, ...newProps } = usePropsResolution("Breadcrumb", props);
  const separatorProps = {
    accessibilityRole: Platform29.OS === "web" ? "presentation" : void 0
  };
  const separatorElement = separator ? typeof separator === "string" ? /* @__PURE__ */ React106.createElement(Text_default, {
    ...separatorProps,
    mx: spacing2
  }, separator) : React106.cloneElement(separator, {
    mx: spacing2,
    ...separatorProps
  }) : /* @__PURE__ */ React106.createElement(Text_default, {
    mx: spacing2,
    ...separatorProps
  }, "/");
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React106.createElement(HStack_default, {
    display: "flex",
    flexWrap: "wrap",
    ...newProps,
    ref,
    style,
    divider: separatorElement,
    space: spacing2,
    accessibilityRole: Platform29.OS === "web" ? "navigation" : void 0,
    accessibilityLabel: "Breadcrumb"
  }, children && !children.length ? children : getBreadcrumbSeparator(children, textProps, maxItems, _button, collapsed, setCollapsed));
};
var getBreadcrumbSeparator = (children, props, maxItems, _button, collapsed, setCollapsed) => {
  if (Array.isArray(children)) {
    if (children.length === 1) {
      return children;
    }
    let result = [];
    if (maxItems) {
      let buttonAdded = false;
      if (typeof maxItems == "number") {
        if (children.length > 2 * maxItems) {
          for (let i = 0; i < children.length; i++) {
            if (i < maxItems || i >= children.length - maxItems) {
              result.push(children[i]);
            } else {
              if (!buttonAdded) {
                result.push(/* @__PURE__ */ React106.createElement(CollapseButton, {
                  ..._button,
                  setCollapsed
                }));
                buttonAdded = true;
              }
            }
          }
          buttonAdded = false;
        }
      } else if (typeof maxItems == "object") {
        if (children.length > maxItems[0] + maxItems[1])
          for (let i = 0; i < children.length; i++) {
            if (i < maxItems[0] || i >= children.length - maxItems[1]) {
              result.push(children[i]);
            } else {
              if (!buttonAdded) {
                result.push(/* @__PURE__ */ React106.createElement(CollapseButton, {
                  ..._button,
                  setCollapsed
                }));
                buttonAdded = true;
              }
            }
          }
        buttonAdded = false;
      }
    } else {
      result = children;
    }
    if (!collapsed) {
      result = children;
    }
    return result.map((child, index) => {
      return React106.cloneElement(child, {
        _text: { ...props },
        ...props,
        key: `breadcrumb-separator-${index}`
      });
    });
  } else {
    return children;
  }
};
var CollapseButton = (props) => {
  const { ...remainingProps } = props;
  return /* @__PURE__ */ React106.createElement(Pressable3, {
    ...remainingProps,
    onPress: () => {
      props.setCollapsed(false);
    }
  }, /* @__PURE__ */ React106.createElement(ThreeDotsIcon, {
    size: 4
  }));
};
var Breadcrumb_default = memo57(forwardRef60(Breadcrumb2));

// node_modules/native-base/src/components/composites/Breadcrumb/BreadcrumbLink.tsx
var BreadcrumbLink_default = Link_default;

// node_modules/native-base/src/components/composites/Breadcrumb/BreadcrumbItem.tsx
import React107, { forwardRef as forwardRef61, memo as memo58 } from "react";
import { Platform as Platform30 } from "react-native";

// node_modules/native-base/src/components/composites/Breadcrumb/Context.ts
import { createContext as createContext5 } from "react";
var BreadcrumbItemContext = createContext5({});

// node_modules/native-base/src/components/composites/Breadcrumb/BreadcrumbItem.tsx
var BreadcrumbItem = (props, ref) => {
  const { children, isCurrent, _text, ...remainingProps } = props;
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React107.createElement(BreadcrumbItemContext.Provider, {
    value: { isCurrent }
  }, /* @__PURE__ */ React107.createElement(HStack_default, {
    ...remainingProps,
    ref
  }, React107.Children.map(children, (child, index) => React107.cloneElement(child, {
    "key": `breadcrumb-item-${index}`,
    "_text": {
      ..._text,
      fontWeight: 700
    },
    ...{
      isUnderlined: false
    },
    ...remainingProps,
    "aria-current": Platform30.OS === "web" && isCurrent ? "page" : void 0
  }))));
};
var BreadcrumbItem_default = memo58(forwardRef61(BreadcrumbItem));

// node_modules/native-base/src/components/composites/Breadcrumb/BreadcrumbText.tsx
import React108, { forwardRef as forwardRef62, memo as memo59 } from "react";
var BreadcrumbText2 = (props, ref) => {
  const { isCurrent } = React108.useContext(BreadcrumbItemContext);
  let { children, _current, ...resolvedProps } = usePropsResolution("BreadcrumbText", props);
  return /* @__PURE__ */ React108.createElement(Text_default, {
    ref,
    ...isCurrent && _current,
    ...resolvedProps
  }, children);
};
var BreadcrumbText_default = memo59(forwardRef62(BreadcrumbText2));

// node_modules/native-base/src/components/composites/Breadcrumb/BreadcrumbIcon.tsx
import React109, { forwardRef as forwardRef63, memo as memo60 } from "react";
var BreadcrumbIcon2 = (props, ref) => {
  const { isCurrent } = React109.useContext(BreadcrumbItemContext);
  let { children, _current, ...resolvedProps } = usePropsResolution("BreadcrumbIcon", props);
  return /* @__PURE__ */ React109.createElement(Icon_default, {
    ref,
    ...isCurrent && _current,
    ...resolvedProps
  }, children);
};
var BreadcrumbIcon_default = memo60(forwardRef63(BreadcrumbIcon2));

// node_modules/native-base/src/components/composites/Breadcrumb/index.tsx
var BreadcrumbTemp = Breadcrumb_default;
BreadcrumbTemp.Item = BreadcrumbItem_default;
BreadcrumbTemp.Link = BreadcrumbLink_default;
BreadcrumbTemp.Text = BreadcrumbText_default;
BreadcrumbTemp.Icon = BreadcrumbIcon_default;
var Breadcrumb3 = BreadcrumbTemp;

// node_modules/native-base/src/components/composites/Container/index.tsx
import React110 from "react";
var Container = ({ children, centerContent, ...props }, ref) => {
  const resolvedProps = usePropsResolution("Container", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React110.createElement(Box_default, {
    ref,
    alignItems: centerContent ? "center" : "flex-start",
    _text: { textAlign: centerContent ? "center" : "left" },
    ...resolvedProps
  }, children);
};
var Container_default = React110.memo(React110.forwardRef(Container));

// node_modules/native-base/src/components/composites/Drawer/index.tsx
import { OverlayContainer as OverlayContainer2 } from "@react-native-aria/overlays";
import React111 from "react";
var Drawer = ({
  children,
  isOpen,
  onClose,
  placement = "right"
}) => {
  let placementStyles = React111.useMemo(() => {
    let styles = {
      position: "absolute"
    };
    if (placement === "top") {
      styles.top = 0;
      styles.left = 0;
      styles.right = 0;
      styles.width = "100%";
    } else if (placement === "bottom") {
      styles.bottom = 0;
      styles.left = 0;
      styles.right = 0;
      styles.width = "100%";
    } else if (placement === "right") {
      styles.right = 0;
      styles.top = 0;
      styles.bottom = 0;
      styles.height = "100%";
    } else {
      styles.top = 0;
      styles.bottom = 0;
      styles.left = 0;
      styles.height = "100%";
    }
    return styles;
  }, [placement]);
  if (!isOpen)
    return null;
  return /* @__PURE__ */ React111.createElement(OverlayContainer2, null, /* @__PURE__ */ React111.createElement(Backdrop_default, {
    onPress: onClose ? onClose : () => {
    }
  }), /* @__PURE__ */ React111.createElement(Box_default, {
    ...placementStyles,
    opacity: 1
  }, children));
};
var Drawer_default = Drawer;

// node_modules/native-base/src/components/composites/Toast/Toast.tsx
import { OverlayContainer as OverlayContainer3 } from "@react-native-aria/overlays";
import React112, { createContext as createContext6, useState as useState5 } from "react";
import {
  AccessibilityInfo as AccessibilityInfo2,
  Easing,
  Platform as Platform31,
  SafeAreaView
} from "react-native";
var INSET = 50;
var POSITIONS = {
  "top": {
    top: INSET,
    left: 0,
    right: 0
  },
  "top-right": {
    top: INSET,
    right: 0
  },
  "top-left": {
    top: INSET,
    left: 0
  },
  "bottom": {
    bottom: INSET,
    left: 0,
    right: 0
  },
  "bottom-left": {
    bottom: INSET,
    left: 0
  },
  "bottom-right": {
    bottom: INSET,
    right: 0
  }
};
var initialAnimationOffset = 24;
var transitionConfig = {
  "bottom": initialAnimationOffset,
  "top": -initialAnimationOffset,
  "top-right": -initialAnimationOffset,
  "top-left": -initialAnimationOffset,
  "bottom-left": initialAnimationOffset,
  "bottom-right": initialAnimationOffset
};
var ToastContext = createContext6({
  toastInfo: {},
  setToastInfo: () => {
  },
  setToast: () => {
  },
  removeToast: () => {
  },
  hideAll: () => {
  },
  isActive: () => false,
  visibleToasts: {},
  setVisibleToasts: () => {
  },
  hideToast: () => {
  }
});
var CustomToast = () => {
  const { toastInfo, visibleToasts, removeToast } = React112.useContext(ToastContext);
  const getPositions = () => {
    return Object.keys(toastInfo);
  };
  return getPositions().length > 0 ? /* @__PURE__ */ React112.createElement(OverlayContainer3, null, getPositions().map((position2) => {
    if (Object.keys(POSITIONS).includes(position2))
      return /* @__PURE__ */ React112.createElement(VStack_default, {
        margin: "auto",
        key: position2,
        ...POSITIONS[position2],
        position: "absolute",
        space: 2,
        alignItems: "center",
        justifyContent: "center"
      }, toastInfo[position2].map((toast) => /* @__PURE__ */ React112.createElement(PresenceTransition_default, {
        key: toast.id,
        visible: visibleToasts[toast.id],
        onTransitionComplete: (status) => {
          if (status === "exited") {
            removeToast(toast.id);
            toast.config?.onCloseComplete && toast.config?.onCloseComplete();
          }
        },
        initial: {
          opacity: 0,
          translateY: transitionConfig[position2]
        },
        animate: {
          opacity: 1,
          transition: { easing: Easing.ease, duration: 250 }
        },
        exit: {
          opacity: 0,
          scale: 0.85,
          transition: { easing: Easing.ease, duration: 100 }
        }
      }, /* @__PURE__ */ React112.createElement(SafeAreaView, null, toast.component))));
    else
      return null;
  })) : null;
};
var ToastProvider = ({ children }) => {
  const [toastInfo, setToastInfo] = useState5({});
  const [visibleToasts, setVisibleToasts] = useState5({});
  const themeProps = usePropsResolution("Toast", {});
  const { colorMode } = useColorMode();
  let toastIndex = React112.useRef(1);
  const hideAll = () => {
    setVisibleToasts({});
  };
  const hideToast = (id) => {
    setVisibleToasts((prevVisibleToasts) => ({
      ...prevVisibleToasts,
      [id]: false
    }));
  };
  const isActive = (id) => {
    for (let toastPosition of Object.keys(toastInfo)) {
      let positionArray = toastInfo[toastPosition];
      return positionArray.findIndex((toastData) => toastData.id === id) > -1;
    }
    return false;
  };
  const removeToast = (id) => {
    setToastInfo((prev) => {
      for (let toastPosition of Object.keys(prev)) {
        let positionArray = prev[toastPosition];
        const isToastPresent = positionArray.findIndex((toastData) => toastData.id === id) > -1;
        if (isToastPresent) {
          let newPositionArray = positionArray.filter((item) => item.id !== id);
          let temp = {};
          temp[toastPosition] = newPositionArray;
          let newToastInfo = { ...prev, ...temp };
          return newToastInfo;
        }
      }
      return prev;
    });
  };
  const getTextColor = (variant) => {
    switch (variant) {
      case "left-accent":
      case "top-accent":
      case "subtle":
        return "coolGray.800";
      case "solid":
        return "warmGray.50";
      case "outline":
      case "outline-light":
        return colorMode === "light" ? "coolGray.800" : "warmGray.50";
      default:
        return "black";
    }
  };
  const setToast = (props) => {
    const {
      placement = "bottom",
      title,
      render,
      status,
      id = toastIndex.current++,
      description,
      isClosable = true,
      duration = 5e3,
      variant,
      accessibilityAnnouncement,
      accessibilityLiveRegion = "polite",
      ...rest
    } = props;
    let positionToastArray = toastInfo[placement];
    if (!positionToastArray)
      positionToastArray = [];
    let component = null;
    if (render) {
      component = render({ id });
    } else if (!status && !variant) {
      component = /* @__PURE__ */ React112.createElement(VStack_default, {
        space: title && description ? 1 : 0,
        ...themeProps,
        ...rest
      }, /* @__PURE__ */ React112.createElement(Box_default, {
        _text: themeProps._title
      }, title), description && /* @__PURE__ */ React112.createElement(Box_default, {
        _text: themeProps._description
      }, description));
    } else if (status || variant) {
      component = /* @__PURE__ */ React112.createElement(Alert3, {
        maxWidth: "100%",
        alignSelf: "center",
        status: status ?? "info",
        variant,
        accessibilityLiveRegion
      }, /* @__PURE__ */ React112.createElement(VStack_default, {
        space: 1,
        flexShrink: 1,
        w: "100%"
      }, /* @__PURE__ */ React112.createElement(HStack_default, {
        flexShrink: 1,
        space: 2,
        alignItems: "center",
        justifyContent: "space-between"
      }, /* @__PURE__ */ React112.createElement(HStack_default, {
        space: 2,
        flexShrink: 1,
        alignItems: "center"
      }, /* @__PURE__ */ React112.createElement(Alert3.Icon, null), /* @__PURE__ */ React112.createElement(Text_default, {
        fontSize: "md",
        fontWeight: "medium",
        color: getTextColor(variant ?? "subtle")
      }, title)), isClosable ? /* @__PURE__ */ React112.createElement(IconButton_default, {
        variant: "unstyled",
        icon: /* @__PURE__ */ React112.createElement(CloseIcon, {
          size: "3",
          color: getTextColor(variant ?? "subtle")
        }),
        onPress: () => hideToast(id)
      }) : null), /* @__PURE__ */ React112.createElement(Box_default, {
        px: "6",
        _text: {
          color: getTextColor(variant ?? "subtle")
        }
      }, description)));
    }
    toastInfo[placement] = [
      ...positionToastArray,
      { component, id, config: props }
    ];
    setToastInfo({ ...toastInfo });
    setVisibleToasts({ ...visibleToasts, [id]: true });
    if (duration !== null) {
      setTimeout(function() {
        hideToast(id);
      }, duration);
    }
    if (accessibilityAnnouncement && Platform31.OS === "ios") {
      AccessibilityInfo2.announceForAccessibility(accessibilityAnnouncement);
    }
    return id;
  };
  return /* @__PURE__ */ React112.createElement(ToastContext.Provider, {
    value: {
      toastInfo,
      setToastInfo,
      setToast,
      removeToast,
      hideAll,
      isActive,
      visibleToasts,
      setVisibleToasts,
      hideToast
    }
  }, children, /* @__PURE__ */ React112.createElement(CustomToast, null));
};
var useToast = () => {
  const { setToast, hideAll, isActive, hideToast } = React112.useContext(ToastContext);
  const toast = {
    show: setToast,
    close: hideToast,
    closeAll: hideAll,
    isActive
  };
  return toast;
};
var ToastRef = React112.createRef();
var Toast2 = {
  show: (props) => ToastRef.current?.show(props),
  close: (id) => ToastRef.current?.close(id),
  closeAll: () => ToastRef.current?.closeAll(),
  isActive: (id) => ToastRef.current?.isActive(id)
};

// node_modules/native-base/src/components/composites/Divider/index.tsx
import React113, { memo as memo61, forwardRef as forwardRef64 } from "react";
import { Platform as Platform32 } from "react-native";
var Divider = (props, ref) => {
  const { orientation, ...resolvedProps } = usePropsResolution("Divider", props, {}, { resolveResponsively: ["thickness"] });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React113.createElement(Box_default, {
    ...resolvedProps,
    ref,
    "aria-orientation": orientation,
    accessibilityRole: Platform32.OS === "web" ? "separator" : void 0
  });
};
var Divider_default = memo61(forwardRef64(Divider));

// node_modules/native-base/src/components/composites/Progress/index.tsx
import React114, { memo as memo62, forwardRef as forwardRef65 } from "react";
var Progress = (props, ref) => {
  const {
    min,
    max,
    value,
    _filledTrack,
    children,
    ...resolvedProps
  } = usePropsResolution("Progress", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React114.createElement(Box_default, {
    ...resolvedProps,
    ref,
    accessible: true,
    accessibilityRole: "progressbar",
    accessibilityValue: {
      min,
      max,
      now: value < max && value > min ? (value - min) / (max - min) * 100 : value > min ? 100 : 0
    }
  }, /* @__PURE__ */ React114.createElement(Box_default, {
    ..._filledTrack,
    w: value < max && value > min ? (value - min) / (max - min) * 100 + "%" : value > min ? "100%" : "0%"
  }, children));
};
var Progress_default = memo62(forwardRef65(Progress));

// node_modules/native-base/src/components/composites/Skeleton/Skeleton.tsx
import React115, { memo as memo63, forwardRef as forwardRef66 } from "react";
import { Animated as Animated4, Platform as Platform33, View as View3 } from "react-native";
var Skeleton2 = (props, ref) => {
  const isDomUsable = canUseDom();
  const {
    children,
    startColor,
    style,
    endColor,
    ...resolvedProps
  } = usePropsResolution("Skeleton", props);
  const blinkAnim = React115.useRef(new Animated4.Value(0)).current;
  const tokenisedRadius = useToken("radii", resolvedProps.borderRadius);
  const tokenisedStartColor = useToken("colors", startColor);
  React115.useEffect(() => {
    if (isDomUsable) {
      const blink = Animated4.sequence([
        Animated4.timing(blinkAnim, {
          toValue: 1,
          duration: resolvedProps.fadeDuration * 1e4 * (1 / resolvedProps.speed),
          useNativeDriver: Platform33.OS !== "web"
        }),
        Animated4.timing(blinkAnim, {
          toValue: 0,
          duration: resolvedProps.fadeDuration * 1e4 * (1 / resolvedProps.speed),
          useNativeDriver: Platform33.OS !== "web"
        })
      ]);
      Animated4.loop(blink).start();
    }
  }, [blinkAnim, isDomUsable, resolvedProps]);
  const skeletonStyle = {
    skeleton: {
      position: "absolute",
      top: 0,
      bottom: 0,
      height: "100%",
      width: "100%",
      borderRadius: tokenisedRadius,
      backgroundColor: tokenisedStartColor,
      opacity: blinkAnim
    }
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return resolvedProps.isLoaded ? children : /* @__PURE__ */ React115.createElement(Box_default, {
    style: [style],
    borderRadius: tokenisedRadius,
    bg: endColor,
    ...resolvedProps,
    ref
  }, /* @__PURE__ */ React115.createElement(Animated4.View, {
    style: skeletonStyle.skeleton
  }), children ? /* @__PURE__ */ React115.createElement(View3, {
    style: { opacity: 0 }
  }, children) : null);
};
var Skeleton_default = memo63(forwardRef66(Skeleton2));

// node_modules/native-base/src/components/composites/Skeleton/SkeletonCircle.tsx
import React116, { memo as memo64, forwardRef as forwardRef67 } from "react";
var SkeletonCircle2 = ({ children, ...props }, ref) => {
  const resolvedProps = usePropsResolution("SkeletonCircle", props);
  return resolvedProps.isLoaded ? children : /* @__PURE__ */ React116.createElement(Skeleton_default, {
    ...resolvedProps,
    ref
  });
};
var SkeletonCircle_default = memo64(forwardRef67(SkeletonCircle2));

// node_modules/native-base/src/components/composites/Skeleton/SkeletonText.tsx
import React117, { memo as memo65, forwardRef as forwardRef68 } from "react";
var SkeletonText2 = ({ children, ...props }, ref) => {
  const {
    space: space2,
    lineHeight,
    startColor,
    endColor,
    _stack,
    ...resolvedProps
  } = usePropsResolution("SkeletonText", props);
  const computedChildren = [];
  for (let i = 0; i < resolvedProps.noOfLines; i++) {
    if (i === resolvedProps.noOfLines - 1 && resolvedProps.noOfLines !== 1) {
      computedChildren.push(/* @__PURE__ */ React117.createElement(Skeleton_default, {
        borderRadius: resolvedProps.borderRadius ? resolvedProps.borderRadius : 3,
        endColor,
        startColor,
        h: lineHeight,
        w: "75%"
      }));
    } else
      computedChildren.push(/* @__PURE__ */ React117.createElement(Skeleton_default, {
        borderRadius: resolvedProps.borderRadius ? resolvedProps.borderRadius : 3,
        endColor,
        startColor,
        h: lineHeight
      }));
  }
  return resolvedProps.isLoaded ? children : /* @__PURE__ */ React117.createElement(Box_default, {
    borderRadius: resolvedProps.borderRadius ? resolvedProps.borderRadius : 3,
    bg: "transparent",
    ...resolvedProps,
    ref
  }, /* @__PURE__ */ React117.createElement(VStack_default, {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    justifyContent: space2 === void 0 ? "space-between" : "flex-start",
    space: space2,
    ..._stack,
    overflow: "hidden"
  }, computedChildren), children ? /* @__PURE__ */ React117.createElement(Box_default, {
    opacity: 0
  }, children) : null);
};
var SkeletonText_default = memo65(forwardRef68(SkeletonText2));

// node_modules/native-base/src/components/composites/Skeleton/index.tsx
var SkeletonTemp = Skeleton_default;
SkeletonTemp.Circle = SkeletonCircle_default;
SkeletonTemp.Text = SkeletonText_default;
var Skeleton3 = SkeletonTemp;

// node_modules/native-base/src/components/composites/Accordion/Accordion.tsx
import React119 from "react";

// node_modules/native-base/src/utils/getIndexedChildren.ts
import React118 from "react";
var getIndexedChildren_default = (children, startingIndex) => {
  let counter = startingIndex ? startingIndex - 1 : -1;
  const indexedChildren = React118.Children.map(children, (child) => {
    counter++;
    return React118.cloneElement(child, {
      index: counter
    }, child.props.children);
  });
  return indexedChildren;
};

// node_modules/native-base/src/components/composites/Accordion/Context.ts
import { createContext as createContext7 } from "react";
var AccordionContext = createContext7({});
var AccordionItemContext = createContext7({});

// node_modules/native-base/src/components/composites/Accordion/Accordion.tsx
var Accordion2 = ({
  children,
  index: pIndex,
  defaultIndex,
  allowMultiple,
  allowToggle,
  onChange,
  ...props
}, ref) => {
  const {
    endingHeight,
    startingHeight,
    duration,
    isOpen,
    onAnimationEnd,
    onAnimationStart,
    ...newProps
  } = useThemeProps("Accordion", props);
  const [index, setIndex] = React119.useState(pIndex || defaultIndex || []);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  const changeHandler = (isOpening, activeIndex) => {
    let indexCopy = index.map((i) => i);
    if (allowToggle) {
      if (isOpening) {
        indexCopy.push(activeIndex);
        allowMultiple ? setIndex(indexCopy) : setIndex([activeIndex]);
      } else {
        setIndex(index.splice(index.indexOf(activeIndex), 1));
      }
    } else {
      if (isOpening) {
        indexCopy.push(activeIndex);
        allowMultiple ? setIndex(indexCopy) : setIndex([activeIndex]);
      } else {
        indexCopy = indexCopy.filter((n) => n !== activeIndex);
        setIndex(indexCopy);
      }
    }
    onChange && onChange(indexCopy);
  };
  return /* @__PURE__ */ React119.createElement(AccordionContext.Provider, {
    value: {
      index,
      changeHandler,
      AnimationProps: {
        endingHeight,
        startingHeight,
        duration,
        isOpen,
        onAnimationEnd,
        onAnimationStart
      }
    }
  }, /* @__PURE__ */ React119.createElement(Box_default, {
    overflow: "hidden",
    ...newProps,
    ref
  }, getIndexedChildren_default(children)));
};
var Accordion_default = React119.memo(React119.forwardRef(Accordion2));

// node_modules/native-base/src/components/composites/Accordion/AccordionItem.tsx
import React120 from "react";
var AccordionItem2 = ({ children, index: pIndex = 0, isDisabled, ...props }, ref) => {
  const {
    index: cIndex,
    changeHandler
  } = React120.useContext(AccordionContext);
  const { ...newProps } = useThemeProps("AccordionItem", props);
  const isOpen = cIndex?.includes(pIndex);
  const onClose = (cb) => {
    changeHandler && changeHandler(false, pIndex);
    cb && cb();
  };
  const onOpen = (cb) => {
    changeHandler && changeHandler(true, pIndex);
    cb && cb();
  };
  const childSetter = () => {
    if (typeof children === "function")
      return children({ isExpanded: isOpen, isDisabled });
    return children;
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React120.createElement(AccordionItemContext.Provider, {
    value: {
      index: pIndex,
      isOpen,
      isDisabled,
      onClose,
      onOpen
    }
  }, /* @__PURE__ */ React120.createElement(Box_default, {
    ...newProps,
    ref
  }, childSetter()));
};
var AccordionItem_default = React120.memo(React120.forwardRef(AccordionItem2));

// node_modules/native-base/src/components/composites/Accordion/AccordionSummary.tsx
import React121 from "react";
import { TouchableOpacity, Platform as Platform34 } from "react-native";
import { useHover as useHover8 } from "@react-native-aria/interactions";
var AccordionSummary2 = ({ children, ...props }, ref) => {
  const {
    index,
    isOpen,
    isDisabled,
    onOpen,
    onClose
  } = React121.useContext(AccordionItemContext);
  const { _hover, _expanded, _disabled, ...themedProps } = useThemeProps("AccordionSummary", props);
  const pressHandler = () => {
    isOpen ? onClose && onClose() : onOpen && onOpen();
  };
  const _ref = React121.useRef(null);
  const { isHovered } = useHover8({}, _ref);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React121.createElement(TouchableOpacity, {
    activeOpacity: 0.2,
    disabled: isDisabled,
    onPress: pressHandler,
    accessible: true,
    accessibilityRole: "checkbox",
    ref: mergeRefs([ref, _ref])
  }, /* @__PURE__ */ React121.createElement(Box_default, {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...themedProps,
    ...isHovered && _hover,
    ...isOpen && _expanded,
    ...isDisabled && _disabled,
    ...!index && { borderTopColor: "transparent" },
    ...Platform34.OS === "web" ? {
      disabled: isDisabled,
      cursor: isDisabled ? "not-allowed" : "auto"
    } : {}
  }, children));
};
var AccordionSummary_default = React121.memo(React121.forwardRef(AccordionSummary2));

// node_modules/native-base/src/components/composites/Accordion/AccordionDetails.tsx
import React123 from "react";

// node_modules/native-base/src/components/composites/Collapse/index.tsx
import isNil7 from "lodash.isnil";
import React122, { useEffect as useEffect5, useRef as useRef4, forwardRef as forwardRef69 } from "react";
import { LayoutAnimation, UIManager, Platform as Platform35 } from "react-native";
function usePrevious(value) {
  const ref = useRef4();
  function updatePrevious(newVal) {
    ref.current = newVal;
  }
  useEffect5(() => {
    updatePrevious(value);
  }, [value]);
  return { value: ref.current, updatePrevious };
}
var Collapse = ({
  endingHeight,
  startingHeight,
  duration,
  isOpen,
  onAnimationEnd,
  onAnimationStart,
  ...props
}, ref) => {
  if (Platform35.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const CustomLayoutLinear = {
    duration: duration ? duration : 400,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut
    }
  };
  const defaultStartHeight = isOpen ? endingHeight : startingHeight ? startingHeight : 1;
  let animatedStyle = { height: defaultStartHeight };
  const animateView = () => {
    if (onAnimationStart) {
      onAnimationStart();
    }
    animatedStyle = {
      height: isOpen ? endingHeight : defaultStartHeight
    };
    let callback = onAnimationEnd ? onAnimationEnd : () => {
    };
    LayoutAnimation.configureNext(CustomLayoutLinear, callback());
  };
  let wasOpen = usePrevious(isOpen);
  if (!isNil7(wasOpen.value) && wasOpen.value !== isOpen) {
    animateView();
    wasOpen.updatePrevious(isOpen);
  }
  const [size, setSize] = React122.useState(startingHeight ?? 0);
  const provideSize = (layoutSize) => {
    setSize(layoutSize.height);
  };
  const _web = {
    transition: `height ${duration ?? "400"}ms`,
    height: isOpen ? endingHeight || size : startingHeight || 0
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React122.createElement(Box_default, {
    style: { ...animatedStyle, ...Platform35.OS === "web" && _web },
    overflow: "hidden",
    ref
  }, /* @__PURE__ */ React122.createElement(Box_default, {
    overflow: Platform35.OS === "web" ? "auto" : "scroll",
    onLayout: (e) => provideSize(e.nativeEvent.layout),
    ...props
  }));
};
var Collapse_default = React122.memo(forwardRef69(Collapse));

// node_modules/native-base/src/components/composites/Accordion/AccordionDetails.tsx
var AccordionDetails2 = ({ children, ...props }, ref) => {
  const { ...newProps } = useThemeProps("AccordionDetails", props);
  const { isOpen } = React123.useContext(AccordionItemContext);
  const { AnimationProps } = React123.useContext(AccordionContext);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React123.createElement(Collapse_default, {
    ...AnimationProps,
    ...newProps,
    isOpen,
    ref
  }, children);
};
var AccordionDetails_default = React123.memo(React123.forwardRef(AccordionDetails2));

// node_modules/native-base/src/components/composites/Accordion/AccordionIcon.tsx
import React124 from "react";
var AccordionIcon2 = ({ ...props }, ref) => {
  const { isOpen } = React124.useContext(AccordionItemContext);
  const { ...newProps } = useThemeProps("AccordionIcon", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return isOpen ? /* @__PURE__ */ React124.createElement(ChevronUpIcon, {
    color: "white",
    ...newProps,
    ref
  }) : /* @__PURE__ */ React124.createElement(ChevronDownIcon, {
    ...newProps,
    ref
  });
};
var AccordionIcon_default = React124.memo(React124.forwardRef(AccordionIcon2));

// node_modules/native-base/src/components/composites/Accordion/index.tsx
var AccordionTemp = Accordion_default;
AccordionTemp.Item = AccordionItem_default;
AccordionTemp.Summary = AccordionSummary_default;
AccordionTemp.Details = AccordionDetails_default;
AccordionTemp.Icon = AccordionIcon_default;
var Accordion3 = AccordionTemp;

// node_modules/native-base/src/components/composites/NumberInput/Context.ts
import { createContext as createContext8 } from "react";
var NumberInputContext = createContext8({});

// node_modules/native-base/src/components/composites/NumberInput/NumberDecrementStepper.tsx
import React126 from "react";

// node_modules/native-base/src/components/composites/NumberInput/NumberInputStepper.tsx
import React125 from "react";
import { TouchableOpacity as TouchableOpacity2, Platform as Platform36 } from "react-native";
var NBStepper = React125.forwardRef(({ children, ...props }, ref) => {
  const {
    style,
    isIncrement,
    disablitityCheck,
    _active,
    _disabled,
    isDisabled,
    accessibilityLabel,
    pressHandler,
    iconColor,
    ...newProps
  } = useThemeProps("NumberInputStepper", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React125.createElement(TouchableOpacity2, {
    activeOpacity: 0.2,
    disabled: disablitityCheck || isDisabled,
    onPress: pressHandler,
    accessible: true,
    accessibilityLabel,
    ref
  }, /* @__PURE__ */ React125.createElement(Box_default, {
    ...newProps,
    ..._active,
    ...disablitityCheck || isDisabled ? _disabled : {},
    borderColor: "transparent",
    style,
    opacity: disablitityCheck || isDisabled ? 0.4 : 1,
    ...Platform36.OS === "web" ? {
      disabled: disablitityCheck || isDisabled,
      cursor: disablitityCheck || isDisabled ? "not-allowed" : "auto"
    } : {}
  }, children || isIncrement ? /* @__PURE__ */ React125.createElement(ChevronUpIcon, {
    color: iconColor
  }) : /* @__PURE__ */ React125.createElement(ChevronDownIcon, {
    color: iconColor
  })));
});
var NumberInputStepper2 = ({ children, ...props }, ref) => {
  const {
    numberInputStepper,
    setNumberInputStepper
  } = React125.useContext(NumberInputContext);
  React125.useEffect(() => {
    !numberInputStepper && setNumberInputStepper(/* @__PURE__ */ React125.createElement(VStack_default, {
      ...props,
      ref
    }, children));
  }, [numberInputStepper, setNumberInputStepper, props, children, ref]);
  return null;
};
var NumberInputStepper_default = React125.memo(React125.forwardRef(NumberInputStepper2));

// node_modules/native-base/src/components/composites/NumberInput/NumberDecrementStepper.tsx
var NumberDecrementStepper = ({ children, isDisabled: pIsDisabled, ...props }, ref) => {
  const {
    numberInputValue = 0,
    step = 1,
    min = -Infinity,
    handleChange,
    ...context
  } = React126.useContext(NumberInputContext);
  const isDisabled = pIsDisabled || context.isDisabled;
  const pressHandler = () => {
    handleChange && handleChange(numberInputValue - step);
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React126.createElement(NBStepper, {
    isIncrement: false,
    isDisabled,
    pressHandler,
    disablitityCheck: numberInputValue - step < min,
    ...props,
    ref
  }, children);
};
var NumberDecrementStepper_default = React126.memo(React126.forwardRef(NumberDecrementStepper));

// node_modules/native-base/src/components/composites/NumberInput/NumberIncrementStepper.tsx
import React127 from "react";
var NumberIncrementStepper = ({ children, isDisabled: pIsDisabled, ...props }, ref) => {
  const {
    numberInputValue = 0,
    step = 1,
    max = Infinity,
    handleChange,
    ...context
  } = React127.useContext(NumberInputContext);
  const isDisabled = pIsDisabled || context.isDisabled;
  const pressHandler = () => {
    handleChange && handleChange(numberInputValue + step);
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React127.createElement(NBStepper, {
    isIncrement: true,
    isDisabled,
    pressHandler,
    disablitityCheck: numberInputValue + step > max,
    ...props,
    ref
  }, children);
};
var NumberIncrementStepper_default = React127.memo(React127.forwardRef(NumberIncrementStepper));

// node_modules/native-base/src/components/composites/NumberInput/NumberInput.tsx
import React128 from "react";
var NumberInput = ({ children, ...props }, ref) => {
  const {
    defaultValue,
    keepWithinRange,
    value,
    min,
    max,
    onChange,
    ...newProps
  } = useThemeProps("NumberInput", props);
  const formControlContext = useFormControlContext();
  const [numberInputValue, setNumberInputValue] = React128.useState(parseInt(value || defaultValue, 10));
  const [numberInputStepper, setNumberInputStepper] = React128.useState(null);
  const handleChange = (newValue) => {
    const temp = newValue;
    setNumberInputValue(temp);
    if (keepWithinRange) {
      if (newValue < min)
        setNumberInputValue(min);
      else if (newValue > max)
        setNumberInputValue(max);
    }
    onChange && onChange(temp);
  };
  const handleChangeWithoutCheck = (newValue) => {
    const temp = newValue;
    setNumberInputValue(temp);
  };
  React128.useEffect(() => {
    if (value !== void 0 && value != numberInputValue)
      setNumberInputValue(value);
  }, [value, numberInputValue, setNumberInputValue]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React128.createElement(Box_default, {
    ref
  }, /* @__PURE__ */ React128.createElement(NumberInputContext.Provider, {
    value: {
      ...formControlContext,
      ...newProps,
      min,
      max,
      handleChange,
      handleChangeWithoutCheck,
      numberInputValue,
      numberInputStepper,
      setNumberInputStepper,
      isControlled: value !== void 0
    }
  }, children));
};
var NumberInput_default = React128.memo(React128.forwardRef(NumberInput));

// node_modules/native-base/src/components/composites/NumberInput/NumberInputField.tsx
import React129 from "react";
var NumberInputFiled = ({ isDisabled, ...props }, ref) => {
  const {
    handleChange,
    handleChangeWithoutCheck,
    numberInputStepper,
    numberInputValue,
    isControlled,
    ...context
  } = React129.useContext(NumberInputContext);
  const changeHandler = (inputValue) => {
    let minusIndex = inputValue.indexOf("-");
    if (minusIndex !== -1 && minusIndex !== 0) {
      inputValue = inputValue.replace("-", "");
      inputValue = "-" + inputValue;
    }
    const value = parseInt(inputValue, 10);
    if (isControlled)
      handleChange && handleChange(value);
    else if (value)
      handleChangeWithoutCheck && handleChangeWithoutCheck(value);
    else
      handleChangeWithoutCheck && handleChangeWithoutCheck(0);
  };
  const blurHandler = () => {
    if (numberInputValue)
      handleChange && handleChange(numberInputValue);
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React129.createElement(Input_default, {
    p: 0,
    pl: 2,
    ...context,
    ...props,
    onBlur: () => blurHandler(),
    isDisabled: isDisabled || context.isDisabled,
    onChangeText: (inputValue) => changeHandler(inputValue),
    keyboardType: "numeric",
    value: `${numberInputValue}`,
    InputRightElement: numberInputStepper,
    ref
  });
};
var NumberInputField_default = React129.memo(React129.forwardRef(NumberInputFiled));

// node_modules/native-base/src/components/composites/Tag/index.tsx
import React130 from "react";
var Tag = ({ style, ...props }, ref) => {
  let resolvedProps = useThemeProps("Tag", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React130.createElement(Box_default, {
    style,
    ...resolvedProps,
    ref
  });
};
var Tag_default = React130.memo(React130.forwardRef(Tag));

// node_modules/native-base/src/components/composites/KBD/index.tsx
import React131 from "react";
var Kbd = ({ children, ...props }, ref) => {
  const newProps = useThemeProps("Kbd", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React131.createElement(Box_default, {
    ...newProps,
    ref
  }, children);
};
var KBD_default = React131.memo(React131.forwardRef(Kbd));

// node_modules/native-base/src/components/composites/Code/index.tsx
import React132 from "react";
import { Platform as Platform37 } from "react-native";
var Code = ({ ...props }, ref) => {
  let { ...newProps } = useThemeProps("Code", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React132.createElement(Box_default, {
    _text: {
      fontFamily: Platform37.OS === "ios" ? "Courier" : "monospace"
    },
    ...newProps,
    ref
  });
};
var Code_default = React132.memo(React132.forwardRef(Code));

// node_modules/native-base/src/components/composites/Wrap/index.tsx
import isNil8 from "lodash.isnil";
import React133 from "react";
var Wrap2 = ({ children, ...props }, ref) => {
  const { space: space2, ...newProps } = useThemeProps("Wrap", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React133.createElement(Flex_default, {
    wrap: "wrap",
    ...newProps,
    ref
  }, isNil8(space2) ? children : React133.Children.map(children, (child) => {
    return React133.cloneElement(child, { ...props, style: { margin: space2 } }, child.props.children);
  }));
};
var Wrap_default = React133.memo(React133.forwardRef(Wrap2));

// node_modules/native-base/src/components/composites/PinInput/PinInputField.tsx
import React134 from "react";

// node_modules/native-base/src/components/composites/PinInput/Context.ts
import { createContext as createContext9 } from "react";
var PinInputContext = createContext9({});

// node_modules/native-base/src/components/composites/PinInput/PinInputField.tsx
import { Platform as Platform38 } from "react-native";
var PinInputFiled = ({
  fieldIndex = 0,
  defaultValue: pDefaultValue,
  ...props
}, ref) => {
  let {
    handleChange,
    value: cValue,
    setRefList,
    defaultValue: cDefaultValue,
    handleMultiValueChange,
    ...context
  } = React134.useContext(PinInputContext);
  cDefaultValue = cDefaultValue && cDefaultValue[fieldIndex];
  let defaultValue = pDefaultValue || cDefaultValue;
  let value = cValue && cValue[fieldIndex];
  const keyPressHandler = (event) => {
    if (Platform38.OS !== "web") {
      if (event.nativeEvent.key >= 0 && event.nativeEvent.key <= 9) {
        handleChange && handleChange(event.nativeEvent.key, fieldIndex);
      } else if (event.nativeEvent.key === "Backspace") {
        handleChange && handleChange("", fieldIndex);
      }
    }
  };
  const textChangeHandler = (value2) => {
    handleMultiValueChange && handleMultiValueChange(value2, fieldIndex);
  };
  const myRef = React134.useRef(null);
  React134.useEffect(() => {
    setRefList && setRefList(myRef, fieldIndex);
  }, [myRef, fieldIndex, setRefList]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React134.createElement(Input_default, {
    ref: mergeRefs([myRef, ref]),
    ...context,
    ...props,
    onKeyPress: (event) => keyPressHandler(event),
    onChangeText: (value2) => textChangeHandler(value2),
    keyboardType: "numeric",
    defaultValue,
    value
  });
};
var PinInputField_default = React134.memo(React134.forwardRef(PinInputFiled));

// node_modules/native-base/src/components/composites/PinInput/PinInput.tsx
import React135 from "react";
import { Platform as Platform39 } from "react-native";
var PinInput = ({ children, ...props }, ref) => {
  let [padding, remProps] = tools_exports.extractInObject(props, [
    "p",
    "px",
    "py",
    "pt",
    "pb",
    "pl",
    "pr"
  ]);
  const {
    manageFocus,
    defaultValue,
    value,
    space: space2,
    onChange,
    ...newProps
  } = useThemeProps("PinInput", remProps);
  const formControlContext = useFormControlContext();
  const RefList = [];
  const setRefList = (ref2, index) => {
    RefList[index] = ref2;
  };
  const [pinInputValue, setPinInputValue] = React135.useState(value || defaultValue);
  const handleChange = (newValue, fieldIndex) => {
    let temp = pinInputValue && [...pinInputValue] || [];
    temp[fieldIndex] = newValue;
    value === void 0 && setPinInputValue(temp.join(""));
    onChange && onChange(temp.join(""));
    if (newValue === "" && manageFocus && fieldIndex - 1 > -1)
      RefList[fieldIndex - 1].current.focus();
    else if (newValue && manageFocus && fieldIndex + 1 < RefList.length)
      RefList[fieldIndex + 1].current.focus();
    return temp.join("");
  };
  const handleMultiValueChange = (newValue, fieldIndex) => {
    const pinFieldLength = RefList.length;
    const newValueLength = newValue.length;
    if (newValueLength >= pinFieldLength && newValueLength > 2) {
      let splicedValue = newValue ? [...newValue] : [];
      splicedValue.splice(pinFieldLength);
      RefList[pinFieldLength - 1].current.focus();
      setPinInputValue(splicedValue.join(""));
      onChange && onChange(splicedValue.join(""));
    }
    if (Platform39.OS !== "ios") {
      let temp = pinInputValue ? [...pinInputValue] : [];
      if (newValue === "") {
        temp = temp.filter((_n, i) => i !== fieldIndex);
        if (manageFocus && fieldIndex - 1 > -1)
          RefList[fieldIndex - 1].current.focus();
      } else {
        temp[fieldIndex] = JSON.stringify(parseInt(newValue, 10) % 10);
        if (manageFocus && fieldIndex + 1 < RefList.length)
          RefList[fieldIndex + 1].current.focus();
      }
      value === void 0 && setPinInputValue(temp.join(""));
      onChange && onChange(temp.join(""));
    }
  };
  const indexSetter = (allChildren) => {
    let pinInputFiledCounter = -1;
    return React135.Children.map(allChildren, (child) => {
      pinInputFiledCounter++;
      return React135.cloneElement(child, {
        fieldIndex: pinInputFiledCounter
      }, child.props.children);
    });
  };
  React135.useEffect(() => {
    if (value !== void 0 && value != pinInputValue)
      setPinInputValue(value);
  }, [value, pinInputValue, setPinInputValue]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React135.createElement(PinInputContext.Provider, {
    value: {
      ...formControlContext,
      ...newProps,
      setRefList,
      handleChange,
      handleMultiValueChange,
      value: pinInputValue
    }
  }, children && /* @__PURE__ */ React135.createElement(HStack_default, {
    flexDirection: "row",
    space: space2,
    ...padding,
    ref
  }, indexSetter(children)));
};
var PinInput_default = React135.memo(React135.forwardRef(PinInput));

// node_modules/native-base/src/components/composites/PinInput/index.tsx
var PinInputTemp = PinInput_default;
PinInputTemp.Field = PinInputField_default;
var PinInput2 = PinInputTemp;

// node_modules/native-base/src/components/composites/CircularProgress/CircularProgress.tsx
import get9 from "lodash.get";
import React136 from "react";
import { Animated as Animated5, Easing as Easing2, StyleSheet as StyleSheet7 } from "react-native";
var StyleAnimatedView = makeStyledComponent(Animated5.View);
var CircularProgress = ({ value, isIndeterminate, max, min, ...props }, ref) => {
  const theme3 = useTheme();
  const isDomUsable = canUseDom();
  if (min) {
    value = value - min;
  }
  let sizeProps;
  let newProps = useThemeProps("CircularProgress", props);
  let [, remainingProps] = tools_exports.extractInObject(props, ["size"]);
  if (!newProps.size) {
    sizeProps = {
      height: newProps.height,
      width: newProps.width
    };
  } else {
    sizeProps = { height: newProps.size, width: newProps.size };
  }
  const themeHeight = get9(theme3, "space." + sizeProps.height);
  const themeWidth = get9(theme3, "space." + sizeProps.width);
  const styleSize = {
    height: themeHeight ? parseInt(themeHeight.slice(themeHeight.Length, -2), 10) : sizeProps.height,
    width: themeWidth ? parseInt(themeWidth.slice(themeWidth.Length, -2), 10) : sizeProps.width
  };
  const defaultThickness = newProps.thickness;
  const degree = new Animated5.Value(0);
  if (isIndeterminate) {
    if (isDomUsable) {
      Animated5.loop(Animated5.timing(degree, {
        toValue: 1,
        duration: 600,
        easing: Easing2.linear,
        useNativeDriver: false
      })).start();
    }
  }
  const [viewHeight, setViewHeight] = React136.useState(0);
  const layout2 = (e) => {
    let height = e.nativeEvent.layout.height;
    setViewHeight(height);
  };
  const defaultStyling = {
    borderBottomLeftRadius: viewHeight / 2,
    borderBottomRightRadius: viewHeight / 2,
    borderTopLeftRadius: viewHeight / 2,
    borderTopRightRadius: viewHeight / 2,
    borderLeftWidth: defaultThickness,
    borderBottomWidth: defaultThickness,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    ...styleSize
  };
  const styles = StyleSheet7.create({
    firstProgressLayer: {
      borderTopWidth: defaultThickness,
      borderRightWidth: defaultThickness,
      ...defaultStyling,
      transform: [{ rotateZ: "-135deg" }]
    },
    secondProgressLayer: {
      borderTopWidth: defaultThickness,
      borderRightWidth: defaultThickness,
      ...defaultStyling,
      transform: [{ rotateZ: "45deg" }]
    },
    offsetLayer: {
      borderTopWidth: defaultThickness,
      borderRightWidth: defaultThickness,
      ...defaultStyling,
      borderRadius: viewHeight / 2,
      transform: [{ rotateZ: "-135deg" }]
    },
    animateStyle: {
      borderTopWidth: defaultThickness,
      borderRightWidth: defaultThickness,
      ...defaultStyling,
      transform: [
        {
          rotateZ: degree.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
          })
        }
      ]
    }
  });
  let halfSide = (max ? min ? max - min : max : 100) / 2;
  const propStyle = (percent, base_degrees) => {
    const rotateBy = base_degrees + percent * 180 / halfSide;
    return {
      transform: [{ rotateZ: rotateBy + "deg" }]
    };
  };
  const renderThirdLayer = (percent) => {
    if (percent > halfSide) {
      return /* @__PURE__ */ React136.createElement(Box_default, {
        borderTopColor: newProps.color,
        borderRightColor: newProps.color,
        style: [
          styles.secondProgressLayer,
          propStyle(percent - halfSide, 45)
        ]
      });
    } else {
      return /* @__PURE__ */ React136.createElement(Box_default, {
        borderTopColor: newProps.trackColor,
        borderRightColor: newProps.trackColor,
        style: styles.offsetLayer
      });
    }
  };
  let firstProgressLayerStyle;
  if (value > halfSide) {
    firstProgressLayerStyle = propStyle(halfSide, -135);
  } else {
    firstProgressLayerStyle = propStyle(value, -135);
  }
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React136.createElement(Box_default, {
    ...sizeProps,
    rounded: viewHeight / 2,
    borderWidth: defaultThickness,
    borderColor: newProps.trackColor,
    justifyContent: "center",
    alignItems: "center",
    ...remainingProps,
    ref,
    accessible: true,
    accessibilityRole: "progressbar",
    accessibilityValue: {
      min,
      max,
      now: value
    }
  }, !isIndeterminate ? /* @__PURE__ */ React136.createElement(React136.Fragment, null, /* @__PURE__ */ React136.createElement(Box_default, {
    onLayout: layout2,
    borderTopColor: newProps.color,
    borderRightColor: newProps.color,
    style: [styles.firstProgressLayer, firstProgressLayerStyle]
  }), renderThirdLayer(value), /* @__PURE__ */ React136.createElement(Box_default, {
    _text: newProps._text
  }, remainingProps.children)) : /* @__PURE__ */ React136.createElement(StyleAnimatedView, {
    onLayout: layout2,
    borderTopColor: newProps.color,
    borderRightColor: newProps.color,
    style: styles.animateStyle
  }));
};
var CircularProgress_default = React136.memo(React136.forwardRef(CircularProgress));

// node_modules/native-base/src/components/composites/CircularProgress/index.tsx
var CircularProgress_default2 = CircularProgress_default;

// node_modules/native-base/src/components/composites/Popover/Popover.tsx
import React139, { forwardRef as forwardRef70, memo as memo66 } from "react";

// node_modules/native-base/src/components/composites/Popper/Popper.tsx
import React137 from "react";
import { useOverlayPosition } from "@react-native-aria/overlays";
import { StyleSheet as StyleSheet8, View as View4 } from "react-native";
var defaultArrowHeight = 15;
var defaultArrowWidth = 15;
var getDiagonalLength = (height, width) => {
  return Math.pow(height * height + width * width, 0.5);
};
var [PopperProvider, usePopperContext] = createContext2("PopperContext");
var Popper = (props) => {
  return /* @__PURE__ */ React137.createElement(PopperProvider, {
    ...props
  }, props.children);
};
var PopperContent = React137.forwardRef(({ children, style, ...rest }, ref) => {
  const {
    triggerRef,
    shouldFlip,
    crossOffset,
    offset,
    placement: placementProp,
    onClose,
    shouldOverlapWithTrigger,
    setOverlayRef
  } = usePopperContext("PopperContent");
  const overlayRef = React137.useRef(null);
  const {
    overlayProps,
    rendered,
    arrowProps,
    placement
  } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    shouldFlip,
    crossOffset,
    isOpen: true,
    offset,
    placement: placementProp,
    containerPadding: 0,
    onClose,
    shouldOverlapWithTrigger
  });
  let restElements = [];
  let arrowElement = null;
  React137.useEffect(() => {
    setOverlayRef && setOverlayRef(overlayRef);
  }, [overlayRef, setOverlayRef]);
  React137.Children.forEach(children, (child) => {
    if (React137.isValidElement(child) && child.type.displayName === "PopperArrow") {
      arrowElement = React137.cloneElement(child, {
        arrowProps,
        actualPlacement: placement
      });
    } else {
      restElements.push(child);
    }
  });
  let arrowHeight = 0;
  let arrowWidth = 0;
  if (arrowElement) {
    arrowHeight = defaultArrowHeight;
    arrowWidth = defaultArrowWidth;
    if (arrowElement.props.height) {
      arrowHeight = arrowElement.props.height;
    }
    if (arrowElement.props.width) {
      arrowWidth = arrowElement.props.width;
    }
  }
  const containerStyle = React137.useMemo(() => getContainerStyle({
    placement,
    arrowHeight,
    arrowWidth
  }), [arrowHeight, arrowWidth, placement]);
  const overlayStyle = React137.useMemo(() => StyleSheet8.create({
    overlay: {
      ...overlayProps.style,
      opacity: rendered ? 1 : 0,
      position: "absolute"
    }
  }), [rendered, overlayProps.style]);
  if (useHasResponsiveProps(rest)) {
    return null;
  }
  return /* @__PURE__ */ React137.createElement(View4, {
    ref: overlayRef,
    collapsable: false,
    style: overlayStyle.overlay
  }, arrowElement, /* @__PURE__ */ React137.createElement(Box_default, {
    style: StyleSheet8.flatten([containerStyle, style]),
    ...rest,
    ref
  }, restElements));
});
var PopperArrow = React137.forwardRef(({
  height = defaultArrowHeight,
  width = defaultArrowWidth,
  arrowProps,
  actualPlacement,
  style,
  borderColor = "#52525b",
  backgroundColor = "black",
  ...rest
}, ref) => {
  const additionalStyles = React137.useMemo(() => getArrowStyles({ placement: actualPlacement, height, width }), [actualPlacement, height, width]);
  let triangleStyle = React137.useMemo(() => ({
    position: "absolute",
    width,
    height
  }), [width, height]);
  let arrowStyles = React137.useMemo(() => [arrowProps.style, triangleStyle, additionalStyles, style], [triangleStyle, additionalStyles, arrowProps.style, style]);
  return /* @__PURE__ */ React137.createElement(Box_default, {
    ref,
    style: arrowStyles,
    borderColor,
    backgroundColor,
    zIndex: 1,
    ...rest
  });
});
var getArrowStyles = (props) => {
  let additionalStyles = {
    transform: []
  };
  const diagonalLength = getDiagonalLength(defaultArrowHeight, defaultArrowHeight);
  if (props.placement === "top" && props.width) {
    additionalStyles.transform.push({ translateX: -props.width / 2 });
    additionalStyles.transform.push({ rotate: "45deg" });
    additionalStyles.bottom = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
    additionalStyles.borderBottomWidth = 1;
    additionalStyles.borderRightWidth = 1;
  }
  if (props.placement === "bottom" && props.width) {
    additionalStyles.transform.push({ translateX: -props.width / 2 });
    additionalStyles.transform.push({ rotate: "45deg" });
    additionalStyles.top = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
    additionalStyles.borderTopWidth = 1;
    additionalStyles.borderLeftWidth = 1;
  }
  if (props.placement === "left" && props.height) {
    additionalStyles.transform.push({ translateY: -props.height / 2 });
    additionalStyles.transform.push({ rotate: "45deg" });
    additionalStyles.right = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
    additionalStyles.borderTopWidth = 1;
    additionalStyles.borderRightWidth = 1;
  }
  if (props.placement === "right" && props.height) {
    additionalStyles.transform.push({ translateY: -props.height / 2 });
    additionalStyles.transform.push({ rotate: "45deg" });
    additionalStyles.left = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
    additionalStyles.borderBottomWidth = 1;
    additionalStyles.borderLeftWidth = 1;
  }
  return additionalStyles;
};
var getContainerStyle = ({ placement, arrowHeight }) => {
  const diagonalLength = getDiagonalLength(arrowHeight, arrowHeight) / 2;
  if (placement === "top") {
    return { marginBottom: diagonalLength };
  }
  if (placement === "bottom") {
    return { marginTop: diagonalLength };
  }
  if (placement === "left") {
    return { marginRight: diagonalLength };
  }
  if (placement === "right") {
    return { marginLeft: diagonalLength };
  }
  return {};
};
PopperArrow.displayName = "PopperArrow";
Popper.Content = PopperContent;
Popper.Arrow = PopperArrow;

// node_modules/native-base/src/components/composites/Popover/PopoverContext.ts
import React138 from "react";
var PopoverContext = React138.createContext({
  onClose: () => {
  },
  initialFocusRef: { current: null },
  finalFocusRef: { current: null },
  popoverContentId: void 0,
  headerId: void 0,
  bodyId: void 0,
  setHeaderMounted: () => {
  },
  setBodyMounted: () => {
  },
  headerMounted: false,
  bodyMounted: false
});

// node_modules/native-base/src/components/composites/Popover/Popover.tsx
import { FocusScope as FocusScope2 } from "@react-native-aria/focus";
import { StyleSheet as StyleSheet9 } from "react-native";
import { useId as useId2 } from "@react-aria/utils";
var Popover = ({
  onOpen,
  trigger,
  onClose,
  isOpen: isOpenProp,
  children,
  defaultIsOpen,
  initialFocusRef,
  finalFocusRef,
  trapFocus = true,
  ...props
}, ref) => {
  const triggerRef = React139.useRef(null);
  const mergedRef = mergeRefs([triggerRef]);
  const [isOpen, setIsOpen] = useControllableState({
    value: isOpenProp,
    defaultValue: defaultIsOpen,
    onChange: (value) => {
      value ? onOpen && onOpen() : onClose && onClose();
    }
  });
  const [bodyMounted, setBodyMounted] = React139.useState(false);
  const [headerMounted, setHeaderMounted] = React139.useState(false);
  const popoverContentId = `${useId2()}-content`;
  const headerId = `${popoverContentId}-header`;
  const bodyId = `${popoverContentId}-body`;
  const handleOpen = React139.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const updatedTrigger = () => {
    return trigger({
      "ref": mergedRef,
      "onPress": handleOpen,
      "aria-expanded": isOpen ? true : false,
      "aria-controls": isOpen ? popoverContentId : void 0,
      "aria-haspopup": true
    }, { open: isOpen });
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React139.createElement(Box_default, {
    ref
  }, updatedTrigger(), /* @__PURE__ */ React139.createElement(Overlay, {
    isOpen,
    onRequestClose: handleClose,
    useRNModalOnAndroid: true
  }, /* @__PURE__ */ React139.createElement(PresenceTransition_default, {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 150 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 100 } },
    visible: isOpen,
    style: StyleSheet9.absoluteFill
  }, /* @__PURE__ */ React139.createElement(Popper, {
    onClose: handleClose,
    triggerRef,
    ...props
  }, /* @__PURE__ */ React139.createElement(Backdrop_default, {
    onPress: handleClose,
    bg: "transparent"
  }), /* @__PURE__ */ React139.createElement(PopoverContext.Provider, {
    value: {
      onClose: handleClose,
      initialFocusRef,
      finalFocusRef,
      popoverContentId,
      bodyId,
      headerId,
      headerMounted,
      bodyMounted,
      setBodyMounted,
      setHeaderMounted
    }
  }, /* @__PURE__ */ React139.createElement(FocusScope2, {
    contain: trapFocus,
    restoreFocus: true,
    autoFocus: true
  }, children))))));
};
var Popover_default = memo66(forwardRef70(Popover));

// node_modules/native-base/src/components/composites/Popover/PopoverContent.tsx
import React140 from "react";
import { Platform as Platform40 } from "react-native";
var PopoverContent2 = React140.forwardRef((props, ref) => {
  const {
    onClose,
    initialFocusRef,
    finalFocusRef,
    popoverContentId,
    headerMounted,
    bodyMounted,
    bodyId,
    headerId
  } = React140.useContext(PopoverContext);
  const resolvedProps = usePropsResolution("PopoverContent", props);
  const arrowDefaultColor = props.bgColor ?? props.bg ?? props.backgroundColor ?? resolvedProps.backgroundColor;
  const color2 = useToken("colors", arrowDefaultColor);
  React140.useEffect(() => {
    const finalFocusRefCurrentVal = finalFocusRef?.current;
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
    return () => {
      if (finalFocusRefCurrentVal) {
        finalFocusRefCurrentVal.focus();
      }
    };
  }, [finalFocusRef, initialFocusRef]);
  useKeyboardDismissable({
    enabled: true,
    callback: onClose
  });
  let arrowElement = null;
  const restChildren = [];
  React140.Children.forEach(props.children, (child) => {
    if (child.type.displayName === "PopperArrow") {
      arrowElement = React140.cloneElement(child, {
        backgroundColor: child.props.color ?? color2
      });
    } else {
      restChildren.push(child);
    }
  });
  const accessibilityProps = Platform40.OS === "web" ? {
    "accessibilityRole": "dialog",
    "aria-labelledby": headerMounted ? headerId : void 0,
    "aria-describedby": bodyMounted ? bodyId : void 0
  } : {};
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React140.createElement(Popper.Content, {
    nativeID: popoverContentId,
    ...accessibilityProps,
    ...resolvedProps,
    ...props,
    ref
  }, arrowElement, restChildren);
});
PopoverContent2.displayName = "PopoverContent";

// node_modules/native-base/src/components/composites/Popover/PopoverBody.tsx
import React141 from "react";
var PopoverBody2 = (props, ref) => {
  const resolvedProps = usePropsResolution("PopoverBody", props);
  const { setBodyMounted, bodyId } = React141.useContext(PopoverContext);
  React141.useEffect(() => {
    setBodyMounted(true);
    return () => {
      setBodyMounted(false);
    };
  }, [setBodyMounted]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React141.createElement(Box_default, {
    nativeID: bodyId,
    ...resolvedProps,
    ...props,
    ref
  });
};
var PopoverBody_default = React141.memo(React141.forwardRef(PopoverBody2));

// node_modules/native-base/src/components/composites/Popover/PopoverCloseButton.tsx
import React142 from "react";
var PopoverCloseButton2 = (props, ref) => {
  const { onClose } = React142.useContext(PopoverContext);
  const { _icon, ...resolvedPorps } = usePropsResolution("PopoverCloseButton", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React142.createElement(Box_default, {
    position: "absolute",
    right: 1,
    top: 1,
    zIndex: 1,
    ref
  }, /* @__PURE__ */ React142.createElement(IconButton_default, {
    ...resolvedPorps,
    icon: /* @__PURE__ */ React142.createElement(CloseIcon, {
      ..._icon
    }),
    onPress: onClose
  }));
};
var PopoverCloseButton_default = React142.memo(React142.forwardRef(PopoverCloseButton2));

// node_modules/native-base/src/components/composites/Popover/PopoverFooter.tsx
import React143, { memo as memo67, forwardRef as forwardRef71 } from "react";
var PopoverFooter2 = (props, ref) => {
  const resolvedProps = usePropsResolution("PopoverFooter", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React143.createElement(Box_default, {
    ...resolvedProps,
    ref
  });
};
var PopoverFooter_default = memo67(forwardRef71(PopoverFooter2));

// node_modules/native-base/src/components/composites/Popover/PopoverHeader.tsx
import React144, { memo as memo68, forwardRef as forwardRef72 } from "react";
import { Platform as Platform41 } from "react-native";
var PopoverHeader2 = (props, ref) => {
  const resolvedProps = usePropsResolution("PopoverHeader", props);
  const { setHeaderMounted, headerId } = React144.useContext(PopoverContext);
  React144.useEffect(() => {
    setHeaderMounted(true);
    return () => {
      setHeaderMounted(false);
    };
  }, [setHeaderMounted]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React144.createElement(Box_default, {
    accessibilityRole: Platform41.OS === "web" ? "banner" : void 0,
    nativeID: headerId,
    ...resolvedProps,
    ref
  });
};
var PopoverHeader_default = memo68(forwardRef72(PopoverHeader2));

// node_modules/native-base/src/components/composites/Popover/PopoverArrow.tsx
import React145 from "react";
var PopoverArrow2 = React145.forwardRef((props, ref) => {
  const resolvedProps = usePropsResolution("PopoverArrow", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React145.createElement(Popper.Arrow, {
    ...props,
    ...resolvedProps,
    ref
  });
});
PopoverArrow2.displayName = "PopperArrow";
var PopoverArrow_default = PopoverArrow2;

// node_modules/native-base/src/components/composites/Popover/index.tsx
var PopoverTemp = Popover_default;
PopoverTemp.Content = PopoverContent2;
PopoverTemp.CloseButton = PopoverCloseButton_default;
PopoverTemp.Header = PopoverHeader_default;
PopoverTemp.Footer = PopoverFooter_default;
PopoverTemp.Body = PopoverBody_default;
PopoverTemp.Arrow = PopoverArrow_default;
var Popover2 = PopoverTemp;

// node_modules/native-base/src/components/composites/Tooltip/Tooltip.tsx
import { OverlayContainer as OverlayContainer4 } from "@react-native-aria/overlays";
import React146 from "react";
import { Platform as Platform42, StyleSheet as StyleSheet10 } from "react-native";
import { useId as useId3 } from "@react-aria/utils";
var Tooltip2 = ({
  label,
  children,
  onClose,
  onOpen,
  defaultIsOpen,
  placement,
  openDelay = 0,
  closeDelay = 0,
  closeOnClick = true,
  offset,
  isDisabled,
  hasArrow,
  arrowSize = 12,
  isOpen: isOpenProp,
  ...props
}) => {
  if (hasArrow && offset === void 0) {
    offset = 0;
  } else {
    offset = 6;
  }
  const resolvedProps = usePropsResolution("Tooltip", props);
  const [isOpen, setIsOpen] = useControllableState({
    value: isOpenProp,
    defaultValue: defaultIsOpen,
    onChange: (value) => {
      value ? onOpen && onOpen() : onClose && onClose();
    }
  });
  const arrowBg = props.backgroundColor ?? props.bgColor ?? props.bg ?? resolvedProps.bg;
  const targetRef = React146.useRef(null);
  const enterTimeout = React146.useRef();
  const exitTimeout = React146.useRef();
  const tooltipID = useId3();
  const openWithDelay = React146.useCallback(() => {
    if (!isDisabled) {
      enterTimeout.current = setTimeout(() => setIsOpen(true), openDelay);
    }
  }, [isDisabled, setIsOpen, openDelay]);
  const closeWithDelay = React146.useCallback(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }
    exitTimeout.current = setTimeout(() => setIsOpen(false), closeDelay);
  }, [closeDelay, setIsOpen]);
  React146.useEffect(() => () => {
    clearTimeout(enterTimeout.current);
    clearTimeout(exitTimeout.current);
  }, []);
  let newChildren = children;
  if (typeof children === "string") {
    newChildren = /* @__PURE__ */ React146.createElement(Box_default, null, children);
  }
  newChildren = React146.cloneElement(newChildren, {
    "onPress": composeEventHandlers(newChildren.props.onPress, () => {
      if (closeOnClick) {
        closeWithDelay();
      }
    }),
    "onFocus": composeEventHandlers(newChildren.props.onFocus, openWithDelay),
    "onBlur": composeEventHandlers(newChildren.props.onBlur, closeWithDelay),
    "onMouseEnter": composeEventHandlers(newChildren.props.onMouseEnter, openWithDelay),
    "onMouseLeave": composeEventHandlers(newChildren.props.onMouseLeave, closeWithDelay),
    "ref": mergeRefs([newChildren.ref, targetRef]),
    "aria-describedby": isOpen ? tooltipID : void 0
  });
  useKeyboardDismissable({
    enabled: isOpen,
    callback: () => setIsOpen(false)
  });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React146.createElement(React146.Fragment, null, newChildren, isOpen && /* @__PURE__ */ React146.createElement(OverlayContainer4, null, /* @__PURE__ */ React146.createElement(PresenceTransition_default, {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 150 } },
    exit: { opacity: 0, transition: { duration: 100 } },
    visible: isOpen,
    style: StyleSheet10.absoluteFill
  }, /* @__PURE__ */ React146.createElement(Popper, {
    triggerRef: targetRef,
    onClose: () => setIsOpen(false),
    placement,
    offset
  }, /* @__PURE__ */ React146.createElement(Popper.Content, null, hasArrow && /* @__PURE__ */ React146.createElement(Popper.Arrow, {
    borderColor: "transparent",
    backgroundColor: arrowBg,
    height: arrowSize,
    width: arrowSize
  }), /* @__PURE__ */ React146.createElement(Box_default, {
    ...resolvedProps,
    accessibilityRole: Platform42.OS === "web" ? "tooltip" : void 0,
    nativeID: tooltipID
  }, label))))));
};

// node_modules/native-base/src/components/composites/AlertDialog/AlertDialog.tsx
import React148, { forwardRef as forwardRef73, memo as memo69 } from "react";
import { StyleSheet as StyleSheet11 } from "react-native";
import { FocusScope as FocusScope3 } from "@react-native-aria/focus";

// node_modules/native-base/src/components/composites/AlertDialog/Context.ts
import React147 from "react";
var AlertDialogContext = React147.createContext({
  handleClose: () => {
  },
  contentSize: {},
  initialFocusRef: { current: null },
  finalFocusRef: { current: null }
});

// node_modules/native-base/src/components/composites/AlertDialog/AlertDialog.tsx
var AlertDialog2 = ({
  children,
  isOpen,
  onClose,
  defaultIsOpen,
  initialFocusRef,
  finalFocusRef,
  avoidKeyboard,
  closeOnOverlayClick = false,
  isKeyboardDismissable = true,
  overlayVisible = true,
  backdropVisible = true,
  animationPreset = "fade",
  ...rest
}, ref) => {
  const bottomInset = useKeyboardBottomInset();
  const { contentSize, _backdrop, ...restThemeProps } = usePropsResolution("AlertDialog", rest);
  const [visible, setVisible] = useControllableState({
    value: isOpen,
    defaultValue: defaultIsOpen,
    onChange: (val) => {
      if (!val)
        onClose && onClose();
    }
  });
  const handleClose = () => setVisible(false);
  let child = /* @__PURE__ */ React148.createElement(Box_default, {
    bottom: avoidKeyboard ? bottomInset + "px" : void 0,
    ...restThemeProps,
    ref,
    pointerEvents: "box-none"
  }, children);
  if (useHasResponsiveProps(rest)) {
    return null;
  }
  return /* @__PURE__ */ React148.createElement(Overlay, {
    isOpen: visible,
    onRequestClose: handleClose,
    isKeyboardDismissable,
    useRNModalOnAndroid: true
  }, /* @__PURE__ */ React148.createElement(AlertDialogContext.Provider, {
    value: {
      handleClose,
      contentSize,
      initialFocusRef,
      finalFocusRef
    }
  }, /* @__PURE__ */ React148.createElement(Fade_default, {
    exitDuration: 150,
    entryDuration: 200,
    in: visible,
    style: StyleSheet11.absoluteFill
  }, overlayVisible && backdropVisible && /* @__PURE__ */ React148.createElement(Backdrop_default, {
    onPress: () => {
      closeOnOverlayClick && handleClose();
    },
    ..._backdrop
  })), animationPreset === "slide" ? /* @__PURE__ */ React148.createElement(Slide_default, {
    in: visible,
    duration: 200
  }, /* @__PURE__ */ React148.createElement(FocusScope3, {
    contain: visible,
    autoFocus: visible && !initialFocusRef,
    restoreFocus: visible && !finalFocusRef
  }, child)) : /* @__PURE__ */ React148.createElement(Fade_default, {
    exitDuration: 100,
    entryDuration: 200,
    in: visible,
    style: StyleSheet11.absoluteFill
  }, /* @__PURE__ */ React148.createElement(FocusScope3, {
    contain: visible,
    autoFocus: visible && !initialFocusRef,
    restoreFocus: visible && !finalFocusRef
  }, child))));
};
var AlertDialog_default = memo69(forwardRef73(AlertDialog2));

// node_modules/native-base/src/components/composites/AlertDialog/AlertDialogContent.tsx
import React149, { memo as memo70, forwardRef as forwardRef74 } from "react";
var AlertDialogContent2 = (props, ref) => {
  const { ...newProps } = usePropsResolution("AlertDialogContent", props);
  const {
    contentSize,
    initialFocusRef,
    finalFocusRef,
    handleClose
  } = React149.useContext(AlertDialogContext);
  React149.useEffect(() => {
    let finalRefVal = finalFocusRef ? finalFocusRef.current : null;
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
    return () => {
      if (finalRefVal) {
        finalRefVal.focus();
      }
    };
  }, [initialFocusRef, finalFocusRef]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React149.createElement(Box_default, {
    ...contentSize,
    ...newProps,
    ref,
    onAccessibilityEscape: handleClose,
    "aria-modal": "true",
    accessibilityRole: "alert",
    accessibilityViewIsModal: true
  });
};
var AlertDialogContent_default = memo70(forwardRef74(AlertDialogContent2));

// node_modules/native-base/src/components/composites/AlertDialog/AlertDialogBody.tsx
import React150, { memo as memo71, forwardRef as forwardRef75 } from "react";
import { ScrollView as ScrollView2 } from "react-native";
var AlertDialogBody2 = (props, ref) => {
  const newProps = usePropsResolution("AlertDialogBody", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React150.createElement(ScrollView2, null, /* @__PURE__ */ React150.createElement(Box_default, {
    ...newProps,
    ref
  }, props.children));
};
var AlertDialogBody_default = memo71(forwardRef75(AlertDialogBody2));

// node_modules/native-base/src/components/composites/AlertDialog/AlertDialogCloseButton.tsx
import React151, { memo as memo72, forwardRef as forwardRef76 } from "react";
var AlertDialogCloseButton2 = (props, ref) => {
  const newProps = usePropsResolution("AlertDialogCloseButton", props);
  const { _icon, ...rest } = newProps;
  const { handleClose } = React151.useContext(AlertDialogContext);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React151.createElement(Button_default, {
    variant: "ghost",
    ...rest,
    onPress: handleClose,
    accessibilityLabel: "Close dialog",
    ref
  }, /* @__PURE__ */ React151.createElement(CloseIcon, {
    ..._icon
  }));
};
var AlertDialogCloseButton_default = memo72(forwardRef76(AlertDialogCloseButton2));

// node_modules/native-base/src/components/composites/AlertDialog/AlertDialogFooter.tsx
import React152, { memo as memo73, forwardRef as forwardRef77 } from "react";
var AlertDialogFooter2 = (props, ref) => {
  const newProps = usePropsResolution("AlertDialogFooter", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React152.createElement(Box_default, {
    ...newProps,
    ref
  });
};
var AlertDialogFooter_default = memo73(forwardRef77(AlertDialogFooter2));

// node_modules/native-base/src/components/composites/AlertDialog/AlertDialogHeader.tsx
import React153, { memo as memo74, forwardRef as forwardRef78 } from "react";
var AlertDialogHeader2 = (props, ref) => {
  const newProps = usePropsResolution("AlertDialogHeader", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React153.createElement(Box_default, {
    ...newProps,
    ref
  });
};
var AlertDialogHeader_default = memo74(forwardRef78(AlertDialogHeader2));

// node_modules/native-base/src/components/composites/AlertDialog/index.tsx
var AlertDialogTemp = AlertDialog_default;
AlertDialogTemp.Content = AlertDialogContent_default;
AlertDialogTemp.CloseButton = AlertDialogCloseButton_default;
AlertDialogTemp.Header = AlertDialogHeader_default;
AlertDialogTemp.Footer = AlertDialogFooter_default;
AlertDialogTemp.Body = AlertDialogBody_default;
var AlertDialogMain = AlertDialogTemp;

// node_modules/native-base/src/components/composites/Menu/Menu.tsx
import React155, { memo as memo75, forwardRef as forwardRef79 } from "react";
import { AccessibilityInfo as AccessibilityInfo3, ScrollView as ScrollView3 } from "react-native";

// node_modules/native-base/src/components/composites/Menu/useMenu.tsx
import { useFocusManager } from "@react-aria/focus";
import { useId as useId4 } from "@react-aria/utils";
import { Platform as Platform43 } from "react-native";
var useMenuTrigger = ({ handleOpen, isOpen }) => {
  const menuTriggerId = useId4();
  return {
    "onKeyDownCapture": (event) => {
      if ([" ", "Enter", "ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        handleOpen();
      }
    },
    "aria-haspopup": "menu",
    "aria-expanded": isOpen ? true : void 0,
    "nativeID": menuTriggerId
  };
};
var useMenu = () => {
  const focusManager = useFocusManager();
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        focusManager.focusNext({ wrap: true });
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        focusManager.focusPrevious({ wrap: true });
        break;
      }
    }
  };
  return {
    onKeyDown,
    accessibilityRole: "menu"
  };
};
var useMenuItem = ({
  textValue,
  ref
}) => {
  return {
    accessibilityRole: "menuitem",
    dataSet: {
      nativebaseMenuItem: textValue
    },
    onHoverIn: () => {
      if (ref.current && Platform43.OS === "web")
        ref.current.focus();
    }
  };
};
var useMenuOptionItem = ({
  isChecked,
  type
}) => {
  return {
    accessibilityRole: "menuitem" + (Platform43.OS === "web" ? type : ""),
    accessibilityState: {
      checked: isChecked
    },
    accessibilityChecked: isChecked
  };
};
var ITEM_ATTR = "data-nativebase-menu-item";
var getValue = (element) => element.getAttribute(ITEM_ATTR) ?? "";
var useMenuTypeahead = (props) => {
  return {
    onKeyDown(event) {
      if (props.onKeyDown) {
        props.onKeyDown(event);
      }
      if (event.key.length === 1 && !(event.ctrlKey || event.altKey || event.metaKey)) {
        const container2 = event.currentTarget;
        const values = Array.from(container2.querySelectorAll(`[${ITEM_ATTR}]`)).map(getValue);
        const searchKey = event.key;
        const foundValue = values.find((value) => value.toLowerCase().startsWith(searchKey));
        const newItem = container2.querySelector(`[${ITEM_ATTR}="${foundValue}"]`);
        if (newItem) {
          setTimeout(() => newItem.focus());
        }
      }
    }
  };
};

// node_modules/native-base/src/components/composites/Menu/Menu.tsx
import { FocusScope as FocusScope4 } from "@react-native-aria/focus";

// node_modules/native-base/src/components/composites/Menu/MenuContext.ts
import React154 from "react";
var MenuContext = React154.createContext({
  closeOnSelect: true,
  onClose: () => {
  }
});

// node_modules/native-base/src/components/composites/Menu/Menu.tsx
var Menu = ({
  trigger,
  closeOnSelect = true,
  children,
  onOpen,
  onClose,
  isOpen: isOpenProp,
  defaultIsOpen,
  placement = "bottom left",
  ...props
}, ref) => {
  const triggerRef = React155.useRef(null);
  const [isOpen, setIsOpen] = useControllableState({
    value: isOpenProp,
    defaultValue: defaultIsOpen,
    onChange: (value) => {
      value ? onOpen && onOpen() : onClose && onClose();
    }
  });
  const { transition, ...resolvedProps } = usePropsResolution("Menu", props);
  const handleOpen = React155.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const handleClose = React155.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const triggerProps = useMenuTrigger({
    handleOpen,
    isOpen
  });
  const updatedTrigger = () => {
    return trigger({
      ...triggerProps,
      ref: triggerRef,
      onPress: handleOpen
    }, { open: isOpen });
  };
  React155.useEffect(() => {
    if (isOpen) {
      AccessibilityInfo3.announceForAccessibility("Popup window");
    }
  }, [isOpen]);
  if (useHasResponsiveProps(resolvedProps)) {
    return null;
  }
  return /* @__PURE__ */ React155.createElement(React155.Fragment, null, updatedTrigger(), /* @__PURE__ */ React155.createElement(Overlay, {
    isOpen,
    onRequestClose: handleClose,
    useRNModalOnAndroid: true
  }, /* @__PURE__ */ React155.createElement(PresenceTransition_default, {
    visible: isOpen,
    ...transition
  }, /* @__PURE__ */ React155.createElement(Popper, {
    triggerRef,
    onClose: handleClose,
    placement,
    ...props
  }, /* @__PURE__ */ React155.createElement(Backdrop_default, {
    bg: "transparent",
    onPress: handleClose
  }), /* @__PURE__ */ React155.createElement(Popper.Content, null, /* @__PURE__ */ React155.createElement(MenuContext.Provider, {
    value: { closeOnSelect, onClose: handleClose }
  }, /* @__PURE__ */ React155.createElement(FocusScope4, {
    contain: true,
    restoreFocus: true,
    autoFocus: true
  }, /* @__PURE__ */ React155.createElement(MenuContent, {
    menuRef: ref,
    ...resolvedProps
  }, children))))))));
};
var MenuContent = ({
  menuRef,
  children,
  ...props
}) => {
  const menuProps = useMenu();
  const typeaheadProps = useMenuTypeahead(menuProps);
  return /* @__PURE__ */ React155.createElement(Box_default, {
    ...props,
    ...menuProps,
    ...typeaheadProps,
    ref: menuRef
  }, /* @__PURE__ */ React155.createElement(ScrollView3, null, children));
};
var Menu_default = memo75(forwardRef79(Menu));

// node_modules/native-base/src/components/composites/Menu/MenuGroup.tsx
import React156, { memo as memo76, forwardRef as forwardRef80 } from "react";
var MenuGroup2 = ({ title, children, ...props }, ref) => {
  const { _title, ...resolvedProps } = usePropsResolution("MenuGroup", props);
  if (useHasResponsiveProps({ ...props, title })) {
    return null;
  }
  return /* @__PURE__ */ React156.createElement(React156.Fragment, null, /* @__PURE__ */ React156.createElement(Box_default, {
    ...resolvedProps,
    ref
  }, /* @__PURE__ */ React156.createElement(Text_default, {
    ..._title
  }, title)), children);
};
var MenuGroup_default = memo76(forwardRef80(MenuGroup2));

// node_modules/native-base/src/components/composites/Menu/MenuItem.tsx
import React157, { forwardRef as forwardRef81, memo as memo77 } from "react";
var MenuItem2 = ({ children, isDisabled, onPress, style, textValue, ...props }, ref) => {
  const { closeOnSelect, onClose } = React157.useContext(MenuContext);
  const menuItemRef = React157.useRef(null);
  const mergedRef = mergeRefs([menuItemRef, ref]);
  const { _text, ...resolvedProps } = usePropsResolution("MenuItem", props, {
    isDisabled
  });
  const [textContent, setTextContent] = React157.useState("");
  React157.useEffect(() => {
    const menuItem = menuItemRef.current;
    if (menuItem) {
      setTextContent((menuItem.textContent ?? "").trim());
    }
  }, [children]);
  const menuItemProps = useMenuItem({
    textValue: textValue ?? textContent,
    ref: menuItemRef
  });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React157.createElement(Pressable_default, {
    ...menuItemProps,
    ...resolvedProps,
    ref: mergedRef,
    style,
    disabled: isDisabled,
    accessibilityState: {
      disabled: isDisabled
    },
    onPress: (e) => {
      if (!isDisabled) {
        onPress && onPress(e);
        if (closeOnSelect) {
          onClose && onClose();
        }
      }
    }
  }, /* @__PURE__ */ React157.createElement(React157.Fragment, null, React157.Children.map(children, (child, index) => {
    if (typeof child === "string" || typeof child === "number") {
      return /* @__PURE__ */ React157.createElement(Text_default, {
        ..._text,
        key: `menu-item-${index}`
      }, child);
    } else {
      return child;
    }
  })));
};
var MenuItem_default = memo77(forwardRef81(MenuItem2));

// node_modules/native-base/src/components/composites/Menu/MenuItemOption.tsx
import React159, { forwardRef as forwardRef83, memo as memo79 } from "react";

// node_modules/native-base/src/components/composites/Menu/MenuOptionGroup.tsx
import React158, { forwardRef as forwardRef82, memo as memo78 } from "react";
var MenuOptionContext = React158.createContext({
  values: [],
  onChange: (_val) => {
  },
  type: "checkbox"
});
var MenuOptionGroup = ({ type, defaultValue, value, onChange, ...props }, ref) => {
  const internalDefaultValue = defaultValue ? Array.isArray(defaultValue) ? defaultValue : [defaultValue] : [];
  const [internalValues, setValues] = React158.useState(internalDefaultValue);
  onChange = (newValue) => {
    if (type === "checkbox") {
      const newValues = [...internalValues];
      if (internalValues.includes(newValue)) {
        newValues.splice(newValues.indexOf(newValue), 1);
        setValues(newValues);
      } else {
        newValues.push(newValue);
        setValues(newValues);
      }
    } else if (type === "radio") {
      setValues([newValue]);
    }
  };
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React158.createElement(MenuOptionContext.Provider, {
    value: {
      values: !value ? internalValues : Array.isArray(value) ? value : [value],
      onChange,
      type
    }
  }, /* @__PURE__ */ React158.createElement(MenuGroup_default, {
    ...props,
    ref
  }));
};
var MenuOptionGroup_default = memo78(forwardRef82(MenuOptionGroup));

// node_modules/native-base/src/components/composites/Menu/MenuItemOption.tsx
var MenuItemOption = (props, ref) => {
  const { value, children, onPress, ...resolvedProps } = usePropsResolution("MenuItem", props);
  const { values, onChange, type } = React159.useContext(MenuOptionContext);
  const modifiedOnPress = (e) => {
    onChange(value);
    onPress && onPress(e);
  };
  const isChecked = values.includes(value);
  const menuOptionProps = useMenuOptionItem({ isChecked, type });
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React159.createElement(MenuItem_default, {
    ...resolvedProps,
    ...menuOptionProps,
    accessibilityRole: "button",
    onPress: modifiedOnPress,
    ref
  }, /* @__PURE__ */ React159.createElement(HStack_default, {
    alignItems: "center",
    px: resolvedProps.px,
    space: 3
  }, /* @__PURE__ */ React159.createElement(CheckIcon, {
    ...resolvedProps._icon,
    opacity: isChecked ? 1 : 0
  }), /* @__PURE__ */ React159.createElement(Box_default, null, children)));
};
var MenuItemOption_default = memo79(forwardRef83(MenuItemOption));

// node_modules/native-base/src/components/composites/Menu/index.tsx
var MenuTemp = Menu_default;
MenuTemp.Item = MenuItem_default;
MenuTemp.Group = MenuGroup_default;
MenuTemp.ItemOption = MenuItemOption_default;
MenuTemp.OptionGroup = MenuOptionGroup_default;
var Menu2 = MenuTemp;

// node_modules/native-base/src/components/composites/SimpleGrid/SimpleGrid.tsx
import React160 from "react";
var DEBUG_STYLES = false ? {
  rows: {
    borderWidth: "1px"
  },
  cols: {
    borderWidth: "1px"
  }
} : {
  rows: {},
  cols: {}
};
var SimpleGrid = (props, ref) => {
  const {
    columns,
    space: space2,
    spacingX,
    spacingY,
    minChildWidth,
    children,
    ...remainingProps
  } = useThemeProps("SimpleGrid", props);
  if (useHasResponsiveProps(props)) {
    return /* @__PURE__ */ React160.createElement(React160.Fragment, null);
  }
  let cellSpacing = space2 ?? 0;
  let cellSpacingX = spacingX ?? cellSpacing;
  let cellSpacingY = spacingY ?? cellSpacing;
  const childrenArray = React160.Children.toArray(children);
  if (columns) {
    let rowSlices = [];
    for (let i = 0; i < childrenArray.length; i = i + columns) {
      rowSlices.push(childrenArray.slice(i, i + columns));
    }
    return /* @__PURE__ */ React160.createElement(VStack_default, {
      ...DEBUG_STYLES.rows,
      space: cellSpacingY,
      ...remainingProps,
      ref
    }, rowSlices.map((row, rowIndex) => {
      return /* @__PURE__ */ React160.createElement(HStack_default, {
        space: cellSpacingX,
        key: rowIndex
      }, row.map((col) => {
        return /* @__PURE__ */ React160.createElement(Box_default, {
          ...DEBUG_STYLES.cols,
          key: col.key
        }, col);
      }));
    }));
  } else if (minChildWidth) {
    return /* @__PURE__ */ React160.createElement(Box_default, {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      ...remainingProps,
      ref
    }, childrenArray.map((col) => {
      return /* @__PURE__ */ React160.createElement(Box_default, {
        ...DEBUG_STYLES.cols,
        mx: cellSpacingX,
        my: cellSpacingY,
        key: col.key,
        minWidth: minChildWidth
      }, col);
    }));
  }
  return /* @__PURE__ */ React160.createElement(React160.Fragment, null);
};
var SimpleGrid_default = React160.memo(React160.forwardRef(SimpleGrid));

// node_modules/native-base/src/components/composites/Tabs/Tabs.tsx
import React163 from "react";

// node_modules/native-base/src/components/composites/Tabs/Context.ts
import { createContext as createContext10 } from "react";
var TabsContext = createContext10({});

// node_modules/native-base/src/components/composites/Tabs/Tabs.tsx
import { Item as Item2 } from "@react-stately/collections";
import { useTabsState } from "@react-stately/tabs";

// node_modules/native-base/src/components/composites/Tabs/TabViews.tsx
import React161 from "react";
var TabViewsImpl = React161.forwardRef(({ children, ...props }, ref) => {
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React161.createElement(Box_default, {
    ...props,
    ref
  }, children);
});
var TabViews = React161.memo(TabViewsImpl);
TabViews.displayName = "TabViews";
var TabViews_default = TabViews;

// node_modules/native-base/src/components/composites/Tabs/TabBar.tsx
import React162 from "react";
var TabBarImpl = ({ tablistRef, tabListProps, ...props }, ref) => {
  const {
    tabBarStyle,
    align,
    isFitted,
    state
  } = React162.useContext(TabsContext);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React162.createElement(Box_default, {
    flexDirection: "row",
    width: "100%",
    justifyContent: isFitted ? "space-between" : align,
    ...tabListProps,
    ...tabBarStyle,
    ...props,
    ref: mergeRefs([ref, tablistRef])
  }, [...state.collection].map((item) => React162.cloneElement(item.rendered, { item, key: item.key })));
};
var TabBar = React162.memo(React162.forwardRef(TabBarImpl));
TabBar.displayName = "TabBar";
var TabBar_default = TabBar;

// node_modules/native-base/src/components/composites/Tabs/Tabs.tsx
import { useTabs } from "@react-native-aria/tabs";
var getTabsAndBars = (children) => {
  let bars = [];
  let views = [];
  let items = React163.Children.toArray(children);
  let tabBarProps = { props: {}, ref: void 0 };
  let tabViewsProps = { props: {}, ref: void 0 };
  items.forEach((item) => {
    if (item.type) {
      if (item.type.displayName === "TabBar") {
        bars = bars.concat(item.props.children);
        tabBarProps = { props: item.props, ref: item.ref };
      } else if (item.type.displayName === "TabViews") {
        views = views.concat(item.props.children);
        tabViewsProps = { props: item.props, ref: item.ref };
      }
    }
  });
  return { views, bars, tabViewsProps, tabBarProps };
};
var convertToCollectionItems = (children) => {
  const { views, bars } = getTabsAndBars(children);
  return bars.map((bar, index) => {
    let textValue;
    if (bar.props.accessibilityLabel) {
      textValue = bar.props.accessibilityLabel;
    } else if (typeof bar.props.children === "string") {
      textValue = bar.props.children;
    }
    return /* @__PURE__ */ React163.createElement(Item2, {
      key: index,
      title: bar,
      textValue
    }, views[index]);
  });
};
var Tabs = ({ children, ...props }, ref) => {
  const {
    onChange,
    activeTabStyle,
    inactiveTabStyle,
    activeIconProps,
    inactiveIconProps,
    tabBarStyle,
    isFitted,
    align,
    ...newProps
  } = useThemeProps("Tabs", props);
  const collectionChildren = convertToCollectionItems(children);
  const { tabBarProps, tabViewsProps } = getTabsAndBars(children);
  const mappedProps = {
    children: collectionChildren,
    defaultSelectedKey: props.defaultIndex !== void 0 ? props.defaultIndex.toString() : void 0,
    selectedKey: props.index !== void 0 ? props.index.toString() : void 0,
    onSelectionChange: (e) => onChange && onChange(parseInt(e)),
    keyboardActivation: props.keyboardActivation
  };
  let state = useTabsState(mappedProps);
  const setAlign = () => {
    switch (align) {
      case "start":
        return "flex-start";
      case "end":
        return "flex-end";
      case "center":
        return "center";
      default:
        return "flex-start";
    }
  };
  let tablistRef = React163.useRef();
  let { tabListProps, tabPanelProps } = useTabs(mappedProps, state, tablistRef);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React163.createElement(TabsContext.Provider, {
    value: {
      activeTabStyle,
      inactiveTabStyle,
      activeIconProps,
      inactiveIconProps,
      tabBarStyle,
      isFitted,
      align: setAlign(),
      state
    }
  }, /* @__PURE__ */ React163.createElement(Box_default, {
    width: "100%",
    ...newProps,
    ref
  }, /* @__PURE__ */ React163.createElement(TabBar_default, {
    tabListProps,
    ...tabBarProps.props,
    tablistRef: mergeRefs([tablistRef, tabBarProps.ref])
  }), /* @__PURE__ */ React163.createElement(TabViews_default, {
    ...tabPanelProps,
    ...tabViewsProps.props,
    ref: tabViewsProps.ref
  }, state.selectedItem && state.selectedItem.props.children)));
};
var Tabs_default = React163.memo(React163.forwardRef(Tabs));

// node_modules/native-base/src/components/composites/Tabs/Tab.tsx
import React164, { createContext as createContext11 } from "react";
import { useTab } from "@react-native-aria/tabs";
import { useHover as useHover9 } from "@react-native-aria/interactions";
import merge6 from "lodash.merge";
var TabContext = createContext11({});
var Tab = ({
  children,
  isDisabled,
  style,
  _active,
  _disabled,
  item,
  ...props
}, ref) => {
  const newProps = omitUndefined(props);
  const {
    inactiveTabStyle,
    activeTabStyle,
    state,
    isFitted
  } = React164.useContext(TabsContext);
  let tabRef = React164.useRef(null);
  const _ref = React164.useRef(null);
  const { isHovered } = useHover9({}, _ref);
  let isSelected = state.selectedKey === item.key;
  let { tabProps } = useTab({ item, isDisabled }, state, tabRef);
  React164.useEffect(() => {
    if (isDisabled) {
      state.disabledKeys.add(item.key);
    } else {
      state.disabledKeys.delete(item.key);
    }
  }, [isDisabled, item.key, state.disabledKeys]);
  const tabStyle = isSelected ? activeTabStyle : inactiveTabStyle;
  const { _hover, ...remainingTabStyle } = tabStyle;
  const mergedProps = merge6(remainingTabStyle, newProps);
  const [
    marginalProps,
    remainingProps
  ] = tools_exports.extractInObject(mergedProps, [
    "margin",
    "m",
    "marginTop",
    "mt",
    "marginRight",
    "mr",
    "marginBottom",
    "mb",
    "marginLeft",
    "ml",
    "marginX",
    "mx",
    "marginY",
    "my"
  ]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React164.createElement(TabContext.Provider, {
    value: {
      isSelected
    }
  }, /* @__PURE__ */ React164.createElement(Pressable_default, {
    disabled: isDisabled,
    ref: mergeRefs([tabRef, _ref, ref]),
    flex: isFitted ? 1 : void 0,
    ...tabProps,
    ...marginalProps
  }, /* @__PURE__ */ React164.createElement(Box_default, {
    ...remainingProps,
    ...isHovered && _hover,
    style: [style, isSelected && _active, isDisabled && _disabled]
  }, children)));
};
var Tab_default = React164.memo(React164.forwardRef(Tab));

// node_modules/native-base/src/components/composites/Tabs/TabView.tsx
import React165 from "react";
var TabView = ({ children, ...props }, ref) => {
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React165.createElement(Box_default, {
    p: 3,
    ...props,
    ref
  }, children);
};
var TabView_default = React165.memo(React165.forwardRef(TabView));

// node_modules/native-base/src/components/composites/Tabs/TabIcon.tsx
import React166 from "react";
var TabIcon = (props, ref) => {
  const {
    activeIconProps,
    inactiveIconProps
  } = React166.useContext(TabsContext);
  const { isSelected } = React166.useContext(TabContext);
  const iconProps = isSelected ? activeIconProps : inactiveIconProps;
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React166.createElement(Icon_default, {
    ...iconProps,
    ...props,
    ref
  });
};
var TabIcon_default = React166.memo(React166.forwardRef(TabIcon));

// node_modules/native-base/src/components/composites/Tabs/index.tsx
var TabsTemp = Tabs_default;
TabsTemp.Bar = TabBar_default;
TabsTemp.Tab = Tab_default;
TabsTemp.Views = TabViews_default;
TabsTemp.View = TabView_default;
TabsTemp.Icon = TabIcon_default;
var Tabs2 = TabsTemp;

// node_modules/native-base/src/components/composites/TextField/TextField.tsx
import React167 from "react";
var TextField2 = (mainProps, ref) => {
  const {
    children,
    helperText,
    errorMessage,
    InputLeftElement,
    InputRightElement,
    dropdownIcon,
    ...props
  } = mainProps;
  const {
    divider,
    _errorMessageProps,
    _helperTextProps,
    component,
    ...resolvedProps
  } = usePropsResolution("TextField", props);
  const [layoutProps, componentProps] = extractInObject(resolvedProps, [
    "space",
    "reversed",
    ...stylingProps.margin,
    ...stylingProps.layout,
    ...stylingProps.flexbox,
    ...stylingProps.position
  ]);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  const activeComponent = () => {
    switch (component) {
      case "select":
        return /* @__PURE__ */ React167.createElement(Select_default2, {
          ...componentProps,
          dropdownIcon
        }, children);
      case "textarea":
        return /* @__PURE__ */ React167.createElement(TextArea_default, {
          ...componentProps,
          ref
        });
      default:
        return /* @__PURE__ */ React167.createElement(Input_default, {
          InputLeftElement,
          InputRightElement,
          ...componentProps,
          ref
        });
    }
  };
  return /* @__PURE__ */ React167.createElement(Stack_default, {
    divider,
    ...layoutProps
  }, activeComponent(), componentProps.isInvalid && /* @__PURE__ */ React167.createElement(Text_default, {
    ..._errorMessageProps
  }, errorMessage), !componentProps.isInvalid && /* @__PURE__ */ React167.createElement(Text_default, {
    ..._helperTextProps
  }, helperText));
};
var TextField_default = React167.memo(React167.forwardRef(TextField2));

// node_modules/native-base/src/components/composites/Fab/Fab.tsx
import React168, { memo as memo80, forwardRef as forwardRef84 } from "react";
import { OverlayContainer as OverlayContainer5 } from "@react-native-aria/overlays";
var Fab = (props, ref) => {
  const themeProps = usePropsResolution("FAB", props);
  const {
    label,
    icon,
    renderInPortal,
    placement,
    placementProps: placementProps2,
    ...newProps
  } = themeProps;
  const fabComponent = /* @__PURE__ */ React168.createElement(Button2, {
    ...placementProps2[placement],
    ref,
    startIcon: icon,
    ...newProps
  }, label);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return renderInPortal ? /* @__PURE__ */ React168.createElement(OverlayContainer5, null, fabComponent) : fabComponent;
};
var Fab_default = memo80(forwardRef84(Fab));

// node_modules/native-base/src/components/composites/Typeahead/useTypeahead/types.tsx
var InputChange = "__input_change__";
var InputBlur = "__input_blur__";
var ItemClick = "__item_click__";
var ToggleButtonClick = "__togglebutton_click__";
var FunctionToggleMenu = "__function_toggle_menu__";
var FunctionOpenMenu = "__function_open_menu__";
var FunctionCloseMenu = "__function_close_menu__";
var FunctionSelectItem = "__function_select_item__";
var FunctionSetInputValue = "__function_set_input_value__";
var FunctionReset = "__function_reset__";
var ControlledPropUpdatedSelectedItem = "__controlled_prop_updated_selected_item__";

// node_modules/native-base/src/components/composites/Typeahead/useTypeahead/utils.ts
var dropdownDefaultStateValues = {
  highlightedIndex: -1,
  isOpen: false,
  selectedItem: null,
  inputValue: ""
};
function capitalizeString(string) {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
}
function getDefaultValue(props, propKey, defaultStateValues = dropdownDefaultStateValues) {
  const defaultPropKey = `default${capitalizeString(propKey)}`;
  if (defaultPropKey in props) {
    return props[defaultPropKey];
  }
  return defaultStateValues[propKey];
}

// node_modules/native-base/src/components/composites/Typeahead/useTypeahead/reducer.tsx
function useTypeaheadReducer(state, action) {
  const { type, props } = action;
  let changes;
  switch (type) {
    case ItemClick:
      changes = {
        isOpen: getDefaultValue(props, "isOpen"),
        selectedItem: props.items[action.index],
        inputValue: props.itemToString(props.items[action.index])
      };
      break;
    case InputBlur:
      if (state.isOpen) {
        changes = {
          isOpen: false
        };
      }
      break;
    case InputChange:
      changes = {
        isOpen: true,
        inputValue: action.inputValue
      };
      break;
    case ToggleButtonClick:
    case FunctionToggleMenu:
      changes = {
        isOpen: !state.isOpen
      };
      break;
    case FunctionOpenMenu:
      changes = {
        isOpen: true
      };
      break;
    case FunctionCloseMenu:
      changes = {
        isOpen: false
      };
      break;
    case FunctionSelectItem:
      changes = {
        selectedItem: action.selectedItem,
        inputValue: props.itemToString(action.selectedItem)
      };
      break;
    case ControlledPropUpdatedSelectedItem:
    case FunctionSetInputValue:
      changes = {
        inputValue: action.inputValue
      };
      break;
    case FunctionReset:
      changes = {
        isOpen: getDefaultValue(props, "isOpen"),
        selectedItem: getDefaultValue(props, "selectedItem"),
        inputValue: getDefaultValue(props, "inputValue")
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return {
    ...state,
    ...changes
  };
}

// node_modules/native-base/src/components/composites/Typeahead/useTypeahead/useTypeahead.ts
import React169, { useEffect as useEffect6 } from "react";
import { Keyboard as Keyboard3 } from "react-native";
function isControlledProp(props, key) {
  return props[key] !== void 0;
}
function useTypeahead(props) {
  let defaultValues = { ...dropdownDefaultStateValues };
  defaultValues.isOpen = getDefaultValue(props, "isOpen");
  const [state, dispatch] = React169.useReducer(useTypeaheadReducer, defaultValues);
  const dispatchWithProps = (object) => {
    dispatch({ ...object, props });
  };
  const { inputValue, isOpen } = state;
  const {
    items,
    onInputValueChange,
    onSelectedItemChange,
    selectedItem,
    itemToString
  } = props;
  const isControlled = isControlledProp(props, "selectedItem");
  useEffect6(() => {
    if (isControlled) {
      dispatch({
        type: ControlledPropUpdatedSelectedItem,
        inputValue: itemToString(selectedItem)
      });
    }
  }, [selectedItem, isControlled, itemToString]);
  const onChangeText = (text) => {
    onInputValueChange?.({ inputValue: text });
    dispatchWithProps({ type: InputChange, inputValue: text });
  };
  const handleItemSelect = (item, index) => {
    onSelectedItemChange?.(item);
    dispatchWithProps({ type: ItemClick, index });
    Keyboard3.dismiss();
  };
  const getMenuItemProps = (item, index) => {
    return {
      onPress: () => handleItemSelect(item, index),
      accessible: true,
      accessiblityRole: "menuitem"
    };
  };
  const getMenuProps = () => {
    return {
      accessible: true,
      accessibilityRole: "menu",
      accessibilityHint: `Showing ${items.length} records`
    };
  };
  const getToggleButtonProps = () => {
    return {
      onPress: () => {
        dispatchWithProps({ type: ToggleButtonClick });
      }
    };
  };
  const getInputProps = (propInputVal, propOnchangeText) => {
    return {
      onChangeText: propInputVal ? propOnchangeText : onChangeText,
      value: propInputVal ? propInputVal : inputValue,
      accessibilityRole: "combobox",
      accessibilityLabel: "Typeahead input",
      accessibilityState: {
        expanded: isOpen
      }
    };
  };
  return {
    getInputProps,
    getMenuItemProps,
    getMenuProps,
    getToggleButtonProps,
    isOpen
  };
}

// node_modules/native-base/src/components/composites/Typeahead/Typeahead.tsx
import React170 from "react";
import { useButton } from "@react-native-aria/button";
import { useComboBoxState } from "@react-stately/combobox";
import { useComboBox } from "@react-native-aria/combobox";
import { useListBox, useOption } from "@react-native-aria/listbox";
import { ScrollView as ScrollView4, findNodeHandle, Platform as Platform44 } from "react-native";
import { Item as Item3 } from "@react-stately/collections";

// node_modules/native-base/src/components/composites/Typeahead/types.ts
var layoutPropsList = [
  "m",
  "mt",
  "mb",
  "ml",
  "mr",
  "position",
  "flex",
  "zIndex",
  "top",
  "right",
  "bottom",
  "left",
  "h",
  "w",
  "minW",
  "maxW",
  "minH",
  "maxH",
  "height",
  "width",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "flexBasis",
  "flexDirection",
  "flexGrow",
  "flexShrink",
  "flexWrap",
  "direction",
  "justify",
  "justifyContent",
  "align",
  "alignContent",
  "alignItems",
  "alignSelf"
];

// node_modules/native-base/src/components/composites/Typeahead/Typeahead.tsx
var Typeahead = React170.forwardRef(({
  onSelectedItemChange,
  options,
  renderItem,
  getOptionLabel,
  getOptionKey,
  onChange,
  numberOfItems,
  ...rest
}, ref) => {
  if (useHasResponsiveProps(rest)) {
    return null;
  }
  return /* @__PURE__ */ React170.createElement(ComboBoxImplementation, {
    ...rest,
    onSelectionChange: onSelectedItemChange,
    items: numberOfItems !== void 0 ? options.slice(0, numberOfItems) : options,
    onInputChange: onChange,
    ref
  }, (item) => {
    if (typeof item !== "string" && getOptionLabel === void 0) {
      throw new Error("Please use getOptionLabel prop");
    }
    if (item.id === void 0 && getOptionKey === void 0) {
      throw new Error("Please use getOptionKey prop");
    }
    const optionLabel = getOptionLabel ? getOptionLabel(item) : item;
    const optionKey = getOptionKey ? getOptionKey(item) : item.id !== void 0 ? item.id : optionLabel;
    return /* @__PURE__ */ React170.createElement(Item3, {
      textValue: optionLabel,
      key: optionKey
    }, renderItem ? renderItem(item) : /* @__PURE__ */ React170.createElement(Box_default, {
      p: 2,
      justifyContent: "center"
    }, /* @__PURE__ */ React170.createElement(Text_default, null, optionLabel)));
  });
});
var ComboBoxImplementation = React170.forwardRef((props, ref) => {
  const [layoutProps] = extractInObject(props, layoutPropsList);
  let state = useComboBoxState(props);
  let triggerRef = React170.useRef(null);
  let inputRef = React170.useRef(null);
  let listBoxRef = React170.useRef(null);
  let popoverRef = React170.useRef(null);
  let {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps,
    labelProps
  } = useComboBox({
    ...props,
    inputRef,
    buttonRef: triggerRef,
    listBoxRef,
    popoverRef,
    menuTrigger: "input"
  }, state);
  const toggleIconSetter = () => {
    if (typeof props.toggleIcon === "function")
      return props.toggleIcon({
        isOpen: state.isOpen
      });
    return props.toggleIcon;
  };
  let { buttonProps } = useButton(triggerProps);
  return /* @__PURE__ */ React170.createElement(Box_default, {
    flexDirection: "row",
    ...layoutProps,
    ref
  }, /* @__PURE__ */ React170.createElement(Box_default, {
    flex: 1
  }, props.label && /* @__PURE__ */ React170.createElement(Text_default, {
    ...labelProps,
    pb: 1
  }, props.label), /* @__PURE__ */ React170.createElement(Input_default, {
    ...inputProps,
    ref: inputRef,
    InputRightElement: /* @__PURE__ */ React170.createElement(Pressable_default, {
      ...buttonProps,
      ref: triggerRef
    }, toggleIconSetter())
  }), state.isOpen && /* @__PURE__ */ React170.createElement(ListBoxPopup, {
    ...listBoxProps,
    listBoxRef,
    popoverRef,
    state,
    label: props.label
  })));
});
function ListBoxPopup(props) {
  let { popoverRef, listBoxRef, state, dropdownHeight, label } = props;
  let { listBoxProps } = useListBox({
    label,
    autoFocus: state.focusStrategy,
    disallowEmptySelection: true
  }, state, listBoxRef);
  return /* @__PURE__ */ React170.createElement(Box_default, {
    ref: popoverRef
  }, /* @__PURE__ */ React170.createElement(Box_default, {
    position: "absolute",
    width: "100%",
    maxHeight: dropdownHeight ?? 200
  }, /* @__PURE__ */ React170.createElement(ScrollView4, {
    ...listBoxProps,
    keyboardShouldPersistTaps: "handled",
    ref: (node) => {
      if (Platform44.OS === "web") {
        listBoxRef.current = findNodeHandle(node);
      } else {
        listBoxRef.current = node;
      }
    }
  }, [...state.collection].map((item) => /* @__PURE__ */ React170.createElement(Option, {
    key: item.key,
    item,
    state
  })))));
}
function Option({ item, state }) {
  const searchItemStyle = useThemeProps("TypeAheadSearchItem", {});
  let ref = React170.useRef(null);
  let isDisabled = state.disabledKeys.has(item.key);
  let isSelected = state.selectionManager.isSelected(item.key);
  let isFocused = state.selectionManager.focusedKey === item.key;
  let { optionProps } = useOption({
    key: item.key,
    isDisabled,
    isSelected,
    shouldFocusOnHover: true,
    shouldUseVirtualFocus: true
  }, state, ref);
  let backgroundColor = searchItemStyle.backgroundColor;
  let opacity2 = 1;
  if (isSelected) {
    backgroundColor = searchItemStyle._focus.backgroundColor;
  } else if (isFocused) {
    backgroundColor = searchItemStyle._focus.backgroundColor;
  } else if (isDisabled) {
    opacity2 = 0.6;
    backgroundColor = searchItemStyle._disabled.backgroundColor;
  }
  return /* @__PURE__ */ React170.createElement(Pressable_default, {
    ...optionProps,
    opacity: opacity2,
    cursor: isDisabled ? Platform44.OS === "web" ? "not-allowed" : null : null,
    backgroundColor,
    ref
  }, item.rendered);
}

// node_modules/native-base/src/components/basic/View/View.tsx
import React171, { forwardRef as forwardRef85 } from "react";
import { View as RNView } from "react-native";
var StyledView = makeStyledComponent(RNView);
var View5 = forwardRef85((props, ref) => {
  const { ...resolvedProps } = usePropsResolution("View", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React171.createElement(StyledView, {
    ...resolvedProps,
    ref
  });
});

// node_modules/native-base/src/components/basic/StatusBar/StatusBar.tsx
import React172, { forwardRef as forwardRef86 } from "react";
import { StatusBar as RNStatusBar } from "react-native";
var StatusBar = forwardRef86((props, ref) => {
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React172.createElement(RNStatusBar, {
    ...props,
    ref
  });
});

// node_modules/native-base/src/components/basic/FlatList/FlatList.tsx
import React173, { forwardRef as forwardRef87 } from "react";
import { FlatList as RNFlatList } from "react-native";
var StyledFlatList = makeStyledComponent(RNFlatList);
var FlatList = forwardRef87((props, ref) => {
  const { ...resolvedProps } = usePropsResolution("FlatList", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React173.createElement(StyledFlatList, {
    ...resolvedProps,
    ref
  });
});

// node_modules/native-base/src/components/basic/SectionList/SectionList.tsx
import React174, { forwardRef as forwardRef88 } from "react";
import { SectionList as RNSectionList } from "react-native";
var StyledSectionList = makeStyledComponent(RNSectionList);
var SectionList = forwardRef88((props, ref) => {
  const { ...resolvedProps } = usePropsResolution("SectionList", props);
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React174.createElement(StyledSectionList, {
    ...resolvedProps,
    ref
  });
});

// node_modules/native-base/src/components/basic/KeyboardAvoidingView/KeyboardAvoidingView.tsx
import React175, { forwardRef as forwardRef89 } from "react";
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from "react-native";
var StyledKeyboardAvoidingView = makeStyledComponent(RNKeyboardAvoidingView);
var KeyboardAvoidingView = forwardRef89((props, ref) => {
  const { ...resolvedProps } = usePropsResolution("KeyboardAvoidingView", props, {});
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return /* @__PURE__ */ React175.createElement(StyledKeyboardAvoidingView, {
    ...resolvedProps,
    ref
  });
});

// node_modules/native-base/src/core/NativeBaseProvider.tsx
import React177 from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics as defaultInitialWindowMetrics
} from "react-native-safe-area-context";
import { SSRProvider } from "@react-native-aria/utils";

// node_modules/native-base/src/core/hybrid-overlay/HybridProvider.tsx
import React176 from "react";
import { Platform as Platform45 } from "react-native";
var HybridProvider = ({
  children,
  options: {
    initialColorMode = "light",
    accessibleColors: isTextColorAccessible = false,
    useSystemColorMode
  },
  colorModeManager
}) => {
  const { colorMode, setColorMode } = useModeManager(initialColorMode, useSystemColorMode, colorModeManager);
  const toggleColorMode = React176.useCallback(() => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  }, [colorMode, setColorMode]);
  const [accessibleColors, setAccessibleColors] = React176.useState(isTextColorAccessible);
  React176.useEffect(() => {
    let escapeKeyListener = null;
    if (Platform45.OS === "web") {
      escapeKeyListener = (e) => {
        if (e.key === "Escape") {
          if (keyboardDismissHandlerManager.length() > 0) {
            const lastHandler = keyboardDismissHandlerManager.pop();
            lastHandler();
          }
        }
      };
      document.addEventListener("keydown", escapeKeyListener);
    }
    return () => {
      if (Platform45.OS === "web") {
        document.removeEventListener("keydown", escapeKeyListener);
      }
    };
  }, []);
  return /* @__PURE__ */ React176.createElement(HybridContext.Provider, {
    value: {
      colorMode: {
        colorMode,
        toggleColorMode,
        setColorMode,
        accessibleColors,
        setAccessibleColors
      }
    }
  }, children);
};
var HybridProvider_default = HybridProvider;

// node_modules/native-base/src/core/NativeBaseProvider.tsx
import { OverlayProvider } from "@react-native-aria/overlays";
import { Platform as Platform46, useWindowDimensions as useWindowDimensions4 } from "react-native";
var defaultInitialWindowMetricsBasedOnPlatform = Platform46.select({
  web: {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 }
  },
  default: defaultInitialWindowMetrics
});
var NativeBaseProvider = (props) => {
  const {
    colorModeManager,
    config: config2 = defaultConfig,
    children,
    theme: propsTheme = theme2,
    initialWindowMetrics,
    isSSR
  } = props;
  const theme3 = config2.theme ?? propsTheme;
  const newTheme = React177.useMemo(() => {
    if (config2.enableRem) {
      return platformSpecificSpaceUnits(theme3);
    }
    return theme3;
  }, [config2.enableRem, theme3]);
  const windowWidth = useWindowDimensions4()?.width;
  const currentBreakpoint = React177.useMemo(() => getClosestBreakpoint(newTheme.breakpoints, windowWidth), [windowWidth, newTheme.breakpoints]);
  return /* @__PURE__ */ React177.createElement(NativeBaseConfigProvider, {
    theme: newTheme,
    config: config2,
    currentBreakpoint,
    isSSR
  }, /* @__PURE__ */ React177.createElement(SafeAreaProvider, {
    initialMetrics: initialWindowMetrics ?? defaultInitialWindowMetricsBasedOnPlatform
  }, /* @__PURE__ */ React177.createElement(HybridProvider_default, {
    colorModeManager,
    options: theme3.config
  }, /* @__PURE__ */ React177.createElement(OverlayProvider, null, /* @__PURE__ */ React177.createElement(ToastProvider, null, /* @__PURE__ */ React177.createElement(InitializeToastRef, null), /* @__PURE__ */ React177.createElement(SSRProvider, null, children))))));
};
var InitializeToastRef = () => {
  const toast = useToast();
  ToastRef.current = toast;
  return null;
};

// node_modules/native-base/src/core/extendTheme.tsx
import mergeWith2 from "lodash.mergewith";
function isFunction(value) {
  return typeof value === "function";
}
function extendTheme(overrides, ...restOverrides) {
  function customizer(source, override) {
    if (isFunction(source)) {
      return (...args) => {
        const sourceValue = source(...args);
        const overrideValue = isFunction(override) ? override(...args) : override;
        return mergeWith2({}, sourceValue, overrideValue, customizer);
      };
    }
    return void 0;
  }
  const finalOverrides = [overrides, ...restOverrides].reduce((prevValue, currentValue) => {
    return mergeWith2({}, prevValue, currentValue, customizer);
  }, theme2);
  return finalOverrides;
}

// node_modules/native-base/src/theme/v3-compatible-theme/index.ts
var v3CompatibleTheme = {
  borders: {
    "none": 0,
    "1px": "1px solid",
    "2px": "2px solid",
    "4px": "4px solid"
  },
  breakpoints: {
    base: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1280
  },
  colors: {
    contrastThreshold: 7,
    white: "#FFFFFF",
    black: "#000000",
    lightText: "#FFFFFF",
    darkText: "#000000",
    rose: {
      "50": "#fff1f2",
      "100": "#ffe4e6",
      "200": "#fecdd3",
      "300": "#fda4af",
      "400": "#fb7185",
      "500": "#f43f5e",
      "600": "#e11d48",
      "700": "#be123c",
      "800": "#9f1239",
      "900": "#881337"
    },
    pink: {
      "50": "#fdf2f8",
      "100": "#fce7f3",
      "200": "#fbcfe8",
      "300": "#f9a8d4",
      "400": "#f472b6",
      "500": "#ec4899",
      "600": "#db2777",
      "700": "#be185d",
      "800": "#9d174d",
      "900": "#831843"
    },
    fuchsia: {
      "50": "#fdf4ff",
      "100": "#fae8ff",
      "200": "#f5d0fe",
      "300": "#f0abfc",
      "400": "#e879f9",
      "500": "#d946ef",
      "600": "#c026d3",
      "700": "#a21caf",
      "800": "#86198f",
      "900": "#701a75"
    },
    purple: {
      "50": "#faf5ff",
      "100": "#f3e8ff",
      "200": "#e9d5ff",
      "300": "#d8b4fe",
      "400": "#c084fc",
      "500": "#a855f7",
      "600": "#9333ea",
      "700": "#7e22ce",
      "800": "#6b21a8",
      "900": "#581c87"
    },
    violet: {
      "50": "#f5f3ff",
      "100": "#ede9fe",
      "200": "#ddd6fe",
      "300": "#c4b5fd",
      "400": "#a78bfa",
      "500": "#8b5cf6",
      "600": "#7c3aed",
      "700": "#6d28d9",
      "800": "#5b21b6",
      "900": "#4c1d95"
    },
    indigo: {
      "50": "#eef2ff",
      "100": "#e0e7ff",
      "200": "#c7d2fe",
      "300": "#a5b4fc",
      "400": "#818cf8",
      "500": "#6366f1",
      "600": "#4f46e5",
      "700": "#4338ca",
      "800": "#3730a3",
      "900": "#312e81"
    },
    blue: {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "200": "#bfdbfe",
      "300": "#93c5fd",
      "400": "#60a5fa",
      "500": "#3b82f6",
      "600": "#2563eb",
      "700": "#1d4ed8",
      "800": "#1e40af",
      "900": "#1e3a8a"
    },
    lightBlue: {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "200": "#bae6fd",
      "300": "#7dd3fc",
      "400": "#38bdf8",
      "500": "#0ea5e9",
      "600": "#0284c7",
      "700": "#0369a1",
      "800": "#075985",
      "900": "#0c4a6e"
    },
    darkBlue: {
      "50": "#dbf4ff",
      "100": "#addbff",
      "200": "#7cc2ff",
      "300": "#4aa9ff",
      "400": "#1a91ff",
      "500": "#0077e6",
      "600": "#005db4",
      "700": "#004282",
      "800": "#002851",
      "900": "#000e21"
    },
    cyan: {
      "50": "#ecfeff",
      "100": "#cffafe",
      "200": "#a5f3fc",
      "300": "#67e8f9",
      "400": "#22d3ee",
      "500": "#06b6d4",
      "600": "#0891b2",
      "700": "#0e7490",
      "800": "#155e75",
      "900": "#164e63"
    },
    teal: {
      "50": "#f0fdfa",
      "100": "#ccfbf1",
      "200": "#99f6e4",
      "300": "#5eead4",
      "400": "#2dd4bf",
      "500": "#14b8a6",
      "600": "#0d9488",
      "700": "#0f766e",
      "800": "#115e59",
      "900": "#134e4a"
    },
    emerald: {
      "50": "#ecfdf5",
      "100": "#d1fae5",
      "200": "#a7f3d0",
      "300": "#6ee7b7",
      "400": "#34d399",
      "500": "#10b981",
      "600": "#059669",
      "700": "#047857",
      "800": "#065f46",
      "900": "#064e3b"
    },
    green: {
      "50": "#f0fdf4",
      "100": "#dcfce7",
      "200": "#bbf7d0",
      "300": "#86efac",
      "400": "#4ade80",
      "500": "#22c55e",
      "600": "#16a34a",
      "700": "#15803d",
      "800": "#166534",
      "900": "#14532d"
    },
    lime: {
      "50": "#f7fee7",
      "100": "#ecfccb",
      "200": "#d9f99d",
      "300": "#bef264",
      "400": "#a3e635",
      "500": "#84cc16",
      "600": "#65a30d",
      "700": "#4d7c0f",
      "800": "#3f6212",
      "900": "#365314"
    },
    yellow: {
      "50": "#fefce8",
      "100": "#fef9c3",
      "200": "#fef08a",
      "300": "#fde047",
      "400": "#facc15",
      "500": "#eab308",
      "600": "#ca8a04",
      "700": "#a16207",
      "800": "#854d0e",
      "900": "#713f12"
    },
    amber: {
      "50": "#fffbeb",
      "100": "#fef3c7",
      "200": "#fde68a",
      "300": "#fcd34d",
      "400": "#fbbf24",
      "500": "#f59e0b",
      "600": "#d97706",
      "700": "#b45309",
      "800": "#92400e",
      "900": "#78350f"
    },
    orange: {
      "50": "#fff7ed",
      "100": "#ffedd5",
      "200": "#fed7aa",
      "300": "#fdba74",
      "400": "#fb923c",
      "500": "#f97316",
      "600": "#ea580c",
      "700": "#c2410c",
      "800": "#9a3412",
      "900": "#7c2d12"
    },
    red: {
      "50": "#fef2f2",
      "100": "#fee2e2",
      "200": "#fecaca",
      "300": "#fca5a5",
      "400": "#f87171",
      "500": "#ef4444",
      "600": "#dc2626",
      "700": "#b91c1c",
      "800": "#991b1b",
      "900": "#7f1d1d"
    },
    warmGray: {
      "50": "#fafaf9",
      "100": "#f5f5f4",
      "200": "#e7e5e4",
      "300": "#d6d3d1",
      "400": "#a8a29e",
      "500": "#78716c",
      "600": "#57534e",
      "700": "#44403c",
      "800": "#292524",
      "900": "#1c1917"
    },
    trueGray: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#e5e5e5",
      "300": "#d4d4d4",
      "400": "#a3a3a3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717"
    },
    gray: {
      "50": "#fafafa",
      "100": "#f4f4f5",
      "200": "#e4e4e7",
      "300": "#d4d4d8",
      "400": "#a1a1aa",
      "500": "#71717a",
      "600": "#52525b",
      "700": "#3f3f46",
      "800": "#27272a",
      "900": "#18181b"
    },
    coolGray: {
      "50": "#f9fafb",
      "100": "#f3f4f6",
      "200": "#e5e7eb",
      "300": "#d1d5db",
      "400": "#9ca3af",
      "500": "#6b7280",
      "600": "#4b5563",
      "700": "#374151",
      "800": "#1f2937",
      "900": "#111827"
    },
    blueGray: {
      "50": "#f8fafc",
      "100": "#f1f5f9",
      "200": "#e2e8f0",
      "300": "#cbd5e1",
      "400": "#94a3b8",
      "500": "#64748b",
      "600": "#475569",
      "700": "#334155",
      "800": "#1e293b",
      "900": "#0f172a"
    },
    dark: {
      "50": "#18181b",
      "100": "#27272a",
      "200": "#3f3f46",
      "300": "#52525b",
      "400": "#71717a",
      "500": "#a1a1aa",
      "600": "#d4d4d8",
      "700": "#e4e4e7",
      "800": "#f4f4f5",
      "900": "#fafafa"
    },
    danger: {
      "50": "#fff1f2",
      "100": "#ffe4e6",
      "200": "#fecdd3",
      "300": "#fda4af",
      "400": "#fb7185",
      "500": "#f43f5e",
      "600": "#e11d48",
      "700": "#be123c",
      "800": "#9f1239",
      "900": "#881337"
    },
    error: {
      "50": "#fef2f2",
      "100": "#fee2e2",
      "200": "#fecaca",
      "300": "#fca5a5",
      "400": "#f87171",
      "500": "#ef4444",
      "600": "#dc2626",
      "700": "#b91c1c",
      "800": "#991b1b",
      "900": "#7f1d1d"
    },
    success: {
      "50": "#f0fdf4",
      "100": "#dcfce7",
      "200": "#bbf7d0",
      "300": "#86efac",
      "400": "#4ade80",
      "500": "#22c55e",
      "600": "#16a34a",
      "700": "#15803d",
      "800": "#166534",
      "900": "#14532d"
    },
    warning: {
      "50": "#fff7ed",
      "100": "#ffedd5",
      "200": "#fed7aa",
      "300": "#fdba74",
      "400": "#fb923c",
      "500": "#f97316",
      "600": "#ea580c",
      "700": "#c2410c",
      "800": "#9a3412",
      "900": "#7c2d12"
    },
    muted: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#e5e5e5",
      "300": "#d4d4d4",
      "400": "#a3a3a3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717"
    },
    primary: {
      "50": "#ecfeff",
      "100": "#cffafe",
      "200": "#a5f3fc",
      "300": "#67e8f9",
      "400": "#22d3ee",
      "500": "#06b6d4",
      "600": "#0891b2",
      "700": "#0e7490",
      "800": "#155e75",
      "900": "#164e63"
    },
    info: {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "200": "#bae6fd",
      "300": "#7dd3fc",
      "400": "#38bdf8",
      "500": "#0ea5e9",
      "600": "#0284c7",
      "700": "#0369a1",
      "800": "#075985",
      "900": "#0c4a6e"
    },
    secondary: {
      "50": "#fdf2f8",
      "100": "#fce7f3",
      "200": "#fbcfe8",
      "300": "#f9a8d4",
      "400": "#f472b6",
      "500": "#ec4899",
      "600": "#db2777",
      "700": "#be185d",
      "800": "#9d174d",
      "900": "#831843"
    },
    light: {
      "50": "#fafaf9",
      "100": "#f5f5f4",
      "200": "#e7e5e4",
      "300": "#d6d3d1",
      "400": "#a8a29e",
      "500": "#78716c",
      "600": "#57534e",
      "700": "#44403c",
      "800": "#292524",
      "900": "#1c1917"
    },
    tertiary: {
      "50": "#ecfdf5",
      "100": "#d1fae5",
      "200": "#a7f3d0",
      "300": "#6ee7b7",
      "400": "#34d399",
      "500": "#10b981",
      "600": "#059669",
      "700": "#047857",
      "800": "#065f46",
      "900": "#064e3b"
    }
  },
  radii: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 6,
    xl: 8,
    pill: 25,
    full: 9999
  },
  letterSpacings: {
    "xxs": -1.5,
    "xs": -0.5,
    "sm": 0,
    "md": 0.1,
    "lg": 0.15,
    "xl": 0.25,
    "2xl": 0.4,
    "3xl": 0.5,
    "4xl": 1.25,
    "5xl": 1.5
  },
  lineHeights: {
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "7": "28px",
    "8": "32px",
    "9": "36px",
    "10": "40px",
    "none": 1,
    "shorter": 1.25,
    "short": 1.375,
    "base": 1.5,
    "tall": 1.625,
    "taller": "2"
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  fonts: {},
  fontSizes: {
    "xxs": 10,
    "xs": 12,
    "sm": 14,
    "md": 16,
    "lg": 18,
    "xl": 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
    "7xl": 72,
    "8xl": 96,
    "9xl": 128
  },
  sizes: {
    "0": "0px",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "7": "28px",
    "8": "32px",
    "9": "36px",
    "10": "40px",
    "12": "48px",
    "16": "64px",
    "20": "80px",
    "24": "96px",
    "32": "128px",
    "40": "160px",
    "48": "192px",
    "56": "224px",
    "64": "256px",
    "72": "288px",
    "80": "320px",
    "96": "384px",
    "px": "1px",
    "0.5": "2px",
    "1.5": "6px",
    "2.5": "10px",
    "3.5": "14px",
    "3xs": "224px",
    "2xs": "256px",
    "xs": "320px",
    "sm": "384px",
    "md": "448px",
    "lg": "512px",
    "xl": "576px",
    "2xl": "672px",
    "container": {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    }
  },
  space: {
    "0": "0px",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "7": "28px",
    "8": "32px",
    "9": "36px",
    "10": "40px",
    "12": "48px",
    "16": "64px",
    "20": "80px",
    "24": "96px",
    "32": "128px",
    "40": "160px",
    "48": "192px",
    "56": "224px",
    "64": "256px",
    "72": "288px",
    "80": "320px",
    "96": "384px",
    "px": "1px",
    "0.5": "2px",
    "1.5": "6px",
    "2.5": "10px",
    "3.5": "14px"
  },
  components: {
    FlatList: {
      baseStyle: {},
      defaultProps: {}
    },
    KeyboardAvoidingView: {
      baseStyle: {},
      defaultProps: {}
    },
    ScrollView: {
      baseStyle: {},
      defaultProps: {}
    },
    SectionList: {
      baseStyle: {},
      defaultProps: {}
    },
    StatusBar: {
      baseStyle: {},
      defaultProps: {}
    },
    Accordion: {},
    AccordionItem: {},
    AccordionIcon: {},
    AccordionSummary: {},
    AccordionDetails: {
      baseStyle: {
        p: 3
      }
    },
    Actionsheet: {
      defaultProps: {
        size: "full"
      }
    },
    ActionsheetContent: {
      baseStyle: {
        alignItems: "center",
        p: 2,
        borderRadius: "none",
        roundedTop: 10,
        _dragIndicator: {
          bg: "coolGray.400",
          height: 1,
          width: 9,
          borderRadius: 2
        }
      }
    },
    ActionsheetItem: {
      defaultProps: {
        variant: "unstyled"
      }
    },
    Alert: {
      baseStyle: {
        alignItems: "center",
        justifyContent: "flex-start",
        p: 3,
        space: 3,
        borderRadius: "md",
        _actionProps: {
          alignSelf: "center",
          ml: "auto"
        },
        _text: {
          fontSize: "sm",
          lineHeight: 5,
          color: "gray.700"
        }
      },
      variants: {},
      defaultProps: {
        colorScheme: "primary",
        variant: "subtle"
      }
    },
    AlertDescription: {
      baseStyle: {
        _text: {
          fontSize: "sm"
        },
        flexShrink: 1
      }
    },
    AlertTitle: {
      baseStyle: {
        _text: {
          fontSize: "md",
          lineHeight: 5,
          fontWeight: "bold"
        }
      }
    },
    AlertIcon: {
      baseStyle: {
        size: 6
      }
    },
    Avatar: {
      sizes: {
        "2xs": {
          width: "4",
          height: "4",
          fontSize: "xs"
        },
        "xs": {
          width: "6",
          height: "6",
          fontSize: "sm"
        },
        "sm": {
          width: "8",
          height: "8",
          fontSize: "md"
        },
        "md": {
          width: "12",
          height: "12",
          fontSize: "lg"
        },
        "lg": {
          width: "16",
          height: "16",
          fontSize: "xl"
        },
        "xl": {
          width: "24",
          height: "24",
          fontSize: "2xl"
        },
        "2xl": {
          width: "32",
          height: "32",
          fontSize: "3xl"
        },
        "full": {
          width: "100%",
          height: "100%",
          fontSize: "4xl"
        }
      },
      defaultProps: {
        size: "md"
      }
    },
    AvatarBadge: {},
    AvatarGroup: {},
    Badge: {
      baseStyle: {
        px: 1,
        _text: {
          fontSize: "xs",
          fontWeight: "bold"
        }
      },
      variants: {},
      defaultProps: {
        variant: "subtle",
        colorScheme: "muted"
      }
    },
    Box: {
      baseStyle: {},
      defaultProps: {}
    },
    Breadcrumb: {
      baseStyle: {
        width: "auto",
        height: "auto",
        display: "flex",
        flexDirection: "row"
      },
      defaultProps: {
        direction: "row",
        wrap: "wrap"
      }
    },
    Button: {
      variants: {},
      sizes: {
        lg: {
          px: 6,
          py: 3,
          _text: {
            fontSize: "lg"
          }
        },
        md: {
          px: 4,
          py: 3,
          _text: {
            fontSize: "md"
          }
        },
        sm: {
          px: 4,
          py: 2,
          _text: {
            fontSize: "sm"
          }
        },
        xs: {
          px: 2,
          py: 1,
          _text: {
            fontSize: "xs"
          }
        }
      },
      defaultProps: {
        variant: "solid",
        size: "md",
        colorScheme: "primary"
      }
    },
    ButtonGroup: {
      baseStyle: {
        direction: "row"
      },
      defaultProps: {
        space: 2
      }
    },
    Center: {
      sizes: {
        "xs": {
          height: 10,
          width: 10
        },
        "sm": {
          height: 12,
          width: 12
        },
        "md": {
          height: 16,
          width: 16
        },
        "lg": {
          height: 24,
          width: 24
        },
        "xl": {
          height: 32,
          width: 32
        },
        "2xl": {
          height: 40,
          width: 40
        }
      }
    },
    Checkbox: {
      sizes: {
        lg: {
          _icon: {
            size: 6
          },
          _text: {
            fontSize: "xl"
          }
        },
        md: {
          _icon: {
            size: 5
          },
          _text: {
            fontSize: "lg"
          }
        },
        sm: {
          _icon: {
            size: 4
          },
          _text: {
            fontSize: "md"
          }
        }
      },
      defaultProps: {
        defaultIsChecked: false,
        size: "sm",
        colorScheme: "primary"
      }
    },
    CircularProgress: {
      sizes: {
        "xs": {
          height: 6,
          width: 6
        },
        "sm": {
          height: 8,
          width: 8
        },
        "md": {
          height: 16,
          width: 16
        },
        "lg": {
          height: 20,
          width: 20
        },
        "xl": {
          height: 24,
          width: 24
        },
        "2xl": {
          height: 32,
          width: 32
        }
      },
      defaultProps: {
        thickness: 8,
        colorScheme: "primary",
        size: "lg"
      }
    },
    Code: {
      baseStyle: {
        _text: {
          fontFamily: "monospace",
          fontSize: "sm"
        },
        borderRadius: "sm",
        px: 2,
        py: 1
      },
      variants: {},
      defaultProps: {
        variant: "subtle",
        colorScheme: "muted"
      }
    },
    Container: {
      baseStyle: {
        maxWidth: "80%"
      }
    },
    Divider: {
      defaultProps: {
        orientation: "horizontal",
        size: 1
      }
    },
    Fade: {
      defaultProps: {
        entryDuration: 500,
        exitDuration: 500
      }
    },
    FAB: {
      baseStyle: {
        shadow: 7
      },
      defaultProps: {
        variant: "solid",
        colorScheme: "primary",
        rounded: "full",
        zIndex: 20,
        placementProps: {
          "top-right": {
            top: 12,
            right: 4,
            position: "absolute"
          },
          "top-left": {
            top: 12,
            left: 4,
            position: "absolute"
          },
          "bottom-right": {
            bottom: 4,
            right: 4,
            position: "absolute"
          },
          "bottom-left": {
            bottom: 4,
            left: 4,
            position: "absolute"
          }
        },
        p: 4,
        placement: "bottom-right"
      }
    },
    Flex: {
      defaultProps: {
        flexDirection: "column"
      }
    },
    FormControl: {},
    FormControlLabel: {
      baseStyle: {
        _text: {
          fontSize: "md"
        },
        astrickColor: "error.400",
        mb: 2,
        mr: 3
      }
    },
    FormControlHelperText: {},
    FormControlErrorMessage: {
      baseStyle: {
        mt: 2,
        _text: {
          fontSize: "xs",
          color: "error.400"
        }
      }
    },
    Heading: {
      sizes: {
        "4xl": {
          fontSize: ["6xl", null, "7xl"]
        },
        "3xl": {
          fontSize: ["5xl", null, "6xl"]
        },
        "2xl": {
          fontSize: ["4xl", null, "5xl"]
        },
        "xl": {
          fontSize: ["3xl", null, "4xl"]
        },
        "lg": {
          fontSize: ["2xl", null, "3xl"]
        },
        "md": {
          fontSize: "xl"
        },
        "sm": {
          fontSize: "md"
        },
        "xs": {
          fontSize: "sm"
        }
      },
      defaultProps: {
        size: "xl"
      }
    },
    HStack: {
      baseStyle: {},
      defaultProps: {}
    },
    VStack: {
      baseStyle: {},
      defaultProps: {}
    },
    Icon: {
      sizes: {
        "xxs": 2,
        "xs": 4,
        "sm": 6,
        "md": 8,
        "lg": 10,
        "xl": 12,
        "2xl": 16,
        "3xl": 20,
        "4xl": 24,
        "5xl": 32,
        "6xl": 64
      },
      defaultProps: {
        size: "md",
        color: "primary"
      }
    },
    IconButton: {
      baseStyle: {
        borderRadius: "md"
      },
      sizes: {
        lg: {
          p: 3
        },
        md: {
          p: 2
        },
        sm: {
          p: 1
        }
      },
      defaultProps: {
        variant: "ghost",
        size: "md"
      }
    },
    Image: {
      baseStyle: {
        maxWidth: "100%"
      },
      sizes: {
        "2xs": {
          size: 6
        },
        "xs": {
          size: 10
        },
        "sm": {
          size: 16
        },
        "md": {
          size: 20
        },
        "lg": {
          size: 24
        },
        "xl": {
          size: 32
        },
        "2xl": {
          size: 64
        },
        "full": {
          size: "100%"
        }
      },
      defaultProps: {}
    },
    Input: {
      defaultProps: {
        size: "md",
        variant: "outline"
      },
      variants: {},
      sizes: {
        "2xl": {
          fontSize: "2xl"
        },
        "xl": {
          fontSize: "xl"
        },
        "lg": {
          fontSize: "lg"
        },
        "md": {
          fontSize: "md"
        },
        "sm": {
          fontSize: "sm"
        },
        "xs": {
          fontSize: "xs"
        }
      }
    },
    Kbd: {
      defaultProps: {}
    },
    Link: {
      baseStyle: {
        width: "auto",
        height: "auto"
      }
    },
    List: {},
    ListItem: {
      baseStyle: {
        py: 2,
        borderColor: "gray.300"
      },
      defaultProps: {
        start: 1
      }
    },
    ListIcon: {
      baseStyle: {
        mr: 8,
        size: "md"
      }
    },
    Menu: {},
    MenuGroup: {},
    MenuItem: {
      defaultProps: {
        _disabled: {
          opacity: 0.5
        }
      }
    },
    Modal: {
      baseStyle: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      },
      sizes: {
        sm: {
          contentSize: {
            width: "60%"
          }
        },
        md: {
          contentSize: {
            width: "75%"
          }
        },
        lg: {
          contentSize: {
            width: "90%"
          }
        },
        full: {
          contentSize: {
            width: "100%"
          }
        }
      },
      defaultProps: {
        size: "lg",
        closeOnOverlayClick: true
      }
    },
    ModalContent: {},
    ModalHeader: {
      baseStyle: {
        pb: 3,
        pr: 6,
        _text: {
          fontSize: "xl",
          fontWeight: "bold"
        }
      }
    },
    ModalBody: {},
    ModalFooter: {
      baseStyle: {
        py: 2,
        flexDirection: "row",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        pr: 2
      }
    },
    ModalOverlay: {
      baseStyle: {
        position: "absolute",
        left: 0,
        top: 0,
        opacity: 0.5,
        right: 0,
        bottom: 0
      }
    },
    ModalCloseButton: {},
    NumberInput: {
      defaultProps: {
        size: "sm",
        step: 1,
        min: null,
        max: null,
        defaultValue: "0",
        keepWithinRange: true,
        clampValueOnBlur: true,
        focusInputOnChange: true,
        getAriaValueText: true
      }
    },
    NumberInputStepper: {},
    PinInput: {
      sizes: {
        "2xl": {
          fontSize: "2xl",
          p: 3,
          width: "56px",
          height: "56px",
          textAlign: "center",
          borderRadius: "lg"
        },
        "xl": {
          fontSize: "xl",
          p: 3,
          width: "52px",
          height: "52px",
          textAlign: "center",
          borderRadius: "lg"
        },
        "lg": {
          fontSize: "lg",
          p: 2,
          width: "48px",
          height: "48px",
          textAlign: "center",
          borderRadius: "md"
        },
        "md": {
          fontSize: "md",
          p: 2,
          width: "40px",
          height: "40px",
          textAlign: "center",
          borderRadius: "md"
        },
        "sm": {
          fontSize: "sm",
          p: 1,
          width: "30px",
          height: "30px",
          textAlign: "center",
          borderRadius: "md"
        },
        "xs": {
          fontSize: "xs",
          p: 1,
          width: "24px",
          height: "24px",
          textAlign: "center",
          borderRadius: "md"
        }
      },
      defaultProps: {
        placeholder: "\u25CB",
        size: "md",
        manageFocus: true,
        space: 1
      }
    },
    PopoverCloseButton: {},
    PopoverBody: {},
    PopoverContent: {},
    PopoverHeader: {
      baseStyle: {
        p: 3,
        _text: {
          fontWeight: 600
        }
      }
    },
    PopoverArrow: {},
    PopoverFooter: {},
    Progress: {
      defaultProps: {
        colorScheme: "primary",
        size: "sm",
        rounded: "full",
        min: 0,
        max: 100,
        value: 0,
        isIndeterminate: false
      },
      sizes: {
        "xs": {
          height: 1
        },
        "sm": {
          height: 2
        },
        "md": {
          height: 3
        },
        "lg": {
          height: 4
        },
        "xl": {
          height: 5
        },
        "2xl": {
          height: 6
        }
      }
    },
    Radio: {
      sizes: {
        lg: {
          _icon: {
            size: 4
          },
          _text: {
            fontSize: "lg"
          }
        },
        md: {
          _icon: {
            size: 3
          },
          _text: {
            fontSize: "md"
          }
        },
        sm: {
          _icon: {
            size: 2
          },
          _text: {
            fontSize: "sm"
          }
        }
      },
      defaultProps: {
        defaultIsChecked: false,
        size: "md",
        colorScheme: "primary"
      }
    },
    ScaleFade: {
      defaultProps: {
        duration: 500,
        initialScale: 0.9
      }
    },
    Select: {
      baseStyle: {
        customDropdownIconProps: {
          size: 5,
          mr: 2
        },
        _actionSheetContent: {}
      },
      defaultProps: {
        variant: "outline"
      }
    },
    SelectItem: {
      baseStyle: {
        p: 1,
        px: 2,
        borderRadius: 0,
        minH: 0
      }
    },
    SimpleGrid: {
      baseStyle: {},
      defaultProps: {}
    },
    Skeleton: {
      defaultProps: {
        variant: "text"
      }
    },
    SliderFilledTrack: {},
    SliderThumb: {},
    SliderTrack: {},
    Slider: {
      defaultProps: {
        size: "sm"
      },
      sizes: {
        lg: {
          thumbSize: 6,
          sliderSize: 6
        },
        md: {
          thumbSize: 5,
          sliderSize: 5
        },
        sm: {
          thumbSize: 4,
          sliderSize: 4
        }
      }
    },
    Slide: {
      defaultProps: {
        duration: 500,
        placement: "bottom"
      }
    },
    SlideFade: {
      defaultProps: {
        duration: 500,
        offsetX: 10,
        offsetY: 10
      }
    },
    Spinner: {
      baseStyle: {
        color: "primary.400"
      },
      sizes: {
        sm: "small",
        lg: "large"
      },
      defaultProps: {
        size: "large"
      }
    },
    Stack: {
      baseStyle: {},
      defaultProps: {},
      sizes: {
        "gutter": 0,
        "2xs": 1,
        "xs": 2,
        "sm": 3,
        "md": 4,
        "lg": 6,
        "xl": 7,
        "2xl": 8
      }
    },
    Stat: {
      defaultProps: {
        _statLabel: {
          fontSize: "xl"
        },
        _statNumber: {
          fontSize: "4xl",
          fontWeight: "bold",
          my: 2
        },
        _statHelpText: {
          _text: {
            color: "gray.500",
            fontSize: "xl"
          },
          flexDirection: "row",
          alignItems: "center"
        },
        _statGroup: {
          flexWrap: "wrap",
          space: 4,
          justifyContent: "space-between"
        }
      }
    },
    Switch: {
      sizes: {
        sm: {
          style: {
            transform: [
              {
                scale: 0.75
              }
            ]
          }
        },
        md: {},
        lg: {
          style: {
            transform: [
              {
                scale: 1.25
              }
            ]
          },
          margin: 1
        }
      },
      defaultProps: {
        size: "md",
        colorScheme: "primary"
      }
    },
    Tabs: {
      variants: {},
      sizes: {
        sm: {
          activeTabStyle: {
            _text: {
              fontSize: "sm"
            },
            py: 2,
            px: 3
          },
          inactiveTabStyle: {
            _text: {
              fontSize: "sm"
            },
            py: 2,
            px: 3
          }
        },
        md: {
          activeTabStyle: {
            _text: {
              fontSize: "md"
            },
            py: 3,
            px: 4
          },
          inactiveTabStyle: {
            _text: {
              fontSize: "md"
            },
            py: 3,
            px: 4
          }
        },
        lg: {
          activeTabStyle: {
            _text: {
              fontSize: "lg"
            },
            py: 4,
            px: 5
          },
          inactiveTabStyle: {
            _text: {
              fontSize: "lg"
            },
            py: 4,
            px: 5
          }
        }
      },
      defaultProps: {
        size: "md",
        variant: "outline",
        colorScheme: "primary"
      }
    },
    Tag: {
      variants: {},
      baseStyle: {
        _text: {
          fontWeight: "medium"
        },
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        display: "flex"
      },
      sizes: {
        sm: {
          minH: 5,
          minW: 5,
          _text: {
            fontSize: "xs"
          },
          p: 1,
          borderRadius: "sm"
        },
        md: {
          minH: 6,
          minW: 6,
          _text: {
            fontSize: "sm"
          },
          borderRadius: "md",
          p: 2
        },
        lg: {
          minH: 8,
          minW: 8,
          _text: {
            fontSize: "md"
          },
          borderRadius: "md",
          p: 3
        }
      },
      defaultProps: {
        size: "md",
        variant: "subtle",
        colorScheme: "primary"
      }
    },
    Text: {
      defaultProps: {}
    },
    AppBar: {
      defaultProps: {
        colorScheme: "primary"
      }
    },
    TextArea: {
      baseStyle: {
        multiline: true,
        px: 4,
        py: 2,
        totalLines: 4,
        _ios: {
          h: 20
        }
      }
    },
    TextField: {
      defaultProps: {
        component: "input"
      }
    },
    Toast: {
      defaultProps: {}
    },
    TypeAheadSearchItem: {},
    View: {
      baseStyle: {},
      defaultProps: {}
    },
    Wrap: {},
    ZStack: {
      baseStyle: {},
      defaultProps: {}
    },
    Tooltip: {}
  },
  config: {}
};

// node_modules/native-base/src/index.tsx
var src_default = {
  multiply(a, b) {
    return Promise.resolve(a * b);
  }
};
export {
  Accordion3 as Accordion,
  Actionsheet3 as Actionsheet,
  AddIcon,
  Alert3 as Alert,
  AlertDialogMain as AlertDialog,
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  AspectRatio_default as AspectRatio,
  Avatar2 as Avatar,
  Backdrop_default as Backdrop,
  Badge_default as Badge,
  Box_default as Box,
  Breadcrumb3 as Breadcrumb,
  Button2 as Button,
  Card_default2 as Card,
  Center_default as Center,
  CheckCircleIcon,
  CheckIcon,
  Checkbox2 as Checkbox,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Circle_default as Circle,
  CircleIcon,
  CircularProgress_default2 as CircularProgress,
  CloseIcon,
  Code_default as Code,
  Collapse_default as Collapse,
  VStack_default as Column,
  Container_default as Container,
  Divider_default as Divider,
  Drawer_default as Drawer,
  Fab_default as Fab,
  Factory,
  Fade_default as Fade,
  FlatList,
  Flex_default as Flex,
  FormControl3 as FormControl,
  HStack_default as HStack,
  HamburgerIcon,
  Heading_default as Heading,
  Hidden,
  Icon_default as Icon,
  IconButton_default as IconButton,
  Image_default as Image,
  InfoIcon,
  InfoOutlineIcon,
  Input_default as Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  KBD_default as Kbd,
  KeyboardAvoidingView,
  Link_default as Link,
  List3 as List,
  Menu2 as Menu,
  MinusIcon,
  ModalMain as Modal,
  MoonIcon,
  NativeBaseProvider,
  NumberDecrementStepper_default as NumberDecrementStepper,
  NumberIncrementStepper_default as NumberIncrementStepper,
  NumberInput_default as NumberInput,
  NumberInputField_default as NumberInputField,
  NumberInputStepper_default as NumberInputStepper,
  PinInput2 as PinInput,
  Popover2 as Popover,
  PresenceTransition_default as PresenceTransition,
  Pressable_default as Pressable,
  Progress_default as Progress,
  QuestionIcon,
  QuestionOutlineIcon,
  Radio2 as Radio,
  HStack_default as Row,
  ScaleFade_default as ScaleFade,
  ScrollView,
  SearchIcon,
  SectionList,
  Select_default2 as Select,
  SimpleGrid_default as SimpleGrid,
  Skeleton3 as Skeleton,
  Slide_default as Slide,
  SlideFade_default as SlideFade,
  Slider3 as Slider,
  SmallCloseIcon,
  Spacer,
  Spinner_default as Spinner,
  Square_default as Square,
  Stack_default as Stack,
  Stagger_default as Stagger,
  StatusBar,
  SunIcon,
  Switch_default as Switch,
  Tabs2 as Tabs,
  Tag_default as Tag,
  Text_default as Text,
  TextArea_default as TextArea,
  TextField_default as TextField,
  ThreeDotsIcon,
  Toast2 as Toast,
  ToastProvider,
  Tooltip2 as Tooltip,
  Typeahead,
  VStack_default as VStack,
  View5 as View,
  WarningIcon,
  WarningOutlineIcon,
  WarningTwoIcon,
  Wrap_default as Wrap,
  ZStack_default as ZStack,
  createIcon,
  src_default as default,
  extendTheme,
  getColor2 as getColor,
  keyboardDismissHandlerManager,
  theme2 as theme,
  tools_exports as themeTools,
  useAccessibleColors,
  useBreakpointResolvedProps,
  useBreakpointValue,
  useClipboard,
  useColorMode,
  useColorModeValue,
  useContrastText,
  useControllableProp,
  useControllableState,
  useDisclose,
  useKeyboardDismissable,
  useLayout,
  useMediaQuery,
  useNativeBase,
  usePlatformProps,
  usePropsResolution,
  usePropsResolutionTest,
  usePropsWithComponentTheme,
  useSafeArea,
  useScreenReaderEnabled,
  useStyledSystemPropsResolver,
  useTheme,
  useThemeProps,
  useToast,
  useToken,
  useTypeahead,
  v3CompatibleTheme
};
//# sourceMappingURL=index.js.map
