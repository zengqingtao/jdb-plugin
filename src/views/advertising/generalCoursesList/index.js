// 京准通系列总课程列表弹窗
import "./index.css"
import { numberConversion } from "../../../common/conversionNumber"
import { request } from "../../../sendMessage/index"
const generalCoursesModalFn = (list) => {
    let generalCoursesLis = ''
    for (let i = 0; i < list.length; i++) {
        generalCoursesLis += `
            <li>
                <div class="jdb-generalCourses-name" >${numberConversion(i+1)+'、'+list[i].courseName}</div>
                <div class="jdb-generalCourses-review" data-coursesId=${list[i].id}>查看课程</div>
            </li>
        `
    }
    let generalCoursesModal = document.createElement("div")
    generalCoursesModal.className = "jdb-generalCourses-modal"
    generalCoursesModal.innerHTML = `
        <div class="jdb-generalCourses-box">
            <div class="jdb-generalCourses-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="jdb-generalCourses-title">京准通系列总课程</div>
            <ul class="jdb-generalCourses-ul">
                ${generalCoursesLis}
            </ul>
        </div>
    `
    document.body.appendChild(generalCoursesModal)
    document.body.style.overflow = "hidden"
    document.getElementsByClassName("jdb-generalCourses-close")[0].addEventListener('click', () => {
        document.body.style.overflow = "auto"
        document.body.removeChild(generalCoursesModal)
    })
    let reviewBtns = document.getElementsByClassName("jdb-generalCourses-review")
    for (let i = 0; i < reviewBtns.length; i++) {
        reviewBtns[i].addEventListener('click', function(e) {
            let courseId = e.target.getAttribute("data-coursesId")
            let courseName = e.target.previousElementSibling.innerText
            request({ type: 8, courseId, courseName })
        })
    }
}
export {
    generalCoursesModalFn
}