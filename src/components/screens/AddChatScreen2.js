import React, { useLayoutEffect } from 'react'
import {useState} from 'react'
import { View, Text } from 'react-native'
import {Input, Button} from 'react-native-elements'
import {Icon} from 'react-native-vector-icons/FontAwesome'
import {db} from '../firebase'

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
    }

    return (
        <View>
            <Input
                placeholder= "Ingrese un nombre de chat"
                value = {input}
                onChangeText = {(text)=> setInput(text)}
                onSubmitEditing = {createChat}
                /> 
            <Button onPress={createChat} title="Crear"/>
        </View>
    )
}

export default AddChatScreen2
