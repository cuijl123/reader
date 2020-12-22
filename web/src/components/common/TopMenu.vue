<template>
  <div class="topMenu">
    <mt-header>
      <mt-button slot="left" icon="back" @click="goBack">返回</mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: "topMenu",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less">
.topMenu {
  height: 50px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
  transform: translateY(-50px);
  -webkit-transform: translateY(-50px);
  -moz-transform: translateY(-50px);
  -ms-transform: translateY(-50px);
  -o-transform: translateY(-50px);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;

  &.show {
    transform: translateY(0);
  }

  .mint-header {
    height: 50px;
    line-height: 50px;
    background-color: #26a2ff;
  }
}
</style>