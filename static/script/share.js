console.log("share.js runned..");
var modalForEmail = document.getElementsByClassName("modalForEmail")[0];

var eBtn = document.getElementById("eBtn");

var span = document.getElementsByClassName("close")[0];

function OnclickeBtn() {
    console.log('eBtn clicked');
    $.ajax({
            url: "/showModal/emailModal",
            type: "POST",
            success: function(emailModalPug) {
                $("#myModal").css("display", "block");
                $(".modal-content").html(emailModalPug);

            }
        })
        // document.getElementsByClassName("modalForEmail")[0].style.display = "block";
    const shareDialog = document.querySelector('.share-dialog');
    shareDialog.classList.remove('is-open');
}

function onCloseEmailModal() {
    document.getElementsByClassName("modalForEmail")[0].style.display = "none";
    $("#emailError").css("display", "none");
    $("#recipientEmail").val("");
};
window.addEventListener("click", function(event) {
    // console.log(event.target.id);
    if (event.target.id == "myModal") {
        // console.log('inside if');
        document.getElementsByClassName("modalForEmail")[0].style.display = "none";
    }
})
var isLoading = false;

function onEmailSend() {
    isLoading = true;
    $("#SendText").text('sending...');
    var recipientsEmail = $("#recipientEmail").val();
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(recipientsEmail)) {
        $("#emailError").css("display", "inline");
        $("#SendText").text('Send');
        return;
    }
    var postId = $('#getIdForSharePost').val();
    $.ajax({
        url: "/sendMail",
        type: "POST",
        data: { emailTo: recipientsEmail, postId: postId },
        success: function(res) {
            isLoading = false;
            document.getElementsByClassName("modalForEmail")[0].style.display = "none";
            console.log("success mail");
            showSnackbar(res.message);
            $("#SendText").text('Send');
            $("#recipientEmail").val("");
        },
        error: function(error) {
            isLoading = false;
            document.getElementsByClassName("modalForEmail")[0].style.display = "none";
            console.log("unsuccess mail");
            showSnackbar("post does not shared to " + recipientsEmail);
            $("#SendText").text('Send');
            $("#recipientEmail").val("");
        }
    })
}