/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import "./index.css"
import "../../common/jquery-1.8.3"
import "../../common/jquery.pager"
import logo from "../../assets/images/jdb-logo.png"
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
        <p class='checkBtn' data-checkType = 1>查销量</p>
        <p class='checkBtn' data-checkType = 2>查权重</p>
        <p class='checkBtn' data-checkType = 3>查流量</p>
    `
    })
    let itemList = document.getElementsByClassName("gl-item")
    for (let i = 0; i < itemList.length; i++) {
        let item = itemList[i].childNodes[1].childNodes
        if (item[item.length - 1].classList) {
            continue
        }
        itemList[i].style.height = "501px"
        itemList[i].children[0].appendChild(group.init("btn-box"))
    }
    const btnList = document.getElementsByClassName("checkBtn")
    for (let i = 0; i < btnList.length; i++) {
        btnList[i].addEventListener("click", function(e) {
            let type = e.target.getAttribute("data-checkType")
            let sku = e.target.parentNode.parentNode.parentNode.getAttribute(
                "data-sku"
            )
            checkLogin(Number(type), sku)
        })
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