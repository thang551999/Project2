import React, {Component} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import CountDown from 'react-native-countdown-component';
export default class test extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          size={60}
          onComplete={() => alert('Finished')}
          colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}>
          {({remainingTime, animatedColor}) => (
            <Animated.Text
              style={{...styles.remainingTime, color: animatedColor}}>
              {remainingTime}
            </Animated.Text>
          )}
        </CountdownCircleTimer>
        <CountDown
          until={60 * 0 + 30}
          size={25}
          onFinish={() => alert('Finished')}
          digitStyle={{backgroundColor: 'green'}}
          digitTxtStyle={{color: '#1CC625'}}
          timeToShow={['M', 'S']}
          timeLabels={{m: 'Phút', s: 'Giây'}}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  remainingTime: {
    fontSize: 15,
  },
});
