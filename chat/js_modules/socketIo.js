module.exports=function(io){
	io.on('connection', function(socket) {
        console.log('\033[96msomeone is connect\033[39m \n');
        socket.on('join', function(User) {
            if (!UsersInfo[User]) {
                console.log("有人尝试非法登录");
                return;
            } else {
                console.log(User + "连接上XXXX聊天室");
                socket.UserName = User;
                names.push(User);
                socketarr[User] = socket;
                UsersInfo[User].hasRoom = ['公聊室'];
                // UsersInfo[User].UserName=User;
                socket.emit("UserInfo.Room", UsersInfo[User].hasRoom);
                socket.emit("checkSuccess", User);
                io.sockets.emit("updateCp", names);
            }
        });
        socket.on('joingroup', function(data) {
            if (!UsersInfo[socket.UserName]) {
                console.log("有人尝试非法加入");
                return;
            }
            if (!data.room) {
                return false;
            }
            if (checkRepeat(data.room, UsersInfo[socket.UserName].hasRoom)) {
                console.log(socket.UserName + "进入" + data.room);
                if (!RoomsInfo[data.room]) {
                    RoomsInfo[data.room] = {};
                }
                if (!RoomsInfo[data.room].names) {
                    RoomsInfo[data.room].names = [];
                }
                if (!RoomsInfo.hasRoom) {
                    RoomsInfo.hasRoom = [];
                }
                if (!checkRepeat(data.room, RoomsInfo.hasRoom)) {
                    RoomsInfo.hasRoom.push(data.room);
                }
                RoomsInfo[data.room].names.push(socket.UserName);
                UsersInfo[socket.UserName].InRoom = data.room;
                socket.join(data.room);
                socket.emit("updateRoomInfo", "addRoomState", RoomsInfo[data.room].names, socket.UserName);
                socket.broadcast.to(data.room).emit("updateRoomInfo", "addPeople", RoomsInfo[data.room].names, socket.UserName);
                //不包括自己
                // socket.broadcast.to('group1').emit('event_name', data);
                // //包括自己
                // io.sockets.in('group1').emit('event_name', data);
                io.sockets.in(data.room).emit("announcement", '系统提示', socket.UserName + "加入了" + data.room);
            }
        })
        socket.on('leavegroup', function(data) {
            if (!UsersInfo[socket.UserName]) {
                console.log("有人尝试非法加入");
                return;
            }
            if (!data.room) {
                return false;
            }
            if (checkRepeat(socket.UserName, RoomsInfo[data.room].names)) {
                console.log(socket.UserName + "退出" + data.room);
                RoomsInfo[data.room].names.removeStaff(socket.UserName);
                socket.broadcast.to(data.room).emit("updateRoomInfo", "deletePeople", RoomsInfo[data.room].names, socket.UserName);
                socket.broadcast.to(data.room).emit("announcement", '系统提示', socket.UserName + "离开了" + data.room);
                console.log(RoomsInfo);
                /*if (RoomsInfo[data.room].names.length == 0) {
                    delete RoomsInfo[data.room];
                    RoomsInfo.hasRoom.removeStaff(data.room);
                }*/
                socket.leave(data.room);
                delete UsersInfo[socket.UserName].InRoom;
            }
        })

        socket.on('send.message', function(msg) {
            if (!UsersInfo[socket.UserName]) {
                console.log("有人尝试非法发送信息");
                return;
            }
            if(!UsersInfo[socket.UserName].InRoom){
                return;
            }
            socket.emit("send.message", socket.UserName, msg);
            //发给除自己外的人
            socket.broadcast.to(UsersInfo[socket.UserName].InRoom).emit("send.message", socket.UserName, msg);
        });
        socket.on('send.privateMessage', function(to, msg) {
            if (!UsersInfo[socket.UserName]) {
                console.log("有人尝试非法发送信息");
                return;
            }
            if (!socketarr[to]) {
                console.log("该用户不在线");
                return;
            }
            var getId = socketarr[to].id;
            socket.emit("send.message", socket.UserName, msg);
            io.sockets.sockets[getId].emit('send.privateMessage', socket.UserName + "对我说", msg);
        });
        socket.on('disconnect', function() {
            if (!UsersInfo[socket.UserName]) {
                return;
            }
            if (socket.UserName) {
                console.log('\033[96m' + socket.UserName + ' is exit\033[39m \n');
                names.removeStaff(socket.UserName);
                if (UsersInfo[socket.UserName].InRoom) {
                    console.log(socket.UserName + "退出" + UsersInfo[socket.UserName].InRoom);
                    RoomsInfo[UsersInfo[socket.UserName].InRoom].names.removeStaff(socket.UserName);
                    socket.broadcast.to(UsersInfo[socket.UserName].InRoom).emit("announcement", '系统提示', socket.UserName + "离开了" + UsersInfo[socket.UserName].InRoom);
                    socket.broadcast.to(UsersInfo[socket.UserName].InRoom).emit("updateRoomInfo", "deletePeople", RoomsInfo[UsersInfo[socket.UserName].InRoom].names, socket.UserName);
                    if (RoomsInfo[UsersInfo[socket.UserName].InRoom].names.length == 0) {
                        delete RoomsInfo[UsersInfo[socket.UserName].InRoom];
                        RoomsInfo.hasRoom.removeStaff(UsersInfo[socket.UserName].InRoom);
                    }
                }
                console.log(RoomsInfo);
                io.sockets.emit("updateCp", names);
                console.log('系统提示', socket.UserName + "离开了XXXX聊天室");
                delete socketarr[socket.UserName];
                delete UsersInfo[socket.UserName];
            }
        })

        socket.on('StaffaddRoom', function(arr, addRoom) {
            //邀请成员进入房间
            if (!UsersInfo[socket.UserName]) {
                console.log("有人尝试非法添加成员");
                return;
            }
            if (arr && addRoom) {
                console.log(typeof arr);
                console.log(addRoom);
                for (var i = 0; i < arr.length; i++) {
                    UsersInfo[arr[i]].hasRoom.push(addRoom);
                    socketarr[arr[i]].emit("UserInfo.updateRooms", addRoom);
                }
            }
        })

    });


    Array.prototype.removeStaff = function(staff) {
        if (this.length == 0) {
            return;
        }
        for (var i = 0; i < this.length; i++) {
            if (this[i] == staff) {
                this.splice(i, 1);
                break;
            }
        }
    }

    var getAllNickname = function(es) {
        var result = [];
        for (var k in es.sockets.sockets) {
            if (es.sockets.sockets.hasOwnProperty(k)) {
                result.push({
                    name: es.sockets.sockets[k].UserName,
                    id: es.sockets.sockets[k].id,
                });
            }
        }
        return result;
    }

    function checkRepeat(o, a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == o) {
                return true;
            }
        }
        return false;
    }

}