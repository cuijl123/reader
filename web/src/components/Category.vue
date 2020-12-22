<template>
  <div class="category">
    <mt-header :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <vertical :list="bookList"></vertical>
  </div>
</template>

<script>
import vertical from "@/components/common/VerticalList";
export default {
  name: "Category",
  components: {
    vertical,
  },
  data() {
    return {
      title: "",
      bookList: [],
    };
  },
  methods: {
    //获取类别title
    getData() {
      this.$store.dispatch("getType", this.$route.query.type).then((res) => {
        this.title = res;
        //获取booklist
        this.$axios.get(`/type?type=${res}`).then((response) => {
          if (response.data.state == "success") {
            this.bookList = response.data.data;
          } else {
            this.$toast({
              message: "接口错误",
              
            });
          }
        });
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less">
//   .category{

//   }
</style>