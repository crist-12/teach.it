import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text } from "react-native-elements"; //https://reactnativeelements.com/docs/customization/
import { Context as AuthContext } from "../../providers/AuthContext";
import { validate } from "email-validator";
import theme from "../../theme";
import Alert from "../shared/Alert";

const SignInForm = ({navigation}) => {
  //Implementacion del Context para funcionalidades de autenticacion
  const { state, signIn, clearErrorMessage } = useContext(AuthContext);

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

  useEffect(() => {
    if (state.errorMessage) clearErrorMessage();
    cleanValues();
  }, []);

  useEffect(() => {
    if (state.errorMessage) setError(state.errorMessage);
  }, [state.errorMessage]);
  
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
    //Iniciar sesion implementando el Contexto de autenticacion
    signIn(email,password);
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    fontWeight: "bold",
    textAlign:"right",
    color: theme.colors.primary,
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