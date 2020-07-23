import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function AssignmentsList({navigation}) {
    
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [assignments, setAssignments] = useState([]); // Initial empty array of assignments

  useEffect(() => {

    const subscriber = firestore()
      .collection('Assignments')
      .onSnapshot((querySnapshot) => {
        const assignments = [];

      querySnapshot.forEach(documentSnapshot => {
        assignments.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setAssignments(assignments);
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
      data={assignments}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewAssignments', {
          key:item.key
        })}> 
        <View style={styles.list}>
         <View style={styles.header}> 
         <Text style={styles.title}>{item.Title}</Text>
         </View>
          <Text>by {item.DueDate}</Text>

            <Text> {item.SubjCode}</Text>
        </View>
        </TouchableWithoutFeedback>
      )}
    />


    </View>
    )
}

const styles = StyleSheet.create({
  Container:{
    backgroundColor:'white',
    flex:1
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
        color:'red',
        fontSize:18
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
  header:{
    backgroundColor:'#B1D6F5',
    height:40
},
})