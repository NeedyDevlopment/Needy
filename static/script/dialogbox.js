function showDialogBox(message, editPostId) {
  if (message == "logout") {
    $("#d-info").text("Are you Sure,really want to Logout?");
    if ($("#continueDialogBtn a").attr("href") == "#") {
      $("#continueDialogBtn a").attr("id", "continueDialogLink");
      $("#continueDialogBtn a").attr("href", "/logout");
    }
  }
  if (message == "deletePost") {
    $("#d-info").text("Are you Sure,really want to Delete this post?");
    $("#continueDialogBtn a").attr("id", "deletePostButton");
    $("#continueDialogBtn a").attr("value", editPostId);
    $("#continueDialogBtn a").attr("href", "#");
  }
  document
    .getElementsByClassName("w3-modal-content")[0]
    .classList.replace("w3-animate-zoom-out", "w3-animate-zoom");
  document.getElementById("id01").style.display = "block";
}

function onCloseDialogBox() {
  document
    .getElementsByClassName("w3-modal-content")[0]
    .classList.replace("w3-animate-zoom", "w3-animate-zoom-out");
  setTimeout(() => {
    document.getElementById("id01").style.display = "none";
  }, 500);
}

function onCancelLogoutDialogBox() {
  document
    .getElementsByClassName("w3-modal-content")[0]
    .classList.replace("w3-animate-zoom", "w3-animate-zoom-out");
  setTimeout(() => {
    document.getElementById("id01").style.display = "none";
  }, 500);

  return;
}

function onContinueLogoutDialogBox() {
  document.getElementById("id01").style.display = "none";
}

function onContinueDeleteDialogBox(editPostId) {
  console.log("inside delete action and postId is");
  $.ajax({
    url: "/editPost/Delete",
    type: "POST",
    data: { editPostId: editPostId },
    success: function (res) {
      $(".post" + editPostId).remove();
      console.log(res);
      showSnackbar(res.message);
      setUpdatedTotalPostAndTotalActivity(editPostId);
    },
  });
  document.getElementById("id01").style.display = "none";
}

function setUpdatedTotalPostAndTotalActivity(deletedpostId) {
  $(".activity_post" + deletedpostId).remove();
  var totalPost = document.getElementsByClassName("singlePost").length;
  var totalActivity = document.getElementsByClassName("singleActivity").length;
  $("#totalPostCount").text("TOTAL POSTS : " + totalPost);
  $("#totalActivityCount").text("TOTAL ACTIVITIES : " + totalActivity);
}

$(document).ready(function () {
  $("#dialogCancel").click(function () {
    onCancelLogoutDialogBox();
  });
  document
    .getElementById("continueDialogBtn")
    .addEventListener("click", function () {
      onContinueLogoutDialogBox();
    });
  document
    .getElementsByClassName("dialogBoxCancelButton")[0]
    .addEventListener("click", function () {
      onCloseDialogBox();
    });
  if (document.getElementById("deletePostButton")) {
    document
      .getElementById("deletePostButton")
      .addEventListener("click", function () {
        onContinueDeleteDialogBox(this.attributes["value"].value);
      });
  }
});
