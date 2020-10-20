import "./index.css"
import { numberConversion } from "../../../common/conversionNumber"
import { chapterResourcesModalFn } from "../chapterAndResourcesList/index"
import { request } from "../../../sendMessage/index"
const carouselHeight = 30
const addSingleCourseAdvertisingFn = (data, advertising) => {
    let carouselItem = getCarouselHtml(data.chapterInfoList)
    let advertisingHtml = document.createElement("div")
    advertisingHtml.className = "jdb-singleCourse-box"
    advertisingHtml.innerHTML = `
        <div class="jdb-singleCourse-title-and-carousel-box">
            <div class="jdb-singleCourse-title" title="${data.courseName}">
                <span>${data.courseName}</span>
            </div>
            <div class="jdb-singleCourse-carousel" style="height:${carouselHeight}px;line-height:${carouselHeight}px">
                <ul class="jdb-singleCourse-carousel-ul">
                    ${carouselItem}
                </ul>
            </div>
        </div>
        <div class="jdb-singleCourse-review">
            <span>立即查看</span>
            <i class="el-icon-arrow-right"></i>
        </div>
    `
    switch (advertising) {
        case '京东商智':
            let routeName = document.getElementsByClassName("content-header")[0].firstElementChild.innerText
            let parentElement = '',
                targetElement = '';
            if (routeName === '流量概况') {
                parentElement = document.getElementsByClassName("content-body")[0]
                targetElement = document.getElementsByClassName("summary-core-index")[0]
                targetElement.style.position = 'relative'
            } else if (routeName === '行业实时') {
                parentElement = document.getElementsByClassName("content-body")[0]
                targetElement = parentElement.getElementsByClassName("container-right-modules")[0]
            } else if (location.pathname === '/sz/view/productAnalysis/productSummarys.html') {
                parentElement = document.getElementsByClassName("spu-ctrl")[0]
                targetElement = parentElement.getElementsByClassName("data-summary-container")[0]
            } else {
                return
            }
            parentElement.insertBefore(advertisingHtml, targetElement)
            break;
        case '京东海投':
            let JDHBParent = '',
                JDHBTarget = '';
            JDHBParent = document.getElementsByClassName("left-survey-main")[0]
            JDHBTarget = JDHBParent.getElementsByClassName("panel")[1]
            let reviewBtn = advertisingHtml.getElementsByClassName('jdb-singleCourse-review')[0]
            let title = advertisingHtml.getElementsByClassName('jdb-singleCourse-title')[0]
            if (JDHBTarget.offsetWidth < 820) {
                reviewBtn.style.width = '120px'
                reviewBtn.style.height = '35px'
                reviewBtn.style.lineHeight = '35px'
                title.style.fontSize = '33px'
                title.style.minWidth = '300px'
            }
            JDHBParent.insertBefore(advertisingHtml, JDHBTarget)
            window.onresize = function() {
                if (JDHBTarget.offsetWidth < 820) {
                    reviewBtn.style.width = '120px'
                    reviewBtn.style.height = '35px'
                    reviewBtn.style.lineHeight = '35px'
                    title.style.fontSize = '33px'
                    title.style.minWidth = '300px'
                } else {
                    title.style = {}
                    reviewBtn.style = {}
                }
            }
            break;
        case '京东直投':
            let JDZTParent = '',
                JDZTTarget = '';
            JDZTParent = document.getElementsByClassName("main-wapper")[1]
            JDZTTarget = JDZTParent.getElementsByClassName("left-box")[0]
            JDZTParent.style.position = 'relative'
            advertisingHtml.style.position = 'absolute'
            advertisingHtml.style.top = '0'
            advertisingHtml.style.left = '0'
            advertisingHtml.style.width = JDZTTarget.offsetWidth + 'px'
            advertisingHtml.style.margin = '0'
            JDZTTarget.style.marginTop = '105px'
            JDZTParent.insertBefore(advertisingHtml, JDZTTarget)
            window.onresize = function() {
                advertisingHtml.style.width = JDZTTarget.offsetWidth + 'px'
            }
            break;
        case '京挑客':
            let JTKRouteName = document.getElementsByClassName("jad-pro-pageHeader-breadcrumb")[0].innerText
            let JTKParent = '',
                JTKTarget = '';
            if (JTKRouteName.includes('投放概况')) {
                JTKParent = document.getElementsByClassName("jad-row")[0]
                JTKTarget = JTKParent.getElementsByClassName("jad-col")[0]
                advertisingHtml.style.margin = '0 0 10px'
                let rightBox = JTKTarget.nextElementSibling
                JTKParent.style.marginBottom = '10px'
                rightBox.style.marginTop = '-100px'
                advertisingHtml.style.width = JTKTarget.offsetWidth + 'px'
            } else if (JTKRouteName.includes('商家任务')) {
                advertisingHtml.style.margin = '0 24px 10px'
                JTKParent = document.getElementsByClassName("container")[0]
                JTKTarget = JTKParent.getElementsByClassName("page-main")[1]
                request({ type: 8, courseId: 10, advertising: '短视频' })
            } else if (!JTKRouteName) {
                setTimeout(() => {
                    addSingleCourseAdvertisingFn(data, advertising)
                }, 1000)
            } else {
                return;
            }
            JTKParent.insertBefore(advertisingHtml, JTKTarget)
            window.onresize = function() {
                advertisingHtml.style.width = JTKTarget.offsetWidth + 'px'
            }
            break;
        case '短视频':
            let DSPRouteName = document.getElementsByClassName("jad-pro-pageHeader-breadcrumb")[0].innerText
            if (DSPRouteName.includes('商家任务')) {
                let DSPParent = '',
                    DSPTarget = '';
                advertisingHtml.style.display = 'none'
                advertisingHtml.style.margin = '0 24px 10px'
                DSPParent = document.getElementsByClassName("container")[0]
                DSPTarget = DSPParent.getElementsByClassName("page-main")[1]
                DSPTarget.style.marginBottom = '10px'
                DSPParent.appendChild(advertisingHtml)
                let tabs = document.getElementsByClassName("jad-tabs-nav-tab")
                for (let i = 0; i < tabs.length; i++) {
                    tabs[i].addEventListener('click', () => {
                        let text = tabs[i].innerText
                        if (text === '我发布的站外任务') {
                            advertisingHtml.style.display = 'flex'
                        } else {
                            advertisingHtml.style.display = 'none'
                        }
                    })
                }
            } else {
                return
            }
            break;
        case '商家后台':
            let SJHTParent = '',
                SJHTTarget = '';
            switch (location.host) {
                case 'mc.jd.com':
                    SJHTParent = document.getElementsByClassName("tabsWrapper")[0]
                    SJHTTarget = SJHTParent.getElementsByClassName('contentWrapper')[0]
                    advertisingHtml.style.marginTop = '0'
                    break;
                case 'jshopx.jd.com':
                    SJHTParent = document.getElementsByClassName("cd-common-table")[0]
                    SJHTTarget = SJHTParent.getElementsByClassName('cd-content-wrapper')[0]
                    advertisingHtml.style.margin = '0 20px 10px'
                    break;
                case 'ware.shop.jd.com':
                    if (location.pathname === '/rest/shop/wareRelation/getWareByCondition') {
                        // 自营
                        advertisingHtml.style.marginTop = '10px'
                    } else {
                        // pop
                        advertisingHtml.style.margin = '0 0 10px'
                    }
                    SJHTParent = document.getElementsByClassName("order")[0]
                    SJHTTarget = SJHTParent.getElementsByClassName('order_tbl')[0]
                    break;
                case 'yj.shop.jd.com':
                    SJHTParent = document.getElementsByClassName("v-storeview")[0]
                    SJHTTarget = SJHTParent.getElementsByClassName('storeview_overview')[0]
                    SJHTTarget.style.marginTop = '10px'
                    advertisingHtml.style.margin = '10px 0 0'
                    break;
                case 'crm.shop.jd.com':
                    if (location.href.includes('//crm.shop.jd.com/crm/menu/proxy/menuProxy.action')) {
                        SJHTParent = document.getElementsByClassName("l-content")[0]
                        SJHTTarget = SJHTParent.firstChild
                        advertisingHtml.style.margin = '0 0 10px'
                    } else if (location.href.includes('//crm.shop.jd.com/crm/shopNewLevel/index.action#/home')) {
                        SJHTParent = document.getElementsByClassName("l-content")[0]
                        SJHTTarget = SJHTParent.firstChild
                        advertisingHtml.style.margin = '0 0 10px'
                    } else {
                        return
                    }
                    break;
            }
            SJHTParent.insertBefore(advertisingHtml, SJHTTarget);
            break;
        case '京东直播':
            let JDZBParent = '',
                JDZBTarget = '';
            JDZBParent = document.getElementsByClassName('antd-pro-pages-index-index-container')[0];
            JDZBTarget = JDZBParent.getElementsByClassName('ant-row')[1];
            JDZBParent.insertBefore(advertisingHtml, JDZBTarget);
            break;
        case '京东客服':
            let JDKFParent = '',
                JDKFTarget = '';
            JDKFParent = document.getElementsByClassName('right-side')[0]
            JDKFTarget = JDKFParent.children[0]
            advertisingHtml.style.marginTop = '0px'
            advertisingHtml.getElementsByClassName('jdb-singleCourse-carousel-ul')[0].style.margin = '0px'
            JDKFParent.insertBefore(advertisingHtml, JDKFTarget);
            break;
        default:
            //京东快车/购物触点
            if (advertising === '京东快车' || advertising === '购物触点') {
                let parent = '',
                    target = '';
                parent = document.getElementsByClassName("container")[0].children[1].firstChild
                target = parent.getElementsByClassName("pull-left")[0]
                let rightChild = target.nextElementSibling
                parent.style.position = "relative"
                rightChild.style.position = "absolute"
                rightChild.style.top = '10px'
                rightChild.style.right = '0'
                advertisingHtml.style.margin = '0 0 10px 0'
                advertisingHtml.style.width = target.offsetWidth + 'px'
                parent.insertBefore(advertisingHtml, target)
                window.onresize = function() {
                    advertisingHtml.style.width = target.offsetWidth + 'px'
                }
                break;
            } else {
                retur
            }
    }
    addCarouselEvent(data.chapterInfoList)
    let reviewBtns = document.getElementsByClassName("jdb-singleCourse-review")
    reviewBtns[reviewBtns.length - 1].addEventListener('click', () => {
        chapterResourcesModalFn(data)
    })

    let chapterUls = document.getElementsByClassName("jdb-singleCourse-carousel-ul")
    let chapterlis = chapterUls[chapterUls.length - 1].getElementsByTagName("li")
    for (let i = 0; i < chapterlis.length; i++) {
        chapterlis[i].addEventListener('click', () => {
            chapterResourcesModalFn(data)
        })
    }
};
const getCarouselHtml = (list) => {
    let carouselHtml = ''
    for (let i = 0; i < list.length; i++) {
        carouselHtml += `
            <li style="height:${carouselHeight}px;line-height:${carouselHeight}px" title="${list[i].chapterName}">
                第${numberConversion(i + 1)}节：${list[i].chapterName}
            </li>
        `
    }
    return carouselHtml
}
const addCarouselEvent = (list) => {
    if (list.length <= 1) return
    let carouselUl = document.getElementsByClassName("jdb-singleCourse-carousel-ul")
    carouselUl = carouselUl[carouselUl.length - 1]
    let carouselLis = carouselUl.getElementsByTagName("li")
    let top = 0
    let timer = ''
    run()

    function run() {
        let time = (top % carouselHeight == 0) ? 3000 : 20
        let maxTop = -(carouselHeight * list.length)
        if (top <= maxTop) {
            top = 0
        }
        carouselUl.style.marginTop = top + 'px'
        timer = setTimeout(() => {
            top -= 2
            run()
        }, time)
    }
    for (let i = 0; i < carouselLis.length; i++) {
        // 鼠标移入
        carouselLis[i].onmouseover = () => {
            clearTimeout(timer)
            top = -i * carouselHeight
            carouselUl.style.marginTop = top + 'px'
        };
        // 鼠标移出
        carouselLis[i].onmouseout = () => {
            run()
        }
    }
}
export {
    addSingleCourseAdvertisingFn
}