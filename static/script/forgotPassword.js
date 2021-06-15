$(document).ready(function () {
  $(".partitioned").keydown("input", function (event) {
    const inputNubmer = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (event.key == "Backspace") {
      if ($("#otp4").val()) {
        $("#otp4").val("");
        $("#otp3").focus();
        return false;
      } else if ($("#otp3").val()) {
        $("#otp3").val("");
        $("#otp2").focus();
        return false;
      } else if ($("#otp2").val()) {
        $("#otp2").val("");
        $("#otp1").focus();
        return false;
      }
    } else if ($.inArray(event.key, inputNubmer) !== -1) {
      if ($("#otp3").val()) {
        $("#otp4").focus();
      } else if ($("#otp2").val()) {
        $("#otp3").focus();
      } else if ($("#otp1").val()) {
        $("#otp2").focus();
      }
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      event.preventDefault();
    }
    $("#OTP").val(
      $("#otp1").val() + $("#otp2").val() + $("#otp3").val() + $("#otp4").val()
    );
    console.log($("#OTP").val());
  });
  $(".partitioned").click(function () {
    if (!$("#otp1").val()) {
      $("#otp1").focus();
    } else if (!$("#otp2").val()) {
      $("#otp2").focus();
    } else if (!$("#otp3").val()) {
      $("#otp3").focus();
    } else if (!$("#otp4").val()) {
      $("#otp4").focus();
    }
  });
});
$(".close").click(function () {
  $("#myModal").css("display", "none");
});
$(window).click(function (event) {
  if (event.target == $("#myModal")) {
    $("#myModal").css("display", "none");
  }
});
