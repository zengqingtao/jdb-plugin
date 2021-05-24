import "./index.css"
import { downloadFileByCode } from "../../common/api"

const downloadImageFn = (skuId) => {
    let downloadBtn = document.getElementsByClassName('jdb-downloadImage-btn')[0]
    downloadBtn.classList.add("jdb-download-btn-loading")
    let params = {
        type: '20',
        skuId
    }
    chrome.runtime.sendMessage({ postData: params },
        function(res) {
            downloadBtn.classList.remove("jdb-download-btn-loading")
            if (res.data.code === 200) {
                let url = downloadFileByCode + `?code=${res.data.data}`;
                window.open(url, "_self");
            } else {
                message.error(res.data.msg)
            }
        }
    )
}

export {
    downloadImageFn
}