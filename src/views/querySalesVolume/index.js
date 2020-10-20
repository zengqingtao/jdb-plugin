// 查销量
import "./index.css"
import { request } from "../../sendMessage/index"
const salesVolumeHeadFn = (sku) => {
    let salesVolumeModal = document.createElement("div")
    salesVolumeModal.className = "jdb-salesVolume-modal"
    salesVolumeModal.innerHTML = `
					<div class='jdb-salesVolume-box'>
							<div class="jdb-salesVolume-close">
								<i class="el-icon-close"></i>
                            </div>
                            <div class="jdb-salesVolume-options">
                                <span class="jdb-salesVolume-options-sku">sku:${sku}</span>
                                <div class="jdb-salesVolume-dimension">
                                    <span>统计维度：</span>
                                    <button class="jdb-salesVolume-dimension-button is-active" data-salesVolume-dimension="0">sku</button>
                                    <button class="jdb-salesVolume-dimension-button" data-salesVolume-dimension="1">spu</button>
                                </div>
                                <button class="jdb-salesVolume-search-button"><i class="el-icon-loading"></i>查询</button>
                            </div>
					</div>
          `
    document.body.style.overflow = "hidden"
    document.body.appendChild(salesVolumeModal)
    addEventListener(sku)
};
const addEventListener = (sku) => {
    document
        .getElementsByClassName("jdb-salesVolume-close")[0]
        .addEventListener("click", () => {
            document.body.style.overflow = "auto"
            document.body.removeChild(
                document.getElementsByClassName("jdb-salesVolume-modal")[0]
            )
        })
    let dimensionBtns = document.getElementsByClassName("jdb-salesVolume-dimension-button")
    let dimension = '0'
    for (let i = 0; i < dimensionBtns.length; i++) {
        dimensionBtns[i].addEventListener("click", (e) => {
            for (let j = 0; j < dimensionBtns.length; j++) {
                let isContain = dimensionBtns[j].classList.contains('is-active')
                if (j === i) {
                    isContain ? '' : dimensionBtns[i].classList.add("is-active")
                } else {
                    isContain ? dimensionBtns[j].classList.remove("is-active") : ''
                }
            }
            dimensionBtns[i].classList.add("is-active")
            dimension = e.target.getAttribute("data-salesVolume-dimension")
        })
    }
    let searchBtn = document.getElementsByClassName("jdb-salesVolume-search-button")[0]
    searchBtn.addEventListener("click", () => {
        searchBtn.classList.add("loading")
        let params = {
            skuId: sku,
            type: 1,
            dimension
        }
        request(params)
    })
};
const salesVolumeBodyFn = data => {
    let jdbSalesVolumeBox = document.getElementsByClassName("jdb-salesVolume-box")[0]
    if (!jdbSalesVolumeBox) return //点击了查询，然后关闭弹窗，请求返回结果，找不到弹窗就中断，不执行一下程序

    let newTbody = document.createElement("tbody");
    newTbody.className = "jdb-salesVolume-tbody"
    if (data.length === 0) {
        newTbody.innerHTML = `
            <tr>
                <td colspan="9" class="jdb-salesVolume-empty-td">暂无数据</td>
            </tr>
        `
    } else {
        for (let i = 0; i < data.length; i++) {
            newTbody.innerHTML += `
        <tr>  
            <td>
                ${i + 1}
                <div class="jdb-salesVolume-relation-sku" style="${data[i].isMainSku === 0?'display:flex':'display:none'}">关联SKU</div>
            </td>
            <td>
                <div class="jdb-salesVolume-goodsLink-box">
                    <img class="goodsImg" src=${data[i].img}></img>
                    <a href='${data[i].url}' target="_blank" title="${data[i].skuName}">${data[i].skuName}</a>
                </div>
            </td>
            <td>${data[i].thirdCat}</td>
            <td>${data[i].brand}</td>
            <td>${data[i].last3DaysSales}</td>
            <td>${data[i].last7DaysSales}</td>
            <td>${data[i].last15DaysSales}</td>
            <td>${data[i].last30DaysSales}</td>
            <td class="jdb-salesVolume-improveRank-btn-box">
                <button class="jdb-salesVolume-improveRank-btn">
                    提升排名
                    <div class='tooltip'>通过提升综合排名，从而实现销量的增长</div>
                </button>
            </td>
        </tr>
    `
        }
        let ascendRankBtns = newTbody.getElementsByClassName("jdb-salesVolume-improveRank-btn")
        for (let i = 0; i < ascendRankBtns.length; i++) {
            ascendRankBtns[i].addEventListener("click", () => {
                window.open("https://rqb.jingdianbao.cn/#/newReleaseIndex/jd/popular-rank")
            })
        }
    }

    let oldTable = document.getElementsByClassName("jdb-salesVolume-table")[0]
    if (oldTable) {
        let oldTbody = document.getElementsByClassName("jdb-salesVolume-tbody")[0]
        oldTable.replaceChild(newTbody, oldTbody)
    } else {
        let newTable = document.createElement("table")
        newTable.className = "jdb-salesVolume-table"
        newTable.cellPadding = "8px"
        newTable.cellSpacing = "0"
        newTable.innerHTML = `
            <thead class='jdb-salesVolume-thead'>
                <tr>
                    <th width="47px">序号</th>
                    <th width="197px">商品链接</th>
                    <th >三级类别</th>
                    <th class='brand'>品牌</th>
                    <th>3天销量</th>
                    <th>7天销量</th>
                    <th>15天销量</th>
                    <th>30天销量</th>
                    <th>推荐策略</th>
                </tr>
            </thead>
        `
        newTable.appendChild(newTbody)
        jdbSalesVolumeBox.appendChild(newTable)
    }
}
export {
    salesVolumeHeadFn,
    salesVolumeBodyFn
}