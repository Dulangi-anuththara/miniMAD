/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import { Login, Register, Home, SignOut, Assignments} from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserContext } from './context/UserContext'

const App= () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [data,setData] = useState([]);

  function onAuthStateChanged(user) {
    setUser(user);
    if(user) setData(data.concat(user.email))    
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="SignOut" component={SignOut} />

      </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    
    <NavigationContainer>
      <UserContext.Provider value={data}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Account" component={Home} />
        <Drawer.Screen name="Subjects" component={Home} />
        <Drawer.Screen name="Chat" component={Home} />
        <Drawer.Screen name="Assignments" component={Assignments} />
        <Drawer.Screen name="SignOut" component={SignOut} />       
                
      </Drawer.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};


export default App;
