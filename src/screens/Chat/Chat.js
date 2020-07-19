import React, { useState, useEffect, useContext } from "react";
import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import { UserContext } from '../../../context/UserContext'
import FirebaseSvc from '../../../FireBaseSvc/FirebaseSvc'

export default function Chat() {
    const [message, setMessage] = useState([]);

    const user = useContext(UserContext);
    const USER = {
        _id:user[1],
        name:user[0]
    }

    useEffect(()=>{
        
        FirebaseSvc.refOn(msg =>{
            
            var newChatArray = GiftedChat.append(message,msg);
            var MSG = newChatArray[0];
            setMessage(oldArray => [MSG,...oldArray]);
            
        })

        return FirebaseSvc.refOff
    },[]);

    return (
        <GiftedChat
        messages={message}
        onSend={FirebaseSvc.send}
        user={USER}
        />
    )
}


