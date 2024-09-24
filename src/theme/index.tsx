import React from 'react';
import {DefaultTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      base1: string;
    }
  }
}

interface baseColors extends MD3Colors {
  base1: string;
}
export const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1A1A1A',
    accent: '#FAFAFA',

    onBackground: '#303030',
    background: '#071952',
  },
};

export const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FAFAFA',
    accent: '#1A1A1A',

    onBackground: '#eeedec',
    background: '#071952',
  },
};
