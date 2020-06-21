import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { THEME } from '../util/THEME';
import Chart from "../components/PieChart/Chart";
import Card from "../components/CardStyle";
import moment from "moment";
import {  TouchableNativeFeedback } from 'react-native-gesture-handler';
import {  TransitionPresets  } from '@react-navigation/stack';

const StatsScreen = (props) => {
    const {data} = props.route.params;

    const cases = data.cases;
    const active = data.active;
    const recovered = data.recovered;
    const deaths = data.deaths;
    const confirmedToday = data.casesToday;
    const deathToday = data.deathsToday;
    const recoverdToday = data.recoveredToday;

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const total = parseInt(active) + parseInt(recovered) + parseInt(deaths);
    const getChartData = () => {
        let activePer = parseInt(active) / parseInt(total) * 100;
        let recoveredPer = parseInt(recovered) / parseInt(total) * 100;
        let deathsPer = parseInt(deaths) / parseInt(total) * 100;
        return [
            {
                name: "Active",
                color: THEME.EQUIPMENT,
                percent: activePer.toFixed(2)
            },
            {
                name: "Recovered",
                color: THEME.GREEN,
                percent: recoveredPer.toFixed(2)
            },
            {
                name: "Deaths",
                color: THEME.DANGER,
                percent: deathsPer.toFixed(2)
            }
        ];
    }

    const getDate = () => {
        if (data.type==='state') {
            const strDateTime=data.lastupdate;
            return moment(strDateTime, 'DD/MM/YYYY HH:mm:ss', true).format("DD MMM, YYYY [on] hh:mm A");
        }
        else if(data.type==='country'){
            return moment(data.lastupdate).format("DD MMM, YYYY [on] hh:mm A");
        }
        return;
    }

    
    return (
        <View style={styles.screen}>
            <ScrollView>
                {
                    total!=0 ?
                    <View style={styles.chartContainer}>
                        <Chart data={getChartData( )}/>
                    </View> : null
                }
                <View style={styles.cards}>
                    <Card color={THEME.SUBJECT} title="Confirmed" value={cases} desc={confirmedToday} />
                    <Card color={THEME.EQUIPMENT} title="Active" value={active} desc="" />
                    <Card color={THEME.GREEN} title="Recovered" value={recovered} desc={data.type==='country' ? "" : recoverdToday} />
                    <Card color={THEME.DANGER} title="Death" value={deaths} desc={"+" + deathToday} />
                    { data.type==='country' ?
                        <Card color={THEME.CONDITION} title="Test Ratio" value={data.testsPerOneMillion} desc={"Tests per millon"} />
                        : null
                    }
                    {data.type==='country' ? 
                        <Card color={THEME.TAG} title="Death Ratio" value={data.deathsPerOneMillion} desc={" Deaths per millon"} />
                        : null
                    }
                    {
                    data.type==='state' ?
                    <View style={{backgroundColor:"transparent",width:"100%"}}>
                        <Card color={THEME.DANGER} containerStyle={{ width: "100%" }} custom={true} navigation={() => props.navigation.navigate("EssentialsScreen",{state:data.name})} >
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 22, color: THEME.CONDITION,fontFamily:"OpenSans-Medium"}}>Help & Essentials Information</Text>
                                    <Text style={{ fontSize: 14, color: "white",paddingHorizontal:20,textAlign:"center",marginTop:10,fontFamily:"OpenSans-Medium" }}>Free Food,Covid-19 Labs and Hospitals.</Text>
                            </View>
                        </Card>
                       
                    </View>
                    :null}
                </View>
                {
                data.type==='district' ? null :    
                <View style={styles.timestamp}>
                    <Text style={styles.timestampText}>
                        Last updated: {
                            getDate()
                        }
                    </Text>
                </View>
                }
            </ScrollView>
        </View>
    )
}

export default StatsScreen
const styles = StyleSheet.create({
    screen:{
        backgroundColor:THEME.DARK,
        flex:1,
    },
    chartContainer:{
        paddingHorizontal:10
    },  
    cards: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        padding:5
    },
    timestamp:{
        justifyContent:"center",
        alignItems:"center",
        marginBottom:10
    },
    timestampText:{
        color: THEME.SUBJECT,
        fontFamily:"OpenSans-Medium",
    },
    headerButton: {
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        paddingVertical: 20
    },
    headerButtonText: {
        color: "white",
        fontSize: 18,
        marginLeft: 10,
        fontFamily:"OpenSans-Medium"
    }
})

export const ScreenOptions = (props) => {
    const { data } = props.route.params;
    const title = data.name;
    return {
        headerStyle:{
            elevation:0,
            backgroundColor:THEME.DARK
        },
        headerTitle: title,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerRight: () => {
            if(data.type==='state'){
                return (
                    <View style={{ marginRight: 10 }}>
                    <TouchableNativeFeedback onPress={() => props.navigation.navigate("DistrictScreen",{state:data.name})} style={styles.headerButton} background={TouchableNativeFeedback.Ripple("#7b819d")}>
                        <Text style={styles.headerButtonText}>Districts</Text>
                    </TouchableNativeFeedback>
                </View>
            )
            }
        }
    }
}

