import React, {useState, useEffect} from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { utils } from '@react-native-firebase/app';
import { Input } from 'react-native-elements';



export default function NewLecture({route,navigation}) {

    const { id } = route.params
    const [file,setFile] = useState();
    const [buttonStat,setButtonStat] = useState('add');
    const [progress,setProgress]=useState('');
    const [title, setTitle] = useState('');
    var showButton = <Button></Button>

    useEffect(()=>{
        console.log(file)
    },[file])


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
                                .doc(id)
                                .collection('Lectures')
                                .add({
                                    Name:title,
                                    file:url
                                })
                                .then(()=>{
                                    console.log("New Lecture is Added");
                                    navigation.navigate('LectureList')
                                })          
                            }
                
                    )
            
        })
        task.catch(error =>{
            console.log(error)
        });
    }

    switch(buttonStat){
        case 'add':
            showButton =  <Button
            title="Choose File"
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
        <View style={styles.container}>
       

            <Input
            containerStyle={{marginTop:40}}
            placeholder='Title'
            leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
            onChangeText={val => setTitle(val)}
            value={title}
            />
        
            <Text style={styles.textProgress}
            >{progress}</Text>
            <View style={styles.submitButton}>
                {showButton}
            </View>
            </View>

    )
}

const styles = StyleSheet.create({
    submitButton:{
        width:200,
        height:50,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        flexDirection:'row'
    },
    textInput:{
        marginTop:10
    },
    container:{
        backgroundColor:'#E8F0FF',
        borderRadius:6,
        flex:1
    },
    textProgress:{
        marginBottom:30,
        alignSelf:'center',
    }

})