import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, ThemeConsumer } from "react-native-elements"; //https://reactnativeelements.com/docs/customization/
import { validate } from "email-validator";
import Alert from "../shared/Alert";
import { Context as AuthContext } from "../../providers/AuthContext";

const ResetPasswordForm = ({ navigation }) => {
  const { state, resetPassword, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (state.errorMessage) clearErrorMessage();
  }, []);

  useEffect(() => {
    if (state.errorMessage) setError(state.errorMessage);
  }, [state.errorMessage]);

  useEffect(() => {
    //Si se pudo realizar el restablecimiento de la contraseña, se regresa a SignIn
    if (state.passReset) navigation.navigate("SignIn");
  }, [state.passReset]);

  const handleVerify = (input) => {
    if (input === "email") {
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    } else if (input === "reset") {
      if (!emailError && email)
      resetPassword(email);
      else setError("¡Debes ingresar tu correo!");
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
            onPress={() => handleVerify("reset")}
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