var App={
    Init:function(){
        App.State(title,url);
        App.StateListen();
    },
    State:function(title,url){//无刷新改变URL
        if(window.history.pushState){
            window.history.pushState({title:title,url:url},title,url);
        }else{
            location.href=url;
        }
        document.title=title;
    },
    StateListen:function(){//监听地址
        var url=location.href.toString().split("/");
 
        window.addEventListener('popstate', function(e){
          if (history.state){
            var url=e.state.url;
            //根据url值进行相应操作
          }
        },false);
    }
};