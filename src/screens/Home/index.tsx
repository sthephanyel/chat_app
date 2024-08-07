import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { editprofileUp } from "../../redux/reducers/Profile";

export default function Home(){
    const dispatch = useDispatch();
    const { editProfile } = useSelector((state: RootState) => state.profile);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
            <View style={{flex: 1, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#000'}}>
                    Home
                </Text>
                <Text style={{color: '#000'}}>
                    {editProfile.toString()}
                </Text>
                <TouchableOpacity onPress={()=>{
                    dispatch(editprofileUp(!editProfile))
                }}>
                    <Text style={{color: '#000'}}>
                        Mudar
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}