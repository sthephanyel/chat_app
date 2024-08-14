import {
GoogleSignin,
GoogleSigninButton,
statusCodes,
} from '@react-native-google-signin/google-signin'
import { supabaseClient } from '../../lib/libSupabase';
import { useDispatch } from 'react-redux';
import { saveUserGoogle } from '../../redux/reducers/User';

export function AuthGoogleComponent(){
    const dispatch = useDispatch();

    GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: `${process.env.CLIENTE_WEB}`,
    })
    return(
    <GoogleSigninButton
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={async () => {
        try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        if (userInfo.idToken) {
            const { data, error } = await supabaseClient.auth.signInWithIdToken({
            provider: 'google',
            token: userInfo.idToken,
            })
            // console.log(error, data)
            if(data?.session?.access_token){
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
        }
    }}
    />
    );
  }
  