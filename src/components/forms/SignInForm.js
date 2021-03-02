import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text, ThemeConsumer } from "react-native-elements"; //https://reactnativeelements.com/docs/customization/

const SignInForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View>
          <Input
            placeholder="Email"
            leftIcon={{
              type: "font-awesome",
              name: "envelope-o",
              color: theme.colors.primary,
              style: { marginRight: 12 },
            }}
            value={email}
            onChange={setEmail}
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
            value={password}
            onChange={setPassword}
          />
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          <Button
            title="Sign in"
          />
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
});

export default SignInForm;