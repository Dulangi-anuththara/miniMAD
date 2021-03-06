import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerStructure from '../../../components/drawerHeader';
import Subjects from '../Subjects'
import HomeSubjects from '../HomeSubjects/HomeSubjects'
import NewLectures from '../NewLecture';

const Stack = createStackNavigator();

export default function SubjectsTech({navigation}) {
  return (
    <Stack.Navigator initialRouteName="SubjectList">
        <Stack.Screen name="SubjectList" component={Subjects} options={{title:'Subjects',headerStyle:{
          backgroundColor: '#0F7173'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
          headerLeft: () =><NavigationDrawerStructure navigationProps={navigation} />
        }}/>
        <Stack.Screen name="Subject" component={HomeSubjects} options={{title:'Subject',headerStyle:{
          backgroundColor: '#0F7173'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
        }}/>
        <Stack.Screen name="LectureList" component={NewLectures} options={{title:'Lecture List',headerStyle:{
          backgroundColor: '#0F7173'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
        }}/>

      </Stack.Navigator>
  )
}
