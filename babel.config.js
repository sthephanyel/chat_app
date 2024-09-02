module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: '.',
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          '@components': './src/components',
          '@redux': './src/redux',
          '@lib': './src/lib',
          '@routes': './src/routes',
          '@theme': './src/theme',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  }
};
