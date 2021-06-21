$(".close").click(function() {
    $("#myModal").css("display", "none");
});

$(window).click(function(event) {
    if (event.target == document.getElementById("myModal")) {
        $("#myModal").css("display", "none");
    }
});
$("#forgotPassword").click(function() {
    $.ajax({
        type: "post",
        url: "/forgotPassword",
        success: function(data) {
            $(".modal-content").html(data);
        },
    });
});