import React from "react";
import { StyleSheet, View, Text } from "react-native";

const UpperText = ({ text }) => {
  return (
    <View>
      <Text style={styles.signInText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  signInText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    paddingTop: 30,
    paddingBottom: 25,
    textAlign: "center",
  },
});

export default UpperText;