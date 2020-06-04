import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TextInput, FlatList} from 'react-native'
import { THEME } from '../util/THEME'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Fallback from '../components/FallBack';
import Axios from 'axios';
const DistricScreen = (props) => {
    const {state} =props.route.params;
    const [data, setData] = useState([]);
    const [dataBackup, setDatabackup] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false)

    const getDistrictData = useCallback(() => {
        setLoading(true);
        setHasError(false);
        Axios.get("https://api.covid19india.org/v2/state_district_wise.json").then(response => {
            const res =response.data;
            const district=res.find(s => s.state == state);
            const districtData = district.districtData.sort((a, b) => {
                return b.confirmed - a.confirmed;
            })  
            setData(districtData);
            setDatabackup(districtData)
            setLoading(false);
            setHasError(false);
        }).catch(error => {
            setHasError(true);      
        });
    }, [setLoading])
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    

    const search = (text) => {
        const databackup = [...dataBackup];
        const searchText = text.trim().toLowerCase();

        const data = databackup.filter(l => {
            return l.district.toLowerCase().match(searchText);
        });
        setData(data);
            
    }

    const setStats = (stats) => {
        return {
            cases:stats.confirmed,
            active:stats.active,
            deaths:stats.deceased,
            recovered:stats.recovered,
            casesToday:stats.delta.confirmed,
            deathsToday:stats.delta.deceased,
            recoveredToday:stats.delta.deceased,
            name:stats.district,
            type:'district'
        }
    }

    useEffect(() => {
        getDistrictData();
    }, [])

    if(hasError){
        return(
            <Fallback fallbackHandler={getDistrictData}/>
        )
    }

    return (
        <View style={styles.screen}>
            {/* <ActivityIndicator size="large" color={THEME.CONDITION} /> */}
            <View style={styles.searchBar}>
                <View>
                    <Ionicons name="md-search" size={24} color="#ccc" />
                </View>
                <TextInput style={styles.textInput} placeholder="Search District" placeholderTextColor="#ccc" onChangeText={(text) => search(text)} />
            </View>
            <View style={[styles.tableHead,{marginBottom:10,marginTop:10}]}>
                <Text style={styles.tableHeadText}>Name</Text>
                <Text style={styles.tableHeadText}>Total Cases</Text>
            </View>
            {
                loading ? <ActivityIndicator style={{marginTop:20}} size="large" color={THEME.GREEN} /> :

                    <FlatList
                        style={{flex:1}}
                        onRefresh={getDistrictData}
                        refreshing={loading}
                      data={data} renderItem={({ item }) => {
                        let d= item;
                        return (
                            <View style={{ marginTop: 10 }} >
                                <TouchableNativeFeedback onPress={() => props.navigation.navigate("DistrictStats", { data: setStats(d), world: false })} style={styles.tableHead} background={TouchableNativeFeedback.Ripple("#7b819d")}>
                                    <Text style={styles.tableRowText}>{d.district}</Text>
                                    <Text style={styles.tableRowText}>{d.delta.confirmed > 0 ? <Text style={{ color: THEME.SUBJECT }}>+{d.delta.confirmed}</Text> : null}   {numberWithCommas(d.confirmed)}</Text>
                                </TouchableNativeFeedback>
                            </View>
                        )
                    }}
                    keyExtractor={d => d.district}
                   

                />
                               
            }
        </View>
    )
}

export default DistricScreen

const styles = StyleSheet.create({
    screen:{
        backgroundColor:THEME.DARK,
        flex:1,
        padding:10
    },
    searchBar:{
        height:45,
        width:"100%",
        borderWidth:1.5,
        borderColor:"#ccc",
        borderRadius:5,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10
    },
    textInput:{
        fontSize:18,
        marginLeft:20,
        color:"#ccc",
        flex:1,
    },
    tableHead:{
        height:40,
        width:"100%",
        backgroundColor:THEME.CARD,
        borderRadius:5,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        justifyContent:"space-between",
        elevation: 5,
        overflow:"hidden"
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
    headerButton:{
        height:30,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        padding:10,
        paddingVertical:20
    },
    headerButtonText:{
        color:"white",
        fontSize:18,
        marginLeft:10,
        fontFamily:"OpenSans-Medium"

    }
    
})

export const ScreenOptions = (props) => {
    const {statecode,state} =props.route.params;
    return {
        headerStyle: {
            elevation: 0,
            backgroundColor: THEME.DARK
        },
        headerTitle:state,
        headerTintColor:"white",
        // headerRight:() => {
        //     return ( 
        //         <View style={{marginRight:10}}>
        //             <TouchableNativeFeedback onPress={() => props.navigation.navigate("WorldScreen")} style={styles.headerButton} background={TouchableNativeFeedback.Ripple("#7b819d")}>
        //                 <Ionicons name="ios-globe" size={24} color="white" />
        //                 <Text style={styles.headerButtonText}>World</Text>
        //             </TouchableNativeFeedback>
        //         </View>
        //     )
        // }
    }
}