import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
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
        });
      });
      this.setState({
        listsubject: list,
        loading: false,
      });
    });
  }

  chuyen = (malop) => {
    this.props.navigation.navigate('Do', {
      id: malop,
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
    return (
      <View style={{flex: 1}}>
        <Text
          style={{
            height: 40,
            fontSize: 20,
            paddingLeft: 80,
            paddingTop: 5,
            backgroundColor: '#4169e1',
            color: 'white',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          Danh Sách Môn Học
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gainsboro',
            borderRadius: 10,
            backgroundColor: 'white',
          }}
          placeholder="Tìm Kiếm Môn Học"
        />

        <FlatList
          style={{backgroundColor: 'gray'}}
          data={this.state.listsubject}
          renderItem={({item, index}) => {
            return (
              <FlatListItem
                item={item}
                index={index}
                //  setml={() => this.setml(item.malop)}
                chuyen={() => this.chuyen(item.malop)}
              />
            );
          }}
          keyExtractor={(item, index) => item.namesubject}
        />
      </View>
    );
  }
}
