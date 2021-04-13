import React, { useLayoutEffect } from 'react'
import {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {Input, Button} from 'react-native-elements'
import {Icon} from 'react-native-vector-icons/FontAwesome'
import {db} from '../../firebase/index'

const AddChatScreen2 = ({navigation}) => {

    const [input, setInput] = useState('')


    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Agregar chat",
            headerBackTitle: "Chats"
        });
    },[navigation]
    );

    const createChat = async () =>{
            // 2 horas 3 minutos
            await db.collection('chats').add({
                chatName: input,
            }).then(()=>{
                navigation.goBack()
            }).catch((error)=>{
                alert(error);
            })

            navigation.navigate("Home")
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder= "Ingrese un nombre de chat"
                value = {input}
                onChangeText = {(text)=> setInput(text)}
                onSubmitEditing = {createChat}
                /> 
            <Button onPress={createChat} title="Crear nuevo chat"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})



export default AddChatScreen2
