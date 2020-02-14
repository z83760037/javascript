<?php

        header("Content-Type:text/html;charset=utf-8");

        //实际开发，我需要获取到用户输入的用户名.
        $username=$_GET['username'];
        //那这个$username 去数据库查询一下，看他是否有这样的一个用户被注册
        $users=array("yajun","zhaojin","chendan");

        if(in_array($username,$users)){
               echo "该用户名已经被注册";
        }else{
               echo "该用户名可以使用";
        }

?>