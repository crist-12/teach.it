import React,{ useContext, useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, StatusBar, ScrollView, ImageBackground, TouchableOpacity,Keyboard} from "react-native";
import { Text, Icon, Button,Input,Header} from "react-native-elements";
import CardForm from "../forms/CardForm";
import Alert from "../shared/Alert";
import {Context as AuthContext} from "../../providers/AuthContext";
import { Context as TeachItContext } from "../../providers/TeachItContext";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

const Discover = ({navigation}) => {
  const {state, signOut} = useContext(AuthContext);
  const {state: teachItState, getTutors, clearMessage} = useContext(TeachItContext);

  const [search,setSearch]=useState("");  
  const [error, setError] = useState(false);
  const [user, setUser] = useState(false);
  const [tutoresA,settutor]=useState(false)
  const scr="Discover"
  useEffect(() => {
    getTutors();
  }, []);

  useEffect(() => {
     
  }, [teachItState]);

  useEffect(() => {
    if (teachItState.errorMessage) {
      if (teachItState.errorMessage !== "NotTutor"){
        Toast.show({
          text2: teachItState.errorMessage,
        });
        clearMessage();
      } 
      
    }
  }, [teachItState.errorMessage]);

  useEffect(() => {
    setUser(state.user);
  }, [state.user]);
    
  return (
    <View style={styles.container}>
      
      <StatusBar barStyle="light-content" />
      
      <View style={styles.head}>
      <View style={styles.buscar}>
          <TouchableOpacity  style={styles.buscar} onPress={() =>  search?(Keyboard.dismiss(),navigation.navigate('SearchScreen', {search,scr}),setSearch("")):alert("Ingrese un tutor")}>
          <Input
            placeholder="Buscar"
            placeholderTextColor="#fff"
            value={search}
            onChangeText={setSearch}
            rightIcon={{
              type: "font-awesome",
              name: "search",
              color: "#fff",
              style: { marginRight: 12 },
              
            }}
            inputStyle={styles.input}
          />
          </TouchableOpacity>
        </View>
      </View >
      <View style={styles.titulo}>
        <Text  style={styles.txtTitulo}>Descubrir</Text>
      </View>
     
      <ScrollView style={{width:width,paddingLeft:width*0.05}}>
      {error ? <Alert title={error} type="error" /> : null}
        
        {teachItState.tutors.map((tutoria) => ( 
        <CardForm key={tutoria.id}
        clases={tutoria.categories[0]}
        tutor={tutoria.name}
        hora="15:00"
        disponible="1"
        about = {tutoria.about}
        categories = {tutoria.categories}
        universidad = {tutoria.university}
        navigation={navigation}
      /> 
        
      ))}
        
        
      </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
        alignItems: 'center',
      backgroundColor:"#fff"

    },
    buscar:{
      flexDirection:"row",
      justifyContent:"space-between",
      width:width,
      height:55,
      backgroundColor:"#232425",
      
 
  },
  head:{
    width:width,
  },
  input:{
    color:"#fff"
  },
  imageBackgroundContainer: {
    width:width,
    height:height,
    position:"absolute",
    alignItems: "center",
    resizeMode: "cover",

  },
  imageBackgroundContainer1: {
   width:width,
    alignItems: "center",
    resizeMode: "cover",

  },
  titulo:{
    width:width,
    paddingTop:5,
    paddingBottom:5,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fe5722",
    

  },
  txtTitulo:
  {
    paddingLeft:15,
    paddingRight:15,
   fontSize:25,
   color:"#fff",
   borderColor:"#fff",
   borderWidth:0,
   borderRadius:5,
  }
    
  });

export default Discover;