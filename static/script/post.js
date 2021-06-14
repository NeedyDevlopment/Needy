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

var message = "happy Birthday";
var msg = "is msg";
let posts = [];
console.log(posts);

function onClickOnLogout() {
  document.getElementById("id01").style.display = "block";
}

function onCloseDialogBox() {
  document.getElementById("id01").style.display = "none";
}

function onCancelLogoutDialogBox() {
<<<<<<< HEAD
  document.getElementById("id01").style.display = "none";
  return;
=======
    // document.getElementsByClassName("w3-animate-zoom")[0].classList.replace('w3-animate-zoom', 'w3-animate-zoomOut');
    document.getElementById('id01').style.display = 'none';

    return;
>>>>>>> fe30346aa8fc7743a3b7b4496ddad23496cdbf8c
}

function onContinueLogoutDialogBox() {
  document.getElementById("id01").style.display = "none";
  $.get("/logout", function (data, status) {
    console.log(data);
  });
}

$(document).ready(function () {
  if (document.getElementById("message").innerHTML != "") {
    showSnackbar(document.getElementById("message").innerHTML);
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
  console.log("creator id is: " + creatorId);
  $.ajax({
    url: "/ajax/" + element.innerText,
    type: "POST",
    data: { creatorId: creatorId },
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
      if (error === "Unauthorized") showSnackbar("You Are not LoggedIn!");
      else showSnackbar("something Went Wrong!");
    },
  });
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
          element.classList.replace("fa-thumbs-o-up", "fa-thumbs-up");
          p.innerText = "unlike";
        } else {
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

    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         document.getElementById('showLikes').innerText = this.responseText;
    //     }
    // }
    // var url = '/action/' + postId + '?incLikes=' + incLikes;
    // xmlHttp.open('POST', url, true);
    // xmlHttp.send(); //not Working
  }
  if (icon === "comment") {
    // $('#submitcomment').onclick = function() {
    document.getElementById("submitcomment").onclick = function () {
      submitComment(postId);
    };
    // if (document.getElementById('maincommentcontainer').classList.contains('show-commentbox')) {
    //     hidecommentbox(false);
    // }
    $(".commentdiv").remove(); //removing existing comments
    if (
      !document
        .getElementById("maincommentcontainer")
        .classList.contains("show-commentbox")
    ) {
      showcommentbox();
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
        var innercommentcontainer = $("#innercommentcontainer");
        var writecomment = document.getElementById("writecomment");
        if (commentsArray.length === 0) {
          // // innercommentcontainer.innerHTML = '<p>array is returned!</p>';
          // innercommentcontainer.innerHTML = '<p>no comments added yet!</p>';
          // var div = document.createElement("div");
          // var p = document.createElement("p");
          // var text = document.createTextNode('No Comments Added Yet! Become first one to comment.');
          // var P = p.appendChild(text);
          // var Div = div.appendChild(P);
          // writecomment.parentNode.insertBefore(Div, writecomment.nextSibling);
          // Div.id = 'myDiv';
          $(
            "<div id='nocomment' class='commentdiv'><p>No Comments Added Yet! Become first one to comment.</p></div>"
          ).insertAfter($(".loader"));
          // insertAfter($('#commentHeader'));
        } else {
          document.getElementById("showComments" + postId).innerText =
            commentsArray.length + " Comments";
          console.log(commentsArray);
          // $('.commentdiv').parentNode.removeChild($('.commentdiv'))
          // const elements = document.getElementsByClassName('.commentdiv');
          // while (elements.length > 0) {
          //     elements[0].parentNode.removeChild(elements[0]);
          // }
          // innercommentcontainer.innerHTML = '<p>here we show comments!</p>';
          commentsArray.forEach((comment) => {
            var usernametoBePrinted =
              element.id === comment.userId ? "You" : comment.username;
            var dateDiffer = new Date().getTime() - comment.date;
            console.log(dateDiffer);
            $(
              "<div class='commentdiv'><img src='../static/imagesForPost/profile.png'><b>&nbsp;" +
                usernametoBePrinted +
                "<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                getDateDifference(dateDiffer) +
                " ago</small></b><p id='commentP'>" +
                comment.commentText +
                "</p></div>"
            ).insertAfter($(".loader"));
            // insertAfter($('#commentHeader'));
          });
          //here above setting user profile image and showing date difference is remain
        }

        // element.classList.replace("fa-comment-o", "fa-comment");
        // p.innerText = 'commented';
      },
      error: function (xhr, status, error) {
        if (error === "Unauthorized") showSnackbar("You Are not LoggedIn!");
        else showSnackbar("something Went Wrong!");
      },
    });
    setTimeout(() => {
      var element = document.getElementById("writecomment");
      element.scrollIntoView(true);
    }, 500);

    // element.classList.toggle("fa-comment");//not working
    // element.classList.replace("fa-comment-o", "fa-comment");
    // comments++;
  }
  if (icon === "save") {
    if (p.innerText === "saved") {
      showSnackbar("you already saved!");
    } else {
      $.ajax({
        url: "/ajax/save",
        type: "POST",
        data: { postId: postId },
        success: function (res) {
          showSnackbar("You saved Successfully!");
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
  if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
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
