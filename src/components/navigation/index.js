import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SplashScreen from "expo-splash-screen";
import { Context as AuthContext } from "../../providers/AuthContext";
import ResetPassword from "../screens/ResetPassword";
import Principal from "../screens/Principal";
import Discover from "../screens/Discover";
import Profile from "../screens/Profile"
import DrawerContent from "../forms/DrawerC"
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import TutorSignUp from "../screens/TutorSignUp";
import TutorUpdate from "../screens/TutorUpdate";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function drawer(){
  return(
      <Drawer.Navigator 
      drawerContent= {props => <DrawerContent {...props}/>}
      > 
        <Drawer.Screen name="Principal" component={Principal} 
        options={{
          title:'Principal', 
        }}/>
        <Drawer.Screen name="Discover" component={Discover} 
        options={{
          title:'Discover', 
        }}/>
        <Drawer.Screen name="Profile" component={Profile} 
        options={{
          title:'Profile', 
        }}/>

      </Drawer.Navigator>
  );
};

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
              <Stack.Screen name="Drawer" component={drawer} />
              <Stack.Screen name="Principal" component={Principal} />
              <Stack.Screen name="TutorSignUp" component={TutorSignUp} />
              <Stack.Screen name="TutorUpdate" component={TutorUpdate} />
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