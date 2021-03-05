import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button, ThemeConsumer } from "react-native-elements";
import { validate } from "email-validator";
import { firebase } from "../../firebase";
import Alert from "../shared/Alert";

const SignUpForm = ({ navigation }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullnameError, setFullnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [error,setError] = useState(false);

  //Verificar si se ingresan todos los datos solicitados y si son válidos
  const handleVerify = (input) => {
    if (input === "fullname") {
      //verificar el nombre del usuario
      if (!fullname) setFullnameError(true);
      else setFullnameError(false);
    } else if (input === "email") {
      //verificar el correo
      if (!email) setEmailError(true); //email-validator
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    } else if (input === "password") {
      //verificar la contraseña
      if (!password) setPasswordError(true);
      else if (password.length < 6) setPasswordError(true);
      else setPasswordError(false);
    } else if (input === "confirmPassword") {
      //verificar la confirmacion de contraseña
      if (!confirmPassword) setConfirmPasswordError(true);
      else if (confirmPassword !== password) setConfirmPasswordError(true);
      else setConfirmPasswordError(false);
    }
  };
  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        //Obtener el Unique Identifier generado para cada usuario
        const uid = response.user.uid;

        //Construir el objeto a enviar a la coleccion de "users"
        const data = {
          id: uid,
          email,
          fullname
        };

        //Obtener la coleccion desde Firebase
        const usersRef = firebase.firestore().collection("users");

        //Almacenar la informacion del usuario que se registra en Firestore
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("SignIn", { userCreated: true });
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => setError(error.message));
  };

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View>
          {error ? <Alert type="error" title={error} /> : null}
          <Input
            placeholder="Nombre completo"
            leftIcon={{
              type: "font-awesome",
              name: "user-o",
              color: theme.colors.primary,
              marginRight: 40,
              style: { marginRight: 10 },
            }}
            value={fullname}
            onChangeText={setFullname}
            onBlur={()=>{handleVerify("fullname")}}
            errorMessage={fullnameError ? "Debes ingresar tu nombre completo" : null}
          />
          <Input
            placeholder="Email"
            leftIcon={{
              type: "font-awesome",
              name: "envelope-o",
              color: theme.colors.primary,
              style: { marginRight: 10 },
            }}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            onBlur={()=>{handleVerify("email")}}
            errorMessage={emailError ? "Debes ingresar un correo válido" : null}
          />
          <Input
            placeholder="Contraseña"
            leftIcon={{
              type: "material-community",
              name: "form-textbox-password",
              color: theme.colors.primary,
              size: 29,
              style: { marginRight: 10 },
            }}
            rightIcon={{
              type: "font-awesome",
              name: showPassword ? "eye-slash" : "eye",
              color: theme.colors.primary,
              onPress: () => setShowPassword(!showPassword) 
            }}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            onBlur={()=>{handleVerify("password")}}
            errorMessage={passwordError ? "La contraseña debe tener al menos 6 caracteres" : null}
          />
          <Input
            placeholder="Confirmar contraseña"
            leftIcon={{
              type: "material-community",
              name: "form-textbox-password",
              color: theme.colors.primary,
              size: 29,
              style: { marginRight: 10 },
            }}
            rightIcon={{
              type: "font-awesome",
              name: showConfirm ? "eye-slash" : "eye",
              color: theme.colors.primary,
              onPress: () => setShowConfirm(!showConfirm) 
            }}
            secureTextEntry={!showConfirm}
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onBlur={()=>{handleVerify("confirmPassword")}}
            errorMessage={confirmPasswordError ? "Debes ingresa la contraseña y verificar que es correcta" : null}
          />
          <Button
            title="Crear cuenta"
            buttonStyle={{ backgroundColor: theme.colors.primary }}
            onPress={handleSignUp}
          />
        </View>
      )}
    </ThemeConsumer>
  );
};

export default SignUpForm;