import React, {useState, useEffect} from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import firebase from '@react-native-firebase/app';



export default function NewLecture() {
    const [file,setFile] = useState();
    const [buttonStat,setButtonStat] = useState('add');
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
        <View>
            <Text>Hii</Text>
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
        alignContent:'center',
        alignSelf:'center',
        flexDirection:'row'
    },
})