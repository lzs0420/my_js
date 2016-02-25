<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="keyboard.js" charset="UTF-8"></script>
<link rel="stylesheet" type="text/css" href="keyboard.css">
</head>

<body>
<!-- 请使用如下格式，参考页面：http://www.greywyvern.com/code/javascript/keyboard -->

	<div class="keyboardDiv">
		<input type="text" value="" class="keyboardInput" />
	</div>

</body>

<style>
.keyboardDiv{
	height: 35px;
	width: 200px;
	position: relative;
	display: inline;
}
.keyboardDiv input{
font-size:23px;
	width: 200px;
	height: 35px;
	border-radius: 2px;
    border: 1px solid #c5c5c5;
    box-shadow: 0 1px 3px #eee inset;
    padding-right: 40px;
    line-height: 35px;
}
.keyboardDiv img{
	float:right;
	position: absolute;
	right: 0;
	top:0;
	height:15px;
}
</style>
</html>