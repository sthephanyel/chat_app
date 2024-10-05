import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

export default function Contacts() {
  const {editProfile} = useSelector((state: RootState) => state.profile);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#000'}}>Contacts</Text>
        <Text style={{color: '#000'}}>{editProfile.toString()}</Text>
      </View>
    </SafeAreaView>
  );
}
