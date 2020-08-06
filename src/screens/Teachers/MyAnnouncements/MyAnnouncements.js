import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default function MyAnnouncements({navigation}) {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const userId= auth().currentUser.uid;

  useEffect(() => {
    console.log(userId);
    const subscriber = firestore()
      .collection('Announcements')
      .where('UserId','==',userId)
      .onSnapshot((querySnapshot) => {
        const users = [];

      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setUsers(users);
      setLoading(false);
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
    return (
        <View style={styles.container}>
            <FlatList

            style={styles.notificationList}
            data={users}
            renderItem={({ item }) => (
              <View style={styles.notificationBox}>
              <View style={styles.header}>
              <View style={{
                flexDirection:'row'
              }}>
                    <Image style={styles.image}
                          source={{uri:"https://img.icons8.com/fluent/48/000000/note.png"}}/>
                      <Text style={styles.title}
                            onPress={()=>{
                                navigation.navigate('EditAnnouncements',{
                                    key:item.key,
                                    PrevTitle:item.Title,
                                    PrevAnnouncement:item.Announcement
                                })
                            }}>{item.Title}</Text>
              </View>
                  <Text style={styles.Author}>by {item.Author} - {item.Date}</Text>
                
                </View>
                <View style={styles.content}>
                <Text style={styles.announcement}> {item.Announcement}</Text>

                </View>                  
              </View>
            )}
    />


    </View>
    )
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#EFF2F1'
},

    list:{
        borderWidth:3,
        borderRadius:6,
        borderColor:'#3096EE',
        height: 100,
        flex: 1,
        backgroundColor:'white',
        margin:10,

        //alignItems: 'center',
        //justifyContent: 'center'
    },
    title:{
        color:'white',
        fontWeight: "bold",
        fontSize:18
    },
    header:{
        backgroundColor:'#0F7173',
        marginRight:20,
        borderRadius:10,
        padding:10
    },
    content:{
      backgroundColor:'white',
      marginRight:20,
      borderRadius:10,
      padding:10,
      marginTop:5

  },
    floatingButton:{
        marginTop:400
    },
    Author:{
      color:'#CC998D'
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
    //backgroundColor:'black'
  },
  announcement:{
    marginTop:10
  },
  notificationList:{
    marginTop:20,
    padding:5,
  },
  notificationBox: {
    paddingVertical:10,
    paddingLeft:20,
    paddingRight:0,
    marginTop:5,
    marginBottom:5,
    marginHorizontal:5,
    backgroundColor: '#C9FFE2',
    //flexDirection: 'row',
    borderWidth:2,
    borderColor:'#0F7173',
    borderRadius:10,
    },
    image:{
      width:25,
      height:25,
      marginRight:5
    },
})