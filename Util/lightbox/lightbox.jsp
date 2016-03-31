<%@ page contentType="text/html;charset=GBK"%>

<!-- 认证弹出页面 -->
<style type="text/css">
.bgbox {
	DISPLAY: none; Z-INDEX: 777; FILTER: alpha(opacity=0); LEFT: 0px; WIDTH: 100%; POSITION: absolute; TOP: 0px; HEIGHT: 100%; background-color: #3c3c3c; moz-opacity: .8; opacity: .80
}
.lightbox {
	DISPLAY: none; Z-INDEX: 888; BACKGROUND: #fff; FILTER: alpha(opacity=0); OVERFLOW: hidden; WIDTH: 100%; POSITION: absolute; border: 1px #ccc solid;
	padding:0px;
	
}
/**认证页面关闭按钮
#LBclose {
	position:absolute;
	top:6px;
	right:6px;
}
**/
a.global-top-close:hover {
    opacity: 1;
    color: #333;   
    cursor: pointer;
}
a.global-top-close:active {
    opacity: 1;
    color: #ff9c00;   
}
a.global-top-close {
  
    WIDTH: 28px;
    height: 28px;
    position: absolute;
	z-index:2000;
    right: 0px;
	top:0px;
	font-size:20px; 
	line-height:40px;
	 color:#CCC;
	 padding-right:10px;
    text-align: right;
    text-decoration: none；
  
}
</style>
<script type="text/javascript">
var lightbox_blank = "${WebRootPath}/Resources/js/lightbox/lightbox_empty.jsp";
</script>

<div class=lightbox id=lightbox style="BACKGROUND: url(${WebRootPath}/util/Resources/js/lightbox/loading.gif) #fff no-repeat center 50%; WIDTH: 650px">
<a onclick="lightboxhidden();"   class="global-top-close">x</a>
<iframe id=lightboxiframe name=lightboxiframe  src="${WebRootPath}/util/Resources/js/lightbox/lightbox_empty.jsp" frameBorder=0 width=100%  scrolling=no></iframe>
</div>
<div class=bgbox id=bgbox></div>
<script type="text/javascript" charset="utf-8" src="${WebRootPath}/util/Resources/js/lightbox/lightbox.js"></script>