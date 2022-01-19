import { StyleSheet, mergeStyleSheetMany } from '../../../primitives';

import { red35, gray10, gray45, green25 } from '../../theme';

import cardBaseTheme from './base';

import appLightTheme from '../../../themes/light';

export default mergeStyleSheetMany(
  cardBaseTheme,
  appLightTheme,
  StyleSheet.create({
    cardContainer: {},
    cardContent: {},
    leftContent: {},

    coinCodeText: {
      color: gray10,
    },
    coinCurrentPrice: {
      color: gray10,
    },

    coinCurrentPriceEven: {
      color: gray10,
    },
    coinCurrentPriceLoss: {
      color: red35,
    },
    coinCurrentPriceGain: {
      color: green25,
    },

    coinStatsTitle: {
      color: gray10,
    },
    coinStatsValue: {
      color: gray10,
    },

    dividerHorizontal: {
      borderColor: gray45,
    },
    dividerVertical: {
      borderColor: gray45,
    },

    // buttonsContent: {
    //   borderColor: 'rgba(0, 0, 0, 0.2)',
    //   backgroundColor: 'rgba(255, 255, 255, 0.4)',
    // },
    button: {},

    heartButtom: {
      color: appLightTheme.raw.button.color,
    },
    statsButtom: {
      color: appLightTheme.raw.button.color,
    },

    canvas: {},
  })
);
