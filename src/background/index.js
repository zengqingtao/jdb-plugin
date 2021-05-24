/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import manifest from "../manifest.json"

// 目的重新安装时清除旧的缓存，重新登录
chrome.management.onInstalled.addListener(function(info) {
    if (info.name === manifest.name) { //监听安装的是否是店长管家插件，是则清除缓存
        localStorage.clear()
    }
});

import {
    login,
    isActiveAccount,
    activeAccount,
    checkLogin,
    downloadSkuMainImage,
    pluginUpGrade,
    getMoreSkuId
} from '../common/api'
import {
    getAllCourseList,
    getCourseInfo,
    saveShopLevel,
    getAnnouncementImgUrl,
    curriculumEvaluation,
    addFeedback,
    showNotice,
    getQRCode,
    getNoticeList
} from "../common/api/searchScholar"
import { Message } from "element-ui"

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    let token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
    let params = request.postData;
    /**
     *  -1：检查是否登录 
     * 7:获取总课程列表 8:获取课程章节和资源列表 9:保存店铺级别 10:商家后台公告图片链接(课程直播预告),11：课程评价,12：意见反馈
     * 13:商家后台首页顶部的广告,15:商家后台公告图片链接(课程报名广告),17：商家后台公告通知, 20:获取下载主图的下载码
     */
    let options = {
        '-4': async() => {
            const res = await checkLogin();
            sendResponse({ isLogin: res.data.code === 200 })
        },
        '-3': () => {
            // token失效
            localStorage.clear()
        },
        'activeAccount': () => {
            activeAccount({ activeCode: params.activeCode }).then(res => {
                sendResponse(res.data)
            })
        },
        '-1': async() => {
            let account = JSON.parse(localStorage.getItem("userInfo")) || ''
            account = account ? account.username : ''
            const res = await isActiveAccount()
            let isActive = res.data
            sendResponse({ token, isActive, account })
        },
        'login': () => {
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
                    userInfo.vipLevel = '';
                    userInfo.vipValidityPeriod = '';
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                }
                sendResponse(res)
            })
        },
        'getToken': () => {
            let account = JSON.parse(localStorage.getItem("userInfo")) || ''
            if (account) {
                sendResponse({ token, account: account.username })
            } else {
                sendResponse({ token, account: '' })
            }
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
            getCourseInfo(p).then(async res => {
                let results = !res.data.data.isSaWhiteList ? await getQRCode() : ''
                let codeList = [];
                if (results && results.data.code === 200) {
                    codeList = results.data.data.list.filter(item => item.type === 12)
                }
                res.data.data.codeUrl = codeList
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
        },
        '15': () => {
            getAnnouncementImgUrl({ location: 15 }).then(res => {
                sendResponse(res)
            })
        },
        '17': () => {
            getNoticeList({ productName: '店长管家插件' }).then(res => {
                sendResponse(res)
            })
        },
        "20": () => {
            downloadSkuMainImage(params).then(res => {
                sendResponse(res)
            })
        },
        'pluginUpGrade': () => {
            pluginUpGrade({
                parentVersions: manifest.version
            }).then(res => sendResponse(res))
        }
    }
    options[params.type].call(this)
    return true
})