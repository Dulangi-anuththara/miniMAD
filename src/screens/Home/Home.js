import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Announcement from '../Announcement'
import NewAnnouncement from '../NewAnnouncement'

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator initialRouteName="Announcement">
        <Stack.Screen name="Announcement" component={Announcement} />
        <Stack.Screen name="NewAnnouncement" component={NewAnnouncement} />
      </Stack.Navigator>
  )
}
