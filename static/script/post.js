var likes = 16;
var comments = 58;

function actionPerformed(element, icon) {
  console.log("Likes:" + likes);
  if (icon === "like") {
    element.classList.toggle("fa-thumbs-up");
    likes++;
  }
  if (icon === "comment") {
    // element.classList.toggle("fa-comment");//not working
    element.classList.replace("fa-comment-o", "fa-comment");
    comments++;
  }
  if (icon === "save") {
    if (element.classList.contains("fa-bookmark-o")) {
      element.classList.replace("fa-bookmark-o", "fa-bookmark");
    } else {
      element.classList.replace("fa-bookmark", "fa-bookmark-o");
    }
  }
}
// module.exports = { 'likes': likes, 'comments': comments }
