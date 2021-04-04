import {DrawerContentScrollView,DrawerItemList,Drawer, DrawerItem} from '@react-navigation/drawer';
import React, { useContext, useEffect,useState } from "react";
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

function DrawerContent(props) {
    const {state, signOut} = useContext(AuthContext);
    const [user, setUser] = useState(false);
    const [error, setError] = useState(false);

  useEffect(() => {
    setError(state.errorMessage);
  }, [state.errorMessage]);

  useEffect(() => {
    setUser(state.user);
  }, [state.user]);
  var name =user.fullname?user.fullname:"Not Defined"
    return (
        <View style={styles.one}>
            <View >
                        <View >
                            <DrawerItem
                            style={styles.it}
                            icon={({color, size}) => (
                                <Icon
                                    name="person"
                                    color="#fe5722"
                                    style={{ transform: [{ rotateY: "0deg" }] }}
                                />
                            )}
                            label={name}
                            labelStyle={{color:"#fe5722"}} 
                            onPress={()=>{props.navigation.navigate("Profile")}}
                            />
                        </View>
                    </View>
            <DrawerContentScrollView {...props}>
                   <View style={styles.two}>
                        <View >
                            <DrawerItem
                            style={styles.it}
                            label="Discover"
                            labelStyle={{color:"#fe5722"}} 
                            onPress={()=>{props.navigation.navigate("Discover")}}
                            />
                        </View>
                    </View>
                    
            </DrawerContentScrollView>

            <View style={styles.logout}>
                        <DrawerItem 
                        style={styles.it}
                        icon={({color, size}) => (
                            <Icon
                                name="logout"
                                color="#fe5722"
                                style={{ transform: [{ rotateY: "180deg" }] }}
                            />
                        )}
                        label="Cerrar Sesión"   
                        labelStyle={{color:"#fe5722"}}                     
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
        backgroundColor:"#fff"
    },

    logout: {
        marginBottom:1,
      },
});

export default DrawerContent;