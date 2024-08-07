import React from 'react';
import { Routes } from './src/routes';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LibReduxProvider } from './src/lib/libReduxProvider';

function App(): React.JSX.Element {

  return (
    <LibReduxProvider>
      <NavigationContainer>
          <StatusBar
            // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={'#000'}
          />
          <Routes/>
      </NavigationContainer>
    </LibReduxProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
