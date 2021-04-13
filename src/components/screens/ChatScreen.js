import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, KeyboardAvoidingView, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native'
import {Avatar} from 'react-native-elements'
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons'
import { Platform } from 'react-native'
import { StyleSheet } from 'react-native'
import { Keyboard } from 'react-native'
import * as firebase from 'firebase'
import {db, auth} from '../../firebase/index'

const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                style= {{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Avatar rounded
                    source={{
                        uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                    }}
                    />
                    <Text>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: ()=>(
                <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={navigation.goBack}>
                    <AntDesign
                    name="arrowleft"
                    size={24}
                    color="white"
                    />
                </TouchableOpacity>
            ),
            headerRight: ()=>(
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity
                    style={{marginLeft: 10}}
                    onPress={navigation.goBack}>
                        <FontAwesome
                        name="video-camera"
                        size={24}
                        color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{marginLeft: 10}}
                    onPress={navigation.goBack}>
                        <Ionicons
                        name="call"
                        size={24}
                        color="white"
                        />
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation])


    const sendMessage = ()=>{
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email
        })
        setInput('')
    }

useLayoutEffect(()=>{
    const unsubscribe = db
    .collection('chats')
    .doc(route.params.id)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => setMessages(
        snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))
    ));

    return unsubscribe;
}, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView
            behavior = {Platform.OS=="ios"?padding:"height"}
            style = {styles.container}
            keyboardVerticalOffset = {90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                <ScrollView contentContainerStyle={{paddingTop: 15}}>
                   {
                       messages.map(({id, data}) => (
                           data.email === auth.currentUser.email ? (
                               <View key={id} style={styles.receiver}>
                                   <Text style= {styles.receiverText}>{data.message}</Text>
                                   <Text style= {styles.receiverName}>{data.email}</Text>
                               </View>
                           ): (
                            <View style={styles.sender}>
                            <Text style= {styles.senderText}>{data.message}</Text>
                            <Text style= {styles.senderName}>{data.email}</Text>
                        </View>
                           )
                       ))
                   }
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput 
                    value = {input}
                    onChangeText = {(text) => setInput(text)}
                    onSubmitEditing = {sendMessage}
                    placeholder= "Enviar mensaje" 
                    style={styles.textInput}/>
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                        <Ionicons name="send" size={24} color="#2B68E6"/>
                    </TouchableOpacity>
                </View>
                </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    receiver:{
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#2868E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    receiverText : {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderName: {
        color: "black",
        fontSize: 10,
        paddingRight: 10,
        left: 10
    },
    receiverName: {
        color: "black",
        fontSize: 10,
        paddingRight: 10,
        left: 10
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
})


export default ChatScreen
