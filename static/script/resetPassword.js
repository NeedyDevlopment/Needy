$(".close").click(function () {
  $("#myModal").css("display", "none");
});
$(window).click(function (event) {
  if (event.target == document.getElementById("myModal")) {
    $("#myModal").css("display", "none");
  }
});
$(document).ready(function () {
  $(".resetPasswordFormSubmit").click(function () {
    var rPassword = $("#rPassword").val();
    var cPassword = $("#cPassword").val();
    var email = $("#email").val();
    if (!Invalidpass(rPassword)) {
      if (rPassword == cPassword) {
        $("#errorDisplay").text("");
        $(this).attr("disabled", true);
        $.ajax({
          type: "post",
          data: { email: email, password: rPassword },
          url: "/resetPassword",
          success: function (data) {
            if (data.error) {
              showSnackbar(data.error);
              $("#myModal").css("display", "none");
            } else if (data.success) {
              showSnackbar(data.success);
              $("#myModal").css("display", "none");
            }
          },
        });
      } else {
        $("#errorDisplay").text("Both Password should Be same!");
      }
    } else {
      $("#errorDisplay").text(Invalidpass(rPassword));
    }
  });
});

function Invalidpass(password) {
  var pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  if (password === "") {
    return "Password Should Not Be Empty !";
  } else if (!password.match(pass)) {
    return "Must contain at least one number and uppercase and lowercase letter and one special, and at least 7 or more characters";
  } else {
    return "";
  }
}
