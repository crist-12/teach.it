import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Text, ThemeConsumer } from "react-native-elements"; //https://reactnativeelements.com/docs/customization/


const CardForm = ({
    title,


}) => {
    
  
    return (
      <ThemeConsumer>
        {({ theme }) => (
         
         <View style={styles.test}>
             <Text>{title}</Text>
        </View>
        )}
      </ThemeConsumer>
    );
  };
  
  const styles = StyleSheet.create({
    test: {
      fontWeight: "bold",
      textAlign:"right",
      color: "#ffff",
      paddingBottom: 30
    },
  });
  
  export default CardForm;