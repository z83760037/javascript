<?php



            //文件上传，服务器代码怎么去编写.

            $data=$_FILES;

            //要进行处理,文件保存在硬盘上面.
            $fileName=$data['lifephoto']['name'];
            $tmp=$data['lifephoto']['tmp_name'];
            //我要把它从服务器的一个临时位置存储到images 目录下面
            move_uploaded_file($tmp,"./images/".$fileName);
            //响应数据，我把这个地址响应到客户端就可以了.
            $url="./images/".$fileName;

            $array=array("url"=>$url);
            echo json_encode($array);


?>