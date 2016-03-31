function lightbox_iframe_onload(){
	$("#lightboxiframe",window.parent.document).height(document.body.scrollHeight);
	$("#lightbox",window.parent.document).height(document.body.scrollHeight);
	parent.lightboxposition();
	parent.document.getElementById('lightboxiframe').style.visibility="visible";
}
lightbox_iframe_onload();

