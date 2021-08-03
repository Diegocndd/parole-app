import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';

let reactotron;

if (__DEV__) {
  reactotron = Reactotron.configure({host: '192.168.15.3'})
    .useReactNative()
    .use(reactotronRedux())
    .setAsyncStorageHandler(AsyncStorage)
    .connect();

  reactotron.clear();

  console.tron = reactotron;
}

export {reactotron};
