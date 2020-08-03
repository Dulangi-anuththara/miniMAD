import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AssignmentsList from '../AssignmentsList'
import ViewAssignments from '../ViewAssignments'
import NavigationDrawerStructure from '../../components/drawerHeader'

const Stack = createStackNavigator();

export default function Assignments({navigation}) {
  return (
    <Stack.Navigator initialRouteName="AssignmentsList">
        <Stack.Screen name="AssignmentsList" component={AssignmentsList} options={{title:'Assignments',headerStyle:{
          backgroundColor: '#0F7173'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
          headerLeft: () =><NavigationDrawerStructure navigationProps={navigation} />
        }}/>
        <Stack.Screen name="ViewAssignments" component={ViewAssignments} options={{title:'Assignment',headerStyle:{
          backgroundColor: '#0F7173'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
        }}/>
      </Stack.Navigator>
  )
}
