var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close");
if (btn) {
  btn.onclick = function () {
    modal.style.display = "block";
  };
}
$(".close").click(function () {
  modal.style.display = "none";
});
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
$("#forgotPassword").click(function () {
  $.ajax({
    type: "post",
    url: "/forgotPassword",
    success: function (data) {
      $(".modal-content").html(data);
    },
  });
});
