const webpack = require('webpack');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'react-weui',
    'react-tap-event-plugin',
    'leancloud-storage'
];

module.exports = {
    output: {
        path: 'build',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
};