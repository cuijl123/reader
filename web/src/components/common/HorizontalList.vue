<template functional>
  <div class="horizontalList">
    <div class="sub-title">
      <h3>{{ props.title }}</h3>
      <slot name="links"></slot>
    </div>
    <ul class="horizontal-list">
      <li v-for="item in props.list" :key="">
        <router-link :to="{ path: 'bookDetail', query: { bookId: item.id } }">
          <img :src="item.images" :alt="item.name" />
          <h6>{{ item.name }}</h6>
          <p>{{ item.author }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
.horizontalList {
  margin-top: 15px;
  background-color: #ffffff;

  .sub-title {
    height: 40px;
    line-height: 40px;
    padding-left: 30px;
    font-size: 16px;
    &::before {
        content: '';
        width: 6px;
        height: 18px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        background-color: #00c7ff;
        float: left;
        margin-left: -15px;
        margin-top: 11px;
    }
    h3 {
        display: inline-block;
    }

    a {
        float: right;
        color: #53e1ff;
        font-size: 16px;
        margin-right: 10px;
    }
  }

  .horizontal-list {
    white-space: nowrap;
    overflow-x: auto;
    li {
      display: inline-block;
      width: 100px;
      margin-right: 10px;
      > a {
            display: block;
        }
        &:first-child {
            margin-left: 10px;
        }

        &:last-child {
            margin-right: 0;
        }

        img {
            width: 100%;
            height: 125px;
        }
    }
  }
}
</style>
