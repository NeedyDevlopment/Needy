function showcommentbox(postId) {
    $(".maincommentcontainer").removeClass("show-commentbox");
    console.log("showcommentbox called!");
    var commentbox = document.getElementById("maincommentcontainer" + postId);
    commentbox.style.animation = "fadeIn 1s";
    commentbox.classList.add("show-commentbox");
}

function hidecommentbox(postId) {
    console.log("hidecommentbox called!");
    var commentbox = document.getElementById("maincommentcontainer" + postId);
    // if (animate) {
    commentbox.style.animation = "fadeOut 1s";
    setTimeout(() => {
        commentbox.classList.remove("show-commentbox");
    }, 1000);
}

// $(".closebutton").click(function() {
//     var post_id = $(this).attr("value");
//     hidecommentbox(post_id);
// });
$("body").on("click", ".closebutton", function() {
    var post_id = $(this).attr("value");
    hidecommentbox(post_id);
});