var path = require('path');

module.exports = {
    entry: './ui/index.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devServer: {
        contentBase: "./",
        inline: true,
        open: true
    }
};
