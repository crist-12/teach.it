import React, { useState } from "react";
import { StyleSheet, View,Dimensions,ImageBackground } from "react-native";
import { Input, Button, Text, ThemeConsumer } from "react-native-elements"; //https://reactnativeelements.com/docs/customization/

const { width, height } = Dimensions.get("window");

const CardForm = ({
    clases,
    tutor,
    hora,

}) => {
    
  
    return (
      <ThemeConsumer>
        {({ theme }) => (
         
         <View style={styles.card}>
           <View style={styles.cartaT}>
           <ImageBackground
            source={require("../../../assets/fondo.jpg")}
            style={styles.imageBackgroundContainer}
            >
              <Text style={styles.tclases}>{clases}</Text>
            </ImageBackground>
           </View>
           <View style={styles.cartaB}>
             <Text style={styles.tinfo}>{tutor}</Text>
            <Text style={styles.tinfo}>{hora}</Text>
            

           </View>
            
        </View>
        )}
      </ThemeConsumer>
    );
  };
  
  const styles = StyleSheet.create({
    card: {
      fontWeight: "bold",
      textAlign:"right",
      color: "#ffff",
      marginTop:20,
      marginBottom:15,
      height:height*0.40,
      width:width*0.90,
      backgroundColor: '#000',
      justifyContent: 'flex-end',
      borderTopRightRadius:15,
      borderTopLeftRadius:15,

      
    },
    cartaT:{
      
      flex:1/2,
      backgroundColor:"#4ED327",
      borderColor:"#fff",
      borderTopRightRadius:15,
      borderTopLeftRadius:15,
      overflow:"hidden",
    },
    cartaB:{
      
      flex:1/2,
      backgroundColor:"#484848",
      justifyContent:"center",
      borderColor:"#fff",
    },
    imageBackgroundContainer: {
      flex: 1,
      alignItems: "center",
      resizeMode: "cover",
      

      
    },
    tclases:{
      alignSelf:"flex-start",
      top:"75%",
      color:"#fff",
      fontSize:30,
      marginLeft:"5%"
    },
    tinfo:{
      color:"#fff",
      fontSize:20,
      marginLeft:"5%",
    }
  });
  
  export default CardForm;