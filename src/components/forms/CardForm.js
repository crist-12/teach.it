import React, { useState } from "react";
import { StyleSheet, View,Dimensions } from "react-native";
import { Input, Button, Text, ThemeConsumer } from "react-native-elements"; //https://reactnativeelements.com/docs/customization/

const { width, height } = Dimensions.get("window");

const CardForm = ({
    title,


}) => {
    
  
    return (
      <ThemeConsumer>
        {({ theme }) => (
         
         <View style={styles.card}>
           <View style={styles.cartaT}>
            <Text></Text>
           </View>
           <View style={styles.cartaB}>
             <Text>Matematicas</Text>
            <Text>Maestro: Nombre Apellido</Text>
            

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
      marginTop:10,
      height:height*0.40,
      width:width*0.90,
      backgroundColor: '#000',
      justifyContent: 'center',
      
      
    },
    cartaT:{
      
      flex:1/2,
      backgroundColor:"#4ED327",
      justifyContent:"center",
      borderColor:"#fff",
    },
    cartaB:{
      
      flex:1,
      backgroundColor:"#FFF",
      justifyContent:"center",
      borderColor:"#fff",
    },
  });
  
  export default CardForm;