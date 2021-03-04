import Constant from 'expo-constants';

const ENV = {
    dev:{
        apiKey: "AIzaSyDTktOCmT4ghXQeYnGcwvDRMpnodf_rzs8",
        authDomain: "teach-it-502df.firebaseapp.com",
        projectId: "teach-it-502df",
        storageBucket: "teach-it-502df.appspot.com",
        messagingSenderId: "919969621019",
        appId: "1:919969621019:web:dfa3fd2244c1e8c22184be"
    },
    production: {
        apiKey: "AIzaSyDTktOCmT4ghXQeYnGcwvDRMpnodf_rzs8",
        authDomain: "teach-it-502df.firebaseapp.com",
        projectId: "teach-it-502df",
        storageBucket: "teach-it-502df.appspot.com",
        messagingSenderId: "919969621019",
        appId: "1:919969621019:web:dfa3fd2244c1e8c22184be"
    }
}

const getEnvVars = (env = Constant.manifest.releaseChannel) =>{
    if(_DEV_) return ENV.dev;
    else if(env === "production" || env === "default") return ENV.production;
}

export default getEnvVars;