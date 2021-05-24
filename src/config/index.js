import manifest from "../manifest.json"
let config = {}
switch (process.env.NODE_ENV) {
    // 正式环境
    case 'production':
        config = {
            serveUrl: 'https://api.jingdianbao.cn/',
            dzgjUrl: 'https://www.dianzhangguanjia.com/#/',
            pluginIframeUrl: 'https://plugin.dianzhangguanjia.com/#/',
        }
        break;
        // 测试环境
    case 'test':
        config = {
            serveUrl: 'https://jdbapi.yushutec.com:18443/',
            dzgjUrl: 'https://jdcm.yushutec.com:18443/#/',
            pluginIframeUrl: 'https://plugin.yushutec.com:18443/#/',
        }
        break;
        // 开发环境
    case 'development':
        config = {
            serveUrl: 'https://jdbapi.yushutec.com:18443/',
            dzgjUrl: 'https://jdcm.yushutec.com:18443/#/',
            pluginIframeUrl: 'http://localhost:8080/#/',
        }
        break;
}
config.version = manifest.version
export default config