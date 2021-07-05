module.exports.AuthForRegister = function(req, res, next) {
    if (req.session.token) {
        console.log('you are already registered so you can access resourses of our website.');
        next();
    } else {
        console.log('you are not registerd,so can\'t use our resourses,please register First!');
        res.redirect('/signup');
    }
}
module.exports.AuthForLogin = function(req, res, next) {
    if (req.session.isLoggedIn) {
        console.log('Congratulation! you are already loggedin So you have access to our resourses.');
        next();
    } else {
        console.log('you are not loggedin,so can\'t use our resourses,please Login First!');
        res.redirect('/login');
        // res.redirect('/');
        // document.getElementById('myModal').style.display = "block";
    }
}