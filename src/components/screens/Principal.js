import React from "react";
import { StyleSheet, Dimensions, View, StatusBar, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import CardForm from "../forms/CardForm";


const { width, height } = Dimensions.get("window");

const Principal = ({navigation}) => {

    
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <CardForm

        title="Principal"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    
  });

export default Principal;