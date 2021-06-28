$(document).ready(function () {
  var element = document.getElementById("profilebtn");
  element.classList.add("active");
  if ($("#forSnackBarCalling").text()) {
    showSnackbar($("#forSnackBarCalling").text());
  }
  $("input").attr("disabled", true);
  $("#saveBtn").hide();
  $("#cancelBtn").hide();
  $(".cameraIcon").css("opacity", 0);
  $("input").click(function () {
    $("input").removeClass("activeInput");
    $(this).addClass("activeInput");
  });

  $("#editBtn").click(function () {
    $("input").attr("disabled", false);
    $("#email").attr("disabled", true);
    $(".cameraIcon").css("opacity", 0.5);
    $("#saveBtn").show(400);
    $("#cancelBtn").show(400);
    $("#editBtn").hide(400);
    $("#changePass").hide(400);
    $("#deleteBtn").hide(400);
  });
  $("#cancelBtn").click(function () {
    $("input").attr("disabled", true);
    $("#saveBtn").hide(400);
    $("#cancelBtn").hide(400);
    $(".cameraIcon").css("opacity", 0);
    $("#editBtn").show(400);
    $("#changePass").show(400);
    $("#deleteBtn").show(400);
    $("input").removeClass("active");
  });
});

function onClickOnDelete() {
  document.getElementById("deleteAccountConfirmation").style.display = "block";
}
function onCloseDialogBox() {
  document.getElementById("deleteAccountConfirmation").style.display = "none";
}

function onCancelDeleteDialogBox() {
  document.getElementById("deleteAccountConfirmation").style.display = "none";
  return;
}

function onContinueDeleteDialogBox() {
  document.getElementById("deleteAccountConfirmation").style.display = "none";
}

$(document).ready(function () {
  $("#changePass").click(function () {
    $.ajax({
      type: "post",
      url: "/showModal/changePasswordModal",
      success: function (data) {
        $(".modal-content").html(data);

        $("#myModal").css("display", "block");
      },
    });
  });
});
