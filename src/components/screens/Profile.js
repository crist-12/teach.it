import React from 'react';
import Header from '../shared/Header';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar} from "react-native";
import {theme} from '../../theme/index';
import ButtonCall from '../../components/forms/ButtonCall';


const Profile = ({navigation})=>{
        return(
          <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style = {styles.headerDiv}>
                <Header>
                </Header>
                </View>
                <View style={styles.divAbout}>
                    <Text style={styles.textAbout}>Acerca de</Text>
                    <Text style={styles.contentAbout}>Irure mollit commodo duis enim enim adipisicing sit eiusmod minim est sint excepteur ex. Deserunt nostrud velit labore dolor veniam fugiat aliqua culpa. Cupidatat ullamco occaecat ad est.</Text>
              </View>
              <View>
                  <ButtonCall title="Hola" color="black" callback=""></ButtonCall>
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
    }
})

export default Profile;