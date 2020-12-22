<template>
  <div class="person" v-if="info">
    <mt-header title="个人中心">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="info">
      <div class="head">
        <img
          :src="head_img || '/static/images/read.png'"
          alt=""
          @click="showSheet"
        />
        <input
          ref="uploadImg"
          type="file"
          @change="changeFile"
          class="uploadImg"
          accept="image/*"
        />
      </div>
      <div class="name">{{ info.user }}</div>
      <div class="item">
        <mt-cell title="我的书架" is-link to="/myShelf"></mt-cell>
      </div>
    </div>
    <mt-button class="btn" type="danger" @click="loginOut">退出登录</mt-button>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"> </mt-actionsheet>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "person",
  data() {
    return {
      info:null,
      rate: 0,
      actions: [{ name: "上传", method: this.upLoadPic }],
      sheetVisible: false,
    };
  },
  computed: {
    
    head_img() {
      let head_img = JSON.stringify(this.info.head_img);
      if (head_img.indexOf("uploads") > -1) {
        //存图片地址
        return this.$axios.defaults.baseURL + "/" + this.info.head_img;
      } else if (this.info.head_img) {
        //存的base64
        return this.info.head_img;
      } else {
        return null;
      }
    },
  },
  methods: {
    loginOut() {
      MessageBox({
        title: "提示",
        message: "确定退出登录?",
        showCancelButton: true,
      }).then((action) => {
        if (action == "confirm") {
          localStorage.removeItem("userInfo");
          this.$router.push("/login");
        } else {
          return false;
        }
      });
    },
    //上传头像
    upLoadPic() {
      this.$refs.uploadImg.click();
    },
    changeFile(e) {
      let file = e.target.files[0];
      //存入项目静态文件目录
      //this.saveImgUrl(file)
      //存入数据库base64
      this.saveBase64(file);
    },
    saveImgUrl(file) {
      let formData = new FormData();
      formData.append("avatar", file);
      formData.append("userId", this.info.id);

      this.$axios
        .post(`/uploadImg`, formData, {
          onUploadProgress: (progressEvent) => {
            //这里要用箭头函数,不然这个this的指向会有问题
            this.rate = parseInt(
              (progressEvent.loaded / progressEvent.total) * 100
            );
          },
        })
        .then((res) => {
          if (res.data.state == "success") {
            this.$store.dispatch("getInfo", res.data.data);
            this.info = JSON.parse(localStorage.getItem('userInfo'));
            setTimeout(() => {
              this.$toast(res.data.msg);
            }, 500);
          } else {
            this.$toast({
              message: res.data.msg,
              
            });
          }
        });
    },
    saveBase64(file) {
      let that = this;
      let base64 = "";
      let reader = new FileReader();
      reader.onload = (function (file) {
        return function (e) {
          base64 = this.result; //这个就是base64的数据了

          //存入数据库
          that.$axios
            .post("/uploadBase64", { base64: base64, userId: that.info.id })
            .then((res) => {
              if (res.data.state == "success") {
                that.$store.dispatch("getInfo", res.data.data);
                that.info = JSON.parse(localStorage.getItem('userInfo'));
                setTimeout(() => {
                  that.$toast(res.data.msg);
                }, 500);
              } else {
                that.$toast({
                  message: res.data.msg,
                  
                });
              }
            });
        };
      })(file);
      reader.readAsDataURL(file);
    },

    showSheet() {
      this.sheetVisible = true;
    },
    //返回
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
      this.info = JSON.parse(localStorage.getItem('userInfo'));
  },
};
</script>

<style lang="less">
.person {
  .info {
    padding-top: 80px;

    .head {
      margin: 0 auto;
      width: 80px;
      height: 80px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .uploadImg {
        display: none;
      }
    }

    .name {
      text-align: center;
      font-size: 20px;
      line-height: 1.8;
      margin-bottom: 60px;
    }

    .item {
      .mint-cell {
        border-bottom: 1px solid #d9d9d9;

        .mint-cell-wrapper {
          background: none;
        }
      }
    }
  }

  .btn {
    display: block;
    width: 80%;
    margin: 40px auto 0;
  }
}
</style>