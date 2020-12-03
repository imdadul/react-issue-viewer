const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
module.exports = merge(common, {
    mode: 'production',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        compress: true,
        port: 9000
    },
    plugins: [
        new EnvironmentPlugin(['REACT_APP_API_URL', 'REACT_APP_TOKEN'])
    ],
});