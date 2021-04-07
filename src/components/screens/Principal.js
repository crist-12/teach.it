import React, { useContext, useState, useEffect } from "react";
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
import Alert from "../shared/Alert";
import {Context as AuthContext} from "../../providers/AuthContext";
import { Context as TeachItContext } from "../../providers/TeachItContext";
import Toast from "react-native-toast-message";
const { width, height } = Dimensions.get("window");

const Principal = ({navigation}) => {
  const {state, signOut} = useContext(AuthContext);
  const {state: teachItState, getTutors, clearMessage} = useContext(TeachItContext);

  const [error, setError] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    getTutors();
  }, []);

  useEffect(() => {
    console.log(teachItState);
  }, [teachItState]);

  useEffect(() => {
    if (teachItState.errorMessage) {
      Toast.show({
        text2: teachItState.errorMessage,
      });
      clearMessage();
    }
  }, [teachItState.errorMessage]);

  useEffect(() => {
    setUser(state.user);
  }, [state.user]);
  

  return (
    <View style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <StatusBar barStyle="light-content" />
      <View style={styles.head}>
      
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
        <Text style={styles.txtTitulo}>Mis Tutorías</Text>
      </View>

      <ScrollView style={{ width: width, paddingLeft: width * 0.05 }}>
        {error ? <Alert title={error} type="error" /> : null}
        
        <CardForm
          clases="Musica"
          tutor="Benito Martinez"
          hora="15:00"
          tutoria="1"
          disponible="1"
          navigation={navigation}
        />
        <CardForm
          clases="Filosofia"
          tutor="Armando hoyos"
          hora="16:00"
          tutoria="1"
          navigation={navigation}
        />
        <CardForm
          clases="Programacion"
          tutor="Thomas A. Anderson"
          hora="17:00"
          tutoria="1"
          navigation={navigation}
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