<?php
                //我需要把所有的employee 数据都获取到，然后通过一个表格输出到客户端.
                header("Content-Type:text/html;charset=utf-8");
                $con = mysql_connect("127.0.0.1","root","");

                /*
                   客户端必须给两个参数
                   一个参数 page 当前页
                   一个参数 pageSize 每页显示多少条.
                */

                $pageNum=$_GET['page']; //3
                $pageSize=$_GET['pageSize']; //10
                $startIndex=($pageNum-1)*$pageSize;
                $endIndex=$pageSize;
                if (!$con){
                    die('Could not connect: ' . mysql_error());
                }
                $sql="select * from teacher order by id desc limit ".$startIndex.",".$endIndex;
                //连接那个数据库  pdj 数据
                mysql_select_db("huike", $con);

                //查询，响应一个结果。返回的结果都在这个$result
                $result = mysql_query($sql);
                $list=array();
                //怎么去获取这个结果.
                while($row=mysql_fetch_array($result)){
                        // $row 代表的是一条记录，代表是一行.
                        $item=array(
                             "id"=> $row['id'],
                             "username"=>$row['username'],
                             "age"=> $row['age'],
                             "lesson"=> $row['lesson'],
                             "lifePhoto"=> $row['lifePhoto'],
                             "teadesc"=>$row['teadesc']
                        );
                        array_push($list,$item);
                }

                //如果是分页的数据. 我们传递到客户端的数据格式必须
               /* {
                     "rows":[具体的记录],
                     "total":8
                }*/

               $json=array("rows"=>$list,"total"=>15);
               echo json_encode($json);
?>
