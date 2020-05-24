import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar, Dimensions, ScrollView, RefreshControl, Image } from 'react-native'
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { THEME } from '../util/THEME'
import  Chart from "./../components/PieChart/Chart";
import Card from "../components/CardStyle";
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import HeaderButton from "../components/HeaderButton";
import moment from "moment";
const screenWidth = Dimensions.get('window').width;

import Axios from 'axios';

const HomeScreen = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const fetchData = () => {
        console.log("run")
        setLoading(true);
        Axios.get("https://api.covid19india.org/data.json").then(response => {
            setTimeout(() => {
                setData(response.data.statewise[0]);
                setLoading(false);
            },1500)
            console.log("success")
        }).catch(error => {
            console.log(error);
        })
    }
    useEffect(() => {
        fetchData();
    }, []);
    const onRefresh = React.useCallback(() => {
        fetchData();
    }, [fetchData]);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getChartData = () => {
        const {active,recovered,deaths} = data;
        const total = parseInt(active) + parseInt(recovered) + parseInt(deaths);
        let activePer = parseInt(active) / parseInt(total) * 100;
        let recoveredPer = parseInt(recovered) / parseInt(total) * 100;
        let deathsPer = parseInt(deaths) / parseInt(total) * 100;
        return [
            {
                name:"Active",
                color:THEME.EQUIPMENT,
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
            return moment(timestamp, 'DD/MM/YYYY HH:mm:ss', true).format("DD MMM, YYYY [on] hh:mm A");
    }
  return (
    <View style={styles.screen}>
            <ScrollView 
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <StatusBar backgroundColor={THEME.DARK} barStyle='light-content' />
                <SkeletonContent
                    containerStyle={{ width: screenWidth, height: 260, paddingHorizontal: 10 }}
                    isLoading={loading}
                    boneColor={THEME.CARD}
                    highlightColor="#4c5067"
                    layout={[
                        { key: "chart", width: screenWidth-20, height: 260, borderRadius: 10 },
                    ]}
                >
                    <Chart data={getChartData()} />
                </SkeletonContent>
                    <SkeletonContent
                        containerStyle={{
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'flex-start',
                            padding:5,
                        }}
                        isLoading={loading}
                        boneColor={THEME.CARD}
                        highlightColor="#4c5067"
                        layout={[
                            { key: "1", width: (screenWidth - 30) / 2, height: 140, marginTop: 10, borderRadius: 10, marginRight: 10,marginLeft:5 },
                            { key: "2", width: (screenWidth - 30) / 2, height: 140, marginTop: 10, borderRadius: 10 },
                            { key: "3", width: (screenWidth - 30) / 2, height: 140, marginTop: 10, borderRadius: 10, marginRight: 10, marginLeft: 5 },
                            { key: "4", width: (screenWidth - 30) / 2, height: 140, marginTop: 10, borderRadius: 10 },
                            { key: "5", width: (screenWidth - 30) / 2, height: 140, marginTop: 10, borderRadius: 10, marginRight: 10, marginLeft: 5 },
                            { key: "6", width: (screenWidth - 30) / 2, height: 140, marginTop: 10, borderRadius: 10 },
                          
                        ]}
                    >
                        {
                            loading ? null : 
                                <View style={styles.cards}>
                                    <Card color={THEME.SUBJECT} title="Confirmed" value={numberWithCommas(data.confirmed)} desc={"+" + numberWithCommas(data.deltaconfirmed)} />
                                    <Card color={THEME.EQUIPMENT} title="Active" value={numberWithCommas(data.active)} desc="" />
                                    <Card color={THEME.GREEN} title="Recovered" value={numberWithCommas(data.recovered)} desc={"+" + numberWithCommas(data.deltarecovered)} />
                                    <Card color={THEME.DANGER} title="Deceased" value={numberWithCommas(data.deaths)} desc={"+" + numberWithCommas(data.deltadeaths)} />
                                <Card color={THEME.DANGER} custom={true} navigation={() => props.navigation.navigate("StateScreen")}>
                                        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                                            <View style={{alignItems:"center"}}>
                                                <Image source={require("../assets/in.png")}  style={{height:25,width:35,}} />
                                            </View>
                                            <View style={{marginTop:5,}}>
                                                <Text style={{ fontSize: 22,color:"white",fontFamily:"OpenSans-Medium", }}>India</Text>
                                            </View>
                                        </View>
                                    </Card>
                                <Card color={THEME.DANGER} custom={true} navigation={() => props.navigation.navigate("WorldScreen")}  >
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                            <View style={{ alignItems: "center" }}>
                                                <Ionicons name="ios-globe" size={28} color="white" />
                                            </View>
                                            <View style={{ marginTop: 5, }}>
                                                <Text style={{ fontSize: 22, color: "white",fontFamily:"OpenSans-Medium" }}>World</Text>
                                            </View>
                                        </View>
                                    </Card>
                                    <View style={{width:"100%",marginTop:10}}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: THEME.SUBJECT,
                                        textAlign: "center",
                                        fontFamily:"OpenSans-Medium"
                                    }}>Last update: {getDate(data.lastupdatedtime)}</Text>
                                    </View>
                                </View>
                        }
                 
                   
                    </SkeletonContent>
            </ScrollView>
        </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    screen:{
        backgroundColor:THEME.DARK,
        flex:1,
    },
    header:{
        height:35,
        paddingHorizontal:10,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    headerTitle:{
        color:"white",
        fontSize:18,
        fontFamily:"OpenSans-Medium"
    },
    cards:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop:5,

    }
})
export const ScreenOptions = (props) => {
  return {
      headerStyle:{
          elevation:0,
          backgroundColor: THEME.DARK
      },
      headerTitle:"COVID-19 INDIA Stats",
      headerTintColor:"white",
    //   headerRight:() => {
    //     return (
    //         <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //             <Item title="Cart" iconName={"ios-information-circle-outline"} onPress={() => props.navigation.navigate("AboutScreen")} />
    //         </HeaderButtons>
    //     )
    // }
     
  }
}