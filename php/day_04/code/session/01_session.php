<?php


        //用户登录，登录成功了.
        $username="陈好";
        //我要把这个数据保存在会话里面。我要存在session 当中.
        //开始一次会话.
        session_start();
        //这个是一个关联数组.
        $_SESSION['username']=$username;


?>