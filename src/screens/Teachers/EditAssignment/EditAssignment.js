import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';



export default function EditAssignment({route,navigation}) {

    const {item,key,SubjCode, id} =route.params
    const [date, setDate] = useState(new Date());
    const [file,setFile] = useState();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [state, setState] = useState(false)
    const [fileName, setFileName] = useState('Choose a File')
    const [progress, setProgress] = useState('')


    useEffect(()=>{
        setTitle(item.Title);
        setDesc(item.Description)
        setDate(item.DueDate)
        setFileName(item.fileName)
      return
    },[])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
     
      const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
      };
     
      const showDatepicker = () => {
        showMode('date');
      };
     
      const showTimepicker = () => {
        showMode('time');
      };

      
    const FileUpload = () => {
        FilePickerManager.showFilePicker(null, (response) => {
        //console.log('Response = ', response);
       
        if (response.didCancel) {
          console.log('User cancelled file picker');
        }
        else if (response.error) {
          console.log('FilePickerManager Error: ', response.error);
        }
        else {
          setFile(response);
          setFileName(response.fileName)
          setState(true)
      
        }
      });
    
    }

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
        { text: "OK", onPress:DeleteAssignment,
        style:'default'
        }
      ],
      { cancelable: false }
    );

    const upload = () =>{
      
        if(state){
            const reference = firebase.storage().ref(`Assignments/${SubjCode}/${file.fileName}`);

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
                              .collection('Assignments')
                              .doc(key)
                              .update({
                                Title:title,
                                Description:desc,
                                DueDate:date.toLocaleString(),
                                SubjCode:SubjCode,
                                code:id,
                                Assignment:url,
                                fileName:fileName
                              })
                              .then(()=>{
                                const ref = firebase.storage().ref(`Assignments/${SubjCode}/${item.fileName}`);
                                ref.delete()
                              })
                              .then(()=>{
                                navigation.navigate('AssignmentList')
                              })          
                          }
              
                  )
          
      })
      task.catch(error =>{
          console.log(error)
      });
    }else{
        firestore()
                              .collection('Assignments')
                              .doc(key)
                              .update({
                                Title:title,
                                Description:desc,
                                DueDate:date.toLocaleString(),
                                SubjCode:SubjCode,
                                code:id,
                              })
    }
    }

    const DeleteAssignment = () =>{
        firestore()
                    .collection('Assignments')
                    .doc(key)
                    .delete()
                    .then(()=>{
                        navigation.navigate('AssignmentList')
                    })
    }
    
    return (
        <View>

            <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
               placeholder='Title'
              underlineColorAndroid='transparent'
              onChangeText={text => setTitle(text)}
              value={title}
             
                />
             <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/sorting-answers.png'}}/>

          </View>

          <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
               placeholder='Description'
              underlineColorAndroid='transparent'
              onChangeText={(val) => setDesc(val)} 
              value={desc}            
                />
             <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/sorting-answers.png'}}/>

          </View>

    {/* Date Picker */}      
          <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
               placeholder='Submission Date'
              underlineColorAndroid='transparent'
              value={date.toLocaleString()}
              editable ={false}
            />

          </View>


          <View style={styles.datetimeButton}>
              <TouchableOpacity
                style={{borederWidth:2,borderColor:'white'}}
               onPress={showDatepicker}>
              <Image style={styles.inputIcon} 
             source={{uri:"https://img.icons8.com/nolan/64/calendar-1.png"}}
             /> 
              </TouchableOpacity>
        
            <TouchableOpacity

            onPress={showTimepicker}>
                
            <Image style={styles.inputIcon} 
             source={{uri:"https://img.icons8.com/nolan/64/time-span.png"}}
             />
            </TouchableOpacity>
          </View>


          <TouchableOpacity
          onPress={FileUpload}>
          <View style={styles.inputContainer}>        
              <Text style={{
                  height:45,
                  textAlign:'center',
                  paddingTop:10,
                  borderBottomColor: '#FFFFFF',
                  flex:1,
                  fontSize:16,
                  color:'#8C5383'
              }}>{fileName}</Text>  
            <Image style={styles.inputIcon} 
             source={{uri:"https://img.icons8.com/nolan/64/add-file.png"}}
             />

          </View>
          </TouchableOpacity>
            <Text>{progress}</Text>
        

<View style={styles.buttonArea}>
               
               <Button
                   title="Update"
                   buttonStyle={{
                       backgroundColor:'#8C5383',
                       width:100,
                       borderRadius:7
                   }}
                   onPress={upload}
                   />

               <Button
               title="Delete"
               buttonStyle={styles.button}
               onPress={createTwoButtonAlert}
               >
               </Button>
           </View>


            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:350,
        height:50,
        marginTop:40,
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
    datetimeButton:{
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#DDC4DD',
        borderRadius:30,
        borderBottomWidth: 1,
        width:350,
        height:50,
        marginTop:40,
        marginHorizontal:20,
        flexDirection: 'row',
        alignItems:'center',
    
        shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        justifyContent:'space-evenly'
    },
    buttonArea:{
        flexDirection:'row',
        marginTop:30,
        marginLeft:50,
        backgroundColor:'#EFF2F1',
        padding:30,
        justifyContent:'flex-end'
    },
    button:{
        marginLeft:30,
        backgroundColor:'#BA1B1D',
        width:100,
        borderRadius:7
    },
})
