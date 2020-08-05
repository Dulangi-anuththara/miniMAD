import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import newChat from '../newChat'
import{ ChatList,RoomScreen} from '../ChatList'

const Stack = createStackNavigator();


export default function ChatNav({navigation}) {
    return (
        <Stack.Navigator initialRouteName="ChatList">
        <Stack.Screen name="ChatList" component={ChatList} options={{title:'Chat List',headerStyle:{
          backgroundColor: '#0F7173'},
          headerTitleStyle: {
            color:'white',
          },
          headerTitleAlign:'center',
          headerLeft: () =><NavigationDrawerStructure navigationProps={navigation} />

        }}/>
        <Stack.Screen name="NewChat" component={newChat} options={{title:'New Chats', headerStyle:{
          backgroundColor: '#0F7173',},
          headerTitleStyle: {
            color:'white',
          },

          headerTitleAlign:'center'}} />
          <Stack.Screen name="RoomScreen" component={RoomScreen} options={({ route }) => ({
              title: route.params.thread.name,
              headerStyle:{
                backgroundColor: '#0F7173'
              },
              headerTitleStyle: {
                  color:'white',
              },
              headerTitleAlign:'center'

          })} />
      </Stack.Navigator>
    )
}
