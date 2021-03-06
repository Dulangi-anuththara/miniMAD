import React, { useState, useEffect } from 'react';
import { SafeAreaView,StyleSheet,ScrollView, View, Text,TextInput, TouchableOpacity, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';



export default function Login({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bgcolor, setColor] = useState('#0F7173');
    const [role, setRole] = useState('teacher')


    signIn = () =>{
      if(email.length == 0 || password.length == 0){
        Alert.alert('Alert', 'Email or password field is empty. Please fill all the fields');
         
        return;
      }
      
      auth()
      .signInWithEmailAndPassword(email,password)
      .then(() => {
        console.log('Logged In successfully');
      })
      .catch(error => {

        Alert.alert('Alert', `${error}`);
        console.error(error);
      });
    }

    const changeRole = () =>{
      if(role == 'teacher'){
        setColor('#95C623');
        setRole('student');

      }else{
        setColor('#0F7173');
        setRole('teacher');
      }
    }
  
    return (
      
        <View style={{
          backgroundColor:`${bgcolor}`,
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
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
                   placeholderTextColor = {'white'}
                   secureTextEntry
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
                 onPress={changeRole}
                >
                 <Text style = {styles.submitButtonText}> Sign in as {role} </Text>
              </TouchableOpacity>
              <TouchableOpacity
                 onPress={() => navigation.navigate('Register')}
                >
                 <Text style = {styles.ButtonText}> Create an account </Text>
              </TouchableOpacity>
      </View>
        </View>
      
    );
  };
  
  const styles = StyleSheet.create({
  
   /* body: {
      backgroundColor:'#0F7173',
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },*/
    headerSection :{
        marginTop: 50,
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
      color:'white'
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
    ButtonText:{
      color: 'white',
      fontWeight: 'bold',
      textAlign:'center',
      fontSize: 18,
      textDecorationLine:'underline'
    },
   
  });
  
  
  