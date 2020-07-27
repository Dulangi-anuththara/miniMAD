import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerStructure from '../../../components/drawerHeader';
import LectureList from '../LectureList';
import NewLecture from '../NewLecture';

const Stack = createStackNavigator();

export default function LecturesNav({navigation}) {
  return (
    <Stack.Navigator initialRouteName="LectureList">
        <Stack.Screen name="LectureList" component={LectureList} options={{title:'Subjects',headerStyle:{
          backgroundColor: '#3096EE'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
          headerLeft: () =><NavigationDrawerStructure navigationProps={navigation} />
        }}/>
        <Stack.Screen name="NewLecture" component={NewLecture} options={{title:'Subject',headerStyle:{
          backgroundColor: '#3096EE'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
        }}/>

      </Stack.Navigator>
  )
}
