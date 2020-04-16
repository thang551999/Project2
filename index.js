/**
 * @format
 */

import { AppRegistry } from 'react-native';
//20191import App from './App';
import { name as appName } from './app.json';
import App from './App';
import login from './src/screens/login'
import ui from './src/screens/ui'
AppRegistry.registerComponent(appName, () => App);
