<template>
  <div class="shopcar-container">
    <div class="goods-list" v-for="(item,i) in list" :key="item.id">
      <!-- 商品列表项区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- v-model="$store.getters.getGoodsSelected[item.id]" -->
            <mt-switch v-model="$store.getters.getGoodsSelect[item.id]" 
            @change="selectedChanged(item.id,$store.getters.getGoodsSelect[item.id])"></mt-switch>
          
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}</h1>
              <div>
                <span class="price">￥{{item.sell_price}}</span>
                <!-- <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox> -->
                <!-- number盒子 -->
                <numbox :init="$store.getters.getGoodsCount[item.id]" :goodsid="item.id" ></numbox>
                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red"></span> 0件， 总价
              <span class="red">￥0</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    <p>{{$store.getters.getGoodsSelect }}</p>
  </div>
</template>



<script>
import numbox from "../../components/shopcar_numbox";

export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    numbox
  },
  methods: {
    getShopcar() {
      var idArr = [];

      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr.length <= 0) {
        return;
      }
      console.log(idArr);
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          console.log(result.body.message);
          if (result.body.status == 0) {
            this.list = result.body.message;
          }
        });
    },
    remove(id,index) {
      this.list.splice(index, 1);
      this.$store.commit("removecar", id);
    },
    selectedChanged(id,val){
   this.$store.commit("updateGoodsSelected",{id,selected:val})
    }
  },
  created() {
    this.getShopcar();
  }
};
</script>
<style lang="less" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .num-box {
        position: relative;
        display: inline-block;
        overflow: hidden;
        height: 35px;
        input[type="text"] {
          width: 65px;
          height: 100%;
          text-align: center;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        input[type="button"] {
          width: 40px;
          height: 100%;
        }
      }
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>