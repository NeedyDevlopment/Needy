function showDialogBox(message, editPostId) {
    if (message == "logout") {
        $("#d-info").text("Are you Sure,really want to Logout?");
        if ($("#continueDialogLink").attr('href') == "#") {
            $("#continueDialogBtn").attr('onclick', 'onContinueLogoutDialogBox()');
            $("#continueDialogLink").attr('href', '/logout');
        }
    }
    if (message == "deletePost") {
        $("#d-info").text("Are you Sure,really want to Delete this post?");
        $("#continueDialogBtn").attr('onclick', 'onContinueDeleteDialogBox("' + editPostId + '")');
        $("#continueDialogLink").attr('href', '#');
    }
    document.getElementById("id01").style.display = "block";
}

function onCloseDialogBox() {
    document.getElementById("id01").style.display = "none";
}

function onCancelLogoutDialogBox() {
    // document.getElementsByClassName("w3-animate-zoom")[0].classList.replace('w3-animate-zoom', 'w3-animate-zoomOut');
    document.getElementById("id01").style.display = "none";

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
        success: function(res) {
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
    var totalPost = document.getElementsByClassName('singlePost').length;
    var totalActivity = document.getElementsByClassName('singleActivity').length;
    $("#totalPostCount").text('TOTAL POSTS : ' + totalPost);
    $("#totalActivityCount").text('TOTAL ACTIVITIES : ' + totalActivity);
}