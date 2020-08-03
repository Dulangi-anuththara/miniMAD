import React, {useState, useEffect}  from 'react'
import { View, Text, StyleSheet, Linking, Alert, TextInput,Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';


export default function EditLecture({route,navigation}) {

    const { SubCode, LecCode, item, Description}=route.params;
    const [fileName, setfileName] = useState(item.Name);
    const [file,setFile] = useState();
    const [progress,setProgress]=useState('');
    const [Stat,setStat] = useState(false);
    const [Desc, setDesc] = useState('')

    useEffect(() => {
        setDesc(Description)
        return () => {
            
        }
    }, [])


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
          setStat(true);
      
        }
      });
    
    }

    const editLecture = () =>{

        if(Stat){
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
                                    type:file.type,
                                    Description:Desc
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
        }else{

            firestore()
                        .collection('Subjects')
                        .doc(SubCode)
                        .collection('Lectures')
                        .doc(LecCode)
                        .update({
                            Description:Desc
                        })
                        .then(()=>{
                            navigation.goBack()
                        })

        }

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



    return (
        <View style={styles.container}>
            <Text style={styles.title} >{item.Title}</Text>

            
            <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
                placeholder='Description'
              underlineColorAndroid='transparent'
              onChangeText={val => setDesc(val)}
              value={Desc}
              multiline={true}
              numberOfLines={10}/>
              
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/sorting-answers.png'}}/>

          </View>

            <View style={styles.fileContainer} >
 
            <Text
            onPress={()=>{
                Linking.openURL(item.file)
            }}
            style={styles.name}
            >{fileName}</Text>  
             <Image style={styles.inputIcon} source={{uri:"https://img.icons8.com/nolan/64/add-file.png"}}/>          
            </View>
            <Text>{progress}</Text>

            <Button
            buttonStyle={{
                backgroundColor:'#8C5383',
                width:150,
                height:40,
                borderRadius:10,
                justifyContent:'center',
                alignSelf:'center'
            }}
            title="Choose File"
            onPress={FileUpload}/>

            <View style={styles.buttonArea}>
               
                <Button
                    title="Update"
                    buttonStyle={{
                        backgroundColor:'#848C8E',
                        width:100,
                        borderRadius:7
                    }}
                    onPress={editLecture}/>

                <Button
                title="Delete"
                buttonStyle={styles.button}
                onPress={createTwoButtonAlert}
                >
                </Button>
            </View>

            <TouchableOpacity
                    onPress={()=>{navigation.goBack()}}>
            <Image style={styles.FloatingButtonStyle} 
                   source={{uri:"https://img.icons8.com/nolan/128/circled-chevron-left.png"}}/>
            </TouchableOpacity>

        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        backgroundColor:'#EFF2F1',
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
        marginTop:40,
        marginLeft:30
    },
    buttonArea:{
        flexDirection:'row',
        marginTop:50,
        marginLeft:50,
        backgroundColor:'#EFF2F1',
        padding:30,
        justifyContent:'flex-end'
    },
    button:{
        marginLeft:30,
        backgroundColor:'#848C8E',
        width:100,
        borderRadius:7
    },
    name:{
        color:'blue',
        height:45,
        marginLeft:16,
        paddingTop:10,
        borderBottomColor: '#FFFFFF',
        flex:1,
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
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:350,
        height:70,
        marginTop:50,
        marginHorizontal:20,
        flexDirection: 'row',
        alignItems:'center',
       paddingTop:10,
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
        alignSelf:'flex-start'
    },
    inputIcon:{
        width:30,
        height:30,
        marginRight:15,
        justifyContent: 'center',
        justifyContent:'space-around'
    },
    fileContainer: {
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
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
        marginLeft:20
      },

})