import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function AssignmentsList({navigation}) {
    
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [assignments, setAssignments] = useState([]); // Initial empty array of assignments
  console.ignoredYellowBox = true;
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
             style={styles.notificationList}
            data={assignments}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewAssignments', {
          key:item.key
        })}> 
        <View style={styles.notificationBox}>
         <View style={styles.header}> 
         <Image style={styles.image}
                          source={{uri:"https://img.icons8.com/fluent/48/000000/folder-invoices.png"}}/>
         <Text style={styles.title}>{item.Title}</Text>
         </View>

         <View style={styles.details}>
          <Text>by {item.DueDate}</Text>

            <Text> {item.SubjCode}</Text>
            </View>
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
    title:{
      color:'white',
      fontWeight: "bold",
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
    backgroundColor:'#0F7173',
        marginRight:20,
        borderRadius:10,
        padding:10,
        flexDirection:'row'
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
    details:{
      flexDirection:'row',
      padding:10
    },
    image:{
      width:25,
      height:25,
      marginRight:5
    },
})