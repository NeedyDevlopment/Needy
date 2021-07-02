// import browserEnv from 'browser-env';
// console.log(window.isSecureContext);
console.log("post.js running...");
// const publicVapidkey = 'BPmCyJFvTth5VUcT4LGEVFOaLeySyptCGJ5dzqLkQGZ6Fs6DYXNubLP2u7xlQ8CAg5VlYJA7KC5nHoKoRRV3298';
// // check for service worker
// if ('serviceWorker' in navigator) {
//     send().catch(err => console.log(err));
// }
// // Register serviceWorker,Register Push,Send Push
// async function send() {
//     //Register service worker
//     console.log('Registering service worker...');
//     const register = await navigator.serviceWorker.register('/worker.js', {
//         scope: '/'
//     });
//     console.log('service worker registered...');
//     //Register push
//     console.log('Registering Push...');
//     const subscription = await register.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: publicVapidkey
//     });
//     console.log('Push Registered...');

//     //send Push notification
//     console.log('sending push....');
//     await fetch('/subscribe', {
//         method: 'POST',
//         body: JSON.stringify(subscription),
//         headers: {
//             'content-type': 'application/json'
//         }
//     });
//     console.log('push sent...');
// }

// var message = "happy Birthday";
var msg = "is msg";
let posts = [];
// console.log(posts);
$(document).ready(function () {
  if (document.getElementById("message").innerHTML != "") {
    showSnackbar(document.getElementById("message").innerHTML);
    document.getElementById("message").innerHTML = "";
  }
});

function getDateDifference(dateDiffer) {
  if (dateDiffer < 60000) {
    dateDiffer = Math.floor(dateDiffer / 1000).toString() + "seconds";
    return dateDiffer;
  } else if (dateDiffer < 3600000) {
    dateDiffer = Math.floor(dateDiffer / 60000).toString() + "minutes";
    return dateDiffer;
  } else if (dateDiffer < 86400000) {
    dateDiffer = Math.floor(dateDiffer / (60000 * 60)).toString() + "hours";
    return dateDiffer;
  } else if (dateDiffer < 604800016.56) {
    dateDiffer = Math.floor(dateDiffer / (60000 * 60 * 24)).toString() + "days";
    return dateDiffer;
  } else if (dateDiffer < 2629800000) {
    dateDiffer =
      Math.floor(dateDiffer / (60000 * 60 * 24 * 7)).toString() + "weeks";
    return dateDiffer;
  } else if (dateDiffer < 31557600000) {
    dateDiffer =
      Math.floor(dateDiffer / (60000 * 60 * 24 * 7 * 4)).toString() + "months";
    return dateDiffer;
  }
}

function onClickFollow(element, creatorId, postId) {
  var currentUserId = $("#profile img").attr("class");
  if (currentUserId !== creatorId) {
    $.ajax({
      url: "/ajax/" + element.innerText,
      type: "POST",
      data: { creatorId: creatorId, postId: postId },
      success: function (totalFollowers) {
        showSnackbar("You " + element.innerText + " Successfully");
        // document.getElementById('showFollowers' + postId).innerText = totalFollowers + ' Followers';
        var showFollowerElementArray = document.getElementsByClassName(
          "showFollowers" + creatorId
        );
        [...showFollowerElementArray].forEach((fTextElement) => {
          fTextElement.innerText = totalFollowers + " Followers";
        });
        var followButtonArray = document.getElementsByClassName(
          "f-btn" + creatorId
        );
        [...followButtonArray].forEach((fButtonlement) => {
          fButtonlement.innerText === "Follow"
            ? (fButtonlement.innerText = "Unfollow")
            : (fButtonlement.innerText = "Follow");
        });
      },
      error: function (xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
        if (xhr.responseJSON.message == "user-not-loggedIn") {
          showSnackbar("You Are not LoggedIn!");
        } else if (xhr.responseJSON.message == "same-user") {
          showSnackbar("you can't follow yourself");
        }
      },
    });
  } else {
    showSnackbar("You Can Not Follow Your Self !");
  }
}

function submitComment(postId) {
  console.log("postId is::::");
  console.log(postId);
  var commentText = document.getElementById("writtencomment").value;
  document.getElementById("writtencomment").value = "";
  console.log("written comment is:::" + commentText);
  $.ajax({
    url: "/ajax/addcomment",
    type: "POST",
    data: { postId: postId, commentText: commentText },
    beforeSend: function () {
      $(".loader").show();
    },
    complete: function () {
      $(".loader").hide();
    },
    success: function (res) {
      var element = document.getElementsByClassName("fakeClass")[0];
      var p = document.getElementById("showcommenttext" + postId);
      showSnackbar("comment added successfully");
      element.classList.replace("fa-comment-o", "fa-comment");
      p.innerText = "commented";
      actionPerformed(element, "comment", postId);
    },
    error: function (xhr, status, error) {
      if (error === "Unauthorized") showSnackbar("You Are not LoggedIn!");
      else showSnackbar("something Went Wrong!");
    },
  });
}

function actionPerformed(element, icon, postId) {
  // alert('post id :' + postId);
  console.log("action Performed function called");
  var p = document.getElementById("show" + icon + "text" + postId);
  // console.log('innertext:' + p.innerText)
  if (icon === "like") {
    var incLikes = 0;
    p.innerText === "like" ? incLikes++ : incLikes--;
    $.ajax({
      url: "/ajax/like",
      type: "POST",
      data: { incLikes: incLikes, postId: postId },

      success: function (totalLikes) {
        if (p.innerText === "like") {
          showSnackbar("You liked a post.");
          element.classList.replace("fa-thumbs-o-up", "fa-thumbs-up");
          p.innerText = "unlike";
        } else {
          showSnackbar("You unliked a post.");
          element.classList.replace("fa-thumbs-up", "fa-thumbs-o-up");
          p.innerText = "like";
        }
        document.getElementById("showLikes" + postId).innerText =
          totalLikes + " Likes";
      },
      error: function (xhr, status, error) {
        if (error === "Unauthorized") showSnackbar("You Are not LoggedIn!");
        else showSnackbar("something Went Wrong!");
      },
    });
  }
  if (icon === "comment") {
    // $('#submitcomment').onclick = function() {
    document.getElementById("submitcomment" + postId).onclick = function () {
      submitComment(postId);
    };
    // if (document.getElementById('maincommentcontainer').classList.contains('show-commentbox')) {
    //     hidecommentbox(false);
    // }
    $(".commentdiv").remove(); //removing existing comments
    if (
      !document
        .getElementById("maincommentcontainer" + postId)
        .classList.contains("show-commentbox")
    ) {
      showcommentbox(postId);
    }
    $.ajax({
      url: "/ajax/getcomment",
      type: "POST",
      data: { postId: postId },
      beforeSend: function () {
        $(".loader").show();
      },
      complete: function () {
        $(".loader").hide();
      },
      success: function (commentsArray) {
        var innercommentcontainer = $("#innercommentcontainer" + postId);
        var writecomment = document.getElementById("writecomment");
        if (commentsArray.length === 0) {
          $(
            "<div id='nocomment' class='commentdiv'><p>No Comments Added Yet! Become first one to comment.</p></div>"
          ).insertAfter($("#innercommentcontainer" + postId + " .loader"));
        } else {
          document.getElementById("showComments" + postId).innerText =
            commentsArray.length + " Comments";
          console.log(commentsArray);
          commentsArray.forEach((comment) => {
            var usernametoBePrinted =
              element.id === comment.userId ? "You" : comment.username;
            var dateDiffer = new Date().getTime() - comment.date;
            console.log(dateDiffer);
            var userPhotoUrl = comment.userphoto
              ? comment.userphoto
              : "../static/imagesForPost/profile.png";
            $(
              "<div class='commentdiv'><div class='headerOfComment'><img src=" +
                userPhotoUrl +
                " style='border-radius: 50%;'><b>" +
                usernametoBePrinted +
                "</b><small>" +
                getDateDifference(dateDiffer) +
                " ago</small></div><p id='commentP'>" +
                comment.commentText +
                "</p></div>"
            ).insertAfter($("#innercommentcontainer" + postId + " .loader"));
          });
          //here above setting user profile image and showing date difference is remain
        }
      },
      error: function (xhr, status, error) {
        if (error === "Unauthorized") showSnackbar("You Are not LoggedIn!");
        else showSnackbar("something Went Wrong!");
      },
    });
    setTimeout(() => {
      var element = document.getElementById("writecomment");
      element.scrollIntoView(true);
    }, 1100);
  }
  if (icon == "share") {
    console.log("inside share");
    $("#getIdForSharePost").val(postId);
    // var fbUrl = "https://www.facebook.com/sharer.php?u=http%3A%2F%2Flocalhost%2Fpost%2F" + postId;
    // var fbUrl = "https://www.facebook.com/sharer.php?u=" + encodeURIComponent("http://localhost/post/60c6efc88ddc55a2647dec8b");
    var fbUrl =
      "https://www.facebook.com/sharer/sharer.php?u=http%3A//localhost/post/60c6efc88ddc55a2647dec8b"; //with meta tags
    var twUrl =
      "https://twitter.com/intent/tweet?url=http%3A%2F%2Flocalhost%2Fpost%2F" +
      postId +
      "&text=" +
      encodeURIComponent("Hello From Needy,Open this link to view Post") +
      "&hashtags=rentalHouse,Ahmedabad";
    // var twUrl = "https://twitter.com/intent/tweet?text=hello%20From%20Needy%0AGo%20to%20http%3A//localhost/post/60c6efc88ddc55a2647dec8b"; //with meta tags
    // var lnUrl = "https://www.linkedin.com/shareArticle?mini=true&url=http%3A%2F%2Flocalhost%2Fpost%2F" + postId;
    // var lnUrl = "https://www.linkedin.com/shareArticle?mini=true&url=http%3A//localhost/post/60c6efc88ddc55a2647dec8b&title=this%20is%20title&summary=this%20is%20Summary&source=This%20is%20Source"; //with meta tags
    var lnUrl =
      "https://www.linkedin.com/shareArticle?mini=true&url=https%3A//github.com&title=this%20is%20title&summary=this%20is%20Summary&source=This%20is%20Source"; //with meta tags

    $(".post-url").text("http://localhost/post/" + postId);
    var eUrl =
      "mailto:forexternaluse505@gmail.com?cc=ThisIsCC&bcc=ThisIsBCC&subject=Post%20From%20Needy%20this%20is%20subject&body=Hey%20This%20is%20Body%20of%20email";
    $(".fbBtn").attr("href", fbUrl);
    $(".twBtn").attr("href", twUrl);
    $(".lnBtn").attr("href", lnUrl);
    // $(".eBtn").attr("href", eUrl);
    const shareDialog = document.querySelector(".share-dialog");
    const closeButton = document.querySelector(".close-button");
    shareDialog.classList.add("is-open");
    closeButton.addEventListener("click", (event) => {
      shareDialog.classList.remove("is-open");
    });
    // shareButton.addEventListener('click', event => {
    // console.log("share clicked");
    // if (navigator.share) {
    //     navigator.share({
    //             title: 'WebShare API Demo',
    //             url: 'http://localhost/'
    //         }).then(() => {
    //             console.log('sharing successfully!');
    //         })
    //         .catch(console.error);
    // } else {
    // shareDialog.classList.add('is-open');
    // }
    //   });
  }
  //   if (icon === "save") {
  //       if (p.innerText === "saved") {
  //           showSnackbar("you already saved!");
  //       } else {
  //         document.getElementById("showComments" + postId).innerText =
  //           commentsArray.length + " Comments";
  //         console.log(commentsArray);
  //         // $('.commentdiv').parentNode.removeChild($('.commentdiv'))
  //         // const elements = document.getElementsByClassName('.commentdiv');
  //         // while (elements.length > 0) {
  //         //     elements[0].parentNode.removeChild(elements[0]);
  //         // }
  //         // innercommentcontainer.innerHTML = '<p>here we show comments!</p>';
  //         commentsArray.forEach((comment) => {
  //           var usernametoBePrinted =
  //             element.id === comment.userId ? "You" : comment.username;
  //           var dateDiffer = new Date().getTime() - comment.date;
  //           console.log(dateDiffer);
  //           $(
  //             "<div class='commentdiv'><img src='../static/imagesForPost/profile.png'><b>&nbsp;" +
  //               usernametoBePrinted +
  //               "<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
  //               getDateDifference(dateDiffer) +
  //               " ago</small></b><p id='commentP'>" +
  //               comment.commentText +
  //               "</p></div>"
  //           ).insertAfter($(".loader"));
  //           // insertAfter($('#commentHeader'));
  //         });
  //         //here above setting user profile image and showing date difference is remain
  //       }

  //       // element.classList.replace("fa-comment-o", "fa-comment");
  //       // p.innerText = 'commented';
  //     },
  //     error: function (xhr, status, error) {
  //       if (error === "Unauthorized") showSnackbar("You Are not LoggedIn!");
  //       else showSnackbar("something Went Wrong!");
  //     },
  //   });
  //   setTimeout(() => {
  //     var element = document.getElementById("writecomment");
  //     element.scrollIntoView(true);
  //   }, 500);

  //   // element.classList.toggle("fa-comment");//not working
  //   // element.classList.replace("fa-comment-o", "fa-comment");
  //   // comments++;
  // }
  if (icon === "save") {
    console.log("inside save");
    if (p.innerText === "saved") {
      showSnackbar("post already saved!");
    } else {
      $.ajax({
        url: "/ajax/save",
        type: "POST",
        data: { postId: postId },
        success: function (res) {
          showSnackbar("post saved Successfully!");
          element.classList.replace("fa-bookmark-o", "fa-bookmark");
          p.innerText = "saved";
          // else {
          //     element.classList.replace("fa-bookmark", "fa-bookmark-o");
          //     p.innerText = 'save';
          // }
        },
        error: function (xhr, status, error) {
          if (error === "Unauthorized") showSnackbar("You Are not LoggedIn!");
          else showSnackbar("something Went Wrong!");
        },
      });
    }

    // if (element.classList.contains("fa-bookmark-o")) {
    //     element.classList.replace("fa-bookmark-o", "fa-bookmark");
    // } else {
    //     element.classList.replace("fa-bookmark", "fa-bookmark-o");
    // }
  }
}

function CopyToClipboard(containerid) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select().createTextRange();
    document.execCommand("copy");
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().addRange(range);
    document.execCommand("copy");
    document.getElementById("copy-link").innerText = "Copied";
  }
}

//Remain to add this feature for future implementation
function onFilter() {
  var selectedCity = $("#finalCity").val();
  var selectedCategory = $("#finalCategory").val();
  $.ajax({
    url: "/?category=" + selectedCategory + "&city=" + selectedCity,
    type: "GET",
    // data: { "postId": postId },
    // beforeSend: function() {
    //     $('.loader').show();
    // },
    // complete: function() {
    //     $('.loader').hide();
    // },
    success: function (postsData) {
      msg = "happy birthday Chnaged!";
      // posts = postsData.posts;
      console.log(postsData);
      // $(".postsContainer").remove();
      document.getElementsByClassName("postsContainer")[0].innerHTML =
        postsData;
      showSnackbar("successss!!");
    },
    error: function (xhr, status, error) {
      if (error === "Unauthorized") showSnackbar("You Are not LoggedIn!");
      else showSnackbar("something Went Wrong!");
    },
  });
}
// module.exports = { 'likes': likes, 'comments': comments }
var currentPage = 1;
// var AjaxPosts = [];
$(window).scroll(function () {
  // if ($(window).scrollTop() == $(document).height() - $(window).height()) {
  // var postHeight = $("#post_container").height();
  if (
    $(window).scrollTop() + $(window).height() >= $(document).height() &&
    $("#currentTab").text() == ""
  ) {
    var totalPosts = $("#getTotalPosts").text();
    console.log("value of P" + totalPosts);
    console.log(currentPage * 5 > totalPosts);
    if (currentPage * 5 > totalPosts) {
      return;
    }
    currentPage = currentPage + 1;
    console.log("inside If Block");
    //    var city = $("#finalCity").val(city);
    //    var category = $("#finalCategory").val(category);
    var city = document.getElementById("getCity").innerHTML;
    var category = document.getElementById("getCategory").innerHTML;
    console.log("city is::" + city + " and Category is:  " + category);

    // $.ajax({
    //     // url: "/?city=" + city + "&category=" + category,
    //     // url: "/",
    //     url: "/getPosts",
    //     type: "GET",
    //     data: { currentPage: 2, hello: "Hello" },
    //     success: function(responseData) {
    //         console.log("success");
    //         console.log(responseData);
    //     },
    //     error: function() {
    //         console.log("Error occured During AjAx");
    //     }
    // });
    $.ajax({
      url: "/getPosts",
      type: "Post",
      data: { currentPage: currentPage, city: city, category: category },
      success: function (res) {
        $(".postsContainer").append(res);
      },
      error: function (xhr, status, error) {
        if (error === "Unauthorized") showSnackbar("You Are not LoggedIn!");
        else showSnackbar("something Went Wrong!");
      },
    });
    var message = "nice";
    console.log("Ajax Call...");
    // console.log("current filter: " + filter.city + " " + filter.category);
  }
});

$(document).ready(function () {
  $("#profile img").click(function () {
    var id = $(this).attr("id");
    window.location.href = "/othersProfile?id=" + id;
  });

  if ($("#ebtn")) {
    $("#eBtn").click(function () {
      $.ajax({
        method: "post",
        url: "/showModal/loginModal",
        data: { Modal: "email" },
        success: function (data) {
          $("#myModal").css("display", "block");
          $(".modal-content").html(data);
        },
      });
    });
  }
});
