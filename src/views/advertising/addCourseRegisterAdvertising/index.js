// 课程报名广告
import './index.css'
const addCourseRegisterAdFn = (list) => {
    let lis = getLis(list)
    let indicators = getIndicators(list)
    let courseRegisterAdBox = document.createElement('div')
    courseRegisterAdBox.className = 'jdb-courseRegister-box'
    courseRegisterAdBox.innerHTML = `
        <ul class="jdb-courseRegister-carousel-ul">
            ${lis}
        </ul>
        <ul  class="jdb-courseRegister-carousel-indicators-ul" style="margin-left:-${25 * list.length / 2};display:${list.length > 1 ? 'flex' : 'none'}">
            ${indicators}
        </ul>
    `
    const parentElement = document.getElementsByClassName('right-components')[0]
    const targetElement = parentElement.children[0]
    parentElement.insertBefore(courseRegisterAdBox, targetElement)
    list.length > 1 ? addCarouselEvent(list) : '';
    let carouselItems = document.getElementsByClassName("jdb-courseRegister-carousel-ul")[0].getElementsByTagName('li')
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
    const carouselWidth = 343
    let carouselUl = document.getElementsByClassName("jdb-courseRegister-carousel-ul")[0]
    let indicatorLis = list.length > 1 ? document.getElementsByClassName("jdb-courseRegister-carousel-indicators-ul")[0].getElementsByTagName("li") : ''
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
            time = 25
        }
        let maxLeft = -(carouselWidth * list.length)
        if (left <= maxLeft) {
            left = 0
        }
        carouselUl.style.marginLeft = left + 'px'
        timer = setTimeout(() => {
            left -= carouselWidth / 8
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
    addCourseRegisterAdFn
}