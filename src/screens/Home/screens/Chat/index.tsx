import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Appearance,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, MD2Colors, useTheme} from 'react-native-paper';
import {RootState} from '../../../../redux/store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {supabaseClient} from '@lib/libSupabase';

interface realtimeReturn {
  commit_timestamp: string;
  errors: string;
  eventType: string;
  new: {
    messageid: number;
    senderid: number;
    receiverid: number;
    content: string;
    mediaurl: string;
    timestamp: string;
    status: string;
  };
  old: {};
  schema: string;
  table: string;
}

export interface messageState {
  messageid: number;
  senderid: number;
  receiverid: number;
  content: string;
  mediaurl: string;
  timestamp: string;
  status: string;
}

interface ChatProps {
  navigation: NativeStackNavigationProp<any, 'chat'>;
}

export default function Chat({navigation}: ChatProps) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {editProfile} = useSelector((state: RootState) => state.profile);
  const {user} = useSelector((state: RootState) => state.user);

  const [mensagem, setMensagem] = useState('');
  const [listaDeMensagens, setListaDeMensagens] = useState<messageState[]>([]);

  const handleInserts = (payload: realtimeReturn) => {
    // console.log('Change received!', payload);
    setListaDeMensagens(valorAtualDaLista => {
      return [...valorAtualDaLista, payload.new];
    });
  };

  const getRealtime = async () => {
    await supabaseClient
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          // filters: 'senderid.eq.2,senderid.eq.5',
          filters:
            'senderid=in.2,senderid=in.5,receiverid=in.2,receiverid=in.5',
        },
        handleInserts,
      )
      .subscribe();
  };

  // SELECT *
  // FROM messages
  // WHERE
  //   (senderid = 5 AND receiverid = 2)
  //   OR
  //   (senderid = 2 AND receiverid = 5);

  const getMessage = async () => {
    await supabaseClient
      .from('messages')
      .select('*')
      .in('senderid', ['5', '2'])
      .in('receiverid', ['5', '2'])
      .order('messageid', {ascending: true})
      .then(({data}: any) => {
        // console.log('data', data);
        setListaDeMensagens(data);
      });
  };

  const getUser = async () => {
    let {data: users, error} = await supabaseClient
      .from('users')
      .select('*')
      .eq('email', 'teste@gmail.com');

    if (users != undefined && users?.length > 0) {
      console.log('users', users);
    }
    console.log('error', error);
  };

  async function handleNovaMensagem(novaMensagem: String) {
    const mensagem = {
      de: user.full_name,
      message: novaMensagem,
      user_id: user?.id,
    };

    const {error, status} = await supabaseClient
      .from('messages')
      .insert([mensagem]);

    if (status == 201) {
      console.log('Deu certo');
    }
    if (error != null) {
      console.log('Deu errado');
    }

    setMensagem('');
  }

  useEffect(() => {
    getMessage();
    getRealtime();
    // getUser()
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
      <ScrollView
        invertStickyHeaders={true}
        style={{backgroundColor: theme.colors.onBackground}}>
        <Text style={{color: '#000'}}>CHAT</Text>
        {listaDeMensagens &&
          listaDeMensagens.map((item, index) => {
            return (
              <View key={index}>
                <Text>{item?.messageid}</Text>
                <Text>{item?.content}</Text>
              </View>
            );
          })}
        <TouchableOpacity
          style={{backgroundColor: 'blue', padding: 10}}
          onPress={() => {
            navigation.navigate('userdetails');
          }}>
          <Text style={{color: '#000'}}>Ir para o User Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
