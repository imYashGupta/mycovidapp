import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View, ActivityIndicator,FlatList,ToastAndroid,ScrollView } from 'react-native'
import { THEME } from '../util/THEME';
import DateSlider from '../components/DateSlider';
import Axios from 'axios';
import moment from "moment";
import Card from "../components/CardStyleX";
import ExpandableRow from '../components/ExpandableRow';
import { STATE_NAMES } from "../util/states"; 
const TODAY_DATE=moment().format('YYYY-MM-DD');

export default function TimeSeries(props) {
    const [dates, setDates] = useState([]);
    const [total, setTotal] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [dateLoading, setDateLoading] = useState(true);
    const [date, setDate] = useState(TODAY_DATE);

    const getTimeSeries = () => {
        Axios.get("https://api.covid19india.org/v3/min/timeseries.min.json").then(response => {
            let timeSeries=Object.keys(response.data['TT']);
            setDates(timeSeries);
            setDateLoading(false)
        }).catch(error => {
            console.log(error);
        });
    }

    const getData = (reqDate) => {
        setDate(reqDate);
        const url = reqDate==TODAY_DATE ? "data.min.json" : `data-${reqDate}.min.json`;
        Axios.get("https://api.covid19india.org/v3/min/"+url).then(response => {
            const arr = [];
            let india = response.data;
            for(let state in india){
                if(state=='TT'){
                    //total 
                    setTotal({name:state,total:india[state].total,delta:india[state].delta});
                }   
                if(state!=='TT' && state!='UN'){
                    arr.push({
                        name:state,
                        total:{
                            confirmed:india[state]?.total?.confirmed==undefined ? 0 : india[state]?.total?.confirmed,
                            deceased:india[state]?.total?.deceased==undefined ? 0 : india[state]?.total?.deceased,
                            recovered:india[state]?.total?.recovered==undefined ? 0 : india[state]?.total?.recovered,
                        }
                        ,delta:{
                            confirmed:india[state]?.delta?.confirmed==undefined ? 0 : india[state]?.delta?.confirmed,
                            deceased:india[state]?.delta?.deceased==undefined ? 0 : india[state]?.delta?.deceased,
                            recovered:india[state]?.delta?.recovered==undefined ? 0 : india[state]?.delta?.recovered,
                        },
                        districts:india[state].districts
                    });
                }
            }
            const sorted = arr.sort((a, b) => {
                return b.total.confirmed - a.total.confirmed;
            })  
            setData(sorted);
            setLoading(false);
           
        }).catch(e => console.log(e))
    }

  
   
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const validateNumber = (fn, defaultVal) => {
        try {
            let n= fn();
            if(n==undefined){
                return defaultVal;
            }
            return numberWithCommas(fn());
        } catch (e) {
            return defaultVal;
        }
    }

    const dateChange = (index) => {
        if(dates[index-1]==TODAY_DATE){
            getData(TODAY_DATE)
        }
        else{
            getData(dates[index-1]);
        }
    }

    const navigateToDistrict = (state) => {
        if(state.districts!==undefined){
            const dayStr = date===TODAY_DATE ? "Today" : moment(date,"YYYY-MM-DD").format("DD MMMM");
            props.navigation.navigate("DistrictScreen",{statename:STATE_NAMES[state.name],districts:state.districts,day:dayStr});
        }
        else{
            return;
        }
    }
   
    useEffect(() => {
        getTimeSeries();
    }, []);

    useEffect(() => {
        getData(TODAY_DATE);
    }, []);
    

    
    if(loading || dateLoading) {
        return (
            <View style={[styles.screen,{justifyContent:"center"}]}>
                <ActivityIndicator size="large" color={THEME.GREEN}/>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <View>
                <DateSlider dates={dates} onDateChange={(e) => dateChange(e)} />
            </View>
            <ScrollView>
                
            {/* <View>
                <Text style={{color:"white"}}>{date}</Text>
            </View> */}
            <View style={styles.cards}>
                <Card containerStyle={{}}  color={THEME.SUBJECT} title="Confirmed" value={total.total.confirmed} desc={total.delta.confirmed} />
                <Card color={THEME.EQUIPMENT} title="Tested" value={total.total.tested} desc={total.delta.tested} />
                <Card color={THEME.GREEN} title="Recovered" value={total.total.recovered} desc={total.delta.recovered} />
                <Card color={THEME.DANGER} title="Deaths" value={total.total.deceased} desc={total.delta.deceased} />
            </View>
            <View style={styles.tableConatiner}>
                
                <View
                >
                    {/* <FlatList
                        ListHeaderComponent={() => {
                            return (
                                <View style={[styles.tableHead]}>
                                <Text style={[styles.tableHeadText,{color:THEME.SUBJECT}]}>Confirmed</Text>
                                <Text style={styles.tableHeadText}>Recovered</Text>
                                <Text style={[styles.tableHeadText,{color:THEME.DANGER}]}>Deaths</Text>
                            </View>
                            )
                        }}
                        stickyHeaderIndices={[0]}
                        contentContainerStyle={{ paddingBottom: 10}}
                        keyExtractor={item => item.name}
                        renderItem={(item => {
                            if(item.item.name!='UN' && item.item.name!='TT'){
                                return(
                                    <ExpandableRow 
                                        navigate={() => navigateToDistrict(item.item)}
                                        name={STATE_NAMES[item.item.name]} 
                                        confirmed={validateNumber(() => item.item.total.confirmed,'0')}
                                        recovered={validateNumber(() => item.item.total.recovered,'0')}
                                        deaths={validateNumber(() => item.item.total.deceased,'0')}
                                        todayConfirmed={validateNumber(() => item.item.delta.confirmed,'0')}
                                        todayRecovered={validateNumber(() => item.item.delta.recovered,'0')}
                                        todayDeaths={validateNumber(() => item.item.delta.deceased,'0')}
                                    />
                                )
                            }
                        })}
                        data={data}
                    /> */}
                    <View style={[styles.tableHead]}>
                                <Text style={[styles.tableHeadText,{color:THEME.SUBJECT}]}>Confirmed</Text>
                                <Text style={styles.tableHeadText}>Recovered</Text>
                                <Text style={[styles.tableHeadText,{color:THEME.DANGER}]}>Deaths</Text>
                            </View>
                    <View>
                        {
                            data.map(item => {
                                return (
                                    <ExpandableRow key={item.name}
                                        clickable={item.districts!=undefined}
                                        navigate={() => navigateToDistrict(item)}
                                        name={STATE_NAMES[item.name]} 
                                        confirmed={validateNumber(() => item.total.confirmed,'0')}
                                        recovered={validateNumber(() => item.total.recovered,'0')}
                                        deaths={validateNumber(() => item.total.deceased,'0')}
                                        todayConfirmed={validateNumber(() => item.delta.confirmed,'0')}
                                        todayRecovered={validateNumber(() => item.delta.recovered,'0')}
                                        todayDeaths={validateNumber(() => item.delta.deceased,'0')}
                                    />
                                )
                            })
                        }
                    </View>
                </View>
            </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: THEME.DARK,
        flex: 1
    },
    cards:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:"space-between",
        marginHorizontal:5
    },
    tableConatiner:{
        marginHorizontal:10,
        flex:1
    },  
    tableHead:{
        height:40,
        width:"100%",
        backgroundColor:THEME.CARD,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        justifyContent:"space-between",
        elevation: 10,
        overflow:"hidden",
        marginBottom:5
    },
    tableHeadText:{
        color:THEME.GREEN,
        fontSize:18,
        fontFamily:"OpenSans-Medium"

    },
    tableRowText: {
        color: THEME.WHITE,
        fontSize: 18,
        fontFamily:"OpenSans-Medium"

    },
})
export const ScreenOptions = () => {
    
    return {
        headerTitle:"Time Series"
    }
}