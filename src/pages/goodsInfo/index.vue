
<template>
  <div class="good-info">
    <transition
    @before-enter="beforeenter"
    @enter="enter"
    @after-enter="afterenter"
    >
             <div class="ball" v-if="ballFlag"></div>
    </transition>


    <!-- 图片区域 -->
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
          <!-- numbox -->
          <numbox>1</numbox>
          <div class="bottom">
            <button type="button" class="mui-btn mui-btn-primary">立即购买</button>
            <button type="button" class="mui-btn mui-btn-danger" @click="addCar">加入购物车</button>
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
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>



<script>
import mui from "../../lib/mui/js/mui.min.js";
import numbox from "../../components/goodsinfo_numbox";

export default {
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      goodsInfo: {},
      ballFlag: false,
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
          // console.log( result.body.message[0]);
          this.goodsInfo = result.body.message[0];
          this.kucun = this.goodsInfo.stock_quantity;
        }
      });
    },
    goDesc(id) {
      //编程式导航跳转
      this.$router.push({ name: "goodsDesc", params: { id: id } });
    },
    goComment(id) {
      //编程式导航跳转
      this.$router.push({ name: "goodsComment", params: { id: id } });
    },
    addCar() {
      this.ballFlag = !this.ballFlag;
    },
    beforeenter(el){
      el.style.transform="translate(0,0)"
    },
    enter(el,done){
    el.offsetWidth;
     el.style.transform="translate(140px,380px)"
     el.style.transition="all 1s cubic-bezier(.72,.17,.39,.86)"
     done()
    },
    afterenter(){
       this.ballFlag=!this.ballFlag
    }
  },
  created() {
    this.getLunbo();
    this.getgoodsInfo();
    this.addCar();
  },
  components: {
    numbox
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
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 99;
  top: 465px;
  left: 150px;
  // transform:translate(160px,446px);
  
}
</style>