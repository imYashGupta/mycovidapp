import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import { THEME } from '../util/THEME';
import Axios from 'axios';
import moment from "moment";

const UpdatesScreen = () => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const getUpdates = () => {
        setLoading(true);
        Axios.get("https://api.covid19india.org/updatelog/log.json").then(response =>{
            setLoading(false)
            setUpdates(response.data.reverse());
        }).catch(error => {
            setLoading(false)
            console.log(error);
        })
    }

    useEffect(() => {
        getUpdates();
    }, []);


    const time2TimeAgo = (ts) => {
       
        var d=new Date();  // Gets the current time
        var nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
        var seconds = nowTs-ts;
    
        // more that two days
        if (seconds > 2*24*3600) {
           return "a few days ago";
        }
        // a day
        if (seconds > 24*3600) {
           return "Yesterday";
        }
    
        if (seconds > 3600) {
            return Math.floor(seconds/60/60)+" hours ago";
         }
        if (seconds > 1800) {
            return Math.floor(seconds/60)+" minutes ago";
        }
        if (seconds > 60) {
           return Math.floor(seconds/60) + " minutes ago";
        }
    }

    

    return (
        <View style={styles.screen}>
            {
            loading ? <ActivityIndicator style={{marginTop:20}} size="large" color={THEME.GREEN} />
            :
            <FlatList
            onRefresh={getUpdates}
            refreshing={loading}
            data={updates}
            keyExtractor={(item) => item.timestamp.toString()}
            renderItem={
                (item) =>{
                    return (
                        <View style={styles.block}>
                                <Text style={styles.news}>{item.item.update.replace(/(\r\n|\n|\r)/gm, ",").slice(0,-1)}</Text>
                                <Text style={styles.time}>{time2TimeAgo(item.item.timestamp)}</Text>
                            </View>
                        )
                    } 
                }
                
                
                />
            }
                
        </View>
    )
}

export default UpdatesScreen;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:THEME.DARK   ,
        justifyContent:"center" 
    },
    block:{
        backgroundColor:THEME.CARD,
        borderRadius:5,
        padding:8,
        marginHorizontal:6,
        marginVertical:3,
        elevation:10
    },
    news:{
        color:"white",
        fontSize:18,
        fontFamily:"OpenSans-Medium"

    },
    time:{
        fontSize:14,
        fontFamily:"OpenSans-Medium",
        color:THEME.GREEN
    }

})

export const ScreenOptions = (props) => {
    return {
        headerTitle:"Covid-19 India Updates"
    }
}
