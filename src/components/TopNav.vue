<template>
  <div class="nav-container">
    <div :class="getTagActive('menu')" @click="changeTag('menu')">菜单</div>
    <div :class="getTagActive('images')" @click="changeTag('images')">照片</div>
    <div :class="getTagActive('detail')" @click="changeTag('detail')">详情</div>
  </div>
</template>

<script>
export default {
    name:"top-nav",
    data:function(){
        return {}
    },
    methods:{
        changeTag:function(index){

            this.$store.dispatch({
                type:"changeTag",
                tag:index
            })
        },
        getTagActive:function(index){
            if(index == this.$store.state.storeinfo.panel) {
                return "nav-item nav-item-active";
            }else{
                return "nav-item";
            }
        }
    }
}
</script>

<style lang="less">
.nav-container {
  display: flex;
  justify-content: space-around;
  height: 2.5rem;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.nav-item-active {
  color: #3366CC;
  position: relative;
  display: flex;
  justify-content: center;
}
.nav-item-active:before {
    position: absolute;
    left:0;
    bottom: -5px;
    content: "";
    width: 100%;
    border-bottom: 2px solid currentColor;
}
.nav-item {
  display: flex;
  width:60px;
  justify-content: center;
  font-size:.9rem;
}
</style>
