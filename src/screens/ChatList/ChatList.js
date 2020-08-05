import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export default function ChatList({navigation}) {

    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const unsubscribe = firestore()
          .collection('THREADS')
          .onSnapshot(querySnapshot => {
            const threads = querySnapshot.docs.map(documentSnapshot => {
              return {
                _id: documentSnapshot.id,
                // give defaults
                name: '',
                latestMessage: {
                    text: ''
                  },
                ...documentSnapshot.data()
              };
            });
    
            setThreads(threads);
    
            if (loading) {
              setLoading(false);
            }
          });
    
        /**
         * unsubscribe listener
         */
        return () => unsubscribe();
      }, []);

      if (loading) {
        return <Text>Loading...</Text>;
      }

    return (
        <View style={styles.container}>
  <FlatList
    data={threads}
    keyExtractor={item => item._id}
    ItemSeparatorComponent={() => <Divider style={styles.dividerStyle}/>}
    renderItem={({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('RoomScreen', { thread: item })}
          >
              
      <List.Item
        left={props => <List.Icon {...props} icon="android-messages" />}
        title={item.name}
        description={item.latestMessage.text}
        titleNumberOfLines={1}
        titleStyle={styles.listTitle}
        descriptionStyle={styles.listDescription}
        descriptionNumberOfLines={1}
      /></TouchableOpacity>
    )}
  />

<TouchableOpacity
      activeOpacity={0.7}
      style={styles.TouchableOpacityStyle}
      onPress={() => navigation.navigate('NewChat')}
      >
              <Image
         source={require('../../../img/plus.png')}
        //You can use you project image Example below
        //source={require('./images/float-add-icon.png')}
        style={styles.FloatingButtonStyle}
      />

    </TouchableOpacity>
</View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1
      },
      listTitle: {
        fontSize: 22,
        color: "#00BFFF",
      },
      listDescription: {
        fontSize: 16
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
      dividerStyle:{
        color: "#00BFFF",
      }
})
