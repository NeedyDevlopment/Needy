$(document).ready(function() {
    $(".followersDiv").click(function() {
        var id = $(this).attr("id");
        $.ajax({
            type: "post",
            data: { id: id },
            url: "/profile/showProfileFollowers",
            success: function(data) {
                $(".followersFollowing").html(data);
                $(".followersFollowing").css("display", "block");
            },
        });
    });
    $(".followingDiv").click(function() {
        var id = $(this).attr("id");
        $.ajax({
            type: "post",
            data: { id: id },
            url: "/profile/showProfileFollowings",
            success: function(data) {
                $(".followersFollowing").html(data);
                $(".followersFollowing").css("display", "block");
            },
        });
    });
});

function onClickFollow(element, creatorId) {
    var currentUserId = $(".profileDetails").attr("id");
    if (creatorId !== currentUserId) {
        $.ajax({
            url: "/ajax/" + element.innerText,
            type: "POST",
            data: { creatorId: creatorId, postId: "123456789012" },
            success: function(totalFollowers) {
                showSnackbar("You " + element.innerText + " Successfully");
                $(".followersDiv span").text(totalFollowers);
                $("#f_btn" + creatorId).text() === "Follow" ?
                    $("#f_btn" + creatorId).text("Unfollow") :
                    $("#f_btn" + creatorId).text("Follow");
            },
            error: function(xhr, status, error) {
                if (error === "Unauthorized") showSnackbar("You Are not LoggedIn!");
                else showSnackbar("something Went Wrong!");
            },
        });
    } else {
        showSnackbar("You Can Not Follow Your Self !");
    }
}