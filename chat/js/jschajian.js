function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
    }
    return url
}
Element.prototype.drag=function(){
	var This=this;
	this.onmousedown=function(e){
		this.time=0;
		console.log(this.time);
		var e=e || window.event;
		var startX=e.clientX-this.offsetLeft;
		var startY=e.clientY-this.offsetTop;
		this.s=setInterval(function(){
			This.time+=0.1;
		}, 100);
		this.onmousemove=function(e){
			var moveX=e.clientX-startX;
			var moveY=e.clientY-startY;
			console.log("X:"+moveX+" Y:"+moveY);
			this.style.left=moveX+"px";
			this.style.top=moveY+"px"; 
				clearInterval(this.s);
			}
			this.onmouseout=function(){
				this.onmousemove=null;
				this.onmouseout=null;
				console.log(this.time);
				clearInterval(this.s);
			}
		}
	}
}
Element.prototype.addClass=function(addClass){
	addClass=addClass.replace(/(^\s+)|(\s+$)/g,"");		//去除前后空格
	addClass=addClass.replace(/\s+/g," ");				//字符间空格数为1
	var addarr=addClass.split(" ");
	addarr=addarr.unique1();
	if(this.className=="" || !this.className){
		this.className=addarr.join(" ");
	}else{
		thisStr=this.className;
		var nthisStr=thisStr.replace(/(^\s+)|(\s+$)/g,"");		//去除前后空格
		nthisStr=thisStr.replace(/\s+/g," ");				//字符间空格数为1
		thisStr=thisStr+" "+addClass;
		this.className=thisStr;
	}
}
Element.prototype.removeClass=function(removeClass){
	removeClass=removeClass.replace(/(^\s+)|(\s+$)/g,"");		//去除前后空格
	removeClass=removeClass.replace(/\s+/g," ");				//字符间空格数为1
	var removearr=removeClass.split(" ");
	removearr=removearr.unique1();
	var arrStr=this.className;
	arrStr=arrStr.replace(/\w+/g, function($0){
		for(var i=0;i<removearr.length;i++){
			if($0==removearr[i]){
				return "";
			}
		}
		return $0;
	});
	arrStr=arrStr.replace(/(^\s+)|(\s+$)/g,"");		//去除前后空格
	this.className=arrStr;
}
Element.prototype.hasClass=function(hasClass){
	var arrStr=this.className;
	arrStr=arrStr.replace(/(^\s+)|(\s+$)/g,"");		//去除前后空格
	arrStr=arrStr.replace(/\s+/g," ");				//字符间空格数为1
	var arr=arrStr.split(" ");
	for(var i=0;i<arr.length;i++){
		if(arr[i]==hasClass){
			return true;
		}
	}
	return false;
}
/*Element.prototype.toggleClass=function(){

}*/
if (!Array.prototype.indexOf){
  	Array.prototype.indexOf = function(elt /*, from*/){
	    var len = this.length >>> 0;
	    var from = Number(arguments[1]) || 0;
	    from = (from < 0)
	         ? Math.ceil(from)
	         : Math.floor(from);
	    if (from < 0)
	      	from += len;
	    for (; from < len; from++){
	      	if (from in this && this[from] === elt)
	        	return from;
	    }
	    return -1;
  	};
}
// var arr=[1,2,3,4,"","",2];
// arr.sort();
// arr.reverse();
// arr.splice(arr.indexOf(""), arr.length-arr.indexOf(""));
// alert(arr);
Array.prototype.unique1=function(){		//去重
	var res=[];
	var json={};
	for(var i=0;i<this.length;i++){
		if(!json[this[i]]){
			res.push(this[i]);
			json[this[i]]=1;
		}
	}
	return res;
}