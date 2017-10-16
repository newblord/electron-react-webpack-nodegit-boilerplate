var path = require('path');
var webpack = require('webpack');
var fs = require("fs");

// var nodeModules = {};
// fs.readdirSync("node_modules")
//   .filter(function(x) {
//     return [".bin"].indexOf(x) === -1;
//   })
//   .forEach(function(mod) {
//       if(mod != "jquery")
//       {
//         nodeModules[mod] = "commonjs " + mod;
//       }
//   });

// console.log(nodeModules);

module.exports = {
    context: __dirname,
    entry: ['jquery','babel-polyfill', './app/index.html', './app/entry.js'],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    devtool: "source-map",
    target: "electron",
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    externals: {
        nodegit: 'commonjs nodegit'
    },
    module: {
        loaders: [
            // {
            //     test: /\.node$/,
            //     use: 'node-loader'
            // },
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: "file-loader?name=[name].[ext]",
            },
            {
                test: /\.global\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ]
            },
            {
                test: /^((?!\.global).)*\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        }
                    },
                ]
            },
            // Add SASS support  - compile all .global.scss files and pipe it to style.css
            {
                test: /\.global\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            // Add SASS support  - compile all other .scss files and pipe it to style.css
            {
                test: /^((?!\.global).)*\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/fonts/[name].[ext]'
                }

            }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};