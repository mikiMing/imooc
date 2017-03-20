function getByClass(clsName,parent){
	var oParent=parent?document.getElementById(parent):document,
	eles=[],
	elements=oParent.getElementsByTagName("*");
	for(var i=0;i<elements.length;i++){
		if(elements[i].className==clsName){
			eles.push(elements[i]);
		}
	}
	return eles;
}

window.onload=drag;

function drag(){
	//获取面板上可移动的位置
	var oTitle=getByClass("login_logo_webqq","loginPanel")[0];
	//拖曳
	oTitle.onmousedown=fndown;

	//关闭
	var oClose=document.getElementById("ui_boxyClose");
	oClose.onclick=function(){
		var oDrag=document.getElementById("loginPanel");
		oDrag.style.display="none";
	}

	//切换状态
    var loginState=document.getElementById("loginState"),
        loginStateShow=document.getElementById("loginStateShow"),
        stateText=document.getElementById("login2qq_state_txt"),
        statelist=document.getElementById("loginStatePanel"),
        lis=statelist.getElementsByTagName("li");

    loginState.onclick=function(event){
    	event=event||window.event;
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble=true;
			}
    	statelist.style.display="block";
    }

	//光标点击，离开，滑过时的状态
	for(var i=0;i<lis.length;i++){
		lis[i].onmousemove=function(){
			this.style.background="#567";
		}
		lis[i].onmouseout=function(){
			this.style.background="#fff";
		}
		lis[i].onclick=function(event){
			event=event||window.event;
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble=true;
			}
			statelist.style.display="none";
			var id=this.id;
			stateText.innerHTML=getByClass("stateSelect_text",id)[0].innerHTML;
			loginStateShow.className="";
			loginStateShow.className="login-state-show "+id;
		}
	}

	document.onclick=function(){
		statelist.style.display="none";
	}
}

function fndown(event){
	event=event||window.event;
	var oDrag=document.getElementById("loginPanel"),
	    disX=event.clientX-oDrag.offsetLeft,
	    disY=event.clientY-oDrag.offsetTop;
	document.onmousemove=function(event){
		event=event||window.event;
		fnmove(event,disX,disY);
	}
	//释放鼠标时
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
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