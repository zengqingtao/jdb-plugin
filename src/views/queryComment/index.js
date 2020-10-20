// 查留评率
import "./index.css"
import { customDatepicker } from '../../common/datepicker/foundation-datepicker'
import { customPager } from '../../common/jquery.pager'
import { request } from "../../sendMessage/index"
import { message } from "element-ui"

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
// 时间控件
const initDatepicker = () => {
    var nowTemp = new Date()
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    var checkin = $('#startDate')
        .fdatepicker({
            format: 'yyyy-mm-dd',
            onRender: function(date) {
                return date.valueOf() > now.valueOf() ?
                    'disabled' :
                    new Date(
                        Date.parse(new Date()) - 16 * 24 * 60 * 60 * 1000
                    ).valueOf() > date.valueOf() ?
                    'disabled' :
                    ''
            }
        })
        .on('changeDate', function(ev) {
            if (ev.date.valueOf() > checkout.date.valueOf()) {
                var newDate = new Date(ev.date)
                newDate.setDate(newDate.getDate() + 1)
                checkout.update(newDate)
            }
            checkin.hide()
            $('#endtDate')[0].focus()
        })
        .data('datepicker')
    var checkout = $('#endtDate')
        .fdatepicker({
            format: 'yyyy-mm-dd',
            onRender: function(date) {
                return date.valueOf() > now.valueOf() ?
                    'disabled' :
                    date.valueOf() < checkin.date.valueOf() ?
                    'disabled' :
                    ''
            }
        })
        .on('changeDate', function(ev) {
            checkout.hide()
        })
        .data('datepicker')
    document
        .getElementsByClassName('datepicker')[0]
        .classList.add('jdb-datepicker')
    document
        .getElementsByClassName('datepicker')[1]
        .classList.add('jdb-datepicker')
};
// 分页控件
const pageSize = 5;
const initpage = (tableData) => {
    $('.pager')
        .pager({
            pageIndex: 0,
            pageSize: pageSize,
            itemCount: tableData.length,
            maxButtonCount: 5,
            onPageChanged: function(page) {
                page = page * pageSize
                getTbodyHtml(tableData, page)
            }
        })
        .setPageIndex(0)
};
// 时间弹窗
const chooseDateModalFn = (sku) => {
    customDatepicker(window.jQuery)
    let commentModal = new createGroup({
        html: `
        <div class='jdb-comment-box'>
            <div class="jdb-comment-date-box">
                <div class="jdb-comment-close">
                    <i class='el-icon-close'></i>
                </div>
                <div class="jdb-comment-sku">sku: ${sku}</div>
                <div>统计维度：</div>
                <button class="jdb-comment-dimension-btn is-active" data-comment-dimension="1">sku评价</button>
                <button class="jdb-comment-dimension-btn" data-comment-dimension="0">spu评价</button>
                <span>评价时间：</span>
                <div class="jdb-comment-input-box">
                        <input type="text" class="span2" value="" id="startDate" placeholder='请选择开始时间' autocomplete="off">
                        <span class='input-space'> ~ </span>
                        <input type="text" class="span2" value="" id="endtDate" placeholder='请选择结束时间' autocomplete="off">
                </div>
                <button class='jdb-comment-search-btn'><i class='el-icon-loading'></i><span>查 询</span></button>
            </div>
		</div>
	`
    })
    document.body.style.overflow = "hidden"
    document.body.appendChild(commentModal.init('jdb-comment-modal'))
        // 关闭
    document
        .getElementsByClassName('jdb-comment-close')[0]
        .addEventListener('click', () => {
            let body = document.body
            let datepickers = document.getElementsByClassName('datepicker')
            body.style.overflow = "auto"
            body.removeChild(document.getElementsByClassName('jdb-comment-modal')[0]);
            // 一共两个日期选项，删除数组的第一个后，第二个的下标变成了0，此时的datepickers[0]是原来的第二个日期选项的dom
            body.removeChild(datepickers[0])
            body.removeChild(datepickers[0])
        })
    initDatepicker()
    addEventListener()
};
const addEventListener = () => {
    let dimensionBtns = document.getElementsByClassName("jdb-comment-dimension-btn")
    let dimension = '1' //统计维度默认是sku评价
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
            dimension = e.target.getAttribute("data-comment-dimension")
        })
    }
    let searchBtn = document.getElementsByClassName('jdb-comment-search-btn')[0]
    searchBtn.addEventListener('click', () => {
        let dateList = [
            document.getElementById('startDate').value,
            document.getElementById('endtDate').value
        ]
        if (dateList.some(item => item.length === 0)) {
            message.error('请选择正确的时间')
            return
        } else {
            searchBtn.classList.add("jdb-comment-search-btn-loading")
            let params = {
                skuId: location.href,
                type: 4,
                dateArr: dateList,
                dimension
            }
            request(params)
        }
    })
}
const getStatHtml = data => {
    let titleHtml = `
        <div>总数量：${data.totalCount}</div>
        <div>留评数：${data.leaveReview}</div>
        <div>忽略数：${data.ignoreCount}</div>
        <div>留评率：${data.leaveReviewRate}%</div>
      `
    return titleHtml
}
const getTbodyHtml = (data, page = 0, refresh = false) => {
    let tbodyHtml = '';
    data = data.slice(page, page + pageSize);
    // 计算星星
    const getStar = startCount => {
        let startStr = ''
        for (let i = 0; i < startCount; i++) {
            startStr += `<i class='el-icon-star-on'></i>`
        }
        if (startCount < 5) {
            for (let i = 0; i < 5 - startCount; i++) {
                startStr += `<i class='el-icon-star-on off'></i>`
            }
        }
        return startStr
    }
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            tbodyHtml += `
                <tr>  
                    <td>${data[i].id}</td>
                    <td>${getStar(data[i].score)}</td>
                    <td class='jdb-comment-content-box'>
                        <p title="${data[i].content}">${data[i].content}</p>
                    </td>
                    <td>${data[i].creationTime}</td>
                    <td>${data[i].userLevelName}</td>
                    <td>${data[i].nickname}</td>
                    <td>${data[i].userClientShow}</td>
                </tr>
            `
        }
    } else {
        tbodyHtml = `
            <tr class="no-data">
                <td colspan="7">暂无数据</td>
            </tr>
        `
    }
    let new_tbody = document.createElement("tbody")
    new_tbody.innerHTML = tbodyHtml
    new_tbody.className = "jdb-comment-tbody"
    let old_tbody = document.getElementsByClassName('jdb-comment-tbody')[0]
    if (old_tbody && !refresh) {
        document
            .getElementsByClassName('jdb-comment-table')[0]
            .replaceChild(new_tbody, old_tbody)
    } else {
        return tbodyHtml
    }
}
const commentTableFn = (totalObj, tableData) => {
    let commentBox = document.getElementsByClassName('jdb-comment-box')[0];
    if (!commentBox) return //点击了查询，然后关闭弹窗，请求返回结果，找不到弹窗就中断，不执行一下程序
    let tbodyHtml = getTbodyHtml(tableData, 0, true)
    let old_data = document.getElementsByClassName('jdb-comment-data')[0]
    if (!old_data) {
        let statHtml = getStatHtml(totalObj)
        let old_statHtml = document.querySelector(".jdb-comment-stat")
        old_statHtml ? (old_statHtml.innerHTML = statHtml) : ''
        let new_data = new createGroup({
            html: `  
                        <div class='jdb-comment-stat'>
                          ${statHtml}
                        </div>
                        <table class="jdb-comment-table" cellpadding="10" cellspacing="0">
                            <thead class="jdb-comment-thead">
                                <tr>
                                <th >序号</th>
                                <th width="168px">评价星数</th>
                                <th width="168px">评语</th>
                                <th width="168px">评价时间</th>
                                <th width="168px">会员级别</th>
                                <th width="168px">用户昵称</th>
                                <th width="173px">端口分析</th>
                                </tr>
                            </thead>
                            <tbody class="jdb-comment-tbody">
                                ${tbodyHtml}
                            </tbody>
                        </table>
                      <div class='pager'></div>
              `
        })
        commentBox.appendChild(new_data.init('jdb-comment-data'))
    } else {
        let old_table = old_data.getElementsByClassName('jdb-comment-table')[0]
        let old_tbody = old_table.getElementsByClassName('jdb-comment-tbody')[0]
        let new_tbody = document.createElement("tbody")
        new_tbody.className = "jdb-comment-tbody"
        new_tbody.innerHTML = tbodyHtml
        old_table.replaceChild(new_tbody, old_tbody)
        old_data.style.display = 'block'
    }
    customPager(jQuery, window, document)
    initpage(tableData)
}
export {
    chooseDateModalFn,
    commentTableFn
}