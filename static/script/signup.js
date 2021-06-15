// document.addEventListener("DOMContentLoaded", function () {
//   var element = document.getElementById("Singupbtn");
//   // element.classList.add("active");

// });

function InvalidMsg() {
  var msg = document.getElementById("username");
  if (msg.value === "") {
    msg.setCustomValidity("Entering a username is necessary!");
  } else {
    msg.setCustomValidity("");
  }
  return true;
}
function InvalidEmail() {
  var mail = document.getElementById("email");
  var x = document.form.email.value;
  var atposition = x.indexOf("@");
  var dotposition = x.lastIndexOf(".");
  if (mail.value === "") {
    mail.setCustomValidity("Entering an email is necessary!");
  } else if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= x.length
  ) {
    mail.setCustomValidity("Please enter an email address which is valid!");
  } else {
    mail.setCustomValidity("");
  }
  return true;
}
function Invalidcity() {
  var city = document.getElementById("city");
  if (city.value === "") {
    city.setCustomValidity("Entering a city is necessary!");
  } else {
    city.setCustomValidity("");
  }
  return true;
}

function Invalidnumber() {
  var num = document.getElementById("number");
  if (num.value === "") {
    num.setCustomValidity("Entering a contact number is necessary!");
  } else {
    num.setCustomValidity("");
  }
  return true;
}
function Invalidplace() {
  var place = document.getElementById("work");
  if (place.value === "") {
    place.setCustomValidity("Entering a work place is necessary!");
  } else {
    place.setCustomValidity("");
  }
  return true;
}
function Invalidpass() {
  var password = document.getElementById("pass");
  var pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  if (password.value === "") {
    password.setCustomValidity("Entering a password is necessary!");
  } else if (!password.value.match(pass)) {
    password.setCustomValidity(
      "Must contain at least one number and uppercase and lowercase letter and one special, and at least 7 or more characters"
    );
  } else {
    password.setCustomValidity("");
  }
  return true;
}

function myFunction() {
  var x = document.getElementById("pass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function Invalidcpass() {
  var cpassword = document.getElementById("cpass");
  var cpass = document.getElementById("pass").value;
  if (cpassword.value === "") {
    cpassword.setCustomValidity("Entering a confirm password is necessary!");
  } else if (!cpassword.value.match(cpass)) {
    cpassword.setCustomValidity("Must contain password is match!");
  } else {
    cpassword.setCustomValidity("");
  }
  return true;
}
