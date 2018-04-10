

export const addClass = function(target,classname){
    target.className = target.className + " " + classname; 
}

export const removeClass = function(target,classname){
    target.className = '';
    var classgroups = target.className.split(" ");
    classgroups.forEach(name => {
        if(name != 'plus-button-to-car'){
            target.className += (name + ' ');
        }     
    });
    target.className = target.className.trim(" ");
}
//初始化购物车
export const  initCart = function(){
    const goods = require("./data/goods");
    var initObj = {};
    for(var i = 0;i<goods.length;i++){
        
    }
}