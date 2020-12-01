const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/index.tsx'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/public/index.html',
            filename: 'index.html',
            inject: 'body',
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'

    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx',
            '.spec.ts',
            '.spec.tsx',
            '.d.ts',
            '.graphql',
            '.gql',
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{loader:'ts-loader'}],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                    }
                    ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use:[{loader:'url-loader?limit=10000&name=img/[name].[ext]'}]
            }
        ]
    },
};