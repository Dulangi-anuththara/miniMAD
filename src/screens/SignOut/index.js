import React, {useEffect} from 'react'
import { View, Text, Alert,TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import { DrawerActions } from '@react-navigation/native';

export default function SignOut({navigation}) {


  const jumpToAction = DrawerActions.jumpTo('Home');
    const signingOut= () => {
        auth()
        .signOut()
        .then(() => {
            console.log('User signed out!');
            navigation.dispatch(jumpToAction);
        });
    }

    return (
       <View>
         <TouchableOpacity
                 //style = {styles.submitButton}
                 onPress={signingOut}
                >
                 <Text //style = {styles.submitButtonText}
                 > Sign Out </Text>
              </TouchableOpacity>
       </View>
    )
}
