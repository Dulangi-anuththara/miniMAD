import React, {useEffect, useContext} from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../../../context/UserContext'
import LectureList from '../LectureList'
import { createStackNavigator } from '@react-navigation/stack';
import NewLectures from '../NewLecture';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="LectureList" component={LectureList} />
      <HomeStack.Screen name="NewLecture" component={NewLectures} />
    </HomeStack.Navigator>
  );
}

  function SettingsScreen() {
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }

export default function HomeSubjects({route}) {

  const { key }=route.params

    return (
      <UserContext.Provider value={key}>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-circle' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
          <Tab.Screen name="Home" component={HomeStackScreen} options={{title:'Lectures'}}/>
          <Tab.Screen name="Settings" component={SettingsScreen} options={{title:'Assignments'}}/>
        </Tab.Navigator>
        </UserContext.Provider>
    )
}
