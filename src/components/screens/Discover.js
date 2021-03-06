import React from "react";
import { StyleSheet, Dimensions, View, StatusBar, ScrollView, ImageBackground} from "react-native";
import { Text, Icon, Button,Input,Header} from "react-native-elements";
import CardForm from "../forms/CardForm";


const { width, height } = Dimensions.get("window");

const Discover = ({navigation}) => {

    
  return (
    <View style={styles.container}>
      
      <StatusBar barStyle="light-content" />
      
      <View style={styles.head}>
      <View style={styles.buscar}>
      <Input
            placeholder="Buscar" placeholderTextColor="#fff" 
            rightIcon={{
              type: "font-awesome",
              name: "search",
              color: "#fff",
              style: { marginRight: 12 },
              
            }}
           
          />
      
          
            </View>
      </View >
      <View style={styles.titulo}>
        <Text  style={styles.txtTitulo}>Descubrir</Text>
      </View>
     
      <ScrollView style={{width:width,paddingLeft:width*0.05}}>
        
        <CardForm

        clases="Musica"
        tutor="Benito Martinez"
        
       
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
     
        />
        
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