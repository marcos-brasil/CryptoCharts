import { StyleSheet, mergeStyleSheetMany } from '../../../primitives';

import cardBaseTheme from './base';
import appDarkTheme from '../../../themes/dark';

import { red65, gray90, gray45, green70 } from '../../theme';

export default mergeStyleSheetMany(
  cardBaseTheme,
  appDarkTheme,
  StyleSheet.create({
    cardContainer: {},
    cardContent: {},
    leftContent: {},
    coinCodeText: {
      color: gray90,
    },
    coinCurrentPrice: {
      color: gray90,
    },
    coinCurrentPriceEven: {
      color: gray90,
    },
    coinCurrentPriceLoss: {
      color: red65,
    },
    coinCurrentPriceGain: {
      color: green70,
    },
    coinStatsTitle: {
      color: gray90,
    },
    coinStatsValue: {
      color: gray90,
    },
    dividerHorizontal: {
      borderColor: gray45,
    },
    dividerVertical: {
      borderColor: gray45,
    },
    buttonsContent: {},
    button: {},

    heartButtom: {
      color: appDarkTheme.raw.button.color,
    },
    statsButtom: {
      color: appDarkTheme.raw.button.color,
    },
  })
);
