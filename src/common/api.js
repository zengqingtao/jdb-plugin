import { ajaxGet, ajaxPost } from './ajax'
import config from "../config/index"

let baseUrl = config.serveUrl

/**
 * 用户登录
 */
export const login = (params = {}) => {
    return ajaxPost(baseUrl + 'yushu-server/newLogin', params)
};
/**
 * 检查登录状态
 */
export const checkLogin = (params = {}, token = '') => {
    return ajaxGet(baseUrl + 'yushu-server/checkLogin', params, token)
};
/**
 * 退出登录
 */
export const logout = () => {
    return ajaxGet(baseUrl + 'yushu-server/logout')
};

/**
 * 查销量-查询每日成交订单量
 * @params  skuId String
 */
export const searchSkuMultiDayAccurateSale = (params = {}, token = '') => {
    return ajaxGet(baseUrl + 'yushu-dzgj-plugin/plugin/sale/searchSkuMultiDayAccurateSale', params, token);
};

/**
 * 查留评率-查留评和查忽略
 * @params String skuId
 */
export const searchStayAndIgnoreComment = (params = {}, token = '') => {
    return ajaxGet(baseUrl + 'yushu-dzgj-plugin/plugin/comment/searchStayAndIgnoreComment', params, token)
};
/**
 * @description 判断京店宝账号是否已激活
 */
export const isActiveAccount = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-dzgj-plugin/plugin/activeCode/isActive', params)
};
/**
 * @description 激活京店宝账号
 * @params activeCode 激活码
 */
export const activeAccount = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-dzgj-plugin/plugin/activeCode/activeForCode', params)
};
/**
 * @description 获取商品主图下载码
 */
export const downloadSkuMainImage = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-dzgj-plugin/plugin/image/downloadSkuMainImage', params)
};
/**
 * @description 根据下载码下载文件
 */
export const downloadFileByCode = baseUrl + 'yushu-dzgj-plugin/plugin/download/downloadFileByCode';

/**
 * @description 判断插件是否需升级
 */
export const pluginUpGrade = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-dzgj-plugin/pluginVersions/whetherUpgrades', params)
};