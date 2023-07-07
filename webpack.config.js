'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: 'development', // mode is set to development -- but in package.json build script has --mode production set
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        static: path.resolve(__dirname, 'public'),
        port: 8080,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            meta: {
                'description': { name: 'description', contnet: 'Creating a home with threejs webgl library.' },
                'keyword': { name: 'keywords', content: '...' },
                'og:title': { property: 'og:title', content: '...' },
                'og:description': { property: 'og:description', this.meta.description },
                'og:type': { property: 'og:type', content: 'website' },
                'og:url': { property: 'og:url', content: '...' },
                'og:image': { property: 'og:image', content: '...' },
                'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
                'twitter:title': { name: 'twitter:title', content: '...' },
                'twitter:description': { name: 'twitter:description', content: '...' },
                'twitter:image': { name: 'twitter:image', content: '...' }
            },
            inject: 'body'
        }),
        // make sure to include the plugin!
        // new VueLoaderPlugin() disabled
    ],
    module: {
        rules: [{
                test: /\.(scss)$/,
                use: [{
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: 'style-loader'
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader'
                    },
                    /* {
                       // Loader for webpack to process CSS with PostCSS
                       loader: 'postcss-loader',
                       options: {
                         postcssOptions: {
                           plugins: () => [
                             autoprefixer
                           ]
                         }
                       }
                     },*/
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    }
                ]
            },
            /*{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },*/
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },

            // {
            //     test: /\.(js)$/,

            // }

        ]


    }
}