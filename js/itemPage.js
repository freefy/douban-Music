// console.log(location);
// 表示那个窗口中当前显示的文档的 Web 地址。
// search	设置或返回从问号 (?) 开始的 URL（查询部分）。
var id = location.search.slice(1).split('=')[1];
function getData(id,func){
    $.ajax({
        type:'GET',
        url:'https://api.douban.com/v2/music/'+id,
        dataType:'jsonp',
        success:func
    })
}
getData(id,dealData);
var $title = $('.title'),
    $logoA = $('.logo a'),
    $logoImg = $('.logo img'),
    $spanList = $('.p1-data'),
    $ratingNum = $('.rating-num'),
    $tagUl = $('.tag ul');
function dealData(data){
        var src = getImages(data.image);
        $title.html(data.title);
        var attrs = data.attrs;
        $logoImg.prop('src',src);
        $logoA.prop('href',data.image);
        $spanList.eq(0).html(attrs.singer[0]);
        $spanList.eq(1).html(attrs.version[0]);
        $spanList.eq(2).html(attrs.media[0]);
        $spanList.eq(3).html(attrs.publisher[0]);
        $ratingNum.html(data.rating.average);
       addTag(data);
}
function addTag(data){
    var str = '';
    var tags = data.tags;
    $(tags).each(function(index,ele){
        console.log(ele);
        str += '<li>'+ele.name +'</li>';
    })
    $tagUl.html(str);
}
// 解决豆瓣音乐图片服务器拒绝访问403问题
function  getImages( _url ){
    if( _url !== undefined ){
      let _u = _url.substring( 7 );
      return 'https://images.weserv.nl/?url=' + _u;
    }
  }