module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['.'],
                    alias: {
                        '@': './src',
                        'react-native-track-player': './__mocks__/react-native-track-player.js',
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
