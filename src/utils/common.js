export function skuReg(skuUrl = '') {
    let reg = new RegExp('(^|\\\\.com|)[1-9]\\d*(^|\\\\.html|)');
    if (!isNaN(skuUrl)) {
        return skuUrl;
    } else {
        if (skuUrl.match(reg)) {
            return skuUrl.match(reg)[0];
        } else {
            return false
        }
    }
}

export function copyUrl(url) {
    let oInput = document.createElement('input');
    oInput.value = url;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display = 'none';
}