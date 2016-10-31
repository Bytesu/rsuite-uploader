const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
        title: 'Loading...',
        filename: 'index.html',
        template: 'example/index.html',
        inject: true,
        hash: true
    }),
];

const config = {
    entry: {
        index: path.join(__dirname, 'example')
    },
    output: {
        path: path.join(__dirname, 'assets'),
        filename: '[name].js',
        library: 'rsuite-upload',
        libraryTarget: 'umd'
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: [
                'babel?babelrc'
            ],
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        }, {
            test: /\.css/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }]
    }
};

if (process.env.NODE_TYPE === 'integration') {
    config.devServer = {
        proxy: {
            '/upload': {
                target: 'http://localhost:3030',
                secure: false
            }
        }
    };
};


module.exports = config;
