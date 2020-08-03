import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { utils } from '@react-native-firebase/app';




export default function NewLecture({route,navigation}) {

    const { id } = route.params
    const [file,setFile] = useState({fileName:''});
    const [buttonStat,setButtonStat] = useState('add');
    const [progress,setProgress]=useState('');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [Desc, setDesc] = useState('')
    var showButton = <Button></Button>


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
          setName(response.fileName)
      
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
                                    Title:title,
                                    file:url,
                                    Name:file.fileName,
                                    type:file.type,
                                    description:Desc
                                })
                                .then(()=>{
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
            buttonStyle={{
                backgroundColor:'#8C5383',
                width:150,
                height:50,
                borderRadius:10
            }}
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


            <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
               placeholder='Title'
              underlineColorAndroid='transparent'
              onChangeText={val => setTitle(val)}
              value={title}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/sorting-answers.png'}}/>

          </View>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
               placeholder='Description'
              underlineColorAndroid='transparent'
              onChangeText={val => setDesc(val)}
              value={Desc}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/sorting-answers.png'}}/>

          </View>
          <View style={styles.inputContainer}
          onPress={()=> console.log("test")}
          >
          <TextInput style={styles.inputs}
               placeholder='File'
              underlineColorAndroid='transparent'
              value={name}
              editable ={false}
              />
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/sorting-answers.png'}}/>
        </View>
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
        width:100,
        height:500,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        flexDirection:'row'
    },
    textInput:{
        marginTop:10
    },
    container:{
        backgroundColor:'#EFF2F1',
        borderRadius:6,
        flex:1
    },
    textProgress:{
        marginBottom:30,
        alignSelf:'center',
    },
    textName:{
        fontSize:20,
        marginHorizontal:40,
        fontWeight:'bold'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:350,
        height:45,
        marginTop:50,
        marginHorizontal:20,
        flexDirection: 'row',
        alignItems:'center',
    
        shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 2,
        }
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
        width:30,
        height:30,
        marginRight:15,
        justifyContent: 'center'
      },

})