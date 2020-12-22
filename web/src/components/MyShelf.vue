<template>
  <div class="myShelf">
    <mt-header title="我的书架">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>

    <ul class="vertical-list">
      <li v-for="item in shelfList">
        <mt-cell-swipe
          :right="[
            {
              content: '删除',
              style: { background: 'red', color: '#fff' },
              handler: () => deleteShelf(item.bookid),
            },
          ]"
        >
          <router-link
            :to="{ path: 'bookDetail', query: { bookId: item.bookid } }"
            style="display: flex"
          >
            <div class="image">
              <img :src="item.images" :alt="item.name" />
            </div>
            <div class="base">
              <h4>{{ item.bookname }}</h4>
              <p>{{ item.intro }}</p>
              <div class="author">
                <i class="icon icon-author"></i>
                <span>{{ item.author }}</span>
              </div>
              <div class="category">
                <span>{{ item.type }}</span>
                <span>{{ item.serialize }}</span>
                <span>{{ item.wordcount }}万字</span>
              </div>
            </div>
          </router-link>
        </mt-cell-swipe>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "myShelf",
  data() {
    return {
      shelfList: [],
    };
  },
  methods: {
    //获取书架
    getList() {
      let userId = JSON.parse(localStorage.getItem("userInfo")).id;
      this.$axios
        .get("/getShelf", { params: { id: userId, type: "bookList" } })
        .then((res) => {
          if (res.data.state == "success") {
            this.shelfList = res.data.data;
          } else {
            this.$toast({
              message: "获取书架失败",
              
            });
          }
        });
    },
    //从书架中删除
    deleteShelf(id) {
      let userId = JSON.parse(localStorage.getItem('userInfo')).id;
      this.$axios.post(`/deleteShelf`,{userId:userId,bookId:id}).then((res) => {
        if (res.data.state == "success") {
          this.$toast({
            message: "删除成功",
            
          });
          //重新获取书架
          this.getList();
          //更新store中的书架信息
          this.$store.dispatch("getShelf",userId);
        } else {
          this.$toast({
            message: "删除失败",
            
          });
        }
      });
    },
    //返回
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less">
.myShelf {
  .vertical-list {
    padding: 0 15px;

    li {
      border-bottom: 1px solid #e4e4e4;
      padding: 10px 0;
      > a {
        display: flex;
      }

      &:last-child {
        border: 0;
      }
      .image {
        width: 80px;
        height: 106px;
        img {
          width: 100%;
        }
      }
      .base {
        flex: 1;
        padding-left: 10px;
        position: relative;

        h4 {
          font-size: 18px;
          color: #000;
          margin-bottom: 10px;
        }

        p {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #969ba3;
        }

        .author {
          position: absolute;
          left: 10px;
          bottom: 5px;

          span {
            color: #a7a7a7;
          }
        }

        .category {
          position: absolute;
          right: 0;
          bottom: 5px;

          span {
            border: 1px solid #ccc;
            border-radius: 2px;
            padding: 0 2px;
            font-size: 12px;

            &:nth-child(2) {
              color: #ff5c00;
            }

            &:last-child {
              color: #0e5fff;
            }
          }
        }
      }

      .mint-cell-swipe-buttongroup {
        background: red;
        .mint-cell-swipe-button {
          background: unset;
          display: inline-block;
          padding: 0 10px;
          line-height: 106px;
        }
      }
    }
  }
}
</style>