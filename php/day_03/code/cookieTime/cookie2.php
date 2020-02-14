<?php

       //硬盘cookie cookie 在客户端的硬盘的存活时间 1 小时之后cookie 销毁.
       //硬盘cookie
       setcookie("password", "11111",time()+60*60*24);

?>