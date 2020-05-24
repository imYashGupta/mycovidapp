import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
import { THEME } from '../util/THEME'

const InfoCard = (props) => {

    const {data} = props;
    const handlePress = async (url) => {
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

    const getPhoneNumber = (str) => {
        var replaced = str.split('\n').join(' ');

        return replaced.split(",");
    }

    return (
        <View style={styles.outer}>
            <View style={styles.block}>
                <View style={styles.orgName}>
                    <Text style={styles.lable}>{data.nameoftheorganisation}</Text>
                    <Text style={styles.orgCategoryText}>{data.category}</Text>
                </View>
                <View style={styles.orgDesc}>
                    <Text style={styles.DescText}>{data.descriptionandorserviceprovided}</Text>
                </View>
                <View style={styles.orgPhone}>
                    <Text style={styles.orgPhoneText}>Phone: </Text>
                    <View style={{ flexDirection: "row", flexWrap: 'wrap'}}>
                        {
                            getPhoneNumber(data.phonenumber).map((number, i) => {
                                return (
                                    <TouchableOpacity key={i} onPress={() => handlePress("tel:"+number)}>
                                        <Text style={styles.phoneNumber}>{new String(number)} {getPhoneNumber(data.phonenumber).length - 1 == i ? "" : ","} </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => handlePress(data.contact)} activeOpacity={0.5} style={styles.orgContact}  >
                        <Text style={styles.orgContactText}>Contact or visit website</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.city}>{data.city}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default InfoCard

const styles = StyleSheet.create({
    block: {
        width: "100%",
        elevation: 5,
        backgroundColor: THEME.CARD,
        borderRadius: 10,
        overflow: "hidden",
        padding: 10,
        marginBottom:10
    },
    outer: {
        borderRadius: 10,
        overflow: "hidden"
    },
    lable: {
        color: "white",
        fontSize: 18,
        fontFamily: "OpenSans-Regular"
    },
    orgName: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderBottomColor: THEME.GREEN,
        borderBottomWidth: 1
    },
    orgDesc: {
        padding: 10
    },
    DescText: {
        color: "white",
        fontFamily: "OpenSans-Medium",
        fontSize:16
    },
    orgCategoryText: {
        color: "#ccc",
        paddingBottom:10,
        fontFamily:"OpenSans-Medium"
    },
    orgPhone: {
        paddingHorizontal: 10,
        flexDirection: "row",
    },
    orgPhoneText: {
        color: THEME.GREEN,
        fontFamily: "OpenSans-Bold",

    },
    phoneNumber: {
        color: "white",
        fontFamily: "OpenSans-Regular",
        flex:1
    },
    orgContact: {
        paddingHorizontal: 10,
    },
    orgContactText: {
        color: THEME.EQUIPMENT,
        fontFamily: "OpenSans-Bold",

    },
    footer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    city:{
        color: THEME.TAG,
        fontFamily: "OpenSans-Bold",
        textTransform:"uppercase"
    }
})
