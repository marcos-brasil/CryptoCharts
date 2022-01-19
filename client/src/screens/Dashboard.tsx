/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
  Platform,
  useColorScheme,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { handleAppBarDisplay } from '../components/AppBar';

import SparcklineCard, {
  CARD_HEIGHT,
  CARD_PADDING,
  CARD_WIDTH,
} from '../components/SparklineCard';

import { Center } from '../primitives';

import Screen from '../components/Screen';

import { Emitter } from '../utils';

import { CoinMetadata } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SimpleFlatlist from '../components/SimpleFlatlist';
// import { RecoilRoot, useRecoilState } from 'recoil';
// import { useRecoilState } from 'recoil';
// import { signInEmail } from './atoms';
// import { updateReturn } from 'typescript';

import { WSS_URL } from '../constants';

import { signIn as signInAtom } from '../atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { toastAtom } from '../components/Toast';

import { wssIsOpen } from '../events';

import { inboundEvt, outboundEvt, wss } from '../events';

// wssIsOpen().then(() => {

// })

type Evt = {
  points: number[];
  mounted: boolean;
  market: CoinMetadata[];
  scroll: number;
};

let MemoSparcklineCard = React.memo(SparcklineCard);

let renderItem = (item: CoinMetadata | null, _idx: number): JSX.Element => {
  if (item == null) {
    return <></>;
  }

  return (
    <MemoSparcklineCard
      // key={idx + 'rendered'}
      height={CARD_HEIGHT}
      width={CARD_WIDTH}
      item={item}
    />
  );
};

// let queueHandler = () => {
//   // only run the last render job
//   queue.run(1);

//   requestAnimationFrame(queueHandler);
// };

// import {
//   CARD_WIDTH,
//   CARD_PADDING,
//   CARD_HEIGHT,
// } from '../components/SparklineCard/constants';

function computeNumCardsToFetch(
  max: number,
  width: number,
  height: number
): number {
  let numCol = Math.floor(width / (CARD_WIDTH + 2 * CARD_PADDING));

  numCol = numCol < 1 ? 1 : numCol > max ? max : numCol;

  let numRow = Math.ceil(height / (CARD_HEIGHT + 2 * CARD_PADDING));

  let numVisibleCards = numCol * numRow;

  let totalCardsToFecth = numVisibleCards * 2;

  return totalCardsToFecth;
}

let METADATA_PAGE_SIZE = 250;

export default React.memo(
  function HomeScreen(): JSX.Element {
    let inserts = useSafeAreaInsets();

    let viewWrapStyle = { ...inserts, paddingTop: 0 };

    let [market, setMarket] = useState([] as CoinMetadata[]);

    let { height, width } = useWindowDimensions();
    let maxNumCol = 3;

    let numCards = useRef<null | number>(null);

    let isFirstMetadata = useRef(true);

    let metadataPending = useRef(false);

    let _market = useRef([] as CoinMetadata[]);

    // let [numCards, setNumCards] = useState(
    //   computeNumCardsToFetch(maxNumCol, width, height)
    // );

    // useLayoutEffect(() => {
    //   // let rm = evt.on('points', p => setPoints(p));
    //   let rm = evt.on('market', m => setMarket(m));
    //   return () => rm();
    // }, []);

    let metadataHasEnded = useRef(false);

    useEffect(() => {
      let rm1 = inboundEvt.on('metadata', metadata => {
        _market.current = [..._market.current, ...metadata];
        // if (isFirstMetadata.current) {}
        // console.log('AAAAA', metadata);
        setMarket(_market.current);
      });

      let rm2 = inboundEvt.on('metadataEnd', () => {
        metadataHasEnded.current = true;
      });

      return () => {
        rm1();
        rm2();
      };
    }, []);

    useEffect(() => {
      metadataPending.current = false;
    }, [market]);

    useEffect(() => {
      let computedNumCards = computeNumCardsToFetch(maxNumCol, width, height);
      if (isFirstMetadata.current && market.length > 0) {
        isFirstMetadata.current = false;
        metadataPending.current = true;
        outboundEvt.emit('metadata', [
          computedNumCards,
          computedNumCards + METADATA_PAGE_SIZE,
        ]);
      }
    }, [height, market, maxNumCol, width]);

    useEffect(() => {
      let computedNumCards = computeNumCardsToFetch(maxNumCol, width, height);
      if (numCards.current !== computedNumCards) {
        let extraCardsToFetch = computedNumCards - (numCards.current || 0);

        if (extraCardsToFetch > 0) {
          outboundEvt.emit('metadata', [
            computedNumCards - extraCardsToFetch,
            computedNumCards,
          ]);
        }

        numCards.current = computedNumCards;
      }
      // setNumCards();

      console.log('mounted');

      // evt.emit('mounted', true);
    }, [height, maxNumCol, width]);

    // let OSTheme = useColorScheme();

    return (
      <Screen>
        <Center>
          <View
            style={{
              flex: 1,
              maxWidth: maxNumCol * (CARD_WIDTH + 2 * CARD_PADDING),
              marginTop:
                Platform.OS === 'web' ? -8 : Platform.OS === 'ios' ? -12 : 0,
            }}>
            <SimpleFlatlist
              itemHeight={CARD_HEIGHT + CARD_PADDING * 2}
              itemWidth={CARD_WIDTH + CARD_PADDING * 2}
              data={market}
              // @ts-ignore
              renderItem={renderItem}
              // renderBlankItem={renderBlankItem}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={12}
              maxNumColumn={maxNumCol}
              onScroll={handleAppBarDisplay}
              onEndReachedThreshold={100}
              onEndReached={_pos => {
                // console.log('pos', pos);
                if (metadataHasEnded.current || metadataPending.current) {
                  return;
                }

                metadataPending.current = true;

                outboundEvt.emit('metadata', [
                  market.length,
                  market.length + METADATA_PAGE_SIZE,
                ]);
              }}
              contentContainerStyle={{
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                overflow: 'hidden',
                ...viewWrapStyle,
                // maxWidth: (CARD_WIDTH + CARD_PADDING * 2) * 3 * 1.01,
              }}
            />
          </View>
        </Center>
      </Screen>
    );
  },
  () => true
);

// let evt = new Emitter<Evt>();

// wss.addEventListener('message', async msg => {
//   let market: CoinMetadata[] = JSON.parse(msg.data);
//   // console.log(market[1]);
//   // let points: number[] = market[0].sparkline_in_7d.price;
//   // console.log('recived msg:', points);
//   // evt.emit('points', points);
//   // console.log('mkt', market);

//   evt.emit('market', market);
// });

// wss.addEventListener('error', e => {
//   console.log('EEEE', e);
// });

// evt.on('mounted', () => {
//   if (wss.readyState === wss.OPEN) {
//     // console.log('****&&&&&');
//     // for some reason on native websocket takes longer to establish connection
//     // hack create a recusrve loop trying to send a market order.
//     // set a timeout to avoid maximun callback stack error
//     try {
//       wss.send('market');
//     } catch (e) {
//       console.log(Platform.OS, e);
//       setTimeout(() => {
//         evt.emit('mounted', true);
//       }, 10);
//     }
//   } else {
//     setTimeout(() => {
//       evt.emit('mounted', true);
//     }, 10);
//   }
// });

// let CARD_WIDTH = 360;
// let CARD_HEIGHT = 175;
// let CARD_PADDING = 8;
// let MAX_RENDER_ITEMS = 10;
// let MIN_RENDER_ITEMS = 5;

// <View style={{ flex: 1 }}>
// <ScrollView
//   showsVerticalScrollIndicator={false}
//   showsHorizontalScrollIndicator={false}
//   scrollEventThrottle={16 * 4}
//   onScroll={e => {
//     let { y } = e.nativeEvent.contentOffset;

//     event.emit('scroll', Math.floor(y));
//     // console.log('e', );
//     // setPos(Math.floor(y / (CARD_HEIGHT + CARD_PADDING * 2)));
//   }}
//   contentContainerStyle={{
//     justifyContent: 'center',
//     alignContent: 'center',
//     // flexDirection: 'row',
//     flexWrap: 'wrap',
//   }}>
//   {market.map((v, idx) => (
//     <RenderItem
//       event={event}
//       key={idx + ''}
//       renderItem={renderIterms}
//       item={v}
//       index={idx}
//     />
//   ))}
// </ScrollView>
// </View>
// <Center style={{ flex: 1, height: '100%' }}>
// <FlatList
//   // extraData={counter}
//   showsVerticalScrollIndicator={false}
//   showsHorizontalScrollIndicator={false}
//   // @ts-ignore
//   contentContainerStyle={contentStyle}
//   key={numColumns}
//   // paddingTop={Platform.select({
//   //   android: 20,
//   //   ios: headerHeight + 4,
//   //   default: headerHeight - 10,
//   // })}
//   numColumns={Platform.OS === 'web' ? numColumns - 1 : numColumns}
//   scrollEventThrottle={16 * 4}
//   onScroll={e => {
//     console.log('EEEE', e);
//   }}
//   // onScroll={handleAppBarDisplay}
//   // data={market.map(v => ({ ...v }))}
//   data={market}
//   keyExtractor={(item, index) => item.market_cap_rank + '-' + index}
//   renderItem={renderIterms}
//   keyboardDismissMode="on-drag"
//   keyboardShouldPersistTaps="never"
//   // initialNumToRender={20}
//   maxToRenderPerBatch={40}
//   windowSize={41}
//   removeClippedSubviews={true}
//   // getItemLayout={getItemLayout}
// />
// </Center>

// const ImageCard = ({ uri }: { uri: string }) => {
//   return (
//     <Image
//       // resizeMode="cover"
//       // eslint-disable-next-line react-native/no-inline-styles
//       style={{ width: '100%', height: '100%' }}
//       source={{
//         uri: uri,
//       }}
//       alt="image"
//     />
//   );
// };

// {/* <ScrollView
// // contentContainerStyle={{ flexGrow: 1 }}
// // scrollEnabled={parentScrollEnabled}
// scrollEventThrottle={16 * 4}
// onScroll={handleAppBarDisplay}>
// <Box zIndex={100} paddingLeft={6} paddingRight={6}>
// <Flex
//   padding={4}
//   paddingTop={Platform.select({
//     android: 20,
//     ios: headerHeight + 4,
//     default: headerHeight - 10,
//   })}
//   direction="row"
//   wrap="wrap"
//   justify="center">
//     <Card>
//       <Sparkline points={points} />
//     </Card>

//     {/* <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card>
//     <Card>
//       <ImageCard uri={uri} />
//     </Card> */}
//   </Flex>
// </Box>
// </ScrollView> */}

// {/* <Card>
//     <ScrollBox
//       width={'100%'}
//       height={'100%'}
//       // ref={scrollBoxRef}
//       getScrollPosition={getScrollPosition}>
//       {Chart2}
//     </ScrollBox>
//   </Card> */}
//   {/* <Card>
//     <CanvasChart />
//   </Card> */}
//   {/* <Box style={{ width: '100%' }}>
//     <ScrollView
//       // contentContainerStyle={{ flex: 1 }}
//       // scrollEnabled={true}
//       nestedScrollEnabled={true}
//       horizontal={true}
//       // hack
//       // onTouchStart={() => {
//       //   setParentScrollEnabled(false);
//       // }}
//       // onScrollEndDrag={() => {
//       //   setParentScrollEnabled(true);
//       // }}
//       // onMomentumScrollEnd={() => {
//       //   setParentScrollEnabled(true);
//       // }}
//     >
//       <Card>
//         <ImageCard uri={uri} />
//       </Card>
//       <Card>
//         <ImageCard uri={uri} />
//       </Card>
//       <Card>
//         <ImageCard uri={uri} />
//       </Card>
//       <Card>
//         <ImageCard uri={uri} />
//       </Card>
//       <Card>
//         <ImageCard uri={uri} />
//       </Card>
//       <Card>
//         <ImageCard uri={uri} />
//       </Card>
//       <Card>
//         <ImageCard uri={uri} />
//       </Card>
//       <Card>
//         <ImageCard uri={uri} />
//       </Card>
//     </ScrollView>
//   </Box> */}

// import // StyleSheet,
// SafeAreaView,
// // ScrollView,
// // StatusBar,
// // StyleSheet,
// // Text,
// // useColorScheme,
// // View,
// from 'react-native';

// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // const App = () => {
// //   return (
// //     <SafeAreaView>
// //       <View>
// //         <Text>Hello World !!!!</Text>
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// export default App;
