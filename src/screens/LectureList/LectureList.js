import React, {useState, useEffect} from 'react'
import { View, Text, Linking, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function LectureList({route,navigation}) {

    const {key} = route.params;
    const [lectures, setLectures] = useState([]);

    useEffect(()=>{
        const subscriber= firestore()
        .collection('Subjects')
        .doc(key)
        .collection('Lectures')
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
