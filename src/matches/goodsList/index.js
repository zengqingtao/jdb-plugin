/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import "./index.css"
import "../../common/jquery-1.8.3"
import "../../common/jquery.pager"
import logo from "../../assets/images/dzgj-logo.png"
import { insertElementIcons } from "../../common/insertElementIcons"
import { checkLogin } from "../../sendMessage/index"

insertElementIcons()
class createGroup {
    constructor(options = {}) {
        this.innerHtml = options.html || ''
    }
    init(className) {
        const div = document.createElement('div')
        div.innerHTML = this.innerHtml
        div.className = className
        return div
    }
}
// 添加按钮 查销量/查权重/查流量
const addBtnFn = () => {
    let group = new createGroup({
        html: `
        <img src='${logo}'/>
        <p class="checkBtn" data-checkType = copySkuId>复制sku</p>
        <p class='checkBtn' data-checkType = querySalesVolume>查销量</p>
        <div class="dzgj-moreFuction-box">
            <p class="dzgj-moreFuction-btn">更多功能</p>
            <ul class="dzgj-moreFuction-list" style="display:none">
                <li class='checkBtn' data-checkType="queryRanking">查排名</li>
                <li class='checkBtn' data-checkType="queryOrder">查订单</li>
                <li class='checkBtn' data-checkType="queryFlow">查流量</li>
                <li class='checkBtn' data-checkType="queryWeight">查权重</li>
                <li class='checkBtn' data-checkType="pitProductionCalc">坑产计算</li>
                <li class='checkBtn' data-checkType="queryComment">查留评</li>
                <li class='checkBtn' data-checkType="queryPortrait">查画像</li>
                <li class='checkBtn' data-checkType="queryCps">cps查询</li>
                <li class='checkBtn' data-checkType="queryExpress">查快车</li>
                <li class='checkBtn' data-checkType="commentAnalysis">评价分析</li>
                <li class='checkBtn' data-checkType="secondKillAnalysis">秒杀分析</li>
                <li class='checkBtn' data-checkType="searchAnalysis">搜索分析</li>
                <li class='checkBtn' data-checkType="downloadComment">下载评论</li>
                <li class='checkBtn jdb-downloadImage-btn' data-checkType="20">下载主图</li>
            </ul>
        </div>
    `
    })
    let itemList = document.getElementsByClassName("gl-item")
    for (let i = 0; i < itemList.length; i++) {
        let item = itemList[i].childNodes[1].childNodes
        let lastBox = item[item.length - 1]
        let secondToLast = item[item.length - 2]
        if (lastBox.classList && lastBox.classList.contains('btn-box') || secondToLast.classList && secondToLast.classList.contains('btn-box')) {
            continue
        }
        itemList[i].style.height = "501px"
        itemList[i].children[0].appendChild(group.init("btn-box"))
    }
    const btnList = document.getElementsByClassName("checkBtn")
    for (let i = 0; i < btnList.length; i++) {
        if (!btnList[i].getAttribute('data-click')) {
            btnList[i].setAttribute('data-click', 1)
            btnList[i].addEventListener("click", function(e) {
                e.stopPropagation();
                let type = e.target.getAttribute("data-checkType")
                let sku = ''
                let targetText = e.target.innerHTML
                if (targetText === '查销量' || targetText === '复制sku') {
                    sku = e.target.parentNode.parentNode.parentNode.getAttribute("data-sku")
                } else {
                    sku = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-sku")
                }
                checkLogin(type, sku)
            })
        }
    }

    // 更多功能按钮
    const moreFuction = document.getElementsByClassName('dzgj-moreFuction-btn')
    const functionList = document.getElementsByClassName('dzgj-moreFuction-list')
    for (let j = 0; j < moreFuction.length; j++) {
        if (!moreFuction[j].getAttribute('data-click')) {
            moreFuction[j].setAttribute('data-click', 1)
            moreFuction[j].addEventListener('click', function(e) {
                e.stopPropagation();
                if (functionList[j].style.display === 'block') {
                    functionList[j].style.display = "none"
                } else {
                    functionList[j].style.display = "block"
                }
                for (let k = 0; k < moreFuction.length; k++) {
                    if (k !== j && functionList[k].style.display === 'block') {
                        functionList[k].style.display = 'none'
                    }
                }
            })
        }
    }
}

addBtnFn()
    //滚动添加按钮(懒加载)
function getLazyLoadData() {
    let boxList = document.getElementsByClassName("btn-box")
    let itemList = document.getElementsByClassName("gl-item")
    if (itemList.length >= 60) {
        if (boxList.length >= 60) return
        addBtnFn()
    } else if (boxList.length === 0) {
        addBtnFn()
    }
}

window.addEventListener("scroll", getLazyLoadData)