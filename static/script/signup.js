function InvalidMsg(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a username is necessary!");
  } else {
    textbox.setCustomValidity("");
  }
}
function InvalidEmail(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering an email is necessary!");
  } else if (textbox.validity.typeMismatch) {
    textbox.setCustomValidity("Please enter an email address which is valid!");
  } else {
    textbox.setCustomValidity("");
  }
}
function Invalidpass(textbox) {
  var lowerCaseLetters = "/[a-z]/g";
  var upperCaseLetters = "/[A-Z]/g";
  var numbers = "/[0-9]/g";
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a password is necessary!");
  } else if (textbox.value.match(lowerCaseLetters)) {
    textbox.setCustomValidity(
      "Must contain at least one number and one uppercase and lowercase letter and  and at least 8 or more characters"
    );
  } else if (textbox.value.match(upperCaseLetters)) {
    textbox.setCustomValidity(
      "Must contain at least one number and one uppercase and lowercase letter and  and at least 8 or more characters"
    );
  } else if (textbox.value.match(numbers)) {
    textbox.setCustomValidity(
      "Must contain at least one number and one uppercase and lowercase letter and  and at least 8 or more characters"
    );
  } else if (textbox.value.legnth >= 8) {
    textbox.setCustomValidity(
      "Must contain at least one number and one uppercase and lowercase letter and  and at least 8 or more characters"
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
