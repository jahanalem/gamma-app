import $ from "jquery";



$("#button1").on({
    'click': (evt: JQuery.Event): void => {
        if ($("#cats").css("left") === "-300px") {
            $("#cats").css("left", "0");

            $("#topmenu ul").slideUp();
        } else {
            $("#cats").css("left", "-300px");
        }
    }
});

$("#cats .plus").on({
    'click': (evt: JQuery.Event): void => {
        $(this).toggleClass("rotated-plus");
        $(this).parent().siblings("ul").slideToggle();
        evt.preventDefault();
    }
});

/*
$(function () {
    $("#button1").click(function () {
        if ($("#cats").css("left") === "-300px") {
            $("#cats").css("left", "0");

            $("#topmenu ul").slideUp();
        } else {
            $("#cats").css("left", "-300px");
        }
    });
});

$(function () {
    $("#button2").click(function () {
        $("#topmenu ul").slideToggle();
        $("#cats").css("left", "-300px");
    });
});

$(document).ready(function () {
    $("#cats .plus").click(function (event) {
        $(this).toggleClass("rotated-plus");
        $(this).parent().siblings("ul").slideToggle();
        event.preventDefault();
    });
});

*/