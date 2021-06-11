  document.addEventListener("DOMContentLoaded", function () {
    var element = document.getElementById("catpost");
    element.classList.add("active");
  
  });
  
  function Invalidcat(textbox) {
    if (textbox.value === "") {
      textbox.setCustomValidity("Entering a category is necessary!");
    } else {
      textbox.setCustomValidity("");
    }
    return true;
  }
  
  function Invalidcity(textbox) {
    if (textbox.value === "") {
      textbox.setCustomValidity("Entering a city is necessary!");
    } else {
      textbox.setCustomValidity("");
    }
    return true;
  }
  
  function Invalidtitle(textbox) {
    if (textbox.value === "") {
      textbox.setCustomValidity("Entering a title is necessary!");
    } else {
      textbox.setCustomValidity("");
    }
    return true;
  }
  function InvalidDesc(textbox) {
    if (textbox.value === "") {
      textbox.setCustomValidity("Entering a description is necessary!");
    } else {
      textbox.setCustomValidity("");
    }
    return true;
  }
  
  function Invalidnum(textbox) {
    if (textbox.value === "") {
      textbox.setCustomValidity("Entering a contact number is necessary!");
    } else {
      textbox.setCustomValidity("");
    }
    return true;
  }
  function Invalidfile(textbox) {
    if (textbox.value === "") {
      textbox.setCustomValidity("Please choose your file!");
    } else {
      textbox.setCustomValidity("");
    }
    return true;
  
  }