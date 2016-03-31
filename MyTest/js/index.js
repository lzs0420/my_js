'use strict';

/**存储方法的变量*/
var varParent={
	name : '小明',
    birth : 1990
}

/**存储方法的变量*/
var funParent={
    age : function (year) {
    	if(year == undefined)
        	year = new Date().getFullYear();
        return year - varParent.birth;
    },
    /** 加1 和 减1 的方法*/
	create_counter : function (initial) {
	    var x = initial || 0;
	    return {
	        inc: function (num) {
	            if(num == undefined)
	            	num = 1;
	            x += num;
	            return x;
	        },
	        del: function (num) {
	        	if(num == undefined)
	            	num = 1;
	            x -= num;
	            return x;
	        }
	    }
	},
	/**是否为 undefined 或者 null */
	isEmpty : function(object){
		return object == undefined && object == null;
	}
}

/**存创造方法的变量*/
var createParent = {
	/**新建对象,继承object,多了props的参数*/
	createObject : function(object,props) {
		if(funParent.isEmpty(object)) return;
	    // 基于object原型创建一个新对象:
	    var tmpObject = Object.create(object);
	    // 初始化新对象:
	    if(!funParent.isEmpty(props)){
	    	for (var tmpKey in props) {
			    tmpObject[tmpKey] = props[tmpKey];
			}
	    }
	    return tmpObject;
	},
	/**新建对象,继承object,多了map的参数*/
	createObjectByMap : function(object,map) {
		var tmpObject = Object.create(object);
		if(!funParent.isEmpty(map)){
			for(var mapKey of map){
				tmpObject[mapKey[0]] = mapKey[1];
			}
		}
		return tmpObject;
	},
	/**继承*/
	inherits : function(Child, Parent) {
	    var F = function () {};
	    F.prototype = Parent.prototype;
	    Child.prototype = new F();
	    Child.prototype.constructor = Child;
	},
	/**控制台打印*/
	log :function(log){
		console.log(log);
	},
	/**新建一个函数,继承的函数、继承的函数的参数、新函数的参数、新函数原型的函数*/
	createFun : function(oldFun,oldProps,newProps,protoFun){
		var newFun = function () {
			oldFun.call(this, oldProps);
			for(var tmpKey in newProps){
				this[tmpKey] = newProps[tmpKey];
			}
		};
		// 实现原型继承链:
		this.inherits(newFun, oldFun);
		// 绑定其他方法到newFun原型:
		for(var tmpKey in protoFun){
			newFun.prototype[tmpKey] = protoFun[tmpKey];
		}
		return newFun;
	}
};

/**存测试方法的变量*/
var testParent = {
	Student : {
	    name: 'Robot',
	    height: 1.2,
	    run: function () {
	        console.log(this.name + ' is running...'+this.height);
	    }
	},
	People : function (props) {
	    this.name = props.name || 'Unnamed';
	    this.say = function(){
	    	console.log(this.name + 'is saying.......!!');
	    }
	}
};
/**即时运行*/
(function(){
	testParent.People.prototype.hello = function () {
	    alert('Hello, ' + this.name + '!');
	};
})()
