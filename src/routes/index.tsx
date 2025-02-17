import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {AuthRoutes} from './auth.routes';
import {HomeRoutes} from './home.routes';
import {AppTabBar} from './tab.routes';
import {supabaseClient} from '../lib/libSupabase';
import {Session} from '@supabase/supabase-js';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {saveUserGoogle} from '@redux/reducers/User';

export function Routes() {
  const [session, setSession] = useState<Session | null>(null);
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({data: {session}}) => {
      if (session) {
        setSession(session);
      } else {
        dispatch(saveUserGoogle({}));
      }
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
      } else {
        dispatch(saveUserGoogle({}));
      }
    });
  }, []);

  if (user?.access_token) {
    return <AppTabBar />;
  }

  return <AuthRoutes />;
}
