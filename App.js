import React, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./src/components/screens/SignIn";
import SignUp from "./src/components/screens/SignUp";
import Principal from "./src/components/screens/Principal";
import CreditCard from './src/components/screens/CreditCard';
import theme from "./src/theme";
import ResetPassword from "./src/components/screens/ResetPassword";
import persistLogin from "./src/firebase/persistLogin";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});

  // Verificar si ya existen credenciales de autenticación
  useEffect(() => {
    const userData = persistLogin();
    setUser(userData);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignIn" component={SignIn} initialParams={{ userCreated:false, passwordReset: false }}/>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Principal" component={Principal} initialParams={{ user:false }}/>
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