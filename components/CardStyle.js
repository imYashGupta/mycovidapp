import React from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import { THEME } from '../util/THEME'

const CardStyle = (props) => {
    

    return (
        <View style={[styles.cmp,props.containerStyle]}>
            {
            props.children!=undefined ?  
                <TouchableNativeFeedback onPress={() => props.navigation ? props.navigation() : false}>
                    <View style={[styles.block,props.style]}>
                        {props.children}
                    </View>
                </TouchableNativeFeedback>
            :
            <TouchableNativeFeedback >
                <View style={styles.block}>
                    <Text style={[styles.title,{color:props.color}]}>{props.title}</Text>
                    <Text style={styles.value}>{props.value}</Text>
                    <Text style={[styles.desc, { color: props.color }]}>{props.desc}</Text>
                </View>
            </TouchableNativeFeedback>
            }
        </View>
    )
}

export default CardStyle

const styles = StyleSheet.create({
    cmp:{
        width:"50%",
        backgroundColor:"transparent",
        height:150,
    },
    block:{
        elevation:5,
        flex:1,
        backgroundColor:THEME.CARD,
        margin: 5,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:18,
        fontFamily:"OpenSans-Medium"
    },
    value:{
        fontSize:26,
        color:"white",
        fontFamily:"OpenSans-Medium"
    },
    desc:{
        fontSize:14,
        fontFamily:"OpenSans-Medium"

    }
})
