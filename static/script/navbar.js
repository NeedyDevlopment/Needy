$(document).ready(function () {
  if ($("#loginbtn")) {
    $("#loginBtn").click(function () {
      $.ajax({
        method: "post",
        url: "/showModal/loginModal",
        data: { Modal: "login" },
        success: function (data) {
          $("#myModal").css("display", "block");
          $(".modal-content").html(data);
          wrap("../static/script/login.js");
        },
      });
    });
  }
  $("#home").click(function () {
    document.location.href = "/";
  });
  $("#catpost").click(function () {
    document.location.href = "/createpost";
  });
  $("#myActivity").click(function () {
    document.location.href = "/myactivity";
  });
  $("#contactUs").click(function () {
    document.location.href = "/contact";
  });
  $("#aboutUs").click(function () {
    document.location.href = "/about";
  });
  $("#profilebtn").click(function () {
    document.location.href = "/profile";
  });
  $("#Singupbtn").click(function () {
    document.location.href = "/signup";
  });
  $("#logoutbtn").click(function () {
    showDialogBox("logout", "");
  });
  $("#body").css("min-height", window.innerHeight);
  $("#body").css("padding-bottom", document.getElementById("footer").offsetHeight);
  // for burger icon and below navbar
  var div = $(".flexible");
  if (screen.width <= 768) {
    div.css("top", $(".navbar").height());
  }
  $(".burgerIcon").click(function () {
    if (screen.width <= 768) {
      if (div.css("visibility") == "visible") {
        div.addClass("animation_reverse");
        div.removeClass("animation");
        setTimeout(() => {
          div.css("visibility", "hidden");
        }, 1000);
      } else {
        div.css("visibility", "visible");
        div.addClass("animation");
        div.removeClass("animation_reverse");
      }
    } else {
      div.css("visibility", "visible");
    }
  });
});
function wrap(src) {
  classes = document.getElementsByClassName("wrap");
  [...classes].forEach((e) => {
    document.body.removeChild(e);
  });
  var wrap = document.createElement("div");
  wrap.classList.add("wrap");
  var scr = document.createElement("script");
  scr.src = src;
  scr.type = "text/javascript";
  scr.nonce = "2726c7f26c";
  wrap.appendChild(scr);
  document.body.appendChild(wrap);
}
function showSpinner() {
  var spinner = `<div class="spinner-body">
                    <span class='spinner'>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                <div>`;
  $(body).append(spinner);
}
function stopSpinner() {
  $(`.spinner-body`).remove();
}
