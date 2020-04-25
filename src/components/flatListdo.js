import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {ScrollView} from 'react-native-gesture-handler';
class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 0,
      // diem: 0,
      radio_props: [],
    };
  }
  componentDidMount() {
    const bt = [];
    bt.push({
      label: this.props.item.A,
      value: 'A',
    });
    bt.push({
      label: this.props.item.B,
      value: 'B',
    });
    bt.push({
      label: this.props.item.C,
      value: 'C',
    });
    bt.push({
      label: this.props.item.D,
      value: 'D',
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
          borderRadius: 10,
        }}>
        <Text style={styles.flatListItem}>Câu : {this.props.index + 1}</Text>
        <Text style={styles.flatListItem}>{this.props.item.question}</Text>
        <RadioForm
          radio_props={this.state.radio_props}
          // RadioButtonLabel={this.state.radio_props}
          initial={null}
          onPress={(value) => {
            if (value == this.props.item.DA && this.state.checked == 0) {
              //chọn đúng
              //  this.setState({diem: this.state.diem + 1});
              this.props.tinhdiemcong();
              this.setState({checked: 1});
              //  console.log('1');
            }
            if (value != this.props.item.DA && this.state.checked == 1) {
              //chọn đúng sửa thành chọn sai
              //  this.setState({diem: this.state.diem - 1});
              this.props.tinhdiemtru();
              this.setState({checked: 0});
              // console.log('0');
            }
            if (value != this.props.item.DA && this.state.checked == 0) {
              //chọn sai
              this.props.tinhdiem();
              // this.setState({diem: this.state.diem + 0});
              this.setState({checked: 0});
              // console.log('0');
            }
          }}
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
    this.state = {
      homework: [],
      loading: false,
      diem: 0,
      //  malop: this.props.route.params.itemId,
    };
    this.ref = firestore().collection(this.props.route.params.id);
  }

  add = () => {
    firestore()
      .collection('users')
      .doc(this.props.route.params.id)
      .update({
        diem: this.state.diem,
        trangthailambt: 1,
      })
      .then((data) => {
        console.log(`added data = ${data}`);
      })
      .catch((error) => {
        console.log(`error adding Firestore document = ${error}`);
      });
    console.log(this.state.diem);
    this.chuyenman();
  };
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
          DA: doc.data().DA,
        });
      });
      this.setState({
        homework: bt,
        loading: false,
      });
    });
  }

  tinhdiemcong = () => {
    this.setState({diem: this.state.diem + 1});
    // console.log('cong');
  };
  tinhdiem = () => {
    this.setState({diem: this.state.diem + 0});
    //  console.log('tru');
  };
  tinhdiemtru = () => {
    this.setState({diem: this.state.diem - 1});
    // console.log('s');
  };

  chuyenman = () => {
    this.props.navigation.navigate('List');
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'lightyellow  '}}>
        <View
          style={{
            backgroundColor: 'skyblue',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 25}}> Trắc nghiệm</Text>
        </View>
        {/* // <Text>{this.props.route.params.id}</Text> */}
        <ScrollView>
          <FlatList
            data={this.state.homework}
            renderItem={({item, index}) => {
              return (
                <FlatListItem
                  item={item}
                  index={index}
                  // diem={this.props.diem}
                  tinhdiemcong={() => this.tinhdiemcong()}
                  tinhdiemtru={() => this.tinhdiemtru()}
                  tinhdiem={() => this.tinhdiem()}
                />
              );
            }}
            keyExtractor={(item, index) => item.question}
          />
          <Button title=" Nộp Bài" onPress={() => this.add()}></Button>
        </ScrollView>
      </View>
    );
  }
}
