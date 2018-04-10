<template>
  <div class="gl-container gl-body">
     
      <div class="gl-menu">
            <div v-for="(menu,index) in menudata" 
                :key="menu.id" 
                @click="changeMenuIndex(index)" 
                :class="glMenu(index)"
            >
            {{ menu.title }}<gl-badge :index="index" ></gl-badge>
            </div>
      </div>
      <div class="gl-menu-content">
         <div v-for="(goods,index) in goodsdata.goodslist" :key="index" class="gl-goods-item">
             <div class="goodsinfo-top">
                 <div class="goodsinfo-left">
                    <img :src="goods.goodsimage" class="gl-goods-img"  />
                </div>
                <div class="goodsinfo-right">
                    <div class="goodsinfo-title">{{goods.title}}</div>
                    <div v-if="hasTag(goodsdata)" class="goodsinfo-tag-group">
                        <div :key="tagindex" v-for="(tag,tagindex) in goodsdata.activitys.tags" :class="getTagType(tag.type)">{{tag.title}}</div>
                    </div>
                    <div class="goodsinfo-buy">
                        <el-rate v-model="goods.grade" disabled class="grade-goods"></el-rate>
                        <div class="goodsinfo-buyinfo">
                            评价:{{goods.commentCount}} 销量:{{goods.sales}}
                        </div>
                    </div>       
                </div>
             </div>
             <div class="goodsinfo-bottom">
                 <div class="goodsinfo-price-container">
                     ¥ {{goods.price}} 
                 </div>
                 <div class="goodsinfo-button-group">
                        <button v-if="hasSpecInfo(goods)" class="button-p button-desc" @click="getSpecGoodsInfo(goods,index)">选规格</button>
                        <button class="button-p button-reduce" v-if="goods.total > 0 && !hasSpecInfo(goods)" @click="addGoods(goods,'reduce')"></button>
                        <div class="gl-total" v-if="goods.total > 0 && !hasSpecInfo(goods)">{{goods.total}}</div>
                        <button class="button-p button-buy" v-if="!hasSpecInfo(goods)" :ref="'plus_button_'+index" @click="addGoods(goods)"  ></button>
                 </div>
                 
             </div>
         </div>
      </div>
      <gl-spec ></gl-spec>
  </div>
</template>

<script>
import glSpec from "./gl_spec";
import glBadge from "./gl_badge";
export default {
    name:"gl_menu",
    components:{
        glSpec,glBadge
    },
    computed:{
        menudata:function(){
            return this.$store.state.storeinfo.data;
        },
        goodsdata:function(){
             let menuIndex = this.$store.state.storeinfo.menuIndex;
             return this.$store.state.storeinfo.data[menuIndex];
        }
    },
    methods:{
        //决定菜单显示效果
        glMenu:function(index){
            let menu_index = this.$store.state.storeinfo.menuIndex;
            if(index == menu_index){
                return "gl-menu-item gl-menu-item-active";
            }
            return 'gl-menu-item';
        },
        //更改菜单序列
        changeMenuIndex:function(index){
            this.$store.dispatch({
                type:"changeMenuIndex",
                index
            });
        },
        //顶部导航选择效果
        getTagType:function(type){
            return "gl-tag gl-tag-"+type;
        },
        //判断是否显示商品标签
        hasTag:function(goods){
            var activitys = goods.activitys;
            if(activitys == undefined){
                return false;
            }
            if(!activitys.hasOwnProperty("tags")){
                return false;
            }
            var tags = activitys.tags;
            return tags.length > 1;
        },
        //添加商品到购物车
        addGoods:function(goods,method){
            //将用户选择的记录到购物车
            if(method == undefined){
                method = "plus";
            }
            this.$store.dispatch({
                type:"addCarToggle",
                goods,
                method
            });
        },
        //显示商品规格信息
        getSpecGoodsInfo:function(goods,index){
            this.$store.dispatch({
                type:"showSpecDialog",
                goods,
                on:true,
                index
            });
        },
        //是否显示商品规格按钮
        hasSpecInfo:function(goods){
            return goods.hasOwnProperty("specinfo") && goods.specinfo.length > 0;
        },
 
        
    },
   

}
</script>

<style lang="less">
@import "../css/gl_menu.less";


</style>
