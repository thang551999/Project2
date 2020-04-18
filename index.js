/**
 * @format
 */

import { AppRegistry } from 'react-native';
//20191import App from './App';
import { name as appName } from './app.json';
import App from './App';

import test from "./src/test"
AppRegistry.registerComponent(appName, () => App);
