import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { Context as AuthContext } from "../../providers/AuthContext";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ResetPassword from "../screens/ResetPassword";
import Principal from "../screens/Principal";

const Stack = createStackNavigator();

const Navigation = () => {
  const { state, persistLogin } = useContext(AuthContext);

  // Verificar si ya existen credenciales de autenticación
  useEffect(() => {
    persistLogin();
  }, []);

  // Prevenir que se oculte la pantalla de splash
  SplashScreen.preventAutoHideAsync();

  // Ocultar la pantalla de splash al verificar que existe un token de inicio
  if (!state.loading) SplashScreen.hideAsync();

  return (
    <NavigationContainer>
      {!state.loading && (
        <>
          {state.loggedIn ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Principal" component={Principal} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
              />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </Stack.Navigator>
          )}
        </>
      )}
    </NavigationContainer>
  );
};

export default Navigation;