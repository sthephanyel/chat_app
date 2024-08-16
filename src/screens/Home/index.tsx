import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { editprofileUp } from "../../redux/reducers/Profile";
import { supabaseClient } from "../../lib/libSupabase";

interface realtimeReturn {
    commit_timestamp: String;
    errors: String;
    eventType: String; 
    new: {
        created_at: String;
        de: String;
        id: Number;
        message: String;
    }, 
    old: {}, 
    schema: String;
    table: String;
}

export interface messageState {
    created_at: String;
    de: String;
    id: Number;
    message: String;
  }

export default function Home(){
    const dispatch = useDispatch();
    const [mensagem, setMensagem] = useState('');
    const [listaDeMensagens, setListaDeMensagens] = useState<messageState[]>([]);
    const { editProfile } = useSelector((state: RootState) => state.profile);
    const { user } = useSelector((state: RootState) => state.user);

    const handleInserts = (payload:realtimeReturn) => {
        // console.log('Change received!', payload)
        setListaDeMensagens((valorAtualDaLista)=>{
            return [
                payload.new,
                ...valorAtualDaLista,
            ]
        });
      }
    
      const getRealtime = async () => {
        await supabaseClient.channel('livingmessage')
            .on(
                'postgres_changes', 
                { event: 'INSERT', 
                    schema: 'public', 
                    table: 'livingmessage' 
                }, handleInserts)
            .subscribe()
      }
    

    const getMessage = async () =>{
        await supabaseClient
          .from('livingmessage')
          .select('*')
          .order('id',{ascending: false})
          .then(({data}: any)=>{
            // console.log('data atual', data)
            setListaDeMensagens(data);
          });
    }

    async function handleNovaMensagem(novaMensagem: String) {
        console.log('entrando aqui')
        const mensagem = {
          de: 'teste',
          message: novaMensagem,
        };
    
        const { error, status } = await supabaseClient
          .from('livingmessage')
          .insert([
            mensagem
        ])

          if(status == 201){
            console.log('Deu certo')
          }
          if(error != null){
            console.log('Deu errado')
          }

        setMensagem('');
      };

    useEffect(()=>{
        getMessage();
        getRealtime();
      },[]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
            <View style={{flex: 1, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#000'}}>
                    Home
                </Text>
                <Text style={{color: '#000'}}>
                    NAME: {user?.name}
                </Text>
                <Text style={{color: '#000'}}>
                    FULL NAME: {user?.full_name}
                </Text>
                <Text style={{color: '#000'}}>
                    {mensagem}
                </Text>
                <TextInput
                    style={{ width: '90%',backgroundColor: 'gray', padding: 5, borderRadius: 10}}
                    placeholder="Escreva aqui"
                    onChangeText={setMensagem}
                    value={mensagem}
                />
                <TouchableOpacity
                    style={{backgroundColor: 'blue', padding:10}}
                    onPress={()=>{
                        // dispatch(editprofileUp(!editProfile))
                        handleNovaMensagem(mensagem)
                    }}
                >
                    <Text style={{color: '#000'}}>
                        Enviar mensagem
                    </Text>
                </TouchableOpacity>
                {listaDeMensagens.map((item, index)=>{
                    return(
                        <View key={index}>
                            <Text>{item?.message}</Text>
                        </View>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}