import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "react-native-button";
import { AppStyles} from './AppStyles'

export default function EditProfile({routes,navigation}) {
    const [fullname, setFullname] = useState();
    const [phone, setphone] = useState()
    const [Bio, setBio] = useState()
    return (
        <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Edit Account</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Full Name"
            onChangeText={text => setFullname(text)}
            value={fullname}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Phone Number"
            onChangeText={text => setphone(text)}
            value={phone}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.body,styles.textArea}
            placeholder="Bio"
           onChangeText={text => setBio(text)}
            value={Bio}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
          style={styles.facebookText}
          //onPress={() => this.onRegister()}
        >
          Edit
        </Button>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },
    title: {
      fontSize: AppStyles.fontSize.title,
      fontWeight: "bold",
      color: AppStyles.color.tint,
      marginTop: 20,
      marginBottom: 20
    },
    leftTitle: {
      alignSelf: "stretch",
      textAlign: "left",
      marginLeft: 20
    },
    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: "center",
      fontSize: AppStyles.fontSize.content,
      color: AppStyles.color.text
    },
    loginContainer: {
      width: AppStyles.buttonWidth.main,
      backgroundColor: AppStyles.color.tint,
      borderRadius: AppStyles.borderRadius.main,
      padding: 10,
      marginTop: 30
    },
    loginText: {
      color: AppStyles.color.white
    },
    placeholder: {
      fontFamily: AppStyles.fontName.text,
      color: "red"
    },
    InputContainer: {
      width: AppStyles.textInputWidth.main,
      marginTop: 30,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: AppStyles.color.grey,
      borderRadius: AppStyles.borderRadius.main
    },
    body: {
      height: 42,
      paddingLeft: 20,
      paddingRight: 20,
      color: AppStyles.color.text
    },
    facebookContainer: {
      width: AppStyles.buttonWidth.main,
      backgroundColor: AppStyles.color.tint,
      borderRadius: AppStyles.borderRadius.main,
      padding: 10,
      marginTop: 30
    },
    facebookText: {
      color: AppStyles.color.white
    },
    textArea: {
        height: 150,
        justifyContent:"flex-start",
        textAlignVertical:'top',
        paddingLeft:20
      }
  });
