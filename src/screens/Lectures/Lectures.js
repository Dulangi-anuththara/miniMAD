import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Video from '../VideoPlayer'
import Subjects from '../Subjects'
import LectureList from '../LectureList'

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator initialRouteName="SubjectList">
        <Stack.Screen name="VideoPlayer" component={Video} />
        <Stack.Screen name="SubjectList" component={Subjects} />
        <Stack.Screen name="LectureList" component={LectureList} />
      </Stack.Navigator>
  )
}
