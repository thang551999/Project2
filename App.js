import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from './src/screens/login'
import flatListSubject from './src/components/flatListSubject'
import flatListdo from './src/components/flatListdo'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="List"
          component={flatListSubject}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Do"
          component={flatListdo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;