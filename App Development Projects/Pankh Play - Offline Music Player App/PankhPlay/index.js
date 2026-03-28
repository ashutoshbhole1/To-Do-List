import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
registerRootComponent(App);

// Register the playback service required by react-native-track-player
TrackPlayer.registerPlaybackService(() => require('./src/core/service'));
