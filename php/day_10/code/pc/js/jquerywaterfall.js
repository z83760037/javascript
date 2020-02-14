/*扩展jquery 的方法，扩展的方法是要操作局部的dom*/
$.fn.waterFall=function(){
      //编写逻辑.   要计算出来每个item的left 值以及top 值.

      //假设我要计算每一个item 的left 值，我就要知道每个的item 的宽度，还有计算间距.
      //left:  index*(width+space);
       var $items=$(this);
       var parentWidth=$items.width();
       var $childRen=$items.children(".item");
       var width=$childRen.width();
       var column=5;
       var space=(parentWidth-column*width)/(column-1);
       //定义的一个临时的存储去，记录每一列的高度.
       var arr=[];
       //我要开始设置每个item 的位置.
       $childRen.each(function(index,dom){
             //找到最矮的一列，然后把这个元素加到最矮的那一列上面去.
             var $dom=$(dom);
             if(index<column){ //这里是计算前面的5列位置.
                 $dom.css({
                      top:0,
                      left:index*(width+space)
                 });
                 arr.push($dom.height());
             }else{
                 //这里是计算后面的元素的位置.
                 var minIndex=0;
                 //找到最矮的这一列的高度，以及索引值.
                 var minHeight=arr[minIndex];
                 for(var i=0;i<arr.length;i++){
                        if(minHeight>arr[i]){
                            minHeight=arr[i];
                            minIndex=i;
                        }
                 }
                 //找到之后改这个item 的位置.
                 $dom.css({
                      left:minIndex*(width+space),
                      top:minHeight+space
                 });
                 // 这里是把最矮的那一列的高度进行更新，因为你在最矮的这一列添加了元素.
                 arr[minIndex]=minHeight+space+$dom.height();
             }
       })

       //获取到最高的那一列，找到高度.
       var maxHeight=0;

       for(var i=0;i<arr.length;i++){
             if(arr[i]>maxHeight){
                 maxHeight=arr[i]
             }
       }

       $(".items").height(maxHeight+100);

}