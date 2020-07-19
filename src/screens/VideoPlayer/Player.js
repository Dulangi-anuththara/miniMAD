import React,  { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player'


export default function Player({route,navigation}) {

  const {url,title} = route.params

  useEffect(()=>{
    console.log(url);
  })

    return (
      <View>
        <Text>{title}</Text>
        <View style={styles.backgroundVideo}>

              <VideoPlayer
                  video={{ uri:url }}
                  videoWidth={1600}
                  videoHeight={900}
                  thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                  customStyles={{playArrow:true}}
              />
        </View>
      </View>
        
    )
}

var styles = StyleSheet.create({
    backgroundVideo: {
      paddingTop:70,
      padding:20

    },
  });

