// 查流量
import "./index.css"
import eChart from "echarts"
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
const flowInitFn = (data, days, tip) => {
        let flowModal = new createGroup({
            html: `
            <div class="jdb-flow-box">
                <div class="jdb-flow-close">
                    <i class="el-icon-close"></i>
                </div>
                <div class="jdb-single-product">单品</div>
                <div class="jdb-flow-echart-box">
                    <div class="jdb-flow-loading-box">
                        <i class="el-icon-loading"></i>
                    </div>
                </div>
            </div>
            `
        })
        let body = document.body
        body.style.overflow = "hidden"
        body.appendChild(flowModal.init("jdb-flow-modal"))
            // 关闭
        document
            .getElementsByClassName("jdb-flow-close")[0]
            .addEventListener("click", () => {
                body.style.overflow = "auto"
                body.removeChild(
                    document.getElementsByClassName("jdb-flow-modal")[0]
                )
            })
    }
    // 全局数据
let echartOption = {
        // echart数据
        color: [
            "#f1a02d",
            "#ff7c00",
            "#1e8420",
            "#a577ed",
            "#c31e2f",
            "#228fa8",
            "#7090eb",
            "#a577ed",
            "#c31e2f",
            "#776718"
        ],
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: "vertical",
            left: 0,
            top: 50,
            data: [],
            textStyle: {
                color: "#333"
            }
        },
        series: [{
            name: "查流量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
            label: {
                normal: {
                    formatter: "{b}:{c}: ({d}%)",
                    textStyle: {
                        color: "#333"
                    }
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 20,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(115,159,255,1)"
                },
                normal: {
                    label: {
                        show: true,
                        formatter: "{b} : {c} ({d}%)"
                    },
                    labelLine: { show: true }
                }
            },
            minAngle: 5
        }]
    }
    // 切换图表数据 && 表格
const switchEchartData = val => {
    echartOption.legend.data = val.visitor.pieChart.nameList
    echartOption.series[0].data = val.visitor.pieChart.valueList
    let myChart = eChart.init(document.getElementById("myChart"))
    myChart.setOption(echartOption)
    let tableList = document.getElementsByClassName("jdb-flow-tbody-tr")[0].children
    for (let i = 0; i < val.visitor.result.length; i++) {
        tableList[i + 1].innerHTML = val.visitor.result[i].value
    }
}
const flowDataFn = (data, days, tip, flowData) => {
    let chartHtml = document.createElement("div")
    chartHtml.className = "jdb-flow-echart-box"
    chartHtml.innerHTML = ` 
        <div class="jdb-flow-options-title-box">
            <div class="jdb-flow-options">
                <button class="active" data-days="0">7天</button>
                <button data-days="1">15天</button>
                <button data-days="2">30天</button>
            </div>
            <div class="jdb-flow-title" title="${tip}">${tip}</div>
        </div>
        <div id='myChart' class='my-chart' style="width: 100%;height:200px; color:#333"></div>
    `
    let tableHtml = document.createElement("table")
    tableHtml.className = "jdb-flow-table"
    tableHtml.cellSpacing = "0"
    tableHtml.cellPadding = "5"
    tableHtml.innerHTML = `
        <thead class="jdb-flow-thead">
            <tr>
                <th>序号</th>
                <th>总流量</th>
                <th>搜索流量</th>
                <th>非搜索流量</th>
                <th>推荐策略</th>
            </tr>
        </thead>
        <tbody class="jdb-flow-tbody">
            <tr class="jdb-flow-tbody-tr">
                <td>1</td>
                <td>xxx</td>
                <td>xxx</td>
                <td>xxx</td>
                <td class="jdb-flow-recommend-btn-box">
                    <button >
                        提升排名
                        <div class="tooltip">有效通过人气提升排名，可以引入自然搜索流量，人气宝精准人群标签点击访问，快速扩展真实人群</div>
                    </button>
                    <button >
                        提升非搜
                        <div class="tooltip">有效通过品类高级达人，引入个性化精准流量，从而提升非搜索流量成交额</div>
                    </button>
                </td>
            </tr>
        </tbody>
    `
    let flowBox = document.getElementsByClassName("jdb-flow-box")[0]
    let old_chart = document.getElementsByClassName("jdb-flow-echart-box")[0]
    flowBox.replaceChild(chartHtml, old_chart)
    flowBox.appendChild(tableHtml)
        // 推荐策略点击跳转
    let recommendBtns = document.getElementsByClassName("jdb-flow-recommend-btn-box")[0].children
    for (let i = 0; i < recommendBtns.length; i++) {
        recommendBtns[i].addEventListener("click", () => {
            let chooseArr = [
                `https://rqb.jingdianbao.cn/#/newReleaseIndex/jd/popular-rank`,
                `https://jkjs.jingdianbao.cn/#/home`
            ]
            window.open(chooseArr[i])
        })
    }
    let btns = document.getElementsByClassName("jdb-flow-options")[0].children
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", () => {
            for (let index = 0; index < btns.length; index++) {
                btns[index].classList.remove("active")
            }
            switchEchartData(flowData[i])
            btns[i].classList.add("active")
        })
    }
    switchEchartData(data)
}
export {
    flowInitFn,
    flowDataFn
}