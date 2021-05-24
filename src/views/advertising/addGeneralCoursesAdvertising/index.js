import "./index.css"
import { generalCoursesModalFn } from "../generalCoursesList/index"

const carouselHeight = 30
const addAdvertisingFn = (data) => {
    let carouselItem = getCarouselHtml(data)
    let advertisingHtml = document.createElement("div")
    advertisingHtml.className = "jdb-advertising-box"
    advertisingHtml.innerHTML = `
        <div class="jdb-advertising-title-and-carousel-box">
            <div class="jdb-advertising-title">
                <span>京准通</span>
                <span>系列总课程</span>
            </div>
            <div class="jdb-advertising-carousel" style="height:${carouselHeight}px;line-height:${carouselHeight}px;overflow:hidden">
                <ul class="jdb-advertising-carousel-ul" >
                    ${carouselItem}
                </ul>
            </div>
        </div>
        <div class="jdb-advertising-review">
            <span>立即查看</span>
            <i class="el-icon-arrow-right"></i>
        </div>
    `
    let parentElement = document.getElementsByClassName("account-container")[0]
    let targetElement = document.getElementsByClassName("profile-container")[0]
    parentElement.insertBefore(advertisingHtml, targetElement)
    document.getElementsByClassName('account-container')[0].style.height = 'auto'
    addCarouselEvent(data)
    document.getElementsByClassName("jdb-advertising-review")[0].addEventListener('click', () => {
        generalCoursesModalFn(data)
    })
    let chapterlis = document.getElementsByClassName("jdb-advertising-carousel-ul")[0].getElementsByTagName("li")
    for (let i = 0; i < chapterlis.length; i++) {
        chapterlis[i].addEventListener('click', () => {
            generalCoursesModalFn(data)
        })
    }

};
const getCarouselHtml = (list) => {
    let carouselHtml = ''
    for (let i = 0; i < list.length; i++) {
        carouselHtml += `
            <li style="height:${carouselHeight}px" title="${list[i].courseName}">${list[i].courseName}</li>
        `
    }
    return carouselHtml
}
const addCarouselEvent = (list) => {
    let carouselUl = document.getElementsByClassName("jdb-advertising-carousel-ul")[0]
    let carouselLis = carouselUl.getElementsByTagName("li")
    let top = 0
    let timer = ''
    run()

    function run() {
        let time = (top % carouselHeight == 0) ? 3000 : 20
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
    addAdvertisingFn
}