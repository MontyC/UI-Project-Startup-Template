const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pkg = require('./package.json');

let outputPath = '';

switch (process.env.NODE_ENV) {
    case 'build':
    case 'production':
        outputPath = path.join(__dirname, '../Globus.WYD/Globus.WYD.Web/');
        break;
    default:
        outputPath = path.join(__dirname, './');
}

const config = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './scripts/main.js',
        vendor: Object.keys(pkg.dependencies) //get npm vendors deps from config
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'scripts/[name].js',
        library: 'monty',
        libraryTarget: 'var'
    },
    resolve: {
        extensions: ['.ejs', '.js', '.jsx']
    },
    module: {
        rules: [
            // Scripts
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0', 'react']
                    }
                }
            },

            // Styles
            {
                test: /\.scss$/,
                exclude: [/node_modules/],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // The backup style loader
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'svg-fill-loader/encodeSharp',
                        'sass-loader'
                    ],
                    publicPath: '../'
                })
            },

            // Images
            {
                test: /\.(png|jpg|ico)$/,
                use: ['file-loader?name=[path][name].[ext]&context=./src']
            },
            {
                test: /\.svg$/,
                use: [
                    'svg-url-loader',
                    'svg-fill-loader'
                ],
            },

            // Fonts
            {
                test: /\.woff$/,
                use: ['url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]']
            },
            {
                test: /\.woff2$/,
                use: ['url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]']
            },
            {
                test: /\.[ot]tf$/,
                use: ['url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]']
            },
            {
                test: /\.eot$/,
                use: ['url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]']
            },

            // Template Files
            {
                test: /\.ejs$/,
                use: ['ejs-compiled-loader?variable=data']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles/app.css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [autoprefixer({
                        browsers: [
                            'last 2 versions',
                            'iOS >= 8',
                            'Safari >= 8'
                        ]
                    })];
                },
                sassLoader: {
                    includePaths: [path.resolve(__dirname, 'node_modules')]
                }
            }
        }),
        new CopyWebpackPlugin([{
            from: './images',
            to: 'images'
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'scripts/vendor.bundle.js'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        // Remove all unused locales from Moment
        //new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-au)$/)
        // Remove all locales from Moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};


// Conditional plugin options
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.SourceMapDevToolPlugin({
            exclude: ['scripts/vendor.bundle.js', 'styles/app.css']
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    );
}
else {
    config.devtool = 'inline-source-map';
}

module.exports = config;