import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';

class FirebaseSvc {
    constructor() {
      if (!firebase.apps.length) { //avoid re-initializing
        firebase.initializeApp({
            apiKey: "AIzaSyDwHb_lkG3rnXLbwNxezyq05zQ_kV9X8V8",
            authDomain: "minimad-b3931.firebaseapp.com",
            databaseURL: "https://minimad-b3931.firebaseio.com",
            projectId: "minimad-b3931",
            storageBucket: "minimad-b3931.appspot.com",
            messagingSenderId: "106441122157",
            appId: "1:106441122157:web:1ead5080a926eaae847a64",
            measurementId: "G-C8Y5LQBVQH"
        });
       }
    }

    const 

    refOn = callback => {      

          firebase.database().ref("Messages")
          .on('child_added', snapshot => callback(this.parse(snapshot)));
      }
      parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {_id, timestamp, text, user};
        return message;
      };
    
      send = messages => {
        for (let i = 0; i < messages.length; i++) {
          const { text, user } = messages[i];
          const createdAt = firebase.database.ServerValue.TIMESTAMP;
          const message = {text, user, createdAt };
          firebase.database().ref("Messages").push(message);
        }
      };

      refOff = () =>{
        firebase.database().ref("Messages").off();
      }

    

  }

  const firebaseSvc = new FirebaseSvc();
  export default firebaseSvc;