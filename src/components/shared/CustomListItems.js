import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {ListItem, Avatar} from 'react-native-elements'
import {db, auth} from '../../firebase/index'



const CustomListItem = ({id, chatName, enterChat}) => {


    const [chatMessages, setChatMessages] = useState([]);

    useEffect(()=>{
        const unsubscribe =  db
        .collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot)=>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
        )

        return unsubscribe;
    });

    return (
        <ListItem key={id} onPress={()=> enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
            rounded
            source={{
                uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:  "800"}}>
                   {chatName}
                </ListItem.Title>
                <ListItem.Subtitle 
                numberOfLines={1}
                ellipsizeMode = "tail"
                >
            {chatMessages?.[0]?.email}:{chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem;


//    