


const path = require('path')

module.exports = {
    entry: {
        asteroid_hunters: './src/games/battleship/index.js',


    },
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
            test: /\.(png|svg|jpg|jpeg|gif|mp3|ogg)$/i,
            type: 'asset/resource',
          },
        ]
    },
    devtool: "eval-source-map",
}