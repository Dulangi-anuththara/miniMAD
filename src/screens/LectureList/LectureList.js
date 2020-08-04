import React, {useState, useEffect, useContext} from 'react'
import { View, Text, Linking, StyleSheet, FlatList,Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../../../context/UserContext'
export default function LectureList({route,navigation}) {

    const {key} = route.params;
    const [lectures, setLectures] = useState([]);
    const user = useContext(UserContext);
    const year = user.year.toString();

    useEffect(()=>{
        
        const lectureRef =firestore().collection('Subjects').doc(key).collection('Lectures')

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
    <View style={styles.container}>
        <View>
        <FlatList
style={styles.notificationList}
  data={lectures}
  renderItem={({ item }) => (
    <View style={styles.notificationBox}>

        {item.type == 'application/pdf' && 
                <Image style={styles.image}
                source={{uri:"https://img.icons8.com/office/80/000000/pdf.png"}}/>
        }
        {item.type == 'video/mp4' &&
                <Image style={styles.image}
                source={{uri:"https://img.icons8.com/office/80/000000/video-file.png"}}/>
        }
        <Text style={styles.description}
            onPress={()=>{
                navigation.navigate('LectureView',{
                    Title:item.Title,
                    Name:item.Name,
                    Description:item.Description,
                    file:item.file,
                    type:item.type
                })
            }}>{item.Title}</Text>
    </View>
  )}
  
/>




        </View>
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
