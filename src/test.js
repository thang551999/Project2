import React, {Component} from 'react';
import {View} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
var radio_props = [
  {label: 'param1', value: 0},
  {label: 'param2', value: 1},
];

export default class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0',
    };
  }
  render() {
    return (
      <View>
        <RadioForm
          radio_props={radio_props}
          initial={null}
          formHorizontal={false}
          //  labelHorizontal={false}
          onPress={(value) => {
            this.setState({value: value});
          }}
        />
      </View>
    );
  }
}
