var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent(type,handler);
		}else{
			element["on"+type]=handler;
		}
	},
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent(type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=false;
		}
	},
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	},
	getEvent:function(event){
		return event?event:window.event;
	}
};
function addLoadEvent(func){
	var oldload=window.onload;
	if(typeof window.onload!="function"){
		window.onload=func;
	}else{
		window.onload=function(){
			oldload();
			func();
		}
	}
}
var eles=["张亮麻辣烫","阿亮麻辣烫","给力潮粉","云浮肠粉","鱼香肉丝","京酱肉丝","北京烤鸭","东北大拉皮"],
	timer=null,
	flag=0;
addLoadEvent(choujiang);
function choujiang(){
	var text=document.getElementById("text"),
	    start=document.getElementById("start"),
	    stop=document.getElementById("stop");
	EventUtil.addHandler(start,"click",playFun);
	EventUtil.addHandler(stop,"click",stopFun);
	EventUtil.addHandler(document,"keyup",function(event){
		event=EventUtil.getEvent(event);
		if(event.keyCode==13){
			if(flag==0){
				playFun();
			}else{
				stopFun();
			}
		}
	});
}
function playFun(){
	var start=document.getElementById("start"),
	    stop=document.getElementById("stop");
	clearInterval(timer);
	timer=setInterval(function(){
			var random=Math.floor(Math.random()*eles.length);
			text.innerHTML=eles[random];
		},80);
    start.style.background="#777";
    stop.style.background="#003366";
    flag=1;
}
function stopFun(){
	var start=document.getElementById("start"),
	    stop=document.getElementById("stop");
	clearInterval(timer);
	start.style.background="#003366";
	stop.style.background="#777";
	flag=0;
}