import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking,ScrollView } from 'react-native'
import CardStyle from '../components/CardStyle'
import { THEME } from '../util/THEME'
import Entypo from 'react-native-vector-icons/Entypo';

const openLink = async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url); 
    } else {
        Alert.alert(`Sorry, we are unable to open this url. ${url}`);
    }
};
const AboutScreen = () => {
    return (
        <View style={styles.screen}>
            <CardStyle containerStyle={styles.card} navigation={() => openLink("http://yashgupta.work")}>
                <View style={styles.imageConatiner}>
                    <Image source={require("../assets/Yash-min.png")} style={styles.img} />
                </View>
                <Text style={styles.name}>Yash Gupta</Text>
                <Text style={styles.desc}>Web Developer</Text>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.icon} activeOpacity={0.5} onPress={() => openLink('https://twitter.com/itsyashgupta')}>
                        <View style={styles.icon}>
                                <Entypo name="twitter-with-circle" size={32} color="white" />
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} activeOpacity={0.5} onPress={() => openLink('https://www.facebook.com/ImYashGupta')}>
                        <View style={styles.icon}>
                            <Entypo name="facebook-with-circle" size={32} color="white" />
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.icon} activeOpacity={0.5}>
                        <View style={styles.icon}>
                            <FontAwesome5 name="github" size={32} color="white" />
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.icon} activeOpacity={0.5} onPress={() => openLink('mailto:hello@yashgupta.work')}>
                        <View style={styles.icon}>
                            <Entypo name="mail-with-circle" size={32} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </CardStyle>
            <ScrollView>
            <View style={styles.textContainer}>
                <Text style={styles.text}>India specific data and stats Provided by <Text style={styles.textBold}>covid19india.org</Text>.</Text>
                <Text style={styles.text}>World stats Provided by <Text style={styles.textBold}>corona.lmao.ninja</Text>.</Text>
                <View style={{flexDirection:"row",flexWrap:"wrap"}}>
                    <Text style={styles.text}>Data listed here are from bulletins, official (CM, Health M) handles, PBI, Press Trust of India, ANI reports.  for More details 
                    
                    </Text>
                    <TouchableOpacity onPress={() => openLink("https://www.covid19india.org/about")}>
                    <Text style={styles.textBold}>Click here.</Text>
                </TouchableOpacity>
                </View>
                <Text style={styles.text}>Share the app with your friends and family. i might be adding more stats and featurs.</Text>
                <Text style={styles.text}>Be Safe!</Text>
            </View>
            </ScrollView>
        </View>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    screen:{
        backgroundColor:THEME.DARK,
        flex:1
    },
    card:{
        width:"100%",
        minHeight:300
    },
    imageConatiner:{
        height:125,
        width:125,
        backgroundColor:THEME.GREEN,
        borderRadius:125,
        elevation:10
    },
    img:{
        height:125,
        width:125,
        borderRadius: 125,
        borderWidth: 4,
        borderColor: "white",
    },
    name:{
        color:"white",
        fontFamily:"OpenSans-Bold",
        fontSize:20,
        marginTop:10
    },
    desc:{
        color:THEME.GREEN,
        fontFamily:"OpenSans-Medium",

    },
    iconsContainer:{
        flexDirection:"row",
    },
    icon:{
        padding:4
    },
    iconStyle: {
        height: 35,
        width: 35,
        backgroundColor: "transparent",
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer:{
        padding:10
    },
    text:{
        color:"white",
        fontFamily:"OpenSans-Medium",
        fontSize:16,
        marginVertical:2,
    },
    textBold:{
        fontFamily:"OpenSans-Bold",
        color:THEME.TAG,
        fontSize:16
      
    }

})

export const ScreenOptions = (props) => {
    return{
        headerTitle:"About",
        headerStyle: {
            elevation: 0,
            backgroundColor: THEME.DARK
        },
    }
}