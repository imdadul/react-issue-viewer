const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new EnvironmentPlugin(['REACT_APP_API_URL', 'REACT_APP_TOKEN'])
    ],
});