$(document).ready(function() {
    document.getElementById("copy-link").addEventListener("click", function() {
        CopyToClipboard(this.attributes["value"].value);
    });
    document.getElementById("eBtn").addEventListener("click", function() {
        OnclickeBtn();
    });
    // for sending the email
    $("#SendText").click(function() {
        onEmailSend();
    });
    // for close the email
    $(".close").click(function() {
        onCloseEmailModal();
    });
});
var modalForEmail = document.getElementsByClassName("modalForEmail")[0];
var eBtn = document.getElementById("eBtn");
var span = document.getElementsByClassName("close")[0];

function OnclickeBtn() {
    console.log("eBtn clicked");
    const shareDialog = document.querySelector(".share-dialog");
    shareDialog.classList.remove("is-open");
}

function onCloseEmailModal() {
    // document.getElementsByClassName("modalForEmail")[0].style.display = "none";
    $("#emailError").css("display", "none");
    $("#recipientEmail").val("");
    $("#myModal").css("display", "none");
}
var isLoading = false;

function onEmailSend() {
    isLoading = true;
    $("#SendText").text("sending...");
    var recipientsEmail = $("#recipientEmail").val();
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            recipientsEmail
        )) {
        $("#emailError").css("display", "inline");
        $("#SendText").text("Send");
        return;
    }
    var postId = $("#getIdForSharePost").val();
    $.ajax({
        url: "/sendMail",
        type: "POST",
        data: { emailTo: recipientsEmail, postId: postId },
        success: function(res) {
            isLoading = false;
            $("#myModal").css("display", "none");
            console.log("success mail");
            showSnackbar(res.message, "success");
            $("#SendText").text("Send");
            $("#recipientEmail").val("");
        },
        error: function(error) {
            isLoading = false;
            // document.getElementsByClassName("modalForEmail")[0].style.display = "none";
            $("#myModal").css("display", "none");
            console.log("unsuccess mail");
            showSnackbar("post couldn't shared to " + recipientsEmail, "failure");
            $("#SendText").text("Send");
            $("#recipientEmail").val("");
        },
    });
}