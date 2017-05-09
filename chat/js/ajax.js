/*Ajax({
	type:"POST",
	url:"/ddd2",
	data:"",
	success:function(msg){
		console.log(msg);
	},
	error:function(msg){
		console.log(msg);
	}
});*/
function Ajax(ajaxJson){	//读取非XML
	var xmlhttp;
	if (window.XMLHttpRequest){
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}else{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	} 
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			ajaxJson.success(xmlhttp.responseText);		//responseXML
		}
		if (xmlhttp.readyState==4 && xmlhttp.status==404){
			ajaxJson.error("404");
		}
	}
	if(ajaxJson.async){
		xmlhttp.open(ajaxJson.type,ajaxJson.url,ajaxJson.async);
	}else{
		xmlhttp.open(ajaxJson.type,ajaxJson.url,true);
	}
	if(ajaxJson.type="POST"){
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	}
	if(ajaxJson.data){
		xmlhttp.send(ajaxJson.data);
	}else{
		xmlhttp.send();
	}
}



Array.prototype.removeStaff=function(staff){
    if(this.length==0){
        return;
    }
    for(var i=0;i<this.length;i++){
        if(this[i]==staff){
            this.splice(i, 1);
            break;
        }
    }
}

function otherNames(b,a){
    var res=[];
    for(var i=0;i<a.length;i++){
        if(a[i]!=b){
            res.push(a[i]);
        }
    }
    return res;
}
function checkRepeat(o,a){
  for(var i=0;i<a.length;i++){
    if(a[i]==o){
      return true;
    }
  }
  return false;
}

function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    console.log(r);
    if(r!=null)return  unescape(r[2]); return null;
}


function insertEmoji(oImg){
    // 获取编辑框对象
    var edit = document.getElementById('edit')
    // 编辑框设置焦点
    edit.focus()
    // 获取选定对象
    var selection = getSelection()
    // 判断是否有最后光标对象存在
    if (lastEditRange) {
        // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
        selection.removeAllRanges()
        selection.addRange(lastEditRange)
    }
    var Img=document.createElement("img");
    Img.src="upload/spacer.gif";
    var str=oImg.className;

    Img.className=str.replace(/P28/g,"P20");
    selection.getRangeAt(0).insertNode(Img);
    var range=document.createRange();
    range.selectNode(Img);
    range.setStartAfter(Img);
    // 使光标开始和光标结束重叠
    range.collapse(true)
    // 清除选定对象的所有光标对象
    selection.removeAllRanges()
    // 插入新的光标对象
    selection.addRange(range)
    lastEditRange = selection.getRangeAt(0);
}