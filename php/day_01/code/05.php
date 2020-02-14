<?php

        /*
              php  常见的函数.  每一门语言里面自带的api

              count 统计数组的长度
        */

        $arr = array("1","2","111");

        echo count($arr);

        //in_array()  判断数组当中是否存在某个元素

        echo in_array("ddd",$arr);
        echo "==========================</br>";
        //array_key_exists ()检测数组中是否存在key
        $arrkey = array("username"=>"zhagnsan");
        echo  array_key_exists("age",$arrkey);
        //file_get_contents读取文件 它可以读取本地的文件，也可以读取网络资源.
        echo file_get_contents("http://www.baihe.com/");
?>