import React, { useState, useEffect } from 'react';
import { CoinMetadata } from '../../types';

import { useColorScheme } from 'react-native';

import Card from './Card';

import { getNumberColor } from './utils';

import { CARD_HEIGHT, CARD_PADDING, CARD_WIDTH } from './constants';

import Sparkline from './Sparkline';

import { inboundEvt, outboundEvt } from '../../events';

type Props = React.HTMLAttributes<JSX.Element> & {
  item: CoinMetadata;
  width: number;
  height: number;
};

export { CARD_HEIGHT, CARD_PADDING, CARD_WIDTH };

let MemoSparkline = React.memo(Sparkline);

export default function SparklineCard(props: Props): JSX.Element {
  let OSTheme = useColorScheme();

  // let [points, setPoints] = useState([] as number[]);

  let [item, setItem] = useState(props.item);

  let color = getNumberColor(
    item.price_change_percentage_7d_in_currency,
    OSTheme
  );

  useEffect(() => {
    outboundEvt.emit('sparkline', props.item.id);

    let rm1 = inboundEvt.on('sparkline', p => {
      let [coinId, newPoints] = p;

      if (coinId !== props.item.id) {
        return;
      }

      if (newPoints == null) {
        return;
      }

      item.price_change_percentage_1h_in_currency =
        100 *
        (newPoints[newPoints.length - 1] / newPoints[newPoints.length - 2] - 1);

      item.price_change_percentage_24h_in_currency =
        100 *
        (newPoints[newPoints.length - 1] / newPoints[newPoints.length - 7] - 1);

      item.price_change_percentage_7d_in_currency =
        100 * (newPoints[newPoints.length - 1] / newPoints[0] - 1);

      // item.sparkline_in_7d = item.sparkline_in_7d || {};
      // item.sparkline_in_7d.price = newPoints;

      // if (
      //   item.price_change_percentage_1h_in_currency &&
      //   item.price_change_percentage_24h_in_currency &&
      //   item.price_change_percentage_7d_in_currency
      // ) {
      setItem({
        ...item,
        sparkline_in_7d: newPoints,
      });
      // }
    });
    return () => {
      rm1();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.item.id]);

  // item.sparkline_in_7d = item.sparkline_in_7d || {};
  item.sparkline_in_7d = item.sparkline_in_7d || [];

  // console.log('---', props.item.id);
  return (
    <Card item={item}>
      <MemoSparkline
        color={color}
        style={{ height: props.height }}
        points={item.sparkline_in_7d}
      />
    </Card>
  );
}
