import React, {useState, useEffect, useContext} from 'react'
import { View, Text, Linking, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../context/UserContext'
export default function LectureList({route,navigation}) {

    const {key} = route.params;
    const [lectures, setLectures] = useState([]);
    const user = useContext(UserContext);
    const year = user.year.toString();

    useEffect(()=>{
        
        const lectureRef =firestore().collection('Subjects').doc(year).collection('Subjects').doc(key).collection('Lectures')

        const subscriber= lectureRef
        .onSnapshot(querySnapshot =>{
            const Lectures = [];
            querySnapshot.forEach(documentSnapshot =>{
                Lectures.push({
                    ...documentSnapshot.data(),
                    key:documentSnapshot.id
                })
                //console.log(documentSnapshot.data());
            })
            setLectures(Lectures);
    })

    return () => subscriber
},[])


    return (
        <View>

            {
                lectures.map(item =>{
                    return <Text 
                                style={{color: 'blue'}}
                                key={item.key}
                                onPress={() => navigation.navigate('VideoPlayer',{
                                    url:item.file,
                                    title:item.Name
                                })}>
                              {item.Name}
                      </Text>
                })
            }

        </View>
    )
}

const styles = StyleSheet.create({
    link:{
        color:'blue'
    }
})
