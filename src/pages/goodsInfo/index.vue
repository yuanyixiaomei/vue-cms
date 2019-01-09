
<template>
  <div class="good-info">
    <!-- 卡片一 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 图片轮播 -->
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in list" :key="index">
              <a :href="item.src">
                <img :src="item.src" alt>
              </a>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>

    <!-- 商品名称 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            市场价:
            <del>￥{{goodsInfo.market_price}}</del>
            销售价:
          </p>
          <p class="now_price">￥{{goodsInfo.sell_price}}</p>
          <div class="mui-numbox" data-numbox-min="1" data-numbox-step="1" :max="goodsinfo.stock_quantity">
            <!-- "-"按钮，点击可减小当前数值 -->
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number">
            <!-- "+"按钮，点击可增大当前数值 -->
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
          </div>
          <div class="bottom">
            <button type="button" class="mui-btn mui-btn-primary">立即购买</button>
            <button type="button" class="mui-btn mui-btn-danger">加入购物车</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsInfo.add_time}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goDesc(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>



<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      goodsInfo: {},
      kucun:""
    };
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    getLunbo() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    },
    getgoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          console.log(result.body);
          this.goodsInfo = result.body.message[0];
          this.kucun=goodsInfo.stock_quantity;
        }
      });
    }
  },
  created() {
    this.getLunbo();
    this.getgoodsInfo();
  }
};
</script>


<style lang="less"   scoped>
.good-info {
  .mint-swipe {
    height: 200px;
    border: 1px solid #ccc;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
.app-container {
  padding-top: 5px !important;
}
.bottom {
  margin-top: 10px;
}
.mui-card-footer {
  flex-wrap: wrap;
  flex-direction: column;
  .mint-button {
    margin-top: 20px;
  }
}
.now_price {
  color: red;
  font-size: 20px;
  font-weight: 700;
}
</style>