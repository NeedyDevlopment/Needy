document.addEventListener("DOMContentLoaded", function () {
  var element = document.getElementById("Singupbtn");
  element.classList.add("active");
  // var activity = document.getElementById("activity");
  // activity.style = "display:none;";
});
function InvalidMsg(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a username is necessary!");
  } else {
    textbox.setCustomValidity("");
  }
}
function InvalidEmail(textbox) {
  var x = document.form.email.value;
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
function Invalidcity(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a city is necessary!");
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
function Invalidplace(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a work place is necessary!");
  } else {
    textbox.setCustomValidity("");
  }
}


function Invalidpass(textbox) {
  var pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a password is necessary!");
  } else if (!textbox.value.match(pass)) {
    textbox.setCustomValidity(
      "Must contain at least one number and uppercase and lowercase letter and one special, and at least 7 or more characters"
    );
  } else {
    textbox.setCustomValidity("");
  }
}

function myFunction() {
  var x = document.getElementById("pass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function Invalidcpass(textbox) {
  var cpass = document.getElementById("pass").value;
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a confirm password is necessary!");
  } else if (!textbox.value.match(cpass)) {
    textbox.setCustomValidity("Must contain password is match!");
  } else {
    textbox.setCustomValidity("");
  }
}

