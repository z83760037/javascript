$.fn.waterFall=function(){
       var $items=$(this);
       var parentWidth=$items.width();
       var $children=$items.children(".item");
       var width=$children.width();
       var column=5;
       //指定间距.
       var space=(parentWidth-column*width)/(column-1);

       var arr=[];
       $children.each(function(index,dom){
                var $dom=$(dom);
                if(index<column){
                      $dom.css({
                           left:index*(width+space),
                           top:0
                      })
                      arr.push($dom.height());
                }else {
                      var minIndex=0;
                      var minHeight=arr[minIndex];
                      for(var i=0;i<arr.length;i++) {
                            if(minHeight>arr[i]){
                                 minHeight=arr[i];
                                 minIndex=i;
                            }
                      }
                      $dom.css({
                           left:minIndex*(width+space),
                           top:minHeight+space
                      })
                      arr[minIndex]=minHeight+space+$dom.height();
                }
       });
       var maxIndex=0;
       var maxHeight=arr[maxIndex];
       for(var i=0;i<arr.length;i++){
             if(arr[i]>maxHeight){
                  maxHeight=arr[i];
             }
       }
       $items.css("height",maxHeight+100);
}