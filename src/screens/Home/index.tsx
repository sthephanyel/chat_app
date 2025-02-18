import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Appearance,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {supabaseClient} from '../../lib/libSupabase';
import {useTheme} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import IconInfinit from '@assets/SVGs/logo_infinit.svg';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {saveUserGoogle} from '@redux/reducers/User';
import Toast from 'react-native-toast-message';

interface HomeProps {
  navigation: NativeStackNavigationProp<any, 'home'>;
}

export interface contactsDate {
  userid: number;
  blocked: boolean | null;
  contactid: number;
  contactuserid: number;
  nickname: string | null;
}

export default function Home({navigation}: HomeProps) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {user} = useSelector((state: RootState) => state.user);

  const [contactList, setContactList] = useState<contactsDate[]>();
  const [loading, setLoading] = useState(false);

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

  const getContacts = async () => {
    try {
      setLoading(true);
      let {data, error, status, count} = await supabaseClient
        .from('contacts')
        .select('*')
        .in('userid', [user?.id]);
      if (data != undefined && data?.length > 0) {
        console.log('data contact', data);
        setContactList(data);
      }
    } catch (error) {
      console.log('contacts erros', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContacts = ({item}: {item: contactsDate}) => {
    return (
      <TouchableOpacity
        style={{backgroundColor: 'blue', padding: 10}}
        onPress={() => {
          // navigation.navigate('chat', {
          //   contact_id: item?.contactuserid,
          // });

          Toast.show({
            type: 'success',
            text1: `Usuario ${item?.nickname} esta online`,
            text2: 'entre em contato com ele',
          });
        }}>
        <View style={{backgroundColor: 'gray', margin: 4}}>
          <Text>Contato</Text>
          <Text>{item?.contactuserid}</Text>
          <Text>{item?.nickname}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    // getUser()
    getContacts();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.background}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
          padding: 12,
        }}>
        <IconInfinit width={25} height={25} color={theme.colors.background} />
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: '800',
            marginLeft: 3,
            fontSize: 13,
          }}>
          Infinit
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'red',
            padding: 12,
          }}>
          <Text
            style={{
              color: theme.colors.primary,
              fontWeight: '800',
              marginLeft: 3,
              fontSize: 13,
            }}>
            PESQUISAR
          </Text>
        </View>
        {/* 
        <Text style={{color: '#fff'}}>Home</Text>
        <Text style={{color: '#fff'}}>ID: {user?.id}</Text>
        <Text style={{color: '#fff'}}>NAME: {user?.name}</Text>
        <Text style={{color: '#fff'}}>FULL NAME: {user?.full_name}</Text>

        <TouchableOpacity
          style={{backgroundColor: theme.colors.primary, padding: 10}}
          onPress={() => {
            const themeAtual = Appearance.getColorScheme();
            Appearance.setColorScheme(themeAtual === 'dark' ? 'light' : 'dark');
          }}>
          <Text style={{color: '#000'}}>THEMA</Text>
        </TouchableOpacity>
        <Image
          width={80}
          height={80}
          source={{
            uri: user.picture,
          }}
        /> */}
        {/* <TouchableOpacity
          style={{backgroundColor: 'blue', padding: 10}}
          onPress={() => {
            navigation.navigate('chat');
          }}>
          <Text style={{color: '#000'}}>Ir para o Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{backgroundColor: 'red', padding: 10}}
          onPress={async () => {
            try {
              await GoogleSignin.configure({});
              // remove do acesso dos acessos autorizados da google
              // await GoogleSignin.revokeAccess();
              // sai do usuario atual
              await GoogleSignin.signOut();
              dispatch(saveUserGoogle({}));
            } catch (error) {
              console.error(error);
            }
          }}>
          <Text style={{color: '#000'}}>Sair</Text>
        </TouchableOpacity> */}
      </ScrollView>
      <FlatList
        data={contactList}
        renderItem={renderContacts}
        keyExtractor={(item, index) => index.toString()}
        refreshing={loading}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getContacts()}
          />
        }
      />
    </SafeAreaView>
  );
}
