import React from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";

const { width, height } = Dimensions.get("window");

const Logo = () => {
  return (
    <View>
      <Image
        style={styles.upperLogo}
        source={require("../../../assets/logo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  upperLogo: {
    position:"absolute",
    width: width * 0.3,
    height: width * 0.3,
    alignSelf:"center",
    top: -height * 0.16,
  },
});

export default Logo;