import React,{ useContext, useEffect } from "react";
import { StyleSheet, Dimensions, View, ImageBackground, StatusBar,ScrollView, SafeAreaView, Image } from "react-native";
import { Context as TeachItContext } from "../../providers/TeachItContext";
import ModifyTutorForm from "../forms/ModifyTutorForm";
import Toast from "react-native-toast-message";
import { Text } from "react-native-elements";
import theme from "../../theme";

const { width, height } = Dimensions.get("screen");

const TutorUpdate = ({ navigation }) => {
  const { state: teachItState, clearMessage } = useContext(TeachItContext);

  useEffect(() => {
    if (teachItState.errorMessage){
      clearMessage();
    }
  }, []);

  useEffect(() => {
    if (teachItState.errorMessage) {
      Toast.show({
        text2: teachItState.errorMessage,
      });
      clearMessage();
    }
  }, [teachItState.errorMessage]);

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
          <Text style={styles.tutorText}>Actualiza tus datos</Text>
          <Toast ref={(ref) => Toast.setRef(ref)} />
            <ModifyTutorForm navigation={navigation} />
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
    width: width * 0.5,
    alignSelf:"center",
    resizeMode: 'contain',
  },
  tutorText: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.colors.primary,
    // paddingBottom: 25,
    textAlign: "center",
  },
});

export default TutorUpdate;