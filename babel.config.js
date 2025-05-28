module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: './',
        extensions: [
          '.ios.js',
          '.android.js',
          '.ts',
          ',tsx',
          '.js',
          '.json',
          '.tsx',
          '.jsx',
        ],
        alias: {
          '^@/(.+)': ([, name]) => `./src/${name}`,
          '@assets': './assets',
        },
      },
    ],
    'react-native-reanimated/plugin'
  ],
};
