<template>
  <div>
    <transition :name="slide_direction" >
      <gl-detail v-if="panel == 'detail'"></gl-detail>
      <gl-menu v-if="panel == 'menu'"></gl-menu>
      <gl-images v-if="panel == 'images'"></gl-images>
    </transition>
  </div>
</template>

<script>
import glDetail from "./gl_detail";
import glMenu from "./gl_menu";
import glImages from "./gl_images";

export default {
    name:"gooddlist",
    computed:{
      panel:function(){
        return this.$store.state.storeinfo.panel;
      },
      slide_direction:function(){
        let direction = this.$store.state.storeinfo.direction;
        if(direction == "left"){
          return "glist-l";
        }

        return "glist-r";
      }
    },
    data:function(){
        return {};
    },
    components:{
      glDetail,glMenu,glImages
    }
}
</script>

<style lang="less">
@import "../animation/s.less";
</style>
