/**
 * Created by Allen on 2015/11/4.
 */

/*ԭ��js����class��ȡԪ��*/
function  getDocumentByClass (param) {
    var tags = tags || document.getElementsByTagName("*");
    var list = [];
    for( var k in tags)
    {
        var tag = tags[k];
        if(tag.className == param) {
            document.write(tag.innerHTML);
            list.push(tag);
        }
    }
    return list;
}

/*����#####.##��ʽ������,��֤�����*/
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, ""); //���"����"��"."������ַ�
    obj.value = obj.value.replace(/^\./g, ""); //��֤��һ���ַ������ֶ�����
    obj.value = obj.value.replace(/\.{2,}/g, "."); //ֻ������һ��. ��������
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace(
        "$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //ֻ����������С��

}

/*����ֻ���*/
function checkMobile(val) {
    var regPartton = /1[3-8]+\d{9}/;
    if (regPartton.test(val))
        return true;
    else
        return false;
}

/*####.## ת���� #��###.##�Ľ���ʽ*/
function cuter(str){
    var len = str.length,str2 = '', max = Math.floor(len / 3);
    for(var i = 0 ; i < max ; i++){
        var s = str.slice(len - 3, len);
        str = str.substr(0, len - 3);
        str2 = (',' + s) + str2;
        len = str.length;
    }
    len = str2.length
    str += str2.substr(0, len - 4)+str2.substr(len - 3,len);
    if(str.substr(0 , 1) == ',') str = str.substr(1 , str.length-1);
    return str
}

/*ת���� ��λС��*/
function numToTwo(num){
    var str = num + "";
    var index = str.indexOf(".");
    var len = str.length;
    switch(len-index){
        case len+1:str+=".00";break;
        case 1: str+="0";break;
        case 2: break;
        default:str = str.substr(0,index+3);
    }
    return str;
}
function numToTwo2(num){
    return Math.round(num*100)/100+"";
}

/*����¼�*/
$(id).on("postpaste", function() {
    // do something

}).pasteEvents();
$.fn.pasteEvents = function( delay ) {
    if (delay == undefined) delay = 1;//�滻ʱ��
    return $(this).each(function() {
        var $el = $(this);
        $el.on("paste", function() {
            $el.trigger("prepaste");
            setTimeout(function() { $el.trigger("postpaste"); }, delay);
        });
    });
};

/*���ڸ�ʽ�� yyyy/mm/dd ��ʽ*/
function getFormatedDate(today){
    var sYear = today.getFullYear();
    var iMonth = today.getMonth() + 1;
    var sMonth = (iMonth<10?"0"+iMonth:iMonth+"");
    var iDate = today.getDate();
    var sDate = (iDate<10?"0"+iDate:iDate+"");
    return sYear + "/" + sMonth + "/" + sDate;
}

/*���ڽ�ȡ�ַ�����һ�麯��*/

/*��str1��ȡ��str2ǰ���ַ���*/
function substringAfter( str1,  str2) {
    if(typeof(str1)=="undefined") return "";
    var index = str1.indexOf(str2);
    if(index==-1) return "";
    return str1.substring(index+str2.length);
}
/*��str1��ȡ��str2����ַ���*/
function substringBefore( str1,  str2) {
    if(typeof(str1)=="undefined") return "";
    var index = str1.indexOf(str2);
    if(index==-1) return "";
    return str1.substring(0,index);
}
/*str���ֽڳ���*/
function charLength(str) {
    if( str == null || str ==  "" ) return 0;
    var totalCount = 0;
    for (var i = 0; i< str.length; i++) {
        if (str.charCodeAt(i) > 127)
            totalCount += 2;
        else
            totalCount++ ;
    }
    return totalCount;
}
/*�Ƿ������ Ӣ�ġ����֡�����*/
function containsNOASC( s) {
    if( s == null || s ==  "" ) return false;
    for (var i = 0; i< s.length; i++) {
        if (s.charCodeAt(i) > 127)
            return true;
    }
    return false;
}