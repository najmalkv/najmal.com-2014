$(document).ready(function () {



    var run_once_flag = false;
    var timer;
    var progress;

    var current_top = 0;
    var cur_slide = 2;
    var prev_slide = 1;

    var Browser = {
        IsIe: function () {
            return navigator.appVersion.indexOf("MSIE") != -1;
        },
        Navigator: navigator.appVersion,
        Version: function () {
            var version = 999; // we assume a sane browser
            if (navigator.appVersion.indexOf("MSIE") != -1)
            // bah, IE again, lets downgrade version number
                version = parseFloat(navigator.appVersion.split("MSIE")[1]);
            return version;
        }
    };

    function finished_loading() {


        if (run_once_flag == false) {
            run_once_flag = true;

            for (var i = 1; i <= 6; i++) {
                $('.center-pics').append('<div class="center-circle-inner"><img src="images/photo' + i + '.jpg" width="500" height="500" alt="" /></div>');
            }


        }


        $('.load-top').animate({ height: '0' }, 600, 'linear');
        $('.load-bottom').animate({  bottom: '-50%' }, 600, 'linear');
        $('.center-load').fadeOut(600);
        $('.load-center').fadeOut(600);
        $('.load-under').fadeOut(600);
        $('.load-timer').fadeOut(600);
        $('.top-nav').css({ zIndex: '100' });
        clearInterval(timer);
        clearInterval(progress);
        clearInterval(rotatec);
        clearInterval(rotateslider);
        $('.wrapper').fadeOut(600);
        $('.center-circle-inner').css({ display: 'none' });
        $('.center-circle').stop(true, false).animate({ borderRadius: '600px', height: '500px', width: '500px', marginTop: '-250px', marginLeft: '-250px' }, 600, function () {

            $('.center-pics div:nth-child(' + prev_slide + ')').fadeIn(1000);
            play_slider();


            if (Browser.IsIe && Browser.Version() <= 9) {
                //   alert("You are currently using Internet Explorer" + Browser.Version() + " or are viewing the site in Compatibility View. This site is best viewed on Mozilla, chrome, opera and safari.");
                $('.top-nav').stop(true, false).fadeIn(200);
                $('.top-nav').stop(true, false).animate({ left: '74%', opacity: '1' }, 600, function () { });
            }
            else {
                rotatecircle();
                $('.icon-circle').fadeIn(600);
            }
        });
    }
    var nav_selected = "home";
    var about_nav_selected = 0;

    function intialise_top_nav() {



        /********************************************home click start******************************************************/

        $('.top-nav span:nth-child(1),.logo').unbind('click').click(function () {

            if (nav_selected != "home") {
                nav_selected = "home";
                reset_nav();
                $('.top-nav span:nth-child(' + ($('#' + nav_selected).index() + 1) + ') img').attr("src", "images/" + nav_selected + "-sel.png");
                $('.left-select-main').stop(true, false).animate({ left: '50%' }, 600, function () {
                    $('.left-select-outer').stop(true, false).animate({ height: '340px' }, 600, function () { });
                    $('.pointer').fadeIn();
                    $('.left-select-main').stop(true, false).animate({ height: '440px', marginTop: '-220px' }, 600, function () { });

                });

                $('.about-nav-cont > span').stop(true, false).animate({ height: '0px', width: '0px', borderWidth: '0px', marginLeft: '30' }, 300, 'easeOutBounce');
                $('.about-nav-cont > span img').stop(true, false).animate({ opacity: '0' }, 300);
                $('.about-nav-cont > cite').css({ opacity: '0', transform: 'rotateX(0deg)' });
                $('.about-nav').stop(true, false).animate({ marginTop: '0px', height: '100px' }, 600, function () { });
                $('.about-nav-cont').stop(true, false).animate({ height: '0px' }, 600, function () {
                    $('.about-nav').stop(true, false).animate({ marginLeft: '-100px', opacity: '0' }, 600, function () { });
                    $('.about-line').stop(true, false).animate({ opacity: '0' }, 600);
                });


                if (!Browser.IsIe || Browser.Version() > 9) {
                    $('.top-nav').stop(true, false).animate({ left: '22%', opacity: '0' }, 600, function () { $('.top-nav').fadeOut(200); });
                    clearInterval(rotatec);
                    rotatecircle();
                }

                clearInterval(rotateslider);
                play_slider();
                $('.center-home').stop(true, false).fadeIn(600);
                $('.center-about').stop(true, false).fadeOut(600);
                $('.center-port').stop(true, false).fadeOut(600);
                $('.about-nav-cont span:nth-child(1)').css({ background: 'none' });
                $('.center-circle').stop(true, false).animate({ borderRadius: '600px', height: '500px', width: '500px', marginTop: '-250px', marginLeft: '-250px' }, 600, function () {
                    if (!Browser.IsIe || Browser.Version() > 9) {
                        $('.icon-circle').fadeIn(200);
                    }
                });
                $('.center-circle').css({ background: '#fff' });
                $('.contact-left,.contact-right').css({ opacity: '0', transform: 'rotateZ(45deg)' });

                $('.portfolio-line1 span,.portfolio-line2 span').stop(true, false).animate({ opacity: '0' }, 600);
                $('.portfolio-line1, .portfolio-line2').stop(true, false).animate({ height: '0px', opacity: '0' }, 600, function () { });
                $('.portfolio-sec2').stop(true, false).animate({ borderRadius: '30px', width: '600px', marginTop: '30px', marginLeft: '-2000px' }, 600, function () { });
                $('.portfolio-circle1').stop(true, false).animate({ height: '0px', opacity: '0', width: '0px', borderWidth: '0px', marginLeft: '-417', marginTop: '-125px' }, 600, 'easeOutExpo', function () { });
                $('.portfolio-circle2').stop(true, false).animate({ height: '0px', opacity: '0', width: '0px', borderWidth: '0px', marginLeft: '246', marginTop: '150px' }, 600, 'easeOutExpo', function () { });

                $('.contact-line').stop(true, false).animate({ opacity: '0' }, 600);
            }
        });

        /********************************************home click end******************************************************/

        /********************************************portfolio click start******************************************************/
        $('#icon-circle2,.top-nav span:nth-child(3)').unbind('click').click(function () {

            if (nav_selected != "portfolio") {
                nav_selected = "portfolio";
                reset_nav();
                $('.top-nav span:nth-child(' + ($('#' + nav_selected).index() + 1) + ') img').attr("src", "images/" + nav_selected + "-sel.png");
                $('.left-select-outer').stop(true, false).animate({ height: '0px' }, 600, function () { });
                $('.pointer').fadeOut();
                $('.left-select-main').stop(true, false).animate({ height: '100px', marginTop: '0px' }, 600, function () {
                    $('.left-select-main').stop(true, false).animate({ left: '-50%' }, 600);
                });

                $('.about-nav-cont > span').stop(true, false).animate({ height: '0px', width: '0px', borderWidth: '0px', marginLeft: '30' }, 300, 'easeOutBounce');
                $('.about-nav-cont > span img').stop(true, false).animate({ opacity: '0' }, 300);
                $('.about-nav-cont > cite').css({ opacity: '0', transform: 'rotateX(0deg)' });
                $('.about-nav').stop(true, false).animate({ marginTop: '0px', height: '100px' }, 600, function () { });
                $('.about-nav-cont').stop(true, false).animate({ height: '0px' }, 600, function () {
                    $('.about-nav').stop(true, false).animate({ marginLeft: '-100px', opacity: '0' }, 600, function () { });
                    $('.about-line').stop(true, false).animate({ opacity: '0' }, 600);
                });

                $('.top-nav').stop(true, false).fadeIn(200);
                $('.top-nav').stop(true, false).animate({ left: '74%', opacity: '1' }, 600, function () { });

                clearInterval(rotatec);
                $('.icon-circle').stop(true, false).fadeOut(200);

                clearInterval(rotateslider);
                $('.center-home').stop(true, false).fadeOut(600);
                $('.center-about').stop(true, false).fadeOut(600);


                $('.center-circle').stop(true, false).animate({ borderRadius: '30px', height: '250px', width: '600px', marginTop: '-250px', marginLeft: '-280px' }, 600, function () {
                    $('.center-port').stop(true, false).fadeIn(600);

                    $('.portfolio-line1').stop(true, false).animate({ height: '260px', opacity: '1' }, 600, function () {
                        $('.portfolio-line1 span').stop(true, false).animate({ opacity: '1' }, 600);
                        $('.portfolio-sec2').stop(true, false).animate({ borderRadius: '30px', width: '600px', marginTop: '30px', marginLeft: '-500px' }, 600, function () {
                            $('.portfolio-line2').stop(true, false).animate({ height: '260px', opacity: '1' }, 600, function () {
                                $('.portfolio-line2 span').stop(true, false).animate({ opacity: '1' }, 600);
                                $('.portfolio-circle1').stop(true, false).animate({ height: '150px', opacity: '1', width: '150px', borderWidth: '4px', marginLeft: '-492', marginTop: '-200px' }, 600, 'easeOutExpo', function () { });
                                $('.portfolio-circle2').stop(true, false).animate({ height: '150px', opacity: '1', width: '150px', borderWidth: '4px', marginLeft: '168', marginTop: '84px' }, 600, 'easeOutExpo', function () { });
                            });
                        });
                    });
                });
                $('.center-circle').css({ background: '#fff' });
                $('.contact-left,.contact-right').css({ opacity: '0', transform: 'rotateZ(45deg)' });

                // 
                $('.contact-line').stop(true, false).animate({ opacity: '0' }, 600);
                $('.port-proj-cont img:nth-child(1)').stop(true, false).fadeIn(300);
            }
        });

        /********************************************portfolio click start******************************************************/


        /********************************************about click start******************************************************/

        $('#icon-circle3,.more-btn,.top-nav span:nth-child(2)').unbind('click').click(function () {
            if (nav_selected != "about") {
                nav_selected = "about";
                reset_nav();
                $('.top-nav span:nth-child(' + ($('#' + nav_selected).index() + 1) + ') img').attr("src", "images/" + nav_selected + "-sel.png");
                $('.left-select-outer').stop(true, false).animate({ height: '0px' }, 600, function () { });
                $('.pointer').fadeOut();
                $('.left-select-main').stop(true, false).animate({ height: '100px', marginTop: '0px' }, 600, function () {
                    $('.left-select-main').stop(true, false).animate({ left: '-50%' }, 600);
                });
                $('.about-nav-cont span').css({ background: '#fff', borderColor: '#ccc' });
                $('.center-about > div').stop(true, false).fadeOut(600);
                $('.center-about div:nth-child(1)').stop(true, false).delay(200).fadeIn(600);
                $('.about-nav').stop(true, false).animate({ marginLeft: '-500px', opacity: '1' }, 600, function () {
                    $('.about-nav').stop(true, false).animate({ marginTop: '-172px', height: '342px' }, 600, function () { $('.about-nav-cont span:nth-child(1)').css({ background: '#F7A230', borderColor: '#0062b5' }); about_nav_prev = 1; });
                    $('.about-line').stop(true, false).animate({ marginTop: '-200px', height: '400px', opacity: '1' }, 600, function () {

                        $('.about-nav-cont > span:nth-child(1)').animate({ height: '60px', width: '60px', borderWidth: '4px', marginLeft: '0' }, 300, 'easeOutBounce', function () {
                            $('.about-nav-cont > span:nth-child(1) img').animate({ opacity: '1' }, 300, function () {
                                $('.about-nav-cont > span:nth-child(2)').animate({ height: '60px', width: '60px', borderWidth: '4px', marginLeft: '0' }, 300, 'easeOutBounce', function () {
                                    $('.about-nav-cont > span:nth-child(2) img').animate({ opacity: '1' }, 300, function () {
                                        $('.about-nav-cont > span:nth-child(3)').animate({ height: '60px', width: '60px', borderWidth: '4px', marginLeft: '0' }, 300, 'easeOutBounce', function () {
                                            $('.about-nav-cont > span:nth-child(3) img').animate({ opacity: '1' }, 300, function () {
                                                $('.about-nav-cont > span:nth-child(4)').animate({ height: '60px', width: '60px', borderWidth: '4px', marginLeft: '0' }, 300, 'easeOutBounce', function () {
                                                    $('.about-nav-cont > span:nth-child(4) img').animate({ opacity: '1' }, 300, function () {
                                                        about_nav_selected = 0;
                                                        $('.about-nav-cont > cite:nth-child(5)').css({ opacity: '1', transform: 'rotateX(360deg)' });
                                                    });
                                                });
                                            });
                                        });


                                    });
                                });
                            });
                        });
                    });
                    $('.about-nav-cont').stop(true, false).animate({ height: '242px' }, 600, function () { });
                });

                $('.top-nav').stop(true, false).fadeIn(200);
                $('.top-nav').stop(true, false).animate({ left: '74%', opacity: '1' }, 600, function () { });

                clearInterval(rotatec);
                $('.icon-circle').stop(true, false).fadeOut(200);

                clearInterval(rotateslider);
                $('.center-home').stop(true, false).fadeOut(600);
                $('.center-port').stop(true, false).fadeOut(600);

                $('.center-circle').stop(true, false).animate({ borderRadius: '60px', height: '500px', width: '500px', marginTop: '-250px', marginLeft: '-250px' }, 600, function () { $('.center-about').stop(true, false).fadeIn(600); });
                $('.center-circle').css({ background: '#fff' });
                $('.contact-left,.contact-right').css({ opacity: '0', transform: 'rotateZ(45deg)' });

                $('.portfolio-line1 span,.portfolio-line2 span').stop(true, false).animate({ opacity: '0' }, 600);
                $('.portfolio-line1, .portfolio-line2').stop(true, false).animate({ height: '0px', opacity: '0' }, 600, function () { });
                $('.portfolio-sec2').stop(true, false).animate({ borderRadius: '30px', width: '600px', marginTop: '30px', marginLeft: '-2000px' }, 600, function () { });
                $('.portfolio-circle1').stop(true, false).animate({ height: '0px', opacity: '0', width: '0px', borderWidth: '0px', marginLeft: '-417', marginTop: '-125px' }, 600, 'easeOutExpo', function () { });
                $('.portfolio-circle2').stop(true, false).animate({ height: '0px', opacity: '0', width: '0px', borderWidth: '0px', marginLeft: '246', marginTop: '150px' }, 600, 'easeOutExpo', function () { });
                $('.contact-line').stop(true, false).animate({ opacity: '0' }, 600);
            }
        });

        /********************************************about click start******************************************************/

        /********************************************contact click start******************************************************/

        $('#icon-circle1,.top-nav span:nth-child(4)').unbind('click').click(function () {
            if (nav_selected != "contact") {
                nav_selected = "contact";
                reset_nav();
                $('.top-nav span:nth-child(' + ($('#' + nav_selected).index() + 1) + ') img').attr("src", "images/" + nav_selected + "-sel.png");
                $('.left-select-outer').stop(true, false).animate({ height: '0px' }, 600, function () { });
                $('.pointer').fadeOut();
                $('.left-select-main').stop(true, false).animate({ height: '100px', marginTop: '0px' }, 600, function () {
                    $('.left-select-main').stop(true, false).animate({ left: '-50%' }, 600);
                });

                $('.about-nav-cont > span').stop(true, false).animate({ height: '0px', width: '0px', borderWidth: '0px', marginLeft: '30' }, 300, 'easeOutBounce');
                $('.about-nav-cont > span img').stop(true, false).animate({ opacity: '0' }, 300);
                $('.about-nav-cont > cite').css({ opacity: '0', transform: 'rotateX(0deg)' });
                $('.about-nav-cont span:nth-child(1)').css({ background: '#fff' });
                $('.about-nav').stop(true, false).animate({ marginTop: '0px', height: '100px' }, 600, function () { });
                $('.about-nav-cont').stop(true, false).animate({ height: '0px' }, 600, function () {
                    $('.about-nav').stop(true, false).animate({ marginLeft: '-100px', opacity: '0' }, 600, function () { });
                    $('.about-line').stop(true, false).animate({ opacity: '0' }, 600);
                });

                $('.top-nav').stop(true, false).fadeIn(200);
                $('.top-nav').stop(true, false).animate({ left: '74%', opacity: '1' }, 600, function () { });

                clearInterval(rotatec);
                $('.icon-circle').stop(true, false).fadeOut(200);

                clearInterval(rotateslider);
                $('.center-home').stop(true, false).fadeOut(600);
                $('.center-about').stop(true, false).fadeOut(600);
                $('.center-port').stop(true, false).fadeOut(600);

                $('.center-circle').stop(true, false).animate({ borderRadius: '60px', height: '60px', width: '60px', marginTop: '-30px', marginLeft: '-30px' }, 600, function () {
                    $('.contact-line').stop(true, false).animate({ height: '500px', marginTop: '-250px', opacity: '1' }, 600, function () {
                        $('.contact-left,.contact-right').css({ opacity: '1', transform: 'rotateZ(0deg)' });
                    });

                });
                $('.center-circle').css({ background: '#F3A030' });

                $('.portfolio-line1 span,.portfolio-line2 span').stop(true, false).animate({ opacity: '0' }, 600);
                $('.portfolio-line1, .portfolio-line2').stop(true, false).animate({ height: '0px', opacity: '0' }, 600, function () { });
                $('.portfolio-sec2').stop(true, false).animate({ borderRadius: '30px', width: '600px', marginTop: '30px', marginLeft: '-2000px' }, 600, function () { });
                $('.portfolio-circle1').stop(true, false).animate({ height: '0px', opacity: '0', width: '0px', borderWidth: '0px', marginLeft: '-417', marginTop: '-125px' }, 600, 'easeOutExpo', function () { });
                $('.portfolio-circle2').stop(true, false).animate({ height: '0px', opacity: '0', width: '0px', borderWidth: '0px', marginLeft: '246', marginTop: '150px' }, 600, 'easeOutExpo', function () { });
            }
        });

        /********************************************contact click end******************************************************/




        var about_anim_flag = false;
        var about_nav_prev = 1;
        $('.about-nav-cont span').unbind('click').click(function () {
            if (about_anim_flag == false) {
                about_anim_flag = true;
                $('.about-nav-cont > cite').css({ opacity: '0', transform: 'rotateX(0deg)' });
                $('.about-nav-cont > cite:nth-child(' + ($(this).index() + 5) + ')').css({ opacity: '1', transform: 'rotateX(360deg)' });
                about_nav_selected = $(this).index();
                $('.about-nav-cont span').css({ background: '#fff', borderColor: '#ccc' });
                $('.about-nav-cont span:nth-child(' + ($(this).index() + 1) + ')').css({ background: '#F7A230', borderColor: '#0062b5' });
                // $('.circ-design').stop(true, false).animate({ left: '500px' }, 300, function () { });
                $('.circ-design').css({ left: '-100px' });
                $('.center-about >div:nth-child(' + about_nav_prev + ')').stop(true, false).fadeOut(300);
                $('.center-about div:nth-child(' + ($(this).index() + 1) + ')').stop(true, false).delay(200).fadeIn(300);
                $('.center-about div:nth-child(' + ($(this).index() + 1) + ')').animate({ opacity: '1' }, 300, function () {
                    $('.circ-design').stop(true, false).animate({ left: '233px' }, 300);
                    about_nav_prev = ($(this).index() + 1);
                    about_anim_flag = false;
                });
            }
        });

        function reset_nav() {
            $('.top-nav span:nth-child(1) img').attr("src", "images/home.png");
            $('.top-nav span:nth-child(2) img').attr("src", "images/about.png");
            $('.top-nav span:nth-child(3) img').attr("src", "images/portfolio.png");
            $('.top-nav span:nth-child(4) img').attr("src", "images/contact.png");
        }


        $('.top-nav span').mouseover(function () {
            $('.top-nav span:nth-child(' + ($(this).index() + 1) + ') img').attr("src", "images/" + $(this).attr("id") + "-sel.png");
        }).mouseout(function () {
            if ($(this).attr("id") != nav_selected)
                $('.top-nav span:nth-child(' + ($(this).index() + 1) + ') img').attr("src", "images/" + $(this).attr("id") + ".png");
            else
                $('.top-nav span:nth-child(' + ($(this).index() + 1) + ') img').attr("src", "images/" + $(this).attr("id") + "-sel.png");

        });

    }

    var abt_cur = ".summary";
    function small_view_clicks() {

        $('.top-nav span:nth-child(1)').unbind('click').click(function () {
            $('html,body').animate({ scrollTop: '0px' }, 600);
        });

        $('.top-nav span:nth-child(2)').unbind('click').click(function () {
            $('html,body').animate({ scrollTop: $('.about-head').offset().top }, 600);
        });

        $('.top-nav span:nth-child(3)').unbind('click').click(function () {
            $('html,body').animate({ scrollTop: $('.port-head').offset().top }, 600);
        });

        $('.top-nav span:nth-child(4)').unbind('click').click(function () {
            $('html,body').animate({ scrollTop: $('.contact-head').offset().top }, 600);
        });

        $('.more-btn').unbind('click').click(function () {
            //  $('html,body').animate({ scrollTop: $('.about-head').offset().top }, 600);
            $('.summary h1').click();
        });



        $('.summary h1, .education h1,.specialties h1,.experience h1').unbind('click').click(function () {
            if ($(this).parent().height() != $(this).parent()[0].scrollHeight) {
                $(abt_cur + ' h1').css({ backgroundColor: '#fff' });
                $(abt_cur).stop(true, false).animate({ height: '60px' }, 600);
                $(this).parent().stop(true, false).animate({ height: $(this).parent()[0].scrollHeight }, 600, function () {
                    $(abt_cur).css("height", "auto");
                    $('html,body').stop(true, false).animate({ scrollTop: $(this).offset().top }, 600, function () { });
                });
                $(this).parent().css({ cursor: 'text' });
                abt_cur = '.' + $(this).parent().attr('class');
                $(abt_cur + ' h1').css({ backgroundColor: '#F7A230' });
            }
            else {
                $('.abt-hide').click();
            }
        });




        $('div.web-nav:eq(0)').unbind('click').click(function (event) {


            if ($('.center-port').height() == 56) {
                // $(this).css({ backgroundColor: '#fff' });
                $('.portfolio-sec2').stop(true, false).animate({ height: '56px' }, 600);
                $('.center-port').stop(true, false).animate({ height: $('.center-port')[0].scrollHeight }, 600, function () {
                    $('.center-port').css("height", "auto");
                    $('html,body').stop(true, false).animate({ scrollTop: $(this).offset().top }, 600);
                });
                $('div.web-minus:eq(0),div.web-plus:eq(0)').stop(true, false).animate({ opacity: 1 }, 600);
                $('div.web-minus:eq(1),div.web-plus:eq(1)').stop(true, false).animate({ opacity: 0 }, 600);
            }

            else if (event.target.nodeName == "SPAN") {
                $('div.web-minus:eq(0),div.web-plus:eq(0)').stop(true, false).animate({ opacity: 0 }, 600);
                $('.center-port').stop(true, false).animate({ height: '56px' }, 600);
                $('html,body').stop(true, false).animate({ scrollTop: $('.port-head').offset().top }, 600);
            }
        });


        $('div.web-nav:eq(1)').unbind('click').click(function (event) {
            if ($('.portfolio-sec2').height() == 56) {
                // $(this).css({ backgroundColor: '#fff' });
                $('.center-port').stop(true, false).animate({ height: '56px' }, 600);
                $('.portfolio-sec2').stop(true, false).animate({ height: $('.portfolio-sec2')[0].scrollHeight }, 600, function () {
                    $('.portfolio-sec2').css("height", "auto");
                    $('html,body').animate({ scrollTop: $(this).offset().top }, 600);
                });
                $('div.web-minus:eq(1),div.web-plus:eq(1)').stop(true, false).animate({ opacity: 1 }, 600);
                $('div.web-minus:eq(0),div.web-plus:eq(0)').stop(true, false).animate({ opacity: 0 }, 600);
            }
            else if (event.target.nodeName == "SPAN") {
                $('div.web-minus:eq(1),div.web-plus:eq(1)').stop(true, false).animate({ opacity: 0 }, 600);
                $('.portfolio-sec2').stop(true, false).animate({ height: '56px' }, 600);
                $('html,body').animate({ scrollTop: $('.port-head').offset().top }, 600);
            }
        });


        $('.abt-hide').unbind('click').click(function () {
            $('html,body').animate({ scrollTop: $('.about-head').offset().top }, 600);
            $(abt_cur + ' h1').css({ backgroundColor: '#fff' });
            $(abt_cur).animate({ height: '60px' }, 600);
            $(abt_cur).css({ cursor: 'pointer' });
            abt_cur = "";
        });

    }


    var deg = 0;
    var rotatec;
    var rotateslider;
    // rotatecircle();
    function rotatecircle() {
        rotatec = setInterval(function () {
            deg += 1;

            //    $('.outer-circle').append("<div class='cover-right' style='transform:rotateZ(" + deg + "deg)'></div>");

            $('#icon-circle1').css({ transform: 'rotateZ(' + deg + 'deg)' });
            $('#icon-circle2').css({ transform: 'rotateZ(' + (20 + deg) + 'deg)' });
            $('#icon-circle3').css({ transform: 'rotateZ(' + (40 + deg) + 'deg)' });
            $('#icon-circle4').css({ transform: 'rotateZ(' + (60 + deg) + 'deg)' });
            $('#icon-circle1 span').css({ transform: 'rotateZ(-' + deg + 'deg)' });
            $('#icon-circle2 span').css({ transform: 'rotateZ(-' + (20 + deg) + 'deg)' });
            $('#icon-circle3 span').css({ transform: 'rotateZ(-' + (40 + deg) + 'deg)' });
            $('#icon-circle4 span').css({ transform: 'rotateZ(-' + (60 + deg) + 'deg)' });

            //   $('.circle-txt').css({ transform: 'rotateZ(' + (150 + deg) + 'deg)' });
            if (deg >= 3600) {
                deg = 0;
            }
        }, 200);
    }


    var large_load_flag = false;
    function load_for_first_time() {
      
        if (($(window).innerWidth() > 1007 || (Browser.IsIe && Browser.Version() <= 9)) && large_load_flag == false) {
          
            large_load_flag = true;

            if (Browser.IsIe && Browser.Version() <= 9) {
                $('.load-under').css({ display: 'block' });
            }

            var load_perc = 0;
            var img_count = 0;

            var imgbg = new Image();
            $(imgbg).bind('load', function () {
                $("body").addClass("bg");
                load_perc += 14.285;

                if (Browser.IsIe && Browser.Version() <= 9) {

                    $('.load-center').animate({ width: load_perc + '%' }, { duration: 428,
                        step: function () {
                            $('.center-load').text(parseInt((parseInt($('.load-center').width()) / $(window).width()) * 100) + '%');
                            if (parseInt($('.load-center').width()) >= (0.99 * $(window).width())) {
                                finished_loading();
                            }
                        }
                    });
                }
                else {
                    radial_progress(load_perc * 3.6);
                }
            });
            imgbg.onerror = imgbg.onabort = function () {
                alert("brokenbg image");
            };
            imgbg.src = 'images/bg5.jpg';

            var img1 = new Image();
            var img2 = new Image();
            var img3 = new Image();
            var img4 = new Image();
            var img5 = new Image();
            var img6 = new Image();
            $([img1, img2, img3, img4, img5, img6]).bind('load', function () {
                load_perc += 14.285;



                if (Browser.IsIe && Browser.Version() <= 9) {
                    $('.load-center').animate({ width: load_perc + '%' }, { duration: 428,
                        step: function () {
                            $('.center-load').text(parseInt((parseInt($('.load-center').width()) / $(window).width()) * 100) + '%');
                            if (parseInt($('.load-center').width()) >= (0.99 * $(window).width())) {
                                finished_loading();
                            }
                        }
                    });
                }
                else {
                    radial_progress(load_perc * 3.6);
                }
            });



            img1.src = 'images/photo1.jpg';
            img2.src = 'images/photo2.jpg';
            img3.src = 'images/photo3.jpg';
            img4.src = 'images/photo4.jpg';
            img5.src = 'images/photo5.jpg';
            img6.src = 'images/photo6.jpg';


            // radial_progressbar();
            var timer_tick = 0;
            timer = setInterval(function () {

                timer_tick += 0.1;
                $('.load-timer').text((Math.round(timer_tick * 10) / 10) + 's');
            }, 100);

            var prev_progress = 0;


            function radial_progress(progress_value) {
                clearInterval(progress);
                progress = setInterval(function () {
                    prev_progress += 1;
                    $('.center-load').text(parseInt(prev_progress / 3.6) + '%');
                    if (prev_progress <= 360)
                        $('.spinner').css({ transform: 'rotateZ(' + prev_progress + 'deg)' });


                    if (prev_progress == 180) {
                        $('.filler').css({ opacity: '1' });
                        $('.mask').css({ opacity: '0' });
                    }
                    else if (prev_progress >= 360) {
                        //  prev_progress = 0;
                        clearInterval(progress);
                        $('.filler').css({ opacity: '0' });
                        $('.mask').css({ opacity: '1' });
                        clearTimeout(load_home);
                        var load_home = setTimeout(function () {
                            finished_loading();
                        }, 200);
                    }

                    if (prev_progress >= progress_value) {
                        clearInterval(progress);
                    }
                }, 10);
            }










            // for (var i = 212; i < 236; i++) {
            //        var f = 320;
            //        setInterval(function () {
            //            
            //            if (f <=360) {
            //                $('.semi-circle').append('<span style="transform:rotateZ(' + f + 'deg); "><span>');
            //                f++;
            //            }
            //        }, 10);
            //  }

            
            $(document).mouseover(function (event) {
                if (!$(event.target).parents('#icon-circle1').length) {
                    $('#icon-circle1 i').stop(true, true).fadeOut(300);
                }
                else if ($(event.target).parents('#icon-circle1').length) {
                    //  $('#icon-circle1 span ').css({ transform: 'rotateZ(-' + deg + 'deg)' });
                    $('#icon-circle1 i').stop(true, true).fadeIn(300);
                }

                if (!$(event.target).parents('#icon-circle2').length) {
                    $('#icon-circle2 i').stop(true, true).fadeOut(300);
                }
                else if ($(event.target).parents('#icon-circle2').length) {
                    // $('#icon-circle2 span').css({ transform: 'rotateZ(-' + (20 + deg) + 'deg)' });
                    $('#icon-circle2 i').stop(true, true).fadeIn(300);
                }

                if (!$(event.target).parents('#icon-circle3').length) {
                    $('#icon-circle3 i').stop(true, true).fadeOut(300);
                }
                else if ($(event.target).parents('#icon-circle3').length) {
                    //$('#icon-circle3 span').css({ transform: 'rotateZ(-' + (40 + deg) + 'deg)' });
                    $('#icon-circle3 i').stop(true, true).fadeIn(300);
                }

                if (!$(event.target).parents('#icon-circle4').length) {
                    $('#icon-circle4 i').stop(true, true).fadeOut(300);
                }
                else if ($(event.target).parents('#icon-circle4').length) {
                    //   $('#icon-circle4 span').css({ transform: 'rotateZ(-' + (60 + deg) + 'deg)' });
                    $('#icon-circle4 i').stop(true, true).fadeIn(300);
                }


            });



            $('.top-nav span').mouseover(function () {

                $('.top-nav-hover').stop(true, false).animate({ left: $(this).offset().left, opacity: '1' }, 300);
                $('.top-nav-hover span').text($(this).attr("id"));
            }).mouseout(function () {
                $('.top-nav-hover').stop(true, false).animate({ opacity: '0' }, 300);
            });


            $(window).resize(function () {
                $('.top-nav-hover').css({ left: '13%' });
            });

            var center_anim_flag = false;


            $('.center-circle,.pic-frame').mouseover(function () {
                clearInterval(rotateslider);
                //  
            }).mouseout(function () {
                if ($(window).innerWidth() > 1007)
                    play_slider();
            });


            $('.icon-circle').mouseover(function () {
                clearInterval(rotatec);
            }).mouseout(function () {
                if ($(window).innerWidth() > 1007)
                    rotatecircle();
            });


            //        for (var i = 0; i < ($('.left-select-inner').height() / 20); i++) {
            //            $('.design-left').append("<span></span>");
            //            $('.design-right').append("<span></span>");
            //        }





            $('.footer-tab').click(function () {
                if (parseInt($('.footer').css('bottom')) != 0)
                    $('.footer').stop(true, false).animate({ bottom: '0px' }, 600, 'easeInOutCirc', function () { });
                else
                    $('.footer').stop(true, false).animate({ bottom: '-40px' }, 600, 'easeInOutCirc', function () { });

            });

            intialise_top_nav();
            $('.about-nav-cont span').mouseover(function () {

                $('.about-nav-cont > cite:nth-child(' + ($(this).index() + 5) + ')').css({ opacity: '1', transform: 'rotateX(360deg)' });
            }).mouseout(function () {
                $('.about-nav-cont > cite').css({ opacity: '0', transform: 'rotateX(0deg)' });


                for (var i = 0; i < 4; i++) {
                    if (i == about_nav_selected)
                        $('.about-nav-cont > cite:nth-child(' + (i + 5) + ')').css({ opacity: '1', transform: 'rotateX(360deg)' });
                }


            });

            $(".port-plus").mousedown(function () {
                $(this).css({ boxShadow: '0px 0px 0px 0px rgba(50, 50, 50, 0)' });
            }).mouseup(function () {
                $(this).css({ boxShadow: '-2px 1px 14px 0px rgba(50, 50, 50, 0.83)' });
            });

            $(".port-minus").mousedown(function () {
                $(this).css({ boxShadow: '0px 0px 0px 0px rgba(50, 50, 50, 0)' });
            }).mouseup(function () {
                $(this).css({ boxShadow: '0px -2px 13px -2px rgba(50, 50, 50, 0.83)' });
            });


            //port-number

        }

        else {

            if (run_once_flag == false) {
                run_once_flag = true;

                for (var i = 1; i <= 6; i++) {
                    $('.center-pics').append('<div class="center-circle-inner"><img src="images/photo' + i + '.jpg" width="500" height="500" alt="" /></div>');
                }

                $('.center-pics div:nth-child(1)').fadeIn(1000);
                small_view_clicks();
                play_slider();
            }



        }


    }
    load_for_first_time();


    $(window).resize(function () {
        if ($(window).innerWidth() < 1007) {
            clearInterval(rotatec);
            clearInterval(progress);

            $('.center-pics div:nth-child(' + prev_slide + ')').fadeIn(1000);
            small_view_clicks();
        }

        else {
            load_for_first_time();
            intialise_top_nav();
            clearInterval(rotatec);
            rotatecircle();
        }
        $('.design-left').height($('.left-select-inner').outerHeight());
        $('.design-right').height($('.left-select-inner').outerHeight());
    });


    var anim_flag = false;
    var arrow_click_flag = false;
    $('.arrow-down').unbind().click(function () {
        if (anim_flag == false) {
            if (cur_slide > 6)
                current_top = 110;

            anim_flag = true;
            $('.left-select-cont').stop(true, false).animate({ marginTop: current_top - 110 }, 600, 'linear', function () { arrow_click_flag = false; });
            current_top -= 110; anim_flag = false;
            clearInterval(rotateslider);
            cur_slide = Math.abs((current_top / 110) - 1);
            // alert(cur_slide);
            arrow_click_flag = true;
            rotate_slide();
            play_slider();
        }
    });

    $('.arrow-up').unbind().click(function () {
        if (anim_flag == false) {
            anim_flag = true;
            if (cur_slide <= 2)
                current_top = -660;


            $('.left-select-cont').stop(true, false).animate({ marginTop: current_top + 110 }, 600, 'linear', function () { arrow_click_flag = false; });
            current_top += 110; anim_flag = false;
            clearInterval(rotateslider);
            cur_slide = Math.abs((current_top / 110) - 1);
            //   alert(cur_slide);
            arrow_click_flag = true;
            rotate_slide();
            play_slider();

        }
    });

    $('.pic-frame').unbind().click(function () {
        if (anim_flag == false && !$(this).hasClass('pic-text') && $(this).index() != prev_slide) {
            anim_flag = true;
            current_top = $(this).index() * -110;
            $('.left-select-cont').stop(true, false).animate({ marginTop: current_top + 110 }, 600, 'linear', function () { arrow_click_flag = false; });
            current_top += 110; anim_flag = false;
            clearInterval(rotateslider);
            cur_slide = Math.abs((current_top / 110) - 1);
            arrow_click_flag = true;
            rotate_slide();
            play_slider();
        }
    });

    //.$('.left-select-inner div.pic-frame:nth-child(4)').position().top


    //   $('.center-home div:nth-child(2)').fadeIn(1000);
    //    play_slider();


    function play_slider() {
        clearInterval(rotateslider);
        rotateslider = setInterval(function () {
            rotate_slide();
        }, 6000);

    }

    function rotate_slide() {
        if (cur_slide > 6) {
            //  $('.center-circle div:nth-child(' + (7) + ')').fadeOut(600);
            cur_slide = 1;

            if (anim_flag == false && arrow_click_flag == false) {
                anim_flag = true;
                $('.left-select-cont').stop(true, false).animate({ marginTop: 0 }, 600, 'linear', function () {
                    current_top = 0; anim_flag = false;
                });
            }
        }
        else if (anim_flag == false && arrow_click_flag == false) {
            anim_flag = true;
            if (current_top >= -550) {
                $('.left-select-cont').stop(true, false).animate({ marginTop: current_top - 110 }, 600, 'linear', function () {
                    current_top -= 110; anim_flag = false;
                });
            }
            else {
                $('.left-select-cont').stop(true, false).animate({ marginTop: 0 }, 600, 'linear', function () {
                    current_top = 0; anim_flag = false;
                });
            }
        }


        $('.center-pics div:nth-child(' + prev_slide + ')').fadeOut(600);
        $('.center-pics div:nth-child(' + cur_slide + ')').delay(200).fadeIn(600);



        prev_slide = cur_slide;
        cur_slide += 1;
    }




    var fadeout_timeout1;
    var fadeout_timeout2;
    var prj_cur_slide = 1;
    var web_cur_slide = 1;

    var web_name = new Array();
    var web_prof = new Array();
    var web_role = new Array();
    var web_year = new Array();
    var web_link = new Array();

    web_name[0] = "Benzy Infotech"
    web_prof[0] = "Corporate Website"
    web_role[0] = "Team Lead, Javascript, jquery & content"
    web_year[0] = "2013"
    web_link[0] = "www.benzyinfotech.com"

    web_name[1] = "I-Master"
    web_prof[1] = "Product Website"
    web_role[1] = "Team Lead, Javascript & jquery & content"
    web_year[1] = "2013"
    web_link[1] = "www.imasterbms.com"

    web_name[2] = "Akbartravels.com"
    web_prof[2] = "Travel Booking Website"
    web_role[2] = "Jquery"
    web_year[2] = "2013-2014"
    web_link[2] = "www.akbartravels.com"


    var prj_name = new Array();
    var prj_prof = new Array();
    var prj_role = new Array();
    var prj_year = new Array();
    var prj_link = new Array();

    prj_name[0] = "I-Master"
    prj_prof[0] = "Building and home automation system"
    prj_role[0] = "Team Lead, System architect"
    prj_year[0] = "2012- current"
    prj_link[0] = "http://imasterbms.com/"


    prj_name[1] = "Techfest 2010 ANTZ"
    prj_prof[1] = "World Competition"
    prj_role[1] = "Team Lead, Mechanical and Algorithm"
    prj_year[1] = "2010"
    prj_link[1] = "https://www.youtube.com/watch?v=27lzanTlHbY"


    prj_name[2] = "Warman 2009"
    prj_prof[2] = "Inter university Competition"
    prj_role[2] = "Team Lead, Design and Electrical"
    prj_year[2] = "2009"
    prj_link[2] = "https://www.youtube.com/watch?v=wLQrJeohsDQ"



    function port_click_common(slide, index) {

        $('div.port-number:eq(' + index + '),div.port-cover:eq(' + index + ')').stop(true, false).fadeIn(300);
        $('div.port-number:eq(' + index + ')').stop(true, false).animate({ opacity: '1' }, 300);
        $('div.port-cover:eq(' + index + ')').stop(true, false).animate({ opacity: '0.7' }, 300);
        $('div.port-numb-circle:eq(' + index + ')').text(slide);

        $('ul.port-hover-list:eq(' + index + ')').text('');

        $('.port-hover-cir:eq(' + index + ')').text(slide);
        if (index == 0) {
            $('ul.port-hover-list:eq(' + index + ')').append('<li><b>NAME: </b>' + web_name[slide - 1] + ' </li>');
            $('ul.port-hover-list:eq(' + index + ')').append('<li><b>PROFILE: </b>' + web_prof[slide - 1] + ' </li>');
            $('ul.port-hover-list:eq(' + index + ')').append('<li><b>MY ROLE: </b>' + web_role[slide - 1] + ' </li>');
            $('ul.port-hover-list:eq(' + index + ')').append('<li><b>YEAR: </b>' + web_year[slide - 1] + ' </li>');
            $('ul.port-hover-list:eq(' + index + ')').append('<li><b>LINK: </b><a href="http://' + web_link[slide - 1] + '" target="_blank">' + web_link[slide - 1] + '</a></li>');
        }

        else {
            $('ul.port-hover-list:eq(' + index + ')').append('<li><b>NAME: </b>' + prj_name[slide - 1] + ' </li>');
            $('ul.port-hover-list:eq(' + index + ')').append('<li><b>PROFILE: </b>' + prj_prof[slide - 1] + ' </li>');
            $('ul.port-hover-list:eq(' + index + ')').append('<li><b>MY ROLE: </b>' + prj_role[slide - 1] + ' </li>');
            $('ul.port-hover-list:eq(' + index + ')').append('<li><b>YEAR: </b>' + prj_year[slide - 1] + ' </li>');
            $('ul.port-hover-list:eq(' + index + ')').append('<li><b>LINK: </b><a href="' + prj_link[slide - 1] + '" target="_blank">' + prj_link[slide - 1] + '</a></li>');
        }
    }

    $("div.port-plus:eq(0), div.web-plus:eq(0)").click(function () {
        if (prj_cur_slide >= 3)
            prj_cur_slide = 0;

        prj_cur_slide += 1;

        if ($(this).hasClass('port-plus'))
            if ($(".port-plus").index(this) == 0)
                port_click_common(prj_cur_slide, 1);
            else
                port_click_common(prj_cur_slide, 0);
        else
            port_click_common(prj_cur_slide, $(".web-plus").index(this));

        clearTimeout(fadeout_timeout1);

        if ($(this).hasClass('port-plus')) {
            fadeout_timeout1 = setTimeout(function () {
                $('div.port-number:eq(1),div.port-cover:eq(1)').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(1) img').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(1) img:nth-child(' + prj_cur_slide + ')').stop(true, false).fadeIn(300);
            }, 600);
        }
        else {
            fadeout_timeout1 = setTimeout(function () {
                $('div.port-number:eq(0),div.port-cover:eq(0)').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(0) img').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(0) img:nth-child(' + prj_cur_slide + ')').stop(true, false).fadeIn(300);
            }, 600);
        }


    });


    $("div.port-plus:eq(1), div.web-plus:eq(1)").click(function () {
        if (web_cur_slide >= 3)
            web_cur_slide = 0;

        web_cur_slide += 1;
        if ($(this).hasClass('port-plus'))
            if ($(".port-plus").index(this) == 0)
                port_click_common(web_cur_slide, 1);
            else
                port_click_common(web_cur_slide, 0);
        else
            port_click_common(web_cur_slide, $(".web-plus").index(this));


        clearTimeout(fadeout_timeout2);

        if ($(this).hasClass('port-plus')) {
            fadeout_timeout2 = setTimeout(function () {
                $('div.port-number:eq(0),div.port-cover:eq(0)').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(0) img').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(0) img:nth-child(' + web_cur_slide + ')').stop(true, false).fadeIn(300);
            }, 600);
        }
        else {
            fadeout_timeout2 = setTimeout(function () {
                $('div.port-number:eq(1),div.port-cover:eq(1)').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(1) img').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(1) img:nth-child(' + web_cur_slide + ')').stop(true, false).fadeIn(300);
            }, 600);
        }

    });

    $("div.port-minus:eq(0),div.web-minus:eq(0)").click(function () {

        if (prj_cur_slide <= 1)
            prj_cur_slide = $('div.port-proj-cont:eq(0)  img').length + 1;

        prj_cur_slide -= 1;

        if ($(this).hasClass('port-minus'))
            if ($(".port-minus").index(this) == 0)
                port_click_common(prj_cur_slide, 1);
            else
                port_click_common(prj_cur_slide, 0);
        else
            port_click_common(prj_cur_slide, $(".web-minus").index(this));


        clearTimeout(fadeout_timeout1);

        if ($(this).hasClass('port-minus')) {
            fadeout_timeout1 = setTimeout(function () {
                $('div.port-number:eq(1),div.port-cover:eq(1)').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(1) img').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(1) img:nth-child(' + prj_cur_slide + ')').stop(true, false).fadeIn(300);
            }, 600);
        }
        else {
            fadeout_timeout1 = setTimeout(function () {
                $('div.port-number:eq(0),div.port-cover:eq(0)').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(0) img').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(0) img:nth-child(' + prj_cur_slide + ')').stop(true, false).fadeIn(300);
            }, 600);
        }


    });


    $("div.port-minus:eq(1),div.web-minus:eq(1)").click(function () {
        if (web_cur_slide <= 1)
            web_cur_slide = $('div.port-proj-cont:eq(0)  img').length + 1;

        web_cur_slide -= 1;
        if ($(this).hasClass('port-minus'))
            if ($(".port-minus").index(this) == 0)
                port_click_common(web_cur_slide, 1);
            else
                port_click_common(web_cur_slide, 0);
        else
            port_click_common(web_cur_slide, $(".web-minus").index(this));

        clearTimeout(fadeout_timeout2);
        if ($(this).hasClass('port-minus')) {
            fadeout_timeout2 = setTimeout(function () {
                $('div.port-number:eq(0),div.port-cover:eq(0)').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(0) img').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(0) img:nth-child(' + web_cur_slide + ')').stop(true, false).fadeIn(300);
            }, 600);
        }
        else {
            fadeout_timeout2 = setTimeout(function () {
                $('div.port-number:eq(1),div.port-cover:eq(1)').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(1) img').stop(true, false).fadeOut(300);
                $('div.port-proj-cont:eq(1) img:nth-child(' + web_cur_slide + ')').stop(true, false).fadeIn(300);
            }, 600);
        }

    });

    $('.left-nav-tab').click(function () {

        if (parseInt($('.left-select-main').css('margin-left')) != 0) {
            $('.center-pics').stop(true, false).animate({ marginLeft: '-118' });
            $('.left-select-main').stop(true, false).animate({ marginLeft: '0' });
        }

        else {
            $('.center-pics').stop(true, false).animate({ marginLeft: '-202' });
            $('.left-select-main').stop(true, false).animate({ marginLeft: '-160px' });
        }
    });

    $('.design-left').height($('.left-select-inner').outerHeight());
    $('.design-right').height($('.left-select-inner').outerHeight());

});
