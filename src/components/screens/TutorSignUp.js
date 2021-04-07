import React from "react";
import { StyleSheet, Dimensions, View, ImageBackground, StatusBar,ScrollView, SafeAreaView, Image } from "react-native";
import { Text } from "react-native-elements";
import TutorSignUpForm from "../forms/TutorSignUpForm";
import theme from "../../theme";

const { width, height } = Dimensions.get("screen");

const TutorSignUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../../../assets/fondo.jpg")}
        style={styles.imageBackgroundContainer}
      >
        <SafeAreaView style={styles.formContent}>
          <ScrollView >
          <Image
            style={styles.upperLogo}
            source={require("../../../assets/teachIt_logo_crop.png")}
          />
          <Text style={styles.tutorText}>Regístrate como Tutor</Text>
            <TutorSignUpForm navigation={navigation} />
            <Text style={styles.link} onPress={()=>navigation.navigate("Principal")}>Regresar</Text>
          </ScrollView>
          </SafeAreaView>
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
    height: height * 0.9,
    borderRadius: 15,
    paddingHorizontal: 10,
    margin: height * 0.01,
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
    color: theme.colors.primary,   
    paddingLeft: 10 ,
    marginBottom: 10 
  },
  upperLogo: {
    width: width * 0.7,
    alignSelf:"center",
    resizeMode: 'contain'
  },
  tutorText: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.colors.primary,
    paddingBottom: 25,
    textAlign: "center",
  },
});

export default TutorSignUp;