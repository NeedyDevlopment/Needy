var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];
if (btn) {
  btn.onclick = function () {
    modal.style.display = "block";
  };
}
// module.exports = function changeStyle() {
//     console.log('changeStyle called');
//     var modal = document.getElementById("myModal");
//     modal.style.display = "block";
// };

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
