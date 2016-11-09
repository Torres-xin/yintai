// 兼容性查找类名
function getClass(classneme,obj){
	var obj=obj||document;
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classneme);
	}else{
		var arr=[];
		var suoyou=document.getElementsByTagName("*");
		for(var i=0;i<suoyou.length;i++){
			if(suoyou[i].className==classname){
				arr.push(suoyou[i]);
			}
		}
		return arr;
	}
}
// window.onload=function(){
// 	var t=getClass("box");
// 	alert(t.length);
// }
function getClass(classname,obj){
	var obj=obj||document;
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname);
	}else{
		var arr=[];
		var suoyou=document.getElementsByTagName("*");
		for(var i=0;i<suoyou.length;i++){
			if(panduan(suoyou[i],classname)){
				arr.push(suoyou[i]);
			}
		}
		return arr;
	}
}
function panduan(obj,classname){
	var classStr=obj.className;
	var fenge=classStr.split(" ");
	for(var i=0;i<fenge.length;i++){
		if(fenge[i]==classname){
			return true;
		}
		
	}return false;
}
// window.onload=function(){
// 	var fubei=document.getElementsByClassName("box")
// 	var t=getClass("box",fubei);
// 	alert(t.length);
// }
// 获取内容和修改内容
function getText(obj,val){
	if(val!=undefined){
		if(obj.innerText){
			obj.innerText=val;
		}else{
			obj.textContent=val;
		}
	}else{
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}	
}
//获取样式
function getStyle(obj,yangshi){
	if(obj.currentStyle){
		return obj.currentStyle[yangshi];
	}else{
		return getComputedStyle(obj,null)[yangshi];
	}
}
//获取元素
function $(val,obj){
	if(typeof val=="string"){
		var obj=obj||document;
			val.replace(/^\s*|\s*$/g,"");
		if(val.charAt(0)=="#"){
			return  document.getElementById(val.slice(1));
		}else if(val.charAt(0)=="."){
			return getClass(val.slice(1),obj);
		}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}$/.test(val)){
			return obj.getElementsByTagName(val);
		}else if(/^<[a-zA-Z][a-zA-Z0-9]{0,10}>$/.test(val)){ 
			return document.createElement(val.slice(1,-1))
		}
	}else if(typeof val=="function"){
		window.onload=function(){
			val();
		}
	}
}
// console.log(1)
// 节点的封装函数
// 拿到所有子节点
function getChilds(obj,type){
	var type=type||"no";
	var kids=obj.childNodes;
	var arr=[];
	for(var i=0;i<kids.length;i++){
		if(type=="no"){
			if(kids[i].nodeType=="1"){
				arr.push(kids[i]);
			}
		}else if(type=="yes"){
			if(kids[i].nodeType=="1"||kids[i].nodeType=="3"&&kids[i].nodeValue.replace(/^\s*|\s*$/g,"")){
				arr.push(kids[i]);
			}
		}
	}
	return arr;
}
// 拿到第一个
function getFirst(obj,type){
	var type=type||"no";
	return getChilds(obj,type)[0];
}
// 拿到最后一个
function getLast(obj,type){
	var type=type||"no";
	var childs=getChilds(obj,type);
	return childs[childs.length-1];
}
// 拿到第N个
function getNub(obj,n,type){
	var type=type||"no";
	var childs=getChilds(obj,type);
	if(n>childs.length||n<1){
		return false;
	}
	return childs[n-1];
}
// 拿兄弟节点
function getNext(obj,type){
	var type=type||"no";
	var next=obj.nextSibling;
	if(type==null){
		return false;
	}
	if(type=="no"){
		while(next.nodeType=="3"||next.nodeType=="8"){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
	if(type=="yes"){
		while(next.nodeType=="3"&&!next.nodeValue.replace(/^\s*|\s*$/g)||next.nodeType=="8"){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}	
}
// 获取上一个兄弟元素
function getPrevious(obj,type){
	var type=type||"no";
	var previous=obj.previousSibling;
	if(type==null){
		return false;
	}
	if(type=="no"){
		while(previous.nodeType=="3"||previous.nodeType=="8"){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}
		}
		return previous;
	}
	if(type=="yes"){
		while(previous.nodeType=="3"&&!previous.nodeValue.replace(/^\s*|\s*$/g)||previous.nodeType=="8"){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}
		}
		return previous;
	}
}
// 插入到某个对象之前
function insertBefore(obj,beforeObj){
	var parent=beforeObj.parentNode;
	parent.insertBefore(obj,beforeObj);
}
// 插入到某个对象之后
function insertAfter(obj,afterObj){
	var parent=afterObj.parentNode;
	var next=getNext(afterObj,"yes")
	if(!next){
		parent.appendChild(obj);
	}else{
		parent.insertBefore(obj,next);
	}

}
// 节点轮播
function nodeLunbo(obj,zuo,you,tu,img){
	var box=obj;
	var zuo=zuo;
	var you=you;
	var tu=tu;
	var img=img;
	var width=parseInt(getStyle(img,"width"));
	var fla=true;
	var t=setInterval(move,1500);
	function move(){
		if(fla==false){
			return;
		}
		fla=false;
		animate(tu,{left:-width},600,function(){
			var tuFirst=getFirst(tu)
			tu.appendChild(tuFirst);
			tu.style.left="0px";
			fla=true;
		})
	}
	box.onmouseover=function(){
		clearInterval(t);
	}
	box.onmouseout=function(){
		t=setInterval(move,1500);
	}
	zuo.onclick=function(){
		if(fla==false){
			return;
		}
		fla=false;
		var last=getLast(tu);
		var first=getFirst(tu);
		insertBefore(last,first);
		tu.style.left=-width+"px";
		animate(tu,{left:0},600,function(){
			fla=true;
		})
	}
	you.onclick=function(){
		move();
	}
}
// 双下标轮播
function shuangLunbo(obj,zuo,you,annius,tus,colorFirst,colorLast){
	var box=obj;
	var zuo=zuo;
	var you=you;
	var annius=annius;
	var tus=tus;
	var width=parseInt(getStyle(box,"width"))
	var n=0;
	var naet=0;
	var fla=true;
	var t=setInterval(fun,2000);
	function fun(){
		if(fla==false){
			return;
		}
		fla=false;
		next=n+1;
		if(next>=tus.length){
			next=0;
		}
		// 给下一个让它到右边
		tus[next].style.left=width+"px";
		animate(tus[n],{left:-width},600,Tween.Quad.easeInOut);
		animate(tus[next],{left:0},600,Tween.Quad.easeInOut,function(){
			fla=true;
		});
		annius[n].style.background=colorFirst;
		annius[next].style.background=colorLast;
		n=next;
	}
	box.onmouseover=function(){
		clearInterval(t);
		zuo.style.display="block";
		you.style.display="block";
	}
	box.onmouseout=function(){
		t=setInterval(fun,2000);
		zuo.style.display="none";
		you.style.display="none";
	}
	zuo.onclick=function(){
		if(fla==false){
			return;
		}
		fla=false;
		next=n-1;
		if(next<0){
			next=tus.length-1;
		}
		// 给下一个让它到右边
		tus[next].style.left=-width+"px";
		animate(tus[n],{left:width},600,Tween.Quad.easeInOut);
		animate(tus[next],{left:0},600,Tween.Quad.easeInOut,function(){
			fla=true;
		});
		annius[n].style.background=colorFirst;
		annius[next].style.background=colorLast;
		n=next;
	}
	you.onclick=function(){
		fun();
	}
	for(var i=0;i<tus.length;i++){
		annius[i].index=i;
		annius[i].onclick=function(){
			if(fla==false){
				return;
			}
			fla=false;
			if(this.index<n){
				tus[this.index].style.left=-width+"px";
				animate(tus[n],{left:width},600,Tween.Quad.easeInOut);
			}else if(this.index>n){
				tus[this.index].style.left=width+"px";
				animate(tus[n],{left:-width},600,Tween.Quad.easeInOut);
			}
			animate(tus[this.index],{left:0},600,Tween.Quad.easeInOut,function(){
				fla=true;
			});
			annius[n].style.background=colorFirst;
			annius[this.index].style.background=colorLast;
			n=this.index;
			next=this.index;
		}
	}
}
// console.log(1)
//左右点击播放 
function dianjiLunbo(obj,zuo,you,annius,tus,colorFirst,colorLast){
	var box=obj;
	var zuo=zuo;
	var you=you;
	var annius=annius;
	var tus=tus;
	var width=parseInt(getStyle(box,"width"))
	var n=0;
	var naet=0;
	var fla=true;
	// box.onmouseover=function(){
	// 	zuo.style.display="block";
	// 	you.style.display="block";
	// }
	// box.onmouseout=function(){
	// 	zuo.style.display="none";
	// 	you.style.display="none";
	// }
	zuo.onclick=function(){
		if(fla==false){
			return;
		}
		fla=false;
		next=n-1;
		if(next<0){
			next=tus.length-1;
		}
		// 给下一个让它到右边
		tus[next].style.left=-width+"px";
		animate(tus[n],{left:width},600,Tween.Quad.easeInOut);
		animate(tus[next],{left:0},600,Tween.Quad.easeInOut,function(){
			fla=true;
		});
		annius[n].style.background=colorFirst;
		annius[next].style.background=colorLast;
		n=next;
	}
	you.onclick=function(){
		if(fla==false){
			return;
		}
		fla=false;
		next=n+1;
		if(next>=tus.length){
			next=0;
		}
		// 给下一个让它到右边
		tus[next].style.left=width+"px";
		animate(tus[n],{left:-width},600,Tween.Quad.easeInOut);
		animate(tus[next],{left:0},600,Tween.Quad.easeInOut,function(){
			fla=true;
		});
		annius[n].style.background=colorFirst;
		annius[next].style.background=colorLast;
		n=next;;
	}
	for(var i=0;i<tus.length;i++){
		annius[i].index=i;
		annius[i].onclick=function(){
			if(fla==false){
				return;
			}
			fla=false;
			if(this.index<n){
				tus[this.index].style.left=-width+"px";
				animate(tus[n],{left:width},600,Tween.Quad.easeInOut);
			}else if(this.index>n){
				tus[this.index].style.left=width+"px";
				animate(tus[n],{left:-width},600,Tween.Quad.easeInOut);
			}
			animate(tus[this.index],{left:0},600,Tween.Quad.easeInOut,function(){
				fla=true;
			});
			annius[n].style.background=colorFirst;
			annius[this.index].style.background=colorLast;
			n=this.index;
			next=this.index;
		}
	}
}	
// 一个事件绑定多个事件
// 添加
function addEvent(obj,event,fun){
	// for(var i=0;i<fun.length;i++){
		if(obj.attachEvent){
			obj.attachEvent("on"+event,fun)
		}else if(obj.addEventListener){
			obj.addEventListener(event,fun,false)
		}
	// }
}
// 删除
function removeEvent(obj,event,fun){
	if(obj.datachEvent){
		obj.datachEvent("on"+event,fun);
	}else if(obj.removeEventListener){
		obj.removeEventListener(event,fun,false);
	}
}
// 滚轮事件
function mouseWheel(obj,down,up){
	if(obj.attachEvent){
		//Ie 事件绑定
		document.attachEvent(obj,"mousewheel",scorllfun);
	}else{
		// 火狐  事件绑定
		document.addEventListener("DOMMouseScroll",scorllfun,false)
		// 谷歌 事件绑定
		document.addEventListener("mousewheel",scorllfun,false)
	}
	function scorllfun(e){
		var e=e||window.event;
		//去除浏览器的默认动作 
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue=false;
		}
		var nub=e.wheelDelta||e.detail;
		if(nub==-120||nub==3){
			// call改变this指针，让this指向obj
			down.call(obj);
		}
		if(nub==120||nub==-3){
			// call改变this指针，让this指向obj
			up.call(obj);
		}

	}
}
// 以面向对象的方法去写程序
// 面向对象的程序设计方法
// 鼠标拖拽
function Drag(obj){
	this.obj=obj;
	this.ox=0;
	this.oy=0;
	this.cx=0;
	this.cy=0;
	this.left=0;
	this.top=0;
	this.oh=this.obj.offsetHeight;
	this.ow=this.obj.offsetWidth;
	this.cw=document.documentElement.clientWidth;
	this.ch=document.documentElement.clientHeight;
}
	Drag.prototype={
		Drag:function(){
			this.down();
		},
		down:function(){
			var that=this;
			that.obj.onmousedown=function(e){
				var event=e||window.event;
				that.ox=event.offsetX;
				that.oy=event.offsetY;
				that.move();
				that.up();
			}
		},
		move:function(){
			var that=this;
			document.onmousemove=function(e){
				var event=e||window.event;
				if(event.preventDefault){
					// Ie
					event.preventDefault();
				}else{
					// w3c
					event.returnValue=false;
				}
				that.cx=event.clientX;
				that.cy=event.clientY;
				that.top=that.cy-that.oy;
				that.left=that.cx-that.ox;
				if(that.top<=0){
					that.top=0;
				}
				if(that.left<=0){
					that.left=0;
				}
				if(that.top>=that.ch-that.oh){
					that.top=that.ch-that.oh
				}
				if(that.left>=that.cw-that.ow){
					that.left=that.cw-that.ow
				}
				that.obj.style.left=that.left+"px";
				that.obj.style.top=that.top+"px";
			}
		},
		up:function(){
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
			}
		}
	}
//15.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
	if(parent.contains){
		return parent.contains(child) && parent!=child;
	}else{
		return (parent.compareDocumentPosition(child)===20);
	}
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
	if(getEvent(e).type=="mouseover"){
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	}else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
	}
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
	if(overfun){
		obj.onmouseover=function  (e) {
			if(checkHover(e,obj)){
				overfun.call(obj,[e]);
			}
		}
	}
	if(outfun){
		obj.onmouseout=function  (e) {
			if(checkHover(e,obj)){
				outfun.call(obj,[e]);
			}
		}
	}
}
function getEvent (e) {
	return e||window.event;
}
