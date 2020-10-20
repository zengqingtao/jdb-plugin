import { from } from "core-js/fn/array"
import { message } from "element-ui"
import "./index.css"
import { request } from "../../../sendMessage/index"

const evaluationModalFn = (courseName, courseId) => {
    let evaluationModal = document.createElement("div")
    evaluationModal.className = "jdb-evaluation-modal"
    evaluationModal.innerHTML = `
        <div class='jdb-evaluation-box'>
            <div class="jdb-evaluation-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="jdb-evaluation-title" title="《${courseName}》">
                《<span>${courseName}</span>》评价   
            </div>
            <div class="jdb-evaluation-score-box">
                <div class="jdb-evaluation-star">
                    <i class="el-icon-star-on"></i>
                    <i class="el-icon-star-on"></i>
                    <i class="el-icon-star-on"></i>
                    <i class="el-icon-star-on"></i>
                    <i class="el-icon-star-on"></i>
                </div>
                <div>5分</div>
            </div>
            <button class="jdb-evaluation-sumbit-button">提交</button>
        </div>
    `
    document.body.appendChild(evaluationModal)
    document.getElementsByClassName("jdb-evaluation-close")[0].addEventListener('click', () => {
        document.body.removeChild(evaluationModal)
    })
    let starBtns = document.getElementsByClassName("jdb-evaluation-star")[0].children
    let score = 5
    for (let i = 0; i < starBtns.length; i++) {
        starBtns[i].addEventListener('click', () => {
            score = i + 1
            document.getElementsByClassName("jdb-evaluation-score-box")[0].lastElementChild.innerText = score + '分'
            for (let j = 0; j < starBtns.length; j++) {
                if (j <= i) {
                    starBtns[j].classList.remove('el-icon-star-off')
                    starBtns[j].classList.add('el-icon-star-on')
                } else {
                    starBtns[j].classList.remove('el-icon-star-on')
                    starBtns[j].classList.add('el-icon-star-off')
                }
            }
        })
    }
    document.getElementsByClassName("jdb-evaluation-sumbit-button")[0].addEventListener('click', () => {
        request({ type: '11', courseName, courseId, score })
    })
}
const feedbackModalFn = (courseId) => {
    let feedbackModal = document.createElement("div")
    feedbackModal.className = "jdb-feedback-modal"
    feedbackModal.innerHTML = `
        <div class="jdb-feedback-box">
            <div class="jdb-feedback-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="jdb-feedback-title">意见反馈</div>
            <textarea class="jdb-feedback-textarea" rows="5" maxLength="150" placeholder="请输入你想听的课程或其他建议意见" ></textarea>
            <button class="jdb-feedback-submit-button">提交</button>
        </div>
    `
    let evaluationModal = document.getElementsByClassName("jdb-evaluation-modal")[0]
    if (evaluationModal) {
        document.body.removeChild(evaluationModal)
    }
    document.body.appendChild(feedbackModal)
    document.getElementsByClassName("jdb-feedback-close")[0].addEventListener("click", () => {
        document.body.removeChild(feedbackModal)
    })
    document.getElementsByClassName("jdb-feedback-submit-button")[0].addEventListener("click", () => {
        let feedbackText = document.getElementsByClassName("jdb-feedback-textarea")[0].value
        if (feedbackText === '') {
            message.error("请输入你想听的课程或其他建议意见")
        } else {
            request({ type: '12', feedbackContent: feedbackText })
        }
    })
}
export {
    evaluationModalFn,
    feedbackModalFn
}