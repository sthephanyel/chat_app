import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { editprofileUp } from "../../redux/reducers/Profile";
import { supabaseClient } from "../../lib/libSupabase";

export default function Home(){
    const dispatch = useDispatch();
    const [mensagem, setMensagem] = useState('');
    const [listaDeMensagens, setListaDeMensagens] = useState([]);
    const { editProfile } = useSelector((state: RootState) => state.profile);

    const handleInserts = (payload) => {
        console.log('Change received!', payload)
    }

    const getMessage = async () =>{
        let { data, error, status } = await supabaseClient
          .from('livingmessage')
          .select('*')
          .then(({data})=>{
            console.log('data atual', data)
          });
    }
    useEffect(()=>{
        getMessage();
      },[]);

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