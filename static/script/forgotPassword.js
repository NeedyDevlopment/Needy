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
  // for sending the OTP
  $("#OTPSEND").click(function () {
    var sendButton = $("#OTPSEND");
    var errorDisplay = $("#errorDisplay");
    if ($(".forgotEmail").val().trim() == "") {
      errorDisplay.text("Email is required");
    } else {
      var email = $(".forgotEmail").val();
      errorDisplay.text("");
      sendButton.attr("disabled", true);
      sendButton.text("Sending...");
      $.ajax({
        type: "post",
        url: "/sendOTP",
        data: { email: email },
        success: function (data) {
          if (data.error) {
            errorDisplay.text(data.error);
            sendButton.attr("disabled", false);
            sendButton.text("Send OTP");
          } else if (data.success) {
            var displayTime = 31;
            sendButton.text("Sent");
            errorDisplay.text("");
            $(".forgotEmail").attr("disabled", true);
            var interval = setInterval(() => {
              displayTime--;
              if (displayTime <= 0) {
                sendButton.text("Resend OTP");
                sendButton.attr("disabled", false);
                clearInterval(interval);
              } else {
                var displayString = "00" + ":" + displayTime;
                if (displayTime < 10) {
                  displayString = "00" + ":" + "0" + displayTime;
                }
                sendButton.text(displayString);
              }
            }, 1000);
          }
        },
      });
    }
  });

  $("#forgetFormSubmitButton").click(function (event) {
    event.preventDefault();
    var OTP =
      $("#otp1").val() + $("#otp2").val() + $("#otp3").val() + $("#otp4").val();
    $("#OTP").val(
      $("#otp1").val() + $("#otp2").val() + $("#otp3").val() + $("#otp4").val()
    );
    if (OTP) {
      $(this).attr("disabled", true);
      $("#errorDisplay").text("");
      var email = $(".forgotEmail").val();
      if (email.trim()) {
        $.ajax({
          type: "post",
          url: "/checkOTP",
          data: { OTP: OTP, email: email },
          success: function (data) {
            if (data.error) {
              $("#errorDisplay").text(data.error);
              $(this).attr("disabled", false);
            } else if (data.success) {
              $("#errorDisplay").css("color", "green");
              $("#errorDisplay").text(data.success);
              setTimeout(function () {
                $.ajax({
                  type: "post",
                  data: { email: email },
                  url: "/displayResetPassword",
                  success: function (data) {
                    $(".modal-content").html(data);
                  },
                });
              }, 3000);
            }
          },
        });
      } else {
        $("#errorDisplay").text("please Enter Email");
        return;
      }
    } else {
      $("#errorDisplay").text("please Enter OTP");
      return;
    }
  });
});
$(".close").click(function () {
  $("#myModal").css("display", "none");
});
$(window).click(function (event) {
  if (event.target == document.getElementById("myModal")) {
    $("#myModal").css("display", "none");
  }
});
