// 查权重
import "./index.css"
import { customPager } from "../../common/jquery.pager"
import { message } from "element-ui"
import { request } from "../../sendMessage/index"
class createGroup {
    constructor(options = {}) {
        this.innerHtml = options.html || ""
    }
    init(className) {
        const div = document.createElement("div")
        div.innerHTML = this.innerHtml
        div.className = className
        return div
    }
}
// 分页控件
const pageSize = 4
const initpage = (data) => {
    $(".pager")
        .pager({
            pageIndex: 0,
            pageSize: pageSize,
            itemCount: data.length,
            maxButtonCount: 5,
            onPageChanged: function(page) {
                page = page * pageSize
                getTbodyHtml(data, page)
            }
        })
        .setPageIndex(0)
};
const validateKeyword = (sku) => {
    let keyWordVal = document.getElementById("jdb-keyword").value
    if (!keyWordVal) {
        $(".jdb-weight-search-btn").removeClass("jdb-weight-search-btn-loading")
        message.error("请输入关键词")
    } else {
        document.getElementsByClassName("jdb-weight-search-btn")[0].classList.add("jdb-weight-search-btn-loading")
        let params = {
            skuId: sku,
            type: 2,
            keyWord: keyWordVal
        }
        request(params)
    }
}
const weightOptionsFn = sku => {
    let keyWordModal = new createGroup({
        html: `
        <div class="jdb-weight-box">
            <div class='jdb-keyword-box'>
                <div class="jdb-weight-close">
                    <i class='el-icon-close'></i>
                </div>
                <span class="jdb-weight-sku">sku: ${sku}</span>
                <span>关键词：</span>
                <input placeholder='请输入关键词' id='jdb-keyword'></input>
                <button class='jdb-weight-search-btn' data-sku=${sku}><i class='el-icon-loading'></i>查询</button>
            </div>
        </div>
    `
    })
    let body = document.body
    body.style.overflow = "hidden"
    body.appendChild(keyWordModal.init("jdb-weight-modal"))
        // 关闭
    document
        .getElementsByClassName("jdb-weight-close")[0]
        .addEventListener("click", () => {
            body.style.overflow = "auto"
            body.removeChild(
                document.getElementsByClassName("jdb-weight-modal")[0]
            )

        })
    document.getElementsByClassName("jdb-weight-search-btn")[0].addEventListener("click", () => {
        validateKeyword(sku)
    })
    document.getElementById("jdb-keyword").addEventListener("keydown", (e) => {
        e.keyCode === 13 ? validateKeyword(sku) : ''
    })
};
const getTbodyHtml = (data, index = 0, refresh = false) => {
    let tbodyHtml = ""
    data = data.slice(index, index + pageSize)
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            tbodyHtml += `
                    <tr>  
                        <td>${data[i].index}</td>
                        <td >
                            <div class='jdb-goods-link-box'>
                                <img class="goodsImg" src=${data[i].imgUrl}></img>
                                <div class="right">
                                    <a href='${data[i].goodsUrl}' target="_blank" title="${data[i].goodsName}">${data[i].goodsName}</a>
                                    <p>sku:${data[i].skuId}</p>
                                </div>
                            </div>
                        </td>
                        <td>${data[i].sellerType}</td>
                        <td>${data[i].keyword}</td>
                        <td>${data[i].rank}</td>
                        <td>总排名第${data[i].totalRank}名</td>
                        <td>${data[i].weightiness === -1 ? "快车广告" : data[i].weightiness
                }</td>
                        <td>${data[i].titleWeightiness === -1
                    ? "快车广告"
                    : data[i].titleWeightiness
                }</td>
                        <td class='jdb-weight-recommend-btn-box'>
                            <button>
                                提升排名
                                <span class='tooltip'>通过人气宝的【人气排名提升】功能，可真实有效地提高商品的综合排名</span>
                            </button>
                            <button>
                                增加粉丝
                                <span class='tooltip'>通过人气宝的【店铺粉丝】功能，可真实有效地提高商品的权重分数</span>
                            </button>
                        </td>
                    </tr>`
        }
    } else {
        tbodyHtml = `
            <tr>
                <td colspan="9">暂无数据</td>
            </tr>
        `
    }
    let new_tbody = document.createElement("tbody")
    new_tbody.innerHTML = tbodyHtml
    new_tbody.className = "jdb-weight-tbody"
    let old_tbody = document.getElementsByClassName("jdb-weight-tbody")[0]
    if (old_tbody && !refresh) {
        document
            .getElementsByClassName("jdb-weight-table")[0]
            .replaceChild(new_tbody, old_tbody)
            // 推荐策略添加跳转
        recommendJump()
    } else {
        return tbodyHtml
    }
};
const recommendJump = () => {
    let recommendBtnBoxs = document.getElementsByClassName("jdb-weight-recommend-btn-box")
    let urlArr = [
        `https://rqb.jingdianbao.cn/#/newReleaseIndex/jd/popular-rank`,
        `https://rqb.jingdianbao.cn/#/newReleaseIndex/jd/shop-attention`
    ]
    for (let i = 0; i < recommendBtnBoxs.length; i++) {
        let btns = recommendBtnBoxs[i].children
        btns[0].addEventListener("click", () => {
            window.open(urlArr[0])
        })
        btns[1].addEventListener("click", () => {
            window.open(urlArr[1])
        })
    }
};
const weightDataFn = data => {
    let weightBox = document.getElementsByClassName("jdb-weight-box")[0]
    if (!weightBox) return //点击了查询，然后关闭弹窗，请求返回结果，找不到弹窗就中断，不执行一下程序
    let new_tbody = getTbodyHtml(data, 0, true)
    let new_data = new createGroup({
        html: `   
                <table class="jdb-weight-table" cellspacing="0" cellpadding="8">
                    <thead class="jdb-weight-thead">
                        <tr>
                            <th width="47px">序号</th>
                            <th class='shop-name' width="200px">商品链接</th>
                            <th width="116px">店铺类型</th>
                            <th width="116px">关键词</th>
                            <th width="116px">位置</th>
                            <th width="116px">排名</th>
                            <th width="116px">权重分</th>
                            <th width="116px">标题权重分</th>
                            <th width="85px">推荐策略</th>
                        </tr>
                    </thead>
                    <tbody class="jdb-weight-tbody">
                        ${new_tbody}
                    </tbody>
                </table>
                <div class='pager'></div>
          `
    })
    let old_data = document.getElementsByClassName("jdb-weight-data")[0]
    let old_table = document.getElementsByClassName("jdb-weight-table")[0]
    let old_tbody = document.getElementsByClassName("jdb-weight-tbody")[0]
    if (!old_data) {
        weightBox.appendChild(new_data.init("jdb-weight-data"))
    } else {
        let tb = document.createElement("tbody")
        tb.className = "jdb-weight-tbody"
        tb.innerHTML = new_tbody
        old_table.replaceChild(tb, old_tbody)
    }
    recommendJump()
    customPager(jQuery, window, document)
    initpage(data)
}


export {
    weightOptionsFn,
    weightDataFn
}