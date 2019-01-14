
<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" data-numbox-step="1" :data-numbox-max="max">
      <!-- "-"按钮，点击可减小当前数值 -->
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <input class="mui-numbox-input" type="number" @change="countChanged" ref="number">
      <!-- "+"按钮，点击可增大当前数值 -->
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
 import mui from "../lib/mui/js/mui.min.js";
export default {
 
  mounted() {
  //  console.log(this.max);
  },
  methods:{
    countChanged(){
      // console.log(this.$refs.number.value);
      this.$emit('getCount',parseInt(this.$refs.number.value))
    }
  },
  props:["max"],
  watch:{
    max:function(newVal,oldVal){
      mui(".mui-numbox")
      .numbox()
      .setOption('max',newVal)
    }
  }
};
</script>

<style lang="less">
</style>

