import React, { useState, useEffect } from "react";
import { View, Linking, StyleSheet, Modal, TouchableHighlight } from 'react-native'
import { Text, Button } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app'

export default function ViewAssignments({route, navigation}) {
    
    const {item} = route.params;
    const [file,setFile] = useState();
    //const reference = storage().ref('gs://minimad-b3931.appspot.com/Assignments/FirstYear/Computer Systems/Submission');
    //const reference = firebase.storage().ref(file.fileName);

    useEffect

    const FileUpload = () => {
        FilePickerManager.showFilePicker(null, (response) => {
        console.log('Response = ', response);
       
        if (response.didCancel) {
          console.log('User cancelled file picker');
        }
        else if (response.error) {
          console.log('FilePickerManager Error: ', response.error);
        }
        else {
          setFile(response);
        }
      });
    
    }
    const handleSubmit = () =>{
        console.log(utils.FilePath.PICTURES_DIRECTORY)
        const reference = firebase.storage().ref(`Assignments/${file.fileName}`);

        const pathToFile = file.path;
        const task = reference.putFile(pathToFile);

        task.on('state_changed', taskSnapshot => {
            //console.log(taskSnapshot)
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        task.then(() => {
        console.log('Image uploaded to the bucket!');
        })
        task.catch(error =>{
            console.log(error)
        });
    }



    var showButton = <Button></Button>
    if(!file){
        showButton =  <Button
        title="Add Submission"
        titleStyle={{paddingBottom:100}}
        onPress={FileUpload}
        
    />
    }
    else{
       showButton =  <Button
        title="Upload"
        titleStyle={{alignSelf:'center'}}
        onPress={handleSubmit}
    />
    }

    return (
        <View style={styles.Container}>
            <View >
                <Text h4 >{item.Title}</Text>
            </View>

            <View style={styles.headerContent}>
                <Text>{item.Description}</Text>
                <Text style={{color: 'blue'}}
                  onPress={() => Linking.openURL(item.Assignment)}>{item.Title}
                  </Text>
            </View>
            <Text h4>Submission Status</Text>
            <View style={styles.statusContent}>
                
            <Text>Submission Status :</Text>
            <Text>Grading Status :</Text>
            <Text>Due Date : {item.DueDate}</Text>
            <Text>Time Remaining :</Text>
            <Text>Submission Comments :</Text>
            
    
            </View>

            <View>
            <View style={styles.submitButton}>
                {showButton}
            </View>
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'white',
        flex:1
    },
    headerContent:{
        borderWidth:1,
        borderColor:'#3096EE',
        padding:20,
        margin:20
    },
    statusContent:{
        borderWidth:1,
        borderColor:'#3096EE',
        padding:20,
        margin:20

    },
    submitButton:{
        width:200,
        height:30,
        justifyContent:'space-between',
        alignSelf:'center',
        flexDirection:'row'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height:200,
        width:350
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
})