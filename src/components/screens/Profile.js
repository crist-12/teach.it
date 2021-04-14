import React, {useEffect, useLayoutEffect} from 'react';
import Header from '../shared/Header';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, Button, TouchableOpacity,Dimensions} from "react-native";
import {theme} from '../../theme/index';
import ButtonCall from '../../components/forms/ButtonCall';
import {getAbout, getCategories, getTutor, getUniversity} from '../shared/data_store'
import { Controller } from 'react-hook-form';
const { width, height } = Dimensions.get("window");

const Profile = ({navigation, clases, tutor, hora, tutoria, disponible, universidad})=>{


   
let navig = navigation;
let tutor2 = getTutor();
let college = getUniversity();
let about = getAbout();
let categories = getCategories();
let tam = categories.length;
let dummy;
let i=0;


//console.log(categories);

useEffect(()=>{    
    tutor2 = getTutor();
},[tutor])

useLayoutEffect(() => {
    tutor2 = getTutor();
}, [tutor]) 



        return(
          <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style = {styles.headerDiv}>
                <Header
                navigation = {navigation}
                nombre = {tutor2}
                universidad = {college}
                temas = {clases}
                />
                </View>
                <View style={styles.divAbout}>
                    <Text></Text>
                    <Text style={styles.textAbout}>Acerca de</Text>
                    <Text style={styles.contentAbout}>{about}</Text>
                    <Text></Text>
                    <Text style={styles.textAbout}>Categorías</Text>
                    
                    {categories.map((category) => ( 
                 <Text key={category}  style={styles.contentAbout}>- {category}</Text>
             ))}
              </View>

              <View>
                
              <TouchableOpacity  onPress={()=>navigation.navigate("CreditCard")} style={styles.button}>
                  <Text>Pagar</Text>
             </TouchableOpacity>
             <TouchableOpacity  onPress={()=>navigation.navigate("AddChatScreen2")} style={styles.button}>
                  <Text>Mensajear</Text>
             </TouchableOpacity>
               
              </View>
          </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    headerDiv:{
        flex: 3
    },
    divAbout:{
        alignItems: 'center',
        flex: 2,
        padding: 10
    },
    textAbout:{
        fontWeight: 'bold',
        fontSize: 16
    },
    contentAbout:{
        fontSize: 14
    },
    button: {
        backgroundColor: "#fe5722",
        padding: 10,
        borderRadius: 5,
        width: width * 0.4,
      },

})

export default Profile;