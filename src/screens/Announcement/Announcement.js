import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

import firestore from '@react-native-firebase/firestore';


export default function Announcement({navigation}) {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  useEffect(() => {

    const subscriber = firestore()
      .collection('Announcements')
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
        <View>
            <FlatList
      data={users}
      renderItem={({ item }) => (
        <View style={styles.list}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text>by {item.Author}</Text>
          </View>

            <Text> {item.Announcement}</Text>
        </View>
      )}
    />

<TouchableOpacity
          activeOpacity={0.7}
          style={styles.TouchableOpacityStyle}
          onPress={() => navigation.navigate('NewAnnouncement')}
          >
                  <Image
             source={{
uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
 
        </TouchableOpacity>


    </View>
    )
}

const styles = StyleSheet.create({

    list:{
        borderWidth:3,
        borderRadius:6,
        borderColor:'red',
        height: 100,
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    title:{
        color:'red',
        fontSize:18
    },
    header:{
        backgroundColor:'#F4E4E3'
    },
    floatingButton:{
        marginTop:400
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
})