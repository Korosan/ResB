var bodyParser = require('body-parser');
var socketIo = require('socket.io');
var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));


var uploadfile = require('./js_modules/uploadfile');
var RoomState = require('./js_modules/RoomState');
var ioimport = require('./js_modules/socketIo');
var login = require('./js_modules/login');


var text = require('./text/text');
var socketarr = {}; //记录socket信息
var names = []; //在线用户名称
var RoomsInfo = {}; //房间信息
var UsersInfo = {}; //在线用户信息

uploadfile(app, UsersInfo);
login(app, UsersInfo);
RoomState(app);
text(app);      //测试

var server = app.listen(3000, function(req, res) {

        var host = server.address().address
        var port = server.address().port

        console.log("应用实例，访问地址为 http://%s:%s", host, port)

    })
// var server2=app.listen(5000,'localhost');
var io = socketIo.listen(server);
ioimport(io);

app.get("/client", function(req, res) {
    var flag = false;
    for(var i=0;i<names.length;i++){
        if(names[i]==req.query.userName){
            res.redirect("/login");
        }
    }
    if (req.query.userName) {
        if (UsersInfo[req.query.userName]) {
            flag = true;
        }
    }
    if (flag) {
        res.sendFile(__dirname + "/" + "chat-client.html");
    } else {
        res.redirect("/login");
    }
})
    
app.get("/server", function(req, res) {
    var flag = false;
    for(var i=0;i<names.length;i++){
        if(names[i]==req.query.userName){
            res.redirect("/login");
        }
    }
    if (req.query.userName) {
        if (UsersInfo[req.query.userName]) {
            flag = true;
        }
    }
    if (flag) {
        res.sendFile(__dirname + "/" + "chat-server.html");
    } else {
        res.redirect("/login");
    }
})
