import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground, StatusBar, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import Logo from "../shared/Logo";
import SignInForm from "../forms/SignInForm";

const { width, height } = Dimensions.get("window");

const SignIn = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../../../assets/fondo.jpg")}
        style={styles.imageBackgroundContainer}
      >
        <Text style={styles.SignInText}>Iniciar sesión en Teach.it</Text>
        <View style={styles.formContent}>
          <Logo />
          <SignInForm />
          <Text>¿Nuevo en Teach.it? <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.link}>Crea un cuenta.</TouchableOpacity></Text>
        </View>
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
  SignInText: {
    fontSize: 25,
    fontWeight:"bold",
    color: "#fff",
    paddingTop: 40,
    paddingBottom: height * 0.15,
  },
  formContent: {
    backgroundColor: "#fff",
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 15,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    justifyContent: "center"
  },
  link: {
    color: "#ff5722",
    paddingTop: 10
  }
});

export default SignIn;