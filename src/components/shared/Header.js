import React from 'react'

import {View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity} from "react-native"
import {AirbnbRating, Rating} from 'react-native-elements'
import theme from '../../theme/index'
import {Ionicons, Entypo} from '@expo/vector-icons'




const Header = ({navigation})=>{
        return(
            <View style={styles.container}>
                <TouchableOpacity>
                    <Ionicons name="md-arrow-back" color="#fff" size={32}/>
                </TouchableOpacity>
                <View style={styles.divAvatar}>
                    <View style={styles.avatarCircle}>
                    </View>
                    <Text style={styles.userText}>Christopher E. Ortiz</Text>
                    <Text style={styles.collegeText}>Universidad Católica de Honduras</Text>
                </View>

                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>3.4</Text>
                        <Text style={styles.userInfoSubTitle}>Estrellas</Text>
                        <AirbnbRating
                            count={5}
                            defaultRating={3.4}
                            showRating = {false}
                            size={10}
                            readonly={true}
                        />
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>58</Text>
                        <Text style={styles.userInfoSubTitle}>Likes</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>4</Text>
                        <Text style={styles.userInfoSubTitle}>Temas</Text>
                    </View>
                </View>
               
            </View>
        )
}

const styles = StyleSheet.create({
    container:{
        height: 150,
        backgroundColor: theme.colors.primary,
        padding: 10,
    },
    divAvatar:{
        alignItems: 'center'
    },
    imgAvatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
    },
    avatarCircle:{
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: theme.colors.primaryDark,
        marginTop: 35
    },
    userText:{
        fontSize: 20,
        marginTop: 5
    },
    collegeText:{
        fontSize: 16,
        color: "#b4b4b4"
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
   
})

export default Header;