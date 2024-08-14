import 'react-native-url-polyfill/auto';
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AuthGoogleComponent } from "../../components/auth";
import { Session } from '@supabase/supabase-js'
import { supabaseClient } from "../../lib/libSupabase";
import Auth from '../../components/authInputLogin';

export default function Login(){
    const { editProfile } = useSelector((state: RootState) => state.profile);

    // const [session, setSession] = useState<Session | null>(null)
    // console.log('session user', session?.user)
    // console.log('session', session)
    
    // useEffect(() => {
    //     supabaseClient.auth.getSession().then(({ data: { session } }) => {
    //     setSession(session)
    //     })

    //     supabaseClient.auth.onAuthStateChange((_event, session) => {
    //     setSession(session)
    //     })
    // }, [])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
            <View style={{flex: 1, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#000'}}>
                    Login
                </Text>
                <Text style={{color: '#000'}}>
                    {editProfile.toString()}
                </Text>
            <AuthGoogleComponent/>
            </View>
            {/* <Auth/> */}
        </SafeAreaView>
    )
}