import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text, ThemeConsumer } from "react-native-elements";

const Alert = ({ type, title }) => {
  let icon = "";

  if (type === "error") {
    icon = "highlight-remove";
  } else if (type === "warning") {
    icon = "error-outline";
  } else if (type === "info") {
    icon = "info-outline";
  } else if (type === "success") {
    icon = "check-circle-outline";
  }

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors[type + "Background"] },
          ]}
        >
          <Icon
            name={icon}
            type="material"
            color={theme.colors[type]}
            iconStyle={styles.icon}
          />
          <Text style={{ color: theme.colors[type], fontWeight: "bold" }}>
            {title}
          </Text>
        </View>
      )}
    </ThemeConsumer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default Alert;