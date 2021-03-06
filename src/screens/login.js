import React, {Component} from 'react';
import {StyleSheet, TextInput, Button} from 'react-native';
import {View, Image, Alert} from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      typedEmail: '@sis.hust.edu.vn',
      typedPassword: '',
      isLogin: false,
    };
  }
  onAnonymousLogin = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log(`Login successfully`);
        this.setState({
          isAuthenticated: true,
        });
        this.props.navigation.navigate('List');
      })
      .catch((error) => {
        console.log(`Login failed. Error = ${error}`);
      });
  };
  onRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.typedEmail,
        this.state.typedPassword,
      )
      .then((loggedInUser) => {
        this.setState({user: loggedInUser});
        console.log(
          `Register with user : ${JSON.stringify(loggedInUser.toJSON())}`,
        );
      })
      .catch((error) => {
        console.log(`Register fail with error: ${error}`);
      });
  };
  onLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.typedEmail,
        this.state.typedPassword,
      )
      .then((loggedInUser) => {
        this.setState({isLogin: true});
        console.log(`Login with user : `);
        this.props.navigation.navigate('List');
      })
      .catch((error) => {
        console.log(`Login fail with error: ${error}`);
        Alert.alert('Đăng Nhập Thất Bại');
      });
  };
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.image}>
          <Image
            source={require('../../image/logo.png')}
            style={styles.images}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.TextInput}
            autoFocus={true}
            keyboardType="email-address"
            placeholder="Enter your email"
            onChangeText={(text) => {
              this.setState({typedEmail: text});
            }}
          />

          <TextInput
            style={styles.TextInput}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(text) => {
              this.setState({typedPassword: text});
            }}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {/* <Button
              style={{ marginTop: 10, padding: 10, borderRadius: 30 }}
              title="Đăng Nhập"
              onPress={this.onLogin}

            /> */}
            <Button
              style={{marginTop: 20, padding: 20, borderRadius: 50}}
              title="Đăng Nhập"
              onPress={() => this.onLogin()}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: 300,
  },
  images: {
    width: 225,
    height: 225,
    margin: 80,
  },

  TextInput: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    borderRadius: 10,
  },
  input: {
    flex: 5,
  },
});
const image = {
  uri:
    'data:image/png;base64,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',
};
