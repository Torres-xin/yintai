$(function(){
// 双下标轮播
		var box=getClass("neikuan")[0];
	var tus=getClass("banner1");
	var banner=getClass("banner")[0]
	var imgs=getClass("beijing")
	var annius=getClass("juxing1");
	var zuo=getClass("z-anniu")[0];
	var you=getClass("y-anniu")[0];
	var width=parseInt(getStyle(box,"width"))
	var widthb=parseInt(getStyle(banner,"width"))
	var n=0;
	var next=0;
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
		if(next>=imgs.length){
			next=0;
		}
		// 给下一个让它到右边

		animate(imgs[n],{opacity:0},600);
		animate(imgs[next],{opacity:1},600);
		animate(tus[n],{opacity:0},600);
		animate(tus[next],{opacity:1},600,function(){
			fla=true;
		});
		annius[n].style.cssText="background:#211616";
		annius[next].style.cssText="background:#E5004F";
		n=next;
	}
	box.onmouseover=function(){
		clearInterval(t);
	}
	box.onmouseout=function(){
		t=setInterval(fun,2000);
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
		if(next<0){
			next=imgs.length-1;
		}
		// 给下一个让它到右边
		animate(imgs[n],{opacity:0},600);
		animate(imgs[next],{opacity:1},600);
		animate(tus[n],{opacity:0},600);
		animate(tus[next],{opacity:1},600,function(){
			fla=true;
		});
		annius[n].style.cssText="background:#211616";
		annius[next].style.cssText="background:#E5004F";
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
				animate(imgs[n],{opacity:0},600);
				animate(tus[n],{opacity:0},600);
			}else if(this.index>n){
				animate(imgs[n],{opacity:0},600);
				animate(tus[n],{opacity:0},600);
			}
			animate(imgs[this.index],{opacity:1},600);
			animate(tus[this.index],{opacity:1},600,function(){
				fla=true;
			});
			annius[n].style.cssText="background:#211616";
			annius[this.index].style.cssText="background:#E5004F";
			n=this.index;
			next=this.index;
		}
	}

	// var box=document.getElementsByClassName('quanbu')[0];
	// var shang=box.getElementsByTagName("ul")[0];
	// var xia=box.getElementsByTagName("ul")[1];
	// var nav=shang.getElementsByClassName("nav");
	// var tu=xia.getElementsByClassName("tu");
	// for(var i=0;i<nav.length;i++){
	// 	nav[i].index=i;
	// 	nav[i].onmouseover=function(){
	// 		for(var i=0;i<nav.length;i++){
	// 			nav[i].className="nav";	
	// 		}
	// 		this.className="nav jia";
	// 		for(var i=0;i<tu.length;i++){
	// 			tu[i].className="tu";
	// 		}
	// 		tu[this.index].className="tu img"
	// 	}
	// }
	var box=$(".quanbu")[0];
	var lefts=$(".left");
	var rights=$(".fenlei-right");
	for(var i=0;i<lefts.length;i++){
		lefts[i].index=i;
		hover(lefts[i],function(){
			that=this;
			for(var i=0;i<rights.length;i++){
				rights[that.index].style.display="block";
			}
		},function(){
			that=this;
			for(var i=0;i<rights.length;i++){
				rights[that.index].style.display="none";
			}
		})
		that=this;
		hover(rights[i],function(){
			for(var i=0;i<rights.length;i++){
				rights[that.index].style.display="block";
			}
		},function(){
			for(var i=0;i<rights.length;i++){
				rights[that.index].style.display="none";
			}
		})
	}
	// banner右边广告移动
	var banner_right=$(".banner-right")[0];
	banner_right.onmouseover=function(){
		animate(this,{right:10},300)
	}
	banner_right.onmouseout=function(){
		animate(this,{right:0},300)
	}
	// hover(banner_right,function(){
	// 	// banner_right.style.right=10+"px";
	// 	animate(this,{right:10},500)
	// },function(){
	// 	// this.style.right=0+"px";
	// 	animate(this,{right:0},500)
	// })
	// 百货
	var baihuo_daohang=$(".baihuo_daohang");
	var right_bottom=$(".right-bottom");
	for(var i=0;i<baihuo_daohang.length;i++){
		baihuo_daohang[i].index=i;
		hover(baihuo_daohang[i],function(){
			for(var i=0;i<baihuo_daohang.length;i++){
				baihuo_daohang[i].className="baihuo_daohang";
				
			}
			this.className="baihuo_daohang dian1";
			for(var i=0;i<right_bottom.length;i++){
				right_bottom[i].className="right-bottom";
			}
			right_bottom[this.index].className="right-bottom right-first"
		},function(){
			console.log(2)
		})
	}
	// 时尚
	dianjiLunbo($(".style-bottom-zhong")[0],$(".zuo-1")[0],$(".you-1")[0],$(".shishang-one"),$(".mingpai"),"#6E6E6E","#E5175E");
	// 鞋靴
	dianjiLunbo($(".style-bottom-zhong")[1],$(".zuo-1")[1],$(".you-1")[1],$(".shishang1-one"),$(".mingpai1"),"#6E6E6E","#E5175E");
	// 箱包
	dianjiLunbo($(".style-bottom-zhong")[2],$(".zuo-1")[2],$(".you-1")[2],$(".shishang2-one"),$(".mingpai2"),"#6E6E6E","#E5175E");
	// 美容护肤
	dianjiLunbo($(".style-bottom-zhong")[3],$(".zuo-1")[3],$(".you-1")[3],$(".shishang3-one"),$(".mingpai3"),"#6E6E6E","#E5175E");
	// 运动户外
	dianjiLunbo($(".style-bottom-zhong")[4],$(".zuo-1")[4],$(".you-1")[4],$(".shishang4-one"),$(".mingpai4"),"#6E6E6E","#E5175E");
	// 内衣配饰
	dianjiLunbo($(".style-bottom-zhong")[5],$(".zuo-1")[5],$(".you-1")[5],$(".shishang5-one"),$(".mingpai5"),"#6E6E6E","#E5175E");
// 楼层跳转
	var lou_nav=$(".guding")[0];
	var nav=$(".guding1");
	var lou=$(".Floor_jump");
	var n;
	var cHeight=document.documentElement.clientHeight;
	var span=$(".guding2")
	for(var i=0;i<lou.length;i++){
		lou[i].h=lou[i].offsetTop;
		// console.log(lou[i].h)
		window.onscroll=function(){	
			var obj=document.body.scrollTop?document.body:document.documentElement;
			// console.log(obj.scrollTop);
			var top=obj.scrollTop;
			if(top>=lou[0].h-800){
				lou_nav.style.display="block";
				var nHeight=lou_nav.offsetHeight;
				lou_nav.style.top=(cHeight-nHeight)/2+"px";
			}else if(top<lou[0].h-800){
				lou_nav.style.display="none";
			}
			for(var i=0;i<lou.length;i++){
				if(top>=lou[i].h-500){
					for(var j=0;j<span.length;j++){
						span[j].style.display="none";
					}
					
					span[i].style.display="block";
					n=i;
				}
				
			}
			for(var i=0;i<nav.length;i++){
		 		nav[i].index=i;
		 		nav[i].onclick=function(){
			 		animate(document.body,{scrollTop:lou[this.index].h-100})
			 		animate(document.documentElement,{scrollTop:lou[this.index].h-100})
			 		n=this.index;
		 		}
		 		hover(nav[i],function(){
		 			that=this;
		 			for(var i=0;i<span.length;i++){
		 				span[that.index].style.display="block";
		 				console.log(this.index)
		 			}
		 		},function(){
		 			if(this.index==n){
		 				return;
		 			}
		 			that=this;
		 			for(var i=0;i<span.length;i++){
		 				span[that.index].style.display="none";
		 				console.log(this.index)
		 			}
		 		})
			}
			var back=$(".fanhui")[0];
			back.onclick=function(){
				animate(document.body,{scrollTop:0},400)
				animate(document.documentElement,{scrollTop:0},400)
			}
			
		}
		
	}
	// 我的银泰下拉框
	var frame_xiala=$(".frame-xiala")[0];
	var ul=$(".xiala")[0];
	hover(frame_xiala,function(){
		ul.style.display="block";
	},function(){
		ul.style.display="none";
	})
	// var nav_fl=$(".frame-xiala");
	// for(var i=0;i<nav_fl.length;i++){
	// 	if(i==0){
	// 		continue;
	// 	}
	// 	hover(nav_fl[i],function(){
	// 		var height=this.offsetHeight;
	// 		var ul=$(".xiala",this)[0];
	// 		// this.style.background="F3F3F3"
	// 		var xL_nav=$(".xiala_nav").length;
	// 		var ulHeight=xL_nav*height;
	// 		animate(ul,{height:ulHeight},500)
	// 	},function(){
	// 		var ul=$(".xiala",this)[0];
	// 		animate(ul,{height:0},500)
	// 	})
	// }
		
})