/*jslint browser: true*/
/*global $, jQuery, alert, console*/

function enableAutoScrolling() {
    "use strict";
    $('#fullpage .section').each(function (index, value) {
        var id = $(this).attr('id');
        if ($(this).attr('data-anchor') !== undefined) {
            $(this).attr('id', 'fullpaged-' + id);
        }
    });
}

function toggleMenuSite() {
    "use strict";
    $('#menuContainer').toggleClass('oculto');
    $('#openMenu').toggleClass('visible');
}

$(document).ready(function () {
    "use strict";
    $('#fullpage').fullpage({
        //css3: false,
        anchors: ['section10', 'section20', 'section30', 'section40'],
        //touchSensitivity: 25,
        easing: 'swing',
        menu: '#myMenu',
        //autoScrolling: false,
        afterRender: enableAutoScrolling
    });
    
    $.backstretch("./img/bg.jpg");

    $('#closeMenu, #openMenu, #menuContainer li').on('click', function () {
        toggleMenuSite();
    });
    
    $('.goNext').on('click', function () {
        $.fn.fullpage.moveSectionDown();
    });

}); //ready

