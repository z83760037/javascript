(function (win) {
      var hk = {
           init:function(){
                this.initEvent();
                this.initTeacherTable();
                this.initChart();
           },
           initEvent:function(){

               var _this=this;
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
                                       _this.refresh();
                                 }
                            }
                       })
               });
           },
           refresh:function(){
               $("#teacherTableId").bootstrapTable("refresh");
           },
           initTeacherTable:function(){
                var _this = this;
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
                    //数据在解析之前都会调用 rowStyle 回调函数.
                    rowStyle:function(row,index){
                        console.log(row);
                        row.lifePhoto="<img width='100' height='100' src='"+row.lifePhoto+"'>";
                        row.operation="<a class='btn btn-danger del_tea_btn' data-tid='"+row.id+"'>删除</a>";
                        return row;
                    },
                    //数据加载完成的时候触发 。
                    onLoadSuccess:function(){
                         //我要获取到页面上面的元素. 添加事件.
                         //用事件代理.
                         $("#teacherTableId").on("click",".del_tea_btn",function(){
                                   //删除，我根据根id 进行删除.
                             var id=this.dataset['tid'];

                             $.ajax({
                                  type:"get",
                                  url:"../api/delTeacher.php",
                                  data:{
                                       tid:id
                                  },
                                  dataType:"json",
                                  success:function(data){
                                        if(data.code==200){
                                            _this.refresh();
                                        }
                                  }
                             })
                         })
                    },
                    //我们可以通过这个params 想服务器端设置参数.
                    queryParams:function(params){
                        params.pageSize=10;
                        params.page=params.offset/params.pageSize+1;
                        return params;
                    },
                    striped:true,
                    //添加一个参数，指定分页的条数,
                    columns: [{
                        checkbox:true
                    },{
                        field: 'username',
                        title: '讲师姓名'
                    },{
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
           },
           initChart:function(){


               //去通过ajax 获取数据.获取到数据之后进行填充.
               $.ajax({
                    url:"../api/queryTeacher.php?page=1&pageSize=10",
                    type:"get",
                    dataType:"json",
                    success:function(data){
                        //console.log(data);

                        var names=[];
                        var ages=[];

                        //柱状图
                        var myChart = echarts.init(document.getElementById('main'));
                        for(var i=0;i<data.rows.length;i++){
                            ages.push(data.rows[i].age);
                            names.push(data.rows[i].username);
                        }
                        //我要去画报表.
                        var option = {
                            title: {
                                text: '讲师介绍图'
                            },
                            tooltip: {},
                            legend: {
                                data:["讲师年龄"]
                            },
                            xAxis: {
                                data: names
                            },
                            yAxis: {},
                            series: [{
                                name: '讲师年龄',
                                type: 'bar',
                                data: ages
                            }]
                        };
                        myChart.setOption(option);

                        //饼图
                        echarts.init(document.getElementById('piechart')).setOption({
                            series: {
                                type: 'pie',
                                data: [
                                    {name: '湖北', value: 9},
                                    {name: '广东', value: 61},
                                    {name: '北方', value: 120}
                                ]
                            }
                        });


                    }
               })



           }

      };
      hk.init();
})(window);