import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Appearance, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";
import { RootState } from "../../../../redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ChatProps {
    navigation: NativeStackNavigationProp<any, "chat">;
    }

export default function Chat({navigation}:ChatProps){
    const dispatch = useDispatch();
    const theme = useTheme();
    const { editProfile } = useSelector((state: RootState) => state.profile);
    const { user } = useSelector((state: RootState) => state.user);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
            <View style={{flex: 1, backgroundColor: theme.colors.onBackground, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#000'}}>
                    CHAT
                </Text>
                <TouchableOpacity
                    style={{backgroundColor: 'blue', padding:10}}
                    onPress={()=>{
                        navigation.navigate('userdetails')
                    }}
                >
                    <Text style={{color: '#000'}}>
                        Ir para o User Details
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}