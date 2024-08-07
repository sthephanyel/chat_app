import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function Login(){
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
            <View style={{flex: 1, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#000'}}>
                    Login
                </Text>
            </View>
        </SafeAreaView>
    )
}