import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Video from '../VideoPlayer'
import Subjects from '../Subjects'
import {LectureList, LectureView} from '../LectureList'

import NavigationDrawerStructure from '../../components/drawerHeader'

const Stack = createStackNavigator();

export default function Home({navigation}) {
  return (
    <Stack.Navigator initialRouteName="SubjectList">
        <Stack.Screen name="VideoPlayer" component={Video} options={{title:'Video Player',
        headerStyle:{
        backgroundColor: '#0F7173'},
        headerTitleStyle: {
          color:'white',
        },
        headerTitleAlign:'center',}} />
        <Stack.Screen name="SubjectList" component={Subjects} options={{title:'Subjects',headerStyle:{
          backgroundColor: '#0F7173'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
          headerLeft: () =><NavigationDrawerStructure navigationProps={navigation} />
        }} />
        <Stack.Screen name="LectureList" component={LectureList} options={{title:'Lectures',headerStyle:{
        backgroundColor: '#0F7173'},
        headerTitleStyle: {
          color:'white',
        },
        headerTitleAlign:'center',}} />
        <Stack.Screen name="LectureView" component={LectureView} options={{title:'Lecture',headerStyle:{
        backgroundColor: '#0F7173'},
        headerTitleStyle: {
          color:'white',
        },
        headerTitleAlign:'center',}} />
      </Stack.Navigator>
  )
}
