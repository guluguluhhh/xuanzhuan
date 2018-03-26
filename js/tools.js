//尝试创建一个可以执行简单动画的函数
/*
 * 参数：
 * 	obj:要执行动画的对象
 * 	attr:要执行动画的样式，比如：left top width height
 * 	target:执行动画的目标位置
 * 	speed:移动的速度(正数向右移动，负数向左移动)
 *  callback:回调函数，这个函数将会在动画执行完毕以后执行
 */
function move(obj, attr, target, speed, callback) {
	//关闭上一个定时器
	clearInterval(obj.timer);

	//获取元素目前的位置
	var current = parseInt(getStyle(obj, attr));

	//判断速度的正负值
	//如果从0 向 800移动，则speed为正
	//如果从800向0移动，则speed为负
	if(current > target) {
		//此时速度应为负值
		speed = -speed;
	}

	//开启一个定时器，用来执行动画效果
	//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
	obj.timer = setInterval(function() {

		//获取box1的原来的left值
		var oldValue = parseInt(getStyle(obj, attr));

		//在旧值的基础上增加
		var newValue = oldValue + speed;

		//判断newValue是否大于800
		//从800 向 0移动
		//向左移动时，需要判断newValue是否小于target
		//向右移动时，需要判断newValue是否大于target
		if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}

		//将新值设置给box1
		obj.style[attr] = newValue + "px";

		//当元素移动到0px时，使其停止执行动画
		if(newValue == target) {
			//达到目标，关闭定时器
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数
			callback && callback();
		}

	}, 30);
}

/*
 * 定义一个函数，用来获取指定元素的当前的样式
 * 参数：
 * 		obj 要获取样式的元素
 * 		name 要获取的样式名
 */
function getStyle(obj, name) {

	if(window.getComputedStyle) {
		//正常浏览器的方式，具有getComputedStyle()方法
		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式，没有getComputedStyle()方法
		return obj.currentStyle[name];
	}

}

//定义一个函数，用来向一个元素中添加指定的class属性值
/*
 * 参数:
 * 	obj 要添加class属性的元素
 *  cn 要添加的class值
 * 	
 */
function addClass(obj, cn) {

	//检查obj中是否含有cn
	if(!hasClass(obj, cn)) {
		obj.className += " " + cn;
	}

}

/*
 * 判断一个元素中是否含有指定的class属性值
 * 	如果有该class，则返回true，没有则返回false
 * 	
 */
function hasClass(obj, cn) {

	//判断obj中有没有cn class
	//创建一个正则表达式
	//var reg = /\bb2\b/;
	var reg = new RegExp("\\b" + cn + "\\b");

	return reg.test(obj.className);

}

/*
 * 删除一个元素中的指定的class属性
 */
function removeClass(obj, cn) {
	//创建一个正则表达式
	var reg = new RegExp("\\b" + cn + "\\b");

	//删除class
	obj.className = obj.className.replace(reg, "");

}

/*
 * toggleClass可以用来切换一个类
 * 	如果元素中具有该类，则删除
 * 	如果元素中没有该类，则添加
 */
function toggleClass(obj, cn) {

	//判断obj中是否含有cn
	if(hasClass(obj, cn)) {
		//有，则删除
		removeClass(obj, cn);
	} else {
		//没有，则添加
		addClass(obj, cn);
	}

}



//获取classname
function getClass(classname,id){
					//支持getElementsByClassName
					if(document.getElementsByClassName){
						if(id){
							var eleId=document.getElementById(id);
							return eleId.getElementsByClassName(classname);
						}
						else{
							return document.getElementsByClassName(classname);
						}
					}
					//不支持getElementsByClassName
					if(id){
						var eleId=document.getElementById(id);
						var dom=eleId.getElementsByTagName("*");
					}else{
						var dom=document.getElementsByTagName("*");
					}
					var arr=[];
					for(var i=0;i<dom.length;i++){
						var txtarr=dom[i].className.split(" ");
						for(var j=0;j<txtarr.length;j++){
							if(txtarr[j]==classname){
								arr.push(dom[i]);
							}
						}
					}
					return arr;
				}



//缓动动画
// 多个属性运动框架  添加回调函数
    function animate(obj,json,fn) {  // 给谁    json
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var flag = true;  // 用来判断是否停止定时器   一定写到遍历的外面
            for(var attr in json){   // attr  属性     json[attr]  值
                //开始遍历 json
                // 计算步长    用 target 位置 减去当前的位置  除以 10
               // console.log(attr);
                var current = 0;
                if(attr == "opacity")
                {
                    current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
//                  console.log(current);
                }
                else
                {
                    current = parseInt(getStyle(obj,attr)); // 数值
                }
               // console.log(current);
                 // 目标位置就是  属性值
                var step = ( json[attr] - current) / 10;  // 步长  用目标位置 - 现在的位置 / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //判断透明度
                if(attr == "opacity")  // 判断用户有没有输入 opacity
                {
                     if("opacity" in obj.style)  // 判断 我们浏览器是否支持opacity
                     {
                         // obj.style.opacity
                         obj.style.opacity = (current + step) /100;
                     }
                    else
                     {  // obj.style.filter = alpha(opacity = 30)
                         obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                     }
                }
                else if(attr == "zIndex")
                {
                    obj.style.zIndex = json[attr];
                }
                else
                {
                    obj.style[attr] = current  + step + "px" ;
                }

                if(current != json[attr])  // 只要其中一个不满足条件 就不应该停止定时器  这句一定遍历里面
                {
                    flag =  false;
                }
            }
            if(flag)  // 用于判断定时器的条件
            {
                clearInterval(obj.timer);
                //alert("ok了");
                if(fn)   // 很简单   当定时器停止了。 动画就结束了  如果有回调，就应该执行回调
                {
                    fn(); // 函数名 +  （）  调用函数  执行函数 暂且这样替代
                }
            }
        },30)
    }