import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

export default function Subjects({navigation}) {
    const [subject,setSubject] = useState([]);

    useEffect(() =>{
       const Subscriber =firestore().collection('Subjects').onSnapshot(querySnapshot =>{
           const Subjects = [];
           querySnapshot.forEach(documentSnapshot =>{
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
        <View>
            <Text onPress={testFun}>Test</Text>
            {subject.map((item) =>{
               return <Button 
                            title={item.Name} 
                            key={item.id}
                            buttonStyle={{width:400,marginBottom:20,height:70}}
                            onPress={() =>{navigation.navigate('LectureList',{
                                key:item.key
                            })}}></Button>
            })}
            <Text onPress={() => navigation.navigate('VideoPlayer')}>Click here</Text>
        </View>
    )
}
