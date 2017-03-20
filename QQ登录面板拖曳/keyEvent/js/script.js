var data=["宫保鸡丁","鱼香肉丝","张亮麻辣烫","阿亮麻辣烫","虎三郎","三昧老火靓汤","小鸡快跑","云浮肠粉"],
    timer=null,
    flag=0;

window.onload=function(){
	var play=document.getElementById("play"),
	    stop=document.getElementById("stop");
	//开始抽奖
	play.onclick=playFun;

	//停止抽奖
	stop.onclick=stopFun;

	//键盘事件
	document.onkeyup=function(event){
		event=event||window.event;
		if(event.keyCode==13){
			if(flag==0){
				playFun();
			}else{
				stopFun();
			}
		}
	}
}

function playFun(){
	var title=document.getElementById("title"),
	    play=document.getElementById("play");
	clearInterval(timer);
	timer=setInterval(function(){
		var random=Math.floor(Math.random()*data.length);
		title.innerHTML=data[random];
	},50);
	play.style.background="#999";
	flag=1;
}

function stopFun(){
	clearInterval(timer);
	var play=document.getElementById("play");
	play.style.background="#036";
	flag=0;
}