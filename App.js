/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect} from 'react';
import {  Text} from 'react-native';

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
  Assignments, 
  Chat, 
  Lectures,
  Profile,
  ChatNav,
SubjectsTech,
MyAnnouncements} from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { UserContext } from './context/UserContext';
import { DrawerActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const App= () => {

  console.ignoredYellowBox = true;
  const jumpToAction = DrawerActions.jumpTo('Home');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [data,setData] = useState({name:'kk'});

  function SignOut({navigation}){
    auth()
          .signOut()
          .then(()=>{
            console.log("User Signed Out");
            navigation.dispatch(jumpToAction);
          })

      return <Text>Bye</Text>
  }

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

console.log(user);

  if (!user) {
    console.log("User is not here");
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{title:''}} />
          <Stack.Screen name="Register" component={Register} options={{title:''}}/>
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
          <Drawer.Screen name="Subjects" component={SubjectsTech} />
          <Drawer.Screen name="Account" component={Profile} />
          <Drawer.Screen name="SignOut" component={SignOut} options={{title:'Sign Out'}} />       
                  
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
        <Drawer.Screen name="NewChat" component={ChatNav} options={{title:'Chat'}} />
        <Drawer.Screen name="Assignments" component={Assignments} />
        <Drawer.Screen name="SignOut" component={SignOut} />       
                
      </Drawer.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );

}
};


export default App;
