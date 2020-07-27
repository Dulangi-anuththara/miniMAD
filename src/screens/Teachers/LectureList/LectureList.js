import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../../context/UserContext'

export default function LectureList({navigation}) {

    const key = useContext(UserContext)
    const [lectures, setLectures] = useState([])

    useEffect(()=>{

        const Subscriber =firestore()
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
       });
       return () => Subscriber
    })

    return (
        <View style={styles.container}>

             {
                lectures.map(item =>{
                    return <Text 
                                style={styles.list}
                                key={item.key}
                                onPress={() => 
                                navigation.navigate('NewLecture')}>
                              {item.Name}
                      </Text>
                })
            }

<TouchableOpacity
          activeOpacity={0.7}
          style={styles.TouchableOpacityStyle}
          onPress={() => navigation.navigate('NewLecture')}
          >
                  <Image
             source={require('../../../../img/plus.png')}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
 
        </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    list:{
        color:'blue',
        margin:20,
        marginLeft:60,
        fontSize:18,
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left:300,
        top:500
      },
      FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
      },
})