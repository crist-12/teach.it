import React, { useState } from "react";
import { StyleSheet, View,Dimensions,ImageBackground,TouchableOpacity } from "react-native";
import { Input, Button, Text, ThemeConsumer } from "react-native-elements"; //https://reactnativeelements.com/docs/customization/

const { width, height } = Dimensions.get("window");

const CardForm = ({
    clases,
    tutor,
    hora,
    tutoria,
    disponible,
    navigation
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
             <Text style={styles.tinfo}>Tutor: {tutor}</Text>
             {hora?<Text style={styles.tinfo}>Hora: {hora}</Text>:null}
            

            {
              disponible==1?
              <View style={{flexDirection:"row", alignContent:"center"}}>
            <View style={styles.circleg} />
            <Text style={styles.tdisp}> Disponible</Text>
            </View>
              :
              <View style={{flexDirection:"row", alignContent:"center"}}>
            <View style={styles.circler} />
            <Text style={styles.tdisp}> No Disponible</Text>
            </View>
            }
            
            
           </View>
           {

             tutoria==1?
             <View style={styles.Vbtn} >
             <TouchableOpacity  style={styles.button}>
                  <Text style={styles.buttonText}>Ir Tutoria</Text>
             </TouchableOpacity>
             <TouchableOpacity   onPress={()=>{navigation.navigate("Profile")}} style={styles.button}>
                  <Text style={styles.buttonText}>Perfil</Text>
             </TouchableOpacity>
            </View>
             :
             <View style={styles.Vbtn} >
             <TouchableOpacity  onPress={()=>{navigation.navigate("Profile")}}  style={styles.button}>
                  <Text style={styles.buttonText}>Perfil</Text>
             </TouchableOpacity>
            </View>
           }
           
            
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
      height:355,
      width:width*0.90,
      backgroundColor: '#FFf',
      borderWidth:0.8,
      justifyContent: 'flex-end',
      borderTopRightRadius:15,
      borderTopLeftRadius:15,
      borderBottomRightRadius:15,
      borderBottomLeftRadius:15,
      
      
    },
    cartaT:{
      
      flex:1/2,
      backgroundColor:"#4ED327",
      borderColor:"#fff",
      borderTopRightRadius:14,
      borderTopLeftRadius:14,
      overflow:"hidden",
      
    },
    cartaB:{
      
      flex:1/3,
      backgroundColor:"#484848",
      justifyContent:"center",
      borderColor:"#fff",
      borderBottomRightRadius:15,
      borderBottomLeftRadius:15,
      
    },
    imageBackgroundContainer: {
      flex: 1,
      alignItems: "center",
      resizeMode: "cover",

    },
    tclases:{
      alignSelf:"flex-start",
      top:"70%",
      color:"#fff",
      fontSize:30,
      marginLeft:"5%"
    },
    tinfo:{
      color:"#fff",
      fontSize:20,
      marginLeft:"5%",
    },
    tdisp:{
      color:"#fff",
      fontSize:20,
     
   
    },
    Vbtn:{
      flex: 1/6,
      flexDirection:"row",
      justifyContent:"space-evenly",
      alignItems:"center",
      backgroundColor:"#FFF",
      borderBottomRightRadius:15,
      borderBottomLeftRadius:15,
     
   
    },
    button: {
      backgroundColor: "#fe5722",
      padding: 10,
      borderRadius: 5,
      width: width * 0.4,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 15,
      fontWeight: "bold",
      textAlign: "center",
    },
      circleg: {
        marginTop:5,
        marginLeft:"5%",
        width: 15,
        height: 15,
        borderRadius: 100 / 2,
        backgroundColor: "green",
 
    },
    circler: {
      marginTop:5,
      marginLeft:"5%",
      width: 15,
      height: 15,
      borderRadius: 100 / 2,
      backgroundColor: "red",

  },
  });
  
  export default CardForm;