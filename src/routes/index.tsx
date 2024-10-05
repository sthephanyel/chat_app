import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {AuthRoutes} from './auth.routes';
import {HomeRoutes} from './home.routes';
import {AppTabBar} from './tab.routes';
import {supabaseClient} from '../lib/libSupabase';
import {Session} from '@supabase/supabase-js';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

export function Routes() {
  const [session, setSession] = useState<Session | null>(null);
  const {user} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (user?.access_token != '') {
    return <AppTabBar />;
  }

  return <AuthRoutes />;
}
