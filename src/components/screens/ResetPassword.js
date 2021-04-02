import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground, StatusBar } from "react-native";
import { Text } from "react-native-elements";
import Logo from "../shared/Logo";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import UpperText from "../shared/UpperText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { width, height } = Dimensions.get("screen");

const ResetPassword = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
                source={require("../../../assets/fondo.jpg")}
                style={styles.imageBackgroundContainer}
            >
                <UpperText text="Restablecer Contraseña de Teach.it" />
                <KeyboardAwareScrollView>
                <View style={styles.formContent}>
                    <Logo />
                    <ResetPasswordForm navigation={navigation}/>
                    <Text style={styles.link} onPress={()=>navigation.navigate("SignIn")}>Regresar al inicio</Text>
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
    paddingHorizontal:10
  },
  formContent: {
    backgroundColor: "#fff",
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 30,
    marginTop: height * 0.09,
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
    color: "#ff5722",
    paddingTop: 10
  }
});

export default ResetPassword;  