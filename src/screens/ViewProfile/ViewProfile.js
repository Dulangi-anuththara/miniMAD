import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
import { UserContext } from '../../../context/UserContext'
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
export default function ViewProfile({navigation}) {

    const user = useContext(UserContext);
    const[url,setURL] = useState()
    const [data, setData] = useState({name:'',email:'',bio:'',phone:'',photo:''})
    const [avataSource, setavataSource] = useState()
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    useEffect(()=>{
 
      const subscriber =firestore()
                .collection('Users')
                .doc(user.id)
                .onSnapshot((documentquery)=>{
                  setData(documentquery.data())
                })
      
        return () => subscriber;
    },[]);

    const ImagePick = () => {ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        const reference = firebase.storage().ref(`Images/${response.fileName}`);
        const pathToFile = response.path;
        const task = reference.putFile(pathToFile);

        task.on('state_changed', taskSnapshot => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      });

      task.then(()=>{
        reference.getDownloadURL().then((url)=>{

          firestore()
                    .collection('Users')
                    .doc(user.id)
                    .update({
                      photo:url
                    })
        })
      })
        setURL(response.uri)
        setavataSource(source)
      }
    });
  }
    return (
        <View style={styles.container}>
          <View style={styles.header}>

              
          <TouchableOpacity style={styles.imgContainer}
              onPress={ImagePick}>
                 <Image style={styles.avatar} source={{uri:user.photo}}/>
              </TouchableOpacity>

          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.description}>{user.status}</Text>
            <Text style={styles.info}>{user.email}</Text>
            <Text style={styles.description}>{user.bio}</Text>
            <Text style={styles.description}>{user.phone}</Text>
              
                          
              <TouchableOpacity style={styles.buttonContainer}
              onPress={()=> navigation.navigate('EditProfile',{
                key:user.id,
                name:user.name,
                phoneNo:user.phone,
                bio:user.bio
              })}>
                <Text>Edit Account</Text> 
              </TouchableOpacity>


                
            </View>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    header:{
      backgroundColor: "#77CBB9",
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
      marginTop:40,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#77CBB9",
    },
    TouchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      left:300,
      top:500
    },
    FloatingButtonStyle: {
      resizeMode: 'contain',
      width: 70,
      height: 70,
    },
    imgContainer: {
      marginTop:150,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      flex:1,
      borderRadius:30,
      ///borderWidth:3

    },
  });