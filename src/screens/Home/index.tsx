import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Appearance, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { editprofileUp } from "../../redux/reducers/Profile";
import { supabaseClient } from "../../lib/libSupabase";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

interface HomeProps {
navigation: NativeStackNavigationProp<any, "home">;
}

export default function Home({navigation}: HomeProps){
    const dispatch = useDispatch();
    const theme = useTheme();
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

    const getUser = async () =>{
        
        let { data: users, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('email', 'teste@gmail.com')

        if(users != undefined && users?.length > 0){
            console.log('users',users)
        }
        console.log('error', error)
    }

    async function handleNovaMensagem(novaMensagem: String) {
        const mensagem = {
          de: user.full_name,
          message: novaMensagem,
          user_id: user?.id 
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
        // getRealtime();
        // getUser()
      },[]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
            <View style={{flex: 1, backgroundColor: theme.colors.onBackground, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#000'}}>
                    Home
                </Text>
                <Text style={{color: '#000'}}>
                    ID: {user?.id}
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

                <TouchableOpacity
                    style={{backgroundColor: theme.colors.primary, padding:10}}
                    onPress={()=>{
                        const themeAtual = Appearance.getColorScheme()
                        Appearance.setColorScheme(themeAtual === 'dark' ? 'light' : 'dark')

                    }}
                >
                    <Text style={{color: '#000'}}>
                        THEMA
                    </Text>
                </TouchableOpacity>

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
                <Image
                    width={80}
                    height={80}
                    source={{
                        uri: user.picture
                      }}
                />
                <Image
                    width={80}
                    height={80}
                    source={{
                        uri: user.avatar_url
                      }}
                />
                <TouchableOpacity
                    style={{backgroundColor: 'blue', padding:10}}
                    onPress={()=>{
                        navigation.navigate('chat')
                    }}
                >
                    <Text style={{color: '#000'}}>
                        Ir para o Chat
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