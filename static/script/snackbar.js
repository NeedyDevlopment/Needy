function showSnackbar(message, condition) {
    console.log("snackbar called");
    var snackbar = document.getElementById("snackbar");
    if (condition == "success") {
        snackbar.style.backgroundColor = "#5cb85c";
    }
    if (condition == "failure") {
        snackbar.style.backgroundColor = "#d9534f";
    }
    snackbar.innerText = message;
    snackbar.classList.add("show-snackbar");

    setTimeout(function() {
        snackbar.classList.remove("show-snackbar");
    }, 3000);
}