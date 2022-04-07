$(document).ready(function () {
  $(".followersDiv").click(function () {
    var id = $(this).attr("id");
    $.ajax({
      type: "post",
      data: { id: id },
      url: "/profile/showProfileFollowers",
      success: function (data) {
        $(".followersFollowing").html(data);
        wrap("../static/script/f_list.js");
        $(".followersFollowing").css("display", "block");
      },
    });
  });
  $(".followingDiv").click(function () {
    var id = $(this).attr("id");
    $.ajax({
      type: "post",
      data: { id: id },
      url: "/profile/showProfileFollowings",
      success: function (data) {
        $(".followersFollowing").html(data);
        wrap("../static/script/f_list.js");
        $(".followersFollowing").css("display", "block");
      },
    });
  });
  if (screen.width < 641) {
    $(".followersFollowing").height($(".container").height());
  }
  $(".follow_button").click(function () {
    var user_id = $(this).attr("value");
    onClickFollow($(this)[0], user_id);
  });
});

function onClickFollow(element, creatorId) {
  var currentUserId = $(".profileDetails").attr("id");
  if (creatorId !== currentUserId) {
    $.ajax({
      url: "/ajax/" + element.innerText,
      type: "POST",
      data: { creatorId: creatorId, postId: "123456789012" },
      success: function (totalFollowers) {
        showSnackbar(element.innerText + " Successfully", "success");
        $("#f_btn" + creatorId).text() === "Follow" ? $("#f_btn" + creatorId).text("Unfollow") : $("#f_btn" + creatorId).text("Follow");
      },
      error: function (xhr, status, error) {
        if (error === "Unauthorized") showSnackbar("You Are not LoggedIn!", "failure");
        else showSnackbar("something Went Wrong!", "failure");
      },
    });
  } else {
    showSnackbar("You Can't Follow Your Self !", "failure");
  }
}
