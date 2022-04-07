var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
$(document).ready(function() {
    $(".passinput").attr("disabled", false)
    $(".passbtn").click(function() {
        var newpass = $("#newpass").val();
        var oldpass = $("#oldpass").val();
        var conpass = $("#conpass").val();
        var errorDisplay = $("#errorDisplay");

        if ($("#oldpass").val().trim() == "") {
            errorDisplay.text("Old Password is required");
        } else if ($("#newpass").val().trim() == "") {
            errorDisplay.text("New Password is required");
        } else if ($("#conpass").val().trim() == "") {
            errorDisplay.text("Confirm Password is required");
        } else if (newpass != conpass) {
            errorDisplay.text("Password Must be Same");
        }
        // var email = $("#email").val();
        else if (Invalidnewpass(newpass)) {

            $("#errorDisplay").text("");
            $(this).attr("disabled", true);
            $.ajax({
                type: "post",
                data: { oldPassword: oldpass, newPassword: newpass },
                url: "/pwOperation/changepassword",
                success: function(data) {
                    if (data.error) {
                        errorDisplay.text(data.error);
                        $(".passbtn").attr("disabled", false);


                    } else if (data.success) {
                        showSnackbar(data.success, "success");
                        $("#myModal").css("display", "none");
                    }
                },
            });


        } else {
            $("#errorDisplay").text("Must contain at least one number and uppercase and lowercase letter and one special, and at least 7 or more characters");
        }
    });
});


function Invalidnewpass(text) {

    var pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return text.match(pass);
}