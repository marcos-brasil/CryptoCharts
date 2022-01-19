// let config = {
//   presets: ['module:metro-react-native-babel-preset'],
// };

// if (process.env.PLATFORM === 'web') {
//   config.presets.push('react-native-web');
//   config.plugins = [
//     'react-native-web',
//     [
//       'module-resolver',
//       {
//         alias: {
//           '^react-native$': 'react-native-web',
//         },
//       },
//     ],
//   ];
// }

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
};
