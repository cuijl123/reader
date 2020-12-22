<template>
  <div class="bookDetail" v-if="book">
    <mt-header :title="book.name">
      <mt-button icon="back" @click="goBack" slot="left"></mt-button>
      <router-link to="/" slot="right">
        <mt-button>首页</mt-button>
      </router-link>
    </mt-header>
    <div class="book">
      <div class="image">
        <img :src="book.images" :alt="book.name" />
      </div>
      <div class="base">
        <h4>{{ book.name }}</h4>
        <p>作者：{{ book.author }}</p>
        <p>分类：{{ book.type }}</p>
        <p>{{ book.wordcount }}万字</p>
        <rantings :score="book.ratings"></rantings>
      </div>
    </div>
    <div class="btns">
      <mt-button type="primary" @click="startRead">开始阅读</mt-button>
      <mt-button
        :type="btnText == '加入书架' ? 'primary' : 'default'"
        @click="insertShelf"
        :disabled="btnText !== '加入书架'"
        >{{ btnText }}</mt-button
      >
    </div>
    <div class="intro">{{ book.intro }}</div>
    <div class="type">
      <h5>类别标签</h5>
      <span>{{ book.type }}</span>
    </div>
    <div class="likes">
      <h5>相似推荐</h5>
      <ul class="horizontal-list">
        <li v-for="item in likes">
          <similar :bookId="item"></similar>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import rantings from "@/components/common/Rantings";
import similar from "@/components/common/Similar";
import {MessageBox} from 'mint-ui'
export default {
  name: "bookDetail",
  components: {
    rantings,
    similar,
  },
  data() {
    return {
      book: null,
      likes: [],
      btnText: "加入书架",
    };
  },
  /*方法一:监听路由来实现点击底部喜欢书籍重新加载数据
    方法二：使用vue-router的路由守卫beforeRouteUpdate*/
  // watch: {
  //   $route(to, from) {
  //     this.getBook(to.query.bookId);
  //     console.log(111111);

  //   },
  // },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.getBook(to.query.bookId);
  },
  methods: {
    getBook(bookId) {
      this.$axios.get(`/booklist?id=${bookId}`).then((res) => {
        if (res.data.state == "success") {
          this.book = res.data.data;
          this.likes = res.data.data.like.split("-");
          //判断是否在书架
          this.checkShelf(bookId);
        } else {
          this.$toast({
            message: "接口错误",
            
          });
        }
      });
    },
    //返回上一级
    goBack() {
      this.$router.go(-1);
    },
    //检查是否在书架
    checkShelf(id) {
      let idArr = this.$store.state.user.myShelf;
      if (idArr.indexOf(id) > -1) {
        this.btnText = "已在书架";
      } else {
        this.btnText = "加入书架";
      }
    },
    //加入书架
    insertShelf() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let bookInfo = this.book;
      if (userInfo) {
        this.$axios
          .post("/insertShelf", {
            userId: userInfo.id,
            bookInfo: bookInfo,
          })
          .then((res) => {
            if (res.data.state == "success") {
             this.btnText = "已在书架";
              //获取我的书架
             this.$store.dispatch("getShelf",userInfo.id);
              let instance = this.$toast("加入成功");
              setTimeout(() => {
                instance.close();
              }, 500);
            } else {
              let instance = this.$toast("加入失败");
              setTimeout(() => {
                instance.close(); 
              }, 500);
            }
          });
      } else {
        MessageBox({
          title: "提示",
          message: "请先登录账户，是否登录?",
          showCancelButton: true,
        }).then((action) => {
          if (action == "confirm") {
            this.$router.push("/login");
          } else {
            return false;
          }
        });
      }
    },
    //开始阅读
    startRead(){
      //如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。
      //取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：
      // -> /bookContent/123
     // this.$router.push({name:'bookContent',params:{bookId:this.$route.query.bookId}})
     
      //或者  -> /user/123 这种需要设置动态路由
      this.$router.push({ path: `/bookContent/${this.$route.query.bookId}`}); 
    }
  },
  created() {
    this.getBook(this.$route.query.bookId);
  },
};
</script>

<style lang="less">
.bookDetail {
  .book {
    display: flex;
    padding: 15px;

    .image {
      width: 100px;
      margin-right: 15px;

      img {
        width: 100%;
      }
    }

    .base {
      flex: 1;

      h4 {
        font-size: 18px;
        line-height: 1.8;
      }

      p {
        line-height: 1.8;
      }
    }
  }
  .btns {
    display: flex;

    .mint-button {
      flex: 1;
      margin: 0 15px;
    }
  }

  .intro {
    text-indent: 2em;
    font-size: 16px;
    padding: 15px;
    line-height: 1.8;
    margin: 15px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }

  .type {
    margin: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #d9d9d9;

    h5 {
      font-size: 18px;
      margin-bottom: 15px;
    }

    span {
      display: inline-block;
      padding: 10px;
      border: 1px solid #d9d9d9;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
  }

  .likes {
    padding: 0 15px;

    h5 {
      font-size: 18px;
      margin-bottom: 15px;
    }

    .horizontal-list {
      display: flex;
      padding-right: 10px;

      li {
        flex: 1;
      }
    }
  }
}
</style>