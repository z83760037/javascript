(function (win) {
      var hk = {
           init:function(){
                this.initEvent();
                this.initTeacherTable();
           },
           initEvent:function(){
               var params={

               };
               //初始化文件上传.
               $('#lifePhotoId').fileupload({
                   dataType: 'json',
                   //上传成功之后就会调用这里.
                   done: function (e, data) {
                       //根据返回的数据的类型做一些处理
                       // code:10003, message:""
                        var url=data.result.url;
                        params.lifePhoto=url;
                        //做一个预览的效果.
                        $(".image_area_file div").append("<img src='"+url+"' width='100' height='100'>");

                        $(".image_area_file div").animate({"marginLeft":100},1000);
                   }
               });
               //添加讲师.
               $(".btn-addTeacher").on("click",function(){
                       var arrs=$("#teacherForm").serializeArray();
                       for(var i=0;i<arrs.length;i++){
                           params[arrs[i].name]=arrs[i].value;
                       }
                       $.ajax({
                            type:"POST",
                            url:"../api/addTeacher.php",
                            data:params,
                            dataType:"json", //预期服务器返回的数据类型，会自动帮助我们去做格式转换.
                            success:function(data){
                                //打印的是一个字符串,假设我要去解析. json 格式
                                //eval() JSON.parse
                                 //没有打印成功的回调 {"status": "ok", "code": 200}
                                 if(data.status=='ok'){
                                        //触发点击事件.
                                        $(".close").click();
                                 }
                            }
                       })
               });
           },
           initTeacherTable:function(){
                //我们怎么去画表格.
                $("#teacherTableId").bootstrapTable({
                    url:"../api/queryTeacher.php?page=1&pageSize=10",
                    pagination: true, //分页
                    /* 开启服务器端分页.
                     * 服务端给我返回的数据就必须是这样的格式
                     * 要求服务端的数据必须是这样的一个格式，这个是插件规定的。
                     * rows:[{},{},{}] //多行，当前页的数据.
                     * total:12,总记录数，数据库里面有多少条. 你给了总记录
                     * 客户端bootstrap table 根据总记录数就可以计算出来有多少页.
                     * */
                    sidePagination:"server",

                    //我们可以通过这个params 想服务器端设置参数.
                    queryParams:function(params){
                        params.pageSize=10;
                        params.page=params.offset/params.pageSize+1;
                        return params;
                    },
                    //添加一个参数，指定分页的条数,
                    columns: [{
                        field: 'username',
                        title: '讲师姓名'
                    }, {
                        field: 'age',
                        title: '年龄'
                    }, {
                        field: 'lesson',
                        title: '所属学科'
                    }, {
                        field: 'lifePhoto',
                        title: '讲师照片'
                    }, {
                        field: 'teadesc',
                        title: '描述'
                    }, {
                        field: 'operation',
                        title: '操作'
                    }]
                });
           }
      };
      hk.init();
})(window);