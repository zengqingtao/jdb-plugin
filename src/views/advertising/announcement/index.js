// 京东商智首页广告
import { _ } from "core-js"
import "./index.css"
const announcement = (list) => {
    let lis = getLis(list)
    let indicators = getIndicators(list)
    let announcement = document.createElement("div")
    announcement.className = 'jdb-announcement-box'
    announcement.innerHTML = `
        <ul class="jdb-announcement-carousel-ul">
            ${lis}
        </ul>
        <ul  class="jdb-announcement-carousel-indicators-ul" style="marginLeft:-${38 * list.length / 2};display:${list.length > 1 ? 'flex' : 'none'}">
            ${indicators}
        </ul>
    `
    let parent = document.getElementsByClassName("container")[0]
    let target = parent.getElementsByClassName('date-picker-container')[0]
    parent.children[1].style.marginBottom = '10px'
    parent.insertBefore(announcement, target)
    list.length > 1 ? addCarouselEvent(list) : '';
    let carouselItems = document.getElementsByClassName("jdb-announcement-carousel-ul")[0].getElementsByTagName('li')
    for (let i = 0; i < carouselItems.length; i++) {
        carouselItems[i].addEventListener("click", () => {
            if (list[i].link) {
                window.open(list[i].link)
            }
        })
    }
}
const getLis = (list) => {
    let lis = ``
    for (let i = 0; i < list.length; i++) {
        lis += `
            <li class="${list[i].link?'show-pointer':''}">
                <div>
                    <img src="${list[i].imageUrl}" />
                </div>
            </li>
        `
    }
    return lis
}
const getIndicators = (list) => {
    let lis = ''
    for (let i = 0; i < list.length; i++) {
        lis += `
            <li>
                <div></div>
            </li>
        `
    }
    return lis
}
const addCarouselEvent = (list) => {
    const carouselWidth = 1200
    let carouselUl = document.getElementsByClassName("jdb-announcement-carousel-ul")[0]
    let indicatorLis = list.length > 1 ? document.getElementsByClassName("jdb-announcement-carousel-indicators-ul")[0].getElementsByTagName("li") : ''
    let carouselLis = carouselUl.getElementsByTagName("li")
    let left = 0
    let timer = ''
    run()

    function run() {
        let time;
        if (left % carouselWidth == 0) {
            time = 3000
            let ind = left === 0 ? 0 : (-left / carouselWidth)
            ind = ind === indicatorLis.length ? 0 : ind
            for (let i = 0; i < indicatorLis.length; i++) {
                if (i === ind) {
                    indicatorLis[i].style.opacity = 1
                } else {
                    indicatorLis[i].style.opacity = 0.5
                }
            }
        } else {
            time = 10
        }
        let maxLeft = -(carouselWidth * list.length)
        if (left <= maxLeft) {
            left = 0
        }
        carouselUl.style.marginLeft = left + 'px'
        timer = setTimeout(() => {
            left -= 200
            run()
        }, time)
    }
    for (let i = 0; i < carouselLis.length; i++) {
        // 鼠标移入
        carouselLis[i].onmouseover = () => {
            clearTimeout(timer)
            left = -i * carouselWidth
            carouselUl.style.marginLeft = left + 'px'
        };
        // 鼠标移出
        carouselLis[i].onmouseout = () => {
            run()
        }
    }
    for (let j = 0; j < indicatorLis.length; j++) {
        indicatorLis[j].onmouseover = () => {
            clearTimeout(timer)
            left = -j * carouselWidth
            carouselUl.style.marginLeft = left + 'px'
            for (let k = 0; k < indicatorLis.length; k++) {
                indicatorLis[k].style.opacity = k === j ? 1 : 0.5
            }
        }
    }

}
export {
    announcement
}