import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';

import dethidata from '../common/dethidata';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { ScrollView } from 'react-native-gesture-handler';
class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
      checked2: true,
      checked3: true,
      checked4: true,
    };
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginTop: 5,
          marginLeft: 5,
          marginRight: 5,
          // this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato',
          borderRadius: 10,
        }}>

        <Text style={styles.flatListItem}>Câu : {this.props.index + 1}</Text>
        <Text style={styles.flatListItem}>{this.props.item.Noidung}</Text>
        <RadioForm
          radio_props={this.props.item.radio_props}
          initial={0}
          onPress={(value) => { console.log(value) }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flatListItem: {
    color: 'black',
    padding: 10,
    fontSize: 16,
  },
});

export default class flatListdo extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'lightyellow  ' }}>
        <View
          style={{
            backgroundColor: 'skyblue',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 25 }}> Trắc nghiệm</Text>
        </View>
        <ScrollView>
          <FlatList
            data={dethidata}
            renderItem={({ item, index }) => {
              //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
              return <FlatListItem item={item} index={index} />;
            }}

          />
          <Button title='QuayLai' onPress={() => this.props.navigation.navigate('List')}></Button>
          <Button title=' Đăng Xuất' onPress={() => this.props.navigation.navigate('Home')}></Button>
        </ScrollView>
      </View>
    );
  }
}
