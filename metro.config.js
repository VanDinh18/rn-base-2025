const { withNativeWind } = require('nativewind/metro');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const defaultConfigs = getDefaultConfig(__dirname, { isCSSEnabled: true });

const { assetExts, sourceExts } = defaultConfigs.resolver;

let configs = mergeConfig(defaultConfigs, {
  transformer: {
    babelTransformerPath: require.resolve(
        'react-native-svg-transformer/react-native'
      ),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
});

configs = wrapWithReanimatedMetroConfig(configs);

module.exports = withNativeWind(configs, { input: './global.css' });
