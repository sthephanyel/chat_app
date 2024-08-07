import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function Home(){
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
            <View style={{flex: 1, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#000'}}>
                    Home
                </Text>
            </View>
        </SafeAreaView>
    )
}