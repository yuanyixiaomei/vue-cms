
<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" data-numbox-step="1" > 
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <input class="mui-numbox-input" type="number"  ref="numbox" :value="init" @change="countChanged"> 
      <!-- <input class="mui-numbox-input" type="number" ref="number" value="1"> -->
      <!-- "+"按钮，点击可增大当前数值 -->
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
     </div>

  </div>
</template>

<script>
 import mui from "../lib/mui/js/mui.js";
export default {
 data(){
    return{}
 },
  mounted() {
     mui(".mui-numbox")
      .numbox()
  },
  methods:{
    countChanged(){
      // console.log(this.$refs.numbox.value);
      this.$store.commit("updateCount",{
        id:this.goodsid,
        count:this.$refs.numbox.value
        })
    }
  },
  props:["init","goodsid"],
  
};
</script>

<style lang="less">
</style>

