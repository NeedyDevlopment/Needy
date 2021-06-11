document.addEventListener("DOMContentLoaded", function () {
    var element = document.getElementById("contactUs");
    element.classList.add("active");
  
  });

function Invalidtitle() {
  var title = document.getElementById('title');
  if (title.value === "") {
    title.setCustomValidity("Entering a title is necessary!");
    
  } else {
    title.setCustomValidity("");
  }
  return true;
}
function Invalidmail() {
  var mail = document.getElementById('email');
  var x = document.getElementById('email').value;
  var atposition = x.indexOf("@");
  var dotposition = x.lastIndexOf(".");
  if ( mail.value === "") {
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
  
  function Invalidnumber() {
    var number = document.getElementById('num');
    if (number.value === "") {
      number.setCustomValidity("Entering a contact number is necessary!");
    } else {
      number.setCustomValidity("");
    }
    return true;
  }
  function Invalidmess() {
    var desc = document.getElementById('desc');
    if (desc.value === "") {
      desc.setCustomValidity("Entering a message is necessary!");
    } else {
      desc.setCustomValidity("");
    }
    return true;
  }
  