import { AppRegistry, LogBox, Platform } from 'react-native';
import App from './src/App';
import appConfig from './app.json';

AppRegistry.registerComponent(appConfig.name, () => App);

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.console.log = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.console.warn = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.console.info = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.console.error = () => {};
}

if (Platform.OS === 'web') {
  if (process.env.NODE_ENV === 'production') {
    // TODO: disable yellow box better
    LogBox.ignoreAllLogs(true);
    console.disableYellowBox = true;
  }

  AppRegistry.runApplication(appConfig.name, {
    rootTag: document.getElementById('root'),
  });
}
