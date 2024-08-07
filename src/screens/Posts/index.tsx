import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function Posts(){
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
            <View style={{flex: 1, backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#000'}}>
                    Posts
                </Text>
            </View>
        </SafeAreaView>
    )
}