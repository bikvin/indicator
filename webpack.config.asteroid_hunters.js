const CopyPlugin = require('copy-webpack-plugin');


const path = require('path')

module.exports = {
    entry: {
        asteroid_hunters: './src/games/asteroid_hunters/index.js',


    },
    output: {
        path: path.resolve(__dirname, 'public/games/asteroid_hunters'),
        filename: 'bundle.js'
    }, 
    module: {
        rules: [
            {

            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                
            },

            
            },


         
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
              {
                from: 'assets/**/*',
    
                context: 'src/games/asteroid_hunters/',
              },
            ]
        }),
        
          
    ],

    devtool: "source-map",

};