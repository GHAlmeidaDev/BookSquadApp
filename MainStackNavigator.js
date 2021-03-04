import React from 'react'

import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase/app'
import 'firebase/auth'
import { theme } from './src/core/theme'
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,

} from './src/screens'
import { LogBox, Button} from 'react-native';
import _ from 'lodash';

import ButtomTabNavigator from './src/component/TabNavigator'
import { FIREBASE_CONFIG } from './src/core/config'
import tab from './src/component/TabNavigator'
import ciencia from './src/component/generos'
import Livros from './src/screens/livros'

const Stack = createStackNavigator()
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



const MainStackNavigator = () => {
  return (
    
    <Provider theme={theme}>
      <NavigationContainer>
        
        <Stack.Navigator
          initialRouteName="AuthLoadingScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
          />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="tab" component={tab} />
          <Stack.Screen name="Livros" component={Livros} />
         
          
          <Stack.Screen 
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
   
  
  )
}


export default MainStackNavigator
