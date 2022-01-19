import { Platform } from 'react-native';

export const fixWebSvg =
  Platform.OS === 'web'
    ? {
        display: 'inline-flex',
        alignSelf: 'center',
        top: '.125em',
        position: 'relative',
        height: '1.3em',
        width: '1.3em',
      }
    : {};
