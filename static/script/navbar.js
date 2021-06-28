$(document).ready(function() {
    if ($("#loginbtn")) {
        $("#loginBtn").click(function() {
            $.ajax({
                method: "post",
                url: "/showModal/loginModal",
                success: function(data) {
                    $("#myModal").css("display", "block");
                    $(".modal-content").html(data);
                },
            });
        });
    }
    $("#home").click(function() {
        document.location.href = "/";
    });
    $("#catpost").click(function() {
        document.location.href = "/createpost";
    });
    $("#myActivity").click(function() {
        document.location.href = "/myactivity";
    });
    $("#contactUs").click(function() {
        document.location.href = "/contact";
    });
    $("#aboutUs").click(function() {
        document.location.href = "/";
    });
    $("#profilebtn").click(function() {
        document.location.href = "/profile";
    });
    $("#Singupbtn").click(function() {
        document.location.href = "/signup";
    });
    $("#body").css("min-height", window.innerHeight);
    $("#body").css(
        "padding-bottom",
        document.getElementById("footer").offsetHeight
    );
    // for burger icon and below navbar
    var div = $(".flexible");
    if (screen.width <= 768) {
        div.css("top", $(".navbar").height());
    }
    $(".burgerIcon").click(function() {
        if (screen.width <= 768) {
            if (div.css("visibility") == "visible") {
                div.addClass("animation_reverse");
                div.removeClass("animation");
                setTimeout(() => {
                    div.css("visibility", "hidden");
                }, 1000);
            } else {
                div.css("visibility", "visible");
                div.addClass("animation");
                div.removeClass("animation_reverse");
            }
        } else {
            div.css("visibility", "visible");
        }
    });
});