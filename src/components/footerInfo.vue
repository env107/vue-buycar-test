<template>
  <div class="calc-panel-container">
      <div class="calc-panel">
          <div :class="calcNumber" >{{total}}</div>
          <div class="calc-price">¥ {{totalPrice}} </div>
      </div>
      <div class="calc-button-group">
          <el-button @click="buy()"  type="success">立即下单</el-button>
      </div>
  </div>
</template>

<script>
export default {
    name:"footerinfo",
    computed:{
        calcNumber:function(){
            var toggle = this.$store.state.storeinfo.toggle.addCarToggle;
            if(toggle){
                return "calc-num calc-add";
            }
            return "calc-num";
        },
        total:function(){
            let storeinfo = this.$store.state.storeinfo;
            var total = 0;
            storeinfo.data.forEach(element => {
                element.goodslist.forEach(goods=>{
                    total += goods.total;
                });
            });
            return total;
        },
        totalPrice:function(){
            let storeinfo = this.$store.state.storeinfo;
            return storeinfo.totalprice;
        },
        
    },
    methods:{
        buy:function(){
            let storeinfo = this.$store.state.storeinfo;
            let total = this.total;

            if(total < 1){
                this.$alert("请选择商品!","提示",{center:true});
                return false;
            }
            var carts = {};
            carts.totalprice = storeinfo.totalprice;
            carts.total = this.total;
            carts.data = {};
            for(var i in storeinfo.data){
                var category = storeinfo.data[i];
                var index = "cate"+category.cateid;

                if(!carts.data.hasOwnProperty(index)){
                    carts.data[index] = [];
                }
                for(var k in category.goodslist){
                    var goods = category.goodslist[k];
                    if(goods.hasOwnProperty("specinfo") && goods.specinfo.length > 0){
                        
                        for(var z in goods.specinfo){
                            let spec = goods.specinfo[z];
                            let specgoods = {};
                            if(spec.total < 1) continue;
                            specgoods.gid = goods.gid;
                            specgoods.title = goods.title;
                            specgoods.spec = spec;
                            specgoods.total = spec.total;
                            specgoods.spectext = goods.title + "("+spec.title+")";
                            carts.data[index].push(specgoods);     
                        }
                        
                    }else{
                        carts.data[index].push({
                            gid:goods.gid,
                            title:goods.title,
                            total:goods.total,
                            spec:"",
                        });
                    }
                }
                
            }
            console.log(carts);
        }
    }
}
</script>

<style type="lang">
.footer-flex {
    height:  3.5rem;
    background: #3d4850;
    border-top: 1px solid #e2e2e2;
    color:#fff;
    z-index: 100;
}
.calc-panel-container{
    display: flex;
    align-items: center;
    height: 100%;
    
}
.calc-button-group {
    display: flex;
    justify-content: flex-end;
    padding-right:10px;
    flex:1;
    height: 70%;
}

.calc-panel {
    width: 10rem;
    display:  flex;
    align-items:  center;
    padding-left: 15px;
}

.calc-num {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 100%;
    background: #ec5400;
    text-align:  center;
    line-height: 1.9rem;
    font-weight:  bold;
}

.calc-price {
    font-size: 1.1rem;
    padding-left:  .8rem;
    font-weight: 500;
}
.calc-add{
    animation: addToCar .5s;
}

/*添加购物车按钮*/
@keyframes addToCar{
    0%{
        transform: scale(1,1);
    }
    50%{
        transform: scale(1.5,1.5);
        background: red;
    }
    100%{
        transform: scale(1,1);
    }
}
</style>
