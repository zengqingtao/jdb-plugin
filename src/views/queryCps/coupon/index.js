//cps查询-优惠券
import "./index.css"

const couponHeadFn = () => {
    let couponElement = document.createElement("div")
    couponElement.className = "jdb-cps-coupon-modal"
    couponElement.innerHTML = `
        <div class="jdb-cps-coupon-box">
            <div class="jdb-cps-coupon-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="jdb-cps-coupon-skuOrSpu-button-box" style="display:none">
                <button class="is-active" data-cps-coupon-dimension="sku">sku</button>
                <button data-cps-coupon-dimension="spu">spu</button>
            </div>
            <table class="jdb-cps-coupon-table" cellspacing="0">
                <thead class="jdb-cps-coupon-thead">
                    <tr>
                        <th>券种类</th>
                        <th>优惠券链接</th>
                        <th>券消费限额</th>
                        <th>券面额</th>
                        <th>券总数</th>
                        <th>券剩余数</th>
                        <th>券领取数</th>
                        <th>领取时间</th>
                        <th>生效时间</th>
                    </tr>
                </thead>
                <tbody class="jdb-cps-coupon-tbody">
                    <tr>
                        <td class="jdb-cps-coupon-loading-td">
                            <i class="el-icon-loading"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
    document.body.appendChild(couponElement)
    document.body.style.overflow = "hidden"
    document.getElementsByClassName("jdb-cps-coupon-close")[0].addEventListener('click', () => {
        document.body.removeChild(document.getElementsByClassName("jdb-cps-coupon-modal")[0])
        document.body.style.overflow = "auto"
        document.getElementsByClassName("jdb-cps-btns-box")[0].getElementsByTagName("p")[1].classList.remove("is-active")
    })
}
const createNewTbody = (couponList) => {
    let newTbody = document.createElement("tbody")
    newTbody.className = "jdb-cps-coupon-tbody"
    let tbodyHtml = ''
    if (couponList.length === 0) {
        tbodyHtml = `
                <tr>
                    <td class="jdb-cps-coupon-loading-td">暂无数据</td>
                </tr>
            `
    } else {
        couponList.forEach(element => {
            let receiveStartTime = element.startTimeAndEndTime.split("~")[0]
            let receiveEndTime = element.startTimeAndEndTime.split("~")[1]
            let effectiveStartTime = element.useTimeAndEndTime.split("~")[0]
            let effectiveEndTime = element.useTimeAndEndTime.split("~")[1]
            tbodyHtml += `
                <tr>
                    <td>${element.couponType}</td>
                    <td class="jdb-cps-coupon-link-td">
                        <div title="${element.couponLink}">${element.couponLink}</div>
                    </td>
                    <td>${element.couponLimitAmount}</td>
                    <td>${element.couponAmount}</td>
                    <td>${element.couponTotal}</td>
                    <td>${element.couponSurplusNum}</td>
                    <td>${element.couponReceiveNum}</td>
                    <td >
                        <p>${receiveStartTime}</p>
                        <p>~</p>
                        <p>${receiveEndTime}</p>
                    </td>
                    <td>
                        <p>${effectiveStartTime}</p>
                        <p>~</p>
                        <p>${effectiveEndTime}</p>
                    </td>
                </tr>
            `
        });
    }
    newTbody.innerHTML = tbodyHtml
    return newTbody
};
const addEventListener = (results) => {
    const dismensionBtnsBox = document.getElementsByClassName("jdb-cps-coupon-skuOrSpu-button-box")[0]
    dismensionBtnsBox.style.display = "block"
    const dimensionBtns = dismensionBtnsBox.children
    for (let i = 0; i < dimensionBtns.length; i++) {
        dimensionBtns[i].addEventListener("click", (e) => {
            for (let j = 0; j < dimensionBtns.length; j++) {
                let isContain = dimensionBtns[j].classList.contains('is-active')
                if (j === i) { //被点击的按钮
                    if (!isContain) {
                        dimensionBtns[i].classList.add("is-active")
                        let dimension = e.target.getAttribute("data-cps-coupon-dimension")
                        couponBodyFn(results, dimension)
                    }
                } else { //未被点击的按钮
                    isContain ? dimensionBtns[j].classList.remove("is-active") : ''
                }
            }
        })
    }
    const couponLinkTds = document.getElementsByClassName("jdb-cps-coupon-link-td")
    for (let i = 0; i < couponLinkTds.length; i++) {
        couponLinkTds[i].children[0].addEventListener("click", (e) => {
            window.open(e.target.title)
        })
    }
};
const couponBodyFn = (results, type = '') => {
    let couponList = type === 'spu' ? results.spu.couponList : results.sku.couponList
    let table = document.getElementsByClassName("jdb-cps-coupon-table")[0]
    let oldTbody = document.getElementsByClassName("jdb-cps-coupon-tbody")[0]
    table.replaceChild(createNewTbody(couponList), oldTbody)
    addEventListener(results)
}
export {
    couponHeadFn,
    couponBodyFn
}