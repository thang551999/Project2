import React, { Component } from 'react'
import { FlatList, Text, View, TouchableHighlight, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore'
export default class Totocomponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            todoTasks: [],
            newTaskName: '',
            loading: false,
        });
        this.ref = firestore().collection('users')
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
            const todos = [];
            querySnapshot.forEach((doc) => {
                todos.push({
                    taskName: doc.data().malop,
                    subject: doc.data().namesubject,
                    teacher: doc.data().teacher,
                });
            });
            this.setState({
                todoTasks: todos,
                loading: false,
            });
        });
    }
    onPressAdd = () => {
        this.ref.add({
            taskName: this.state.newTaskName
        }).then((data) => {
            console.log(`added data = ${data}`);
            this.setState({
                newTaskName: '',
                loading: true
            });
        }).catch((error) => {
            console.log(`error adding Firestore document = ${error}`);
            this.setState({
                newTaskName: '',
                loading: true
            });


        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: 'tomato',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 64
                }}>
                    <TextInput style={{
                        height: 40,
                        width: 200,
                        margin: 10,
                        padding: 10,
                        borderColor: 'white',
                        borderWidth: 1,
                        color: 'white'
                    }}
                        keyboardType='default'
                        placeholderTextColor='white'
                        placeholder='Enter task name'
                        autoCapitalize='none'
                        onChangeText={
                            (text) => {
                                this.setState({ newTaskName: text });
                            }
                        }
                    />
                    <TouchableHighlight
                        style={{ marginRight: 10 }}
                        underlayColor='tomato'
                        onPress={this.onPressAdd}
                    >
                        <Text>Hello</Text>
                    </TouchableHighlight>
                </View>
                <FlatList
                    data={this.state.todoTasks}
                    renderItem={({ item, index }) => {
                        return (
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                margin: 40
                            }}>{item.subject}</Text>

                        );


                    }}
                    keyExtractor={(item, index) => item.taskName}
                >
                </FlatList>
            </View>
        )
    }
}
