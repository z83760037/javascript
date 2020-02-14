<?php

          //输出 echo  print_r var_dump()
         header("Content-Type:text/html;charset=utf-8");

         echo "输出字符串";

         $array=array("username"=>"爱新觉罗","age"=>99);

         var_dump($array);

         print_r($array);
?>