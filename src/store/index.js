import Vuex from "vuex"
import Vue from "vue";
import goods from "../data/goods.js";
import {initCart} from "../functions.js";
Vue.use(Vuex);

const icart = initCart();

const appinfo = {
    state:{
        version:"1.0",
        versionType:"build"
    },
    getters:{
        version(state){
            return state.versionType + " - " + state.version;
        }
    }

};

//店铺信息
const storeinfo = {
    state:{
        mid:6, //商户id
        title:"叫饭啦",//店铺名称
        backurl:"", //后退地址
        panel:"menu", //menu , images , detail
        direction:"left", //滑动方向
        menuIndex:0, //菜单序列
        data:goods, //商品信息
        toggle:{
            addCarToggle:false, 
            showSpec:{
                on:false,
                goods:{},
                goodsindex:''
            }
        },
        totalprice:0
    },
    mutations:{
        changeTag(state,payload){
            let panel_chain = state.panel + "-" + payload.tag;
            if(panel_chain == 'menu-images'
             || panel_chain == "menu-detail"
             || panel_chain == 'images-detail'
            ){
                state.direction = "left";
            }else{
                state.direction = "right";
            }
            state.panel = payload.tag;
        },
        changeMenuIndex(state,{index}){
            state.menuIndex = index;
        },
        addCarToggle(state,payload){
            //商品数据
            var mindex = state.menuIndex;
            var totalprice = parseFloat(state.totalprice);
            var method = 'plus';
            var goods = payload.goods;
            if(payload.hasOwnProperty("method")){
                method = payload.method;
            }
            
            
            if(method == 'plus'){
                goods.total++;
                totalprice += parseFloat(goods.price);
            }else if(method == 'reduce'){
                goods.total >= 1 && goods.total--;
                totalprice -= parseFloat(goods.price);
            }
            
            state.totalprice = totalprice<0?0:totalprice.toFixed(2);
            //动画效果
            state.toggle.addCarToggle = true;
            setTimeout(function(){
                state.toggle.addCarToggle = false;
            },500);

        },
        addCarSpecToggle(state,payload){
            let goods = state.toggle.showSpec.goods;
            let index = 0;
            let totalprice = parseFloat(state.totalprice);
            var method = 'plus';
            if(payload.hasOwnProperty("method")){
                method = payload.method;
            }
         
            for(var i in goods.specinfo){
                if(goods.specinfo[i].default == true){
                    if(method == 'plus'){
                        goods.specinfo[i].total ++;
                        goods.total++;
                        totalprice += goods.price;
                    }else if(method == 'reduce'){
                        goods.specinfo[i].total >= 1 && goods.specinfo[i].total --;
                        goods.total >= 1 && goods.total--;
                        totalprice -= goods.price;
                    }
                    
                }
                
            }
            state.totalprice = totalprice<0?0:totalprice.toFixed(2);
            //动画效果
            state.toggle.addCarToggle = true;
            setTimeout(function(){
                state.toggle.addCarToggle = false;
            },500);
            console.log(state.data);
        },
        showSpecDialog(state,payload){
            state.toggle.showSpec.on = payload.on;
      
            if(payload.on == true){
                state.toggle.showSpec.goods = payload.goods;
                state.toggle.showSpec.goodsindex = payload.index;
            }else{
                state.toggle.showSpec.goods = '';
                state.toggle.showSpec.goodsindex = '';
            }
            
        },
        toggleSpecTag(state,{index}){

            let mindex = state.menuIndex;
            let gindex = state.toggle.showSpec.goodsindex;
            let goods = state.data[mindex].goodslist[gindex];
            for(var i =0;i<goods.specinfo.length;i++){
                if(i == index){
                    goods.specinfo[index].default = true;
                }else{
                    goods.specinfo[i].default = false;
                }
            }
   
        }
    },
    actions:{
        changeTag(context,payload){
            context.commit({
                type:"changeTag",
                tag:payload.tag
            })
        },
        changeMenuIndex(context,payload){
            context.commit({
                type:"changeMenuIndex",
                index:payload.index
            });
        },
        addCarToggle(context,{goods,method}){
            context.commit({
                type:"addCarToggle",
                goods,
                method
            })
        },
        addCarSpecToggle(context,{method}){
            context.commit({
                type:"addCarSpecToggle",
                method
            });
        },
        showSpecDialog(context,{goods,on,index}){
            context.commit({
                type:"showSpecDialog",
                goods,on,index
            });
        },
        toggleSpecTag(context,{index}){
            context.commit({
                type:"toggleSpecTag",
                index
            })
        },
        reduceCarToggle(context,payload){
            context.commit({
                type:"reduceCarToggle"
            });
        }
    }
};




const store = new Vuex.Store({
    modules:{
        appinfo,
        storeinfo
    }
});

export default  store;