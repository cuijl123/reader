<template>
  <div class="bookContent" v-if="contents.length !== 0">
    <!--头部-->
    <top-menu :class="{ show: menu }"></top-menu>
    <!--内容 -->
    <div class="reader-container" :bg="currentStyle" :night="night">
      <mt-header fixed :title="title"></mt-header>
      <div class="content">
        <p v-for="item in contents" :style="{ fontSize: `${fontSize}px` }">
          {{ item }}
        </p>
      </div>
      <ul class="btns">
        <li @click="preChapter">上一章</li>
        <li @click="nextChapter">下一章</li>
      </ul>
    </div>
    <!--底部菜单-->
    <bottom-menu
      :class="{ show: menu }"
      @switchList="switchList"
      @switchFonts="switchFonts"
    ></bottom-menu>

    <!--显示菜单栏 点击屏幕中部弹出菜单  点击屏幕上下部翻页-->
    <div class="show-menus" @click="showMenu"></div>
    <div class="page-up" @click="pageUp">上一页</div>
    <div class="page-down" @click="pageDown">下一页</div>

    <!--章节目录-->
    <title-list
      :class="{ show: cover }"
      :book-id="bookId"
      @switchList="switchList"
    ></title-list>

    <!--字体及背景-->
    <fonts :class="{ show: font }"></fonts>
  </div>
</template>

<script>
import BottomMenu from "./common/BottomMenu.vue";
import TopMenu from "./common/topMenu.vue";
import { mapState } from "vuex";
import TitleList from "./common/TitleList.vue";
import Fonts from "./common/Fonts.vue";

export default {
  name: "bookContent",
  components: {
    TopMenu,
    BottomMenu,
    TitleList,
    Fonts,
  },
  data() {
    return {
      title: "",
      bookId: "",
      cover: false,
      contents: [],
    };
  },
  computed: {
    ...mapState({
      menu: (state) => state.book.menu,
      font: (state) => state.book.font,
      night: (state)=> state.book.night,
      fontSize: (state) => state.book.fontSize,
      currentCpt: (state) => state.book.currentCpt,
      currentStyle: (state) => state.book.currentStyle,
    }),
  },
  watch: {
    currentCpt(value) {
      this.getContent(this.$route.params.id, value);
      window.scrollTo(0, 0);
    },
  },
  methods: {
    //获取章节内容
    getContent(bookId, chapter) {
      this.$axios
        .get(`/getContent?bookId=${bookId}&chapter=${chapter}`)
        .then((res) => {
          if (res.data.state == "success") {
            this.title = res.data.data.title;
            this.contents = res.data.data.content.split("-");
          } else {
            this.$toast({
              message: res.data.msg,
              
            });
          }
        });
    },

    //菜单显示与隐藏
    showMenu() {
      this.$store.dispatch("menus");
    },
    //上一章
    preChapter() {
      this.$store.dispatch("preCpt").then(() => {
        this.$nextTick(() => {
          window.scrollTo(0, 0);
        });
      });
    },
    //下一章
    nextChapter() {
      this.$store.dispatch("nextCpt").then(() => {
        this.$nextTick(() => {
          window.scrollTo(0, 0);
        });
      });
    },
    //向上翻页
    pageUp() {
      let target = window.pageYOffset - window.innerHeight - 80;
      this.startScroll(target);
    },
    //向下翻页
    pageDown() {
      let target = window.pageYOffset + window.innerHeight - 80;
      this.startScroll(target);
    },
    startScroll(target) {
      //window.scrollTo(0, target);
      window.scrollTo({
        top: target,
        behavior: "smooth",
      });
    },
    //显示/隐藏章节目录
    switchList() {
      this.cover = !this.cover;
    },
    //显示/隐藏字体设置
    switchFonts() {
      this.fonts = !this.fonts;
    },
    //保存最近浏览的记录
    saveLately(userId, bookId, chapter) {
      this.$axios
        .post(`/saveLately`, { userId, bookId, chapter })
        .then((res) => {
          if (res.data.state == "success") {
          } else {
            this.$toast({
              message: "保存浏览记录失败",
              
            });
          }
        });
    },
  },
  created() {
    let userId = JSON.parse(localStorage.getItem("userInfo")).id;
    this.bookId = this.$route.params.id;

    //先获取该书的阅读记录
    this.$axios
      .get(`/getLately?userId=${userId}&bookId=${this.bookId}`)
      .then((res) => {
        if (res.data.state == "success") {
          //如果有记录
          let currentCpt = res.data.data.chapter;
          //记录与store中一致
          if (currentCpt == this.$store.state.book.currentCpt) {
            this.getContent(this.$route.params.id, currentCpt);
            return false;
          }
          //不一致
          this.$store.dispatch("currentCpt", currentCpt);
        } else {
          this.getContent(this.$route.params.id, 1);
        }
      });
  },
  //退出前保存章节和阅读位置
  destroyed() {
    let userId = JSON.parse(localStorage.getItem("userInfo")).id;
    let bookId = this.bookId;
    let chapter = this.$store.state.book.currentCpt;
    this.saveLately(userId, bookId, chapter);
  },
};
</script>

<style lang="less">
.bookContent {

  // less定义变量
  .bgc(@color) {
    background-color: @color;
    .mint-header {
      background-color: @color;
    }
  }

  .mint-header-title {
    color: #555;
  }

  .reader-container {
    padding: 50px 15px 0;
    color: #555;

    &[bg="style1"] {
     .bgc(#e9dfc7);
      &[night="true"] {
        .bgc(#000);
      }
    }
    &[bg="style2"] {
     .bgc(#e7eee5);
      &[night="true"] {
        .bgc(#000);
      }
    }
    &[bg="style3"] {
     .bgc(#a4a4a4);
      &[night="true"] {
        .bgc(#000);
      }
    }
    &[bg="style4"] {
     .bgc(#cdefcd);
      &[night="true"] {
        .bgc(#000);
      }
    }
    &[bg="style5"] {
     .bgc(#283548);
      &[night="true"] {
        .bgc(#000);
      }
    }

    .btns {
      width: 100%;
      padding: 15px 0;
      height: 40px;
      font-size: 0;
      text-align: center;
      z-index: 99;

      li {
        width: 100px;
        display: inline-block;
        line-height: 40px;
        color: #fff;
        text-align: center;
        background-color: #26a2ff;
        font-size: 14px;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        margin: 0 15px;
      }
    }
  }

  .show-menus {
    position: fixed;
    top: 30%;
    width: 100%;
    height: 45%;
  }

  .page-up {
    position: fixed;
    top: 50px;
    height: 25%;
    width: 100%;
    text-indent: -9999px;
    z-index: 5;
  }

  .page-down {
    position: fixed;
    bottom: 70px;
    height: 25%;
    width: 100%;
    text-indent: -9999px;
    z-index: 5;
  }
}
</style>