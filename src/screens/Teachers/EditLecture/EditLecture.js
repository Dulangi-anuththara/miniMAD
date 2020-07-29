import React, {useState, useEffect}  from 'react'
import { View, Text, StyleSheet, Linking, Alert, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';


export default function EditLecture({route,navigation}) {

    const { SubCode, LecCode, item}=route.params;
    const [fileName, setfileName] = useState(item.Name);
    const [file,setFile] = useState();
    const [progress,setProgress]=useState('');
    const [buttonStat,setButtonStat] = useState('update');
    var showButton = <Button></Button>


    const createTwoButtonAlert = () =>
    Alert.alert(
      "Are you sure you want to delete this?",
      "If you press 'OK' " + item.Title + " will be removed from the storage",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress:deleteLecture,
        style:'default'
        }
      ],
      { cancelable: false }
    );

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
          setfileName(response.fileName)
          setButtonStat('upload');
      
        }
      });
    
    }

    const editLecture = () =>{

        const reference = firebase.storage().ref(`Lectures/${file.fileName}`);

        const pathToFile = file.path;
        const task = reference.putFile(pathToFile);

        task.on('state_changed', taskSnapshot => {

            setProgress(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`)
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        task.then(() => {

            reference.getDownloadURL().then( url=>

                { console.log(url) 
                
                    firestore()
                                .collection('Subjects')
                                .doc(SubCode)
                                .collection('Lectures')
                                .doc(LecCode)
                                .update({
                                    file:url,
                                    Name:file.fileName,
                                    type:file.type
                                })
                                .then(()=>{
                                    console.log("Lecture Updated");
                                    const ref = firebase.storage().ref(`Lectures/${item.Name}`);
                                    ref.delete()
                                    .then(() =>{
                                        console.log("It'deleted")
                                        navigation.goBack()
                                   })
                                    
                                })          
                            }
                
                    )
            
        })
        task.catch(error =>{
            console.log(error)
        });
    }

    
    const deleteLecture = () =>{

        console.log("Here");
        firestore()
        .collection('Subjects')
        .doc(SubCode)
        .collection('Lectures')
        .doc(LecCode)
        .delete()
        .then(() => {
            console.log("Lecture Deleted");
            const ref = firebase.storage().ref(`Lectures/${item.Name}`);
            ref.delete()
            .then(() =>{
                    console.log("It deleted")
                    navigation.goBack()
            })
    });
    }

    switch(buttonStat){

        case 'upload':
            showButton =  <Button
            title="Upload"
            buttonStyle={{
                backgroundColor:'#CFD11A',
                width:100
            }}
            onPress={editLecture}/>
            break;

        case 'update':
            showButton = <Button
            title="Update"
            buttonStyle={{
                backgroundColor:'#53A548',
                width:100
            }}
            onPress={FileUpload}/>

            break;

        default:
            showButton=<Button></Button>


    }



    return (
        <View style={styles.container}>
            <Text style={styles.title} >{item.Title}</Text>

            <View style={styles.details} >
 
            <Text
            onPress={()=>{
                Linking.openURL(item.file)
            }}
            style={styles.name}
            >{fileName}</Text>            
            </View>
            <Text>{progress}</Text>
            <View style={styles.buttonArea}>
            
              {showButton}
                <Button
                title="Delete"
                buttonStyle={styles.button}
                onPress={createTwoButtonAlert}
                >
                </Button>
            </View>

            <Text
            style={{
                fontWeight:'700',
                marginLeft:30,
                textDecorationLine:'underline',
            }}
            onPress={()=>{
                navigation.goBack()
            }}>Go Back</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },
    details:{
        backgroundColor:'#C7FFED',
        marginTop:20,
        marginLeft:30,
        marginRight:30,
        borderColor:'#AB947E',
        borderWidth:2,
        borderRadius:6,
        padding:30,
        height:100
    },
    title:{
        fontWeight:'bold',
        fontSize:24,
        marginTop:80,
        marginLeft:30
    },
    buttonArea:{
        flexDirection:'row',
        margin:30,
        marginLeft:50,
        backgroundColor:'white',
        padding:30
    },
    button:{
        marginLeft:30,
        backgroundColor:'#931621',
        width:100
    },
    name:{
        color:'blue',
        textDecorationLine:'underline'
    },
    shareButton: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
      shareButtonText:{
        color: "#FFFFFF",
        fontSize:20,
      },

})