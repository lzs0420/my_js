//====================================================================================================
// [�������] jQuery formValidator
//----------------------------------------------------------------------------------------------------
// [��    ��] jQuery formValidator����֤��������ǻ���jQuery��⣬ʵ����js�ű���ҳ��ķ��롣��һ����
//            ��������ֻ��Ҫдһ�д���Ϳ�������ʵ��20�����ϵĽű����ơ���֧��һ����Ԫ���ۼӺܶ���
//            У�鷽ʽ,����������Ϣ��˼�룬�����ǰ���Ϣд�ڱ�Ԫ���ϣ��ܱȽ�������ʵ��ajax����
//----------------------------------------------------------------------------------------------------
// [��������] è��	
// [��    ��] wzmaodong@126.com
// [���߲���] http://wzmaodong.cnblogs.com
// [QQȺ����] 74106519
// [��������] 2011-05-22
// [�� �� ��] ver4.0.1
//====================================================================================================
(function($) {

$.formValidator = 
{
	//ȫ������
	initConfig : function(controlOptions)
	{
		var settings = 
		{
			debug:false,								//����ģʽ
			validatorGroup : "1",						//�����
			alertMessage:false,							//�Ƿ�Ϊ����������ʾģʽ
			validObjects:[],							//�μ�У��Ŀؼ�����
			ajaxObjects:"",							//�����������Ŀؼ��б�
			forceValid:false,							//�ؼ�������ȷ֮�󣬲�����ʧȥ����
			onSuccess: function() {return true;},		//�ύ�ɹ���Ļص�����
			onError: $.noop,						//�ύʧ�ܵĻص�����
			submitOnce:false,							//ҳ���Ƿ��ύһ�Σ�����ͣ��
			formID:"",					//��ID
			submitButtonID:"",			//�ύ��ťID
			autoTip: false,				//�Ƿ��Զ�������ʾ��
			tidyMode:false,				//����ģʽ
			errorFocus:true,			//��һ������Ŀؼ���ý���
			wideWord:true,				//һ�����ֵ���2������
			status:"",					//�ύ��״̬��submited��sumbiting��sumbitingWithAjax
			submitAfterAjaxPrompt : "",	//�ؼ�ʧȥ����󣬴���ajaxУ�飬û�з��ؽ��ǰ�Ĵ�����ʾ
			validCount:0,			//��ajaxValidator�Ŀؼ�����
			ajaxCountSubmit:0,		//�ύ��ʱ�򴥷���ajax��֤����
			ajaxCountValid:0,		//ʧȥ����ʱ�򴥷���ajax��֤����
			inIframe:false
			
		};
		controlOptions = controlOptions || {};
		$.extend(settings, controlOptions);
		//����Ǿ���ģʽ�����������ʱ�򣬵�һ������Ŀؼ��Ͳ���ý���
		if(settings.tidyMode){settings.errorFocus=false;}
		//�����д�˱��Ͱ�ť����ע����֤�¼�
		if(settings.formID!=""){
			$("#"+settings.formID).submit(function(){return $.formValidator.bindSubmit(settings);});
		}
		else if(settings.submitButtonID!="")
		{
			$("#"+settings.submitButtonID).click(function(){return $.formValidator.bindSubmit(settings);});
		}
		$('body').data(settings.validatorGroup, settings);
	},
	
	//������֤����
	bindSubmit : function(settings)
	{
		if (settings.ajaxCountValid > 0 && settings.submitAfterAjaxPrompt != "") {
			alert(settings.submitAfterAjaxPrompt);	
			return false;
		}
		return $.formValidator.pageIsValid(settings.validatorGroup);
	},
	
	//����У�鷽ʽ֧�ֵĿؼ�����
	sustainType : function(id,setting)
	{
		var elem = $("#"+id).get(0);
		var srcTag = elem.tagName;
		var stype = elem.type;
		switch(setting.validateType)
		{
			case "InitValidator":
				return true;
			case "InputValidator":
				return (srcTag == "INPUT" || srcTag == "TEXTAREA" || srcTag == "SELECT");
			case "CompareValidator":
				return ((srcTag == "INPUT" || srcTag == "TEXTAREA") ? (stype != "checkbox" && stype != "radio") : false);
			case "AjaxValidator":
				return (stype == "text" || stype == "textarea" || stype == "file" || stype == "password" || stype == "select-one");
			case "RegexValidator":
				return ((srcTag == "INPUT" || srcTag == "TEXTAREA") ? (stype != "checkbox" && stype != "radio") : false);
			case "FunctionValidator":
			    return true;
		}
	},
    
	//���validator�����Ӧ��element�����validator����׷��Ҫ���е�У�顣
	appendValid : function(id, setting )
	{
		//����Ǹ���У�鲻֧�ֵ����ͣ��Ͳ�׷�ӵ�������-1��ʾû��׷�ӳɹ�
		if(!$.formValidator.sustainType(id,setting)) return -1;
		var srcjo = $("#"+id).get(0);   
		//���³�ʼ��
		if (setting.validateType=="InitValidator" || srcjo.settings == undefined ){srcjo.settings = new Array();}   
		var len = srcjo.settings.push( setting );
		srcjo.settings[len - 1].index = len - 1;
		return len - 1;
	},
	
	//������ʾ��Ϣ
	setTipState : function(elem,showclass,showmsg)
	{
		var initConfig = $('body').data(elem.validatorGroup);
	    var tip = $("#"+elem.settings[0].tipID);
		if(showmsg==null || showmsg=="")
		{
			tip.hide().parent(".error").hide();
		}
		else
		{
			if(initConfig.tidyMode)
			{
				//��ʾ�ͱ�����ʾ��Ϣ
				$("#fv_content").html(showmsg);
				elem.Tooltip = showmsg;
				if(showclass!="onError"){tip.hide();}
			}
			else
			{
				tip.show().removeClass().addClass( showclass ).html( showmsg ).parent(".error").show();
				
			}
		}
	},
		
	//����ʾ�����ó�ԭʼ��ʾ(�����defaultPassed,Ӧ������ΪonCorrect)
	resetTipState : function(validatorGroup)
	{
		if(validatorGroup == undefined){validatorGroup = "1";}
		var initConfig = $('body').data(validatorGroup);
		$.each(initConfig.validObjects,function(){
			var elem = this.get(0);
			var setting = elem.settings[0];
			var passed = setting.defaultPassed;
			$.formValidator.setTipState(elem, passed ? "onCorrect" : "onShow", passed ? setting.onCorrect : setting.onShow);	
		});
	},
	
	//���ô������ʾ��Ϣ
	setFailState : function(tipID,showmsg)
	{
	    var tip = $("#"+tipID);
	    tip.removeClass().addClass("onError").html(showmsg);
	},

	//���ݵ�������,��ȷ:��ȷ��ʾ,����:������ʾ
	showMessage : function(returnObj)
	{
	    var id = returnObj.id;
		var elem = $("#"+id).get(0);
		var isValid = returnObj.isValid;
		var setting = returnObj.setting;//��ȷ:setting[0],����:��Ӧ��setting[i]
		var showmsg = "",showclass = "";
		var intiConfig = $('body').data(elem.validatorGroup);
		if (!isValid)
		{		
			showclass = "onError";
			if(setting.validateType=="AjaxValidator")
			{
				if(setting.lastValid=="")
				{
				    showclass = "onLoad";
				    showmsg = setting.onWait;
				}
				else
				{
				    showmsg = setting.onError;
				}
			}
			else
			{
				showmsg = (returnObj.errormsg==""? setting.onError : returnObj.errormsg);
				
			}
			if(intiConfig.alertMessage)		
			{
				if(elem.validValueOld!=$(elem).val()){alert(showmsg);}   
			}
			else
			{
				$.formValidator.setTipState(elem,showclass,showmsg);
			}
		}
		else
		{		
			//��֤�ɹ���,���û�����óɹ���ʾ��Ϣ,�����Ĭ����ʾ,��������Զ�����ʾ;����Ϊ��,ֵΪ�յ���ʾ
			showmsg = $.formValidator.isEmpty(id) ? setting.onEmpty : setting.onCorrect;
			$.formValidator.setTipState(elem,"onCorrect",showmsg);
		}
		return showmsg;
	},

	showAjaxMessage : function(returnObj)
	{
		var elem = $("#"+returnObj.id).get(0);
		var setting = elem.settings[returnObj.ajax];
		var validValueOld = elem.validValueOld;
		var validvalue = $(elem).val();
		returnObj.setting = setting;
		//defaultPassed��δ����
		if(validValueOld!= validvalue || validValueOld == validvalue && !elem.onceValided)
		{
			$.formValidator.ajaxValid(returnObj);
		}
		else
		{
			if(setting.isValid!=undefined && !setting.isValid){
				elem.lastshowclass = "onError"; 
				elem.lastshowmsg = setting.onError;
			}
			$.formValidator.setTipState(elem,elem.lastshowclass,elem.lastshowmsg);
		}
	},

	//��ȡָ���ַ����ĳ���
    getLength : function(id)
    {
        var srcjo = $("#"+id);
		var elem = srcjo.get(0);
        var sType = elem.type;
        var len = 0;
        switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
		        var val = srcjo.val();
				var initConfig = $('body').data(elem.validatorGroup);
				if (initConfig.wideWord)
				{
					for (var i = 0; i < val.length; i++) 
					{
						len = len + ((val.charCodeAt(i) >= 0x4e00 && val.charCodeAt(i) <= 0x9fa5) ? 2 : 1); 
					}
				}
				else{
					len = val.length;
				}
		        break;
			case "checkbox":
			case "radio": 
				len = $("input[type='"+sType+"'][name='"+srcjo.attr("name")+"']:checked").length;
				break;
		    case "select-one":
		        len = elem.options ? elem.options.selectedIndex : -1;
				break;
			case "select-multiple":
				len = $("select[name="+elem.name+"] option:selected").length;
				break;
	    }
		return len;
    },
    
	//���empty������ԣ��жϽ����Ƿ�Ϊ�յ�У�������
    isEmpty : function(id)
    {
        return ($("#"+id).get(0).settings[0].empty && $.formValidator.getLength(id)==0);
    },
    
	//������ã��жϵ�����Ԫ���Ƿ���֤ͨ���������ص�����
    isOneValid : function(id)
    {
	    return $.formValidator.oneIsValid(id).isValid;
    },
    
	//��֤�����Ƿ���֤ͨ��,��ȷ����settings[0],���󷵻ض�Ӧ��settings[i]
	oneIsValid : function (id)
	{
		var returnObj = new Object();
		var elem = $("#"+id).get(0);
		returnObj.initConfig = $('body').data(elem.validatorGroup);
		returnObj.id = id;
		returnObj.ajax = -1;
		returnObj.errormsg = "";       //�Զ��������Ϣ
	    var settings = elem.settings;
	    var settingslen = settings.length;
		var validateType;
		//ֻ��һ��formValidator��ʱ�򲻼���
		if (settingslen==1){settings[0].bind=false;}
		if(!settings[0].bind){return null;}
		for ( var i = 0 ; i < settingslen ; i ++ )
		{   
			if(i==0){
				//���Ϊ�գ�ֱ�ӷ�����ȷ
				if($.formValidator.isEmpty(id)){
					returnObj.isValid = true;
					returnObj.setting = settings[0];
					break;
				}
				continue;
			}
			returnObj.setting = settings[i];
			validateType = settings[i].validateType;
			//�������ʹ���У��
			switch(validateType)
			{
				case "InputValidator":
					$.formValidator.inputValid(returnObj);
					break;
				case "CompareValidator":
					$.formValidator.compareValid(returnObj);
					break;
				case "RegexValidator":
					$.formValidator.regexValid(returnObj);
					break;
				case "FunctionValidator":
					$.formValidator.functionValid(returnObj);
					break;
				case "AjaxValidator":
					//�����ajaxУ�飬����ֱ��ȡ�ϴεĽ��ֵ
					returnObj.ajax = i;
					break;
			}
			//У���һ��
			elem.onceValided = true;
			if(!settings[i].isValid) {
				returnObj.isValid = false;
				returnObj.setting = settings[i];
				break;
			}else{
				returnObj.isValid = true;
				returnObj.setting = settings[0];
				if (settings[i].validateType == "AjaxValidator"){break;}
			}
		}
		return returnObj;
	},

	//��֤������Ҫ��֤�Ķ��󣬲������Ƿ���֤�ɹ����������������ajaxValidator���ύ��ʱ��Ͳ�����У�飬ֱ�Ӷ�ȡ�����
	pageIsValid : function (validatorGroup)
	{
	    if(validatorGroup == undefined){validatorGroup = "1";}
		var isValid = true,returnObj,firstErrorMessage="",errorMessage;
		var error_tip = "^",thefirstid,name,name_list="^"; 	
		var errorlist = new Array();
		//�����ύ״̬��ajax�Ƿ���������б�
		var initConfig = $('body').data(validatorGroup);
		initConfig.status = "sumbiting";
		initConfig.ajaxCountSubmit = 0;
		//��������ҪУ��Ŀؼ�,�������ajaxValidator����ֱ�Ӵ���
		$.each(initConfig.validObjects,function()
		{
			if (this.settings[0].bind && this.validatorAjaxIndex!=undefined && this.onceValided == undefined) {
				returnObj = $.formValidator.oneIsValid(this.id);
				if (returnObj.ajax == this.validatorAjaxIndex) {
					initConfig.status = "sumbitingWithAjax";
					$.formValidator.ajaxValid(returnObj);
				}
			}
		});
		//������ύ��ʱ���д���ajaxValidator�����еĴ�������ajax�ﴦ��
		if(initConfig.ajaxCountSubmit > 0){return false;}
		//��������ҪУ��Ŀؼ�
		$.each(initConfig.validObjects,function()
		{
			//ֻУ��󶨵Ŀؼ�
			if(this.settings[0].bind){
				name = this.name;
				//��ͬnameֻУ��һ��
				if (name_list.indexOf("^"+name+"^") == -1) {
					onceValided = this.onceValided == undefined ? false : this.onceValided;
					if(name){name_list = name_list + name + "^";}
					returnObj = $.formValidator.oneIsValid(this.id);
					if (returnObj) {
						//У��ʧ��,��ȡ��һ�������������Ϣ��ID
						if (!returnObj.isValid) {
							//��¼����ajaxValidatorУ�麯����У����
							isValid = false;
							errorMessage = returnObj.errormsg == "" ? returnObj.setting.onError : returnObj.errormsg;
							errorlist[errorlist.length] = errorMessage;
							if (thefirstid == null) {thefirstid = returnObj.id;}
							if(firstErrorMessage==""){firstErrorMessage=errorMessage;}
						}
						//Ϊ�˽��ʹ��ͬ��TIP��ʾ����:����ĳɹ���ʧ�ܶ�������ǰ���ʧ��
						if (!initConfig.alertMessage) {
							var tipID = this.settings[0].tipID;
							if (error_tip.indexOf("^" + tipID + "^") == -1) {
								if (!returnObj.isValid) {error_tip = error_tip + tipID + "^";}
								$.formValidator.showMessage(returnObj);
							}
						}
					}
				}
			}
		});
		
		//�ɹ���ʧ�ܽ��лص������Ĵ����Լ��ɹ���Ļҵ��ύ��ť�Ĺ���
		if(isValid)
		{
            initConfig.onSuccess();
            //����ύ����....add by mgao1
			if(initConfig.submitOnce){
				$(":submit,:button,:reset").attr("disabled",true);
				$.blockUI({   
					message: "<img src='"+sWebRootPath+"/Resources/images/loading.gif' /><h4><strong>���������ύ��,���Ժ�....</strong></h4>"  
					,css: { background: 'none', color: '#000',border:'none' }   
					,overlayCSS: {backgroundColor: '#C5E1F0',opacity:'0.4'}  
				});     

			}
		}
		else
		{
			initConfig.onError(firstErrorMessage, $("#" + thefirstid).get(0), errorlist);
			if (thefirstid && initConfig.errorFocus) {$("#" + thefirstid).focus();}
		}
		initConfig.status="init";
		return !initConfig.debug && isValid;
	},

	//ajaxУ��
	ajaxValid : function(returnObj)
	{
		var id = returnObj.id;
	    var srcjo = $("#"+id);
		var elem = srcjo.get(0);
		var initConfig = returnObj.initConfig;
		var settings = elem.settings;
		var setting = settings[returnObj.ajax];
		var ls_url = setting.url;
		//��ȡҪ���ݵĲ���
		var validatorGroup = elem.validatorGroup;
		var initConfig = $('body').data(validatorGroup);
		var parm = $(initConfig.ajaxObjects).serialize();
		//��Ӵ����Ŀؼ���������������ݵĲ���
		parm = "clientid=" + id + "&" +(setting.randNumberName ? setting.randNumberName+"="+((new Date().getTime())+Math.round(Math.random() * 10000)) : "") + (parm.length > 0 ? "&" + parm : "");
		ls_url = ls_url + (ls_url.indexOf("?") > -1 ? ("&" + parm) : ("?" + parm));
		//����ajax����
		$.ajax(
		{	
			type : setting.type, 
			url : ls_url, 
			cache : setting.cache,
			data : setting.data, 
			async : setting.async, 
			timeout : setting.timeout, 
			dataType : setting.dataType, 
			success : function(data, textStatus, jqXHR){
				var lb_ret,ls_status,ls_msg;
				$.formValidator.dealAjaxRequestCount(validatorGroup,-1);
				//����ҵ���ж�������ʾ��Ϣ
				lb_ret = setting.success(data, textStatus, jqXHR);
				setting.isValid = lb_ret;
				if(lb_ret){
					ls_status = "onCorrect";
					ls_msg = settings[0].onCorrect;
				}else{
					ls_status = "onError";
					ls_msg = setting.onError;
				}
				$.formValidator.setTipState(elem,ls_status,ls_msg);
				//�ύ��ʱ�򴥷���ajaxУ�飬��ajaxУ����ɣ�����������У��
				if(returnObj.initConfig.status=="sumbitingWithAjax" && returnObj.initConfig.ajaxCountSubmit == 0)
				{
					if (initConfig.formID != "") {
						$('#' + initConfig.formID).trigger('submit');
					}else if (initConfig.formID != ""){
						$('#' + initConfig.submitButtonID).trigger('click');
					}
					$('#' + initConfig.formID).submit()
				}
			},
			complete : function(jqXHR, textStatus){
				if(setting.buttons && setting.buttons.length > 0){setting.buttons.attr({"disabled":false});}
				setting.complete(jqXHR, textStatus);
			}, 
			beforeSend : function(jqXHR, configs){
				//���ؼ��������У�飬���ж��ϴ�
				if (this.lastXMLHttpRequest) {this.lastXMLHttpRequest.abort();}
				this.lastXMLHttpRequest = jqXHR;
				//�ٷ�����û�з�������֮ǰ���Ȼص��ύ��ť
				if(setting.buttons && setting.buttons.length > 0){setting.buttons.attr({"disabled":true});}
				var isValid = setting.beforeSend(jqXHR,configs);
				if(isValid)
				{
					setting.isValid = false;		//���ǰ��ajax����ɹ��ˣ��ٴ�����֮ǰ�ȵ���������
					$.formValidator.setTipState(elem,"onLoad",settings[returnObj.ajax].onWait);
				}
				setting.lastValid = "-1";
				if(isValid){$.formValidator.dealAjaxRequestCount(validatorGroup,1);}
				return isValid;
			}, 
			error : function(jqXHR, textStatus, errorThrown){
				$.formValidator.dealAjaxRequestCount(validatorGroup,-1);
			    $.formValidator.setTipState(elem,"onError",setting.onError);
			    setting.isValid = false;
				setting.error(jqXHR, textStatus, errorThrown);
			},
			processData : setting.processData 
		});
	},
	
	//����ajax���������
	dealAjaxRequestCount : function(validatorGroup,val)
	{
		var initConfig = $('body').data(validatorGroup);
		initConfig.ajaxCountValid = initConfig.ajaxCountValid + val;
		if (initConfig.status == "sumbitingWithAjax") {
			initConfig.ajaxCountSubmit = initConfig.ajaxCountSubmit + val;
		}
	},

	//��������ʽ����У�飨Ŀǰֻ���input��textarea��
	regexValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcTag = $("#"+id).get(0).tagName;
		var elem = $("#"+id).get(0);
		var isValid;
		//���������������ʽ���ͽ��б��ʽУ��
		if(elem.settings[0].empty && elem.value==""){
			setting.isValid = true;
		}
		else 
		{
			var regexArray = setting.regExp;
			setting.isValid = false;
			if((typeof regexArray)=="string") regexArray = [regexArray];
			$.each(regexArray, function() {
			    var r = this;
			    if(setting.dataType=="enum"){r = eval("regexEnum."+r);}			
			    if(r==undefined || r=="") 
			    {
			        return false;
			    }
			    isValid = (new RegExp(r, setting.param)).test($(elem).val());
			    
			    if(setting.compareType=="||" && isValid)
			    {
			        setting.isValid = true;
			        return false;
			    }
			    if(setting.compareType=="&&" && !isValid) 
			    {
			        return false;
			    }
            });
            if(!setting.isValid) setting.isValid = isValid;
		}
	},
	
	//����У�顣����true/false��ʾУ���Ƿ�ɹ�;�����ַ�����ʾ������Ϣ��У��ʧ��;���û�з���ֵ��ʾ��������У��ɹ�
	functionValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
	    var srcjo = $("#"+id);
		var lb_ret = setting.fun(srcjo.val(),srcjo.get(0));
		if(lb_ret != undefined) 
		{
			if((typeof lb_ret) === "string"){
				setting.isValid = false;
				returnObj.errormsg = lb_ret;
			}else{
				setting.isValid = lb_ret;
			}
		}
	},
	
	//��input��select���Ϳؼ�����У��
	inputValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcjo = $("#"+id);
		var elem = srcjo.get(0);
		var val = srcjo.val();
		var sType = elem.type;
		var len = $.formValidator.getLength(id);
		var empty = setting.empty,emptyError = false;
		switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
				if (setting.type == "size") {
					empty = setting.empty;
					if(!empty.leftEmpty){
						emptyError = (val.replace(/^[ \s]+/, '').length != val.length);
					}
					if(!emptyError && !empty.rightEmpty){
						emptyError = (val.replace(/[ \s]+$/, '').length != val.length);
					}
					if(emptyError && empty.emptyError){returnObj.errormsg= empty.emptyError;}
				}
			case "checkbox":
			case "select-one":
			case "select-multiple":
			case "radio":
				var lb_go_on = false;
				if(sType=="select-one" || sType=="select-multiple"){setting.type = "size";}
				var type = setting.type;
				if (type == "size") {		//���������ַ����ȣ�������У��
					if(!emptyError){lb_go_on = true;}
					if(lb_go_on){val = len;}
				}
				else if (type =="date" || type =="datetime")
				{
					var isok = false;
					if(type=="date"){lb_go_on = isDate(val);}
					if(type=="datetime"){lb_go_on = isDate(val);}
					if(lb_go_on){val = new Date(val);setting.min=new Date(setting.min);setting.max=new Date(setting.max);};
				}else{
					stype = (typeof setting.min);
					if(stype =="number")
					{
						val = (new Number(val)).valueOf();
						if(!isNaN(val)){lb_go_on = true;}
					}
					if(stype =="string"){lb_go_on = true;}
				}
				setting.isValid = false;
				if(lb_go_on)
				{
					if(val < setting.min || val > setting.max){
						if(val < setting.min && setting.onErrorMin){
							returnObj.errormsg= setting.onErrorMin;
						}
						if(val > setting.min && setting.onErrorMax){
							returnObj.errormsg= setting.onErrorMax;
						}
					}
					else{
						setting.isValid = true;
					}
				}
				break;
		}
	},
	
	//�������ؼ����бȽ�У��
	compareValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcjo = $("#"+id);
	    var desjo = $("#"+setting.desID );
		var ls_dataType = setting.dataType;
		
		curvalue = srcjo.val();
		ls_data = desjo.val();
		if(ls_dataType=="number")
        {
            if(!isNaN(curvalue) && !isNaN(ls_data)){
				curvalue = parseFloat(curvalue);
                ls_data = parseFloat(ls_data);
			}
			else{
			    return;
			}
        }
		if(ls_dataType=="date" || ls_dataType=="datetime")
		{
			var isok = false;
			if(ls_dataType=="date"){isok = (isDate(curvalue) && isDate(ls_data));}
			if(ls_dataType=="datetime"){isok = (isDateTime(curvalue) && isDateTime(ls_data));}
			if(isok){
				curvalue = new Date(curvalue);
				ls_data = new Date(ls_data);
			}
			else{
				return;
			}
		}
		
	    switch(setting.operateor)
	    {
	        case "=":
	            setting.isValid = (curvalue == ls_data);
	            break;
	        case "!=":
	            setting.isValid = (curvalue != ls_data);
	            break;
	        case ">":
	            setting.isValid = (curvalue > ls_data);
	            break;
	        case ">=":
	            setting.isValid = (curvalue >= ls_data);
	            break;
	        case "<": 
	            setting.isValid = (curvalue < ls_data);
	            break;
	        case "<=":
	            setting.isValid = (curvalue <= ls_data);
	            break;
			default :
				setting.isValid = false;
				break; 
	    }
	},
	
	//��λƯ����
	localTooltip : function(e)
	{
		e = e || window.event;
		var mouseX = e.pageX || (e.clientX ? e.clientX + document.body.scrollLeft : 0);
		var mouseY = e.pageY || (e.clientY ? e.clientY + document.body.scrollTop : 0);
		$("#fvtt").css({"top":(mouseY+2)+"px","left":(mouseX-40)+"px"});
	},
	
	reloadAutoTip : function(validatorGroup)
	{
		if(validatorGroup == undefined) validatorGroup = "1";
		var initConfig = $('body').data(validatorGroup);
		$.each(initConfig.validObjects,function()
		{
			if(initConfig.autoTip && !initConfig.tidyMode)
			{
				//��ȡ���ID����Զ�λ�ؼ���ID������
				var setting = this.settings[0];
				var relativeID = "#"+setting.relativeID;
				var offset = $(relativeID ).offset();
				var y = offset.top;
				var x = $(relativeID ).width() + offset.left;
				$("#"+setting.tipID).parent().show().css({left: x+"px", top: y+"px"});			
			}
		});
	}
};

//ÿ��У��ؼ������ʼ����
$.fn.formValidator = function(cs) 
{
	var setting = 
	{
		validatorGroup : "1",
		empty :false,
		autoModify : false,
		onShow :"",
		onFocus: "",
		onCorrect: "",
		onEmpty: "",
		defaultValue : null,
		bind : true,
		ajax : false,
		validateType : "InitValidator",
		tipCss : 
		{
			"left" : "10px",
			"top" : "1px",
			"height" : "20px",
			"width":"250px"
		},
		triggerEvent:"blur",
		forceValid : false,
		tipID : null,
		relativeID : null,
		index : 0
	};

	//��ȡ��У�����ȫ��������Ϣ
	cs = cs || {};
	if(cs.validatorGroup == undefined){cs.validatorGroup = "1";}
	
	var initConfig = $('body').data(cs.validatorGroup);
	
	//У�������ţ����ܼ�¼��
	initConfig.validCount += 1;
	
	//���Ϊ����ģʽ��tipCssҪ�������ó�ʼֵ
	if(initConfig.tidyMode){setting.tipCss = {"left" : "2px","width":"22px","height":"22px","display":"none"};}
	
	//������Ϣ��ʾģʽ���Զ��޸�����
	if(initConfig.alertMessage){setting.autoModify=true;}
	
	//�Ⱥϲ���������(��ȿ���)
	$.extend(true,setting, cs);

	return this.each(function(e)
	{
		//��¼�ÿؼ���У��˳��ź�У�����
		this.validatorIndex = initConfig.validCount - 1;
		this.validatorGroup = cs.validatorGroup;
		var jqobj = $(this);
		//�Զ��γ�TIP
		var setting_temp = {};
		$.extend(true,setting_temp, setting);
		var tip = setting_temp.tipID ? setting_temp.tipID : this.id+"Tip";
		if(initConfig.autoTip)
		{
			if(!initConfig.tidyMode)
			{				
				//��ȡ���ID����Զ�λ�ؼ���ID������
				if($("body [id="+tip+"]").length==0)
				{		
					var relativeID = setting_temp.relativeID ? setting_temp.relativeID : this.id;
					var offset = $("#"+relativeID ).position();
					var y = offset.top;
					var x = $("#"+relativeID ).width() + offset.left;
					var formValidateTip = $("<div class='formValidateTip'></div>");
					if(initConfig.inIframe){formValidateTip.hide();}
					formValidateTip.appendTo($("body")).css({left: x+"px", top: y+"px"}).prepend($('<div id="'+tip+'"></div>').css(setting_temp.tipCss));
					setting.relativeID = relativeID ;
				}
			}
			else
			{
				jqobj.showTooltips();
			}
		}
		//ÿ���ؼ���Ҫ�������������Ϣ��Ϊ��ȡ�����㣬����һ�ݿؼ��������õ��ؼ���
		setting.tipID = tip;
		$.formValidator.appendValid(this.id,setting);

		//����ؼ�ID
		if($.inArray(jqobj,initConfig.validObjects) == -1)
		{
			if (setting_temp.ajax) {
				var ajax = initConfig.ajaxObjects;
				initConfig.ajaxObjects = ajax + (ajax != "" ? ",#" : "#") + this.id;
			}
			initConfig.validObjects.push(this);
		}

		//��ʼ����ʾ��Ϣ
		if(!initConfig.alertMessage){
			$.formValidator.setTipState(this,"onShow",setting.onShow);
		}

		var srcTag = this.tagName.toLowerCase();
		var stype = this.type;
		var defaultval = setting.defaultValue;
		//����Ĭ��ֵ
		if(defaultval){
			jqobj.val(defaultval);
		}

		if(srcTag == "input" || srcTag=="textarea")
		{
			//ע���ý�����¼����ı���ʾ��������ֺ���ʽ������ԭֵ
			jqobj.focus(function()
			{	
				if(!initConfig.alertMessage){
					//����ԭ����״̬
					var tipjq = $("#"+tip);
					this.lastshowclass = tipjq.attr("class");
					this.lastshowmsg = tipjq.html();
					$.formValidator.setTipState(this,"onFocus",setting.onFocus);
				}
				if (stype == "password" || stype == "text" || stype == "textarea" || stype == "file") {
					this.validValueOld = jqobj.val();
				}
			});
			//ע��ʧȥ������¼�������У�飬�ı���ʾ��������ֺ���ʽ���������ʾ����
			jqobj.bind(setting.triggerEvent, function(){
				var settings = this.settings;
				var returnObj = $.formValidator.oneIsValid(this.id);
				if(returnObj==null){return;}
				if(returnObj.ajax >= 0) 
				{
					$.formValidator.showAjaxMessage(returnObj);
				}
				else
				{
					var showmsg = $.formValidator.showMessage(returnObj);
					if(!returnObj.isValid)
					{
						//�Զ���������
						var auto = setting.autoModify && (this.type=="text" || this.type=="textarea" || this.type=="file");
						if(auto)
						{
							$(this).val(this.validValueOld);
							if(!initConfig.alertMessage){$.formValidator.setTipState(this,"onShow",setting.onShow);}
						}
						else
						{
							if(initConfig.forceValid || setting.forceValid){
								alert(showmsg);this.focus();
							}
						}
					}
				}
			});
		} 
		else if (srcTag == "select")
		{
			jqobj.bind({
				//��ý���
				focus: function(){	
					if (!initConfig.alertMessage) {
						$.formValidator.setTipState(this, "onFocus", setting.onFocus);
					};
				},
				//ʧȥ����
				blur: function(){$(this).trigger("change");},
				//ѡ����Ŀ�󴥷�
				change: function(){
					var returnObj = $.formValidator.oneIsValid(this.id);	
					if(returnObj==null){return;}
					if ( returnObj.ajax >= 0){
						$.formValidator.showAjaxMessage(returnObj);
					}else{
						$.formValidator.showMessage(returnObj); 
					}
				}
			});
		}
	});
}; 

$.fn.inputValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		min : 0,
		max : 99999999999999,
		type : "size",
		onError:"�������",
		validateType:"InputValidator",
		empty:{leftEmpty:true,rightEmpty:true,leftEmptyError:null,rightEmptyError:null}
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.compareValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		desID : "",
		operateor :"=",
		onError:"�������",
		validateType:"CompareValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.regexValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : false,
		regExp : "",
		param : "i",
		dataType : "string",
		compareType : "||",
		onError:"����ĸ�ʽ����ȷ",
		validateType:"RegexValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.functionValidator = function(controlOptions)
{
	var settings = 
	{
		isValid : true,
		fun : function(){this.isValid = true;},
		validateType:"FunctionValidator",
		onError:"�������"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.ajaxValidator = function(controlOptions)
{
	var settings = 
	{
		type : "GET",
		url : "",
		dataType : "html",
		timeout : 100000,
		data : null,
		async : true,
		cache : false,
		beforeSend : function(){return true;},
		success : function(){return true;},
		complete : function(){},
		processData : true,
		error : function(){},
		isValid : false,
		lastValid : "",
		buttons : null,
		oneceValid : false,
		randNumberName : "rand",
		onError:"������У��û��ͨ��",
		onWait:"���ڵȴ���������������",
		ajaxExistsError:"ǰ���У����δ��ɣ����Ժ�...",
		validateType:"AjaxValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function()
	{
		var initConfig = $('body').data(this.validatorGroup);
		var ajax = initConfig.ajaxObjects;
		if((ajax+",").indexOf("#"+this.id+",") == -1)
		{
			initConfig.ajaxObjects = ajax + (ajax != "" ? ",#" : "#") + this.id;
		}
		this.validatorAjaxIndex = $.formValidator.appendValid(this.id,settings);
	});
};

//ָ���ؼ���ʾͨ����ͨ����ʽ
$.fn.defaultPassed = function(onShow)
{
	return this.each(function()
	{
		var settings = this.settings;
		settings[0].defaultPassed = true;
		for ( var i = 1 ; i < settings.length ; i ++ )
		{   
			settings[i].isValid = true;
			if(!$('body').data(settings[0].validatorGroup).alertMessage){
				var ls_style = onShow ? "onShow" : "onCorrect";
		        //2014-09-25 �����޸�    ��ֹ�ı�Ϊ��Ĭ�ϵ�oncorrect״̬
				//		$.formValidator.setTipState(this,ls_style,settings[0].onCorrect);
			}
		}
	});
};

//ָ���ؼ����μ�У��
$.fn.unFormValidator = function(unbind)
{
	return this.each(function()
	{
		this.settings[0].bind = !unbind;
		if(unbind){
			$("#"+this.settings[0].tipID).hide();
		}else{
			$("#"+this.settings[0].tipID).show();
		}
	});
};

//��ʾƯ����ʾ��
$.fn.showTooltips = function()
{
	if($("body [id=fvtt]").length==0){
		fvtt = $("<div id='fvtt' style='position:absolute;z-index:56002'></div>");
		$("body").append(fvtt);
		fvtt.before("<iframe src='about:blank' class='fv_iframe' scrolling='no' frameborder='0'></iframe>");
		
	}
	return this.each(function()
	{
		jqobj = $(this);
		s = $("<span class='top' id=fv_content style='display:block'></span>");
		b = $("<b class='bottom' style='display:block' />");
		this.tooltip = $("<span class='fv_tooltip' style='display:block'></span>").append(s).append(b).css({"filter":"alpha(opacity:95)","KHTMLOpacity":"0.95","MozOpacity":"0.95","opacity":"0.95"});
		//ע���¼�
		jqobj.bind({
			mouseover : function(e){
				$("#fvtt").append(this.tooltip);
				$("#fv_content").html(this.Tooltip);
				$.formValidator.localTooltip(e);
			},
			mouseout : function(){
				$("#fvtt").empty();
			},
			mousemove: function(e){
				$("#fv_content").html(this.Tooltip);
				$.formValidator.localTooltip(e);
			}
		});
	});
};
})(jQuery);
