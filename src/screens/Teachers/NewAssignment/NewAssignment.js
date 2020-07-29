import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';



export default function NewAssignment({route,navigation}) {

    const {id} =route.params
    return (
        <View>
            <Text>{id}</Text>

        </View>
    )
}
