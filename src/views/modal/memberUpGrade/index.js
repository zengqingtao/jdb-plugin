// 会员升级
import "./index.css"
import config from "../../../config"

const memberUpGradeModal = (params) => {

    if (document.getElementsByClassName('dzgj-memberUpGrade-modal')[0]) return

    chrome.runtime.sendMessage({
            postData: {
                type: 'getToken'
            }
        },
        function(res) {
            memberUpGrade(res.account, res.token, params)
        })
}

const memberUpGrade = (account, token, params) => {
    let timeStamp = new Date().getTime() //为了解决iframe的缓存问题
    let src = `${config.pluginIframeUrl+params.path
        +'?path=/'+params.path
        +'&token='+token
        +'&account='+account
        +'&version='+config.version
        +'&timeStamp='+timeStamp}`
    let iframeModal = document.createElement('div')
    iframeModal.className = "dzgj-memberUpGrade-modal"
    iframeModal.innerHTML = `
        <div class="dzgj-memberUpGrade-box">
            <div class="dzgj-memberUpGrade-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="dzgj-memberUpGrade-body">
                <iframe id="child" src="${src}" style="width:100%;height:100%" frameborder='0'></iframe>
            </div>
        </div>
    `
    let body = document.body
    body.style.overflow = "hidden"
    body.appendChild(iframeModal);

    // 关闭
    document.getElementsByClassName("dzgj-memberUpGrade-close")[0].addEventListener("click", () => {
        body.style.overflow = "auto"
        body.removeChild(iframeModal)
    })

}


export {
    memberUpGradeModal
}