const
    path = require("path"),
    webpack = require("webpack"),
    htmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanWebpackPlugin = require("clean-webpack-plugin"),
    config = require("./config"),
    HTMLPlugins = [],
    Entries = {};
config.HTMLDirs.forEach((page) => {

    const htmlPlugin = new htmlWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(__dirname, `${config.templatePath}${page}.html`),
        inject: "body",
        title: "驾校管理系统", 
        chunks: ["common", page],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    });
    HTMLPlugins.push(htmlPlugin);
    Entries[page] = path.resolve(__dirname, `${config.jsEntryPath}${page}.js`);
});


module.exports = {

    entry: Entries,

    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, config.outputPath)
    },

    devtool: "eval-source-map",

    devServer: {
        contentBase: config.outputPath, //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //再找不到文件的时候默认指向index.html,
        inline: true, //当源文件改变时会自动刷新页面
        hot: true, //热加载开启
        port: 8080 //	设置默认监听端口
    },
    resolve: {
        extensions: [".js", ".html", ".css", ".txt", ".less", ".ejs", ".json"],
        alias: {
            mainStyle: path.resolve(__dirname, "../drivingSchool/UI/style/main"),
            formStyle: path.resolve(__dirname, "../drivingSchool/UI/style/form"),
            js: path.resolve(__dirname, "../drivingSchool/BLL/js/component")
        }
    },
    module: {
        rules: [{
                test: /\.(less|css)?$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                            loader: "css-loader",
                            options: { minimize: true }
                        },
                        {
                            loader: "postcss-loader",
                            options: { plugins: (loader) => [require("autoprefixer")()] }
                        },
                        { loader: "less-loader" }
                    ]
                }),
                exclude: path.resolve(__dirname, "../node_modules")
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: path.resolve(__dirname, "../node_modules"),
                include: path.resolve(__dirname, "../drivingSchool/BLL/js"),
                options: {"presets": ["latest"] }
            },
            {
                test: /\.ejs$/,
                loader: "ejs-loader",
                include: path.resolve(__dirname, "./src/layer"),
                exclude: path.resolve(__dirname, "./node_modules")
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|cur)$/i,
                use: {
                    loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]",
                    options: {
                        publicPath:"/"
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["public"],{
            root: __dirname,//指定插件根目录位置
            verbose: true, //开启在控制台输出信息
            dry: false //启用删除文件
        }),
        new ExtractTextPlugin(config.cssOutputPath),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "[name].js"
        }),
        ...HTMLPlugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        })
    ]
};