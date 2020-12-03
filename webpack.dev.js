const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const dotenv = require('dotenv');
const path = require('path');
const DotenvWebpack = require('dotenv-webpack');
const rootDir = path.resolve(__dirname, './');
const envFile = '.env';
const envVars = dotenv.config({ path: path.resolve(rootDir,envFile ) });
if (envVars.error) {
    throw envVars.error;
}

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        compress: true,
        port: 9000,
        hot: true
    },
    plugins: [
        new DotenvWebpack({
            path: path.resolve(rootDir, envFile),
            safe: true,
        }),
    ]
});