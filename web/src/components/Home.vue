<template>
  <div class="container">
    <mt-header title="首页">
      <mt-button slot="right" @click="toPerson">我的</mt-button>
    </mt-header>
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item><img src="/static/images/1.jpg" alt="" /></mt-swipe-item>
        <mt-swipe-item><img src="/static/images/2.jpg" alt="" /></mt-swipe-item>
        <mt-swipe-item><img src="/static/images/3.jpg" alt="" /></mt-swipe-item>
        <mt-swipe-item><img src="/static/images/4.jpg" alt="" /></mt-swipe-item>
        <mt-swipe-item><img src="/static/images/5.jpg" alt="" /></mt-swipe-item>
      </mt-swipe>
    </div>
    <nav class="type-nav">
      <router-link
        class="nav-item"
        v-for="item in bookTypes"
        :key="item.type"
        :to="{ path: 'category', query: { type: item.type } }"
      >
        <i class="icon icon-types"></i>
        <h5>{{ item.title }}</h5>
      </router-link>
    </nav>

    <router-link class="searchs" to="/search">🔍搜索</router-link>
    <horizontal title="热门小说" :list="bookList_hot">
      <a slot="links" @click="changeHot">换一换</a>
    </horizontal>
    <horizontal title="排行榜" :list="bookList | tops"></horizontal>
    <horizontal title="限时免费" :list="bookList | free"></horizontal>
    <vertical :list="bookList | fresh">
      <div class="sub-title" slot="title">
        <h3>新书抢鲜</h3>
        <router-link to="/">MORE</router-link>
      </div>
    </vertical>
    <vertical :list="bookList | finish">
      <div class="sub-title" slot="title">
        <h3>畅销完本</h3>
        <router-link to="/">MORE</router-link>
      </div>
    </vertical>
  </div>
</template>

<script>
import horizontal from "@/components/common/HorizontalList";
import vertical from "@/components/common/VerticalList";

export default {
  name: "Home",
  components: {
    horizontal,
    vertical,
  },
  data() {
    return {
      bookTypes: [],
      bookList: [],
      bookList_hot: [],
    };
  },
  //数据过滤
  filters: {
    // hot(value) {
    //   if (!value) return "";
    //   var arr = [];
    //   debugger
    //   value.forEach((item, index) => {
    //     //简单更改下首页加载数据太多,可自行修改
    //     if (index < 20) {
    //       if (index % 2 == 1) {
    //         arr.push(item);
    //       }
    //     }
    //   });
    //   return arr;
    // },
    tops(value) {
      if (!value) return "";
      var arr = [];
      value.forEach((item, index) => {
        //简单更改下首页加载数据太多,可自行修改
        if (index < 20) {
          if (index % 3 == 1) {
            arr.push(item);
          }
        }
      });
      return arr;
    },
    free(value) {
      if (!value) return "";
      var arr = [];
      value.forEach((item, index) => {
        //简单更改下首页加载数据太多,可自行修改
        if (index < 20) {
          if (index % 5 == 0) {
            arr.push(item);
          }
        }
      });
      return arr;
    },
    fresh(value) {
      if (!value) return "";
      let arr = [];
      value.map((item) => {
        //该函数指定字符串中的首个字符是否是数字。如果是，则对字符串进行解析，直到到达数字的末端为止，然后以数字返回该数字，而不是作为字符串。
        if (parseFloat(item.wordcount) < 120) {
          arr.push(item);
        }
      });
      return arr.slice(4, 8);
    },
    finish(value) {
      if (!value) return "";
      return value.slice(0, 4);
    },
  },
  methods: {
    getBookList() {
      this.$axios.get("/booklist").then((res) => {
        if (res.data.state == "success") {
          this.bookList = res.data.data;
          this.changeHot();
        } else {
          this.$toast({
            message: "接口错误",
          });
        }
      });
    },
    //换一换
    changeHot() {
      let arr = [];
      let max = this.bookList.length;
      for (let i = 0; i < 10; i++) {
        //获取随机index
        let index = Math.floor(Math.random() * max + 1);
        arr.push(this.bookList[index]);
      }

      this.bookList_hot = arr;
    },
    //跳到我的
    toPerson() {
      if (localStorage.getItem("userInfo")) {
        this.$router.push("/person");
      } else {
        this.$router.push("/login");
      }
    },
  },
  created() {
    if (localStorage.getItem("userInfo")) {
      this.$store.dispatch("getInfo");
    }

    this.getBookList();
    this.bookTypes = this.$store.state.book.types;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.container {
  header {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
  }

  .swipe {
    height: 180px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .type-nav {
    display: flex;
    background-color: #f8f8f8;
    padding: 10px 0;

    .nav-item {
      flex: 1;
      text-align: center;

      .icon {
        display: inline-block;
        background-repeat: no-repeat;
      }

      .icon-types {
        width: 24px;
        height: 24px;
        background-image: url(/static/images/sprite.0.50.png);
      }

      &:nth-of-type(1) {
        i {
          background-position: -63px -28px;
        }
      }

      &:nth-of-type(2) {
        i {
          background-position: 0 0;
        }
      }

      &:nth-of-type(3) {
        i {
          background-position: 0 -30px;
        }
      }

      &:nth-of-type(4) {
        i {
          background-position: 0 -60px;
        }
      }

      &:nth-of-type(5) {
        i {
          background-position: -30px -30px;
        }
      }
    }
  }

  .searchs {
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    width: 90%;
    margin: 15px auto;
    background-color: #efefef;
    font-size: 16px;
  }
}
</style>
