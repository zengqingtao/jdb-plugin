// 登录弹窗
import { message } from 'element-ui'
import "./index.css"
const validteAccountPassword = () => {
    let phone = document.getElementById("jdb-login-phone").value
    let password = document.getElementById("jdb-login-password").value
    let loginErrMsg = ''
    if (phone == "") {
        loginErrMsg = "手机号不能为空"
    } else if (!/^1[3456789]\d{9}$/.test(phone)) {
        loginErrMsg = "手机号输入有误"
    } else if (password == "") {
        loginErrMsg = "密码不能为空"
    } else if (password.length < 6 || password.length > 32) {
        loginErrMsg = "密码位数必须在6至32之间"
    } else {
        loginErrMsg = ""
    }
    loginErrMsg ? $(".jdb-login-err-tip").text(loginErrMsg) : login(phone, password)
}
const loginModalFn = () => {
    let loginModalDom = document.getElementsByClassName("jdb-login-modal")[0]
    if (loginModalDom) {
        loginModalDom.style.display = "flex"
        return
    }
    let loginModal = document.createElement("div")
    loginModal.innerHTML =
        `
        <div class="jdb-login-box">
            <div class="jdb-login-close">
                <i class="el-icon-close"></i>
            </div>
            <div class="title">账号登录</div>
            <div class="jdb-login-err-tip"></div>
            <input placeholder="请输入手机号"  id="jdb-login-phone" />
            <input placeholder="请输入密码" type="password" id="jdb-login-password">
            <button class="jdb-login-btn">登 录</button>
            <div class="jdb-resetPwd-register-btn-box">
                <span>找回密码</span>
                <span>免费注册</span>
            </div>
        </div>
        `
    loginModal.className = "jdb-login-modal"
    document.body.appendChild(loginModal)
    message.error("请登录使用")
    let loginBtn = loginModal.getElementsByClassName("jdb-login-btn")[0]
    let closeIcon = loginModal.getElementsByClassName("jdb-login-close")[0]
    let registerBtns = loginModal.getElementsByClassName("jdb-resetPwd-register-btn-box")[0].children
    loginBtn.addEventListener("click", () => {
        validteAccountPassword()
    })
    document.getElementById("jdb-login-password").addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            validteAccountPassword()
        }
    })
    let urls = [
        "https://www.jingdianbao.cn/#/resetpwd",
        "https://www.jingdianbao.cn/#/register"
    ]
    for (let i = 0; i < registerBtns.length; i++) {
        registerBtns[i].addEventListener("click", () => {
            window.open(urls[i])
        })
    }
    closeIcon.addEventListener("click", () => {
        document.body.removeChild(loginModal)
    })
};
const login = (phone, password) => {
    chrome.runtime.sendMessage({
            postData: { phone, password, type: '0' }
        },
        function(res) {
            if (res.code === 200) {
                $(".jdb-login-err-tip").text("")
                document.getElementsByClassName("jdb-login-modal")[0].style.display = "none"
                document.getElementById("jdb-login-phone").value = ""
                document.getElementById("jdb-login-password").value = ""
                message.success("登录成功")
            } else {
                $(".jdb-login-err-tip").text(res.msg)
            }
        }
    )
}

export {
    loginModalFn
}