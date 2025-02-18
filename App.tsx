import React from 'react';
import {Routes} from './src/routes';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {LibReduxProvider} from './src/lib/libReduxProvider';
import {LibReduxPersister} from './src/lib/libReduxPersister';
import {PaperProvider} from 'react-native-paper';
import {darkTheme, lightTheme} from './src/theme';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  const scheme = useColorScheme();

  return (
    <LibReduxProvider>
      <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
        <NavigationContainer>
          <LibReduxPersister>
            <StatusBar
              // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={'#000'}
            />
            <Routes />
            <Toast />
          </LibReduxPersister>
        </NavigationContainer>
      </PaperProvider>
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
