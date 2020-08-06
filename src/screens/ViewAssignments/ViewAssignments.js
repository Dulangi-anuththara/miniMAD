import React, { useState, useEffect, useContext, Suspense } from "react";
import { View, Linking, StyleSheet, Modal, TouchableHighlight,Image } from 'react-native'
import { Text, Button } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../context/UserContext';
import moment from "moment";

export default function ViewAssignments({route, navigation}) {

    console.ignoredYellowBox = true;    
    const {key} = route.params;
    const [fileName, setFileName] = useState('')
    const[item,setItem] = useState([])
    const [file,setFile] = useState();
    const [progress,setProgress]=useState('');
    const a = moment()
    const [buttonStat,setButtonStat] = useState('add');
    const [Submission,setSubmission] = useState({state:'No attempts', file:'',gradeState:'Not Graded'});
    const [time, setTime] = useState(new Date().toUTCString());
    var showButton = <Button></Button>
    const user = useContext(UserContext);

    useEffect(() => {

        firestore()
        .collection('Assignments')
        .doc(key)
        .get()
        .then(documentSnapshot => {
            console.log('Assignment exists: ', documentSnapshot.exists);

            if (documentSnapshot.exists) {
            setItem(documentSnapshot.data());
            const time = moment(documentSnapshot.data().DueDate);
            const dateDiff = time.diff(a, 'days');
           setTime(dateDiff.toString())
            }
        })
        .then(()=>{

            const subscriber = firestore()
                        .collection('Assignments')
                        .doc(key)
                        .collection('Submissions')
                        .doc(user.id)
                        .onSnapshot(documentSnapshot =>{
                            if(documentSnapshot.exists){
                                setSubmission(documentSnapshot.data())
                                setButtonStat('edit');
                                setFileName(documentSnapshot.data().file)
                            }
                        })
            console.log("kai");
            return () => subscriber;
        })
    
    },[]);

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
          setFileName(response.fileName)
      
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
                                .doc(user.id)
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
                        .doc(user.id)
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
            buttonStyle={{
                height:45,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom:20,
                width:200,
                borderRadius:30,
                backgroundColor: "#77CBB9",}}
            title="Add Submission"
            onPress={FileUpload}/>
            break;
        case 'upload':
            showButton =  <Button
            buttonStyle={{
                height:45,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom:20,
                width:200,
                borderRadius:30,
                backgroundColor: "#5AB1BB",}}
            title="Upload"
            onPress={handleSubmit}/>
            break;
        case 'edit':
            showButton =  <Button
            buttonStyle={{
                height:45,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom:20,
                width:200,
                borderRadius:30,
                backgroundColor: "#93B1A7",}}
            title="Edit Submission"
            onPress={FileUpload}/>
            break;

        case 'update':
            showButton =  <Button
            buttonStyle={{
                height:45,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom:20,
                width:200,
                borderRadius:30,
                backgroundColor: "#77CBB9",}}
            title="Update Submission"
            onPress={handleSubmit}/>
            break;

        default:
            showButton=<Button></Button>


    }

    return (
        <View style={styles.Container}>
            <View style={styles.header}>
                <Text h4 >{item.Title}</Text>
            </View>

            <View style={styles.statusContent}>
                <Text>{item.Description}</Text>

                <View style={{
                    flexDirection:'row'}}>
                <Image style={styles.image}
                  source={{uri:"https://img.icons8.com/office/80/000000/pdf.png"}}/>
                <Text style={styles.info}
                  onPress={() => Linking.openURL(item.Assignment)}>{item.Title}
                  </Text>
                  </View>
            </View>
            <View style={styles.header}>
            <Text h4>Submission Status</Text></View>
            <View style={styles.statusContent}>

                    <Text>Submission Status : {Submission.state}</Text>
                    <Text>Grading Status :  {Submission.gradeState}</Text>
                    <Text>Due Date : {item.DueDate}</Text>
                    <Text>Time Remaining : {time} days</Text>

                    <View style={{
                        flexDirection:'row'
                    }}>
                {fileName !='' && 
                <Image style={styles.image}
                source={{uri:"https://img.icons8.com/office/80/000000/pdf.png"}}/>
                
                }                
                    <Text style={styles.info}>{fileName}</Text>
                        
                        </View>
                    
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
        backgroundColor:'#EFF2F1',
        flex:1
    },
    header:{
        padding:20,
        alignItems: 'center',
        backgroundColor: "#77CBB9",
      },
    headerContent:{
        borderWidth:1,
        borderColor:'#3096EE',
        padding:20,
        margin:20
    },
    statusContent:{
        paddingVertical:20,
        paddingLeft:20,
        marginTop:15,
        marginBottom:15,
        marginHorizontal:10,
        backgroundColor: '#FFFFFF',
        borderRadius:10,

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
      info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10,
        textAlign:'center'
      },
      image:{
        marginTop:10,
        width:20,
        height:20,
        marginRight:10
    },
})