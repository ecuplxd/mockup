const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/ts/crx.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'crx')
    },

    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader"
        }, {
            test: /\.(css|less)$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader?module&localIdentName=[local]-[hash:base64:5]"
            }, {
                loader: "postcss-loader"
            }, {
                loader: "less-loader"
            }]
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};
