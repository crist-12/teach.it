import firebase from 'firebase/app';
import "@firebase/auth";
import "@firebase/firestore";
import getEnvVars from '../../environment'

const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} = getEnvVars();


const firebaseConfig = {
    apiKey,
    authDomain, 
    projectId, 
    storageBucket, 
    messagingSenderId,
    appId,
};


let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {firebase, auth, db};