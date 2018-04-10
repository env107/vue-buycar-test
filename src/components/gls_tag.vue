<template>
  <div :class="tag" @click="onclick">
      {{title}}
  </div>
</template>

<script>
export default {
    props:["title","default"],
    name:"gls_tag",
    computed:{
        tag:function(){
            if(this.default){
                return "sec-tag sec-tag-active";
            }

            return "sec-tag";
        }
    },
    methods:{
        onclick:function(e){
            this.$emit("click");
        }
    }
}
</script>

<style type="less">
    .sec-tag{
        font-size:.85rem;
        color:#666;
        padding:6px 10px;
        border:1px solid #333;
        height: 1.6rem;
        border-radius: 8px;
        margin-right: 10px;
        margin-bottom: 10px;
        line-height: 1.6rem;
    }
    .sec-tag-active{
        color:#fff;
        border:1px solid #ff0058;
        background: #ff0058;
    }
</style>
