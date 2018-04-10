<template>
  <div class="spec-container" >
        <el-dialog title="选择商品规格" :visible.sync="showSpecDialog" width="85%" >
                     <div class="goodsinfo-spec-container">
                         <div class="spec-shop-info">
                             <div class="specshop-img">
                                 <img :src="goods.goodsimage" />
                             </div>
                             <div class="specshop-title">{{goods.title}}</div>
                         </div>
                         <div class="spec-selector">
                             <div class="spec-title">选择{{getSpecText}}</div>
                             <div class="spec-box">
                                 <gls-tag v-for="(sec,index) in goods.specinfo" :title="sec.title" @click="tagSelector(index)" :default="sec.default" :key="index" ></gls-tag>
                             </div>
                         </div>
                         <div class="spec-total">
                            <button class="button-p button-reduce" @click="addSpecGoods('reduce')" v-if="specTotal > 0"></button>
                            <div class="gl-total" v-if="specTotal > 0">{{specTotal}}</div>
                            <button class="button-p button-buy" @click="addSpecGoods()"  ></button>
                         </div>
                     </div>
        </el-dialog>
  </div>
</template>

<script>
import glsTag from "./gls_tag";
export default {
    computed:{
        showSpecDialog:{
            set:function(newValue){      
                let $store = this.$store;
                $store.dispatch({
                    type:"showSpecDialog",
                    on:newValue
                });
            },
            get:function(){
                let state = this.$store.state.storeinfo;
                let goods = state.toggle.showSpec.goods;
                if(goods.hasOwnProperty("specinfo") && goods.specinfo.length < 1){
                    return false;
                }
                return state.toggle.showSpec.on;
            }  
        },
        goods:function(){
            let state = this.$store.state.storeinfo;
            return state.toggle.showSpec.goods;
        },
        getSpecText:function(){
            let state = this.$store.state.storeinfo;
            let goods =  state.toggle.showSpec.goods;
            let title = "规格";
            if(goods.hasOwnProperty("spectext") && goods.spectext != ''){
                return goods.spectext;
            }

            return title;
        },
        specTotal:function(){
                let storeinfo = this.$store.state.storeinfo;
                let goods = storeinfo.toggle.showSpec.goods;
      
                let index = 0;
        
                if(goods.hasOwnProperty("specinfo") && goods.specinfo.length > 0){
                    for(var i in goods.specinfo){
                        if(goods.specinfo[i].default == true){
                            index = i;
                        }
                    }
                    return goods.specinfo[index].total;
                }
                
                return 0;
        }
        
    },
    methods:{
        tagSelector:function(index){
            this.$store.dispatch({
                type:"toggleSpecTag",
                index
            });
        },
        addSpecGoods:function(method){
            if(method==undefined){
                method = "plus";
            }
            this.$store.dispatch({
                type:"addCarSpecToggle",
                method
            })
        }
    },
    components:{glsTag}
}
</script>

<style lang="less">
.spec-total {
    display:  flex;
    justify-content: flex-end;
}
.spec-shop-info {
    display:  flex;
    align-items:  center;
}
.spec-box {
    display:  flex;
    padding: 10px 0;
}
.specshop-img {
    width: 2.5rem;
    height: 2.5rem;
}

.specshop-img img {
    width:  100%;
    height:  100%;
}

.specshop-title {
    font-size:  1.1rem;
    text-indent:  .5rem;
}
.spec-title {
    font-size:  1rem;
    height:  2.4rem;
    line-height:  2.4rem;
    border-bottom:  1px solid #d8d8d8;
}

.spec-box {
    // padding:  .6rem;
}
.el-tag{
    margin:8px;
}
</style>
