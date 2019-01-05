<template>
  <div class="home-container">
    <mt-swipe :auto="1000" :speed="1000">
      <mt-swipe-item v-for="(item,index) in banners" :key="index">
        <a :href="item.url">
          <img :src="item.img" alt>
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newsList">
            <img src="../../assets/menu1.png" alt>
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newsList">
            <img src="../../assets/menu2.png" alt>
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newsList">
            <img src="../../assets/menu3.png" alt>
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newsList">
            <img src="../../assets/menu4.png" alt>
            <div class="mui-media-body">留言反馈</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newsList">
            <img src="../../assets/menu5.png" alt>
            <div class="mui-media-body">视频专区</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newsList">
            <img src="../../assets/menu6.png" alt>
            <div class="mui-media-body">联系我们</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      banners: []
    };
  },
  methods: {
    getBanner() {
      this.$http.get("api/getlunbo").then(result => {
        // console.log(result.body)
        if (result.body.status == 0) {
          this.banners = result.body.message;
        }
      });
    }
  },
  created() {
    this.getBanner();
  }
};
</script>


<style lang="less"  scoped>
.home-container {
  .mint-swipe {
    height: 200px;
    .mint-swipe-item {
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}
.mui-table-view {
  margin-top: 0px;
  background-color: #fff;
  border: 0;
  .mui-table-view-cell {
    border: 0;
    img {
      width: 60px;
      height: 60px;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                      
    .mui-media-body {
      font-size: 13px;
    }
  }
}
</style>