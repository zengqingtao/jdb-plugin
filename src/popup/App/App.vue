<template>
  <div class="login-container">
    <div v-if="loading">loading...</div>
    <div v-else>
      <!-- 未登录 -->
      <div class="login-box" v-if="!isLogin">
        <div class="title">
          {{ checked ? "京店宝账号登录" : "店长管家账号登录" }}
        </div>
        <p class="error-msg">{{ errorMsg }}</p>
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        <el-input
          class="pwd-inp"
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          @keyup.enter.native="login"
        ></el-input>
        <el-button type="primary" @click="login">登录</el-button>
        <div class="checkbox">
          <div @click="checked=!checked">
            <img src="../../assets/images/jdb.png" alt="">
            <span>{{checked?'店长管家账号登录':'京店宝账号登录'}}</span>
          </div>
        </div>
        <div class="btn-box">
          <span @click="resetPassword">找回密码</span>
          <span @click="register">免费注册</span>
        </div>
      </div>
      <!-- 已登录 -->
      <div class="logged-in" v-else>
        <div class="account-box">
          <p>
            <span>账号：</span>
            {{ accountInfo.username }}
          </p>
          <p><span>版本号：</span>{{version}}</p>
          <div class="btn-box">
            <el-button type="primary" @click="logout">退出登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { checkLogin, login, logout } from "../../common/api";
import config from "../../config/index"
import manifest from "../../manifest.json"
export default {
  name: "app",
  data() {
    return {
      version:manifest.version,
      loading: true,
      isLogin: false,
      input: "",
      errorMsg: "",
      form: {
        phone: "",
        password: "",
      },
      accountInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
      checked: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      const { data: res } = await checkLogin();
      this.loading = false;
      if (res.code === 200) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    async getUserVipInfo(username) {
        let userInfo = {};
        userInfo.username = username;
        userInfo.vipLevel = '';
        userInfo.vipValidityPeriod = '';
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.accountInfo = userInfo;
        window.close();
    },
    validateLoginForm() {
      if (this.form.phone == "") {
        return (this.errorMsg = "手机号不能为空");
      } else if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
        return (this.errorMsg = "手机号输入有误");
      } else if (this.form.password == "") {
        return (this.errorMsg = "密码不能为空");
      } else if (
        this.form.password.length < 6 ||
        this.form.password.length > 32
      ) {
        return (this.errorMsg = "密码位数必须在6至32之间");
      } else {
        this.errorMsg = "";
      }
    },
    async login() {
      await this.validateLoginForm();
      if (this.errorMsg !== "") return;
      const params = {
        phoneNumber: this.form.phone,
        password: this.form.password,
        username: this.form.phone,
      };
      const { data: res } = await login(params);
      if (res.code === 200) {
        localStorage.setItem("token", res.data.token);
        this.getUserVipInfo(res.data.phone);
      } else {
        this.isLogin = false;
        this.errorMsg = res.msg;
      }
    },
    async logout() {
      const { data: res } = await logout();
      if (res.code === 200) {
        localStorage.clear();
        window.close();

        // 给content发送消息（目的关闭当前弹窗等）
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){  
          chrome.tabs.sendMessage(tabs[0].id, {message:"calculate"}, function(response) {});//end  sendMessage   
        }); //end query
        
      }
    },
    register() {
      let url =  config.dzgjUrl +'register';
      window.open(url);
    },
    resetPassword() {
      let url = config.dzgjUrl+'resetpwd';
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  // 登录框
  .login-box {
    width: 336px;
    height: 393px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 15px 15px;
    box-sizing: border-box;
    .title {
      color: #333;
      font-size: 26px;
      font-weight: bold;
      padding-bottom: 10px;
    }
    .error-msg {
      min-height: 18px;
      font-size: 14px;
      color: #E1251B;
    }
    /deep/ .el-input__inner {
      height: 40px;
      font-size: 16px;
    }
     /deep/ .el-input,/deep/ .el-input__inner{
       border-color: #ddd;
     }
    .pwd-inp {
      margin-top: 14px;
    }
    /deep/ input:-webkit-autofill {
      box-shadow: 0 0 0px 1000px white inset !important;
    }
    /deep/ .el-button {
      width: 100%;
      height: 40px;
      font-size: 18px;
      font-weight: 400;
      margin-top: 34px;
      border-color: #E1251B;
      background-color: #E1251B;
    }
    /deep/ .el-button:hover {
      border-color: #ec1f15;
      background-color: #ec1f15;
    }
    .checkbox {
      width:100%;
      padding-top: 10px;
      div{
        width: 150px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      img{
        width: 16px;
        height: 16px;
      }
      span{
        padding-left:3px;
      }
    }
    .btn-box {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      font-size: 14px;
      color: #666;
      padding-top: 20px;
      span {
        margin-left: 15px;
        cursor: pointer;
        &:hover {
          color: #E1251B;
        }
      }
    }
  }
  // 已登录
  .logged-in {
    .account-box {
      width: 310px;
      height: 120px;
      padding: 27px 0 0 20px;
      font-size: 14px;
      color: #333;
      p {
        margin: 0;
      }
      p + p {
        padding-top: 10px;
      }
      p > span {
        color: #999;
      }
      .btn-box {
        padding-top: 21px;
        text-align: center;
        /deep/ .el-button {
          width: 100px;
          height: 30px;
          padding: 0;
          border-color: #E1251B;
          background-color: #E1251B;
          &:hover {
          border-color: #ec1f15;
            background-color: #ec1f15;
          }
        }
      }
    }
    .login-success-tips {
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #67c23a;
      font-size: 20px;
    }
  }
}
</style>