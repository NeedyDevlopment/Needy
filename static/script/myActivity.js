document.addEventListener("DOMContentLoaded", function() {
    var element = document.getElementById("myActivity");
    element.classList.add("active");
    var activity = document.getElementById("activity");
    activity.style = "display:none;";
});
// $(document).ready(function() {
//     $('#g-post_container').click(function() {
//         console.log('clicked');
//         $('#z-post_container').css('display', 'block');
//         alert("clicked! Let zoom");
//     });
// });
// document.getElementById("g-post_container").addEventListener("click", function() {
//     console.log('clicked');
//     $('#z-post_container').css('display', 'block');
//     alert("clicked! Let zoom");
// })

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
    activity.style = "display:grid;";
    post.style = "display:none;";
}
// $('#g-post_container').click(function() {
//     console.log('clicked');
//     $('#z-post_container').css('display', 'block');
//     alert("clicked! Let zoom");
// });
// $(document).ready(function() {
//     document.onclick = function(e) {
//         var elementDisplay = document.getElementsByClassName('z-post_container')[0].style.display;
//         if (e.target.id !== 'activityPost' && e.target.id !== 'g-post_container' && elementDisplay == 'block') {
//             $('.z-post_container').css('display', 'none');
//         }
//     };
// });


function onClickActivity(element, activityId) {
    console.log('clicked');
    $('.z-post_container').css('display', 'block');
    // $('#z-post_container').css('display', 'block');
    // alert("clicked! Let zoom");
    // document.addEventListener('click', function() {
    //     $('.z-post_container').css('display', 'none');
    // })
    $.ajax({
        url: 'getActivityPost',
        type: 'POST',
        // data: { activity_PostId: activity_PostId, activity_action: activity_action },
        data: { activityId: activityId },
        success: function(res) {
            console.log('success to fetch activityPost');
            $('.z-post_container').html(res);
        }
    });
}

function onCloseActivity() {
    $('.z-post_container').css('display', 'none');
}