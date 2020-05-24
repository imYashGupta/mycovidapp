import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TextInput,FlatList,TouchableNativeFeedback } from 'react-native'
import { THEME } from '../util/THEME'
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import InfoCard from '../components/InfoCard';
const StateScreen = (props) => {
    const stateName = props.route.params.state;

    const [data, setData] = useState([]);
    const [dataBackup, setDatabackup] = useState([]);
    const [loading, setLoading] = useState(true);
    const getStateData = useCallback(() => {
        setLoading(true);
        Axios.get("https://api.covid19india.org/resources/resources.json").then(response => {
            const data = response.data.resources;
            const stateData = data.filter(d => {
                return d.state == stateName;
            })
            setData(stateData);
            setDatabackup(stateData);
            setLoading(false);
            // console.log(stateData);          
        });
    }, [setLoading])
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }



    const search = (text) => {
        const states = [...dataBackup];
        const searchText = text.trim().toLowerCase();

        const data = states.filter(l => {
            return l.city.toLowerCase().match(searchText);
        });
        setData(data);
    }

    const sorted = () => {
        const countries = [...stateBackup];
        const country = countries.sort((a, b) => {
            return b.cases - a.cases;
        })
        console.log(country)
        setState(country);

    }

    useEffect(() => {
        getStateData();
    }, [])



    return (
        <View style={styles.screen}>
            {/* <ActivityIndicator size="large" color={THEME.CONDITION} /> */}
            <View style={styles.searchBar}>
                <View>
                    {/* <Ionicons name="md-search" size={24} color="#ccc" /> */}
                </View>
                <TextInput style={styles.textInput} placeholder="Search City" placeholderTextColor="#ccc"  onChangeText={(text) => search(text)} />
            </View>
            <View style={styles.tableContainer}>
                {
                    loading ? <View style={{flex:1,justifyContent:"center"}}>
                        <ActivityIndicator size="large" color={THEME.GREEN} />
                        </View> : 
                    <FlatList keyExtractor={((item,i) => i.toString())} data={data} renderItem={(item) => <InfoCard data={item.item} />} />
                }
                
            </View>
        </View>
    )
}

export default StateScreen

const styles = StyleSheet.create({
  

    screen: {
        backgroundColor: THEME.DARK,
        flex: 1,
        padding: 10
    },
    searchBar: {
        height: 45,
        width: "100%",
        borderWidth: 1.5,
        borderColor: "#ccc",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10
    },
    textInput: {
        fontSize: 18,
        marginLeft: 20,
        color: "#ccc",
        flex: 1
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
        marginLeft: 10
    },
    tableContainer: {
        flex:1,
        paddingTop:10
    },

    
  

})

export const ScreenOptions = (props) => {
    const {state} = props.route.params;
    return {
        headerStyle: {
            elevation: 0,
            backgroundColor: THEME.DARK
        },
        headerTitle: state,
        headerRight: () => {
            return (
                <View style={{ marginRight: 10 }}>
                    <TouchableNativeFeedback onPress={() => props.navigation.navigate("Home")} style={styles.headerButton} background={TouchableNativeFeedback.Ripple("#7b819d")}>
                        <Text style={styles.headerButtonText}>Home</Text>
                    </TouchableNativeFeedback>
                </View>
            )
        }
    }
}