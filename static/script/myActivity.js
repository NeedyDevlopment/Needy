var currentPageForGettingPosts = 1;
var currentPageForGettingActivities = 1;
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() && $("#currentTab").text() == "post") {
        console.log("inside myactivity scroll for getting posts");
        var totalPosts = $("#getTotalPostsForMyactivity").text();
        console.log("value of P" + totalPosts);
        console.log(currentPageForGettingPosts * 5 > totalPosts);
        if (currentPageForGettingPosts * 5 > totalPosts) {
            return;
        }
        currentPageForGettingPosts = currentPageForGettingPosts + 1;
        console.log("inside If Block");
        $.ajax({
            url: "/getContentOnScrollForMyActivity/getPosts",
            type: "Post",
            data: { currentPage: currentPageForGettingPosts },
            success: function(res) {
                $(".post").append(res);
            },
            error: function(xhr, status, error) {
                console.log(error);
                showSnackbar("something Went Wrong!");
            },
        });
        console.log("Ajax Call...");
    } else if ($(window).scrollTop() + $(window).height() >= $(document).height() && $("#currentTab").text() == "activity") {
        console.log("inside myactivity scroll for getting activities");
        var totalActivities = $("#getTotalActivitiesForMyactivity").text();
        console.log("value of P" + totalActivities);
        console.log(currentPageForGettingActivities * 12 > totalActivities);
        if (currentPageForGettingActivities * 12 > totalActivities) {
            return;
        }
        currentPageForGettingActivities = currentPageForGettingActivities + 1;
        console.log("inside If Block");
        $.ajax({
            url: "/getContentOnScrollForMyActivity/getActivities",
            type: "Post",
            data: { currentPage: currentPageForGettingActivities },
            success: function(res) {
                $("#activity").append(res);
            },
            error: function(xhr, status, error) {
                console.log(error);
                showSnackbar("something Went Wrong!");
            },
        });
        console.log("Ajax Call...");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var element = document.getElementById("myActivity");
    element.classList.add("active");
    var activity = document.getElementById("activity");
    activity.style = "display:none;";
    var totalPosts = document.getElementById("TOTAL_POSTS");
    var totalActivities = document.getElementById("TOTAL_ACTIVITIES");
    totalPosts.style = "display:block;";
    totalActivities.style = "display:none;";
    $("#currentTab").text("post");
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
    var totalPosts = document.getElementById("TOTAL_POSTS");
    var totalActivities = document.getElementById("TOTAL_ACTIVITIES");
    color.style = "left:0;";
    postbutton.style = "color:white;";
    activitybutton.style = "color:black;";
    activity.style = "display:none;";
    totalPosts.style = "display:block;";
    totalActivities.style = "display:none;";
    post.style = "display:block;";
    $("#currentTab").text("post");

}

function activity() {
    var color = document.getElementById("colourful");
    var postbutton = document.getElementById("postbtn");
    var activitybutton = document.getElementById("activitybtn");
    var activity = document.getElementById("activity");
    var post = document.getElementById("post");
    var totalPosts = document.getElementById("TOTAL_POSTS");
    var totalActivities = document.getElementById("TOTAL_ACTIVITIES");
    color.style = "left:50%;";
    postbutton.style = "color:black;";
    activitybutton.style = "color:white;";
    activity.style = "display:grid;";
    totalPosts.style = "display:none;";
    totalActivities.style = "display:block;";
    post.style = "display:none;";
    $("#currentTab").text("activity");

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
    console.log("clicked");
    $(".z-post_container").css("display", "block");
    // $('#z-post_container').css('display', 'block');
    // alert("clicked! Let zoom");
    // document.addEventListener('click', function() {
    //     $('.z-post_container').css('display', 'none');
    // })
    $.ajax({
        url: "getActivityPost",
        type: "POST",
        // data: { activity_PostId: activity_PostId, activity_action: activity_action },
        data: { activityId: activityId },
        success: function(res) {
            console.log("success to fetch activityPost");
            $(".z-post_container").html(res);
        },
    });
}
$(window).click(function(event) {
    if (
        event.target == document.getElementById("body") ||
        event.target == document.getElementsByClassName("buttonsdiv")
    ) {
        $(".z-post_container").css("display", "none");
    }
});

function onCloseActivity() {
    $(".z-post_container").css("display", "none");
}
document.addEventListener("click", function(e) {
    var elementDisplay =
        document.getElementsByClassName("z-post_container")[0].style.display;
    // console.log(e.target.id);
    console.log(e.target.id);
    // console.log(e.target.id != 'activityPost' && e.target.id != 'g-post_container' && elementDisplay == 'block');
    // console.log(e.target.id == "html" || e.target.id == "body" || e.target.id == "postbtn" );
    // console.log(e.target.offsetParent.className !== 'z-post_container');
    if (["body", "html", "postbtn", "activitybtn"].includes(e.target.id)) {
        $(".z-post_container").css("display", "none");
    }
});

function userProfile(id) {
    window.location.href = "/othersProfile?id=" + id;
}