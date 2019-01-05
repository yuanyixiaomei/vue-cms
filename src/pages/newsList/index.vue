<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsList/newsInfo/'+item.id">
          <img class="mui-media-object mui-pull-left" src="../../assets/cbd.jpg">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>

            <p class="mui-ellipsis">
              <span>时间:{{item.add_time | my-filter }}</span>
              <span>点击次数:{{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>



<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newsList: []
    };
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getnewslist").then(result => {
        // console.log(result.body);
        // alt + shift + F
        if (result.body.status === 0) {
          this.newsList = result.body.message;
        } else {
          Toast("数据获取失败!");
        }
      });
    }
  },
  created() {
    this.getNewsList();
  }
};
</script>


<style lang="less"  scoped>
.mui-table-view {
  .mui-media-body {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: rgb(40, 103, 155);
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>