import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin'
import { supabaseClient } from '../../lib/libSupabase';
  
  export function AuthGoogleComponent(){
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: `${process.env.GOOGLE_CLIENT_ID}`,
      })
      return(
        <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
            try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            console.log('userInfo', userInfo)
            if (userInfo.idToken) {
                const { data, error } = await supabaseClient.auth.signInWithIdToken({
                provider: 'google',
                token: userInfo.idToken,
                })
                console.log(error, data)
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
  