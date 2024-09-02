import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Appearance, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";
import { RootState } from "@redux/store";
// import { RootState } from "../../../../redux/store";



export default function UserDetails(){
    const dispatch = useDispatch();
    const theme = useTheme();
    const { editProfile } = useSelector((state: RootState) => state.profile);
    const { user } = useSelector((state: RootState) => state.user);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
            <View style={{flex: 1, backgroundColor: theme.colors.onBackground, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#000'}}>
                    UserDetails
                </Text>
            </View>
        </SafeAreaView>
    )
}