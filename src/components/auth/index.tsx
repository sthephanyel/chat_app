import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {supabaseClient} from '../../lib/libSupabase';
import {useDispatch, useSelector} from 'react-redux';
import {saveUserGoogle} from '../../redux/reducers/User';
import {useState} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import {RootState} from '../../redux/store';
import IconGoogleSVG from '@assets/SVGs/icon_google.svg';

export interface userSupabase {
  id: number;
  created_at: string;
  description: string | null;
  email: string | null;
  full_name: string | null;
  photo: string | null;
  name: string | null;
  updated_at: string | null;
  avatar_url: string | null;
}

export function AuthGoogleComponent({...props}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function FiltroObjectJson(data: userSupabase[]) {
    const jsonReturn: userSupabase = {};

    jsonReturn.id = data[0].id;
    jsonReturn.full_name = data[0].full_name || '';
    jsonReturn.created_at = data[0].created_at || '';
    jsonReturn.name = data[0].name || '';
    jsonReturn.avatar_url = data[0].photo || '';
    jsonReturn.description = data[0].description || '';
    jsonReturn.email = data[0].email || '';
    jsonReturn.updated_at = data[0].updated_at || '';
  }

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: `${process.env.GOOGLE_CLIENT_ID}`,
  });
  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="yellow" />
      ) : (
        <Pressable
          {...props}
          onPress={async () => {
            try {
              setLoading(true);
              await GoogleSignin.hasPlayServices();
              const userInfo = await GoogleSignin.signIn();
              if (userInfo.idToken) {
                const {data} = await supabaseClient.auth.signInWithIdToken({
                  provider: 'google',
                  token: userInfo.idToken,
                });
                // console.log(error, data)
                if (data?.session?.access_token && data?.user?.email) {
                  // PEGA TODAS AS INFORMAÇÕES RETORNADAS DA SESSION GOOGLE
                  const dataResp = {
                    id: null,
                    access_token: data?.session?.access_token || '',
                    created_at: data?.session?.access_token || '',
                    confirmed_at: data?.user?.confirmed_at || '',
                    email: data?.user?.email || '',
                    email_confirmed_at: data?.user?.email_confirmed_at || '',
                    updated_at: data?.user?.updated_at || '',
                    avatar_url: data?.user?.user_metadata?.avatar_url || '',
                    full_name: data?.user?.user_metadata?.full_name || '',
                    name: data?.user?.user_metadata?.name || '',
                    picture: data?.user?.user_metadata?.picture || '',
                    description: '',
                  };

                  // VERIFICA SE O USUÁRIO EXISTE
                  let {data: current_users} = await supabaseClient
                    .from('users')
                    .select('*')
                    .eq('email', data?.user?.email || '');

                  if (current_users != undefined && current_users?.length > 0) {
                    // ATUALIZA AS INFORMAÇÕES DO USUÁRIO
                    const timestemp = new Date();

                    const {data: updateUser} = await supabaseClient
                      .from('users')
                      .update({updated_at: timestemp})
                      .eq('email', data?.user?.email || '')
                      .select();

                    if (updateUser != undefined) {
                      // ATUALIZA AS INFORMAÇÕES PARA SER GUARDADO NO REDUX
                      FiltroObjectJson(updateUser);
                    }
                  } else {
                    // ADICIONA O USUÁRIO A COLUNA USERS
                    const {data: user_insert} = await supabaseClient
                      .from('users')
                      .insert([
                        {
                          full_name: data?.user?.user_metadata?.full_name || '',
                          name: data?.user?.user_metadata?.name || '',
                          email: data?.user?.email || '',
                          photo: data?.user?.user_metadata?.picture || '',
                        },
                      ])
                      .select();

                    if (user_insert != undefined) {
                      // ATUALIZA AS INFORMAÇÕES PARA SER GUARDADO NO REDUX
                      FiltroObjectJson(user_insert);
                    }
                  }

                  dispatch(saveUserGoogle(dataResp));
                }
              } else {
                throw new Error('no ID token present!');
              }
              setLoading(false);
            } catch (error: any) {
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
              } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
              ) {
                // play services not available or outdated
              } else {
                // some other error happened
              }
              setLoading(false);
            }
          }}>
          <IconGoogleSVG width={130} height={130} />
        </Pressable>
      )}
    </>
  );
}
