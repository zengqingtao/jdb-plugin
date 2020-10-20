// 检查登录与发送消息
import { message } from "element-ui"
import { loginModalFn } from "../views/login/index"
import { activeAccountModalFn } from "../views/activeAccount/index"
import { salesVolumeHeadFn, salesVolumeBodyFn } from "../views/querySalesVolume/index"
import { weightOptionsFn, weightDataFn } from "../views/queryWeight/index"
import { flowInitFn, flowDataFn } from "../views/queryFlow/index"
import { chooseDateModalFn, commentTableFn } from "../views/queryComment/index"
import { commissionHeadFn, commissionBodyFn } from "../views/queryCps/commission/index"
import { couponHeadFn, couponBodyFn } from "../views/queryCps/coupon/index"
import { addAdvertisingFn } from "../views/advertising/addGeneralCoursesAdvertising/index"
import { chapterResourcesModalFn } from "../views/advertising/chapterAndResourcesList/index"
import { addSingleCourseAdvertisingFn } from "../views/advertising/addSingleCourseAdvertising/index"
import { evaluationModalFn, feedbackModalFn } from "../views/advertising/feedback"
import { announcement } from "../views/advertising/announcement/index"
import { addTopTimedAdvertisingFn } from "../views/advertising/addTopTimedAdvertising/index"
// 检查是否登录
const checkLogin = (type, skuId = '', courseName = '', courseId = '') => {
    chrome.runtime.sendMessage({ postData: { type: '-1' } },
        function(res) {
            let { token, isActive } = res
            if (!token) { //未登录
                loginModalFn()
            } else {
                let array = [10, 11]
                if (array.includes(type)) { //不需要激活的功能
                    switch (type) {
                        case 10:
                            feedbackModalFn(courseId)
                            break;
                        case 11:
                            evaluationModalFn(courseName, courseId)
                            break;
                    }
                } else {
                    if (isActive === 'false') return activeAccountModalFn()
                    switch (type) {
                        case 1:
                            salesVolumeHeadFn(skuId)
                            break;
                        case 2:
                            weightOptionsFn(skuId)
                            break;
                        case 4:
                            chooseDateModalFn(skuId)
                            break;
                        default:
                            request({ skuId, type })
                    }
                }
            }
        })
};
// 激活京店宝账号
const activeAccount = (activeCode) => {
    chrome.runtime.sendMessage({
            postData: { activeCode, type: '-2' }
        },
        function(res) {
            if (res.code === 200) {
                document.body.removeChild(document.getElementsByClassName("jdb-active-account-modal")[0])
                message.success("激活成功")
            } else {
                message.error(res.msg)
            }
        }
    )
};
// 向background发送参数，让background向服务器发送请求，background拿到数据后传递回来
const request = (params) => {
    let type = params.type
    switch (type) {
        case 3:
            flowInitFn()
            break;
        case 5:
            commissionHeadFn()
            break;
        case 6:
            couponHeadFn()
            break;

    }
    chrome.runtime.sendMessage({
            postData: {
                skuId: params.skuId || '',
                type: params.type,
                keyWord: params.keyWord || '',
                url: params.url || '',
                dateArr: params.dateArr || '', //查留评率-日期
                dimension: params.dimension || '', //统计维度
                courseId: params.courseId || '', //课程编号
                shopLevel: params.shopLevel || '', //京东商智-店铺级别
                courseName: params.courseName || '', //搜索书生广告的课程名称
                announcementImgUrl: params.announcementImgUrl || '', //商家后台广告
                score: params.score || '', //课程评分
                feedbackContent: params.feedbackContent || '', //反馈内容
            }
        },
        function(res) {
            switch (type) {
                case 1:
                    $(".jdb-salesVolume-search-button").removeClass("loading")
                    break;
                case 2:
                    $(".jdb-weight-search-btn").removeClass("jdb-weight-search-btn-loading")
                    break;
                case 4:
                    $(".jdb-comment-search-btn").removeClass("jdb-comment-search-btn-loading")
                    break;
            }
            let actions = {
                "200_1": () => {
                    salesVolumeBodyFn(res.data.data)
                },
                "200_2": () => {
                    weightDataFn(res.data.data)
                },
                "200_3": () => {
                    let dataList = Object.keys(res.data.data).map(
                        key => res.data.data[key]
                    )
                    dataList.length = dataList.length - 1
                    let currentData = res.data.data.last7Result.visitor ?
                        res.data.data.last7Result :
                        res.data.data.last15Result.visitor ?
                        res.data.data.last15Result :
                        res.data.data.last30Result
                    let days = res.data.data.last7Result.visitor ?
                        0 :
                        res.data.data.last15Result.visitor ?
                        1 :
                        2
                    if (dataList.every(item => item.visitor == null)) {
                        $(".jdb-flow-loading-box").text("暂无数据")
                    } else {
                        flowDataFn(currentData, days, res.data.data.description, dataList)
                    }
                },
                '200_4': () => {
                    commentTableFn(res.data.data.searchObj, res.data.data.comentDatas)
                },
                "200_5": () => {
                    res.data.data.spu.commissionList.length ? commissionBodyFn(res.data.data.spu.commissionList[0]) : $(".jdb-cps-commission-loading-td").text("暂无数据")
                },
                "200_6": () => {
                    couponBodyFn(res.data.data)
                },
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
                },
                "2003": () => {
                    request({ type: '-3' })
                    loginModalFn()
                },
                default: () => {
                    switch (type) {
                        case 0:
                            addBtnFn()
                            break;
                        case 3:
                            $(".jdb-flow-loading-box").text(res.data.msg)
                            break;
                        case 5:
                            $(".jdb-cps-commission-loading-td").text(res.data.msg)
                            break;
                        case 6:
                            $(".jdb-cps-coupon-loading-td").text(res.data.msg)
                            break;
                        default:
                            message.error(res.data.msg)
                    }
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
    activeAccount,
    request
}