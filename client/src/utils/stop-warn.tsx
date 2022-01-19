import { LogBox } from 'react-native';

// let reg = new RegExp('`flexWrap: `wrap``');
// let regs = [
//   /flexWrap/,
//   /startLoadWithResult/,
//   /shouldStartLoad/,
//   /react-native-canvas/,
// ];

let reg =
  /startLoadWithResult|shouldStartLoad|react-native-canvas|Duplicate atom key/;

LogBox.ignoreLogs([reg]);

let _warn = console.warn.bind(console);
console.warn = (...msg) => {
  // console.log(msg[0].match('flexWrap'), msg[0]);
  if (msg[0].match(reg)) {
    // console.log('skipping warp warn');
    return;
  }

  _warn(...msg);
};

let _error = console.error.bind(console);
console.error = (...msg) => {
  console.log(msg);
  _error(...msg);
};
