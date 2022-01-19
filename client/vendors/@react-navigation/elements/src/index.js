// vendors/tmp/@react-navigation/elements/src/assets/back-icon.png
var back_icon_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAAAlklEQVR4Ae3a1REDMRDG4A3VmHbcUFLigf0exn/mkxuQjmELAAAAAD5Eq5atP6+rZeuPhGz9kZCtPxKy9fs6Zuuf60CfPn369OnTp0+fPn369OnTfx36X1vh+nO6/pytL+D1BCexy+iNhFPt6/dIOEiQIEGCBAkSJEiQ8B0k+PwoQYKhP2OXAYOvRo+vD38bvwcAAACABXF8ILs1PQqpAAAAAElFTkSuQmCC";

// vendors/tmp/@react-navigation/elements/src/assets/back-icon-mask.png
var back_icon_mask_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABVCAQAAAChx3/YAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkAQMKHDc9iQjuAAACmUlEQVRo3r3ZS2sUQRAH8M5zklwWg0K8mKBB/AIqXhTEi1cTPQe9iH4AUXBNjh79EooKgggSHyCICIIQL7NV1T2bze6EFS/xoms0ie0hs+sa9zE901U79/3R8+iu+pdSnn/VfbCAz/Um2r+XV8AO0jH9pP3vvSN2COdhGX8xInbIzNMKbv1PeEPsiLmEn2i7E+EJsSN4Az+UtjoTXpBwlG7CGnQlPCA2oFtQxZ3uRG7EBnAvjHsTOREbwB2s9bpRuZHKGCzCer9V5ELi8ehuOiIzYkejBUTYTkNkREyAV5DgdzoiE2ICuoYaUxMZEBPQdYpdCGfkzbA+rUsugDNiAnOGwJVwQipj0XlCd8IBscN0wv1GOSEmCE9qyEakREyAZ4myEqkQE+hzupydSIHE4+aUjvIQfZH6hL6QbxV9kfqEnqP1vEQPxA6YA3hReyB6IOUC3vZDdEXKBVPUG36ILkhlihbxqy+iI1KZogf4xW0zd0TWDuJD+AYWLRuyOo2P0DOxB6nM4Fv87pv4B1mdxhfY8E+0IeaIfok/OIgWEs3q97DJQyTI5xn9FBpcBFqlVDgLz6CBlu9S8SS9JlYCraKlTv2qb+QdN4FWYV0AEVkJLQH/M4kn9Sv2t0vkOxH64pt7F9f22LYLVw8D9y4sdJ40T0bgPRmVUqp+iP2MF6pWkrrrPnPdJVRB7tbCVMQNZkSkqlfKDtD+kLs/Eem0xHpGoe631cdHzIhIIiGUrSQp0XHmlEgo7xJK7loZZMiMJGlqjTVNbebCRKy5cPJsLjMn3EJZvdDUQWh+krwCReZJUHOmVaqxzrSEpnNCc0ahiWlz9ksrrLNfoSn27sgf5mCZfrIiStnB8lF8rHdYEaWU+ljQV/dW0X8Ac6zWpmDZsO8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDEtMDNUMTA6Mjg6NTIrMDA6MDD7fVVWAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTAxLTAzVDEwOjI4OjUyKzAwOjAwiiDt6gAAAABJRU5ErkJggg==";

// vendors/tmp/@react-navigation/elements/src/Background.tsx
import { useTheme } from "@react-navigation/native";
import {
  createElement
} from "react";
import { View } from "react-native";
function Background({ style, ...rest }) {
  const { colors } = useTheme();
  return /* @__PURE__ */ createElement(View, {
    ...rest,
    style: [{ flex: 1, backgroundColor: colors.background }, style]
  });
}

// vendors/tmp/@react-navigation/elements/src/Header/getDefaultHeaderHeight.tsx
import { Platform } from "react-native";
function getDefaultHeaderHeight(layout, modalPresentation, statusBarHeight) {
  let headerHeight;
  const isLandscape = layout.width > layout.height;
  if (Platform.OS === "ios") {
    if (Platform.isPad) {
      if (modalPresentation) {
        headerHeight = 56;
      } else {
        headerHeight = 50;
      }
    } else {
      if (isLandscape) {
        headerHeight = 32;
      } else {
        if (modalPresentation) {
          headerHeight = 56;
        } else {
          headerHeight = 44;
        }
      }
    }
  } else if (Platform.OS === "android") {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }
  return headerHeight + statusBarHeight;
}

// vendors/tmp/@react-navigation/elements/src/Header/getHeaderTitle.tsx
function getHeaderTitle(options, fallback) {
  return typeof options.headerTitle === "string" ? options.headerTitle : options.title !== void 0 ? options.title : fallback;
}

// vendors/tmp/@react-navigation/elements/src/Header/Header.tsx
import {
  Fragment,
  createElement as createElement4,
  useContext
} from "react";
import { Animated as Animated3, Platform as Platform4, StyleSheet as StyleSheet3, View as View2 } from "react-native";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";

// vendors/tmp/@react-navigation/elements/src/Header/HeaderBackground.tsx
import { useTheme as useTheme2 } from "@react-navigation/native";
import {
  createElement as createElement2
} from "react";
import { Animated, Platform as Platform2, StyleSheet } from "react-native";
function HeaderBackground({ style, ...rest }) {
  const { colors } = useTheme2();
  return /* @__PURE__ */ createElement2(Animated.View, {
    style: [
      styles.container,
      {
        backgroundColor: colors.card,
        borderBottomColor: colors.border,
        shadowColor: colors.border
      },
      style
    ],
    ...rest
  });
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform2.select({
      android: {
        elevation: 4
      },
      ios: {
        shadowOpacity: 0.85,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: StyleSheet.hairlineWidth
        }
      },
      default: {
        borderBottomWidth: StyleSheet.hairlineWidth
      }
    })
  }
});

// vendors/tmp/@react-navigation/elements/src/getNamedContext.tsx
import {
  createContext
} from "react";
var contexts = "__react_navigation__elements_contexts";
global[contexts] = global[contexts] ?? new Map();
function getNamedContext(name, initialValue) {
  let context = global[contexts].get(name);
  if (context) {
    return context;
  }
  context = createContext(initialValue);
  context.displayName = name;
  global[contexts].set(name, context);
  return context;
}

// vendors/tmp/@react-navigation/elements/src/Header/HeaderShownContext.tsx
var HeaderShownContext = getNamedContext("HeaderShownContext", false);
var HeaderShownContext_default = HeaderShownContext;

// vendors/tmp/@react-navigation/elements/src/Header/HeaderTitle.tsx
import { useTheme as useTheme3 } from "@react-navigation/native";
import {
  createElement as createElement3
} from "react";
import { Animated as Animated2, Platform as Platform3, StyleSheet as StyleSheet2 } from "react-native";
function HeaderTitle({ tintColor, style, ...rest }) {
  const { colors } = useTheme3();
  return /* @__PURE__ */ createElement3(Animated2.Text, {
    accessibilityRole: "header",
    "aria-level": "1",
    numberOfLines: 1,
    ...rest,
    style: [
      styles2.title,
      { color: tintColor === void 0 ? colors.text : tintColor },
      style
    ]
  });
}
var styles2 = StyleSheet2.create({
  title: Platform3.select({
    ios: {
      fontSize: 17,
      fontWeight: "600"
    },
    android: {
      fontSize: 20,
      fontFamily: "sans-serif-medium",
      fontWeight: "normal"
    },
    default: {
      fontSize: 18,
      fontWeight: "500"
    }
  })
});

// vendors/tmp/@react-navigation/elements/src/Header/Header.tsx
var warnIfHeaderStylesDefined = (styles9) => {
  Object.keys(styles9).forEach((styleProp) => {
    const value = styles9[styleProp];
    if (styleProp === "position" && value === "absolute") {
      console.warn("position: 'absolute' is not supported on headerStyle. If you would like to render content under the header, use the 'headerTransparent' option.");
    } else if (value !== void 0) {
      console.warn(`${styleProp} was given a value of ${value}, this has no effect on headerStyle.`);
    }
  });
};
function Header(props) {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const isParentHeaderShown = useContext(HeaderShownContext_default);
  const { layout = frame, modal = false, title, headerTitle: customTitle, headerTitleAlign = Platform4.select({
    ios: "center",
    default: "left"
  }), headerLeft, headerLeftLabelVisible, headerTransparent, headerTintColor, headerBackground, headerRight, headerTitleAllowFontScaling: titleAllowFontScaling, headerTitleStyle: titleStyle, headerLeftContainerStyle: leftContainerStyle, headerRightContainerStyle: rightContainerStyle, headerTitleContainerStyle: titleContainerStyle, headerBackgroundContainerStyle: backgroundContainerStyle, headerStyle: customHeaderStyle, headerShadowVisible, headerPressColor, headerPressOpacity, headerStatusBarHeight = isParentHeaderShown ? 0 : insets.top } = props;
  const defaultHeight = getDefaultHeaderHeight(layout, modal, headerStatusBarHeight);
  const {
    height: height2 = defaultHeight,
    minHeight,
    maxHeight,
    backgroundColor,
    borderBottomColor,
    borderBottomEndRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomStartRadius,
    borderBottomWidth,
    borderColor,
    borderEndColor,
    borderEndWidth,
    borderLeftColor,
    borderLeftWidth,
    borderRadius,
    borderRightColor,
    borderRightWidth,
    borderStartColor,
    borderStartWidth,
    borderStyle,
    borderTopColor,
    borderTopEndRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderTopStartRadius,
    borderTopWidth,
    borderWidth,
    boxShadow,
    elevation,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    opacity,
    transform,
    ...unsafeStyles
  } = StyleSheet3.flatten(customHeaderStyle || {});
  if (process.env.NODE_ENV !== "production") {
    warnIfHeaderStylesDefined(unsafeStyles);
  }
  const safeStyles = {
    backgroundColor,
    borderBottomColor,
    borderBottomEndRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomStartRadius,
    borderBottomWidth,
    borderColor,
    borderEndColor,
    borderEndWidth,
    borderLeftColor,
    borderLeftWidth,
    borderRadius,
    borderRightColor,
    borderRightWidth,
    borderStartColor,
    borderStartWidth,
    borderStyle,
    borderTopColor,
    borderTopEndRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderTopStartRadius,
    borderTopWidth,
    borderWidth,
    boxShadow,
    elevation,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    opacity,
    transform
  };
  for (const styleProp in safeStyles) {
    if (safeStyles[styleProp] === void 0) {
      delete safeStyles[styleProp];
    }
  }
  const backgroundStyle = [
    safeStyles,
    headerShadowVisible === false && {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    }
  ];
  const leftButton = headerLeft ? headerLeft({
    tintColor: headerTintColor,
    pressColor: headerPressColor,
    pressOpacity: headerPressOpacity,
    labelVisible: headerLeftLabelVisible
  }) : null;
  const rightButton = headerRight ? headerRight({
    tintColor: headerTintColor,
    pressColor: headerPressColor,
    pressOpacity: headerPressOpacity
  }) : null;
  const headerTitle = typeof customTitle !== "function" ? (props2) => /* @__PURE__ */ createElement4(HeaderTitle, {
    ...props2
  }) : customTitle;
  return /* @__PURE__ */ createElement4(Fragment, null, /* @__PURE__ */ createElement4(Animated3.View, {
    pointerEvents: "box-none",
    style: [
      StyleSheet3.absoluteFill,
      { zIndex: 0 },
      backgroundContainerStyle
    ]
  }, headerBackground ? headerBackground({ style: backgroundStyle }) : headerTransparent ? null : /* @__PURE__ */ createElement4(HeaderBackground, {
    style: backgroundStyle
  })), /* @__PURE__ */ createElement4(Animated3.View, {
    pointerEvents: "box-none",
    style: [{ height: height2, minHeight, maxHeight, opacity, transform }]
  }, /* @__PURE__ */ createElement4(View2, {
    pointerEvents: "none",
    style: { height: headerStatusBarHeight }
  }), /* @__PURE__ */ createElement4(View2, {
    pointerEvents: "box-none",
    style: styles3.content
  }, /* @__PURE__ */ createElement4(Animated3.View, {
    pointerEvents: "box-none",
    style: [
      styles3.left,
      headerTitleAlign === "center" && styles3.expand,
      { marginStart: insets.left },
      leftContainerStyle
    ]
  }, leftButton), /* @__PURE__ */ createElement4(Animated3.View, {
    pointerEvents: "box-none",
    style: [
      styles3.title,
      {
        maxWidth: headerTitleAlign === "center" ? layout.width - ((leftButton ? headerLeftLabelVisible !== false ? 80 : 32 : 16) + Math.max(insets.left, insets.right)) * 2 : layout.width - ((leftButton ? 72 : 16) + (rightButton ? 72 : 16) + insets.left - insets.right)
      },
      titleContainerStyle
    ]
  }, headerTitle({
    children: title,
    allowFontScaling: titleAllowFontScaling,
    tintColor: headerTintColor,
    style: titleStyle
  })), /* @__PURE__ */ createElement4(Animated3.View, {
    pointerEvents: "box-none",
    style: [
      styles3.right,
      styles3.expand,
      { marginEnd: insets.right },
      rightContainerStyle
    ]
  }, rightButton))));
}
var styles3 = StyleSheet3.create({
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch"
  },
  title: {
    marginHorizontal: 16,
    justifyContent: "center"
  },
  left: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end"
  },
  expand: {
    flexGrow: 1,
    flexBasis: 0
  }
});

// vendors/tmp/@react-navigation/elements/src/Header/HeaderBackButton.tsx
import { useTheme as useTheme5 } from "@react-navigation/native";
import {
  Fragment as Fragment2,
  createElement as createElement6,
  useState as useState2
} from "react";
import { Animated as Animated5, I18nManager, Image, Platform as Platform6, StyleSheet as StyleSheet4, View as View3 } from "react-native";

// vendors/tmp/@react-navigation/elements/src/MaskedView.tsx
function MaskedView({ children }) {
  return children;
}

// vendors/tmp/@react-navigation/elements/src/PlatformPressable.tsx
import { useTheme as useTheme4 } from "@react-navigation/native";
import {
  createElement as createElement5,
  useState
} from "react";
import { Animated as Animated4, Easing, Platform as Platform5, Pressable } from "react-native";
var AnimatedPressable = Animated4.createAnimatedComponent(Pressable);
var ANDROID_VERSION_LOLLIPOP = 21;
var ANDROID_SUPPORTS_RIPPLE = Platform5.OS === "android" && Platform5.Version >= ANDROID_VERSION_LOLLIPOP;
function PlatformPressable({ onPressIn, onPressOut, android_ripple, pressColor, pressOpacity = 0.3, style, ...rest }) {
  const { dark } = useTheme4();
  const [opacity] = useState(() => new Animated4.Value(1));
  const animateTo = (toValue, duration) => {
    if (ANDROID_SUPPORTS_RIPPLE) {
      return;
    }
    Animated4.timing(opacity, {
      toValue,
      duration,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true
    }).start();
  };
  const handlePressIn = (e) => {
    animateTo(pressOpacity, 0);
    onPressIn?.(e);
  };
  const handlePressOut = (e) => {
    animateTo(1, 200);
    onPressOut?.(e);
  };
  return /* @__PURE__ */ createElement5(AnimatedPressable, {
    onPressIn: handlePressIn,
    onPressOut: handlePressOut,
    android_ripple: ANDROID_SUPPORTS_RIPPLE ? {
      color: pressColor !== void 0 ? pressColor : dark ? "rgba(255, 255, 255, .32)" : "rgba(0, 0, 0, .32)",
      ...android_ripple
    } : void 0,
    style: [{ opacity: !ANDROID_SUPPORTS_RIPPLE ? opacity : 1 }, style],
    ...rest
  });
}

// vendors/tmp/@react-navigation/elements/src/Header/HeaderBackButton.tsx
function HeaderBackButton({ disabled, allowFontScaling, backImage, label, labelStyle, labelVisible, onLabelLayout, onPress, pressColor, pressOpacity, screenLayout, tintColor: customTintColor, titleLayout, truncatedLabel = "Back", accessibilityLabel = label && label !== "Back" ? `${label}, back` : "Go back", testID, style }) {
  const { colors } = useTheme5();
  const [initialLabelWidth, setInitialLabelWidth] = useState2(void 0);
  const tintColor = customTintColor !== void 0 ? customTintColor : Platform6.select({
    ios: colors.primary,
    default: colors.text
  });
  const handleLabelLayout = (e) => {
    onLabelLayout?.(e);
    setInitialLabelWidth(e.nativeEvent.layout.x + e.nativeEvent.layout.width);
  };
  const shouldTruncateLabel = () => {
    return !label || initialLabelWidth && titleLayout && screenLayout && (screenLayout.width - titleLayout.width) / 2 < initialLabelWidth + 26;
  };
  const renderBackImage = () => {
    if (backImage) {
      return backImage({ tintColor });
    } else {
      return /* @__PURE__ */ createElement6(Image, {
        style: [
          styles4.icon,
          Boolean(labelVisible) && styles4.iconWithLabel,
          Boolean(tintColor) && { tintColor }
        ],
        source: back_icon_default,
        fadeDuration: 0
      });
    }
  };
  const renderLabel = () => {
    const leftLabelText = shouldTruncateLabel() ? truncatedLabel : label;
    if (!labelVisible || leftLabelText === void 0) {
      return null;
    }
    const labelElement = /* @__PURE__ */ createElement6(View3, {
      style: screenLayout ? [styles4.labelWrapper, { minWidth: screenLayout.width / 2 - 27 }] : null
    }, /* @__PURE__ */ createElement6(Animated5.Text, {
      accessible: false,
      onLayout: leftLabelText === label ? handleLabelLayout : void 0,
      style: [
        styles4.label,
        tintColor ? { color: tintColor } : null,
        labelStyle
      ],
      numberOfLines: 1,
      allowFontScaling: !!allowFontScaling
    }, leftLabelText));
    if (backImage || Platform6.OS !== "ios") {
      return labelElement;
    }
    return /* @__PURE__ */ createElement6(MaskedView, {
      maskElement: /* @__PURE__ */ createElement6(View3, {
        style: styles4.iconMaskContainer
      }, /* @__PURE__ */ createElement6(Image, {
        source: back_icon_mask_default,
        style: styles4.iconMask
      }), /* @__PURE__ */ createElement6(View3, {
        style: styles4.iconMaskFillerRect
      }))
    }, labelElement);
  };
  const handlePress = () => onPress && requestAnimationFrame(onPress);
  return /* @__PURE__ */ createElement6(PlatformPressable, {
    disabled,
    accessible: true,
    accessibilityRole: "button",
    accessibilityLabel,
    testID,
    onPress: disabled ? void 0 : handlePress,
    pressColor,
    pressOpacity,
    android_ripple: { borderless: true },
    style: [styles4.container, disabled && styles4.disabled, style],
    hitSlop: Platform6.select({
      ios: void 0,
      default: { top: 16, right: 16, bottom: 16, left: 16 }
    })
  }, /* @__PURE__ */ createElement6(Fragment2, null, renderBackImage(), renderLabel()));
}
var styles4 = StyleSheet4.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    minWidth: StyleSheet4.hairlineWidth,
    ...Platform6.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11
      }
    })
  },
  disabled: {
    opacity: 0.5
  },
  label: {
    fontSize: 17,
    letterSpacing: 0.35
  },
  labelWrapper: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  icon: Platform6.select({
    ios: {
      height: 21,
      width: 13,
      marginLeft: 8,
      marginRight: 22,
      marginVertical: 12,
      resizeMode: "contain",
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
    },
    default: {
      height: 24,
      width: 24,
      margin: 3,
      resizeMode: "contain",
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
    }
  }),
  iconWithLabel: Platform6.OS === "ios" ? {
    marginRight: 6
  } : {},
  iconMaskContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  iconMaskFillerRect: {
    flex: 1,
    backgroundColor: "#000"
  },
  iconMask: {
    height: 21,
    width: 13,
    marginLeft: -14.5,
    marginVertical: 12,
    alignSelf: "center",
    resizeMode: "contain",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  }
});

// vendors/tmp/@react-navigation/elements/src/Header/HeaderBackContext.tsx
var HeaderBackContext = getNamedContext("HeaderBackContext", void 0);
var HeaderBackContext_default = HeaderBackContext;

// vendors/tmp/@react-navigation/elements/src/Header/HeaderHeightContext.tsx
var HeaderHeightContext = getNamedContext("HeaderHeightContext", void 0);
var HeaderHeightContext_default = HeaderHeightContext;

// vendors/tmp/@react-navigation/elements/src/Header/useHeaderHeight.tsx
import {
  useContext as useContext2
} from "react";
function useHeaderHeight() {
  const height2 = useContext2(HeaderHeightContext_default);
  if (height2 === void 0) {
    throw new Error("Couldn't find the header height. Are you inside a screen in a navigator with a header?");
  }
  return height2;
}

// vendors/tmp/@react-navigation/elements/src/MissingIcon.tsx
import {
  createElement as createElement7
} from "react";
import { StyleSheet as StyleSheet5, Text } from "react-native";
function MissingIcon({ color, size, style }) {
  return /* @__PURE__ */ createElement7(Text, {
    style: [styles5.icon, { color, fontSize: size }, style]
  }, "\u23F7");
}
var styles5 = StyleSheet5.create({
  icon: {
    backgroundColor: "transparent"
  }
});

// vendors/tmp/@react-navigation/elements/src/ResourceSavingView.tsx
import {
  createElement as createElement8
} from "react";
import { Platform as Platform7, StyleSheet as StyleSheet6, View as View4 } from "react-native";
var FAR_FAR_AWAY = 3e4;
function ResourceSavingScene({ visible, children, style, ...rest }) {
  if (Platform7.OS === "web") {
    return /* @__PURE__ */ createElement8(View4, {
      hidden: !visible,
      style: [
        { display: visible ? "flex" : "none" },
        styles6.container,
        style
      ],
      pointerEvents: visible ? "auto" : "none",
      ...rest
    }, children);
  }
  return /* @__PURE__ */ createElement8(View4, {
    style: [styles6.container, style],
    pointerEvents: visible ? "auto" : "none"
  }, /* @__PURE__ */ createElement8(View4, {
    collapsable: false,
    removeClippedSubviews: Platform7.OS === "ios" || Platform7.OS === "macos" ? !visible : true,
    pointerEvents: visible ? "auto" : "none",
    style: visible ? styles6.attached : styles6.detached
  }, children));
}
var styles6 = StyleSheet6.create({
  container: {
    flex: 1,
    overflow: "hidden"
  },
  attached: {
    flex: 1
  },
  detached: {
    flex: 1,
    top: FAR_FAR_AWAY
  }
});

// vendors/tmp/@react-navigation/elements/src/SafeAreaProviderCompat.tsx
import {
  createElement as createElement9
} from "react";
import { Dimensions, Platform as Platform8, StyleSheet as StyleSheet7, View as View5 } from "react-native";
import { initialWindowMetrics, SafeAreaInsetsContext, SafeAreaProvider } from "react-native-safe-area-context";
var { width = 0, height = 0 } = Dimensions.get("window");
var initialMetrics = Platform8.OS === "web" || initialWindowMetrics == null ? {
  frame: { x: 0, y: 0, width, height },
  insets: { top: 0, left: 0, right: 0, bottom: 0 }
} : initialWindowMetrics;
function SafeAreaProviderCompat({ children, style }) {
  return /* @__PURE__ */ createElement9(SafeAreaInsetsContext.Consumer, null, (insets) => {
    if (insets) {
      return /* @__PURE__ */ createElement9(View5, {
        style: [styles7.container, style]
      }, children);
    }
    return /* @__PURE__ */ createElement9(SafeAreaProvider, {
      initialMetrics,
      style
    }, children);
  });
}
SafeAreaProviderCompat.initialMetrics = initialMetrics;
var styles7 = StyleSheet7.create({
  container: {
    flex: 1
  }
});

// vendors/tmp/@react-navigation/elements/src/Screen.tsx
import { NavigationContext, NavigationRouteContext } from "@react-navigation/native";
import {
  createElement as createElement10,
  useContext as useContext3,
  useState as useState3
} from "react";
import { StyleSheet as StyleSheet8, View as View6 } from "react-native";
import { useSafeAreaFrame as useSafeAreaFrame2, useSafeAreaInsets as useSafeAreaInsets2 } from "react-native-safe-area-context";
function Screen(props) {
  const dimensions = useSafeAreaFrame2();
  const insets = useSafeAreaInsets2();
  const isParentHeaderShown = useContext3(HeaderShownContext_default);
  const parentHeaderHeight = useContext3(HeaderHeightContext_default);
  const { focused, modal = false, header, headerShown = true, headerTransparent, headerStatusBarHeight = isParentHeaderShown ? 0 : insets.top, navigation, route, children, style } = props;
  const [headerHeight, setHeaderHeight] = useState3(() => getDefaultHeaderHeight(dimensions, modal, headerStatusBarHeight));
  return /* @__PURE__ */ createElement10(Background, {
    accessibilityElementsHidden: !focused,
    importantForAccessibility: focused ? "auto" : "no-hide-descendants",
    style: [styles8.container, style]
  }, /* @__PURE__ */ createElement10(View6, {
    style: styles8.content
  }, /* @__PURE__ */ createElement10(HeaderShownContext_default.Provider, {
    value: isParentHeaderShown || headerShown !== false
  }, /* @__PURE__ */ createElement10(HeaderHeightContext_default.Provider, {
    value: headerShown ? headerHeight : parentHeaderHeight ?? 0
  }, children))), headerShown ? /* @__PURE__ */ createElement10(NavigationContext.Provider, {
    value: navigation
  }, /* @__PURE__ */ createElement10(NavigationRouteContext.Provider, {
    value: route
  }, /* @__PURE__ */ createElement10(View6, {
    onLayout: (e) => {
      const { height: height2 } = e.nativeEvent.layout;
      setHeaderHeight(height2);
    },
    style: headerTransparent ? styles8.absolute : null
  }, header))) : null);
}
var styles8 = StyleSheet8.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse"
  },
  content: {
    flex: 1
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  }
});

// vendors/tmp/@react-navigation/elements/src/index.tsx
var Assets = [
  back_icon_default,
  back_icon_mask_default
];
export {
  Assets,
  Background,
  Header,
  HeaderBackButton,
  HeaderBackContext_default as HeaderBackContext,
  HeaderBackground,
  HeaderHeightContext_default as HeaderHeightContext,
  HeaderShownContext_default as HeaderShownContext,
  HeaderTitle,
  MissingIcon,
  PlatformPressable,
  ResourceSavingScene as ResourceSavingView,
  SafeAreaProviderCompat,
  Screen,
  getDefaultHeaderHeight,
  getHeaderTitle,
  useHeaderHeight
};
//# sourceMappingURL=index.js.map
