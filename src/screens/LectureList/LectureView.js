import React, {useState, useEffect, useContext} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import VideoPlayer from 'react-native-video-player'

export default function ViewLecture({route}) {


    const {Title,Name,Description,file,type} = route.params
    var comp = <View></View>

    if(type == 'application/pdf'){
        comp =   <View style={styles.profile}>
        <Image style={styles.avatar}
          source={{uri: 'https://img.icons8.com/office/80/000000/pdf.png'}}/>

        <Text style={styles.name}
        onPress={() => Linking.openURL(file)}>
            {Name}
        </Text></View>
    }else{
        comp=<View style={styles.backgroundVideo}>

        <VideoPlayer
            video={{ uri:file }}
            videoWidth={1600}
            videoHeight={900}
            thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
            customStyles={{playArrow:true}}
        />
  </View>
    }

    return (
        

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerTitle}>
                {Title}
              </Text>
          </View>

          <View style={styles.postContent}>
              <Text style={styles.postTitle}>
              {Description}
              </Text>
              {comp}
          </View>
        </View>
      </ScrollView>
    );
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    padding:10,
    alignItems: 'center',
    backgroundColor: "#77CBB9",
  },
  headerTitle:{
    fontSize:28,
    color:"#FFFFFF",
    marginTop:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  postContent: {
    flex: 1,
    padding:30,
  },
  postTitle:{
    fontSize:22,
    fontWeight:'600',
  },
  postDescription:{
    fontSize:16,
    marginTop:10,
  },
  tags:{
    color: '#00BFFF',
    marginTop:10,
  },
  date:{
    color: '#696969',
    marginTop:10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderColor: "#0E9594",
  },
  profile:{
    flexDirection: 'row',
    marginTop:20
  },
  name:{
    fontSize:22,
    color:"#00BFFF",
    fontWeight:'600',
    alignSelf:'center',
    marginLeft:10
  }, 
  shareButton: {
    marginTop:50,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#0E9594",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  backgroundVideo: {
    paddingTop:70,
    padding:20

  },
});
  