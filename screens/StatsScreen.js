import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { THEME } from '../util/THEME';
import Chart from "../components/PieChart/Chart";
import Card from "../components/CardStyle";
import moment from "moment";

const StatsScreen = (props) => {
    const {data,world} = props.route.params;

    const cases = world ? data.cases : data.confirmed;
    const active = data.active;
    const recovered = data.recovered;
    const deaths = data.deaths;
    const confirmedToday = world ? data.todayCases : data.deltaconfirmed;
    const deathToday = world ? data.todayDeaths : data.deltadeaths;
    const recoverdToday = world ? "" : data.deltarecovered;

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getChartData = () => {
        const total = parseInt(active) + parseInt(recovered) + parseInt(deaths);
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

    const getDate = (timestamp) => {
        if (world===false) {
            const strDateTime=data.lastupdatedtime;
            // let strDate=strDateTime.substr(0, 10);
            // let strTime = strDateTime.substr(11, 18);
            return moment(strDateTime, 'DD/MM/YYYY HH:mm:ss', true).format("DD MMM, YYYY [on] hh:mm A");

        }
        return moment(data.updated).format("DD MMM, YYYY [on] hh:mm A");
    }
    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.chartContainer}>
                    <Chart data={getChartData( )}/>
                </View>
                <View style={styles.cards}>
                    <Card color={THEME.SUBJECT} title="Confirmed" value={numberWithCommas(cases)} desc={"+" + confirmedToday} />
                    <Card color={THEME.EQUIPMENT} title="Active" value={numberWithCommas(active)} desc="" />
                    <Card color={THEME.GREEN} title="Recovered" value={numberWithCommas(recovered)} desc={world ? "" : "+" + recoverdToday} />
                    <Card color={THEME.DANGER} title="Death" value={numberWithCommas(deaths)} desc={"+" + deathToday} />
                    { !world ? null :
                        <Card color={THEME.CONDITION} title="Test Ratio" value={numberWithCommas(data.testsPerOneMillion)} desc={" Tests per millon"} />
                    }
                    {!world ? null :
                        <Card color={THEME.TAG} title="Death Ratio" value={numberWithCommas(data.deathsPerOneMillion)} desc={" Deaths per millon"} />
                    }
                    {
                        world ? null :
                            <Card color={THEME.DANGER} containerStyle={{ width: "100%" }} custom={true} navigation={() => props.navigation.navigate("EssentialsScreen",{state:data.state})} >
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 22, color: THEME.CONDITION,fontFamily:"OpenSans-Medium"}}>Help & Essentials Information</Text>
                                <Text style={{ fontSize: 14, color: "white",paddingHorizontal:20,textAlign:"center",marginTop:10,fontFamily:"OpenSans-Medium" }}>Free Food,Covid-19 Labs and Hospitals.</Text>
                        </View>
                    </Card>
                    }
                </View>
                <View style={styles.timestamp}>
                    <Text style={styles.timestampText}>
                        Last updated: {
                            getDate()
                            
                        }
                    </Text>
                </View>
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
    }
})

export const ScreenOptions = (props) => {
    const { data, world } = props.route.params;
    const title = world ? data.country : data.state;

    return {
        headerStyle:{
            elevation:0,
            backgroundColor:THEME.DARK
        },
        headerTitle: title
    }
}

