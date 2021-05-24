// 查流量
import "./index.css"
import config from "../../../config"


const iframeCommonModal = (params) => {

    if (document.getElementsByClassName('dzgj-iframeCommon-modal')[0]) return

    chrome.runtime.sendMessage({
            postData: {
                type: 'getToken'
            }
        },
        function(res) {
            createFlowModalFn(res.account, res.token, params)
        })
}

const createFlowModalFn = (account, token, params) => {
    let timeStamp = new Date().getTime() //为了解决iframe的缓存问题
    let keyword = document.getElementById('search-2014').getElementsByTagName('input')[0].value
    let src = `${config.pluginIframeUrl+params.path
        +'?skuId='+params.skuId
        +'&path=/'+params.path
        +'&token='+token
        +'&account='+account
        +'&keyword='+keyword
        +'&version='+config.version
        +'&timeStamp='+timeStamp}`

    let iframeModal = document.createElement('div')
    iframeModal.className = "dzgj-iframeCommon-modal"
    iframeModal.innerHTML = `
        <div class="dzgj-iframeCommon-box">
            <div class="dzgj-iframeCommon-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="dzgj-iframeCommon-body">
                <iframe id="child" src="${src}" style="width:100%;height:100%" frameborder='0'></iframe>
            </div>
        </div>
    `
    let body = document.body
    body.style.overflow = "hidden"
    body.appendChild(iframeModal);

    // 关闭
    document.getElementsByClassName("dzgj-iframeCommon-close")[0].addEventListener("click", () => {
        body.style.overflow = "auto"
        body.removeChild(iframeModal)
    });

    // 监听popup发送过来的消息（退出登录关闭弹窗）
    chrome.extension.onMessage.addListener(
        function(request, sender, sendResponse) {
            let modal = document.getElementsByClassName('dzgj-iframeCommon-modal')[0]
            if (modal) {
                body.style.overflow = "auto"
                body.removeChild(modal);
                sendResponse("content收到");
            }
        }
    );


}


export {
    iframeCommonModal
}