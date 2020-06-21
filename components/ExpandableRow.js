import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { THEME } from '../util/THEME'
import { TouchableNativeFeedback,TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';


const ExpandableRow = (props) => {
    const Cmp = props.clickable ? TouchableNativeFeedback : TouchableWithoutFeedback;
    return (
            <View style={styles.screen}>
                <Cmp onPress={() => props.navigate()}>
                    <View style={styles.inner}>
                        <Text style={styles.stateName}>{props.name}</Text>
                        <View style={styles.row}>
                            <View style={styles.col}>
                                <Text style={styles.actual}>{props.confirmed}</Text>
                                <Text style={[styles.today,{color:THEME.SUBJECT}]}>
                                    {props.todayConfirmed!=='0' && <AntDesign name="arrowup" size={14}  />}
                                    {props.todayConfirmed}
                                </Text>
                            </View>
                            <View style={styles.col}>
                                <Text style={styles.actual}>{props.recovered}</Text>
                                <Text style={[styles.today,{color:THEME.GREEN}]}>
                                    {props.todayRecovered!=='0' && <AntDesign name="arrowup" size={14}  />}
                                    {props.todayRecovered}
                                </Text>
                            </View>
                            <View style={styles.col}>
                                <Text style={[styles.actual,{minWidth:30}]}>{props.deaths}</Text>
                                <Text style={[styles.today,{color:THEME.DANGER}]}>
                                    {props.todayDeaths!=='0' && <AntDesign name="arrowup" size={14}  />}
                                    {props.todayDeaths}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Cmp>
            </View>
    )
}

export default ExpandableRow

const styles = StyleSheet.create({
    screen:{
        height:85,
        overflow:"hidden",
        backgroundColor:THEME.CARD,
        borderRadius:5,
        elevation:5,
        marginBottom:5
    },
    inner:{
        height:85,
        backgroundColor:THEME.CARD,
        borderRadius:5,
        padding:10,
        overflow:"hidden"
    },
    stateName:{
        color:"white",
        fontFamily:"OpenSans-Medium",
        fontSize:16,
    },
    row:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:5
    },
    col:{
        justifyContent:"center"
    },
    actual:{
        fontFamily:"OpenSans-Medium",
        color:"white",
        fontSize:18,
        textAlign:"center",
    },
    today:{
        fontFamily:"OpenSans-Medium",
        fontSize:16,
        textAlign:"center"

    }
})
