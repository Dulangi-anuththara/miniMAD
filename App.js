/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect} from 'react';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import auth from '@react-native-firebase/auth';
import { 
  Login, 
  Register, 
  Home, 
  SignOut, 
  Assignments, 
  Chat, 
  Lectures,
  Profile,
SubjectsTech,
MyAnnouncements} from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { UserContext } from './context/UserContext'
import firestore from '@react-native-firebase/firestore';

const App= () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [data,setData] = useState({name:'kk'});

  function onAuthStateChanged(user) {
    setUser(user);
    if(user) {
          firestore()
          .collection('Users')
          .doc(user.uid)
          .onSnapshot((documentSnapshot)=>{
            if(documentSnapshot.exists){
              setData(documentSnapshot.data())
              
            }
        })          
             
    }
   // console.log(user);
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
else if(data.role == 1){
  return(
        <NavigationContainer>
        <UserContext.Provider value={data}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="My Announcements" component={MyAnnouncements} />
          <Drawer.Screen name="Account" component={Profile} />
          <Drawer.Screen name="Subjects" component={SubjectsTech} />
          <Drawer.Screen name="Assignments" component={Assignments} />
          <Drawer.Screen name="SignOut" component={SignOut} />       
                  
        </Drawer.Navigator>
        </UserContext.Provider>
      </NavigationContainer>)


}
else{ 

   return (
    
    <NavigationContainer>
      <UserContext.Provider value={data}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Account" component={Profile} />
        <Drawer.Screen name="Subjects" component={Lectures} />
        <Drawer.Screen name="Chat" component={Chat} />
        <Drawer.Screen name="Assignments" component={Assignments} />
        <Drawer.Screen name="SignOut" component={SignOut} />       
                
      </Drawer.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );

}
};


export default App;
