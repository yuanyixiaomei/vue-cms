
<template>
  <div class="newsinfo-container" >
    <h3 class="title"  >{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{newsinfo.add_time | my-filter }}</span>
      <span>点击次数:{{newsinfo.click}}</span>
    </p>
    <hr>
    <div class="content" v-html="newsinfo.content"></div>

    
    <!-- 评论子组件区域 -->
    <comment :id="this.id"></comment>
  </div>
</template>



<script>


import { Toast } from "mint-ui";
export default {
 
  data() {
    return {
      id: this.$route.params.id,
      newsinfo:{}
    };
  },
  methods: {
    getnewsINfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
                 console.log(result.body);
            this.newsinfo = result.body.message[0]
        }else{
            Toast ("获取数据失败")
        }
      
      });
    }
  },
  created() {
      this.getnewsINfo()
  },
 
};
</script>


<style lang="less" >
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: blue;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
      img{
      width: 100%;   
      }
  }
}
</style>