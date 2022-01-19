import { Platform } from 'react-native';

import { StyleSheet } from '../../primitives';

export default StyleSheet.create({
  toastContainer: {
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // top: height - bottomHeight,
    // position: Platform.OS === 'web' ? ('fixed' as 'absolute') : 'absolute',
    // borderWidth: 1,
    height: 50,
    borderRadius: 5,
    // width: formDarkTheme.raw.formContent.width,
  },

  toastContent: {
    fontSize: 14,
    fontWeight: '500',
  },

  closeButtonBackground: {
    position: 'absolute',
    right: -5,
    top: Platform.OS === 'web' ? -8 : -5,

    zIndex: 100,
    borderRadius: 30,

    // borderWidth: 1,
    // borderColor: 'red',
    // borderRadius: 20,

    height: Platform.OS === 'web' ? 15 : 18,
    width: Platform.OS === 'web' ? 15 : 18,
  },
  closeButtonMargin: {
    marginLeft: Platform.OS === 'web' ? -5 : -3,
    marginTop: Platform.OS === 'web' ? -5 : -5,
  },
});
