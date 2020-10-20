import "./index.css"
import { message } from "element-ui"
import { activeAccount } from "../../sendMessage/index"

const activeAccountModalFn = () => {
    let activeAccountModal = document.createElement("div")
    activeAccountModal.className = "jdb-active-account-modal"
    activeAccountModal.innerHTML = `
        <div class="jdb-active-account-box">
            <div class="jdb-active-account-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="jdb-active-account-title">激活账号</div>
            <div class="jdb-active-account-input-box">
                <span class="label">激活码：</span>
                <input placeholder="请输入激活码"  id="jdb-active-code"/>
            </div>
            <button class="jdb-active-account-btn">激活</button>
        </div>
    `
    document.body.appendChild(activeAccountModal)
    message.error("账号尚未激活，无法使用，请联系运营经理。")
    document.body.style.overflow = 'hidden'
    document.getElementsByClassName("jdb-active-account-close")[0].addEventListener('click', (e) => {
        document.body.style.overflow = 'auto'
        document.body.removeChild(document.getElementsByClassName("jdb-active-account-modal")[0])
    })
    document.getElementsByClassName("jdb-active-account-btn")[0].addEventListener('click', (e) => {
        let activeCode = document.getElementById("jdb-active-code").value
        if (activeCode === '') {
            message.error("激活码不能为空")
            return;
        }
        activeAccount(activeCode)
    })

}
export {
    activeAccountModalFn
}