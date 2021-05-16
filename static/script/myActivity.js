document.addEventListener("DOMContentLoaded", function () {
  var element = document.getElementById("myActivity");
  element.classList.add("active");
  var activity = document.getElementById("activity");
  activity.style = "display:none;";
});
function post() {
  var color = document.getElementById("colourful");
  var postbutton = document.getElementById("postbtn");
  var activitybutton = document.getElementById("activitybtn");
  var activity = document.getElementById("activity");
  var post = document.getElementById("post");
  color.style = "left:0;";
  postbutton.style = "color:white;";
  activitybutton.style = "color:black;";
  activity.style = "display:none;";
  post.style = "display:block;";
}
function activity() {
  var color = document.getElementById("colourful");
  var postbutton = document.getElementById("postbtn");
  var activitybutton = document.getElementById("activitybtn");
  var activity = document.getElementById("activity");
  var post = document.getElementById("post");
  color.style = "left:50%;";
  postbutton.style = "color:black;";
  activitybutton.style = "color:white;";
  activity.style = "display:block;";
  post.style = "display:none;";
}
