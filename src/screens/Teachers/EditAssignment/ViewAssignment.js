import React, { useState, useEffect, useContext } from "react";
import { View, Linking, StyleSheet, Modal, TouchableHighlight, Image, TouchableOpacity } from 'react-native'
import { Text, Button } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../../context/UserContext'

export default function ViewAssignments({route, navigation}) {
    
    const {key, SubjCode, id} = route.params;
    const[item,setItem] = useState([])
    const [file,setFile] = useState();
    const [progress,setProgress]=useState('');
    const [buttonStat,setButtonStat] = useState('add');
    const [Submission,setSubmission] = useState({state:'No attempts', file:'',gradeState:'Not Graded'});
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

            <View style={styles.Box}>
    <Text style={styles.descriptionOne}>{item.Title}-{SubjCode}</Text>
                <Text style={styles.descriptionThree}>{item.Description}</Text>
                <Text style={styles.descriptionThree}>Due Date : {item.DueDate}</Text>
                
                <View style={styles.imageBox}>
                  <Image style={styles.image}
                        source={{uri:"https://img.icons8.com/office/80/000000/pdf.png"}}/>
                <Text style={styles.descriptionTwo}
                  onPress={() => Linking.openURL(item.Assignment)}>{item.fileName}
                  </Text>
                
                </View>
                
            </View>


            <View>
            <Text style={styles.textStyle}>{progress}</Text>  
            <View style={styles.submitButton}>
            <Button
            title="Edit Assignment"
            buttonStyle={{
                backgroundColor:'#CFD11A',
                width:200
            }}
            onPress={()=> navigation.navigate('EditAssignment',{
                item:item,
                SubjCode:SubjCode,
                key:key,
                id:id
            })}/>
            </View>
            
            </View>

            <TouchableOpacity
                    onPress={()=>{navigation.goBack()}}>
            <Image style={styles.FloatingButtonStyle} 
                   source={{uri:"https://img.icons8.com/nolan/128/circled-chevron-left.png"}}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#EFF2F1',
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
      Box: {
        padding:20,
        margin:20,
        backgroundColor: '#FFFFFF',
        borderRadius:10,

    },
    descriptionOne:{
        fontSize:28,
        color: "#000000",
        marginLeft:10,
        fontWeight:'bold',
        marginBottom:20
    },
    descriptionTwo:{
        fontSize:18,
        color: "#3498db",
        marginLeft:10,
    },
    descriptionThree:{
        fontSize:18,
        color: 'black',
        marginLeft:10,
    },
    image:{
        width:45,
        height:45,
    },
    imageBox:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
        marginLeft:20,
        marginTop:150
      },
})