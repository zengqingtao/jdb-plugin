// 京准通系列总课程
import '../../common/jquery-1.8.3'
import { message } from "element-ui"
import { request } from "../../sendMessage/index"
import { insertElementIcons } from "../../common/insertElementIcons"
import { setCookie, getCookie } from "../../common/cookie"
import { addMemberUpgradeBtnFn, addStoreDiagnosisBtnFn } from "../../views/advertising/memberUpgrade"
insertElementIcons()
console.log("init")
const judgeUrl = () => {
    let params = {}
    if (location.href.includes('//jzt.jd.com/home/#/index')) {
        // 京准通-总课程
        params = { type: 7 }
    } else if (location.href.includes('//sz.jd.com/sz/view/indexs.html')) {
        // 京东商智首页,保存店铺级别
        let timer = setInterval(() => {
            let shopLevel = document.getElementsByClassName("shop-level")[0].getElementsByClassName("level-shop")[0].getElementsByTagName("li")[1].getElementsByClassName("ng-binding")[1].innerHTML
            if (shopLevel) {
                request({ type: 9, shopLevel })
                clearInterval(timer)
            }
        }, 1000)
        request({ type: 10 })
        return;
    } else if (location.href.includes('//sz.jd.com/sz/view/viewflow/viewStats.html')) {
        // 京东商智
        params = { type: 8, courseId: 1, advertising: '京东商智' }
    } else if (location.href.includes('//sz.jd.com/sz/view/industryMarket/industryRealTimes.html')) {
        // 京东商智
        params = { type: 8, courseId: 2, advertising: '京东商智' }
    } else if (location.href.includes('//sz.jd.com/sz/view/productAnalysis/productSummarys.html')) {
        // 京东商智
        params = { type: 8, courseId: 3, advertising: '京东商智' }
    } else if (location.href.includes('//jzt.jd.com/jdkc/survey.html#/survey')) {
        // 京东快车
        params = { type: 8, courseId: 4, advertising: '京东快车' }
    } else if (location.href.includes('//jzt.jd.com/haitou/index.html#/index') || location.href.includes("//jzt.jd.com/haitou/#/index")) {
        // 京东海报
        params = { type: 8, courseId: 5, advertising: '京东海投' }
    } else if (location.href.includes('//zt.jd.com/fcgi-bin/jdzt/user/main')) {
        // 京东直投
        params = { type: 8, courseId: 6, advertising: '京东直投' }
    } else if (location.href.includes('//jzt.jd.com/touch_point/index.html#/survey')) {
        // 购物触点
        params = { type: 8, courseId: 7, advertising: '购物触点' }
    } else if (location.href.split(":")[1] === '//jzt.jd.com/jtk/#/' || location.href.includes('//jzt.jd.com/jtk/#/index')) {
        // 京挑客-投放概况
        params = { type: 8, courseId: 8, advertising: '京挑客' }
    } else if (location.href.includes('//jzt.jd.com/jtk/#/task-list')) {
        // 京挑客-商家任务
        params = { type: 8, courseId: 9, advertising: '京挑客' }
    } else if (location.href.includes('//mc.jd.com/shop/index.html#/industry/list?dataType=1')) {
        //商家后台-营销中心
        params = { type: 8, courseId: 11, advertising: '商家后台' }
    } else if (location.href.includes('//jshopx.jd.com/pageManage')) {
        //商家后台-店铺装修
        params = { type: 8, courseId: 12, advertising: '商家后台' }
    } else if (location.href.includes("//ware.shop.jd.com/rest/ware/list/manage") || location.href.includes("//ware.shop.jd.com/rest/shop/wareRelation/getWareByCondition")) {
        //商家后台-在售商品管理
        params = { type: 8, courseId: 13, advertising: '商家后台' }
    } else if (location.href.includes('//yj.shop.jd.com')) {
        //商家后台-新京东风向标
        params = { type: 8, courseId: 14, advertising: '商家后台' }
    } else if (location.href.includes('//crm.shop.jd.com/crm/menu/proxy/menuProxy.action') || location.href.includes('//crm.shop.jd.com/crm/shopNewLevel/index.action')) {
        //商家后台-客户运营
        params = { type: 8, courseId: 15, advertising: '商家后台' }
    } else if (location.href.includes('//jlive.jd.com')) {
        //京东直播
        let containerTimer = setInterval(() => {
            if (document.getElementsByClassName('antd-pro-pages-index-index-container')[0]) {
                if (location.href.includes('//jlive.jd.com/index')) {
                    request({ type: 8, courseId: 16, advertising: '京东直播' })
                }
                clearInterval(containerTimer)
            }
        }, 1000)
        let liTimer = setInterval(() => {
            let lis = document.getElementsByClassName("ant-menu")[0].getElementsByTagName("li")
            if (lis) {
                for (let i = 0; i < lis.length; i++) {
                    lis[i].addEventListener('click', () => {
                        if (lis[i].getElementsByTagName('span')[1].innerText === '首页' && !document.getElementsByClassName("jdb-singleCourse-box")[0]) {
                            let timer = setInterval(() => {
                                if (lis[i].className.indexOf('ant-menu-item-selected') !== -1) {
                                    request({ type: 8, courseId: 16, advertising: '京东直播' })
                                    clearInterval(timer)
                                }
                            }, 500)
                        }
                    })
                }
                clearInterval(liTimer)
            }
        }, 1000)
        return;
    } else if (location.href.includes("//kf.jd.com/")) {
        params = { type: 8, courseId: 17, advertising: '京东客服' }
        let uls = document.getElementsByClassName('metismenu')[0].getElementsByClassName('collapse')
        for (let i = 0; i < uls.length; i++) {
            let lis = uls[i].getElementsByTagName('li')
            for (let j = 0; j < lis.length; j++) {
                lis[j].addEventListener('click', () => {
                    let advertising = document.getElementsByClassName('jdb-singleCourse-box')[0]
                    if (lis[j].innerText === '工作量') {
                        advertising ? '' : request({ type: 8, courseId: 17, advertising: '京东客服' })
                    } else {
                        advertising ? document.getElementsByClassName('right-side')[0].removeChild(advertising) : ''
                    }
                })
            }
        }
    } else if (location.href.includes("//shop.jd.com")) {
        addMemberUpgradeBtnFn()
        addStoreDiagnosisBtnFn()
        if (getNowDate() !== getCookie('showNoticeDate')) {
            request({ type: 13 }) //京东商智首页
            setCookie('showNoticeDate', getNowDate(), 1);
        } else {
            request({ type: 17 })
        }
        params = { type: 15 }
    } else {
        return;
    }
    request(params)
};


$(document).ready(function() {
    console.log("jquery-ready")
    judgeUrl()
});
window.addEventListener('hashchange', (e) => {
    let advertisingBox = document.getElementsByClassName("jdb-singleCourse-box")
    if (advertisingBox && advertisingBox.length !== 0) {
        for (let i = 0; i <= advertisingBox.length; i++) {
            document.getElementsByClassName("jdb-singleCourse-box")[0].parentElement.removeChild(document.getElementsByClassName("jdb-singleCourse-box")[0])
        }
    }
    judgeUrl()
}, false);
const getNowDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}