import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ListView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../../context/UserContext'

export default function AssignmentList({navigation}) {
    const data = useContext(UserContext)
    const [assignments, setAssignments] = useState([])

    
    useEffect(()=>{
        const Subscriber =firestore()
       .collection('Assignments')
       .where('code','==',data.key)
       .onSnapshot(querySnapshot =>{
           const Assignments = [];
           querySnapshot.forEach(documentSnapshot =>{
               Assignments.push({
                   ...documentSnapshot.data(),
                   key:documentSnapshot.id
               })
           })
           setAssignments(Assignments);
       });
       return () => Subscriber
    },[])

    return (
                <View style={styles.container}>
                <View>{ assignments.length !=0 &&
                <FlatList
        style={styles.notificationList}
        data={assignments}
        renderItem={({ item }) => (
            
            <View style={styles.notificationBox}>
                <Image style={styles.image}
                        source={{uri:"https://img.icons8.com/office/80/000000/archive.png"}}/>
                <Text style={styles.description}
                    onPress={()=>{
                        navigation.navigate('ViewAssignment',{
                            key:item.key,
                            SubjCode:data.SubjCode,
                            id:data.key
                        })
                    }}
                    >{item.Title}</Text>
            </View>
        )}
        
        />}




                </View>

        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.TouchableOpacityStyle}
            onPress={() => navigation.navigate('NewAssignment',{
                id:data.key,
                SubjCode:data.SubjCode,
                year:data.year
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
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left:300,
        top:400
      },
      FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
      },
})