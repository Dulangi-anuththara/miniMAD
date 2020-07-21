import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Announcement from '../Announcement'
import NewAnnouncement from '../NewAnnouncement'
import NavigationDrawerStructure from '../../components/drawerHeader'

const Stack = createStackNavigator();

export default function Home({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Announcement">
        <Stack.Screen name="Announcement" component={Announcement} options={{title:'Announcements',headerStyle:{
          backgroundColor: '#3096EE'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
          headerLeft: () =><NavigationDrawerStructure navigationProps={navigation} />
        }}/>
        <Stack.Screen name="NewAnnouncement" component={NewAnnouncement} options={{title:'New Announcemet', headerStyle:{
          backgroundColor: '#3096EE',},
          headerTitleStyle: {
            color:'white',
          },

          headerTitleAlign:'center'}} />
      </Stack.Navigator>
  )
}
