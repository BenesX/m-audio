const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'mAudio.min.js',
        library: 'MAudio',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.resolve(__dirname, "dist/fonts/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.resolve(__dirname, "dist/fonts/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.css$/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    externals: {
        MAudio: {
            root: "MAudio",
            commonjs2: "MAudio",
            commonjs: "MAudio",
            amd: "MAudio"
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'mAudio.min.css',
            chunkFilename: 'dist/css/mAudio.min.css'
        }),
        new OptimizeCssAssetsPlugin()
    ]
}
