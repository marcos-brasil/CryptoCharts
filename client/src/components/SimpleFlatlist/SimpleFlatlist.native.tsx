import React, {
  useEffect,
  useRef,
  //  useState
} from 'react';

import {
  ScrollView,
  //  View, useWindowDimensions
} from 'react-native';

// import type { StyleProp, ViewStyle } from 'react-native';

import {
  Emitter,
  // getLast
} from '../../utils';

import type {
  Evt,
  // RenderItemsPros,
  SimpleFlatlistProps,
} from './types';

import RenderItems from './RenderItems';
// test to see if repo is working

// let CARD_WIDTH = 360;
// let CARD_HEIGHT = 175;
// let CARD_PADDING = 8;
// let MAX_RENDER_ITEMS = 10;
// let MIN_RENDER_ITEMS = 5;

// let ViewWrapStyle = { flex: 1 };

export default React.memo(
  function SimpleFlatlist<T>(props: SimpleFlatlistProps<T>): JSX.Element {
    let {
      contentContainerStyle,
      itemHeight,
      itemWidth,
      showsVerticalScrollIndicator,
      showsHorizontalScrollIndicator,
      scrollEventThrottle,
      data,
      onScroll,
      renderItem,
    } = props;

    // maxNumColumn = maxNumColumn || 3;

    contentContainerStyle = {
      // maxWidth: itemWidth * maxNumColumn * 1.01,
      // @ts-ignore
      ...contentContainerStyle,
    };

    let event = new Emitter<Evt>();

    useEffect(() => {
      return () => {
        // @ts-ignore
        event.emitters = {};
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let prevPos = useRef(0);

    return (
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={
          showsVerticalScrollIndicator == null
            ? false
            : showsVerticalScrollIndicator
        }
        showsHorizontalScrollIndicator={
          showsHorizontalScrollIndicator == null
            ? false
            : showsHorizontalScrollIndicator
        }
        scrollEventThrottle={
          scrollEventThrottle == null ? 16 : scrollEventThrottle
        }
        onScroll={e => {
          let { y } = e.nativeEvent.contentOffset;
          onScroll && onScroll(e);
          let position = Math.floor(y / itemHeight);

          if (position === prevPos.current) {
            return;
          }

          prevPos.current = position;

          event.emit('scroll', position);
          // console.log('e', );
          // setPos(Math.floor(y / (CARD_HEIGHT + CARD_PADDING * 2)));
        }}
        contentContainerStyle={
          contentContainerStyle == null ? {} : contentContainerStyle
        }>
        <RenderItems
          itemHeight={itemHeight}
          itemWidth={itemWidth}
          event={event}
          // winSize={3}
          // maxNumColumn={maxNumColumn}
          // @ts-ignore
          renderItem={renderItem}
          data={data}
        />
      </ScrollView>
    );
  }
  // (a, b) => {
  //   return (
  //     a.contentContainerStyle === b.contentContainerStyle &&
  //     a.itemHeight === b.itemHeight &&
  //     a.itemWidth === b.itemWidth &&
  //     a.maxNumColumn === b.maxNumColumn &&
  //     a.scrollEventThrottle === b.scrollEventThrottle &&
  //     a.data === b.data &&
  //     a.onScroll === b.onScroll &&
  //     a.renderItem === b.renderItem
  //   );
  // }
);

// type RenderItemPros<T> = {
//   item: T;
//   event: Emitter<Evt>;
//   index: number;
//   itemHeight: number;
//   itemWidth: number;
//   renderItem: (item: T, idx: number) => JSX.Element;
//   renderBlankItem: (item: T, idx: number) => JSX.Element;
// };

// function RenderItem<T>(props: RenderItemPros<T>) {
//   let {
//     item,

//     index,
//     event,
//     renderItem,
//     renderBlankItem,
//     itemHeight,
//   } = props;

//   // let [pos, setPos] = useState(0);

//   let inProgress = useRef(false);
//   // let isBlank = useRef(false);
//   let [shouldRender, setShouldRender] = useState(
//     index < MAX_RENDER_ITEMS ? true : false
//   );

//   useEffect(() => {
//     inProgress.current = false;
//   }, [shouldRender]);

//   useEffect(() => {
//     let id = -1;
//     let rm = event.on('scroll', position => {
//       if (position - index > MAX_RENDER_ITEMS / 4) {
//         if (shouldRender) {
//           if (inProgress.current) {
//             return;
//           }

//           inProgress.current = true;
//           // cancelAnimationFrame(id);
//           id = requestAnimationFrame(() => {
//             setShouldRender(false);
//           });
//         }

//         return;
//         // }
//       }

//       if (index > MAX_RENDER_ITEMS + position) {
//         // if (isBlank) {
//         if (shouldRender) {
//           if (inProgress.current) {
//             return;
//           }

//           inProgress.current = true;
//           // cancelAnimationFrame(id);
//           id = requestAnimationFrame(() => {
//             setShouldRender(false);
//           });
//         }

//         return;
//         // }
//       }

//       if (shouldRender === false) {
//         if (inProgress.current) {
//           return;
//         }

//         inProgress.current = true;
//         // cancelAnimationFrame(id);
//         id = requestAnimationFrame(() => {
//           setShouldRender(true);
//         });
//         return;
//       }

//       // cancelAnimationFrame(id);
//     });

//     return () => {
//       rm();
//       cancelAnimationFrame(id);
//     };
//   });

//   if (shouldRender === false) {
//     return renderBlankItem(item, index);
//   }

//   return renderItem(item, index);
// }
