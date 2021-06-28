// import { showSnackbar } from './snackbar';
$(document).ready(function() {
    $(".NormalMode").attr("disabled", true);
    var initialTitle;
    var initialDesc;
    var initialContact;
    var initialCity;
});

function OnEdit(element, editPostId) {
    console.log("onedit clicked");
    if (element.innerHTML == "Edit") {
        // $(".NormalMode").attr('disabled', false);
        $(".editPostInput" + editPostId).attr("disabled", false);
        $(".editPostInput" + editPostId)
            .addClass("EditMode")
            .removeClass("NormalMode");
        element.innerHTML = "Save";
        element.style.backgroundColor = "green";
        initialTitle = $("#titleEdit" + editPostId).val();
        initialDesc = $("#descEdit" + editPostId).val();
        initialContact = $("#contactEdit" + editPostId).val();
        initialCity = $("#cityEdit" + editPostId).val();
        document.getElementById("deleteBtn" + editPostId).innerHTML = "Cancel";
    } else if (element.innerHTML == "Save") {
        var editedTitle = $("#titleEdit" + editPostId).val();
        var editedDesc = $("#descEdit" + editPostId).val();
        var editedContact = $("#contactEdit" + editPostId).val();
        var editedCity = $("#cityEdit" + editPostId).val();
        element.style.backgroundColor = "rgb(11, 34, 136)";
        $(".editPostInput" + editPostId).attr("disabled", true);
        $.ajax({
            url: "/editPost/Edit",
            type: "POST",
            data: {
                editPostId: editPostId,
                editedTitle: editedTitle,
                editedDesc: editedDesc,
                editedContact: editedContact,
                editedCity: editedCity,
            },
            success: function(res) {
                console.log(res);
                // showSnackbar(res);
                $("#titleEdit" + editPostId).val(editedTitle);
                $("#descEdit" + editPostId).val(editedDesc);
                $("#contactEdit" + editPostId).val(editedContact);
                $("#cityEdit" + editPostId).val(editedCity);
                document.getElementById("editBtn" + editPostId).innerHTML = "Edit";
                document.getElementById("deleteBtn" + editPostId).innerHTML = "Delete";
                $(".editPostInput" + editPostId)
                    .addClass("NormalMode")
                    .removeClass("EditMode");
            },
        });
    }
}

function OnDelete(element, editPostId) {
    console.log("onDelete clicked");
    if (element.innerHTML == "Cancel") {
        $("#titleEdit" + editPostId).val(initialTitle);
        $("#descEdit" + editPostId).val(initialDesc);
        $("#contactEdit" + editPostId).val(initialContact);
        $("#cityEdit" + editPostId).val(initialCity);
        $(".editPostInput" + editPostId).attr("disabled", true);
        element.innerHTML = "Delete";
        $(".editButton").css("background-color", "rgb(11, 34, 136)");
        document.getElementById("editBtn" + editPostId).innerHTML = "Edit";
        $(".editPostInput" + editPostId)
            .addClass("NormalMode")
            .removeClass("EditMode");
    } else if (element.innerHTML == "Delete") {
        //Show DialogBox Are you Sure.
        showDialogBox("deletePost", editPostId);
    }
}
// $('#g-post_container').click(function() {
// $('#g-PostImg').click(function() {
//     console.log('clicked');
//     $('#z-post_container').css('display', 'block');
//     alert("clicked! Let zoom");
// });