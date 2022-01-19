// vendors/tmp/@react-navigation/native-stack/src/navigators/createNativeStackNavigator.tsx
import { createNavigatorFactory, StackActions, StackRouter, useNavigationBuilder } from "@react-navigation/native";
import {
  createElement as createElement2,
  useEffect
} from "react";

// vendors/tmp/@react-navigation/native-stack/src/views/NativeStackView.tsx
import { getHeaderTitle, Header, HeaderBackButton, SafeAreaProviderCompat, Screen } from "@react-navigation/elements";
import {
  createElement
} from "react";
import { Image, StyleSheet, View } from "react-native";
function NativeStackView({ state, descriptors }) {
  return /* @__PURE__ */ createElement(SafeAreaProviderCompat, null, /* @__PURE__ */ createElement(View, {
    style: styles.container
  }, state.routes.map((route, i) => {
    const isFocused = state.index === i;
    const canGoBack = i !== 0;
    const previousKey = state.routes[i - 1]?.key;
    const previousDescriptor = previousKey ? descriptors[previousKey] : void 0;
    const { options, navigation, render } = descriptors[route.key];
    const { header, headerShown, headerTintColor, headerBackImageSource, headerLeft, headerRight, headerTitle, headerTitleAlign, headerTitleStyle, headerStyle, headerShadowVisible, headerTransparent, contentStyle, headerBackTitle } = options;
    return /* @__PURE__ */ createElement(Screen, {
      key: route.key,
      focused: isFocused,
      route,
      navigation,
      headerShown,
      headerTransparent,
      header: header !== void 0 ? header({
        back: previousDescriptor ? {
          title: getHeaderTitle(previousDescriptor.options, previousDescriptor.route.name)
        } : void 0,
        options,
        route,
        navigation
      }) : /* @__PURE__ */ createElement(Header, {
        title: getHeaderTitle(options, route.name),
        headerTintColor,
        headerLeft: typeof headerLeft === "function" ? ({ tintColor }) => headerLeft({
          tintColor,
          canGoBack,
          label: headerBackTitle
        }) : headerLeft === void 0 && canGoBack ? ({ tintColor }) => /* @__PURE__ */ createElement(HeaderBackButton, {
          tintColor,
          backImage: headerBackImageSource !== void 0 ? () => /* @__PURE__ */ createElement(Image, {
            source: headerBackImageSource,
            style: [
              styles.backImage,
              { tintColor }
            ]
          }) : void 0,
          onPress: navigation.goBack,
          canGoBack
        }) : headerLeft,
        headerRight: typeof headerRight === "function" ? ({ tintColor }) => headerRight({ tintColor }) : headerRight,
        headerTitle: typeof headerTitle === "function" ? ({ children, tintColor }) => headerTitle({ children, tintColor }) : headerTitle,
        headerTitleAlign,
        headerTitleStyle,
        headerStyle: [
          headerTransparent ? {
            position: "absolute",
            backgroundColor: "transparent"
          } : null,
          headerStyle,
          headerShadowVisible === false ? { shadowOpacity: 0, borderBottomWidth: 0 } : null
        ]
      }),
      style: [
        StyleSheet.absoluteFill,
        { display: isFocused ? "flex" : "none" }
      ]
    }, /* @__PURE__ */ createElement(View, {
      style: [styles.contentContainer, contentStyle]
    }, render()));
  })));
}
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  backImage: {
    height: 24,
    width: 24,
    margin: 3,
    resizeMode: "contain"
  }
});

// vendors/tmp/@react-navigation/native-stack/src/navigators/createNativeStackNavigator.tsx
function NativeStackNavigator({ initialRouteName, children, screenListeners, screenOptions, ...rest }) {
  const { state, descriptors, navigation } = useNavigationBuilder(StackRouter, {
    initialRouteName,
    children,
    screenListeners,
    screenOptions
  });
  useEffect(() => navigation?.addListener?.("tabPress", (e) => {
    const isFocused = navigation.isFocused();
    requestAnimationFrame(() => {
      if (state.index > 0 && isFocused && !e.defaultPrevented) {
        navigation.dispatch({
          ...StackActions.popToTop(),
          target: state.key
        });
      }
    });
  }), [navigation, state.index, state.key]);
  return /* @__PURE__ */ createElement2(NativeStackView, {
    ...rest,
    state,
    navigation,
    descriptors
  });
}
var createNativeStackNavigator_default = createNavigatorFactory(NativeStackNavigator);
export {
  createNativeStackNavigator_default as createNativeStackNavigator
};
//# sourceMappingURL=index.js.map
