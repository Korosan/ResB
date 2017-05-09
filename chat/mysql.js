var mysql = require('mysql');

module.exports=function(){

    var TEST_DATABASE = 'test';  
    /*var TEST_TABLE = 'user';*/  
    //创建连接  
    this.getUserDataDB=function(UserData){
        var client = mysql.createConnection({  
            host: 'localhost',
            user: 'root',
            password: '',
            database:'test',
        });
        client.connect();
        client.query('SELECT * FROM user',function (err, results, fields) {  
            if (err) {  
                throw err;  
            }
            if(results){
                for(var i = 0; i < results.length; i++){
                    UserData[results[i].userName]={};
                    UserData[results[i].userName].id=results[i].id;
                    UserData[results[i].userName].userName=results[i].userName;
                    UserData[results[i].userName].password=results[i].password;
                    UserData[results[i].userName].rank=results[i].rank;
                }
                UserData.len=results.length;
                // console.log(UserData);
            }
            client.end();  
        });
    }

    this.deleteUserDataDB=function(UserData,deleteUser){
        var client = mysql.createConnection({  
            host: 'localhost',
            user: 'root',
            password: '',
            database:'test',
        });
        client.connect();
        var sqlstr='DELETE FROM user WHERE userName='+deleteUser;
        client.query(sqlstr,function (err, result) {  
            if (err) {  
                console.log("DELETE ERROR - ",err.message);
                return err;  
            }else{
                console.log("INSERT ID:",result);
            }
            client.end();  
        });
        delete UserData[deleteUser];
    }
    // client.query("use " + TEST_DATABASE);



    // var client = mysql.createConnection({  
    //         host: 'localhost',
    //         user: 'root',
    //         password: '',
    //         database:'test',
    //     });
    // var sqlstr='INSERT INTO user(userName,password) VALUES ("2223",21),("2224",312)';
    // client.query(sqlstr,function insertDb(err, result) {  
    //     if (err) {  
    //         console.log("INSERT ERROR - ",err.message);
    //         return err;  
    //     }else{
    //         console.log("INSERT ID:",result);
    //     }
    // });
    /*var sqlstr='INSERT INTO user(id,userName,password) VALUES(0,?,?)';
    var sqlvalue=['czx5955','233'];
    client.query(sqlstr,sqlvalue,function insertDb(err, result) {  
        if (err) {  
            console.log("INSERT ERROR - ",err.message);
            return err;  
        }else{
            console.log("INSERT ID:",result);
        }
        client.end();
    });*/
    /*var sqlstr='UPDATE user SET password = ? WHERE userName = ?';;
    var sqlvalue=['266','555'];
    client.query(sqlstr,sqlvalue,function insertDb(err, result) {  
        if (err) {  
            console.log("UPDATE ERROR - ",err.message);
            return err;  
        }else{
            console.log("UPDATE ID:",result);
        }
        client.end();  
    }); */
    /*var sqlstr='DELETE FROM user WHERE id=2';
    client.query(sqlstr,function insertDb(err, result) {  
        if (err) {  
            console.log("DELETE ERROR - ",err.message);
            return err;  
        }else{
            console.log("INSERT ID:",result);
        }
        client.end();  
    }); */
    
}
// var client = mysql.createConnection({  
//             host: 'localhost',
//             user: 'root',
//             password: '',
//             database:'test',
//         });
//     var sqlstr='INSERT INTO user(userName,password) VALUES ("2225",21),("2224",312)';
//     client.query(sqlstr,function insertDb(err, result) {  
//         if (err) {  
//             console.log("INSERT ERROR - ",err.message);
//             return err;  
//         }else{
//             console.log("INSERT ID:",result);
//         }
//     });
// var len=10000000;
// var data1={};
// for(var i=0;i<len;i++){
//     data1[i]={};
//     data1[i].i=i+"abc";
// }
// console.time("计时器");
// var a=4000;
// if(data1[a]){
//     console.log(data1[a].i);
// }
// console.timeEnd('计时器');

// var data2=[];
// for(var i=0;i<len;i++){
//     data2[i]=i;
// }
// console.time("计时器");
// var a=4000;
// for(var i=0;i<data2.length;i++){
//     if(data2[i]==a){
//         console.log(i);
//     }
// }
// console.timeEnd('计时器');