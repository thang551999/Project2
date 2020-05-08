import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import subjectListData from '../common/datasubject';
import firestore from '@react-native-firebase/firestore';

class FlatListItem extends Component {
  render() {
    return (
      <View style={styles.viewItem}>
        <Text style={styles.flatListItem}>
          Môn Học: {this.props.item.namesubject}
        </Text>
        <Text style={styles.flatListItem}>
          Giảng Viên : {this.props.item.teacher}
        </Text>
        <Text style={styles.flatListItem}>
          Mã môn học: {this.props.item.malop}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (this.props.item.trangthailambt == '0') {
              //  this.props.setml();
              this.props.chuyen();
              console.log(this.props.item.malop + 'trongham');
            }
          }}>
          <Text style={styles.lambai}>
            {this.props.item.trangthailambt == '0'
              ? 'Ấn vào đây để làm bài Kiểm tra'
              : 'Điểm :' + this.props.item.diem}
          </Text>
        </TouchableOpacity>
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
  viewItem: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  lambai: {
    color: 'red',

    padding: 10,
    fontSize: 16,
    marginLeft: 60,
  },
});

export default class flatListSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listsubject: [],
      loading: false,
      malop: 'homework',
    };
    this.ref = firestore().collection('users');
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          malop: doc.data().malop,
          namesubject: doc.data().namesubject,
          teacher: doc.data().teacher,
          trangthailambt: doc.data().trangthailambt,
          key: doc.data().key,
          diem: doc.data().diem,
          time: doc.data().time,
        });
      });
      this.setState({
        listsubject: list,
        loading: true,
      });
    });
  }

  chuyen = (malop, time) => {
    this.props.navigation.navigate('Do', {
      id: malop,
      time: time,
    });
  };
  setml = (malopmoi) => {
    console.log(this.state.malop + 'setml1');
    console.log(malopmoi + 'setml2');

    this.setState({malop: malopmoi});
    console.log(malopmoi + 'setml3');
    console.log(this.state.malop + 'setml4');
  };

  render() {
    return this.state.loading == false ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 50,

            backgroundColor: '#4169e1',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Danh Sách Môn Học</Text>
        </View>
        <View>
          <FlatList
            style={{backgroundColor: 'gray'}}
            data={this.state.listsubject}
            renderItem={({item, index}) => {
              return (
                <FlatListItem
                  item={item}
                  index={index}
                  //  setml={() => this.setml(item.malop)}
                  chuyen={() => this.chuyen(item.malop, item.time)}
                />
              );
            }}
            keyExtractor={(item, index) => item.namesubject}
          />
        </View>
      </View>
    );
  }
}
