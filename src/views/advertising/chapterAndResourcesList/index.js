// 单个课程章节和资源列表弹窗
import "./index.css"
import { numberConversion } from "../../../common/conversionNumber"
import suo from "../../../assets/images/suo.png"
import { checkLogin } from "../../../sendMessage"
const chapterResourcesModalFn = (list) => {
    console.log("list：", list)
    let singleCourseChapterLis = getSingleCourseChapterLis(list.chapterInfoList)
    let singleCourseResourcesLis = getSingleCourseResourcesLis(list.sourceInfoList, list.isSaWhiteList)
    let chapterResourcesModal = document.createElement("div")
    chapterResourcesModal.className = "jdb-chapterResources-modal"
    chapterResourcesModal.innerHTML = `
        <div class="jdb-chapterResources-box">
            <div class="jdb-chapterResources-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="jdb-chapterResources-chapter">
                <div class="jdb-chapterResources-chapter-title" title="${list.courseName}">${list.courseName}</div>
                <ul class="jdb-chapterResources-chapter-ul">
                    ${singleCourseChapterLis}
                </ul>
                <div class="jdb-chapterResources-chapter-button-group">
                    <button>你想听的课程</button>
                    <button>你对课程的评价</button>
                </div>
            </div>
            <div class="jdb-chapterResources-resources">
                <div class="jdb-chapterResources-resources-title">资源对接</div>
                <ul class="jdb-chapterResources-resources-ul">
                    ${singleCourseResourcesLis}
                </ul>
            </div>
        </div>
    `
    document.body.style.overflow = "hidden"
    document.body.appendChild(chapterResourcesModal)
    document.getElementsByClassName("jdb-chapterResources-close")[0].addEventListener("click", () => {
        document.body.style.overflow = "auto"
        document.body.removeChild(chapterResourcesModal)
    })
    let btns = document.getElementsByClassName("jdb-chapterResources-chapter-button-group")[0].children
    btns[0].addEventListener('click', () => {
        checkLogin(10, '', '', list.id)
    })
    btns[1].addEventListener('click', () => {
        checkLogin(11, '', list.courseName, list.id)
    })
    let btnBoxs = document.getElementsByClassName("jdb-chapterResources-resources-right")
    for (let i = 0; i < btnBoxs.length; i++) {
        btnBoxs[i].getElementsByTagName('button')[0].addEventListener('click', () => {
            resourcesDetailsModalFn(list.sourceInfoList[i])
        })
    }
}
const getSingleCourseChapterLis = (list) => {
    let lis = ''
    for (let i = 0; i < list.length; i++) {
        lis += `
            <li>
                <div class="jdb-chapterResources-chapter-name" title="${list[i].chapterName}">第${numberConversion(i + 1)}节：${list[i].chapterName}</div>
                <a href="${list[i].buyLink}" target="_blank">立即观看<i class="el-icon-arrow-right"></i></a>
            </li>
        `
    }
    return lis
};
const getSingleCourseResourcesLis = (list, isSaWhiteList) => {
    console.log(isSaWhiteList)
    let lis = ''
    if (list.length === 0) {
        if (isSaWhiteList) {
            lis = `
                <li class="jdb-chapterResources-resources-empty-li">
                    <div class="empty">暂无资源</div>
                </li>
            `
        } else {
            lis = `
                <li class="jdb-chapterResources-resources-empty-li">
                    <img src="${suo}" />
                    <div>尚未开通权限</div>
                    <div>请联系京店宝客服人员</div>
                </li>
            `
        }

    } else {
        for (let i = 0; i < list.length; i++) {
            lis += `
                <li>
                    <div class="jdb-chapterResources-resources-left">
                        <img src="${list[i].iconImg}">
                        <div>
                            <div class="jdb-chapterResources-resources-sourceName" title="${list[i].sourceName}">${list[i].sourceName}</div>
                            <div class="jdb-chapterResources-resources-description" title="${list[i].sourceDesc}">${list[i].sourceDesc}</div>
                        </div>
                    </div>
                    <div class="jdb-chapterResources-resources-right">
                        <button>获取资源</button>
                    </div>
                </li>
            `
        }
    }
    return lis
}
const resourcesDetailsModalFn = (obj) => {
    let imgList = getExamplesImgList(obj.caseImgs)
    let resourcesModal = document.createElement("div")
    resourcesModal.className = "jdb-resourcesDetails-modal"
    resourcesModal.innerHTML = `
        <div class="jdb-resourcesDetails-box">
            <div class="jdb-resourcesDetails-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="jdb-resourcesDetails-title">${obj.sourceName}</div>
            <div class="jdb-resourcesDetails-content-box">
                <div class="jdb-resourcesDetails-item">
                    <div class="label">简介：</div>
                    <div class="jdb-resourcesDetails-description">${obj.sourceDesc}</div>
                </div>
                <div class="jdb-resourcesDetails-item">
                    <div class="label">联系方式：</div>
                    <div>
                        <img src="${obj.qrcodeImg}" class="jdb-resourcesDetails-QR-code"/>
                        <div class="tips">点击图片，可放大查看</div>
                    </div>
                </div>
                <div class="jdb-resourcesDetails-item">
                    <div class="label">案例：</div>
                    <div>
                        <div class="jdb-examples-imgList">
                            ${imgList}
                        </div>
                        <div class="tips">点击图片，可放大查看</div>
                    </div>
                </div>
            </div>
        </div>
    `
    document.body.appendChild(resourcesModal)
    document.getElementsByClassName("jdb-resourcesDetails-close")[0].addEventListener("click", () => {
        document.body.removeChild(document.getElementsByClassName("jdb-resourcesDetails-modal")[0])
    })
    document.getElementsByClassName("jdb-resourcesDetails-QR-code")[0].addEventListener("click", () => {
        preImage(obj.qrcodeImg, 0)
    })
    let imgs = document.getElementsByClassName("jdb-examples-imgList")[0].children
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("click", () => {
            preImage(obj.caseImgs, i)
        })
    }
}
const getExamplesImgList = (imgStr) => {
    let examplesImgList = ''
    let imgList = imgStr.split(",")
    for (let i = 0; i < imgList.length; i++) {
        examplesImgList += `
            <img src="${imgList[i]}" />
        `
    }
    return examplesImgList
}
const preImage = (imgStr, index) => {
    let list = imgStr.split(',')
    let maxHeight = window.innerHeight
    let preImageModal = document.createElement("div")
    preImageModal.className = "jdb-preImage-modal"
    preImageModal.innerHTML = `
        <div class="jdb-preImage-box">
            <div class="jdb-preImage-close">
                <i class="el-icon-close"></i>
            </div>
            <div  class="${list.length > 1 ? 'jdb-preImage-show-arrow' : ''}" >
                <img src="${list[index]}" class="jdb-preImage-img" style="max-height:${maxHeight - 22}px"/>
                <div class="jdb-preImage-arrow-left" style="${index === 0 ? 'cursor:not-allowed' : ''}">
                    <i class="el-icon-arrow-left" ></i>
                </div>
                <div class="jdb-preImage-arrow-right" style="${index === list.length - 1 ? 'cursor:not-allowed' : ''}">
                    <i class="el-icon-arrow-right"></i>
                </div>
            <div>
        </div>
    `
    document.body.appendChild(preImageModal)
    document.getElementsByClassName("jdb-preImage-close")[0].addEventListener('click', () => {
        document.body.removeChild(document.getElementsByClassName("jdb-preImage-modal")[0])
    })
    let ind = index;
    document.getElementsByClassName("jdb-preImage-arrow-right")[0].addEventListener('click', () => {
        if (ind < list.length - 1) {
            ind++
            document.getElementsByClassName("jdb-preImage-img")[0].src = list[ind]
            ind === list.length - 1 ? document.getElementsByClassName("jdb-preImage-arrow-right")[0].style.cursor = 'not-allowed' : ''
            ind === 1 ? document.getElementsByClassName("jdb-preImage-arrow-left")[0].style.cursor = 'pointer' : ''
        }
    })
    document.getElementsByClassName("jdb-preImage-arrow-left")[0].addEventListener('click', () => {
        if (ind > 0) {
            ind--
            document.getElementsByClassName("jdb-preImage-img")[0].src = list[ind]
            ind === 0 ? document.getElementsByClassName("jdb-preImage-arrow-left")[0].style.cursor = 'not-allowed' : ''
            ind < list.length - 1 ? document.getElementsByClassName("jdb-preImage-arrow-right")[0].style.cursor = 'pointer' : ''
        }
    })
}
export {
    chapterResourcesModalFn
}