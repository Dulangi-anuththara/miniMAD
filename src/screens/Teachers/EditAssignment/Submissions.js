import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Linking } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../../context/UserContext'

export default function Submissions({route,navigation}) {

    const { key} = route.params;
    const data = useContext(UserContext)
    const [submissions, setSubmissions] = useState([])

    
    useEffect(()=>{
        const Subscriber =firestore()
       .collection('Assignments')
       .doc(key)
       .collection('Submissions')
       .onSnapshot(querySnapshot =>{
           const Submissions = [];
           querySnapshot.forEach(documentSnapshot =>{
               Submissions.push({
                   ...documentSnapshot.data(),
                   key:documentSnapshot.id
               })
           })
           setSubmissions(Submissions);
       });
       return () => Subscriber
    },[])

    return (
                <View style={styles.container}>
                    <Text></Text>
                <View>{ submissions.length !=0 &&
                <FlatList
        style={styles.notificationList}
        data={submissions}
        renderItem={({ item }) => (
            
            <View style={styles.notificationBox}>
                <Image style={styles.image}
                        source={{uri:"https://img.icons8.com/office/80/000000/pdf.png"}}/>
                <Text style={styles.description}
                    onPress={() => Linking.openURL(item.downloadURL)}
                    >{item.file}</Text>
            </View>
        )}
        
        />}




                </View>

            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#EFF2F1'
    },
    notificationList:{
        marginTop:20,
        padding:10,
    },
    notificationBox: {
        padding:20,
        marginVertical:5,
        marginHorizontal:10,
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