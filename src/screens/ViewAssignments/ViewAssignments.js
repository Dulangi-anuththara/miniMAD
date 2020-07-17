import React, { useState, useEffect, useContext } from "react";
import { View, Linking, StyleSheet, Modal, TouchableHighlight } from 'react-native'
import { Text, Button } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../context/UserContext'

export default function ViewAssignments({route, navigation}) {
    
    const {key} = route.params;
    const[item,setItem] = useState([])
    const [file,setFile] = useState();
    const [progress,setProgress]=useState('');
    const [buttonStat,setButtonStat] = useState('add');
    const [Submission,setSubmission] = useState({state:'No attempts', file:''});
    var showButton = <Button></Button>
    const user = useContext(UserContext);

    useEffect(() => {
        console.log(key)
        firestore()
        .collection('Assignments')
        .doc(key)
        .get()
        .then(documentSnapshot => {
            console.log('Assignment exists: ', documentSnapshot.exists);

            if (documentSnapshot.exists) {
            setItem(documentSnapshot.data());
            //console.log('User data: ', documentSnapshot.data());
            }
        });
       
       firestore()
        .collection('Assignments')
        .doc(key)
        .collection('Submissions')
        .doc(user[1])
        .get()
        .then(documentSnapshot => {
            console.log('User exists: ', documentSnapshot.exists);

            if (documentSnapshot.exists) {
            setSubmission(documentSnapshot.data());
            setButtonStat('edit');
           // console.log('Submission data: ', documentSnapshot.data());
            }
        });
    },[])

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
          setButtonStat('upload');
      
        }
      });
    
    }
    const handleSubmit = () =>{
        console.log(utils.FilePath.PICTURES_DIRECTORY)
        const reference = firebase.storage().ref(`Assignments/${file.fileName}`);

        const pathToFile = file.path;
        const task = reference.putFile(pathToFile);

        task.on('state_changed', taskSnapshot => {

            setProgress(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`)
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        task.then(() => {
            reference.getDownloadURL().then( url=>

                {
                    if(Submission.file == ''){
                        firestore()
                                .collection('Assignments')
                                .doc(key)
                                .collection('Submissions')
                                .doc(user[1])
                                .set({
                                    state:'Assignment submitted',
                                    file:file.fileName,
                                    downloadURL:url
                                })
                                .then(() => {
                                    console.log('Submission Created');                
                                });


                    }
                    else{
                        
                        const ref = firebase.storage().ref(`Assignments/${Submission.file}`);
                        ref.delete();

                        firestore()
                        .collection('Assignments')
                        .doc(key)
                        .collection('Submissions')
                        .doc(user[1])
                        .update({
                            state:'Assignment submitted',
                            file:file.fileName,
                            downloadURL:url
                        })
                        .then(() => {
                            console.log('User updated!');                
                        });
                            
                        }
                            })
            setProgress('File Successfully uploaded')
            setButtonStat('edit')
            
          /*firestore()
            .collection('Assignments')
            .doc(key)
            .update({
                SubStat:'Assignment submitted',
            })
            .then(() => {
                console.log('User updated!');                
            });*/
            
        })
        task.catch(error =>{
            console.log(error)
        });
    }

    const editSubmit = () =>{
        const reference = firebase.storage().ref(`Assignments/${file.fileName}`);
        reference.delete();
        setButtonStat('add')
    }

    switch(buttonStat){
        case 'add':
            showButton =  <Button
            title="Add Submission"
            onPress={FileUpload}/>
            break;
        case 'upload':
            showButton =  <Button
            title="Upload"
            onPress={handleSubmit}/>
            break;
        case 'edit':
            showButton =  <Button
            title="Edit Submission"
            onPress={FileUpload}/>
            break;

        case 'update':
            showButton =  <Button
            title="Update Submission"
            onPress={handleSubmit}/>
            break;

        default:
            showButton=<Button></Button>


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

                    <Text>Submission Status : {Submission.state}</Text>
                    <Text>Grading Status :  {item.gradeStat}</Text>
                    <Text>Due Date : {item.DueDate}</Text>
                    <Text>Time Remaining :</Text>
                    <Text>Submission Comments :</Text>

                    <Text>{Submission.file}</Text>
            </View>

            <View>
            <Text style={styles.textStyle}>{progress}</Text>  
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
        height:50,
        alignContent:'center',
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
        color: "black",
        fontWeight: "bold",
        textAlign:'left',
        marginLeft:10,
        marginBottom:20
      },
})