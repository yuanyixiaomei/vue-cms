
<template>
  <div class="good-info">
    <transition
    @before-enter="beforeenter"
    @enter="enter"
    @after-enter="afterenter"
    >
             <div class="ball" v-show="ballFlag" ref="ball"></div>
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
          <numbox :max="goodsInfo.stock_quantity" @getCount="getCount">{{selectedCount}}</numbox>
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
      selectedCount:1,//保存用户选中的商品数量
    };
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    getCount(count){
       this.selectedCount=count;
      //  console.log("富组件拿到的是"+ this.selectedCount);
    },
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
      var goodsInfo={
        id:this.id,
        count:this.selectedCount,
        price:this.goodsInfo.sell_price,
        selected:true
        };
        //调用store中的mutation来保存数据
        this.$store.commit("addToCar",goodsInfo)

    },
    beforeenter(el){
      el.style.transform="translate(0,0)"
    },
    enter(el,done){
    el.offsetWidth;

    //小球动画优化--小球的横纵坐标不能写死了,用这个方法getBoundingClient
     const ball=this.$refs.ball
     const ballPosition = ball.getBoundingClientRect()
     const badge=document.getElementById("badge")
     const badgePosition=badge.getBoundingClientRect()

     const scrollX=badgePosition.left-ballPosition.left
     const scrollY=badgePosition.top-ballPosition.top

     el.style.transform=`translate(${scrollX}px,${scrollY}px)`
     el.style.transition="all 1s cubic-bezier(.8,-0.19,.38,.65)"
     done()
    },
    afterenter(){
       this.ballFlag=!this.ballFlag
    }
  },
  created() {
    this.getLunbo();
    this.getgoodsInfo();
  
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