//---------------���崰����ʾλ��---------------

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

//----------------lightbox����----------------

function lightboxhidden(){
   hiddenlightbox = setInterval(lightbox_hidden,5);						//����lightbox����Ч��JS�����ؼ�ʱ
}

//----------------lightbox����Ч��JS----------------
function lightbox_hidden(changbox){
	var objbgbox = document.getElementById("bgbox");
	var objlight = document.getElementById("lightbox");
	var objiframe = document.getElementById("lightboxiframe");
	
	bgopacityspeed=bgopacityspeed+10;										//����͸�����ٶȵ�����ʽ
	bgopacitydegree=bgopacitydegree-bgopacityspeed;							//����͸���ȵݼ���ʽ
	lightboxopspeed=lightboxopspeed+15;									//����͸�����ٶȵ�����ʽ
	lightboxopdegree=lightboxopdegree-lightboxopspeed;					//����͸���ȵݼ���ʽ

	objbgbox.style.filter = "Alpha(Opacity=" + bgopacitydegree + ")"; 	//����͸���ȵݼ�
	objbgbox.style.opacity = bgopacitydegree/100; 						//����FireFox
	objlight.style.filter = "Alpha(Opacity=" + lightboxopdegree+ ")"; 	//����͸���ȵݼ�
	objlight.style.opacity = lightboxopdegree/100; 						//����FireFox
	
	if (bgopacitydegree<=0) {												//�жϽ�������
	
	clearInterval(hiddenlightbox);										//��ռ�ʱ
	bgopacitydegree=0;													//��ʼ������͸����
	bgopacityspeed=0;														//��ʼ������͸�����ٶ�
	lightboxopdegree=100;												//��ʼ������͸����
	lightboxopspeed=0;													//��ʼ������͸�����ٶ�

	objbgbox.style.filter = "Alpha(Opacity=0)";							//��ʼ������͸��
	objbgbox.style.opacity = 0;
	objlight.style.filter = "Alpha(Opacity=100)";	
	objlight.style.opacity = 100;
	
	//��ʼ������͸��
	objbgbox.style.display="none";										//��ʼ���������ɼ�
	objlight.style.display="none";										//��ʼ�����ڲ��ɼ�
	
	objiframe.src=lightbox_blank;													//���iframe_src
	if(checkotherenter == '1'){
	window.location.href= currenturl;					//�ж��Ƿ��������ڽ���
	}
	else{}
   }
}

//----------------bgbox����----------------
var bgopacitydegree = 0;													//����͸����
var bgopacityspeed=0;														//����͸�����ٶ�
//--------------lightbox����----------------
var lightboxopspeed=0;  												//����͸����
var lightboxopdegree=100;  												//����͸�����ٶ�

//------------iframe_src����----------
var lightboxsrc;
//--------------��ʾ/����ʱ������----------------
var showlightbox;
var hiddenlightbox;
//-------------�ж��Ƿ�ˢ��ҳ��------------------
var checkotherenter = 0;


//===============================================


//----------------lightbox��ʾ----------------
function lightboxshow(lightboxsrc){

	var objbgbox = document.getElementById("bgbox");
	var objlightbox = document.getElementById("lightbox");
	var objiframe =document.getElementById("lightboxiframe");

	objbgbox.style.width=document.documentElement.clientWidth+"px";  	//�趨�����ߴ�
	objbgbox.style.height=document.body.scrollHeight+"px";           	//�趨�����ߴ� 
	objlightbox.style.display='block';								 	//��ʾ���ڣ���ʼ͸��
	document.getElementById("lightbox").style.height=330+"px";
	lightboxposition();
	objiframe.src=lightboxsrc;							 	//��ȡiframe��ַ
	//objiframe.style.filter = "Alpha(Opacity=0)";							//��ʼ��iframe͸��
	objiframe.style.visibility="hidden";
	objbgbox.style.display='block';									 	//������ʾ����ʼ͸��
	checkotherenter = 2;
	
	//Ϊiframe����¼��Զ�̬��Ӧ�߶�
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
	
	showlightbox = setInterval(lightbox_show,5);						//����lightbox����Ч��JS�����ؼ�ʱ
	
}


//----------------lightbox����Ч��JS----------------

function lightbox_show(){
	var objbgbox = document.getElementById("bgbox");
	var objlightbox = document.getElementById("lightbox");

	bgopacityspeed=bgopacityspeed+3;										//͸�����ٶȵ�����ʽ
	bgopacitydegree=bgopacitydegree+bgopacityspeed;							//͸���ȵ�����ʽ
	objbgbox.style.filter = "Alpha(Opacity=" + bgopacitydegree + ")";  	//����͸���ȵ���
	objbgbox.style.opacity = bgopacitydegree/100;							//����FireFox
   
	if ( bgopacitydegree>=40 ){											//�жϽ�������

	clearInterval(showlightbox);										//��ռ�ʱ
    bgopacitydegree=40;													//���ñ���͸����
    bgopacityspeed=0;														//���ñ���͸�����ٶ�
    objlightbox.style.filter = "Alpha(Opacity=100)";						//��ʾ���ڣ���Ϊ��͸��
   
  }
}
