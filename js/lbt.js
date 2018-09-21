var nowIndex = 0;
        var flag = true;
        var len = 9;
        var oWidth = $('.lbt').width();

        var timer = undefined;

        function init() {
            blinkEvent();
            slideAuto();
        }
        init();

        function blinkEvent() {
            $('.leftBtn').add('.rightBtn').add('.slideList span').on('click', function () {
                if ($(this).attr('class') == 'btn leftBtn') {
                    move('left');
                } else if ($(this).attr('class') == 'btn rightBtn') {
                    move('right');
                } else {
                    var index = $(this).index();
                    move(index);
                }
                changeStyle();
            })
            $('.lbt').on('mouseenter', function () {
                $('div.btn').show();
                clearTimeout(timer);
            }).on('mouseleave', function () {
                $('div.btn').hide();
                slideAuto();
            })
        }

        function move(direction) {
            if (flag) {
                flag = false;
                var a = 1;
                if (direction == 'left' || direction == 'right') {
                    if (direction == 'left') {
                        if (nowIndex == 0) {
                            // console.log('a');
                            $('.slidePage').css({
                                left: -(len * oWidth)
                            });
                            nowIndex = len - 1;
                        } else {
                            nowIndex = nowIndex - 1;
                        }
                    } else {
                        if (nowIndex == len-1) {
                            a = 0;
                            $('.slidePage').animate({
                                left: -(len * oWidth)
                            }, function () {
                                $(this).css({
                                    left: 0
                                });
                                slideAuto();
                                flag = true;
                            })
                            nowIndex = 0;
                        } else {
                            nowIndex = nowIndex + 1;
                        }
                    }
                } else {
                    nowIndex = direction;
                }
                if (a) {
                    slider();
                }
            }

        }

        function slider() {
            $('.slidePage').animate({
                left: -(oWidth * nowIndex)
            }, function () {
                slideAuto();
                flag = true;
            })
        }

        function slideAuto() {
            clearTimeout(timer);
            timer = setTimeout(function () {
                move('right');
                changeStyle();
            }, 1000)
        }

        function changeStyle() {
            $('.active').removeClass('active');
            $('.slideList span').eq(nowIndex).addClass('active');
        }