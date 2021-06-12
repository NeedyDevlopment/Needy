$(document).ready(function () {
  //   var element = document.getElementById("profilebtn");
  //   element.classList.add("active");
  $("input").attr("disabled", true);
  $("#saveBtn").hide();
  $("#cancelBtn").hide();
  $(".cameraIcon").css("opacity", 0);
  $("input").click(function () {
    $("input").removeClass("active");
    $(this).addClass("active");
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