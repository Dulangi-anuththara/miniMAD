import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
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
    },[])

    return (
        <View style={styles.container}>
            <View>
            <FlatList
      data={lectures}
      renderItem={({ item }) => (
        <View style={styles.list}>
            <Text style={styles.title}>{item.Name}</Text>
        </View>
      )}
    />
            </View>

<TouchableOpacity
          activeOpacity={0.7}
          style={styles.TouchableOpacityStyle}
          onPress={() => navigation.navigate('NewLecture',{
              id:key
          })}
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
        flex:1,
        backgroundColor:'#E8F0FF'
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
      header:{
        backgroundColor:'#B1D6F5'
    },
    list:{
        borderWidth:3,
        borderRadius:6,
        borderColor:'#40376E',
        height: 50,
        flex: 1,
        backgroundColor:'white',
        margin:10,
    },
    title:{
        color:'#5E666E',
        fontWeight: "bold",
        fontSize:18,
        padding:10
    },
})