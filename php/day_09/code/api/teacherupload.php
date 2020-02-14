<?php
            $data=$_FILES;
            //要进行处理,文件保存在硬盘上面.
            $fileName=$data['lifePhoto']['name'];
            $tmp=$data['lifePhoto']['tmp_name'];
            //我要把它从服务器的一个临时位置存储到images 目录下面
            $url="../images/".$fileName;
            move_uploaded_file($tmp,$url);

            $arr=array(
                 "url"=>$url
            );
            echo json_encode($arr);

?>