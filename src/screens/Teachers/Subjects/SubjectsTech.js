import React, {useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../../context/UserContext'

export default function SubjectsTech({navigation}) {
    const [subject,setSubject] = useState([]);

    const user = useContext(UserContext);


    useEffect(() =>{
        const id = user.id
       const Subscriber =firestore()
       .collection('Staff')
       .doc(id)
       .collection('Subjects')
       .onSnapshot(querySnapshot =>{
           const Subjects = [];
           querySnapshot.forEach(documentSnapshot =>{
               console.log(documentSnapshot.id);
               Subjects.push({
                   ...documentSnapshot.data(),
                   key:documentSnapshot.id
               })
               //console.log(documentSnapshot.data());
           })
           setSubject(Subjects);
       });
       return () => Subscriber
    },[])

    const testFun = () =>{
        console.log(subject);
    }
    return (
        <View style={styles.container}>
            {subject.map((item) =>{
               return <Button 
                            title={item.Name} 
                            key={item.key}
                            buttonStyle={{width:350,marginBottom:20,height:70,marginLeft:20,marginRight:20}}
                            onPress={()=>{
                                navigation.navigate('Subject',{
                                    key:item.key
                                })
                            }}
                            >
                            </Button>
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:30
    }
})