import { ajaxGet, ajaxPost } from './ajax'
let baseUrl =
    process.env.NODE_ENV === 'production' ?
    'https://api.jingdianbao.cn/' :
    'https://local.yushutec.com:18443/jdb_api/'

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
 * 获取会员信息
 */
export const getJdbUserVip = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-server/jdbUserVip/getUserVipInfo', params);
};
/**
 * 查销量-统计维度-sku
 * @params skuId String
 */
export const skuSalesValues = (params = {}, token = '') => {
    return ajaxGet(baseUrl + 'yushu-jdapi-v1/p/salesValues', params, token)
};
/**
 * 查销量-统计维度-spu
 * @params  skuId String
 */
export const spuSalesValues = (params = {}, token = '') => {
    return ajaxGet(baseUrl + 'yushu-jdapi-v1/p/spuSalesValues', params, token);
};
/**
 * 查流量
 * @params skuId
 * @params flowFilterType 2
 * @params module 3
 */
export const searchDmpMultiDateData = (params = {}, token = '') => {
    return ajaxPost(
        baseUrl + 'yushu-composite/dmp/searchDmpMultiDateData',
        params,
        token
    )
};
/**
 * 查权重
 * @params sku
 * @params keyword 2
 */
export const searchWeights = (params = {}, token = '') => {
    return ajaxPost(baseUrl + 'yushu-composite/dmp/searchWeights', params, token)
};
/**
 * 评论分析
 * @params String skuId
 */
export const assessAnalysis = (params = {}, token = '') => {
    return ajaxGet(baseUrl + 'yushu-jdapi-v1/rank/searchComment', params, token)
};
/**
 * 查留评率-忽略评价数
 * @params skuId int
 * @params startDate string
 * @params edndDate string
 */
export const getIgnoreCommentCount = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-jdapi-v1/rank/getIgnoreCommentCount', params)
};
/**
 * description cps查询-根据sku或者spu查询佣金和优惠券
 * @params sku String
 */
export const cpsSearchBySkuOrSpu = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-composite/cps/cpsSearchBySkuOrSpu', params)
};
/**
 * @description 判断京店宝账号是否已激活
 */
export const isActiveAccount = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-operation/code/isActive', params)
};
/**
 * @description 激活京店宝账号
 * @params activeCode 激活码
 */
export const activeAccount = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-operation/code/active', params)
};