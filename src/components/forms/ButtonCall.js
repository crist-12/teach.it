import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import theme from '../../theme/index'

const ButtonCall = ({
    title,
    callback,
    color
}) => {
    return(
        <View>
             <Button style={styles.buttonStyle} title={title} onPress={()=>callback}>

             </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor: theme.colors.secondary
    }
})


export default ButtonCall;