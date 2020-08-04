import React, {useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../context/UserContext'

export default function Subjects({navigation}) {
    const [subject,setSubject] = useState([]);

    const user = useContext(UserContext);


    useEffect(() =>{
        const year = user.year.toString();
       const Subscriber =firestore()
       .collection('Subjects')
       .where('year','==',year)
       .onSnapshot(querySnapshot =>{
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
        <View style={styles.container}>
            {subject.map((item) =>{
               return <Button
                        title={item.Name}
                        key={item.key}
                        buttonStyle={{
                            backgroundColor:'#0F7173',
                            width:380,
                            marginTop:20,
                            height:70,
                            marginLeft:20,
                            marginRight:20,
                            borderRadius:6
                        }}
                        onPress={() =>{navigation.navigate('LectureList',{
                            key:item.key
                        })}}></Button>
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:30,
        backgroundColor:'#EFF2F1',
        flex:1
    }
})