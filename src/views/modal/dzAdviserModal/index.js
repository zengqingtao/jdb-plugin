// 查流量
import "./index.css"
import config from "../../../config"

const dzAdviserModal = (params) => {

    if (document.getElementsByClassName('dzgj-dzAdviser-modal')[0]) return

    chrome.runtime.sendMessage({
            postData: {
                type: 'getToken'
            }
        },
        function(res) {
            createModalFn(res.account, res.token, params)
        })

}

const createModalFn = (account, token, params) => {
    let timeStamp = new Date().getTime() //为了解决iframe的缓存问题
    let src = `${config.pluginIframeUrl+params.path
        +'?token='+token
        +'&account='+account
        +'&version='+config.version
        +'&path=/'+params.path
        +'&timeStamp='+timeStamp}`
    let iframeModal = document.createElement('div')
    iframeModal.className = "dzgj-dzAdviser-modal"
    iframeModal.innerHTML = `
        <div class="dzgj-dzAdviser-box">
            <div class="dzgj-dzAdviser-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="dzgj-dzAdviser-body">
                <iframe id="child" src="${src}" style="width:100%;height:100%" frameborder='0'></iframe>
            </div>
        </div>
    `
    let body = document.body
    body.style.overflow = "hidden"
    body.appendChild(iframeModal);

    // 关闭
    document.getElementsByClassName("dzgj-dzAdviser-close")[0].addEventListener("click", () => {
        body.style.overflow = "auto"
        body.removeChild(iframeModal)
    });
    // 监听iframe发送过来的激活账号成功消息，关闭店长顾问弹窗
    window.addEventListener('message', (event) => {
        if (event.data.name === '关闭店长顾问弹窗') {
            let modal = document.getElementsByClassName('dzgj-dzAdviser-modal')[0]
            if (modal) {
                body.style.overflow = "auto"
                body.removeChild(modal)
            }
        }
    });

    // 监听popup发送过来的消息（退出登录关闭弹窗）
    chrome.extension.onMessage.addListener(
        function(request, sender, sendResponse) {
            let modal = document.getElementsByClassName('dzgj-dzAdviser-modal')[0]
            if (modal) {
                body.style.overflow = "auto"
                body.removeChild(modal);
                sendResponse("content收到");
            }
        }
    );

};


export {
    dzAdviserModal
}