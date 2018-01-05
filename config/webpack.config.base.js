const
    path = require("path"),
    webpack = require("webpack"),
    htmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanWebpackPlugin = require("clean-webpack-plugin"),
    OpenBrowserPlugin = require("open-browser-webpack-plugin");

const config = require("./config");

const HTMLPlugins = [];

const Entries = {};

config.HTMLDirs.forEach((page) => {
    
    const pageName = page.split("/")[1];

    const htmlPlugin = new htmlWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(__dirname, `${config.templatePath}${page}.html`),
        inject: "body",
        hash: true,
        title: "驾校管理系统", //通过<%= htmlWebpackPlugin.options.title %>引用
        favicon: `${config.imgEntryPath}favicon.ico`,
        chunks: [pageName, "commons"],
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
    Entries[pageName] = path.resolve(__dirname, `${config.jsEntryPath}${pageName}.js`);
});


module.exports = {

    entry: Entries,

    output: {
        path: path.resolve(__dirname, config.outputPath),
        filename: "js/[name].bundle.[hash].js",
        chunkFilename: "js/[id].chunk.js"
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
        extensions: [".js", ".html", ".css", ".txt", "less", "ejs", "json"],

        //模块别名定义，直接 require('Temp') 即可,方便后续直接引用别名
        alias: {
            Temp: path.resolve(__dirname, "src/templates/")
        }
    },
    module: {
        rules: [{
                test: /\.(less|css)?$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    publicPath: config.cssPublicPath,
                    use: [{
                            loader: "css-loader?modules",
                            options: {
                                importLoaders: 1,
                                minimize: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: { plugins: (loader) => [require("autoprefixer")()] }
                        },
                        { loader: "less-loader" }
                    ]
                }),
                exclude: path.resolve(__dirname, "./node_modules")
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: path.resolve(__dirname, "./node_modules"),
                include: path.resolve(__dirname, "./src"),
                options: { "presets": ["latest"] }
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                include: path.resolve(__dirname, "./src/layer"),
                exclude: path.resolve(__dirname, "./node_modules")
            },
            {
                test: /\.ejs$/,
                loader: "ejs-loader",
                include: path.resolve(__dirname, "./src/layer"),
                exclude: path.resolve(__dirname, "./node_modules")
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|otf)$/i,
                loaders: [
                    "file-loader",
                    "url-loader?limit=8192", {
                        loader: "image-webpack-loader",
                        options: {
                            gifsicle: { interlaced: false }, optipng: { optimizationLevel: 7 }, pngquant: { quality: "65-90", speed: 4 }, mozjpeg: { progressive: true, quality: 65 }, webp: { quality: 75 }
                        }
                    }
                ],
                exclude: path.resolve(__dirname, "./node_modules")

            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [

        new CleanWebpackPlugin(["public"]),

        new ExtractTextPlugin(config.cssOutputPath),

        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }), 

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        }),

        new OpenBrowserPlugin({ url: "http://localhost:8080" }),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "[name].bundle.js",
            chunks: Entries,
            minChunks: Entries.length
        }),
        ...HTMLPlugins
    ]
};