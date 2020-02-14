var $={
    params:function(obj){
             var str="";
             for(key in obj) {
                  str+=key+"="+obj[key]+"&"
             }
             str=str.substring(0,str.length-1);
             return str;
    },
    ajax:function(options){
        //底层是封装XMLHttpRequest
        //在这里要去获取到options.property
        var xhr=new XMLHttpRequest();

        //我们需要对data 的数据进行判断 ，如果data 的值是一个对象
        /**
         *  data:{
                       username:'陈江',
                       sex:"女"
                 },
         * ===> username=陈江&sex=女
         */
        //把这个对象转换成
        if(typeof options.data =="object"){
             options.data=this.params(options.data);
        }
        //如果是get 提交.
        if(options.type.toLocaleLowerCase()=="get"){
            options.url=options.url+"?"+options.data;
            options.data=null;
        }
        xhr.open(options.type,options.url);
        //如果是post 提交
        if(options.type.toLocaleLowerCase()=="post"){
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        }

        if(options.beforeSend){
            var flag=options.beforeSend();
            if(!flag){
                return;
            }
        }

        xhr.send(options.data);
        //接收数据.
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    var responseData=xhr.responseText;
                    //options.success(responseData);
                    //逻辑判断.
                    /* if(options.success){
                     options.success(responseData);
                     }*/
                    options.success && options.success(responseData);
                }else{
                    //请求出错的时候调用
                    options.error && options.error();
                }
                //调用回调函数.
                options.complete && options.complete();
            }
        }
    }
}