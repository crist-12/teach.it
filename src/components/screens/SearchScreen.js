import React,{ useContext, useState, useEffect } from "react";
import { StyleSheet, Dimensions, View, StatusBar, ScrollView, TouchableOpacity} from "react-native";
import { Text,} from "react-native-elements";
import SearchForm from "../forms/SearchForm";
import Alert from "../shared/Alert";
import {Context as AuthContext} from "../../providers/AuthContext";
import { Context as TeachItContext } from "../../providers/TeachItContext";
import Toast from "react-native-toast-message";
import {Ionicons} from '@expo/vector-icons'
const { width, height } = Dimensions.get("window");

const Search = ({ route ,navigation}) => {
  const {state, signOut} = useContext(AuthContext);
  const {state: teachItState, getTutors, clearMessage} = useContext(TeachItContext);
  console.log(route.params.search);
  const {search}=route.params;
  const [error, setError] = useState(false);
  const [user, setUser] = useState(false);
  const [tutoresA,settutor]=useState(false)
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
      <View style={styles.iback}>
      <TouchableOpacity onPress={()=>navigation.navigate(route.params.scr)}>
                    <Ionicons name="md-arrow-back" color="#fff" size={32}/>
       </TouchableOpacity>
      </View >
      <View style={styles.buscar}>
          <Text style={styles.buscar}>{search}</Text>
            </View>
      </View >
      <View style={styles.titulo}>
        <Text  style={styles.txtTitulo}>Busquedas</Text>
      </View>
     
      <ScrollView style={{width:width,paddingLeft:width*0.05}}>
      {error ? <Alert title={error} type="error" /> : null}
        
        {teachItState.tutors.map((tutoria) => ( 
        <SearchForm key={tutoria.id}
        tutor={tutoria.name}
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
        paddingTop:5,
       paddingLeft:width*0.12,
        width:width,
        height:55,
        backgroundColor:"#232425",
        fontSize:25,
        color:"#fff",
        borderColor:"#fff",
        borderWidth:0,
       
            
 
  },
  head:{
    width:width,
    flexDirection:"row"
  },
  iback:{
    paddingTop:10,
       paddingLeft:width*0.02,
        width:width*0.12,
        height:55,
        backgroundColor:"#232425",
        fontSize:25,
        color:"#fff",
        borderColor:"#fff",
        borderWidth:0,
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

export default Search;
