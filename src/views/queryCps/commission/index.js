// cps查询-佣金
import "./index.css"

const commissionHeadFn = () => {
    let commissionElement = document.createElement("div")
    commissionElement.className = "jdb-cps-commission-box"
    commissionElement.innerHTML = `
        <table class="jdb-cps-commission-table" cellspacing="0" cellpadding="5">
            <thead class="jdb-cps-commission-thead">
                <tr>
                    <td width='105px'>sku</td>
                    <td width='60px'>京东价</td>
                    <td>券面额</td>
                    <td>券消费限额</td>
                    <td width='60px'>券后价</td>
                    <td>佣金比例</td>
                    <td>佣金金额</td>
                    <td width="100px">
                        <div>spu近30天</div>
                        <div>引单量</div>
                    </td>
                    <td width="100px">
                        <div>spu近30天</div>
                        <div>支出佣金</div>
                    </td>
                </tr>
            </thead>
            <tbody class="jdb-cps-commission-tbody">
                <tr>
                    <td colspan="9" class="jdb-cps-commission-loading-td">
                        <i class="el-icon-loading"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    `
    let cpsBox = document.getElementsByClassName("jdb-cps-box")[0]
    if (document.getElementsByClassName("track")[0] || document.getElementsByClassName("m-item-ext")[0]) {
        commissionElement.style.width = '800px'
    }
    cpsBox.appendChild(commissionElement)
}
const commissionBodyFn = (commissionList) => {
    let newTbody = document.createElement("tbody")
    newTbody.className = "jdb-cps-commission-tbody"
    newTbody.innerHTML = `
        <tr>
            <td>${commissionList.skuId}</td>
            <td>${commissionList.unitPrice}</td>
            <td>${commissionList.bestCouponAmount}</td>
            <td>${commissionList.couponLimitAmount}</td>
            <td>${commissionList.afterCouponPrice}</td>
            <td>${commissionList.commisionRatio}%</td>
            <td>${commissionList.commisionAmount}</td>
            <td>${commissionList.inOrderCount30Days}</td>
            <td>${commissionList.inOrderComm30Days}</td>
        </tr>
    `
    const oldTbody = document.getElementsByClassName("jdb-cps-commission-tbody")[0]
    const table = document.getElementsByClassName("jdb-cps-commission-table")[0]
    table.replaceChild(newTbody, oldTbody)
}
export {
    commissionHeadFn,
    commissionBodyFn
}