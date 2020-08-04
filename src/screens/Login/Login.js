import React, { useState, useEffect } from 'react';
import { SafeAreaView,StyleSheet,ScrollView, View, Text,TextInput, TouchableOpacity, StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';


export default function Login({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    signIn = () =>{
      
      auth()
      .signInWithEmailAndPassword(email,password)
      .then(() => {
        console.log('Logged In successfully');
      })
      .catch(error => {
        console.error(error);
      });
    }
  
    return (
      
        <View style={styles.body}>
         <View style={styles.headerSection}>
         <Text style={styles.sectionTitle}>Sign In</Text>
        </View> 
  
        <View>
        <TextInput style={styles.inputBox}
                   placeholder={'Email'}
                   keyboardType='email-address'
                   placeholderTextColor = {'white'}
                   onChangeText={(val)=>setEmail(val)}
        
        />
        <TextInput style={styles.inputBox}
                   placeholder={'Password'}
                   keyboardType='visible-password'
                   placeholderTextColor = {'white'}
                   secureTextEntry={true}
                   onChangeText={(val)=> setPassword(val)}
        
        />
        
        <TouchableOpacity
                 style = {styles.submitButton}
                 onPress={signIn}
                >
                 <Text style = {styles.submitButtonText}> Sign In </Text>
              </TouchableOpacity>

        <TouchableOpacity
                 style = {styles.submitButton}
                 onPress={() => navigation.navigate('Register')}
                >
                 <Text style = {styles.submitButtonText}> Sign Up </Text>
              </TouchableOpacity>
      </View>
        </View>
      
    );
  };
  
  const styles = StyleSheet.create({
  
    body: {
      backgroundColor: '#0E9594',
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
      color: 'black',
      fontWeight: 'bold',
      textAlign:'center',
      fontSize: 18,
    },
   
  });
  
  
  