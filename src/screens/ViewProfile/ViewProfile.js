import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
  } from 'react-native';
import { UserContext } from '../../../context/UserContext'

export default function ViewProfile({navigation}) {

    const user = useContext(UserContext);
    const[url,setURL] = useState('https://bootdey.com/img/Content/avatar/avatar6.png')
    const[bio,setBio] = useState('');
    useEffect(()=>{
        console.log(user);
    },[]);
    return (
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri:url}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
            <Text style={styles.name}>{user[2]}</Text>
            <Text style={styles.info}>{user[0]}</Text>
            <Text style={styles.description}>{bio}</Text>
              
                          
              <TouchableOpacity style={styles.buttonContainer}
              onPress={()=> navigation.navigate('EditProfile')}>
                <Text>Edit Account</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    header:{
      backgroundColor: "#00BFFF",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
  });