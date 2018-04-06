var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '../main/webapp/resources/js');
var APP_DIR = path.resolve(__dirname, 'src/App');

var config = {
    entry: ['babel-polyfill', APP_DIR + '/index.jsx'],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel-loader'
            }
        ]
    }
};

module.exports = config;