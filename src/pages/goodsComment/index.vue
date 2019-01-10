<template>
    <div>
       <comment :id="this.$route.params.id"></comment>
    </div>
</template>

<script>
import comment from "../../components/comment";
export default {
   components:{
   comment,
   }
}
</script>
<style lang="">
    
</style>
