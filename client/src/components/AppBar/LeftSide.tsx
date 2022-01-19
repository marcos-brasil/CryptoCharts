import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  Text,
  View,
  ViewStyle,
  useColorScheme,
  GestureResponderEvent,
  useWindowDimensions,
} from 'react-native';

import {
  Center,
  DividerVerticle,
  HStack,
  StyleSheet,
  VStack,
  mergeStyleSheetMany,
} from '../../primitives';

import type { IconsProps } from '../../primitives/Icons';

import darkAppTheme from '../../themes/dark';
import lightAppTheme from '../../themes/light';
import baseAppTheme from '../../themes/base';

import { darkTheme, lightTheme } from './theme';

export type Props = {
  firstIcon: (props: IconsProps) => JSX.Element;
  firstText: string;
  firstIconOnPress?: (event: GestureResponderEvent) => void;
  secondIcon?: (props: IconsProps) => JSX.Element;
  secondText?: string;
  secondIconOnPress?: (event: GestureResponderEvent) => void;
};

import { usePadding } from './hooks';

export default function LeftSide(props: Props) {
  // console.log(inserts);
  let OSTheme = useColorScheme();

  let FirstIcon = props.firstIcon;
  let firstText = props.firstText;
  // let leftText = props.le
  let SecondIcon = props.secondIcon;
  let secondText = props.secondText;

  let position = usePadding();

  let theme = OSTheme === 'dark' ? darkTheme : lightTheme;
  let appTheme = OSTheme === 'dark' ? darkAppTheme : lightAppTheme;

  let fontSize = Platform.OS === 'web' ? 14 : 14;

  let leftIconStyle = useMemo(() => {
    return StyleSheet.create({
      icon: {
        ...appTheme.raw.button,
        paddingTop: Platform.OS === 'web' ? 2 : 0,
      },
      text: {
        fontSize,
        paddingTop: Platform.OS === 'web' ? 4 : 4,
        paddingLeft: 4,
        paddingRight: 4,
        color: appTheme.raw.button.color,
      },
    });
  }, [appTheme, fontSize]);

  let rightIconStyle = useMemo(() => {
    return StyleSheet.create({
      padding: { paddingLeft: 8 },
      dividerPadding: { paddingLeft: 6 },
      icon: {
        ...appTheme.raw.button,
        paddingTop: Platform.OS === 'web' ? 2 : 0,
      },
      text: {
        fontSize,
        paddingTop: 4,
        paddingLeft: 4,
        color: appTheme.raw.button.color,
      },
    });
  }, [appTheme, fontSize]);

  let iconWrapper = useMemo(() => {
    return StyleSheet.create({
      buttonContent: { left: position },
    });
  }, [position]);

  let First = (
    <Pressable onPress={props.firstIconOnPress}>
      <HStack>
        <FirstIcon
          style={leftIconStyle.raw.icon}
          color={leftIconStyle.raw.icon.color}
        />
        <Text style={leftIconStyle.text}>{firstText}</Text>
      </HStack>
    </Pressable>
  );

  let Second = (
    <>
      <Center>
        {SecondIcon && (
          <DividerVerticle
            style={[theme.dividerVertical, rightIconStyle.dividerPadding]}
          />
        )}
      </Center>
      <Pressable onPress={props.secondIconOnPress}>
        <HStack style={rightIconStyle.padding}>
          {SecondIcon && (
            <SecondIcon
              style={rightIconStyle.raw.icon}
              color={rightIconStyle.raw.icon.color}
            />
          )}
          {secondText && <Text style={rightIconStyle.text}>{secondText}</Text>}
        </HStack>
      </Pressable>
    </>
  );

  return (
    <HStack
      style={[
        baseAppTheme.buttonsContent,
        appTheme.buttonsContent,
        theme.buttonsContent,
        iconWrapper.buttonContent,
      ]}>
      {First}
      {Second}
    </HStack>

    // </View>
  );
}
