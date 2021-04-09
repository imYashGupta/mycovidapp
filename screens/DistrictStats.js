import React,{useCallback,useState,useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView,ActivityIndicator,FlatList } from 'react-native';
import { THEME } from '../util/THEME';
import Chart from "../components/PieChart/Chart";
import Card from "../components/CardStyle";
import moment from "moment";
import {  TouchableNativeFeedback } from 'react-native-gesture-handler';
import {  TransitionPresets  } from '@react-navigation/stack';
import Axios from 'axios';
import InfoCard from '../components/InfoCard';

const StatsScreen = (props) => {
    const {district,district:{total,delta}} = props.route.params;
    let active  = total.confirmed - (total.recovered+total.deceased);
    console.log(total)
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [resources, setResources] = useState([]);
    console.log(active);
    const capitalizeFirstLetter =(string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      
    const getStateData = useCallback(() => {
        console.log("res")
        setHasError(false);
        Axios.get("https://api.covid19india.org/resources/resources.json").then(response => {
            const resources = response.data.resources;
            const cityData = resources.filter(l => {
                return l.city.match(capitalizeFirstLetter(district.district));
            });
            setResources(cityData);
            setHasError(false);
            setLoading(false);

        }).catch(error => {
            setHasError(true);
            setLoading(false);

        });
    }, [setLoading]);

    const subtotal = parseInt(active) + parseInt(total.recovered) + parseInt(total.deceased);
    const getChartData = () => {
        let activePer = parseInt(active) / parseInt(subtotal) * 100;
        let recoveredPer = parseInt(total.recovered) / parseInt(subtotal) * 100;
        let deathsPer = parseInt(total.deceased) / parseInt(subtotal) * 100;
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

    useEffect(() => {
       getStateData()
    }, [])

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
                    subtotal!=0 ?
                    <View style={styles.chartContainer}>
                        <Chart data={getChartData( )}/>
                    </View> : null
                }
                <View style={styles.cards}>
                    <Card color={THEME.SUBJECT} title="Confirmed" value={(total.confirmed)} desc={delta.confirmed} />
                    <Card color={THEME.EQUIPMENT} title="Active" value={(active)} desc="" />
                    <Card color={THEME.GREEN} title="Recovered" value={(total.recovered)} desc={delta.recovered} />
                    <Card color={THEME.DANGER} title="Death" value={(total.deceased)} desc={delta.deceased} />
                </View>
                <View style={{alignItems:"center",marginTop:-5,marginBottom:5}}>
                    <Card  style={{marginRight:5,marginLeft:5,marginBottom:5}} color={THEME.CONDITION} title="Vaccine doses" value={total.vaccinated} desc={delta.vaccinated} />
                </View>
                <View style={styles.cardBg}>
                    {/* only show header when there is atleast one item */}
                    {resources.length > 0 &&
                        <View style={styles.resourcesheader}>
                            <Text style={styles.resourcesheaderText}>
                                Help & Essentials Information
                            </Text>
                        </View>
                    }
                {
                    loading ? <View style={{flex:1,justifyContent:"center"}}>
                        <ActivityIndicator size="large" color={THEME.GREEN} />
                        </View> : 
                        resources.map((item,i) => {
                            return (
                                <InfoCard key={i.toString()} data={item} />
                            )
                        })
                }
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
    },cardBg: {
        backgroundColor: THEME.DARK,
        flex: 1,
        // padding: 10
        paddingHorizontal:10
    },
    resourcesheader:{
        height:40,
        width:'100%',
        backgroundColor:THEME.CARD,
        elevation:10,
        marginBottom:10,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5
    },
    resourcesheaderText:{
        color:THEME.TAG,
        fontSize: 16,
        fontWeight:'bold'
    },
    headerButton:{
        height:30,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        paddingVertical:20
    },
    headerButtonText:{
        color:"white",
        fontSize:16,
        marginLeft:10,
        fontFamily:"OpenSans-Medium"

    }
})

export const ScreenOptions = (props) => {
    const {district,day} = props.route.params;
    return {
        headerStyle:{
            elevation:0,
            backgroundColor:THEME.DARK
        },
        headerTitle: district.district,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerRight:() => {
            return ( 
                <View style={{marginRight:10}}>
                    <View   style={styles.headerButton} >
                        <Text style={styles.headerButtonText}>{day}</Text>
                    </View>
                </View>
            )
        }
       
    }
}

