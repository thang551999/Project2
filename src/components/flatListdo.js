import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
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
      radio_props: [],
    };
  }
  componentDidMount() {
    const bt = [];
    bt.push({
      label: this.props.item.A,
      value: this.props.item.A
    });
    bt.push({
      label: this.props.item.B,
      value: this.props.item.A
    });
    bt.push({
      label: this.props.item.C,
      value: this.props.item.A

    });
    bt.push({
      label: this.props.item.D,
      value: this.props.item.A
    });

    this.setState({
      radio_props: bt,
      loading: false,
    });

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
        <Text style={styles.flatListItem}>{this.props.item.question}</Text>
        <RadioForm
          radio_props={this.state.radio_props}
          // RadioButtonLabel={this.state.radio_props}
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
  constructor(props) {
    super(props);
    this.state = ({
      homework: [],
      loading: false,
    });
    this.ref = firestore().collection('homework')
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
      const bt = [];
      querySnapshot.forEach((doc) => {
        bt.push({
          question: doc.data().question,
          A: doc.data().A,
          B: doc.data().B,
          C: doc.data().C,
          D: doc.data().D,

        });
      });
      this.setState({
        homework: bt,
        loading: false,
      });
    });
  }
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
            data={this.state.homework}
            renderItem={({ item, index }) => {
              console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
              return <FlatListItem item={item} index={index} />;
            }}
            keyExtractor={(item, index) => item.question}
          />
          <Button title='Nộp Bài' onPress={() => this.props.navigation.navigate('List')}></Button>
          <Button title=' Đăng Xuất' onPress={() => this.props.navigation.navigate('Home')}></Button>
        </ScrollView>
      </View>
    );
  }
}
