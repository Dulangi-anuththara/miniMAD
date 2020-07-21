import React, { useState, useEffect } from 'react';
import { SafeAreaView,StyleSheet,ScrollView, View, Text,TextInput, TouchableOpacity, StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';


export default function Register(){

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  
  signUp = () =>{
    auth()
  .createUserWithEmailAndPassword(email, password)
  .then((res) => {
    res.user.updateProfile({
      displayName:name
    })

    const data ={
      id:res.user.uid,
      name,
      year
    }

    const userRef = firestore().collection('Users');
    
    userRef
    .doc(res.user.uid)
    .set(data)
    .then(() =>{
      console.log('User account created & signed in!');
    })

  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });

  }

  return (
    
      <View style={styles.body}>
       <View style={styles.headerSection}>
       <Text style={styles.sectionTitle}>Sign Up</Text>
      </View> 

      <View>
 {/*     <TextInput style={styles.inputBox}
                 keyboardType='numeric'
                 placeholder={'Student ID'}
                 placeholderTextColor = {'white'}
                 onChangeText={(val)=>setID(val)}
      
  /> */}
      <TextInput style={styles.inputBox}                
                 placeholder={'Full Name'}
                 placeholderTextColor = {'white'}
                 onChangeText={(val)=> setName(val)}
      
      />
      <TextInput style={styles.inputBox}                
                 placeholder={'Email'}
                 placeholderTextColor = {'white'}
                 onChangeText={(val)=> setEmail(val)}
      
      />
      <TextInput style={styles.inputBox}
                 placeholder={'Password'}
                 placeholderTextColor = {'white'}
                 onChangeText={(val) => setPassword(val)}
      
      />
     <DropDownPicker
                items={[
                  {label:'First Year',value:1},
                  {label:'Second Year',value:2},
                  {label:'Third Year',value:3},
                  {label:'Fourth Year',value:4},
                  
                ]}
                defaultValue={year}
                containerStyle={styles.dropDown}
                onChangeItem={item =>{
                  setYear(item.value)
                }}
                />
      <TouchableOpacity
               style = {styles.submitButton}
               onPress={signUp}
              >
               <Text style = {styles.submitButtonText}> Register </Text>
            </TouchableOpacity>
    </View>
      </View>
    
  );
};

const styles = StyleSheet.create({

  body: {
    backgroundColor: '#3096EE',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerSection :{
      marginTop: 60,
      marginBottom:20,
      fontSize:5
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center'
  },
  inputBox: {
    //backgroundcolor:'white',
    height: 60,
    width: 300,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius:5,
    margin: 20,
    fontSize:18,
    paddingLeft:15,
  },
  submitButton: {
    backgroundColor: 'white',
    padding: 10,
    margin: 15,
    height: 50,
    borderRadius:5
  },
  submitButtonText:{
    color: '#3096EE',
    fontWeight: 'bold',
    textAlign:'center',
    fontSize: 18,
  },
  dropDown:{
    height:60,
    width:320,
    paddingLeft:20
  }
 
});


