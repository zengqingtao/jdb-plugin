// 复制skuId
import "./index.css"
import config from "../../../config"

const copySkuIdModal = (params) => {

    if (document.getElementsByClassName('dzgj-copySkuId-modal')[0]) return

    chrome.runtime.sendMessage({
            postData: {
                type: 'getToken'
            }
        },
        function(res) {
            copySkuId(res.account, res.token, params)
        })
}

const copySkuId = (account, token, params) => {
    let src = `${config.pluginIframeUrl+params.path
        +'?path=/'+params.path
        +'&skuId='+params.skuId
        +'&token='+token
        +'&account='+account
        +'&version='+config.version}`
    let iframeModal = document.createElement('div')
    iframeModal.className = "dzgj-copySkuId-modal"
    iframeModal.innerHTML = `
        <div class="dzgj-copySkuId-box">
            <div class="dzgj-copySkuId-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="dzgj-copySkuId-body">
                <iframe id="child" src="${src}" style="width:100%;height:100%" frameborder='0'></iframe>
            </div>
        </div>
    `
    let body = document.body
    body.style.overflow = "hidden"
    body.appendChild(iframeModal);

    // 关闭
    document.getElementsByClassName("dzgj-copySkuId-close")[0].addEventListener("click", () => {
        body.style.overflow = "auto"
        body.removeChild(iframeModal)
    })

}


export {
    copySkuIdModal
}