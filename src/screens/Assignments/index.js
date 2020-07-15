import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AssignmentsList from '../AssignmentsList'
import ViewAssignments from '../ViewAssignments'

const Stack = createStackNavigator();

export default function Assignments() {
  return (
    <Stack.Navigator initialRouteName="AssignmentsList">
        <Stack.Screen name="AssignmentsList" component={AssignmentsList} />
        <Stack.Screen name="ViewAssignments" component={ViewAssignments} />
      </Stack.Navigator>
  )
}
