const path = require( 'path' );
const PWD = process.env.PWD;

module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: './build/app.js'
    },
    sassLoader: {
        includePaths: [
            './node_modules/'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test  : /\.png/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};