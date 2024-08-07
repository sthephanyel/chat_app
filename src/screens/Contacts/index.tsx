import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function Contacts(){
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
            <View style={{flex: 1, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#000'}}>
                    Contacts
                </Text>
            </View>
        </SafeAreaView>
    )
}