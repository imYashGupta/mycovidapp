import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const TestScreen = (props) => {
    console.log("props",props.data)
    return (
        <View>
            <Text>Test Screen</Text>
            <Button title="home"  />
        </View>
    )
}

export default TestScreen

const styles = StyleSheet.create({})
