module.exports = function(app,UsersInfo) {
    var formidable=require("formidable");
    var fs=require("fs");
	var path=require("path");
    var pathb;
	app.post("/upload",function (req,res){
		var form = new formidable.IncomingForm();
        var uploadDir = path.normalize(__dirname+'/upload/temp/');
        form.uploadDir = uploadDir;
        var pushdata={};
        form.parse(req, function(err, fields, files) {
            console.log(fields);
            if(!UsersInfo[fields.username]){
                return false;
            }
            for(item in files){
                (function(){
                    var oldname = files[item].path;
                    var newname = files[item].name === 'blob' ? oldname+'.xml' : oldname+"."+files[item].name.split('.')[1];
                    fs.rename(oldname,newname,function(err){
                        if(err) console.log(err);
                        console.log('添加成功');
                    })
                    pushdata[newname]={};
                    pushdata[newname].name=newname;
                    pushdata[newname].path='upload/temp/'+newname.split("\\")[newname.split("\\").length-1];
                    pathb=pushdata[newname].path.substr(1);
                })(item);
            }
            res.send(pushdata);
        });
	})

    app.get("/db",function (req,res){
        // var opath=req.body.opath;
        console.log("download");
        res.download(pathb,"users/fuck.jpg");
        // res.send("bbb");
    })
    var user = {
        "user4" : {
            "name" : "mohit",
            "password" : "password4",
            "profession" : "teacher",
            "id": 4
           },
           "user5" : {
            "name" : "mohit",
            "password" : "password4",
            "profession" : "teacher",
            "id": 5
           }
    }

    app.get('/addUser', function (req, res) {
        // 读取已存在的数据
        fs.readFile( __dirname + "/" + "users2.json", 'utf8', function (err, data) {
            data = JSON.parse( data );
            data["user5"]=user["user5"];
            console.log( data );

            fs.writeFile("users2.json", JSON.stringify(data),  function (err){
                if(err){
                    throw err;
                }
            });
            res.end( JSON.stringify(data));
        });
    })

}