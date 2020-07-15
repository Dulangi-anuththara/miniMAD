import React, { useState } from "react";
import { View, Linking, StyleSheet, Modal, TouchableHighlight } from 'react-native'
import { Text, Button } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';

export default function ViewAssignments({route, navigation}) {
    
    const [modalVisible, setModalVisible] = useState(false);
    const {item} = route.params;
    return (
        <View style={styles.Container}>
            <View >
                <Text h4 >{item.Title}</Text>
            </View>

            <View style={styles.headerContent}>
                <Text>{item.Description}</Text>
                <Text style={{color: 'blue'}}
                  onPress={() => Linking.openURL(item.Assignment)}>{item.Title}
                  </Text>
            </View>
            <Text h4>Submission Status</Text>
            <View style={styles.statusContent}>
                
            <Text>Submission Status :</Text>
            <Text>Grading Status :</Text>
            <Text>Due Date : {item.DueDate}</Text>
            <Text>Time Remaining :</Text>
            <Text>Submission Comments :</Text>
            
    
            </View>

            <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>

                            <DocumentPicker></DocumentPicker>

                            <View style={styles.submitButton}>
                            <Button
                                title="Submit"
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                                buttonStyle={{backgroundColor:'red', justifyContent:'center'}}
                                
                            />
                             <Button
                                title="Cancel"
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                                buttonStyle={{backgroundColor:'green'}}
                                
                            />
            </View>
                        </View>
                        </View>
                    </Modal>
            <View style={styles.submitButton}>
                <Button
                    title="Add Submission"
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                    
                />
            </View>
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'white',
        flex:1
    },
    headerContent:{
        borderWidth:1,
        borderColor:'#3096EE',
        padding:20,
        margin:20
    },
    statusContent:{
        borderWidth:1,
        borderColor:'#3096EE',
        padding:20,
        margin:20

    },
    submitButton:{
        width:200,
        height:30,
        justifyContent:'space-between',
        alignSelf:'center',
        flexDirection:'row'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height:200,
        width:350
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
})