const webpack = require('webpack');
const path = require('path');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "util": require.resolve("util"),
        "url": require.resolve('url'),
        "https": require.resolve('https-browserify'),
        "http": require.resolve('stream-http'),
        "buffer": require.resolve('buffer'),
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    config.resolve.alias = {
        ['@Compartidos']: path.resolve(__dirname,'src/components/Compartidos/'),
        ['@assets']: path.resolve(__dirname, 'src/assets/'),
        ['@components']: path.resolve(__dirname, 'src/components'),
        ['@Mensajes']: path.resolve(__dirname, 'src/components/Mensajes/')
    }
    return config;
}