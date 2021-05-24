/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import './index.css'
import '../../common/jquery-1.8.3'
import jdbLogo from "../../assets/images/dzgj-logo.png"
import { insertElementIcons } from '../../common/insertElementIcons'
import { checkLogin } from "../../sendMessage/index"
insertElementIcons()
    // 添加按钮 查销量/查权重/查流量/查留评率
const addBtnFn = () => {
    if (document.getElementsByClassName('jdb-query-btns')[0]) return
    let btnBox = document.createElement("div")
    btnBox.className = "jdb-query-btns"
    btnBox.innerHTML = `
		<img src="${jdbLogo}" />
		<div class="jdb-query-btns-list">
            <p class='query-btn' data-queryType = pitProductionCalc>坑产计算</p>
            <p class='query-btn' data-queryType = queryRanking>查排名</p>
            <p class='query-btn' data-queryType = querySalesVolume>查销量</p>
            <p class='query-btn' data-queryType = queryOrder>查订单</p>
            <p class='query-btn' data-queryType = queryWeight>查权重</p>
            <p class='query-btn' data-queryType = queryFlow>查流量</p>
            <p class='query-btn' data-queryType = queryComment>查留评</p>
            <p class='query-btn' data-queryType = queryPortrait>查画像</p>
            <p class='query-btn' data-queryType = queryCps>cps查询</p>
            <p class='query-btn' data-queryType = queryExpress>查快车</p>
            <p class='query-btn' data-queryType = commentAnalysis>评价分析</p>
            <p class='query-btn' data-queryType = secondKillAnalysis>秒杀分析</p>
            <p class='query-btn' data-queryType = searchAnalysis>搜索分析</p>
            <p class='query-btn' data-queryType = downloadComment>下载评论</p>
            <p class='query-btn jdb-downloadImage-btn' data-queryType = 20><i class='el-icon-loading'></i>下载主图</p>
            <p class='query-btn' data-queryType = copySkuId>复制sku</p>
        </div>
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
            checkLogin(type, sku)
        })
    }
}
addBtnFn()