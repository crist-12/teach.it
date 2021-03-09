import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./src/components/screens/SignIn";
import SignUp from "./src/components/screens/SignUp";
import Principal from "./src/components/screens/Principal";
import Discover from "./src/components/screens/Discover";
import Profile from './src/components/screens/Profile'
import CreditCard from './src/components/screens/CreditCard'
import theme from "./src/theme";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
         
            <Stack.Screen name="CreditCard" component={CreditCard} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});