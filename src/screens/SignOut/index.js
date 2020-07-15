import React, {useEffect} from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';

export default function SignOut({navigation}) {

    useEffect(() => {
        console.log("Here signout");
        auth()
        .signOut()
        .then(() => {
            console.log('User signed out!');
        });
    }, [])

    return (
        <View>
            <Text>SignOut</Text>
        </View>
    )
}
