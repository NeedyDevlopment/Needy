$("#close").click(function () {
  $(".followersFollowing").css("display", "none");
});
$(".follow_button_flist").click(function () {
  var user_id = $(this).attr("value");
  console.log("F_list Button Clicked");
  onClickFollowFList($(this)[0], user_id);
});
function onClickFollowFList(element, creatorId) {
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
