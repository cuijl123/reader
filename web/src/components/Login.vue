<template>
  <div class="login">
    <mt-button icon="back" @click="goBack" slot="left" class="getBack"></mt-button>
    <div class="logo"><img :src="userPic" /></div>
    <div class="login-form">
      <div class="form-item">
        <i class="icon icon-user"></i>
        <mt-field
          placeholder="请输入邮箱/个性账号"
          v-model="username"
          @blur.native.capture="queryPic"
        ></mt-field>
      </div>
      <div class="form-item">
        <i class="icon icon-lock"></i>
        <mt-field
          :type="passwordShow ? 'text' : 'password'"
          placeholder="请输入密码"
          v-model="password"
        ></mt-field>
        <mt-switch v-model="passwordShow"></mt-switch>
      </div>
      <div class="form-item">
        <i class="icon icon-check"></i>
        <mt-field type="text" placeholder="请输入验证码" v-model="captcha"
          ><a @click="changeCaptcha"
            ><img :src="captchaUrl" height="45px" width="100px" /></a
        ></mt-field>
      </div>
      <div class="others">
        <router-link to="/register">注册账户</router-link>
        <span>忘记密码</span>
      </div>
      <mt-button type="primary" @click="login">登录</mt-button>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
export default {
  name: "login",
  data() {
    return {
      passwordShow: false,
      username: "",
      password: "",
      captcha: "",
      userPic: "/static/images/read.png",
      captchaUrl: this.$axios.defaults.baseURL + "/getCaptcha",
    };
  },
  methods: {
    //登录
    login() {
      if (!this.username || !this.username || !this.username) {
        this.$toast({
          message: "信息填写不完整",
          
        });

        return;
      }
      //前端验证验证码
      let captcha = document.cookie.split("captcha=")[1];
      if (this.captcha !== captcha) {
        this.$toast({
          message: "验证码错误",
          
        });

        return;
      }

      this.$axios
        .post("/login", {
          username: this.username,
          password: md5(this.password),
        })
        .then((res) => {
          if (res.data.state == "success") {
            this.$toast({
              message: res.data.msg,
              
            });
            //获取用户信息
            this.$store.dispatch("getInfo", res.data.data);
            //获取我的书架
             this.$store.dispatch("getShelf",res.data.data.id);
            this.$router.push("/");
          } else {
            this.$toast({
              message: res.data.msg,
              
            });
          }
        });
    },
    //输入完账号查询头像
    queryPic() {
      this.$axios.get(`/queryPic?username=${this.username}`).then((res) => {
        if (res.data.state == "success") {
          let head_img = JSON.stringify(res.data.data.head_img);
          if (head_img.indexOf("uploads") > -1) {
            this.userPic =this.$axios.defaults.baseURL + "/" + res.data.data.head_img;
          }else if(res.data.data.head_img){
            this.userPic = res.data.data.head_img;
          }else{
            this.userPic = "/static/images/read.png";
          }
        } else {
           return
        }
      });
    },
    //点击更换验证码
    changeCaptcha() {
      this.captchaUrl =
        this.$axios.defaults.baseURL + "/getCaptcha?d=" + new Date();
    },

    //返回上一级
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less">
.login {

  .getBack{
    margin-top:10px;
    margin-left: 10px;
  }

  .logo {
    width: 80px;
    height: 80px;
    margin: 100px auto 30px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 40px;
      object-fit: cover;
    }
  }

  .login-form {
    width: 80%;
    margin: 0 auto;

    .form-item {
      display: block;
      height: 48px;
      line-height: 48px;
      display: flex;
      margin-bottom: 15px;
      border-bottom: 1px solid #d9d9d9;

      .mint-cell-wrapper {
        background: none;
      }

      i {
        margin-top: 13px;
      }

      .mint-cell {
        flex: 1;
      }

      .icon.icon-user {
        width: 24px;
        height: 24px;
        background-image: url(/static/images/user.svg);
      }
      .icon.icon-lock {
        width: 24px;
        height: 24px;
        background-image: url(/static/images/lock.svg);
      }
      .icon.icon-check {
        width: 24px;
        height: 24px;
        background-image: url(/static/images/check.svg);
      }
    }

    .others {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #26a2ff;
      padding: 20px 0;

      span {
        flex: 1;
        text-align: right;
      }

      a {
        flex: 1;
        color: #26a2ff;
      }
    }

    .mint-button {
      width: 100%;
    }
  }
}
</style>