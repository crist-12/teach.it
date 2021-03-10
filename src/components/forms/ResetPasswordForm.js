import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, ThemeConsumer } from "react-native-elements"; //https://reactnativeelements.com/docs/customization/
import { validate } from "email-validator";
import { firebase } from "../../firebase";
import Alert from "../shared/Alert";

const ResetPasswordForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState(false);

  const handleVerify = (input) => {
    if (input === "email") {
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    }
  };

  const hadleResetPassword = () => {
    if (validate(email)) {
      var auth = firebase.auth();
      auth
        .sendPasswordResetEmail(email)
        .then(function () {
          console.log("Correo enviado");
          setError(false);
          navigation.navigate("SignIn", { passwordReset: true });
        })
        .catch(function (error) {
          if (error.code == "auth/user-not-found") {
            setError("No existe ningún usuario registrado con este correo.");
          } else {
            setError(
              "Hubo un error al intentar mandar el correo. Por favor intenta de nuevo."
            );
          }
          console.log(error);
        });
    } else {
      setEmailError("¡Ingresa una dirección de correo válida!");
    }
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
          <Button
            title="Restablecer Contraseña"
            titleStyle={styles.buttonTitle}
            onPress={hadleResetPassword}
            buttonStyle={styles.buttons}
          />
        </View>
      )}
    </ThemeConsumer>
  );
};

const styles = StyleSheet.create({
  buttons: {
    borderRadius:50,
    marginBottom:10,
    padding: 14,
    marginVertical: 15
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: "bold"
  }
});

export default ResetPasswordForm;