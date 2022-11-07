const HtmlWebPack=require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const Copy = require("copy-webpack-plugin");
module.exports={
    mode:'development',
    
    output:{
        clean:true
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
        ]
    },

    optimization:{

    },

    plugins:[
        new HtmlWebPack({
            title:'mi webpack app',
            //filename:'index.html'
            template:'./src/index.html'
        }),
        new MiniCssExtract({
            filename:'[name].css',
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