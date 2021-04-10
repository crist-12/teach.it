import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView, View } from 'react-native'
import { StyleSheet } from 'react-native'
import {Text} from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import {ScrollView} from 'react-native-gesture-handler'
import CustomListItem from '../shared/CustomListItems'
import { auth, db } from '../firebase'
import AddChatScreen from '../screens/AddChatScreen'

const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([]);

    useEffect(()=>{
        const ubsuscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc =>({
                id: doc.id,
                data: doc.data()
            })))
        ))
    },[])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Signal",
            headerStyle: {
                backgroundColor: "#fff"
            },
            headerTitleStyle: {
                color: "black",
            },
            headerTintColor: "black",
            headerLeft: () => (
            <View style={{marginLeft: 20, backgroundColor: "black"}}>
                <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                <Avatar rounded source = {{ uri: auth?.currentUser?.photoUrl }}/>
                </TouchableOpacity>
            </View>
            ),
            headerRight: ()=>(
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name="camerao" size={24} color="black"/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigation.navigate("AddChat")}>
                    <SimpleLineIcons name="pencil" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            )
        })
    },[])

    const signOutUser = () =>{
        auth.signOut().then(()=>{
            navigation.replace("Login")
        })
    }


    const enterChat = (id, chatName) =>{
       navigation.navigate("Chat", {
           id,
           chatName
       })

    }


    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    chats.map(({id, data: {chatName}}) => (
                        <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})
