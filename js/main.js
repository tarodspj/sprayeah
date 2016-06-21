/*jslint browser: true*/
/*global $, jQuery, alert, console*/
var delay =                 1300,
    timeoutId1,
    timeoutId2,
    animationIsFinished =   false,
    videoActual =           1;
    //videos = [['hBIFZ14xAng', 'Lanzamiento'], ['5AyxnG--FaY', 'Discoteca'], ['mLjyABX8Rno','Sofá'], ['dn_kxyt2Uo4','Colegio'], ['J26pQ6I4kYs','Cama']];

function detectmob() {
    if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
     
    } else {
        return false;
    }
}
function getIdVideo(videoIndex) {
    var $miniatura =        $('.miniatura'),
        $myMiniatura =       $miniatura.eq((videoIndex-1));
    
    $('.miniatura').removeClass('active');
    $myMiniatura.addClass('active');
    
    return $myMiniatura.attr('data-video');
}

function changeVideo(videoId, indexVideo) {
    "use strict";
    $('.video').attr('src', 'https://www.youtube.com/embed/' + videoId + '?rel=0&showinfo=0');
    $('#actualVideo').text(indexVideo);
}
 
function clearStyleSpray(whatSpray) {
    whatSpray.removeClass('animado');
    whatSpray.attr('style', '');
}

function disabledScroll() {
    "use strict";
    $.fn.fullpage.setMouseWheelScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);
}
function enableScroll() {
    "use strict";
    $.fn.fullpage.setMouseWheelScrolling(true);
    $.fn.fullpage.setAllowScrolling(true);
}

function enableAutoScrolling() {
    "use strict";
    $('#fullpage .section').each(function (index, value) {
        var id = $(this).attr('id');
        if ($(this).attr('data-anchor') !== undefined) {
            $(this).attr('id', 'fullpaged-' + id);
        }
    });
}

function setOut() {
    "use strict";
    var widthDocument =          $('#liberoSpray').width(),
        $sprayFirst =            $('#sprayFirst'),
        left =                   widthDocument + $sprayFirst.width();
    
    if (!$sprayFirst.hasClass('animado')) {
        $sprayFirst.addClass('animado');
        $sprayFirst.animate(
            {
                left: left
            },
            3000,
            function () {
                //$sprayFirst.removeClass('animado');
                //$sprayFirst.attr('style', '');
                clearStyleSpray($sprayFirst);
            }
        );
    }    
}

function setLeft() {
    "use strict";
    disabledScroll();
    animationIsFinished =       false;
    
    var widthDocument =          $('#liberoSpray').width(),
        $sprayFirst =            $('#sprayFirst'),
        left =                   0;

    if (!$sprayFirst.hasClass('animado')) {
        left =                      (widthDocument / 2) - ($sprayFirst.width() / 2);
        $sprayFirst.addClass('animado');
        $sprayFirst.animate(
            {
                left: left
            },
            3000,
            function () {
                $sprayFirst.removeClass('animado');
                $('#goTo2').addClass('active');

                enableScroll();
            }
        );
    }
}

function setOut2() {
    "use strict";
    
    var widthDocument =         $('#liberoSpray').width(),
        $sprayLast =            $('#sprayLast'),
        right =                 widthDocument + $sprayLast.width();
    
    if (!$sprayLast.hasClass('animado')) {
        $sprayLast.addClass('animado');
        console.log(right);
        $sprayLast.animate(
            {
                right: right
            },
            3000,
            function () {
                clearStyleSpray($sprayLast);
            }
        );
    }
}

function setRight() {
    "use strict";
    if (!$('#liberoSpray').hasClass('mov')) {
        disabledScroll();
        animationIsFinished = false;

        var widthDocument =          $('#liberoSpray').width(),
            $sprayLast =            $('#sprayLast'),
            right =                   0;
        //$sprayFirst.attr('style','');
        if (!$sprayLast.hasClass('animado')) {
            right =                      (widthDocument / 2) - ($sprayLast.width() / 2);
            $sprayLast.addClass('animado');
            //$sprayFirst.css('left',left + 'px');
            $sprayLast.animate(
                {
                    right: right
                },
                3000,
                //'easeOutCubic',
                function () {
                    $sprayLast.removeClass('animado');
                    //clearStyleSpray($sprayLast);
                    enableScroll();
                }
            );
        }
    }
}

function toggleMenuSite(action) {
    "use strict";
    var $menuContainer =    $('#menuContainer'),
        $openMenu =         $('#openMenu');
    if (action === 'open') {
        $menuContainer.removeClass('oculto');
        $openMenu.addClass('visible').removeClass('hide');
        
    } else if (action === 'close') {
        $menuContainer.addClass('oculto');
        $openMenu.removeClass('visible');
    } else if (action === 'show') {
        $openMenu.removeClass('hide');
    } else {
        $menuContainer.toggleClass('oculto');
        $openMenu.toggleClass('visible');
    }
}

$(document).ready(function () {
    "use strict";
    if (detectmob()) {
        $('#liberoSpray').addClass('mov');
    }
    
    $('#fullpage').fullpage({
        //css3: false,
        anchors: ['home', 'anuncio', 'consigue-tu-spray', 'la-revista'],
        //touchSensitivity: 25,
        resize : true,
        easing: 'swing',
        menu: '#myMenu',
        autoScrolling: true,
        afterRender: enableAutoScrolling,
        afterLoad: function (anchorLink, index) {
            animationIsFinished = false;
            
            var $sprayFirst =               $('#sprayFirst');
            $sprayFirst.removeClass('lanzado');
            
            if (index === 1) {
                setLeft();
                disabledScroll();
            } else {
                $('#sprayFirst').attr('style', '');
            }
            if (index === 4) {
                setRight();
                if (!$('#liberoSpray').hasClass('mov')) {
                    disabledScroll();
                }
            } else {
                $('#sprayLast').attr('style', '');
            }
        },
        onLeave: function (index, nextIndex, direction) {

            var curTime =               new Date().getTime(),
                $sprayFirst =           $('#sprayFirst');
            
            if (nextIndex === 1) {
                toggleMenuSite('close');
                $('#openMenu').addClass('hide');
                $.fn.fullpage.moveTo(nextIndex);
            }
            if (index === 1) {
                if (!$sprayFirst.hasClass('lanzado')) {
                    $sprayFirst.addClass('lanzado');
                    setOut();
                    clearTimeout(timeoutId1);

                    timeoutId1 = setTimeout(function () {
                        animationIsFinished = true;
                        $.fn.fullpage.moveTo(nextIndex);
                        
                        if (direction === 'down') {
                            if (!$('#liberoSpray').hasClass('mov')) {
                                toggleMenuSite('show');
                            }
                        }
                    }, delay);
                }
                //toggleMenuSite('open');
                return animationIsFinished;
            } else {
                animationIsFinished = false;
            }
        }
    }); //fullpage

    $.backstretch("./img/bg.jpg");

    $('#closeMenu, #openMenu, #menuContainer li').on('click', function () {
        toggleMenuSite();
    });
    
    $('.goNext').on('click', function () {
        $.fn.fullpage.moveSectionDown();
    });

    $('.miniatura').on('click', function () {

        var $this =         $(this),
            videoId =       $this.attr('data-video'),
            indexThis =     $this.index() + 1;
        
        $('.miniatura').removeClass('active');
        $this.addClass('active');
        changeVideo(videoId, indexThis);
    });
    $('#prev').on('click', function () {
        videoActual =       videoActual - 1;
        
        if (videoActual < 1) {
            videoActual =   5;
        }
        var videoId =       getIdVideo(videoActual);
        changeVideo(videoId, videoActual);
    });
    $('#next').on('click', function () {
        videoActual =       videoActual + 1;
        
        if (videoActual > 5) {
            videoActual =   1;
        }
        var videoId =       getIdVideo(videoActual);
        changeVideo(videoId, videoActual);
    });

    $('#shareFacebook').on('click', function () {
        var title = 'Líbero Spray',
            descr = 'He encontrado mi aliado perfecto, Líbero Spray. Si quieres marcar la distancia reglamentaria, comparte y #Sprayeah. Saca tu lado más creativo y consigue uno de los 3 que sortean cada día. http://spray.revistalibero.com',
            url = 'https://youtu.be/hBIFZ14xAng',
            image = 'http://spray.revistalibero.com/img/share.jpg';

        fbShare(url, title, descr, image);
    });
    
    //$('.video').attr('src', 'https://www.youtube.com/embed/5AyxnG--FaY?rel=0&showinfo=0');
    //https://www.youtube.com/embed/5AyxnG--FaY?rel=0&showinfo=0
}); //ready

window.fbAsyncInit = function () {
    FB.init({
        appId      : '1537696426536345',
        status     : true,
        xfbml      : true,
        version    : 'v2.4' // or v2.0, v2.1, v2.2, v2.3
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/es_ES/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function fbShare(url, title, descr, image) {
    FB.ui({
        method: 'feed',
        //link: 'http://spray.revistalibero.com',
        link: url,
        caption: title,
        name: title,
        description: descr,
        picture: image
    }, function (response) {
        //console.log(response);
    });
    /*
    FB.ui({
        method: 'share_open_graph',
        action_type: 'video.watches',
        action_properties: JSON.stringify({
            video: url,
            name: title,
            description: descr,
            picture: image
        })
    }, function(response) {
        console.log(response);
    });
    */
}
//
//function twShare(url, text, winWidth, winHeight) {
//    var winTop = (screen.height / 2) - (winHeight / 2),
//        winLeft = (screen.width / 2) - (winWidth / 2);
//    window.open('http://twitter.com/share?url=' + url + '&text=' + text, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
//}