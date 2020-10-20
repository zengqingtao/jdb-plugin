<template>
  <div class="login-container">
    <div v-if="loading">loading...</div>
    <div v-else>
      <!-- 未登录 -->
      <div class="login-box" v-if="!isLogin">
        <div class="title">账户登录</div>
        <p class="error-msg">{{errorMsg}}</p>
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        <el-input
          class="pwd-inp"
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          @keyup.enter.native="login"
        ></el-input>
        <el-button type="primary" @click="login">登录</el-button>
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
            {{accountInfo.username}}
          </p>
          <p>
            <span>会员等级：</span>
            {{accountInfo.vipLevel}}
          </p>
          <p>
            <span>会员时间：</span>
            {{accountInfo.vipValidityPeriod}}{{accountInfo.vipValidityPeriod==='永久有效'?'':'到期'}}
          </p>
          <div class="btn-box">
            <el-button type="primary" @click="logout">退出登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { all } from "q";
import { checkLogin, login, getJdbUserVip, logout } from "../../common/api";
export default {
  name: "app",
  data() {
    return {
      loading: true,
      isLogin: false,
      input: "",
      errorMsg: "",
      form: {
        phone: "",
        password: "",
      },
      accountInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
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
      const { data: res } = await getJdbUserVip();
      if (res.code === 200) {
        let userInfo = {};
        userInfo.username = username;
        userInfo.vipLevel = res.data.vipLevel;
        userInfo.vipValidityPeriod = res.data.endDate;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.accountInfo = userInfo;
        window.close();
      } else {
        this.accountInfo = {};
        this.errorMsg = res.msg;
      }
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
        this.getUserVipInfo(res.data.username);
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
      }
    },
    register() {
      let url = "https://www.jingdianbao.cn/#/register";
      window.open(url);
    },
    resetPassword() {
      let url = "https://www.jingdianbao.cn/#/resetpwd";
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
      color: #4d75ff;
      font-size: 26px;
      font-weight: bold;
      padding-bottom: 10px;
    }
    .error-msg {
      min-height: 18px;
      font-size: 14px;
      color: #f56c6c;
    }
    /deep/ .el-input__inner {
      height: 40px;
      font-size: 16px;
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
      background-color: #4d75ff;
    }
    /deep/ .el-button:hover {
      background-color: #3159e4;
    }
    .btn-box {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      font-size: 14px;
      color: #666;
      padding-top: 50px;
      span {
        margin-left: 15px;
        cursor: pointer;
        &:hover {
          color: #4d75ff;
        }
      }
    }
  }
  // 已登录
  .logged-in {
    .account-box {
      width: 310px;
      height: 157px;
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
          background-color: #4d75ff;
          &:hover {
            background-color: #3159e4;
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