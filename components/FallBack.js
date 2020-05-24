import React from 'react';
import { View,Text,StyleSheet, Image,TouchableOpacity } from 'react-native';
import { THEME } from '../util/THEME';

export default function FallBack(props) {
  return (
    <View style={styles.screen}>
        <View style={styles.image}>
            <View style={styles.imageContainer}>
                <Image source={require("./../assets/error.png")} style={styles.errorImage} />
            </View>
        </View>
        <Text style={styles.errorHeaderText}>Ahhh! Something went wrong!</Text>
        <Text style={styles.errorDesc}>You may refresh the page or try again later.</Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={() => props.fallbackHandler()}>
            <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
     </View>
  );
}

const styles = StyleSheet.create({
    screen:{
        backgroundColor:THEME.DARK,
        flex:1,
        justifyContent:"center",
        marginTop:-90
    },
    image:{
        justifyContent:"center",
        // backgroundColor:"red",
        alignItems:"center",
        marginBottom:20
    },  
    imageContainer:{
        height:125,
        width:125,
        justifyContent:"center",
        alignItems:"center",
        margin:10
    },
    errorImage:{
        // backgroundColor:"red",
        height:"100%",
        width:"100%"
    },
    errorHeaderText:{
        color:"white",
        fontFamily:"OpenSans-Bold",
        fontSize:24,
        textAlign:"center"
    },
    errorDesc:{
        color:"white",
        textAlign:"center",
        fontSize:16,
        fontFamily:"Roboto-Regular",

    },
    refreshBtn:{
        marginTop:25
    },  
    refreshText:{
        color:THEME.GREEN,
        fontFamily:"Roboto-Regular",
        fontSize:18,
        textAlign:"center",
        padding:5
    }
})