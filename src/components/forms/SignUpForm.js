import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button, ThemeConsumer } from "react-native-elements";
// import {firebase} from "../../firebase";

const SignUpForm = ({ navigation }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // firebase.auth().createUserWhitEmailAndPassword(email, password).then((response) =>{console.log(response);}).catch((error)=>console.log(error););
  };

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View>
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
            onChange={setFullname}
          />
          <Input
            placeholder="Email"
            leftIcon={{
              type: "font-awesome",
              name: "envelope-o",
              color: theme.colors.primary,
              style: { marginRight: 10 },
            }}
            style={{ marginRight: 40 }}
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
              style: { marginRight: 10 },
            }}
            style={{ marginRight: 10 }}
            value={password}
            onChange={setPassword}
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
            style={{ marginRight: 10 }}
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
          <Button
            title="Crear cuenta"
            buttonStyle={{ backgroundColor: theme.colors.primary }}
          />
        </View>
      )}
    </ThemeConsumer>
  );
};

export default SignUpForm;
