import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, Icon, Input } from "react-native-elements";
import CardForm from "../forms/CardForm";
import { firebase } from "../../firebase";
import Alert from "../shared/Alert";

const { width, height } = Dimensions.get("window");

const Principal = ({ navigation, route }) => {
  const { user } = route.params;
  const [error, setError] = useState(false);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Sesion Cerrada");
        navigation.navigate("SignIn", { userCreated: false });
      })
      .catch((error) => {
        // An error happened.
        setError("Ocurrió un error al intentar cerrar sesión");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.head}>
        <TouchableOpacity onPress={signOut} style={styles.logout}>
          <Icon
            name="logout"
            color="#fff"
            style={{ transform: [{ rotateY: "180deg" }] }}
          />
        </TouchableOpacity>
        <View style={styles.buscar}>
          <Input
            placeholder="Buscar"
            placeholderTextColor="#fff"
            rightIcon={{
              type: "font-awesome",
              name: "search",
              color: "#fff",
              style: { marginRight: 12 },
            }}
          />
        </View>
      </View>
      <View style={styles.titulo}>
        <Text style={styles.txtTitulo}>{user.fullname}</Text>
        <Text style={styles.txtTitulo}>Tutorías</Text>
      </View>

      <ScrollView style={{ width: width, paddingLeft: width * 0.05 }}>
        {error ? <Alert title={error} type="error" /> : null}
        <CardForm
          clases="Musica"
          tutor="Benito Martinez"
          hora="15:00"
          tutoria="1"
          disponible="1"
        />
        <CardForm
          clases="Filosofia"
          tutor="Armando hoyos"
          hora="16:00"
          tutoria="1"
        />
        <CardForm
          clases="Programacion"
          tutor="Thomas A. Anderson"
          hora="17:00"
          tutoria="1"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buscar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
    height: 55,
    backgroundColor: "#232425",
  },
  head: {
    width: width,
    flexDirection: "row",
  },
  imageBackgroundContainer: {
    width: width,
    height: height,
    position: "absolute",
    alignItems: "center",
    resizeMode: "cover",
  },
  imageBackgroundContainer1: {
    width: width,
    alignItems: "center",
    resizeMode: "cover",
  },
  titulo: {
    width: width,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fe5722",
  },
  txtTitulo: {
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 25,
    color: "#fff",
    borderColor: "#fff",
    borderWidth: 0,
    borderRadius: 5,
  },
  logout: {
    backgroundColor: "#232425",
    paddingRight: 7,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Principal;