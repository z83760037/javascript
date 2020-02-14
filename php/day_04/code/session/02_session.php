<?php
         header("Content-Type:text/html;charset=UTF-8");
        //用户可能又来请求我的整个页面，我要在这个页面判断用户的登录状态
        //去获取到陈好
         session_start();
         echo $_SESSION['username'];
?>