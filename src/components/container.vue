<template>
<div class="container">  
    <div class="header-flex">
        <top />
        <top-nav />
    </div>
    <div class="container-flex">
        <goodslist />
    </div>  
    <div class="footer-flex">
        <footer-container />
    </div>
  
</div>
</template>

<script>
import top from "./header";
import TopNav from "./TopNav";
import goodslist from "./goodslist";
import footerContainer from "./footerInfo";
export default {
    name:"Container",
    data:function(){
        return {};
    },
    components:{
        top,TopNav,goodslist,footerContainer
    }
}
</script>

<style>

</style>
