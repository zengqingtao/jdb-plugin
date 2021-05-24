// 检查登录与发送消息
import { message } from "element-ui"
import { loginModalFn } from "../views/login/index"
import { addAdvertisingFn } from "../views/advertising/addGeneralCoursesAdvertising/index"
import { chapterResourcesModalFn } from "../views/advertising/chapterAndResourcesList/index"
import { addSingleCourseAdvertisingFn } from "../views/advertising/addSingleCourseAdvertising/index"
import { evaluationModalFn, feedbackModalFn } from "../views/advertising/feedback"
import { announcement } from "../views/advertising/announcement/index"
import { addTopTimedAdvertisingFn, addTopNoticeFn } from "../views/advertising/addTopTimedAdvertising/index"
import { addCourseRegisterAdFn } from "../views/advertising/addCourseRegisterAdvertising"
import { downloadImageFn } from "../views/downloadImage/index"
import { iframeCommonModal } from "../views/modal/commonModal/index"
import { dzAdviserModal } from "../views/modal/dzAdviserModal/index"
import { copySkuIdModal } from "../views/modal/copySkuIdModal"

// 检查是否登录
const checkLogin = (type, skuId = '', courseName = '', courseId = '') => {
    chrome.runtime.sendMessage({ postData: { type: '-1' } },
        function(res) {
            let { token, isActive, account } = res
            if (!token) { //未登录
                loginModalFn()
            } else {
                let array = ['10', '11']
                if (array.includes(type)) { //不需要激活的功能
                    switch (type) {
                        case '10':
                            feedbackModalFn(courseId)
                            break;
                        case '11':
                            evaluationModalFn(courseName, courseId)
                            break;
                    }
                } else {
                    if (isActive.code === 2003) {
                        loginModalFn()
                    } else if (isActive.code === 200) {
                        // isActive.data为true,可使用功能，为false弹出激活弹窗
                        if (isActive.data) {
                            switch (type) {
                                case 'copySkuId':
                                    copySkuIdModal({ skuId, path: 'copySkuId' })
                                    break;
                                case 'queryRanking':
                                    iframeCommonModal({ skuId, path: 'dataQuery/queryRanking' })
                                    break;
                                case 'querySalesVolume':
                                    iframeCommonModal({ skuId, path: 'dataQuery/salesVolume' })
                                    break;
                                case 'queryOrder':
                                    iframeCommonModal({ skuId, path: 'dataQuery/queryOrder' })
                                    break;
                                case 'queryWeight':
                                    iframeCommonModal({ skuId, path: 'dataQuery/queryWeight' })
                                    break;
                                case 'queryFlow':
                                    iframeCommonModal({ skuId, path: 'dataQuery/queryFlow' })
                                    break;
                                case 'queryComment':
                                    iframeCommonModal({ skuId, path: 'dataQuery/queryComment' })
                                    break;
                                case 'queryPortrait':
                                    iframeCommonModal({ skuId, path: 'dataQuery/queryPortrait' })
                                    break;
                                case 'queryCps':
                                    iframeCommonModal({ skuId, path: 'dataQuery/queryCps' })
                                    break;
                                case 'commentAnalysis':
                                    iframeCommonModal({ skuId, path: 'dataQuery/commentAnalysis' })
                                    break;
                                case 'downloadComment':
                                    iframeCommonModal({ skuId, path: 'dataQuery/downloadComment' })
                                    break;

                                case '20':
                                    downloadImageFn(skuId)
                                    break;
                                case 'pitProductionCalc':
                                    iframeCommonModal({ skuId, path: 'dataQuery/pitProductionCalc' })
                                    break;
                                case 'queryExpress':
                                    iframeCommonModal({ skuId, path: 'dataQuery/queryExpress' })
                                    break;
                                case 'secondKillAnalysis':
                                    iframeCommonModal({ skuId, path: 'dataQuery/secondKillAnalysis' })
                                    break;
                                case 'searchAnalysis':
                                    iframeCommonModal({ skuId, path: 'dataQuery/searchAnalysis' })
                                    break;
                                default:
                                    request({ skuId, type })
                            }
                        } else {
                            dzAdviserModal({ path: 'dzAdviser' })
                        }
                    } else {
                        message.error(isActive.msg)
                    }
                }
            }
        })
};

// 向background发送参数，让background向服务器发送请求，background拿到数据后传递回来
const request = (params) => {
    let type = params.type
    chrome.runtime.sendMessage({
            postData: {
                skuId: params.skuId || '',
                type: params.type,
                url: params.url || '',
                courseId: params.courseId || '', //课程编号
                shopLevel: params.shopLevel || '', //京东商智-店铺级别
                courseName: params.courseName || '', //搜索书生广告的课程名称
                announcementImgUrl: params.announcementImgUrl || '', //商家后台广告
                score: params.score || '', //课程评分
                feedbackContent: params.feedbackContent || '', //反馈内容
            }
        },
        function(res) {
            let actions = {
                "200_7": () => {
                    res.data.data.length !== 0 ? addAdvertisingFn(res.data.data) : ''
                },
                "200_8": () => {
                    let advertisingPosition = ['京东商智', '京东快车', '京东海投', '京东直投', '购物触点', '京挑客', '短视频', '商家后台', '京东直播', '京东客服']
                    if (advertisingPosition.includes(params.advertising)) {
                        res.data.data.chapterInfoList.length !== 0 ? addSingleCourseAdvertisingFn(res.data.data, params.advertising) : ''
                    } else {
                        chapterResourcesModalFn(res.data.data, params.courseName, params.courseId)
                    }
                },
                "200_10": () => {
                    res.data.data.length !== 0 ? announcement(res.data.data) : ''
                },
                "200_11": () => {
                    message.success("提交成功")
                    document.body.removeChild(document.getElementsByClassName("jdb-evaluation-modal")[0])
                },
                "200_12": () => {
                    message.success("提交成功")
                    document.body.removeChild(document.getElementsByClassName("jdb-feedback-modal")[0])
                },
                "200_13": () => {
                    res.data.data.length !== 0 ? addTopTimedAdvertisingFn(res.data.data[0]) : ''
                    request({ type: 17 })
                },
                "200_15": () => {
                    res.data.data.length !== 0 ? addCourseRegisterAdFn(res.data.data) : ''
                },
                "200_17": () => {
                    res.data.data.length !== 0 ? addTopNoticeFn(res.data.data) : ''
                },
                "2003": () => {
                    request({ type: '-3' })
                    loginModalFn()
                },
                default: () => {
                    message.error(res.data.msg)
                }
            }
            let action = ''
            if (res.data.code === '2003') {
                action = actions['2003']
            } else {
                action = actions[`${res.data.code}_${type}`] || actions[`default`]
            }
            action.call(this)
        }
    )
}
export {
    checkLogin,
    request
}