import React from "react";
import { StyleSheet, Dimensions, View, StatusBar, ScrollView } from "react-native";
import { Text, Icon, Button,Input,Header} from "react-native-elements";
import CardForm from "../forms/CardForm";


const { width, height } = Dimensions.get("window");

const Principal = ({navigation}) => {

    
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.head}>
      <View style={styles.buscar}>
      <Input
            placeholder="Buscar"
            rightIcon={{
              type: "font-awesome",
              name: "search",
              color: "#fff",
              style: { marginRight: 12 },
            }}
           
          />
            </View>
      </View>
     
      <ScrollView>
              <CardForm

        clases="Musica"
        tutor="Benito Martinez"
        hora="15:00"
        />
        <CardForm

        clases="Filosofia"
        tutor="Armando hoyos"
        hora="16:00"
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

    },
    buscar:{
      flexDirection:"row",
      justifyContent:"space-between",
      width:width,
      height:55,
      backgroundColor:"#232425",
      marginLeft:0,
  },
  head:{
    width:width,
   
  },
    
    
  });

export default Principal;