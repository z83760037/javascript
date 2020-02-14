<?php

        header("Content-Type:text/html;charset=utf-8");
         /*   //接收请求，处理请求，完成响应*/
        $tid=$_GET['tid'];
        //建立连接
        $con = mysql_connect("127.0.0.1","root","");
        //判断是已经建立连接.
        if (!$con){
        	die('Could not connect: ' . mysql_error());
        }
        //连接具体的那个数据库
        mysql_select_db("huike", $con);
        $sql="delete from teacher where id='$tid'";

        //使用mysql_query  函数 通过$con 连接 把$sql 发送到数据库.
        if (!mysql_query($sql,$con)){
         	die('Error: ' . mysql_error());
        };
        mysql_close($con);
        echo '{"status":"ok","code":200}'
?>