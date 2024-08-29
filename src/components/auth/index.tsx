import {
GoogleSignin,
GoogleSigninButton,
statusCodes,
} from '@react-native-google-signin/google-signin'
import { supabaseClient } from '../../lib/libSupabase';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserGoogle } from '../../redux/reducers/User';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { RootState } from '../../redux/store';

export interface userSupabase {
    id: Number;
    created_at: String;
    description: String | null;
    email: String | null;
    full_name: String | null;
    photo: String | null;
    name: String | null;
    updated_at: String | null;
}

export function AuthGoogleComponent(){
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state: RootState) => state.user);

    GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: `${process.env.GOOGLE_CLIENT_ID}`,
    })
    return(
        <>
            {loading ?(
                <ActivityIndicator size="large" color="yellow" />
            ):(
                <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={async () => {
                    try {
                        setLoading(true)
                        await GoogleSignin.hasPlayServices()
                        const userInfo = await GoogleSignin.signIn()
                        if (userInfo.idToken) {
                            const { data, error } = await supabaseClient.auth.signInWithIdToken({
                            provider: 'google',
                            token: userInfo.idToken,
                            })
                            // console.log(error, data)
                            if(data?.session?.access_token && data?.user?.email){
                                let { data: current_users, error } = await supabaseClient
                                .from('users')
                                .select('*')
                                .eq('email', data?.user?.email || "")

                                if(current_users?.length > 0 && current_users != undefined){
                                    console.log('users','Usuário ja existe!', current_users.full_name)

                                    var timestemp = new Date();
                                    
                                    const { data: updateUser, error } = await supabaseClient
                                    .from('users')
                                    .update({ updated_at : timestemp })
                                    .eq('email', data?.user?.email || "")
                                    .select()

                                }else{
                                    // adiciona o usuario a coluna users
                                    const { data: userInsert, error } = await supabaseClient
                                    .from('users')
                                    .insert([
                                    { 
                                        full_name: data?.user?.user_metadata?.full_name || "", 
                                        name: data?.user?.user_metadata?.name || "",
                                        email: data?.user?.email || "",
                                        photo: data?.user?.user_metadata?.picture || ""
                                     },
                                    ])
                                    .select()
        
                                }
                                dispatch(
                                    saveUserGoogle({
                                        access_token: data?.session?.access_token || "",
                                        created_at: data?.session?.access_token || "",
                                        confirmed_at: data?.user?.confirmed_at || "",
                                        email: data?.user?.email || "",
                                        email_confirmed_at: data?.user?.email_confirmed_at || "",
                                        updated_at: data?.user?.updated_at || "",
                                        avatar_url: data?.user?.user_metadata?.avatar_url || "",
                                        full_name: data?.user?.user_metadata?.full_name || "",
                                        name: data?.user?.user_metadata?.name || "",
                                        picture: data?.user?.user_metadata?.picture || ""
                                    })
                                );
                                
                            }
                        } else {
                            throw new Error('no ID token present!')
                        }
                        setLoading(false)
                    } catch (error: any) {
                        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                            // user cancelled the login flow
                        } else if (error.code === statusCodes.IN_PROGRESS) {
                            // operation (e.g. sign in) is in progress already
                        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                            // play services not available or outdated
                        } else {
                            // some other error happened
                        }
                        setLoading(false)
                    }
                }}
                />

            )}
        </>
    );
  }
  