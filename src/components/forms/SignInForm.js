import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text, ThemeConsumer } from "react-native-elements"; //https://reactnativeelements.com/docs/customization/
import { validate } from "email-validator";
import { firebase } from "../../firebase";
import Alert from "../shared/Alert";

const SignInForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const cleanValues = () => {
    //Limpiar valores
    setEmail("");
    setPassword("");
    setError(false);
  };
  
            
  //Verificar si se ingresan los datos de email y password
  const handleVerify = (input) => {
    if (input === "email") {
      //verificar el correo
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    } else if (input === "password") {
      //verificar la contraseña
      if (!password) setPasswordError(true);
      else if (password.length < 6) setPasswordError(true);
      else setPasswordError(false);
    }
  };

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        // Obtener el Unique Identifier generado para cada usuario
        // Firebase -> Authentication
        const uid = response.user.uid;

        // Obtener la colección desde Firebase
        const usersRef = firebase.firestore().collection("users");

        // Verificar que el usuario existe en Firebase authentication
        // y también está almacenado en la colección de usuarios.
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              setError("¡El usuario no existe en la base de datos!");
              return;
            }
            cleanValues();  
            // Obtener la información del usuario y enviarla a la pantalla Home
            const user = firestoreDocument.data();
            navigation.navigate("Principal", { user });
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View>
          {error ? <Alert title={error} type="error" /> : null}
          <Input
            placeholder="Email"
            leftIcon={{
              type: "font-awesome",
              name: "envelope-o",
              color: theme.colors.primary,
              style: { marginRight: 12 },
            }}
            value={email}
            onChangeText={setEmail}
            onBlur={() => {
              handleVerify("email");
            }}
            autoCapitalize="none"
            errorMessage={
              emailError
                ? "Debes ingresar tu cuenta de correo electrónico"
                : null
            }
          />
          <Input
            placeholder="Contraseña"
            leftIcon={{
              type: "material-community",
              name: "form-textbox-password",
              color: theme.colors.primary,
              size: 29,
              style: { marginRight: 4 },
            }}
            rightIcon={{
              type: "font-awesome",
              name: showPassword ? "eye-slash" : "eye",
              color: theme.colors.primary,
              onPress: () => setShowPassword(!showPassword),
            }}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            onBlur={() => {
              handleVerify("password");
            }}
            errorMessage={passwordError ? "Debes ingresar tu contraseña" : null}
          />
          <Text style={styles.forgotPassword} onPress={()=>navigation.navigate("ResetPassword")}>¿Olvidaste tu contraseña?</Text>
          <Button title="Iniciar sesión" titleStyle={styles.buttonTitle} onPress={handleSignIn} buttonStyle={styles.buttons}/>
        </View>
      )}
    </ThemeConsumer>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    fontWeight: "bold",
    textAlign:"right",
    color: "#ff5722",
    paddingBottom: 30
  },
  buttons: {
    borderRadius: 50,
    marginBottom: 10,
    padding: 14,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: "bold"
  }
});

export default SignInForm;