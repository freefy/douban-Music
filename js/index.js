(function(){
    var $submit = $('.submit'),
        $input = $('.input'),
        $suggestBox = $('.suggest-box'),
        $search = $('db-search'),
        // $li = $('.header li'),
        $muPeo = $('.musicPeople'),
        $muUp = $('.musicUp');
        $input.on('input',function(e){
            e.preventDefault();
            var value = $(this).val();
            console.log(value);
            ajaxData(value);
        })
        function ajaxData(value){
            $.ajax({
                type:'GET',
                dataType:'jsonp',
                url:'https://api.douban.com/v2/music/search',
                data:'q='+value+'&count=7',
                success:addItem
            })
            // $.ajax({
            //     type: 'GET',
            //     url: 'http://localhost/web/doubanMusic/js/data.txt',
            //     data: 'q='+value+'&count=7',
            //     success: addItem
            // })
        }
        function addItem(data){
            // var data = JSON.parse(data);
            //  console.log(data);
             $suggestBox.html('');
            var dataList = data.musics;
           var str = '';
           if(dataList.length >0 ){
               var author = '';
               $suggestBox.css({'display':'block'});
                $(dataList).each(function(index,ele){
                    if(ele.author){
                        author = ele.author[0].name;
                    }
                    var imgSrc = getImages(ele.image);
                    str += '<li>\
                    <a href="http://localhost/web/doubanMusic/itemPage.html?id='+ele.id+'">\
                        <img src='+imgSrc+' alt="">\
                        <div>\
                            <em>'+ele.title+'</em>\
                            <p>'+author+'</p>\
                        </div>\
                    </a>\
                </li>' 
                })
                $suggestBox.html($(str));
           }  
        }
        function  getImages( _url ){
            if( _url !== undefined ){
              let _u = _url.substring( 7 );
              return 'https://images.weserv.nl/?url=' + _u;
            }
        }
        $('.header li').click(function(){
            $('.active-two').removeClass();
            console.log(this);
            $(this).addClass('active-two');
            var index = $(this).index();
            $('.show').removeClass('show');
            $('.music').eq(index).addClass('show');

        })
})()
