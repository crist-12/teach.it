import React, { useContext, useEffect,useState } from "react";
import {DrawerContentScrollView,DrawerItemList,Drawer, DrawerItem} from '@react-navigation/drawer';
import { ImageBackground } from 'react-native';
import {
    StyleSheet,
    Dimensions,
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Text, Icon, Input } from "react-native-elements";
import {Context as AuthContext} from "../../providers/AuthContext";
import { Context as TeachItContext } from "../../providers/TeachItContext";
import theme from "../../theme";

function DrawerContent(props) {
    const {state, signOut} = useContext(AuthContext);
    const {state: teachItState, setCurrentTutor, clearMessage} = useContext(TeachItContext);
    const [user, setUser] = useState(false);
    const [error, setError] = useState(false);
    const [isTutor, setIsTutor] = useState(false);

  useEffect(() => {
    setError(state.errorMessage);
  }, [state.errorMessage]);

  useEffect(() => {
    setUser(state.user);
  }, [state.user]);

  useEffect(() => {
    if (teachItState.errorMessage){
        clearMessage();
    } 
    setCurrentTutor(state.user.id);
  }, []);

  useEffect(() => {
    if (teachItState.errorMessage) {
        if (teachItState.errorMessage == "NotTutor"){
            setIsTutor(false);
        }
    }
  }, [teachItState.errorMessage]);

  useEffect(() => {
    if (teachItState.currentTutor.id) {
      //Es tutor
      setIsTutor(true);
    }
  }, [teachItState.currentTutor]);

  var name =user.fullname?user.fullname:"Not Defined"

    return (
      <View style={styles.one}>
        <View>
          <View>
            <DrawerItem
              style={styles.it}
              icon={({ color, size }) => (
                <Icon
                  name="person"
                  color="#fe5722"
                  style={{ transform: [{ rotateY: "0deg" }] }}
                />
              )}
              label={name}
              labelStyle={{ color: "#fe5722" }}
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
          </View>
        </View>
        <DrawerContentScrollView {...props}>
          <View style={styles.two}>
            <View>
              <DrawerItem
                style={styles.it}
                icon={({ color, size }) => (
                  <Icon
                    name="explore"
                    color="#fe5722"
                    style={{ transform: [{ rotateY: "0deg" }] }}
                  />
                )}
                label="Descubrir"
                labelStyle={{ color: "#fe5722" }}
                onPress={() => {
                  props.navigation.navigate("Discover");
                }}
              />
            </View>
          </View>
          {isTutor ? (
            <View style={styles.two}>
              <View>
                <DrawerItem
                  style={styles.it}
                  icon={({ color, size }) => (
                    <Icon
                      name="local-library"
                      color="#fe5722"
                      style={{ transform: [{ rotateY: "0deg" }] }}
                    />
                  )}
                  label="Perfil de tutor"
                  labelStyle={{ color: "#fe5722" }}
                  onPress={() => {
                    props.navigation.navigate("TutorUpdate");
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.two}>
              <View>
                <DrawerItem
                  style={styles.it}
                  icon={({ color, size }) => (
                    <Icon
                      name="local-library"
                      color="#fe5722"
                      style={{ transform: [{ rotateY: "0deg" }] }}
                    />
                  )}
                  label="Registrarme como tutor"
                  labelStyle={{ color: "#fe5722" }}
                  onPress={() => {
                    props.navigation.navigate("TutorSignUp");
                  }}
                />
              </View>
            </View>
          )}
        </DrawerContentScrollView>

        <View style={styles.logout}>
          <DrawerItem
            style={styles.it}
            icon={({ color, size }) => (
              <Icon
                name="logout"
                color="#fe5722"
                style={{ transform: [{ rotateY: "180deg" }] }}
              />
            )}
            label="Cerrar Sesión"
            labelStyle={{ color: "#fe5722" }}
            onPress={signOut}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    one:{
        flex:1,

    },

    two:{
        flex:1,
        
    },
    it:{
        backgroundColor:"#fff",
        borderTopColor:theme.colors.borders,
        borderTopWidth:0.5,
        borderBottomColor:theme.colors.borders,
        borderBottomWidth:0.5
    },

    logout: {
        marginBottom:1,
      },
});

export default DrawerContent;