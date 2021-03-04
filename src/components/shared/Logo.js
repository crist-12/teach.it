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
        width: width * 0.3,
        height: width * 0.3,
        marginTop: -height*0.2,
        alignSelf:"center",
      },
});

export default Logo;