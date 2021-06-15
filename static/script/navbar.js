$(document).ready(function () {
  if ($("#loginbtn")) {
    $("#loginBtn").click(function () {
      $.ajax({
        method: "post",
        url: "/loginModal",
        success: function (data) {
          $("#myModal").css("display", "block");
          $(".modal-content").html(data);
        },
      });
    });
  }
});
