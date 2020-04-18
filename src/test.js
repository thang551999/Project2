import React, { Component } from 'react'
import { View } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
var radio_props = [
    { A: "thang" },
    { B: "thang" }
];
var news = [
    {
        B: "thang",
        A: "thang"
    }];

export default class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '0',
            types: radio_props,
            value3Index: '',
        };
    }
    render() {
        return (
            <View>
                <RadioForm
                    radio_props={news}
                    RadioButtonLabel={news}
                    initial={0}
                    onPress={(value) => { console.log(value) }}

                />

            </View>
        )
    }
}
