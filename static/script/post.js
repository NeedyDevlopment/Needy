// import browserEnv from 'browser-env';
// console.log(window.isSecureContext);
console.log('post.js running...');
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
    document.getElementById('id01').style.display = 'block';
}

function onCloseDialogBox() {
    document.getElementById('id01').style.display = 'none';
}

function onCancelLogoutDialogBox() {
    // document.getElementsByClassName("w3-animate-zoom")[0].classList.replace('w3-animate-zoom', 'w3-animate-zoomOut');
    document.getElementById('id01').style.display = 'none';

    return;
}

function onContinueLogoutDialogBox() {
    document.getElementById('id01').style.display = 'none';
    $.get("/logout", function(data, status) {
        console.log(data);
    })
}

$(document).ready(function() {
    if (document.getElementById("message").innerHTML != '') {
        showSnackbar(document.getElementById("message").innerHTML)
    }
})

function getDateDifference(dateDiffer) {
    if (dateDiffer < 60000) {
        dateDiffer = Math.floor(dateDiffer / 1000).toString() + 'seconds';
        return dateDiffer
    } else if (dateDiffer < 3600000) {
        dateDiffer = Math.floor(dateDiffer / 60000).toString() + 'minutes';
        return dateDiffer;
    } else if (dateDiffer < 86400000) {
        dateDiffer = Math.floor(dateDiffer / (60000 * 60)).toString() + 'hours';
        return dateDiffer;
    } else if (dateDiffer < 604800016.56) {
        dateDiffer = Math.floor(dateDiffer / (60000 * 60 * 24)).toString() + 'days';
        return dateDiffer;
    } else if (dateDiffer < 2629800000) {
        dateDiffer = Math.floor(dateDiffer / (60000 * 60 * 24 * 7)).toString() + 'weeks';
        return dateDiffer;
    } else if (dateDiffer < 31557600000) {
        dateDiffer = Math.floor(dateDiffer / (60000 * 60 * 24 * 7 * 4)).toString() + 'months';
        return dateDiffer;
    }
}

function onClickFollow(element, creatorId, postId) {
    console.log('creator id is: ' + creatorId);
    $.ajax({
        url: '/ajax/' + element.innerText,
        type: 'POST',
        data: { 'creatorId': creatorId },
        success: function(totalFollowers) {
            showSnackbar('You ' + element.innerText + ' Successfully');
            // document.getElementById('showFollowers' + postId).innerText = totalFollowers + ' Followers';
            var showFollowerElementArray = document.getElementsByClassName('showFollowers' + creatorId);
            [...showFollowerElementArray].forEach((fTextElement) => {
                fTextElement.innerText = totalFollowers + ' Followers';
            });
            var followButtonArray = document.getElementsByClassName('f-btn' + creatorId);
            [...followButtonArray].forEach((fButtonlement) => {
                fButtonlement.innerText === 'Follow' ? fButtonlement.innerText = 'Unfollow' : fButtonlement.innerText = 'Follow';

            });
        },
        error: function(xhr, status, error) {
            if (error === 'Unauthorized')
                showSnackbar('You Are not LoggedIn!');
            else
                showSnackbar('something Went Wrong!');
        }
    });
}

function submitComment(postId) {
    console.log('postId is::::');
    console.log(postId);
    var commentText = document.getElementById('writtencomment').value;
    document.getElementById('writtencomment').value = '';
    console.log('written comment is:::' + commentText);
    $.ajax({
        url: '/ajax/addcomment',
        type: 'POST',
        data: { "postId": postId, "commentText": commentText },
        beforeSend: function() {
            $('.loader').show();
        },
        complete: function() {
            $('.loader').hide();
        },
        success: function(res) {
            var element = document.getElementsByClassName('fakeClass')[0];
            var p = document.getElementById('showcommenttext' + postId);
            showSnackbar('comment added successfully');
            element.classList.replace("fa-comment-o", "fa-comment");
            p.innerText = 'commented';
            actionPerformed(element, 'comment', postId);
        },
        error: function(xhr, status, error) {
            if (error === 'Unauthorized')
                showSnackbar('You Are not LoggedIn!');
            else
                showSnackbar('something Went Wrong!');
        }
    });
}

function actionPerformed(element, icon, postId) {
    // alert('post id :' + postId);
    console.log('action Performed function called');
    var p = document.getElementById('show' + icon + 'text' + postId);
    // console.log('innertext:' + p.innerText)
    if (icon === "like") {
        var incLikes = 0;
        p.innerText === 'like' ? incLikes++ : incLikes--;
        $.ajax({
            url: '/ajax/like',
            type: 'POST',
            data: { "incLikes": incLikes, "postId": postId },

            success: function(totalLikes) {
                if (p.innerText === 'like') {
                    element.classList.replace("fa-thumbs-o-up", "fa-thumbs-up");
                    p.innerText = 'unlike';
                } else {
                    element.classList.replace("fa-thumbs-up", "fa-thumbs-o-up");
                    p.innerText = 'like';
                }
                document.getElementById('showLikes' + postId).innerText = totalLikes + ' Likes';
            },
            error: function(xhr, status, error) {
                if (error === 'Unauthorized')
                    showSnackbar('You Are not LoggedIn!');
                else
                    showSnackbar('something Went Wrong!');
            }
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
        document.getElementById('submitcomment').onclick = function() {
                submitComment(postId);
            }
            // if (document.getElementById('maincommentcontainer').classList.contains('show-commentbox')) {
            //     hidecommentbox(false);
            // }
        $('.commentdiv').remove(); //removing existing comments
        if (!document.getElementById('maincommentcontainer').classList.contains('show-commentbox')) {
            showcommentbox();
        }
        $.ajax({
            url: '/ajax/getcomment',
            type: 'POST',
            data: { "postId": postId },
            beforeSend: function() {
                $('.loader').show();
            },
            complete: function() {
                $('.loader').hide();
            },
            success: function(commentsArray) {
                var innercommentcontainer = $('#innercommentcontainer');
                var writecomment = document.getElementById('writecomment');
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
                    $("<div id='nocomment' class='commentdiv'><p>No Comments Added Yet! Become first one to comment.</p></div>").insertAfter($('.loader'));
                    // insertAfter($('#commentHeader'));

                } else {
                    document.getElementById('showComments' + postId).innerText = commentsArray.length + ' Comments';
                    console.log(commentsArray);
                    // $('.commentdiv').parentNode.removeChild($('.commentdiv'))
                    // const elements = document.getElementsByClassName('.commentdiv');
                    // while (elements.length > 0) {
                    //     elements[0].parentNode.removeChild(elements[0]);
                    // }
                    // innercommentcontainer.innerHTML = '<p>here we show comments!</p>';
                    commentsArray.forEach((comment) => {
                        var usernametoBePrinted = element.id === comment.userId ? 'You' : comment.username;
                        var dateDiffer = new Date().getTime() - comment.date;
                        console.log(dateDiffer);
                        $("<div class='commentdiv'><img src='../static/imagesForPost/profile.png'><b>&nbsp;" + usernametoBePrinted + "<small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + getDateDifference(dateDiffer) + " ago</small></b><p id='commentP'>" + comment.commentText + "</p></div>").insertAfter($('.loader'));
                        // insertAfter($('#commentHeader'));
                    });
                    //here above setting user profile image and showing date difference is remain
                }

                // element.classList.replace("fa-comment-o", "fa-comment");
                // p.innerText = 'commented';
            },
            error: function(xhr, status, error) {
                if (error === 'Unauthorized')
                    showSnackbar('You Are not LoggedIn!');
                else
                    showSnackbar('something Went Wrong!');
            }
        });
        setTimeout(() => {
            var element = document.getElementById('writecomment');
            element.scrollIntoView(true);
        }, 500);

        // element.classList.toggle("fa-comment");//not working
        // element.classList.replace("fa-comment-o", "fa-comment");
        // comments++;
    }
    if (icon === "save") {
        if (p.innerText === 'saved') {
            showSnackbar('you already saved!');
        } else {
            $.ajax({
                url: '/ajax/save',
                type: 'POST',
                data: { "postId": postId },
                success: function(res) {
                    showSnackbar('You saved Successfully!');
                    element.classList.replace("fa-bookmark-o", "fa-bookmark");
                    p.innerText = 'saved';
                    // else {
                    //     element.classList.replace("fa-bookmark", "fa-bookmark-o");
                    //     p.innerText = 'save';
                    // }
                },
                error: function(xhr, status, error) {
                    if (error === 'Unauthorized')
                        showSnackbar('You Are not LoggedIn!');
                    else
                        showSnackbar('something Went Wrong!');
                }
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
        url: '/?category=' + selectedCategory + '&city=' + selectedCity,
        type: 'GET',
        // data: { "postId": postId },
        // beforeSend: function() {
        //     $('.loader').show();
        // },
        // complete: function() {
        //     $('.loader').hide();
        // },
        success: function(postsData) {
            msg = "happy birthday Chnaged!";
            // posts = postsData.posts;
            console.log(postsData);
            // $(".postsContainer").remove();
            document.getElementsByClassName("postsContainer")[0].innerHTML = postsData;
            showSnackbar("successss!!")
        },
        error: function(xhr, status, error) {
            if (error === 'Unauthorized')
                showSnackbar('You Are not LoggedIn!');
            else
                showSnackbar('something Went Wrong!');
        }
    });

}
// module.exports = { 'likes': likes, 'comments': comments }
var currentPage = 1;
// var AjaxPosts = [];
$(window).scroll(function() {
    // if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    // var postHeight = $("#post_container").height();
    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
        var totalPosts = $("#getTotalPosts").text();
        console.log("value of P" + totalPosts);
        console.log((currentPage * 5) > totalPosts);
        if ((currentPage * 5) > totalPosts) {
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
            url: '/getPosts',
            type: 'Post',
            data: { "currentPage": currentPage, "city": city, "category": category },
            success: function(res) {
                // console.log("success");
                // console.log(res);
                // message = "Happy Birthday Changed";
                // var post = res.posts[0];
                // var AjaxPosts = res.posts;
                // var currentUserFollowingsArray = res.currentUserFollowingsArray;
                // var currentUserId = res.currentUserId;
                // var filter = res.filter;
                // var isLoggedIn = res.isLoggedIn;
                // var postsForAppend = "";
                // AjaxPosts.forEach(function(post) {
                // var image = post.image.toString();
                // var image = "http://localhost/static/usersPost/60c313b4b0898064088548d2Home.png";
                // var imageData = post.image.data.toString('base64');
                // postsForAppend += `<div id="post_container", style="width: 80%;">
                // <div id="profile"><img src="../static/imagesForPost/profile.png" />
                //     <p id="name">${post.creator.username} <small>at ${post.date}</small></p><b class="showFollowers${post.creator._id}", id="showFollowers${post._id}">${post.creator.followers}Followers </b><button class="f-btn${post.creator._id}", id="f-btn",onclick="onClickFollow(this,${post.creator._id},${post._id})">${currentUserFollowingsArray.includes(post.creator._id) ? 'Unfollow' : 'Follow'}</button>
                //     </div>
                // <div id="main">
                // <div id="head">
                // <div id="count">
                //             <p id="showLikes${post._id}">${post.likes} Likes </p>
                //             <p id="showComments${post._id}">${post.likes} Comments</p>
                //         </div>
                //         </div>
                //     <div id="main-img-desc"><img id="PostImg",src=${image} />
                //     <div class="details">
                //             <div id="title">
                //             <p><b>Title: </b>${post.title} </p>
                //             </div>
                //             <div id="discription">
                //             <p><b>Description: </b>${post.description} </p>
                //             <p><b>Contact No: </b>${post.contact} </p>
                //             <p><b>City: </b>${post.city} </p>
                //             </div>
                //             </div>
                //             </div>
                //             </div>
                //             <div id="actiondiv">
                //             <div id="like"><i class="${post.likedArray.includes(currentUserId) ?"fa fa-thumbs-up" :"fa fa-thumbs-o-up"}", onclick="actionPerformed(this,'like',${post._id})"></i>
                //             <p id="showliketext${post._id}">${post.likedArray.includes(currentUserId) ? 'unlike' : 'like'}</p>
                //             </div>
                //             <div id="comment"><i class="${post.commentedArrayWithOnlyUserId.includes(currentUserId) ?"fa fa-comment fakeClass" :"fa fa-comment-o fakeClass"}", id="${currentUserId}", onclick="actionPerformed(this,'comment',${post._id})"></i>
                //             <p id="showcommenttext${post._id}">${post.commentedArrayWithOnlyUserId.includes(currentUserId) ? 'commented' : 'comment'} </p>
                //             </div>
                //             <div id="share",onclick="actionPerformed(this,'share',${post._id})"><img src="../static/imagesForPost/share.png" />share </div>
                //             <div id="save"><i class="${post.savedArray.includes(currentUserId) ?"fa fa-bookmark" :"fa fa-bookmark-o"}", onclick="actionPerformed(this,'save',${post._id})"></i>
                //             <p id="showsavetext${post._id}">${post.savedArray.includes(currentUserId) ? 'saved' : 'save'} </p>
                //             </div>
                //             </div>
                //             <div id="maincommentcontainer">
                //             <h4 id="commentHeader">All Comments <button id="closebutton", onclick="hidecommentbox(true)">&#10006</button> </h4>
                //             <div id="innercommentcontainer">
                //             <div class="loader">...Loading</div>
                //             <div class="writecommentdiv", id="writecomment"><b>Write comment</b><textarea name="writtencomment", id="writtencomment", cols="35", rows="4"></textarea><button id="submitcomment">Add Comment</button></div>
                //             </div>
                //             </div>
                //             </div>`;
                // });
                // AjaxPosts = res.posts;
                $(".postsContainer").append(res);
                // $(".postsContainer").append(AjaxPosts);

            },
            error: function(xhr, status, error) {
                if (error === 'Unauthorized')
                    showSnackbar('You Are not LoggedIn!');
                else
                    showSnackbar('something Went Wrong!');
            }
        });
        var message = "nice";
        console.log("Ajax Call...");
        // console.log("current filter: " + filter.city + " " + filter.category);
    }
})