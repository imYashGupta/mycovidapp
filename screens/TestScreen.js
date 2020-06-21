import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AnimateNumber from 'react-native-animate-number'

export default function TestScreen() {
    return (
        <View>
            <AnimateNumber value={100} formatter={(val) => {return parseInt(val).toFixed(0)}}/>

        </View>
    )
}

const styles = StyleSheet.create({})
