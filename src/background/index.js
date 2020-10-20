/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import {
    skuSalesValues,
    spuSalesValues,
    searchDmpMultiDateData,
    searchWeights,
    assessAnalysis,
    getIgnoreCommentCount,
    login,
    getJdbUserVip,
    cpsSearchBySkuOrSpu,
    isActiveAccount,
    activeAccount
} from '../common/api'
import { getAllCourseList, getCourseInfo, saveShopLevel, getAnnouncementImgUrl, curriculumEvaluation, addFeedback, showNotice } from "../common/api/searchScholar"
import { message } from 'element-ui'



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
    let params = request.postData;
    /**
     * -2:激活京店宝账号 -1：检查是否登录 0：登录 1：查销量 2：查权重 3：查流量 4：查留评率 5:cps查询 6:cps查询
     * 7:获取总课程列表 8:获取课程章节和资源列表 9:保存店铺级别 10:商家后台公告图片链接,11：课程评价,12：意见反馈
     * 13:商家后台首页顶部的广告
     */
    let options = {
        '-3': () => {
            // token失效
            localStorage.clear()
        },
        '-2': () => {
            activeAccount({ activeCode: params.activeCode }).then(res => {
                res.data.code === 200 ? localStorage.setItem("isActiveAccount", true) : ''
                sendResponse(res.data)
            })
        },
        '-1': async() => {
            let isActive = localStorage.getItem("isActiveAccount") || ''
            if (isActive === '') {
                await isActiveAccount().then(res => {
                    if (res.data.code === 200) {
                        localStorage.setItem('isActiveAccount', res.data.data)
                        isActive = localStorage.getItem("isActiveAccount")
                    }
                })
                sendResponse({ token, isActive })
            } else {
                sendResponse({ token, isActive })
            }
        },
        '0': () => {
            let loginParams = {
                phoneNumber: params.phone,
                password: params.password,
                username: params.phone
            }
            login(loginParams).then(res => {
                res = res.data
                if (res.code === 200) {
                    localStorage.setItem("token", res.data.token)
                    let userInfo = {};
                    userInfo.username = res.data.username;
                    getJdbUserVip().then(infoRes => {
                        infoRes = infoRes.data
                        if (infoRes.code === 200) {
                            userInfo.vipLevel = infoRes.data.vipLevel;
                            userInfo.vipValidityPeriod = infoRes.data.endDate;
                            localStorage.setItem("userInfo", JSON.stringify(userInfo));
                        } else {
                            message.error(infoRes.msg)
                        }
                    })
                }
                sendResponse(res)
            })
        },
        '1': () => {
            params.dimension === '0' ?
                skuSalesValues({ skuId: params.skuId, isManagerHousekeeper: "1" }, token).then(response => {
                    sendResponse(response)
                }) : spuSalesValues({ skuId: params.skuId, isManagerHousekeeper: "1" }, token).then(response => {
                    sendResponse(response)
                })
        },
        '2': () => {
            searchWeights({ skuId: params.skuId, keyword: params.keyWord, isManagerHousekeeper: "1" },
                token
            ).then(res => {
                sendResponse(res)
            })
        },
        '3': () => {
            searchDmpMultiDateData({ sku: params.skuId, flowFilterType: 2, module: 3, isManagerHousekeeper: "1" },
                token
            ).then(res => sendResponse(res))
        },
        '4': () => {
            let requestParams = {
                skuId: params.skuId,
                startDate: params.dateArr[0],
                endDate: params.dateArr[1],
                skuComment: params.dimension,
                isManagerHousekeeper: "1"
            }
            assessAnalysis(requestParams, token).then(assessRes => {
                if (assessRes.data.code === 200) {
                    getIgnoreCommentCount(requestParams, token).then(ignoreRes => {
                        if (ignoreRes.data.code === 200) {
                            let ignoreCount = ignoreRes.data.data
                            let leaveReview = Object.keys(assessRes.data.data.map)
                                .map(key => assessRes.data.data.map[key])
                                .reduce((a, b) => a + b)
                            let totalCount = ignoreCount + leaveReview
                            let leaveReviewRate =
                                leaveReview / totalCount ?
                                ((leaveReview / totalCount) * 100).toFixed(0) :
                                0
                            assessRes.data.data.searchObj = {
                                ignoreCount,
                                leaveReview,
                                totalCount,
                                leaveReviewRate
                            }
                            sendResponse(assessRes)
                        } else {
                            sendResponse(ignoreRes)
                        }
                    })
                } else {
                    sendResponse(assessRes)
                }
            })
        },
        '5': () => { //cps查询（和下面的一样,目的是拿到佣金信息）
            let cpsParams = {
                isManagerHousekeeper: '1',
                skuOrSkuUrl: params.skuId,
                type: 2, //统计维度sku:1 spu:2
                searchType: 1 //(点击次数统计使用到)查佣金 1 查优惠券2
            }
            cpsSearchBySkuOrSpu(cpsParams, token).then(cpsRes => {
                sendResponse(cpsRes)
            })
        },
        "6": () => { //cps查询 （目的是拿到优惠券信息）
            let cpsParams = {
                isManagerHousekeeper: '1',
                skuOrSkuUrl: params.skuId,
                type: 2, //统计维度sku:1 spu:2
                searchType: 2 //(点击次数统计使用到)查佣金 1 查优惠券2
            }
            cpsSearchBySkuOrSpu(cpsParams, token).then(cpsRes => {
                sendResponse(cpsRes)
            })
        },
        "7": () => {
            getAllCourseList().then(res => {
                sendResponse(res)
            })
        },
        "8": () => {
            let p = {
                courseId: params.courseId,
                account: ''
            }
            if (localStorage.getItem("userInfo")) {
                p.account = JSON.parse(localStorage.getItem("userInfo")).username
            }
            getCourseInfo(p).then(res => {
                sendResponse(res)
            })
        },
        "9": () => {
            if (token !== '') {
                saveShopLevel({ level: params.shopLevel })
            }
        },
        "10": () => {
            getAnnouncementImgUrl({ location: 11 }).then(res => {
                sendResponse(res)
            })
        },
        "11": () => {
            let params11 = {
                courseName: params.courseName,
                courseId: params.courseId,
                score: params.score,
                phone: JSON.parse(localStorage.getItem("userInfo")).username
            }
            curriculumEvaluation(params11).then(res => {
                sendResponse(res)
            })
        },
        "12": () => {
            let params12 = {
                content: params.feedbackContent,
                moduleIds: [59]
            }
            addFeedback(params12).then(res => {
                sendResponse(res)
            })
        },
        "13": () => {
            showNotice({ product: 2 }).then(res => {
                sendResponse(res)
            })
        }
    }
    options[params.type].call(this)
    return true
})