var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
		}
	},
	removeHandler:function(element,type,handler){
		if(element.removeElementListener){
			element.removeElementListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	getEvent:function(event){
		return event?event:window.event;
	},
	getTarget:function(event){
		return event.target||event.srcElement;
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
	getByClass:function(clsName,parent){
		var oParent=parent?document.getElementById(parent):document;
		    elements=oParent.getElementsByTagName("*"),
		    eles=[];
		for(var i=0;i<elements.length;i++){
			if(elements[i].className==clsName){
				eles.push(elements[i]);
			}
		}
		return eles;
	},
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
addLoadEvent(drag);
function drag(){
	var oTitle=EventUtil.getByClass("login_logo_webqq","loginPanel")[0];
	EventUtil.addHandler(oTitle,"mousedown",fndown);

	//关闭面板
	var oClose=document.getElementById("ui_boxyClose"),
	    oDrag=document.getElementById("loginPanel");
	EventUtil.addHandler(oClose,"click",function(){
		oDrag.style.display="none";
	});

	//更改在线状态
	var loginState=document.getElementById("loginState"),
	    loginStateShow=document.getElementById("loginStateShow"),
	    stateText=document.getElementById("login2qq_state_txt"),
	    stateList=document.getElementById("loginStatePanel"),
	    lis=document.getElementsByTagName("li");
	EventUtil.addHandler(loginState,"click",function(event){
		event=EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);
		stateList.style.display="block";
	});
	for(var i=0;i<lis.length;i++){
		EventUtil.addHandler(lis[i],"mouseover",function(){
			this.style.background="#999";
		});
		EventUtil.addHandler(lis[i],"mouseout",function(){
			this.style.background="#fff";
		});
		EventUtil.addHandler(lis[i],"click",function(event){
			event=EventUtil.getEvent(event);
			EventUtil.stopPropagation(event);
			stateList.style.display="none";
			stateText.innerHTML=EventUtil.getByClass("stateSelect_text",this.id)[0].innerHTML;
			loginStateShow.className="login-state-show "+this.id;
		});
	}
	EventUtil.addHandler(document,"click",function(){
		stateList.style.display="none";
	});


}

function fndown(event){
	if(!document.getElementById) return false;
	event=EventUtil.getEvent(event);
	var oDrag=document.getElementById("loginPanel"),
	    disX=event.clientX-oDrag.offsetLeft,
	    disY=event.clientY-oDrag.offsetTop;
	document.onmousemove=function(event){
//		event=event||window.event;
		fnmove(event,disX,disY);
	}
	document.onmouseup=function(){
		document.onmousemove=null;
	}
}

function fnmove(event,disX,disY){
	var oDrag=document.getElementById("loginPanel"),
	    l=event.clientX-disX,
	    t=event.clientY-disY,
	    winW=document.documentElement.clientWidth||document.body.clientWidth,
	    winH=document.documentElement.clientHeight||document.body.clientHeight,
	    maxW=winW-oDrag.offsetWidth-10,
	    maxH=winH-oDrag.offsetHeight-10;
	if(l<0){
		l=10;
	}else if(l>maxW){
		l=maxW;
	}if(t<0){
		t=10;
	}else if(t>maxH){
		t=maxH;
	}
	oDrag.style.left=l+"px";
	oDrag.style.top=t+"px";
}