import React, {useEffect, useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EditAnnouncements from './EditAnnouncements';
import MyAnnouncements from './MyAnnouncements';
import NavigationDrawerStructure from '../../../components/drawerHeader'

const HomeStack = createStackNavigator();

function HomeStackScreen({navigation}) {
    return (
      <HomeStack.Navigator initialRouteName="MyAnnouncements">
        <HomeStack.Screen name="MyAnnouncements" component={MyAnnouncements} options={{title:"My Announcements",headerStyle:{
          backgroundColor: '#0F7173'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
          headerLeft: () =><NavigationDrawerStructure navigationProps={navigation} />
    }}/>
        <HomeStack.Screen name="EditAnnouncements" component={EditAnnouncements} options={{title:'Edit Announcement',headerStyle:{
          backgroundColor: '#0F7173'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',

        }}/>
      </HomeStack.Navigator>
    );
  }

export default HomeStackScreen;