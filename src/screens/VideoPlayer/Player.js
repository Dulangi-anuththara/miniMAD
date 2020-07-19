import React,  { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player'


export default function Player() {

  const [url,setURL] = useState();
  const [title,setTitle] = useState('TestTitle');

  useEffect(()=>{
    setURL('https://firebasestorage.googleapis.com/v0/b/minimad-b3931.appspot.com/o/y2mate.com%20-%20Draco%20Malfoy%20__%20Lovely_nOKQEuTjEI8_1080p.mp4?alt=media&token=ed482863-ee9f-4c4b-9c9c-bf12a5fc2ba1')
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

