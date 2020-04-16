import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import subjectListData from '../common/datasubject';

class FlatListItem extends Component {
  render() {
    return (
      <View
        style={styles.viewItem}>
        <Text style={styles.flatListItem}>Môn Học: {this.props.item.namesubject}</Text>
        <Text style={styles.flatListItem}>
          Giảng Viên : {this.props.item.teacher}
        </Text>
        <Text style={styles.flatListItem}>
          Mã Lớp : {this.props.item.malop}
        </Text>
        <TouchableOpacity
          onPress={this.props.onPress}
        >
          <Text style={styles.lambai} >
            {this.props.item.trangthailambt == 'Chưa' ? "Ấn vào đây để làm bài Kiểm tra" : ""}
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
    backgroundColor:
      "white",
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
  chuyen = () => {
    this.props.navigation.navigate('Do')
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{
          height: 40,
          fontSize: 20,
          paddingLeft: 80,
          paddingTop: 5,
          backgroundColor: "#4169e1",
          color: 'white',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: "center",
        }}>Danh Sách Môn Học</Text>
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
          style={{ backgroundColor: 'gray' }}
          data={subjectListData}
          renderItem={({ item, index }) => {
            return <FlatListItem
              item={item}
              index={index}
              onPress={() => this.props.navigation.navigate('Do')}
            />;
          }}
        />
      </View>
    );
  }
}