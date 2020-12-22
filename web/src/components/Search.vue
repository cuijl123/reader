<template>
  <div class="search">
    <mt-header title="搜索">
      <mt-button icon="back" @click="goBack" slot="left"></mt-button>
      <router-link to="/" slot="right">
        <mt-button>首页</mt-button>
      </router-link>
    </mt-header>
    <mt-search v-model="value" show>
      <mt-cell class="search-item" v-for="item in list" :key="item.id">
        <router-link :to="{ path: 'bookDetail', query: { bookId: item.id } }">
          <h5>{{ item.name }}</h5>
          <p>{{ item.author }}</p>
        </router-link>
      </mt-cell>
    </mt-search>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      value: "",
      list: [],
    };
  },
  watch: {
    value(value) {
      this.getSearchData(value);
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getSearchData(value) {
      this.$axios.get("/search", { params: { keyword: value } }).then((res) => {
        if (res.data.state == "success") {
          this.list = res.data.data;
        } else {
          this.$toasttoastt({
            message: "接口错误",
            
          });
        }
      });
    },
  },
};
</script>

<style lang="less">
.search {
  overflow: hidden;
  height: 100%;
  .mint-search-list {
    margin-top: 52px;
    .search-item {
      border-bottom: 1px solid #d9d9d9;
      
      a {
       width: 100%;
      }

      .mint-cell-wrapper {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        background: none;
      }

      .mint-cell-value {
        width: 100%;

        h5 {
          line-height: 1.8;
        }

        p {
          font-size: 14px;
        }
      }

    }
  }
}
</style>