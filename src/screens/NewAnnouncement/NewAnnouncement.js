import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, } from 'react-native'
import { Input,Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function NewAnnouncement({navigation}) {
    const [Title, setTitle] = useState('');
    const [Announcement, setAnnouncement] = useState('');
    const [date, setDate] = useState('');
    const [Author, setAuthor] = useState('')

    const user = auth().currentUser.displayName;

    useEffect(()=>{
        
        var today = new Date().toString().slice(0,25);
        setDate(today);
        setAuthor(user);
        
        
    })

    function handleAnnouncement(){

        var data = {
            Title:Title,
            Author:Author,
            Date:date,
            Announcement:Announcement
        }
        console.log(data);
        firestore()
            .collection('Announcements')
            .add(data)
            .then(() => {
                console.log('New Announcement added!');
                navigation.navigate('Announcement')
            });

    }
    return (
        <View>
           <Text>Title</Text>
           <TextInput
                style={{ height: 60, borderColor: 'red', borderWidth: 1, width:350, margin:10, borderRadius:6  }}
                onChangeText={text => setTitle(text)}
                value={Title}
            /> 
            <Text>Announcement</Text>
            <TextInput
                style={{ height: 200, borderColor: 'red', borderWidth: 1, width:370, margin:10, borderRadius:6, textAlignVertical:'top' }}
                onChangeText={text => setAnnouncement(text)}
                value={Announcement}
            />        

            <Button
                title='POST'
                buttonStyle={{backgroundColor:'grey', width:200, alignItems:'center', alignSelf:'flex-end', marginRight:10}} 
                onPress={handleAnnouncement}/>
 

        </View>
    )
}
