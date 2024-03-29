const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const plugins = [
    new ExtractTextPlugin("styles.css")
];

module.exports = {
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
