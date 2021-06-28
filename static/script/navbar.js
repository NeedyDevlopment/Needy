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
        document.location.href = "/createPost";
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

    // for burger icon and below navbar
    var div = $(".flexible");
    $(".burgerIcon").click(function() {
        if (div.attr("shown") == "true") {
            div.hide(400);
            div.attr("shown", false);
        } else {
            div.show(300);
            div.attr("shown", true);
        }
    });
    if ($(document).width() < 768) {
        div.hide();
        div.attr("shown", false);
        $(".burgerIcon").css("visibility", "visible");
        $(".burgerIcon").css("display", "flex");
    }
});