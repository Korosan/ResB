var datadb=require('./mysql');
module.exports = function(app,UsersInfo) {
	var UserData={};
	// datadb(UserData);	// 获取数据库内的用户数据
	var data= new datadb();
	data.getUserDataDB(UserData);
	app.get("/login",function (req,res){
	    res.sendFile(__dirname+"/"+"login.html");
	})
	app.post("/check",function (req,res){
	    var uname=req.body.userName;
	    var pwd=req.body.passWord;
	    var data={};
	    data.msg="账号密码错误";
	    if(UserData[uname]){
	    	if(UserData[uname].password==pwd){
	    		if(UsersInfo[uname]){
			    	data.msg="该用户已登录";
			    }else{
			    	UsersInfo[uname]={};
			        UsersInfo[uname].arrow=true;
			        UsersInfo[uname].UserName=uname;
			        if(UserData[uname].rank==1){
			        	data.url="/client?userName="+uname;
			        }else if(UserData[uname].rank==0){
			        	data.url="/server?userName="+uname;
			        }
			        data.msg="通过";
			    }
	    	}
	    }
	    data=JSON.stringify(data);
		res.send(data);
	})
	app.post("/update",function (req,res){

	})
}



