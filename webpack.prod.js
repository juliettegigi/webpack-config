const HtmlWebPack=require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const Copy = require("copy-webpack-plugin");

const CssMinimizer=require('css-minimizer-webpack-plugin');
const Terser=require('terser-webpack-plugin');

module.exports={
    mode:'production',
    
    output:{
        clean:true,
        filename:'main.[contenthash].js'
    },
    module:{
        rules:[
            {
                test:/\.html$/,
                loader:'html-loader',
                options:{
                    sources:false,
                }
            },
            {
                test: /\.css$/,
                exclude:/styles.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/styles.css$/,
                use:[MiniCssExtract.loader,'css-loader'],
            },
            {
                test:/\.(png|jpe?g|gif)$/,
                loader:'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]

    },

    plugins:[
        new HtmlWebPack({
            title:'mi webpack app',
            //filename:'index.html'
            template:'./src/index.html'
        }),
        new MiniCssExtract({
            filename:'[name].[fullhash].css',
            // filename: '[name].css',   // así sería el mismo nombre q le pusimos
           // filename: '[name].[fullhash].css',   // eso crea un hash único, un nombre main.dsadsadsda.css  ...y esto hace que los navegadores web de los clientes no mantengan en caché a este archivo
            //filename:'nuevo-estilo.css'
            ignoreOrder:false, //para q ignore el orden de las importacionens
        }),

        new Copy({
            patterns: [
                { from: "src/assets/", to: "assets/" },
                
              ],
        })
    ],
}