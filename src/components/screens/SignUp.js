import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "react-native-elements";
import SignUpForm from "../forms/SignUpForm";
import UpperText from "../shared/UpperText";
import Logo from "../shared/Logo";

const { width, height } = Dimensions.get("window");

const SignUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../../../assets/fondo.jpg")}
        style={styles.imageBackgroundContainer}
      >
        <UpperText text="Únete a Teach.it" />
        <KeyboardAwareScrollView>
          <View style={styles.formContent}>
            <Logo />
            <SignUpForm navigation={navigation} />
            <Text>
              ¿Ya tienes una cuenta?{" "}
              <Text style={styles.link} onPress={() => navigation.goBack()}>
                Inicia sesión
              </Text>
            </Text>
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
    height: height * 0.7,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: height * 0.09,
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
  }
});

export default SignUp;