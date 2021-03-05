import * as firebase from 'firebase';
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


if(!firebase.app.length) firebase.initializeApp(firebaseConfig);

export {firebase};