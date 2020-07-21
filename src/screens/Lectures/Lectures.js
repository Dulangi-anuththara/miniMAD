import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Video from '../VideoPlayer'
import Subjects from '../Subjects'
import LectureList from '../LectureList'
import NavigationDrawerStructure from '../../components/drawerHeader'

const Stack = createStackNavigator();

export default function Home({navigation}) {
  return (
    <Stack.Navigator initialRouteName="SubjectList">
        <Stack.Screen name="VideoPlayer" component={Video} options={{title:'Video Player'}} />
        <Stack.Screen name="SubjectList" component={Subjects} options={{title:'Subjects',headerStyle:{
          backgroundColor: '#3096EE'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
          headerLeft: () =><NavigationDrawerStructure navigationProps={navigation} />
        }} />
        <Stack.Screen name="LectureList" component={LectureList} options={{title:'Lectures'}} />
      </Stack.Navigator>
  )
}
