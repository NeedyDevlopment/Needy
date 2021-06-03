function showcommentbox() {
    console.log('showcommentbox called!');
    var commentbox = document.getElementById('maincommentcontainer');
    commentbox.style.animation = 'fadeIn 1s';
    commentbox.classList.add('show-commentbox');
    setTimeout(() => {
        var element = document.getElementById('writecomment');
        element.scrollIntoView(true);
    }, 500);
}

function hidecommentbox(animate) {
    console.log('hidecommentbox called!');
    var commentbox = document.getElementById('maincommentcontainer');
    // if (animate) {
    commentbox.style.animation = 'fadeOut 1s';
    setTimeout(() => {
        commentbox.classList.remove('show-commentbox');
    }, 1000);
    // } else {
    //     commentbox.classList.remove('show-commentbox');
    // }
    // commentbox.classList.remove('show-commentbox');
}