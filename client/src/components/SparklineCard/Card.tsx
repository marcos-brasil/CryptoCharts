import React, { useEffect, useRef, useState } from 'react';

import {
  // Heart,
  HeartOutline,
  StatsChart,
} from '../../primitives/Icons';
// import Messagecontainer from './MessageContainer';
// import CanvasChart, { getScrollPosition } from './components/Chart';

// import { CoinMetadata } from '../../types';
import { CardProps } from './types';

import { Text, View, useColorScheme, Platform, Pressable } from 'react-native';

import { getLast, useReactNavigation } from '../../utils';

import {
  Center,
  DividerHorizontal,
  DividerVerticle,
  HStack,
  VStack,
} from '../../primitives';

import {
  computeAvailableSupply,
  fixNumber,
  getNumberColor,
  sanatizeProps,
} from './utils';

import cardDarkTheme from './theme/dark';
import cardLightTheme from './theme/light';

import { default as BaseCard } from '../Card';

import { inboundEvt, outboundEvt } from '../../events';
import { useSetRecoilState } from 'recoil';
import { toastAtom } from '../Toast';
import { Routes } from '../../routes';

export function BlankCard(): JSX.Element {
  let OSTheme = useColorScheme();

  let cardTheme = OSTheme === 'dark' ? cardDarkTheme : cardLightTheme;

  return (
    <BaseCard
      containerStyle={cardTheme.cardContainer}
      contentStyle={cardTheme.cardContent}
    />
  );
}

// export default React.memo(Card);

export default function Card(props: CardProps): JSX.Element {
  let OSTheme_ = useColorScheme();

  let [OSTheme, setOSTheme] = useState(OSTheme_);

  let cardTheme = OSTheme === 'dark' ? cardDarkTheme : cardLightTheme;

  let { renderEmptyCard, renderedCanvas, isMounted } = useCardEffect();
  let setToastAttom = useSetRecoilState(toastAtom);
  // let add = useSimulatedPriceChange(isMounted);
  let nav = useReactNavigation<Routes>();
  // useEffect(() => {
  //   if (Platform.OS !== 'web') {
  //     return;
  //   }

  //   let themeHandler = (event: MediaQueryListEvent) => {
  //     if (event.matches) {
  //       setOSTheme('dark');
  //     } else {
  //       setOSTheme('light');
  //     }
  //   };

  //   window
  //     ?.matchMedia('(prefers-color-scheme: dark)')
  //     ?.addEventListener('change', themeHandler);

  //   return () => {
  //     window
  //       ?.matchMedia('(prefers-color-scheme: dark)')
  //       ?.removeEventListener('change', themeHandler);
  //   };
  // }, []);

  let {
    symbol,
    name,
    market_cap,
    market_cap_rank,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    circulating_supply,
    max_supply,
    sparkline_in_7d,
    // height,
  } = sanatizeProps(props);

  let [currentPrice, setCurrentPrice] = useState(
    sparkline_in_7d == null ? '-' : getLast(sparkline_in_7d || [])
  );

  useEffect(() => {
    setCurrentPrice(getLast(sparkline_in_7d || []));
  }, [sparkline_in_7d]);

  useEffect(() => {
    //
    outboundEvt.emit('currentPrice', props.item.id);

    let id: ReturnType<typeof setTimeout>;
    let rm = inboundEvt.on('currentPrice', ([coinId, newPrice]) => {
      if (coinId !== props.item.id) {
        return;
      }

      console.log(new Date(), coinId, newPrice);
      setCurrentPrice(newPrice);

      id = setTimeout(() => {
        outboundEvt.emit('currentPrice', props.item.id);

        // 1 min sleep
      }, 1000 * 60);
    });

    return () => {
      rm();
      clearTimeout(id);
    };
  }, [props.item.id]);

  let secondLastPrice = sparkline_in_7d[sparkline_in_7d.length - 2];

  let currentPriceColor =
    secondLastPrice === currentPrice
      ? cardTheme.coinCurrentPriceEven
      : secondLastPrice > currentPrice
      ? cardTheme.coinCurrentPriceLoss
      : cardTheme.coinCurrentPriceGain;

  currentPrice = fixNumber(Number(currentPrice));

  if (renderEmptyCard) {
    return <BlankCard />;
  }

  //  let price_change_percentage_1h_in_currency

  let avlSupplay = computeAvailableSupply(props);

  return (
    <BaseCard
      containerStyle={cardTheme.cardContainer}
      contentStyle={cardTheme.cardContent}>
      <HStack>
        <VStack style={cardTheme.leftContent}>
          <HStack>
            <Text style={[cardTheme.coinCodeText]}>{symbol}</Text>
            <Text style={currentPriceColor}>{currentPrice}</Text>
          </HStack>

          <DisplayCoinStats title={'rank:  '} value={market_cap_rank} />
          <DisplayCoinStats title={'name:  '} value={name} />

          <DisplayCoinStats
            title={'market cap:  '}
            value={fixNumber(market_cap)}
          />

          <Center>
            <DividerHorizontal style={cardTheme.dividerHorizontal} />
          </Center>

          <DisplayCoinStats
            title={'supplay:  '}
            value={fixNumber(circulating_supply)}
          />

          <DisplayCoinStats
            title={'max supplay  '}
            value={fixNumber(max_supply)}
          />

          <DisplayCoinStats
            title={'future supplay  '}
            value={`${avlSupplay}`}
          />

          <Center style={cardTheme.buttonsContainer}>
            <View style={cardTheme.buttonsContent}>
              <HStack>
                {/* <Heart style={iconStyle} color={theme.colors.trueGray[200]} /> */}
                <Pressable
                  onPress={() => {
                    console.log('add to favorite');
                    setToastAttom({
                      display: true,
                      type: 'success',
                      message: 'Add to Favorities under construction',
                      timer: 1000 * 5, // 5 sec
                      // containerStyle: toatsTop,
                      onPress: () => {
                        // setUserSignUpError(null);
                        console.log('pressed toast');
                      },
                      onClose: () => {
                        setToastAttom({
                          display: false,
                          type: 'success',
                          message: '',
                        });
                      },
                    });
                  }}>
                  <HeartOutline
                    style={cardTheme.raw.heartButtom}
                    color={cardTheme.raw.heartButtom.color}
                  />
                </Pressable>

                <Center>
                  <DividerVerticle style={cardTheme.dividerVertical} />
                </Center>

                <Pressable
                  onPress={() => {
                    console.log('go to chart');
                    nav.navigate('Chart', {
                      coinId: props.item.id,
                    });
                  }}>
                  <StatsChart
                    style={cardTheme.raw.statsButtom}
                    color={cardTheme.raw.statsButtom.color}
                  />
                </Pressable>
              </HStack>
            </View>
          </Center>
        </VStack>

        <VStack>
          <Center>
            <HStack style={cardTheme.coinGainContainer}>
              <DisplayCoinGain
                title={'1h: '}
                value={price_change_percentage_1h_in_currency}
                color={getNumberColor(
                  price_change_percentage_1h_in_currency,
                  OSTheme
                )}
              />

              <DisplayCoinGain
                title={'1d: '}
                value={price_change_percentage_24h_in_currency}
                color={getNumberColor(
                  price_change_percentage_24h_in_currency,
                  OSTheme
                )}
              />

              <DisplayCoinGain
                title={'7d: '}
                value={price_change_percentage_7d_in_currency}
                color={getNumberColor(
                  price_change_percentage_7d_in_currency,
                  OSTheme
                )}
              />
            </HStack>
          </Center>

          <View style={cardTheme.canvas}>
            {renderedCanvas ? props.children : null}
          </View>
        </VStack>
      </HStack>
    </BaseCard>
  );
}

type DisplayCoinData = {
  title: string;
  value: string | number;
  color?: string;
};

let DisplayCoinStats = React.memo(function (props: DisplayCoinData) {
  let value = props.value;

  let OSTheme = useColorScheme();

  let cardTheme = OSTheme === 'dark' ? cardDarkTheme : cardLightTheme;

  if (props.title === 'name:  ') {
    let str = props.value.toString();
    if (str.length > 15) {
      value = str.slice(0, 13) + '...';
    }
  }
  return (
    <Text style={cardTheme.coinStatsTitle}>
      {props.title}
      <Text style={[cardTheme.coinStatsValue]}>{value}</Text>
    </Text>
  );
});

let DisplayCoinGain = React.memo(function (
  props: React.HTMLAttributes<unknown> & DisplayCoinData
) {
  let color = props.color == null ? 'trueGray.300' : props.color;

  let OSTheme = useColorScheme();
  let cardTheme = OSTheme === 'dark' ? cardDarkTheme : cardLightTheme;

  let value =
    typeof props.value === 'number' ? `${props.value.toFixed(2)}%` : '-';

  return (
    <VStack>
      <Text style={[cardTheme.coinGainTitle, { color }]}>
        {props.title}
        <Text style={[cardTheme.coinGainValue, { color }]}>{value}</Text>
      </Text>
    </VStack>
  );
});

// ------- HOOKS ------- //

function useCardEffect() {
  let idEmptyCard = useRef(-1);
  let idRenderedCanvas = useRef(-1);
  let isMounted = useRef(false);

  let [renderEmptyCard, setRenderEmptyCard] = useState(true);
  let [renderedCanvas, setRenderedCanvas] = useState(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      idEmptyCard.current = requestAnimationFrame(() => {
        if (isMounted.current === false) {
          return;
        }
        setRenderEmptyCard(false);
      });
    }, Math.floor(Math.random() * 16));

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(idEmptyCard.current);
    };
  }, [idEmptyCard, isMounted, setRenderEmptyCard]);

  useEffect(() => {
    if (renderEmptyCard) {
      return;
    }

    if (renderedCanvas) {
      return;
    }

    // delaying canvas drawing longer
    let timeoutId = setTimeout(() => {
      idRenderedCanvas.current = requestAnimationFrame(() => {
        if (isMounted.current === false) {
          return;
        }

        if (renderedCanvas) {
          return;
        }

        setRenderedCanvas(true);
      });
    }, Math.floor(Math.random() * 16 + 16));

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(idRenderedCanvas.current);
    };
  }, [renderedCanvas, renderEmptyCard, idRenderedCanvas, isMounted]);

  return { renderEmptyCard, renderedCanvas, isMounted };
}
