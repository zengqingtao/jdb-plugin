import { ajaxGet, ajaxPost } from '../ajax'
import config from "../../config/index"
let baseUrl = config.serveUrl

/**
 * 京东商智-保存店铺级别
 */
export const saveShopLevel = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-operation/saCourse/saveOrUpdateAccount', params)
};
/**
 * 获取总课程名称
 */
export const getAllCourseList = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-operation/saCourse/getAllCourseList', params)
};
/**
 * 根据课程id和手机账号获取课程信息
 */
export const getCourseInfo = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-operation/saCourse/getCourseInfo', params)
};
/**
 * 获取商家后台公告图片链接
 */
export const getAnnouncementImgUrl = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-operation/adsManage/getImgsUrl', params);
};
/**
 * 提交吐槽内容
 * @params moduleIds
 * @params content
 */
export const addFeedback = (params = {}) => {
    return ajaxPost(baseUrl + 'yushu-operation/feedback/addFeedback', params);
};
/**
 * 课程评价
 * @params moduleIds
 * @params content
 */
export const curriculumEvaluation = (params = {}) => {
    return ajaxPost(baseUrl + 'yushu-operation/saEstimate/saveOrUpdate', params);
};
/**
 * 获取公告信息
 */
export const showNotice = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-operation/notice/showNotice', params);
};
/**
 * 获取运营经理二维码
 */
export const getQRCode = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-operation/qrCode/getQRCode', params);
};
/**
 * 获取通知公告内容
 */
export const getNoticeList = (params = {}) => {
    return ajaxGet(baseUrl + 'yushu-operation/announcement/getNowProductNotice', params);
};