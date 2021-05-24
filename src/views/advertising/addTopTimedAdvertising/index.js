import "./index.css"
import noticeImg from "../../../assets/images/notice.png"
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
const carouselHeight = 30
const addTopNoticeFn = (data) => {
    let topNoticeBox = document.createElement("div")
    let carouselItem = getCarouselHtml(data)
    topNoticeBox.className = 'jdb-top-notice-box'
    topNoticeBox.innerHTML = `
        <div>
            <div class="jdb-top-notice-left">
                <img src="${noticeImg}"/>
                <div class="jdb-top-notice-content" style="height:${carouselHeight}px;line-height:${carouselHeight}px;overflow:hidden">
                    <ul class="jdb-top-notice-carousel-ul">
                        ${carouselItem}
                    </ul>
                </div>
            </div>
            <div class="jdb-top-notice-right">
                <i class="el-icon-close jdb-top-notice-close"></i>
            </div>
        </div>
    `
    document.body.insertBefore(topNoticeBox, document.body.firstChild)
    addCarouselEvent(data)
    document.getElementsByClassName("jdb-top-notice-close")[0].addEventListener('click', () => {
        document.body.removeChild(document.getElementsByClassName("jdb-top-notice-box")[0])
    })
}
const getCarouselHtml = (list) => {
    let carouselHtml = ''
    for (let i = 0; i < list.length; i++) {
        carouselHtml += `
            <li style="height:${carouselHeight}px" title="${list[i].content}">${list[i].content}</li>
        `
    }
    return carouselHtml
}
const addCarouselEvent = (list) => {
    let carouselUl = document.getElementsByClassName("jdb-top-notice-carousel-ul")[0]
    let carouselLis = carouselUl.getElementsByTagName("li")
    let top = 0
    let timer = ''
    run()

    function run() {
        let time = (top % carouselHeight == 0) ? 4000 : 20
        let maxTop = -(carouselHeight * list.length)
        if (top <= maxTop) {
            top = 0
        }
        carouselUl.style.marginTop = top + 'px'
        timer = setTimeout(() => {
            top -= 2
            run()
        }, time)
    }
    for (let i = 0; i < carouselLis.length; i++) {
        // 鼠标移入
        carouselLis[i].onmouseover = () => {
            clearTimeout(timer)
            top = -i * carouselHeight
            carouselUl.style.marginTop = top + 'px'
        };
        // 鼠标移出
        carouselLis[i].onmouseout = () => {
            run()
        }
    }
}
export {
    addTopTimedAdvertisingFn,
    addTopNoticeFn
}