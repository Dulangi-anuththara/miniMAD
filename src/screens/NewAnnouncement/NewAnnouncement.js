import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import { Input,Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { color } from 'react-native-reanimated';

export default function NewAnnouncement({navigation}) {
    const [Title, setTitle] = useState('');
    const [Announcement, setAnnouncement] = useState('');
    const [date, setDate] = useState('');
    const [Author, setAuthor] = useState('')

    const user = auth().currentUser.displayName;
    const userId= auth().currentUser.uid;

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
            Announcement:Announcement,
            UserId:userId
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
        <View style={styles.container}>  


            <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder='Title'
                        underlineColorAndroid='transparent'
                        onChangeText={val => setTitle(val)}
                        value={Title}
                        multiline={true}
                        numberOfLines={2}
                        />
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/sorting-answers.png'}}/>

          </View>
          <View style={styles.inputContainerTwo}>
                    <TextInput style={styles.inputs}
                        placeholder='Announcement'
                        underlineColorAndroid='transparent'
                        onChangeText={val => setAnnouncement(val)}
                        value={Announcement}
                        multiline={true}
                        />
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/sorting-answers.png'}}/>

          </View>

          <Button
            buttonStyle={styles.submitButton}
            title="POST"
            onPress={handleAnnouncement}
            />
 

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#EFF2F1',
        borderRadius:6,
        flex:1
    },
    inputs:{
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
        textAlignVertical:'top'
    },
    inputIcon:{
        width:30,
        height:30,
        marginRight:15,
        justifyContent: 'center'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:350,
        height:45,
        marginTop:50,
        marginHorizontal:20,
        flexDirection: 'row',
        alignItems:'center',
    
        shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 2,
        }
    },
    inputContainerTwo: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:350,
        height:200,
        marginTop:20,
        marginHorizontal:20,
        flexDirection: 'row',
        alignItems:'center',
        textAlignVertical:'top',
    
        shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 2,
        },
    },
    submitButton:{
        width:300,
        height:50,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        flexDirection:'row',
        margin:30,
        backgroundColor:'#8C5383'
    },
})