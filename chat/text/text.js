module.exports=function(app){
	app.get("/text4", function(req, res) {
        res.sendFile(__dirname + "/text/" + "datearrange.html");
    })
    app.get("/text2", function (req, res) {
        console.log(res);
        res.download("upload/20Pemoji.png","222.png");
        console.log(2);
        // res.sendFile(__dirname + "/" + "text2.html");
        
    })

}