$(document).ready(function () {
  $("#close").click(function () {
    $(".followersFollowing").css("display", "none");
  });
  $(".followersDiv").click(function () {
    $(".followersFollowing").css("display", "block");
  });
  $(".followingDiv").click(function () {
    $(".followersFollowing").css("display", "block");
  });
});
