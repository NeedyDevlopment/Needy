document.addEventListener("DOMContentLoaded", function () {
    var element = document.getElementById("contactUs");
    element.classList.add("active");
    // var activity = document.getElementById("activity");
    // activity.style = "display:none;";
  });
function Invalidname(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a username is necessary!");
  } else {
    textbox.setCustomValidity("");
  }
}
function Invalidmail(textbox) {
  var x = document.getElementById('email').value;
  var atposition = x.indexOf("@");
  var dotposition = x.lastIndexOf(".");
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering an email is necessary!");
  } else if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= x.length
  ) {
    textbox.setCustomValidity("Please enter an email address which is valid!");
  } else {
    textbox.setCustomValidity("");
  }
}

function Invalidnumber(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a contact number is necessary!");
  } else {
    textbox.setCustomValidity("");
  }
}
function Invalidmess(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a message is necessary!");
  } else {
    textbox.setCustomValidity("");
  }
}
