module.exports=function(app){
    app.post("/getStaff", function(req, res) {
        if (req.body.userName && req.body.Room) {
            if (UsersInfo[req.body.userName]) {
                var getName = req.body.userName;
                var getRoom = req.body.Room;
                var arr = [];
                for (var k in UsersInfo) {
                    if (k != getName) {
                        if (!checkRepeat(getRoom, UsersInfo[k].hasRoom)) {
                            arr.push(k);
                        }
                    }
                }
                var str = arr.join(",");
                res.send(str);
            }
        }
    })
    app.post("/addRoom", function(req, res) {
        if (req.body.userName && req.body.addRoom) {
            if (UsersInfo[req.body.userName]) {
                var flag;
                var getName = req.body.userName;
                var Room = req.body.addRoom;
                if (!checkRepeat(Room, UsersInfo[getName].hasRoom)) {
                    UsersInfo[getName].hasRoom.push(Room);
                    flag = true;
                } else {
                    flag = false;
                }
                res.send(flag);
            }
        }
    })
    app.post("/deleteRoom", function(req, res) {
        if (req.body.userName && req.body.deleteRoom) {
            if(req.body.deleteRoom=="公聊室"){
                console.log("有人企图删除公聊室");
                return;
            }
            if (UsersInfo[req.body.userName]) {
                var flag;
                var getName = req.body.userName;
                var Room = req.body.deleteRoom;
                if (checkRepeat(Room, UsersInfo[getName].hasRoom)) {
                    UsersInfo[getName].hasRoom.removeStaff(Room);
                    flag = true;
                } else {
                    flag = false;
                }
                res.send(flag);
            }
        }
    })
}