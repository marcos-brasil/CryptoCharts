import React, { useEffect, useRef, useState } from 'react';

import { View, useWindowDimensions } from 'react-native';

// import type { StyleProp, ViewStyle } from 'react-native';
import { Lifo } from '../../utils';

// import {
//   //  Emitter, debounce1,
//   getLast,
// } from '../../utils';

// import queue from '../../queue';

import type { RenderItemsPros } from './types';
// window.addEventListener('scroll', e => {
//   console.log(window.scrollY);

export default function RenderItems<T>(props: RenderItemsPros<T>): JSX.Element {
  let {
    data,
    winSize,
    event,
    renderItem,
    maxNumColumn,
    itemHeight,
    itemWidth,
    onEndReachedThreshold,
    onEndReached,
  } = props;

  const { width, height } = useWindowDimensions();

  let horizontalNumElem = Math.floor(width / itemWidth) || 1;
  maxNumColumn = maxNumColumn || 3;

  horizontalNumElem =
    horizontalNumElem > maxNumColumn ? maxNumColumn : horizontalNumElem;

  let itemsInTheView = Math.ceil(height / itemHeight) * horizontalNumElem;

  winSize = winSize || 3;

  let maxItemToRender = itemsInTheView * winSize;

  let viewPortItemsCount = Math.ceil((maxItemToRender * 2) / 3);
  let topOffset = Math.ceil(viewPortItemsCount / (2 * horizontalNumElem));

  let queue = useRef(new Lifo());
  let isMounted = useRef(false);
  let inProgress = useRef(false);
  let isFirstRender = useRef(true);

  let _renderedItems: JSX.Element[] = [];
  let _cachedRenderedItems: JSX.Element[] = [];

  let [renderedItems, setRenderedItems] = useState(_renderedItems);
  let [cachedRenderedItems, setCachedRenderedItems] =
    useState(_cachedRenderedItems);

  let queueHandler = () => {
    // only run the last render job
    queue.current.run(1);

    if (isMounted.current) {
      requestAnimationFrame(queueHandler);
    }
  };

  // console.log('*******');

  useEffect(() => {
    isMounted.current = true;
    requestAnimationFrame(queueHandler);

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inProgress.current = false;
  }, [renderedItems]);

  useEffect(() => {
    let rmListFromRenderQueue: () => void = () => null;

    let rmScrollListener = event.on('scroll', pos => {
      if (inProgress.current) {
        rmListFromRenderQueue();
      }

      rmListFromRenderQueue = queue.current.add(() => {
        let aboveOffset = pos - topOffset;

        aboveOffset = aboveOffset < 0 ? 0 : aboveOffset;

        // estimating belowOffset
        let belowOffset =
          (data.length - viewPortItemsCount + pos * horizontalNumElem) /
            horizontalNumElem -
          aboveOffset;

        let nextItems: JSX.Element[] = [];

        for (
          let idx = aboveOffset * horizontalNumElem;
          idx < viewPortItemsCount + pos * horizontalNumElem;
          idx++
        ) {
          let item = cachedRenderedItems[idx];

          // console.log('--->>>', data.length - idx);
          if (data.length - idx <= (onEndReachedThreshold || 0)) {
            onEndReached && onEndReached(data.length - idx);
          }

          if (item != null && item.key === idx + '') {
            nextItems.push(item);

            continue;
          }

          if (idx >= data.length) {
            belowOffset = 0;
            break;
          }

          if (cachedRenderedItems[idx] == null) {
            cachedRenderedItems[idx] = (
              <View key={idx + ''}>{renderItem(data[idx], idx)}</View>
            );
          }

          nextItems.push(cachedRenderedItems[idx]);
          // counter++;
        }

        nextItems.unshift(
          <View
            key={'above'}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: '100%',
              height: aboveOffset * itemHeight,
            }}
          />
        );

        // computing the actual belowOffset
        belowOffset = Math.ceil(
          (data.length - nextItems.length) / horizontalNumElem - aboveOffset
        );

        belowOffset = belowOffset < 0 ? 0 : belowOffset;

        nextItems.push(
          <View
            key={'below'}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: '100%',

              height: belowOffset * itemHeight,
            }}
          />
        );

        inProgress.current = true;
        setRenderedItems(nextItems);
      });
    });

    return () => {
      rmListFromRenderQueue();
      rmScrollListener();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, horizontalNumElem]);

  useEffect(() => {
    if (data.length > 0 && isFirstRender.current) {
      // let counter = 0;
      _renderedItems.push(
        <View
          key={'above'}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: '100%', height: 0 }}
        />
      );

      isFirstRender.current = false;

      for (let idx = 0; idx < viewPortItemsCount; idx++) {
        _cachedRenderedItems[idx] = (
          <View key={idx + ''}>{renderItem(data[idx], idx)}</View>
        );
        _renderedItems.push(_cachedRenderedItems[idx]);
      }

      _renderedItems.push(
        <View
          key={'below'}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            height: (data.length - viewPortItemsCount) * itemHeight,
          }}
        />
      );

      setRenderedItems(_renderedItems);
      setCachedRenderedItems(_cachedRenderedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <>{renderedItems}</>;
}
