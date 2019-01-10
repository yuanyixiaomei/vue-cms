<template>
  <div>
    <h3>{{info.title}}</h3>
    <hr>
    <p class="content" v-html="info.content"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {}
    };
  },
  methods: {
    getdesc() {
      this.$http.get("api/goods/getdesc/" + this.id).then(result => {
        // console.log(result);
        if (result.body.status == 0) {
          this.info = result.body.message[0];
        }
      });
    }
  },
  created() {
    this.getdesc();
  }
};
</script>
<style lang="less">
div {
    padding: 5px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
