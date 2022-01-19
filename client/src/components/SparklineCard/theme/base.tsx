import { Platform, ViewStyle } from 'react-native';

import { StyleSheet, mergeStyleSheet } from '../../../primitives';
// import { fixWebSvg } from '../../fix-web-svg';

import { CARD_HEIGHT, CARD_PADDING, CARD_WIDTH } from '../constants';

import base from '../../../themes/base';

// export let gray = theme.colors.trueGray[700];
// export let red = (theme.colors.error as Record<number, string>)[800];
// export let green = (theme.colors.success as Record<number, string>)[700];

// console.log(gray, red, green);

let paddingFix = 26;
let leftBoxWidth = CARD_WIDTH / 3 + paddingFix;
let rightBoxWidth = CARD_WIDTH - leftBoxWidth;

export default mergeStyleSheet(
  base,
  StyleSheet.create({
    cardContainer: {
      padding: CARD_PADDING,
      height: CARD_HEIGHT + CARD_PADDING * 2,
      width: CARD_WIDTH + CARD_PADDING * 2,
    },
    cardContent: {
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
    },
    leftContent: {
      width: leftBoxWidth,
      paddingLeft: 10,
      paddingRight: 4,
    },
    coinCodeText: {
      paddingTop: Platform.OS === 'web' ? 10 : 14,
      lineHeight: 6,
      fontWeight: '400',
      marginBottom: 4,
    },

    coinCurrentPrice: {
      paddingTop: Platform.OS === 'web' ? 10 : 14,
      position: 'absolute',
      right: 1,
      fontSize: 14,
      lineHeight: 6,
      fontWeight: '400',
    },

    coinCurrentPriceEven: {
      paddingTop: Platform.OS === 'web' ? 10 : 14,
      position: 'absolute',
      right: 1,
      fontSize: 14,
      lineHeight: 6,
      fontWeight: '400',
    },

    coinCurrentPriceLoss: {
      paddingTop: Platform.OS === 'web' ? 10 : 14,
      position: 'absolute',
      right: 1,
      fontSize: 14,
      lineHeight: 6,
      fontWeight: '400',
    },

    coinCurrentPriceGain: {
      paddingTop: Platform.OS === 'web' ? 10 : 14,
      position: 'absolute',
      right: 1,
      fontSize: 14,
      lineHeight: 6,
      fontWeight: '400',
    },

    coinGainContainer: {
      paddingTop: Platform.OS === 'web' ? 4 : 6,
    },
    coinGainTitle: {
      paddingTop: 5,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: 11.5,
      lineHeight: 7,
      fontWeight: Platform.OS === 'web' ? '300' : '400',
    },
    coinGainValue: {
      fontWeight: '600',
      fontSize: 11,
    },
    coinStatsTitle: {
      paddingTop: 10,
      fontSize: 11.5,
      // ml:{2},
      lineHeight: 6,
      fontWeight: Platform.OS === 'web' ? '300' : '400',
      // color: theme.colors.trueGray[700],
    },
    coinStatsValue: {
      fontSize: 11,
      // ml:{2},
      lineHeight: 6,
      fontWeight: '600',
    },
    dividerHorizontal: {
      marginTop: 10,
      width: '95%',
    },
    dividerVertical: {
      height: '50%',
    },
    buttonsContainer: {
      marginTop: Platform.OS === 'web' ? 12 : 9,
    },
    canvas: {
      padding: 2,
      paddingLeft: 4,
      width: rightBoxWidth,
      height: '90%',
    },
    heartButtom: {
      ...(base.raw.button as ViewStyle),
      paddingTop: 2,
    },
    statsButtom: {
      ...(base.raw.button as ViewStyle),
      ...((Platform.OS === 'web'
        ? {
            height: '1.4em',
            width: '1.4em',
            paddingRight: 12,
          }
        : {}) as ViewStyle),
    },
  })
);
