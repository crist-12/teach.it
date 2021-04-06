import React, {useContext, useState,useEffect } from "react";
import { StyleSheet, Dimensions, View, ImageBackground, StatusBar } from "react-native";
import { Text, SocialIcon  } from "react-native-elements";
import Logo from "../shared/Logo";
import SignInForm from "../forms/SignInForm";
import Alert from "../shared/Alert";
import UpperText from "../shared/UpperText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../firebase";
import { Context as AuthContext } from "../../providers/AuthContext";
import theme from "../../theme";

const { width, height } = Dimensions.get("screen");

const SignIn = ({ navigation }) => {
  const { state  } = useContext(AuthContext);
  const [ error, setError ]=useState(false);
  const [ passwordReset, setPasswordReset ] = useState(false);

  //Verifica si se acaba de cambiar la contraseña
  useEffect(() => {
      setPasswordReset(state.passReset);
  }, [state.passReset]);

  const handleGoogleSignIn = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        //Obtener el Unique Identifier generado para cada usuario
        const uid = response.user.uid;
        const email = response.user.email;
        const fullname = response.user.displayName;
        //Construir el objeto a enviar a la coleccion de "users"
        const user = {
          id: uid,
          email,
          fullname
        };

        //Obtener la coleccion desde Firebase
        const usersRef = firebase.firestore().collection("users");

        //Inicia sesion y si no estaba registrado se registra el dato en firestore
        usersRef
        .doc(uid)
        .set(user)
        .then(() => {
          // Obtener la información del usuario y enviarla a la pantalla Principal
          navigation.navigate("Principal", { user });
        })
        .catch((error) => {
          setError(error.message);
          console.log(error.message);
        });
      })
      .catch((error) => setError(error.message));
  };

  const handleFacebookSignIn = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        console.log(response);
        //Obtener el Unique Identifier generado para cada usuario
        const uid = response.user.uid;
        const email = response.user.email;
        const fullname = response.user.displayName;
        //Construir el objeto a enviar a la coleccion de "users"
        const user = {
          id: uid,
          email,
          fullname
        };

        //Obtener la coleccion desde Firebase
        const usersRef = firebase.firestore().collection("users");

        //Inicia sesion y si no estaba registrado se registra el dato en firestore
        usersRef
        .doc(uid)
        .set(user)
        .then(() => {
          // Obtener la información del usuario y enviarla a la pantalla Principal
          navigation.navigate("Principal", { user });
        })
        .catch((error) => {
          setError(error.message);
          console.log(error.message);
        });
      })
      .catch((error) => {setError(error.message); console.log(error.message)});
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../../../assets/fondo.jpg")}
        style={styles.imageBackgroundContainer}
      >
        <UpperText text="Iniciar sesión en Teach.it" />
        {passwordReset ? (
          <Alert
            type="success"
            title="Revisa tu correo para restablecer tu contraseña e ingresar"
          />
        ) : null} 
        <KeyboardAwareScrollView>
          <View style={styles.formContent}>
            <Logo />
            <SignInForm navigation={navigation}/>
            <Text>
              ¿Nuevo en Teach.it?{" "} 
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("SignUp")}
              >
                Crea un cuenta.
              </Text>
            </Text>
            <Text style={styles.line}>─────────── o ───────────</Text>
            <SocialIcon
              title='Iniciar sesión con Facebook'
              button
              raised
              type='facebook'
              onPress={handleFacebookSignIn}
            />
            <SocialIcon
              title='Iniciar sesión con Google'
              button
              raised
              type='google'
              onPress={handleGoogleSignIn}
            />

          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackgroundContainer: {
    flex: 1,
    alignItems: "center",
    resizeMode: "cover",
  },
  formContent: {
    backgroundColor: "#fff",
    width: width * 0.9,
    height: height * 0.73,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: height * 0.1,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    justifyContent: "center",
  },
  link: {
    color: theme.colors.primary,
  },
  line:{
    textAlign:"center",
    color: "rgb(134, 147, 158)",
    padding: 10,
  },
});

export default SignIn;