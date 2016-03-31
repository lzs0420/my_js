//---------------定义窗口显示位置---------------

function lightboxposition(){
	var windowWidth = document.documentElement.clientWidth;   
	var windowHeight = document.documentElement.clientHeight;   
	var popupHeight = $("#lightbox").height();   
	var popupWidth = $("#lightbox").width();   
	$("#bgbox").css({ 
		"height": document.documentElement.scrollHeight
	});
	$("#lightbox").css({   
		"position": "absolute",   
		"top": (windowHeight-popupHeight)/2+$(document).scrollTop(),   
		"left": (windowWidth-popupWidth)/2   
	}); 
}

//----------------lightbox隐藏----------------

function lightboxhidden(){
   hiddenlightbox = setInterval(lightbox_hidden,5);						//加载lightbox淡出效果JS，加载计时
}

//----------------lightbox淡出效果JS----------------
function lightbox_hidden(changbox){
	var objbgbox = document.getElementById("bgbox");
	var objlight = document.getElementById("lightbox");
	var objiframe = document.getElementById("lightboxiframe");
	
	bgopacityspeed=bgopacityspeed+10;										//背景透明加速度递增公式
	bgopacitydegree=bgopacitydegree-bgopacityspeed;							//背景透明度递减公式
	lightboxopspeed=lightboxopspeed+15;									//窗口透明加速度递增公式
	lightboxopdegree=lightboxopdegree-lightboxopspeed;					//窗口透明度递减公式

	objbgbox.style.filter = "Alpha(Opacity=" + bgopacitydegree + ")"; 	//背景透明度递减
	objbgbox.style.opacity = bgopacitydegree/100; 						//兼容FireFox
	objlight.style.filter = "Alpha(Opacity=" + lightboxopdegree+ ")"; 	//窗口透明度递减
	objlight.style.opacity = lightboxopdegree/100; 						//兼容FireFox
	
	if (bgopacitydegree<=0) {												//判断结束条件
	
	clearInterval(hiddenlightbox);										//清空计时
	bgopacitydegree=0;													//初始化背景透明度
	bgopacityspeed=0;														//初始化背景透明加速度
	lightboxopdegree=100;												//初始化窗口透明度
	lightboxopspeed=0;													//初始化窗口透明加速度

	objbgbox.style.filter = "Alpha(Opacity=0)";							//初始化背景透明
	objbgbox.style.opacity = 0;
	objlight.style.filter = "Alpha(Opacity=100)";	
	objlight.style.opacity = 100;
	
	//初始化窗口透明
	objbgbox.style.display="none";										//初始化背景不可见
	objlight.style.display="none";										//初始化窗口不可见
	
	objiframe.src=lightbox_blank;													//清空iframe_src
	if(checkotherenter == '1'){
	window.location.href= currenturl;					//判断是否从其他入口进入
	}
	else{}
   }
}

//----------------bgbox参数----------------
var bgopacitydegree = 0;													//背景透明度
var bgopacityspeed=0;														//背景透明加速度
//--------------lightbox参数----------------
var lightboxopspeed=0;  												//窗口透明度
var lightboxopdegree=100;  												//窗口透明加速度

//------------iframe_src参数----------
var lightboxsrc;
//--------------显示/隐藏时间点参数----------------
var showlightbox;
var hiddenlightbox;
//-------------判断是否刷新页面------------------
var checkotherenter = 0;


//===============================================


//----------------lightbox显示----------------
function lightboxshow(lightboxsrc){

	var objbgbox = document.getElementById("bgbox");
	var objlightbox = document.getElementById("lightbox");
	var objiframe =document.getElementById("lightboxiframe");

	objbgbox.style.width=document.documentElement.clientWidth+"px";  	//设定背景尺寸
	objbgbox.style.height=document.body.scrollHeight+"px";           	//设定背景尺寸 
	objlightbox.style.display='block';								 	//显示窗口，初始透明
	document.getElementById("lightbox").style.height=330+"px";
	lightboxposition();
	objiframe.src=lightboxsrc;							 	//读取iframe地址
	//objiframe.style.filter = "Alpha(Opacity=0)";							//初始化iframe透明
	objiframe.style.visibility="hidden";
	objbgbox.style.display='block';									 	//背景显示，初始透明
	checkotherenter = 2;
	
	//为iframe添加事件以动态适应高度
	objiframe.onload = function(){
		if(objiframe.src == lightbox_blank) return;
		if(objiframe.contentDocument){
			//Hack for FF
			var iHeight = objiframe.contentDocument.body.scrollHeight;
			//alert(iHeight)
			objiframe.style.height = iHeight + 'px';
			objlightbox.style.height = iHeight + 'px';
						
		}else if(objiframe.document && objiframe.document.body.scrollHeight){
			//iHeight = objiframe.document.body.scrollHeight;
		}
		

	};
	
	showlightbox = setInterval(lightbox_show,5);						//加载lightbox淡入效果JS，加载计时
	
}


//----------------lightbox淡入效果JS----------------

function lightbox_show(){
	var objbgbox = document.getElementById("bgbox");
	var objlightbox = document.getElementById("lightbox");

	bgopacityspeed=bgopacityspeed+3;										//透明加速度递增公式
	bgopacitydegree=bgopacitydegree+bgopacityspeed;							//透明度递增公式
	objbgbox.style.filter = "Alpha(Opacity=" + bgopacitydegree + ")";  	//背景透明度递增
	objbgbox.style.opacity = bgopacitydegree/100;							//兼容FireFox
   
	if ( bgopacitydegree>=40 ){											//判断结束条件

	clearInterval(showlightbox);										//清空计时
    bgopacitydegree=40;													//重置背景透明度
    bgopacityspeed=0;														//重置背景透明加速度
    objlightbox.style.filter = "Alpha(Opacity=100)";						//显示窗口，置为不透明
   
  }
}
