


const path = require('path')

module.exports = {
    entry: './src/games/battleship/index.js',
    output: {
        path: path.resolve(__dirname, 'public/games/battleship'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        },
        {
            test: /\.(gif|png|jpe?g|svg|xml)$/i,
            use: "file-loader"
        }]
    },
    devtool: 'source-map'
}