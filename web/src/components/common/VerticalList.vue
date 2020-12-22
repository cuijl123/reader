<template functional>
  <div class="verticalList">
    <slot name="title"></slot>
    <ul class="vertical-list">
      <li v-for="item in props.list" :key="item.id">
        <router-link :to="{ path: 'bookDetail', query: { bookId: item.id } }">
          <div class="image">
            <img :src="item.images" :alt="item.name" />
          </div>
          <div class="base">
            <h4>{{ item.name }}</h4>
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
      </li>
    </ul>
  </div>
</template>

<style lang="less">
.verticalList {
  margin-top: 15px;
  background-color: #ffffff;
  .sub-title {
    height: 40px;
    line-height: 40px;
    padding-left: 30px;
    font-size: 16px;

    &::before {
      content: "";
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
    }
  }
}
</style>