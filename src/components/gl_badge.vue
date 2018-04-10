<template>
  <div class="badge-total" v-if="value != 0 ">
      {{value}}
  </div>
</template>

<script>
export default {
    props:["index"],
    name:"badge_total",
    computed:{
        value:function(){
            var storeinfo = this.$store.state.storeinfo;
            var total = 0;
            storeinfo.data[this.index].goodslist.forEach(goods => {
                total += goods.total;
            });
            if(total > 10){
                return total;
            }
            return total;
        }
    }
}
</script>

<style type="less">
.badge-total{
    position: absolute;
    border-radius: 100%;
    background: red;
    color:#fff;
    right: .5rem;
    width: 1.2rem;
    height: 1.2rem;
    text-align: center;
    line-break: 1rem;
    top:10px;
}
</style>
