import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat, SystemMessage, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function RoomScreen({route}) {

    const { thread } = route.params;
    const currentUser= auth().currentUser;

    const [messages, setMessages] = useState([
        /**
         * Mock message data
         */
        // example of system message
        {
          _id: 0,
          text: 'New room created.',
          createdAt: new Date().getTime(),
          system: true
        },
      ]);

      function renderSystemMessage(props) {
  return (
    <SystemMessage
      {...props}
      wrapperStyle={styles.systemMessageWrapper}
      textStyle={styles.systemMessageText}
    />
  );
}
function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#0F7173' />
        </View>
      </Send>
    );
  }
      
      useEffect(() => {
        const messagesListener = firestore()
          .collection('THREADS')
          .doc(thread._id)
          .collection('MESSAGES')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data();
    
              const data = {
                _id: doc.id,
                text: '',
                createdAt: new Date().getTime(),
                ...firebaseData
              };
    
              if (!firebaseData.system) {
                data.user = {
                  ...firebaseData.user,
                  name: firebaseData.user.email
                };
              }
    
              return data;
            });
    
            setMessages(messages);
          });
    
        return () => messagesListener();
      }, []);

      

function handleSend(messages) {
        const text = messages[0].text;
        console.log(text)
      
        firestore()
          .collection('THREADS')
          .doc(thread._id)
          .collection('MESSAGES')
          .add({
            text,
            createdAt: new Date().getTime(),
            user: {
              _id: currentUser.uid,
              email: currentUser.email
            }
          })
          .then(()=>{
            firestore()
            .collection('THREADS')
            .doc(thread._id)
            .set(
              {
                latestMessage: {
                  text,
                  createdAt: new Date().getTime()
                }
              },
              { merge: true }
            );
          });


      }
    
    return (
        <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: currentUser.uid }}
      placeholder='Type your message here...'
      renderSystemMessage={renderSystemMessage}
      alwaysShowSend
      showAvatarForEveryMessage
      renderSend={renderSend}
    />
    )
}

const styles = StyleSheet.create({
    systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        textAlign:'center'
    },
    systemMessageWrapper:{
        backgroundColor:'#0F7173',
        width:300,
        height:25,
        justifyContent:'center',
        borderRadius:6

    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      }
})
