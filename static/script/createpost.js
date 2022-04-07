let isInvalidCat = false;
let isInvalidCity = false;
let isInvalidTitle = false;
let isInvalidDesc = false;
let isInvalidContact = false;
let isInvalidImg = false;
$(document).ready(function () {
  var element = document.getElementById("catpost");
  element.classList.add("active");
  // for category
  document.getElementById("category").addEventListener("input", function () {
    Invalidcat(this);
  });
  document.getElementById("category").addEventListener("invalid", function () {
    Invalidcat(this);
  });

  // for city
  document.getElementById("city").addEventListener("input", function () {
    Invalidcity(this);
  });
  document.getElementById("city").addEventListener("invalid", function () {
    Invalidcity(this);
  });

  // for title
  document.getElementById("title").addEventListener("input", function () {
    Invalidtitle(this);
  });
  document.getElementById("title").addEventListener("invalid", function () {
    Invalidtitle(this);
  });

  // for description
  document.getElementById("description").addEventListener("input", function () {
    InvalidDesc(this);
  });
  document.getElementById("description").addEventListener("invalid", function () {
    InvalidDesc(this);
  });

  // for contact number
  document.getElementById("contact").addEventListener("input", function () {
    Invalidnum(this);
    var number = document.getElementById("contact");
    if (number.value.length > number.maxLength) {
      number.value = number.value.slice(0, number.maxLength);
    }
  });
  document.getElementById("contact").addEventListener("invalid", function () {
    Invalidnum(this);
  });

  // for file
  document.getElementById("img").addEventListener("input", function () {
    Invalidfile(this);
  });
  document.getElementById("img").addEventListener("invalid", function () {
    Invalidfile(this);
  });

  $(".postbtn").click(function () {
    showSpinner();
    $(".finalSubmit").click();
    if (!(isInvalidCat && isInvalidCity && isInvalidTitle && isInvalidDesc && isInvalidContact && isInvalidImg)) {
      stopSpinner();
    }
  });
});

function Invalidcat(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a category is necessary!");
    isInvalidCat = false;
  } else {
    textbox.setCustomValidity("");
    isInvalidCat = true;
  }
  return true;
}

function Invalidcity(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a city is necessary!");
    isInvalidCity = false;
  } else {
    textbox.setCustomValidity("");
    isInvalidCity = true;
  }
  return true;
}

function Invalidtitle(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a title is necessary!");
    isInvalidTitle = false;
  } else {
    textbox.setCustomValidity("");
    isInvalidTitle = true;
  }
  return true;
}

function InvalidDesc(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a description is necessary!");
    isInvalidDesc = false;
  } else {
    textbox.setCustomValidity("");
    isInvalidDesc = true;
  }
  return true;
}

function Invalidnum(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Entering a contact number is necessary!");
    isInvalidContact = false;
  } else {
    textbox.setCustomValidity("");
    isInvalidContact = true;
  }
  return true;
}

function Invalidfile(textbox) {
  if (textbox.value === "") {
    textbox.setCustomValidity("Please choose your file!");
    isInvalidImg = false;
  } else {
    textbox.setCustomValidity("");
    isInvalidImg = true;
  }
  return true;
}
