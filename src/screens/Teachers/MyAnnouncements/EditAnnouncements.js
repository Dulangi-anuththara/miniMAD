import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert } from 'react-native'
import { Input,Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { color } from 'react-native-reanimated';

export default function EditAnnouncements({route,navigation}) {

    const { key, PrevTitle, PrevAnnouncement} = route.params;
    const [Title, setTitle] = useState('');
    const [Announcement, setAnnouncement] = useState('');
    const [date, setDate] = useState('');
    const [Author, setAuthor] = useState('')

    const user = auth().currentUser.displayName;
    const userId= auth().currentUser.uid;

    useEffect(()=>{
        
        var today = new Date().toString().slice(0,25);
        setTitle(PrevTitle);
        setAnnouncement(PrevAnnouncement);
        setDate(today);
        setAuthor(user);
        
        
    },[])

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Are you sure you want to delete this?",
      "Press 'OK' to remove announcement from the storage",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress:deleteAnnouncement,
        style:'default'
        }
      ],
      { cancelable: false }
    );

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
            .doc(key)
            .update(data)
            .then(() => {
                console.log('Announcement Updated');
                navigation.navigate('MyAnnouncements')
            });

    }

    function deleteAnnouncement(){
        

        firestore()
                    .collection('Announcements')
                    .doc(key)
                    .delete()
                    .then(()=>{
                        console.log("Announcement Deleted");
                        navigation.navigate('MyAnnouncements')
                    })
    }
    return (
        <View style={styles.container}>  

            <Text style={styles.title}>Title</Text>
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

          <Text style={styles.title}>Announcement</Text>
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
<View style={styles.buttonGroup}>
          <Button
            buttonStyle={styles.updateButton}
            title="Post"
            onPress={handleAnnouncement}
            />

            <Button
            buttonStyle={styles.deleteButton}
            title="Delete"
            onPress={createTwoButtonAlert}
            />
 
 </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#EFF2F1',
        borderRadius:6,
        flex:1
    },
    title:{
        marginLeft:30,
        marginTop:20,
        marginBottom:10,
        fontSize:20
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
        marginHorizontal:20,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center',
    
        shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        
    },
    inputContainerTwo: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:350,
        height:200,
        marginBottom:20,
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
    updateButton:{
        width:100,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        flexDirection:'row',
        margin:30,
        backgroundColor:'#9792E3'
    },
    deleteButton:{
        width:100,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        flexDirection:'row',
        margin:30,
        backgroundColor:'#A54657'
    },
    buttonGroup:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
    }
})