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
    paddingTop: 40,
    paddingBottom: 30,
  },
});

export default UpperText;