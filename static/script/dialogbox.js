function showDialogBox(message) {
    if (message == "logout") {
        $("#d-info").innerHTML = "Are you Sure,really want to Logout?";
    }
    if (message == "deletePost") {
        $("#d-info").innerHTML = "Are you Sure,really want to Delete this post?";
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