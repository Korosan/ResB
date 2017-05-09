var fs=require("fs");
var path=require("path");
var data={
	a:123,
	b:322,
}
/*var str=JSON.stringify(data);*/
fs.writeFile('txts.xml', data, function(err){
	if(err){
		throw err;
	}
});
/*fs.appendFile('txts.json', str, function(err){
	if(err){
		throw err;
	}
});*/
// var imgsrc="file:///C:\Users\Crow\Documents\Tencent Files\357873659\Image\Group\Image17\0N{EM5P5_3EPEFSMIU3DV[B.gif";
var filename = parseUrlForFileName(imgsrc);
function parseUrlForFileName (address) {

var filename = path.join('http://demos.q-themes.net/designr/v1.3',address);

return filename;
}
console.log(filename);