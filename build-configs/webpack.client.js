const HtmlWebpackPlugin = require('html-webpack-plugin');

const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

const Constants = require('./webpack.constants');

/**
 * This is a client config which should be merged on top of common config
 */
let config = {
    entry: `${Constants.SOURCE_PATH}main.ts`,
    output: {
        path: `${Constants.BUILD_PATH}/`
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.html$/, loader: 'html-loader?-minimize' },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff?2$|\.ttf$|\.eot$/,
                loader: `file-loader?name=assets/[name]-[hash].[ext]`
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader!postcss-loader'),
                include: path.resolve(`${Constants.SOURCE_PATH}styles`)
            },
        ]
    },
    target: 'web',
    plugins: [
        new HtmlWebpackPlugin({
            chunkSortMode: 'dependency',
            filename: `index.html`,
            hash: false,
            inject: 'body',
            minify: false,
            template: `${Constants.SOURCE_PATH}index.html`
            // favicon: './src/assets/favicon.ico'
        }),
        new BaseHrefWebpackPlugin({
            baseHref: Constants.BASE_URL
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: {
                    plugins: [autoprefixer({ browsers: ['last 3 versions'] })]
                }
            }
        }),
        new ScriptExtPlugin({
            defaultAttribute: 'defer'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};

//=====================================
//  DEVELOPMENT
//-------------------------------------
if (Constants.ENV_DEVELOPMENT) {
    console.log('Building Webpack DEV config...');

    config.output.filename = `scripts/client.js`;
    config.output.publicPath = Constants.LOCAL_PATH;


    config.plugins.push(
        new ExtractTextPlugin(`styles/main.css`)
    );
}

//=====================================
//  PRODUCTION
//-------------------------------------
if (Constants.ENV_PRODUCTION) {
    console.log('Building Webpack PROD config...');

    config.output.filename = `scripts/client.[chunkhash].js`;
    config.output.publicPath = Constants.CDN_PATH;

    config.plugins.push(
        new WebpackMd5Hash(),
        new ExtractTextPlugin(`styles/main.[contenthash].css`),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            comments: false,
            compress: {
                dead_code: true, // eslint-disable-line camelcase
                screw_ie8: true, // eslint-disable-line camelcase
                unused: true,
                warnings: false
            },
            sourceMap: false
        })
    );
}

module.exports = config;
