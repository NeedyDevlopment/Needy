let isInvalidMsg = false;
let isInvalidEmail = false;
let isInvalidCity = false;
let isInvalidNumber = false;
let isInvalidWork = false;
let isInvalidPass = false;
let isInvalidCPass = false;

$(document).ready(function () {
  var element = document.getElementById("Singupbtn");
  // element.classList.add("active");
  // for username
  document.getElementById("username").addEventListener("input", function () {
    InvalidMsg();
  });
  document.getElementById("username").addEventListener("invalid", function () {
    InvalidMsg();
  });
  //for email
  document.getElementById("email").addEventListener("input", function () {
    InvalidEmail();
  });
  document.getElementById("email").addEventListener("invalid", function () {
    InvalidEmail();
  });
  //for city
  document.getElementById("city").addEventListener("input", function () {
    Invalidcity();
  });
  document.getElementById("city").addEventListener("invalid", function () {
    Invalidcity();
  });
  //for phone number
  document.getElementById("number").addEventListener("input", function () {
    Invalidnumber();
    var number = document.getElementById("number");
    if (number.value.length > number.maxLength) {
      number.value = number.value.slice(0, number.maxLength);
    }
  });
  document.getElementById("number").addEventListener("invalid", function () {
    Invalidnumber();
  });
  //for workplace
  document.getElementById("work").addEventListener("input", function () {
    Invalidplace();
  });
  document.getElementById("work").addEventListener("invalid", function () {
    Invalidplace();
  });
  //for password
  document.getElementById("pass").addEventListener("input", function () {
    Invalidpass();
  });
  document.getElementById("pass").addEventListener("invalid", function () {
    Invalidpass();
  });
  // for checkbox
  document.getElementById("checkbox").addEventListener("click", function () {
    myFunction();
  });
  //for cpassword
  document.getElementById("cpass").addEventListener("input", function () {
    Invalidcpass();
  });
  document.getElementById("cpass").addEventListener("invalid", function () {
    Invalidcpass();
  });
  $(".btnsignup").click(function () {
    showSpinner();
    $(".signUpFinalSubmit").click();
    if (!(isInvalidMsg && isInvalidEmail && isInvalidCity && isInvalidNumber && isInvalidWork && isInvalidPass && isInvalidCPass)) {
      stopSpinner();
    }
  });
});

function InvalidMsg() {
  var msg = document.getElementById("username");
  if (msg.value === "") {
    msg.setCustomValidity("Entering a username is necessary!");
    isInvalidMsg = false;
  } else {
    msg.setCustomValidity("");
    isInvalidMsg = true;
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
    isInvalidEmail = false;
  } else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
    mail.setCustomValidity("Please enter an email address which is valid!");
    isInvalidEmail = false;
  } else {
    mail.setCustomValidity("");
    isInvalidEmail = true;
  }
  return true;
}
function Invalidcity() {
  var city = document.getElementById("city");
  if (city.value === "") {
    city.setCustomValidity("Entering a city is necessary!");
    isInvalidCity = false;
  } else {
    city.setCustomValidity("");
    isInvalidCity = true;
  }
  return true;
}

function Invalidnumber() {
  var num = document.getElementById("number");
  if (num.value === "") {
    num.setCustomValidity("Entering a contact number is necessary!");
    isInvalidNumber = false;
  } else {
    num.setCustomValidity("");
    isInvalidNumber = true;
  }
  return true;
}
function Invalidplace() {
  var place = document.getElementById("work");
  if (place.value === "") {
    place.setCustomValidity("Entering a work place is necessary!");
    isInvalidWork = false;
  } else {
    place.setCustomValidity("");
    isInvalidWork = true;
  }
  return true;
}
function Invalidpass() {
  var password = document.getElementById("pass");
  var pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  if (password.value === "") {
    password.setCustomValidity("Entering a password is necessary!");
    isInvalidPass = false;
  } else if (!password.value.match(pass)) {
    password.setCustomValidity("Must contain at least one number and uppercase and lowercase letter and one special, and at least 7 or more characters");
    isInvalidPass = false;
  } else {
    password.setCustomValidity("");
    isInvalidPass = true;
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
    isInvalidCPass = false;
  } else if (!cpassword.value.match(cpass)) {
    cpassword.setCustomValidity("Must contain password is match!");
    isInvalidCPass = false;
  } else {
    cpassword.setCustomValidity("");
    isInvalidCPass = true;
  }
  return true;
}
