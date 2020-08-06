import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Input,Button } from 'react-native-elements';
import { IconButton, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
//import FormInput from '../components/FormInput';
//import FormButton from '../components/FormButton';

export default function newChat({navigation}) {

    console.ignoredYellowBox = true;
    const [roomName, setRoomName] = useState('');

    const handleButtonPress = () => {
       if(roomName.length > 0){

            firestore()
            .collection('THREADS')
            .add({
                name:roomName,
                latestMessage: {
                    text: `You have joined the room ${roomName}.`,
                    createdAt: new Date().getTime()
                  }
            })
            .then((docRef)=>{
                console.log("New Chat room Created")
                docRef.collection('MESSAGES').add({
                    text: `You have joined the room ${roomName}.`,
                    createdAt: new Date().getTime(),
                    system: true
                  });
                navigation.goBack()
            })
       }

}




    return (
        <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
 
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <TextInput
        style={styles.inputs}
          labelName='Room Name'
          value={roomName}
          onChangeText={text => setRoomName(text)}
          clearButtonMode='while-editing'
        />
        <Button
            buttonStyle={{
                width:100,
                marginTop:20
            }}
          title='Create'
          modeValue='contained'
          labelStyle={styles.buttonLabel}
          onPress={handleButtonPress}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
      },
      closeButtonContainer: {
        position: 'absolute',
        top: 30,
        right: 0,
        zIndex: 1
      },
      innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      title: {
        fontSize: 24,
        marginBottom: 10
      },
      buttonLabel: {
        fontSize: 22
      },
      inputs:{
        borderWidth:2,
        width:200,
        borderRadius:20,
        marginBottom:10,
        borderColor:'#0F7173'
    }
})
