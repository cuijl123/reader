<template>
  <div class="rantings">
    <span
      class="star"
      v-for="(item, index) in classes"
      :key="index"
      :class="item"
      ></span>{{ score }}
  </div>
</template>

<script>
export default {
  name: "rantings",
  props: ["score"],
  computed: {
    classes() {
      let results = [];
      let score = Math.floor(this.score * 2) / 2;
      let half = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        results.push("on");
      }
      if (half) {
        results.push("half");
      }
      while (results.length < 5) {
        results.push("off");
      }
      return results;
    },
  },
};
</script>

<style lang="less">
.rantings {
  display: flex;
  align-items: center;
  .star {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: 100% 100%;

    &.on {
      background: url("/static/images/star_on.png");
    }

    &.half {
      background: url("/static/images/star_half.png");
    }

    &.off {
      background: url("/static/images/star_off.png");
    }

    &:last-of-type {
      margin-right: 10px;
    }
  }
}
</style>