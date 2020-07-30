import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ListView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../../context/UserContext'

export default function LectureList({navigation}) {

    const data = useContext(UserContext)
    const [lectures, setLectures] = useState([])

    useEffect(()=>{
        const Subscriber =firestore()
       .collection('Subjects')
       .doc(data.key)
       .collection('Lectures')
       .onSnapshot(querySnapshot =>{
           const Lectures = [];
           querySnapshot.forEach(documentSnapshot =>{
               Lectures.push({
                   ...documentSnapshot.data(),
                   key:documentSnapshot.id
               })
           })
           setLectures(Lectures);
       });
       return () => Subscriber
    },[])

    return (
        <View style={styles.container}>
            <View>
            <FlatList
    style={styles.notificationList}
      data={lectures}
      renderItem={({ item }) => (
        <View style={styles.notificationBox}
              >
            <Image style={styles.image}
                    source={{uri:"https://img.icons8.com/office/80/000000/pdf.png"}}/>
            <Text style={styles.description}
                onPress={()=>{
                    navigation.navigate('EditLecture',{
                        SubCode:data.key,
                        LecCode:item.key,
                        item:item,
                        fileName:item.Name
                    })
                }}>{item.Title}</Text>
        </View>
      )}
      
    />




            </View>

<TouchableOpacity
          activeOpacity={0.7}
          style={styles.TouchableOpacityStyle}
          onPress={() => navigation.navigate('NewLecture',{
              id:data.key
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
        backgroundColor:'#EFF2F1'
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
    notificationList:{
        marginTop:20,
        padding:10,
    },
    notificationBox: {
        paddingVertical:20,
        paddingLeft:20,
        marginTop:5,
        marginBottom:5,
        marginHorizontal:5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius:10,
    },
    image:{
        width:45,
        height:45,
    },
    description:{
        fontSize:18,
        color: "#3498db",
        marginLeft:10,
    },
})