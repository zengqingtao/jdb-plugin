const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const path = require("path");

// Generate pages object
const pagesObj = {};
const chromeName = ["popup", "options", "background"];

chromeName.forEach(name => {
    pagesObj[name] = {
        entry: `src/${name}/index.js`,
        template: "public/index.html",
        filename: `${name}.html`
    };
});

// 生成manifest文件
const manifest = {
    from: path.resolve("src/manifest.json"),
    to: `${path.resolve("dist")}/manifest.json`
};
//旧版的manifest.json分开发环境和正式环境的，因为内容是一样的，后来觉得没必要了，就不分了
// const manifest =
//     process.env.NODE_ENV === "production" ? {
//         from: path.resolve("src/manifest.production.json"),
//         to: `${path.resolve("dist")}/manifest.json`
//     } : {
//         from: path.resolve("src/manifest.development.json"),
//         to: `${path.resolve("dist")}/manifest.json`
//     };

const plugins = [
    CopyWebpackPlugin([manifest]),
];

// 开发环境将热加载文件复制到dist文件夹
if (process.env.NODE_ENV !== "production") {
    plugins.push(
        CopyWebpackPlugin([{
                from: path.resolve("src/utils/hot-reload.js"),
                to: path.resolve("dist")
            },
            {
                from: path.resolve("src/assets/images"),
                to: path.resolve("dist/assets/images")
            },
        ])
    );
}

// 生产环境打包dist为zip
if (process.env.NODE_ENV === "production") {
    plugins.push(
        new ZipPlugin({
            path: path.resolve("dist"),
            filename: "dist.zip"
        }),
        CopyWebpackPlugin([{
            from: path.resolve("src/assets/images"),
            to: path.resolve("dist/assets/images")
        }, ])
    );
}

const config = {
    pages: pagesObj,
    // // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,

    configureWebpack: {
        entry: {
            goodsList: "./src/matches/goodsList/index.js",
            goodsDetails: "./src/matches/goodsDetails/index.js",
            searchScholar: "./src/matches/searchScholar/index.js",
        },
        output: {
            filename: "js/[name].js"
        },
        plugins: plugins
    },
    css: {
        extract: {
            filename: "css/[name].css",
            // chunkFilename: 'css/[name].css'
        }
    },
    chainWebpack: config => {
        // 处理字体文件名，去除hash值
        const fontsRule = config.module.rule("fonts");
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        fontsRule.uses.clear();
        fontsRule
            .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
            .use("url")
            .loader("url-loader")
            .options({
                limit: 1000,
                name: "fonts/[name].[ext]"
            });

        // 查看打包组件大小情况
        if (process.env.npm_config_report) {
            config
                .plugin("webpack-bundle-analyzer")
                .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
        }
    }
};
module.exports = config