function showSnackbar(message) {
    console.log('snackbar called');
    var snackbar = document.getElementById('snackbar');
    snackbar.innerText = message;
    snackbar.classList.add('show-snackbar');

    setTimeout(function() {
        snackbar.classList.remove('show-snackbar');
    }, 3500);
}