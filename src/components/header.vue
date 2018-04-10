<template>
  <div class="header">
    <div class="header-back"><返回</div>
    <div class="header-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
    name:"store-header",
    mounted:function(){
        console.log(this.$store.state);
    },
    computed:{
        title:function(){
            return this.$store.state.storeinfo.title;
        }
    },
    data:function(){
        return {}
    }
}
</script>

<style lang="less">
.header {
    display:  flex;
    height: 3rem;
    background: linear-gradient(#3399FF,#188cff);
    align-items:  center;
    position: relative;
    color:  #fff;
    justify-content: center;
}

.header-back {
    position: absolute;
    left: 15px;
}
</style>
