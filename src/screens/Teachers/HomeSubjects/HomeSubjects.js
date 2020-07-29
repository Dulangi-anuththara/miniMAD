import React, {useEffect, useContext} from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../../../context/UserContext'
import LectureList from '../LectureList'
import { createStackNavigator } from '@react-navigation/stack';
import NewLectures from '../NewLecture';
import EditLecture from '../EditLecture';
import AssignmetList from '../AssignmentList';
import NewAssignment from '../NewAssignment'

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="LectureList">
      <HomeStack.Screen name="LectureList" component={LectureList} options={{title:"Lecture List"}}/>
      <HomeStack.Screen name="NewLecture" component={NewLectures} />
      <HomeStack.Screen name="EditLecture" component={EditLecture}/>
    </HomeStack.Navigator>
  );
}

function AssignmentStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="AssignmentList">
      <HomeStack.Screen name="AssignmentList" component={AssignmetList} options={{title:"Assignment List"}}/>
      <HomeStack.Screen name="NewAssignment" component={NewAssignment} />
      <HomeStack.Screen name="EditLecture" component={EditLecture}/>
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
          <Tab.Screen name="Settings" component={AssignmentStackScreen} options={{title:'Assignments'}}/>
        </Tab.Navigator>
        </UserContext.Provider>
    )
}
