import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TextInput, FlatList} from 'react-native'
import { THEME } from '../util/THEME'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Fallback from '../components/FallBack';
import Axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { formatNumber } from '../util/helper';

const DistricScreen = (props) => {
    const {districts,day} =props.route.params;
    const [data, setData] = useState([]);
    const [dataBackup, setDatabackup] = useState([]);
    const formatData = () => {
        const arr = [];
        for(let district in districts){
            arr.push({
                district:district,
                total:{
                    confirmed:districts[district]?.total?.confirmed==undefined ? 0 : districts[district]?.total?.confirmed,
                    deceased:districts[district]?.total?.deceased==undefined ? 0 : districts[district]?.total?.deceased,
                    recovered:districts[district]?.total?.recovered==undefined ? 0 : districts[district]?.total?.recovered,
                    vaccinated:districts[district]?.total?.vaccinated==undefined ? 0 : districts[district]?.total?.vaccinated,
                }
                ,delta:{
                    confirmed:districts[district]?.delta?.confirmed==undefined ? 0 : districts[district]?.delta?.confirmed,
                    deceased:districts[district]?.delta?.deceased==undefined ? 0 : districts[district]?.delta?.deceased,
                    recovered: districts[district]?.delta?.recovered == undefined ? 0 : districts[district]?.delta?.recovered,
                    
                    vaccinated:districts[district]?.delta?.vaccinated==undefined ? 0 : districts[district]?.delta?.vaccinated,
                }
            });
        }
        const sortedByTotal = arr.sort((a, b) => {
            return b.total.confirmed - a.total.confirmed;
        });
        setData(sortedByTotal);
        setDatabackup(sortedByTotal);
    }
    
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const validateNumber = (fn, defaultVal,comma) => {
        try {
            let n= fn();
            if(n==undefined){
                return defaultVal;
            }
            if(comma){
                return numberWithCommas(fn());
            }
            return fn();
        } catch (e) {
            return defaultVal;
        }
    }

    

    const search = (text) => {
        const databackup = [...dataBackup];
        const searchText = text.trim().toLowerCase();

        const data = databackup.filter(l => {
            return l.district.toLowerCase().match(searchText);
        });
        setData(data);
            
    }

    const navigateToStats = (stats) => {
        props.navigation.navigate("DistrictStats",{district:stats,day:day});
    }

    useEffect(() => {
        formatData();
    }, [])

   

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
            

                    <FlatList
                        style={{flex:1}}
                      data={data} renderItem={({ item }) => {
                        let d= item;
                        return (
                            <View style={{ marginTop: 10 }} >
                                <TouchableNativeFeedback onPress={() => navigateToStats(d)} style={styles.tableHead} background={TouchableNativeFeedback.Ripple("#7b819d")}>
                                    <Text style={styles.tableRowText}>{d.district}</Text>
                                    <Text style={styles.tableRowText}> <Text style={{color:THEME.SUBJECT}}>
                                            {
                                                d.delta.confirmed!=0 && <AntDesign name="arrowup" size={16} />  
                                            }
                                            {
                                                d.delta.confirmed!=0 && validateNumber(() => d.delta.confirmed,'',true)
                                            }
                                        </Text> {formatNumber(d.total.confirmed)}</Text>
                                </TouchableNativeFeedback>
                            </View>
                        )
                    }}
                    keyExtractor={d => d.district}
                />
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
    const {statename,day} =props.route.params;

    return {
        headerStyle: {
            elevation: 0,
            backgroundColor: THEME.DARK
        },
        headerTitle:statename,
        headerTintColor:"white",
        headerTitleContainerStyle:{
            width:'50%',
        },
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