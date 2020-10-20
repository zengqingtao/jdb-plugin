/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import './index.css'
import '../../common/jquery-1.8.3'
import jdbLogo from "../../assets/images/jdb-logo.png"
import cpsLogo from "../../assets/images/cps.png"
import { insertElementIcons } from '../../common/insertElementIcons'
import { checkLogin } from "../../sendMessage/index"
insertElementIcons()
    // 添加按钮 查销量/查权重/查流量/查留评率
const addBtnFn = () => {
        let btnBox = document.createElement("div")
        btnBox.className = "jdb-query-btns"
        btnBox.innerHTML = `
		<img src="${jdbLogo}" />
		<p class='query-btn' data-queryType = 1>查销量</p>
		<p class='query-btn' data-queryType = 2>查权重</p>
		<p class='query-btn' data-queryType = 3>查流量</p>
		<p class='query-btn' data-queryType = 4>查留评</p>
	  `
        let itemInfo = document.getElementsByClassName('itemInfo-wrap')[0]
        itemInfo = itemInfo ? itemInfo : document.getElementById("itemInfo")
        itemInfo.appendChild(btnBox)
        const btnList = document.getElementsByClassName("query-btn")
        for (let i = 0; i < btnList.length; i++) {
            btnList[i].addEventListener("click", function(e) {
                let type = e.target.getAttribute("data-queryType")
                let sku = location.pathname
                sku = sku.substr(1).split(".")[0]
                checkLogin(Number(type), sku)
            })
        }
    }
    // 添加cps推广按钮
const cpsBtnFn = () => {
    let cpsBtn = document.createElement("div")
    cpsBtn.className = "jdb-cps-box"
    cpsBtn.innerHTML = `
        <div class="jdb-cps-btns-box">
            <img src="${cpsLogo}" />
            <p data-queryType="5">佣金</p>
            <p data-queryType="6">优惠券</p>
        </div>
    `
    let parentElement, targetElement;
    if (document.getElementsByClassName("itemInfo-wrap")[0]) {
        parentElement = document.getElementsByClassName("itemInfo-wrap")[0]
        targetElement = parentElement.lastElementChild
    } else if (document.getElementById("summary")) {
        parentElement = document.getElementById("summary")
        targetElement = parentElement.children[1]
    }
    parentElement.insertBefore(cpsBtn, targetElement)
    const btnList = cpsBtn.getElementsByClassName("jdb-cps-btns-box")[0].getElementsByTagName("p")

    for (let i = 0; i < btnList.length; i++) {
        btnList[i].addEventListener("click", function(e) {
            for (let j = 0; j < btnList.length; j++) {
                let isContain = btnList[j].classList.contains('is-active')
                if (j === i) {
                    isContain ? '' : btnList[i].classList.add("is-active")
                } else {
                    isContain ? btnList[j].classList.remove("is-active") : ''
                }
            }
            if (i === 0 && document.getElementsByClassName("jdb-cps-commission-box")[0]) return
            let type = e.target.getAttribute("data-queryType")
            let sku = location.pathname
            sku = sku.substr(1).split(".")[0]
            checkLogin(Number(type), sku)
        })
    }
}
cpsBtnFn()
addBtnFn()