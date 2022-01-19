import React, {
  useEffect,
  useRef,
  //  useRef, useState
} from 'react';

import {
  View,
  // useWindowDimensions
} from 'react-native';

import type {
  ScrollViewProps as ScrollViewPropsRN,
  // StyleProp,
  // ViewStyle,
} from 'react-native';

import {
  Emitter,
  throttle1,
  //  getLast
} from '../../utils';

// import queue from '../../queue';

import type { Evt, SimpleFlatlistProps } from './types';

import RenderItems from './RenderItems';
// window.addEventListener('scroll', e => {
//   console.log(window.scrollY);
// });
import { useReactNavigation } from '../../utils';
import { Routes } from '../../routes';

type ScrollViewProps = ScrollViewPropsRN & React.HTMLAttributes<unknown>;

function ScrollView(props: ScrollViewProps) {
  let { contentContainerStyle } = props;

  return (
    <View style={contentContainerStyle == null ? {} : contentContainerStyle}>
      {props.children}
    </View>
  );
}

let ViewWrapStyle = { flex: 1 };

export default function SimpleFlatlist<T>(
  props: SimpleFlatlistProps<T>
): JSX.Element {
  let {
    contentContainerStyle,
    itemHeight,
    itemWidth,
    maxNumColumn,
    scrollEventThrottle,
    data,
    onScroll,
    renderItem,
    onEndReachedThreshold,
    onEndReached,
  } = props;

  // maxNumColumn = maxNumColumn || 3;

  contentContainerStyle = {
    // maxWidth: itemWidth * maxNumColumn * 1.01,
    // @ts-ignore
    ...contentContainerStyle,
  };

  let nav = useReactNavigation<Routes>();
  // console.log('FFFFFFF');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let event = new Emitter<Evt>();

  let shouldScroll = useRef(true);

  let lastScrollPosition = useRef<ScrollToOptions>({
    top: 0,
    left: 0,
    behavior: 'auto',
  });

  useEffect(() => {
    let timeoutId = setTimeout(() => null);

    let subFocus = nav.addListener('focus', () => {
      timeoutId = setTimeout(() => {
        window.scrollTo(lastScrollPosition.current);
        shouldScroll.current = true;
      }, 10);
    });

    let subBlur = nav.addListener('blur', () => {
      shouldScroll.current = false;
    });

    return () => {
      clearTimeout(timeoutId);
      subFocus();
      subBlur;
      // @ts-ignore
      event.emitters = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log('iiii', nav.isFocused());

  useEffect(() => {
    let prevPos = 0;

    let handler = throttle1(
      () => {
        if (shouldScroll.current === false) {
          return;
        }

        lastScrollPosition.current.top = window.scrollY;
        lastScrollPosition.current.left = window.scrollX;

        onScroll &&
          onScroll({
            // TODO: improve on this
            // @ts-ignore
            nativeEvent: {
              contentOffset: { y: window.scrollY, x: window.scrollX },
            },
          });

        let position = Math.ceil(window.scrollY / itemHeight);

        if (prevPos === position) {
          return;
        }

        prevPos = position;
        event.emit('scroll', position);
      },
      scrollEventThrottle == null ? 16 : scrollEventThrottle
    );

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [event, itemHeight, scrollEventThrottle, onScroll, nav]);

  return (
    <View style={ViewWrapStyle}>
      <ScrollView
        contentContainerStyle={
          contentContainerStyle == null ? {} : contentContainerStyle
        }>
        <RenderItems
          // style={{ flexBasis: '100%' }}
          itemHeight={itemHeight}
          itemWidth={itemWidth}
          event={event}
          onEndReachedThreshold={onEndReachedThreshold}
          onEndReached={onEndReached}
          // maxItemToRender={42}
          maxNumColumn={maxNumColumn}
          // @ts-ignore
          renderItem={renderItem}
          data={data}
        />
      </ScrollView>
    </View>
  );
}
