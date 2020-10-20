import "./index.css"
const addTopTimedAdvertisingFn = (obj) => {
    let countDown = 10
    let timer = ''
    let advertising = document.createElement("div")
    advertising.className = 'jdb-top-timedAdvertising-box'
    advertising.innerHTML = `
        <img src="${obj.content}" class="jdb-top-timedAdvertising-img"/>
        <i class="el-icon-close jdb-top-timedAdvertising-close"></i>
        <div class='jdb-top-timedAdvertising-countDown'>${countDown}</div>
    `
    document.body.insertBefore(advertising, document.body.firstChild)
    document.getElementsByClassName("jdb-top-timedAdvertising-close")[0].addEventListener('click', () => {
        clearInterval(timer)
        document.body.removeChild(document.getElementsByClassName("jdb-top-timedAdvertising-box")[0])
    })
    timer = setInterval(() => {
        if (countDown <= 0) {
            clearInterval(timer)
            document.body.removeChild(document.getElementsByClassName("jdb-top-timedAdvertising-box")[0])
        } else {
            countDown--;
            document.getElementsByClassName('jdb-top-timedAdvertising-countDown')[0].innerText = countDown
        }
    }, 1000);
}
export {
    addTopTimedAdvertisingFn
}